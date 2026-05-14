import {
  MAX_REPORT_DESCRIPTION_LENGTH,
  MAX_REPORT_TITLE_LENGTH,
  REPORT_DEFAULT_SEVERITY,
  REPORT_DEFAULT_STATUS,
  resolveReportCategory,
} from "../../../../../packages/reports-domain/src/index.js";

const DEFAULT_STORAGE_KEY = "engaja.reports.local";

export function createLocalReportStore({
  now = () => new Date(),
  storage = resolveBrowserStorage(),
  storageKey = DEFAULT_STORAGE_KEY,
} = {}) {
  return {
    createReport(payload) {
      if (!storage) {
        throw new Error("Nao foi possivel salvar o report localmente neste navegador.");
      }

      const report = buildReportRecord(payload, now);
      const reports = readAllReports(storage, storageKey);
      reports.push(report);
      writeAllReports(storage, storageKey, reports);
      return report;
    },

    listReports() {
      if (!storage) {
        return [];
      }

      return readAllReports(storage, storageKey).sort(sortReportsByRecencyDesc);
    },
  };
}

function buildReportRecord(input, now) {
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
    throw new Error(details[0]);
  }

  const currentTimestamp = now().toISOString();

  return {
    id: generateLocalReportId(),
    title,
    categoryId: category.id,
    categoryLabel: category.label,
    categoryColor: category.color,
    description,
    locationName,
    status: clampText(input?.status, 40) || REPORT_DEFAULT_STATUS,
    severity: REPORT_DEFAULT_SEVERITY,
    latitude,
    longitude,
    reportedAt: currentTimestamp.slice(0, 10),
    createdAt: currentTimestamp,
    updatedAt: currentTimestamp,
    ...buildReportDetails(input),
  };
}

function buildReportDetails(input) {
  return {
    reporterName: clampText(input?.reporterName, 80),
    reporterDocument: clampText(input?.reporterDocument, 32),
    reportBuilding: clampText(input?.reportBuilding, 40),
    reportBlock: clampText(input?.reportBlock, 20),
    reportFloor: clampText(input?.reportFloor, 20),
    reportEnvironment: clampText(input?.reportEnvironment, 80),
    reportProblem: clampText(input?.reportProblem, 80),
    reportImageDataUrl: String(input?.reportImageDataUrl ?? ""),
    reportImageName: clampText(input?.reportImageName, 120),
    reportConfirmers: clampText(input?.reportConfirmers, 500),
    reportConfirmersCount: Number(input?.reportConfirmersCount) || 0,
  };
}

function readAllReports(storage, storageKey) {
  try {
    const rawReports = storage.getItem(storageKey);

    if (!rawReports) {
      return [];
    }

    const parsedReports = JSON.parse(rawReports);
    return Array.isArray(parsedReports) ? parsedReports : [];
  } catch {
    return [];
  }
}

function writeAllReports(storage, storageKey, reports) {
  storage.setItem(storageKey, JSON.stringify(reports));
}

function clampText(value, maxLength) {
  return String(value ?? "").trim().slice(0, maxLength);
}

function resolveBrowserStorage() {
  try {
    const storage = globalThis.localStorage;

    if (!storage) {
      return null;
    }

    const probeKey = "__engaja_reports_probe__";
    storage.setItem(probeKey, "1");
    storage.removeItem(probeKey);
    return storage;
  } catch {
    return null;
  }
}

function generateLocalReportId() {
  const randomUuid = globalThis.crypto?.randomUUID?.();

  if (randomUuid) {
    return randomUuid;
  }

  return `local-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function sortReportsByRecencyDesc(a, b) {
  return `${b.reportedAt}${b.createdAt}`.localeCompare(`${a.reportedAt}${a.createdAt}`);
}
