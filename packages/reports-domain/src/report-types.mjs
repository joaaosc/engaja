export const MAX_REPORT_TITLE_LENGTH = 80;
export const MAX_REPORT_DESCRIPTION_LENGTH = 120;
export const REPORT_DEFAULT_STATUS = "Novo";
export const REPORT_DEFAULT_SEVERITY = "Media";

export const REPORT_STATUS_VALUES = Object.freeze([
  "Novo",
  "Registrado",
  "Aberto",
  "Em analise",
  "Planejado",
  "Resolvido",
]);

export const REPORT_SEVERITY_VALUES = Object.freeze([
  "Baixa",
  "Media",
  "Alta",
]);

export const REPORT_CATEGORIES = Object.freeze([
  Object.freeze({
    id: "infraestrutura",
    label: "Infraestrutura",
    color: "#4cc9f0",
  }),
  Object.freeze({
    id: "iluminacao",
    label: "Iluminacao",
    color: "#f4d35e",
  }),
  Object.freeze({
    id: "mobilidade",
    label: "Mobilidade",
    color: "#ff8c42",
  }),
  Object.freeze({
    id: "seguranca",
    label: "Seguranca",
    color: "#ef476f",
  }),
  Object.freeze({
    id: "limpeza",
    label: "Limpeza",
    color: "#7bd389",
  }),
  Object.freeze({
    id: "acessibilidade",
    label: "Acessibilidade",
    color: "#7b6dff",
  }),
]);

const reportCategoryById = new Map(REPORT_CATEGORIES.map((category) => [category.id, category]));
const reportCategoryByLabel = new Map(
  REPORT_CATEGORIES.map((category) => [slugifyToken(category.label), category]),
);

/**
 * @typedef {Object} CreateReportInput
 * @property {string} title
 * @property {string} categoryId
 * @property {string=} description
 * @property {string=} locationName
 * @property {number|string} latitude
 * @property {number|string} longitude
 */

/**
 * @typedef {Object} ReportRecord
 * @property {string} id
 * @property {string} title
 * @property {string} categoryId
 * @property {string} categoryLabel
 * @property {string} categoryColor
 * @property {string} description
 * @property {string} locationName
 * @property {string} status
 * @property {string} severity
 * @property {number} latitude
 * @property {number} longitude
 * @property {string} reportedAt
 * @property {string} createdAt
 * @property {string} updatedAt
 */

export function slugifyToken(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function normalizeReportStatus(value) {
  const normalized = String(value ?? "").trim();
  return normalized || "Registrado";
}

export function normalizeReportSeverity(value) {
  const normalized = String(value ?? "").trim();
  return normalized || REPORT_DEFAULT_SEVERITY;
}

export function normalizeReportDate(value) {
  const normalized = String(value ?? "").trim();
  return normalized ? normalized.slice(0, 10) : new Date().toISOString().slice(0, 10);
}

export function findReportCategoryById(categoryId) {
  return reportCategoryById.get(slugifyToken(categoryId)) ?? null;
}

export function findReportCategoryByLabel(categoryLabel) {
  return reportCategoryByLabel.get(slugifyToken(categoryLabel)) ?? null;
}

export function resolveReportCategory(categoryValue) {
  return findReportCategoryById(categoryValue) ?? findReportCategoryByLabel(categoryValue);
}
