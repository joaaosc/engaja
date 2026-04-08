export const CAMPUS_BOUNDARY_URL = new URL("../../data/campus/fundao.geojson", import.meta.url);
export const REPORTS_SEED_URL = new URL(
  "../../../../packages/reports-domain/seeds/reports.seed.geojson",
  import.meta.url,
);
export const REPORTS_API_URL =
  globalThis.ENGAJA_REPORTS_API_URL ?? resolveDefaultReportsApiUrl();
export const TREE_MODEL_ASSET_URL = new URL("../../assets/tree.gltf", import.meta.url).toString();

export const VISUALIZATION_MODES = [
  {
    id: "base",
    label: "Visao base",
    helper: "Cena espacial limpa para leitura de massa, vegetacao e volumetria do campus.",
  },
  {
    id: "occurrences",
    label: "Ocorrencias",
    helper: "Pins priorizados sobre o basemap para operacao e inspeccao rapida.",
  },
  {
    id: "analytics",
    label: "Analitica / Heatmap",
    helper: "Leitura de densidade com heatmap geral ou por categoria filtrada.",
  },
];

export const DEFAULT_VISUALIZATION_MODE = "occurrences";
export const ALL_CATEGORIES_FILTER = "all";

function resolveDefaultReportsApiUrl() {
  const location = globalThis.location;

  if (!location || !["http:", "https:"].includes(location.protocol)) {
    return "http://127.0.0.1:3001/api/reports";
  }

  const apiUrl = new URL("/api/reports", location.origin);
  apiUrl.port = "3001";
  return apiUrl.toString();
}
