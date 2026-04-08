import {
  MAX_REPORT_DESCRIPTION_LENGTH,
  normalizeReportDate,
  normalizeReportSeverity,
  normalizeReportStatus,
  resolveReportCategory,
} from "../../../../../packages/reports-domain/src/index.js";

export function reportRecordToMarkingFeature(report) {
  const category = resolveReportCategory(report?.categoryId ?? report?.categoryLabel);

  if (!category) {
    return null;
  }

  const latitude = Number(report?.latitude);
  const longitude = Number(report?.longitude);

  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return null;
  }

  return {
    type: "Feature",
    properties: {
      id: String(report?.id ?? cryptoRandomId()),
      title: String(report?.title ?? `Ocorrencia de ${category.label}`).trim(),
      categoryId: category.id,
      categoryLabel: report?.categoryLabel ?? category.label,
      color: report?.categoryColor ?? category.color,
      description: String(report?.description ?? "")
        .trim()
        .slice(0, MAX_REPORT_DESCRIPTION_LENGTH),
      locationName: String(report?.locationName ?? "").trim(),
      status: normalizeReportStatus(report?.status),
      severity: normalizeReportSeverity(report?.severity),
      reportedAt: normalizeReportDate(report?.reportedAt ?? report?.createdAt),
    },
    geometry: {
      type: "Point",
      coordinates: [longitude, latitude],
    },
  };
}

function cryptoRandomId() {
  return `r${Math.random().toString(36).slice(2, 10)}`;
}
