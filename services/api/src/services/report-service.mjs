import { randomUUID } from "node:crypto";
import { readFile } from "node:fs/promises";
import {
  MAX_REPORT_DESCRIPTION_LENGTH,
  MAX_REPORT_TITLE_LENGTH,
  REPORT_DEFAULT_SEVERITY,
  REPORT_DEFAULT_STATUS,
  normalizeReportDate,
  normalizeReportSeverity,
  normalizeReportStatus,
  resolveReportCategory,
} from "../../../../packages/reports-domain/src/report-types.mjs";

export class ReportValidationError extends Error {
  constructor(message, details = []) {
    super(message);
    this.name = "ReportValidationError";
    this.details = details;
    this.statusCode = 400;
  }
}

export class ReportService {
  constructor({ reportRepository, seedFilePath, now = () => new Date() }) {
    this.reportRepository = reportRepository;
    this.seedFilePath = seedFilePath;
    this.now = now;
    this.isInitialized = false;
  }

  async listReports() {
    await this.#ensureInitialized();

    const reports = await this.reportRepository.list();
    return reports.sort(sortReportsByRecencyDesc);
  }

  async createReport(input) {
    await this.#ensureInitialized();

    const report = this.#buildReportRecord(input);
    return this.reportRepository.create(report);
  }

  async #ensureInitialized() {
    if (this.isInitialized) {
      return;
    }

    const alreadyExists = await this.reportRepository.exists();

    if (!alreadyExists) {
      const seedReports = await this.#loadSeedReports();
      await this.reportRepository.initialize(seedReports);
    }

    this.isInitialized = true;
  }

  async #loadSeedReports() {
    const rawSeed = await readFile(this.seedFilePath, "utf8");
    const featureCollection = JSON.parse(rawSeed);
    const seedFeatures = Array.isArray(featureCollection?.features)
      ? featureCollection.features
      : [];

    return seedFeatures.map((feature) => this.#mapSeedFeatureToReport(feature)).filter(Boolean);
  }

  #mapSeedFeatureToReport(feature) {
    const category = resolveReportCategory(
      feature?.properties?.categoryId ?? feature?.properties?.category,
    );

    if (!category || feature?.geometry?.type !== "Point") {
      return null;
    }

    const coordinates = feature.geometry.coordinates ?? [];
    const longitude = Number(coordinates[0]);
    const latitude = Number(coordinates[1]);

    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
      return null;
    }

    const reportedAt = normalizeReportDate(feature.properties?.reportedAt);
    const timestamp = `${reportedAt}T00:00:00.000Z`;

    return {
      id: String(feature.properties?.id ?? randomUUID()),
      title: clampText(
        feature.properties?.title ?? `Report de ${category.label}`,
        MAX_REPORT_TITLE_LENGTH,
      ),
      categoryId: category.id,
      categoryLabel: category.label,
      categoryColor: category.color,
      description: clampText(
        feature.properties?.description ?? "",
        MAX_REPORT_DESCRIPTION_LENGTH,
      ),
      locationName: String(feature.properties?.locationName ?? "").trim(),
      status: normalizeReportStatus(feature.properties?.status),
      severity: normalizeReportSeverity(feature.properties?.severity),
      latitude,
      longitude,
      reportedAt,
      createdAt: timestamp,
      updatedAt: timestamp,
    };
  }

  #buildReportRecord(input) {
    const category = resolveReportCategory(input?.categoryId);
    const title = clampText(input?.title, MAX_REPORT_TITLE_LENGTH);
    const description = clampText(input?.description ?? "", MAX_REPORT_DESCRIPTION_LENGTH);
    const locationName = String(input?.locationName ?? "").trim();
    const latitude = Number(input?.latitude);
    const longitude = Number(input?.longitude);

    const details = [];

    if (!title) {
      details.push("`title` e obrigatorio.");
    }

    if (!category) {
      details.push("`categoryId` precisa ser uma categoria valida.");
    }

    if (!Number.isFinite(latitude) || latitude < -90 || latitude > 90) {
      details.push("`latitude` precisa ser um numero entre -90 e 90.");
    }

    if (!Number.isFinite(longitude) || longitude < -180 || longitude > 180) {
      details.push("`longitude` precisa ser um numero entre -180 e 180.");
    }

    if (details.length) {
      throw new ReportValidationError("Payload invalido para criacao de report.", details);
    }

    const now = this.now();
    const isoTimestamp = now.toISOString();

    return {
      id: randomUUID(),
      title,
      categoryId: category.id,
      categoryLabel: category.label,
      categoryColor: category.color,
      description,
      locationName,
      status: REPORT_DEFAULT_STATUS,
      severity: REPORT_DEFAULT_SEVERITY,
      latitude,
      longitude,
      reportedAt: isoTimestamp.slice(0, 10),
      createdAt: isoTimestamp,
      updatedAt: isoTimestamp,
    };
  }
}

function clampText(value, maxLength) {
  return String(value ?? "").trim().slice(0, maxLength);
}

function sortReportsByRecencyDesc(a, b) {
  return `${b.reportedAt}${b.createdAt}`.localeCompare(`${a.reportedAt}${a.createdAt}`);
}
