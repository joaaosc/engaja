export const MAX_REPORT_DESCRIPTION_LENGTH = 120;

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
  return normalized || "Media";
}

export function normalizeReportDate(value) {
  const normalized = String(value ?? "").trim();
  return normalized ? normalized.slice(0, 10) : new Date().toISOString().slice(0, 10);
}
