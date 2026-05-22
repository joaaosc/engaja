const ROOT_NODE_ID = "territory-root";

const dashboardData = {
  snapshot: [
    { label: "Cidade Universitaria / UFRJ", color: "#5d7a6e" },
    { label: "Recorte de 90 dias", color: "#527e95" },
    { label: "Atualizado em 08 abr 2026", color: "#d09b43" },
  ],
  statuses: [
    { label: "Triagem", count: 31 },
    { label: "Em campo", count: 37 },
    { label: "Concluidos", count: 105 },
  ],
  metrics: [
    {
      label: "Reports no periodo",
      value: 173,
      tone: "#20414d",
      badge: "+17%",
      helper: "Volume ampliado por novos pontos em CT, HU, EEFD e Reitoria.",
    },
    {
      label: "Resolvidos",
      value: 96,
      tone: "#3f7f5c",
      badge: "55%",
      helper: "Fechamento sustentado por frentes simultaneas de manutencao, limpeza e ajustes de campo.",
    },
    {
      label: "Criticos",
      value: 23,
      tone: "#c75438",
      badge: "13%",
      helper: "Maior concentracao em infraestrutura, circulacao hospitalar e iluminacao de percurso.",
    },
    {
      label: "Tempo medio",
      value: "38h",
      tone: "#d29b3f",
      badge: "48h alvo",
      helper: "Media atual entre abertura e resposta efetiva nas frentes com maior volume.",
    },
  ],
  categories: [
    { label: "Infraestrutura", total: 41, resolved: 18, color: "#4f8197" },
    { label: "Iluminacao", total: 33, resolved: 18, color: "#d29b3f" },
    { label: "Limpeza", total: 26, resolved: 19, color: "#6f8f7f" },
    { label: "Seguranca", total: 27, resolved: 11, color: "#c75438" },
    { label: "Mobilidade", total: 24, resolved: 13, color: "#c66644" },
    { label: "Acessibilidade", total: 22, resolved: 17, color: "#6d72d9" },
  ],
  territory: [
    {
      id: "ct",
      name: "CT e corredores tecnicos",
      short: "CT",
      active: 16,
      critical: 5,
      trend: "+18%",
      response: "Equipe dedicada em campo",
      color: "#73b4ff",
      summary:
        "Maior pressao em infraestrutura hidraulica e circulacao interna, com recorrencia em corredores tecnicos.",
      categories: [
        {
          label: "Infraestrutura",
          value: 7,
          note: "Vazamentos, revestimentos e pontos de manutencao corretiva em corredores tecnicos.",
          stages: [
            { label: "Critico", value: 3 },
            { label: "Em tratamento", value: 3 },
            { label: "Monitoramento", value: 1 },
          ],
        },
        {
          label: "Iluminacao",
          value: 5,
          note: "Falhas em rotas de acesso, patios e travessias internas.",
          stages: [
            { label: "Critico", value: 1 },
            { label: "Em tratamento", value: 3 },
            { label: "Monitoramento", value: 1 },
          ],
        },
        {
          label: "Circulacao",
          value: 4,
          note: "Trechos com obstrucao e desgaste em areas de maior fluxo academico.",
          stages: [
            { label: "Critico", value: 1 },
            { label: "Em tratamento", value: 2 },
            { label: "Monitoramento", value: 1 },
          ],
        },
      ],
    },
    {
      id: "ccs",
      name: "CCS e acessos clinicos",
      short: "CCS",
      active: 13,
      critical: 4,
      trend: "+15%",
      response: "Operacao articulada com seguranca",
      color: "#8d74f4",
      summary:
        "Concentracao de ocorrencias em acessos clinicos, iluminacao perimetral e pontos sensiveis de seguranca.",
      categories: [
        {
          label: "Seguranca",
          value: 5,
          note: "Pontos de baixa visibilidade e sensacao de inseguranca.",
          stages: [
            { label: "Critico", value: 2 },
            { label: "Em tratamento", value: 2 },
            { label: "Monitoramento", value: 1 },
          ],
        },
        {
          label: "Iluminacao",
          value: 4,
          note: "Intervencoes em luminarias e reforco de visibilidade no entorno.",
          stages: [
            { label: "Critico", value: 1 },
            { label: "Em tratamento", value: 2 },
            { label: "Monitoramento", value: 1 },
          ],
        },
        {
          label: "Mobilidade",
          value: 4,
          note: "Rotas desviadas e fluxo pressionado em acessos ambulatoriais.",
          stages: [
            { label: "Critico", value: 1 },
            { label: "Em tratamento", value: 2 },
            { label: "Monitoramento", value: 1 },
          ],
        },
      ],
    },
    {
      id: "hu",
      name: "Hospital Universitario",
      short: "HU",
      active: 12,
      critical: 4,
      trend: "+14%",
      response: "Fluxo sensivel em 24h",
      color: "#4cb7a5",
      summary:
        "Carteira concentrada em percursos assistenciais, sinalizacao interna e pequenos gargalos de infraestrutura no eixo ambulatorial.",
      categories: [
        {
          label: "Mobilidade",
          value: 5,
          note: "Rotas desviadas e conflito de fluxo entre visitantes, pacientes e apoio assistencial.",
          stages: [
            { label: "Critico", value: 2 },
            { label: "Em tratamento", value: 2 },
            { label: "Monitoramento", value: 1 },
          ],
        },
        {
          label: "Infraestrutura",
          value: 4,
          note: "Portas, drenagem e ajustes pontuais em acessos hospitalares de maior uso.",
          stages: [
            { label: "Critico", value: 1 },
            { label: "Em tratamento", value: 2 },
            { label: "Monitoramento", value: 1 },
          ],
        },
        {
          label: "Sinalizacao",
          value: 3,
          note: "Orientacao provisoria em eixos de recepcao e conexao com exames.",
          stages: [
            { label: "Critico", value: 1 },
            { label: "Em tratamento", value: 1 },
            { label: "Monitoramento", value: 1 },
          ],
        },
      ],
    },
    {
      id: "ru",
      name: "Av. Pedro Calmon / RU",
      short: "RU",
      active: 11,
      critical: 3,
      trend: "+11%",
      response: "Janela de correcao em 24h",
      color: "#c76dff",
      summary:
        "Pressao concentrada em travessias, iluminacao de percurso e organizacao de fluxo na frente do RU.",
      categories: [
        {
          label: "Iluminacao",
          value: 4,
          note: "Falhas em travessias e percursos com maior volume noturno.",
          stages: [
            { label: "Critico", value: 1 },
            { label: "Em tratamento", value: 2 },
            { label: "Monitoramento", value: 1 },
          ],
        },
        {
          label: "Limpeza",
          value: 4,
          note: "Acumulo recorrente em pontos de permanencia e espera.",
          stages: [
            { label: "Critico", value: 1 },
            { label: "Em tratamento", value: 2 },
            { label: "Monitoramento", value: 1 },
          ],
        },
        {
          label: "Circulacao",
          value: 3,
          note: "Ajustes de rota em area de pico e pontos de conflito entre pedestres.",
          stages: [
            { label: "Critico", value: 1 },
            { label: "Em tratamento", value: 1 },
            { label: "Monitoramento", value: 1 },
          ],
        },
      ],
    },
    {
      id: "ccmn",
      name: "CCMN e estacionamento oeste",
      short: "CCMN",
      active: 10,
      critical: 3,
      trend: "+9%",
      response: "Ajustes por frente itinerante",
      color: "#c8ef72",
      summary:
        "Demanda mais distribuida entre acessibilidade, pequenos reparos e orientacao de deslocamento no oeste do campus.",
      categories: [
        {
          label: "Acessibilidade",
          value: 4,
          note: "Rampas, desniveis e ajustes de rota sem alternativa sinalizada.",
          stages: [
            { label: "Critico", value: 2 },
            { label: "Em tratamento", value: 1 },
            { label: "Monitoramento", value: 1 },
          ],
        },
        {
          label: "Infraestrutura",
          value: 3,
          note: "Reparos pontuais em calcadas e bordas de acesso.",
          stages: [
            { label: "Critico", value: 1 },
            { label: "Em tratamento", value: 1 },
            { label: "Monitoramento", value: 1 },
          ],
        },
        {
          label: "Mobilidade",
          value: 3,
          note: "Ajustes de sinalizacao e direcionamento de fluxo.",
          stages: [
            { label: "Em tratamento", value: 2 },
            { label: "Monitoramento", value: 1 },
          ],
        },
      ],
    },
    {
      id: "eefd",
      name: "EEFD e complexo esportivo",
      short: "EEFD",
      active: 9,
      critical: 2,
      trend: "+10%",
      response: "Rota noturna em observacao",
      color: "#ef8874",
      summary:
        "Ocorrencias distribuidas entre acessos a quadras, vestiarios e conexoes pedonais no entorno esportivo.",
      categories: [
        {
          label: "Infraestrutura",
          value: 3,
          note: "Drenagem, pisos e pequenos reparos em blocos de apoio e vestiarios.",
          stages: [
            { label: "Critico", value: 1 },
            { label: "Em tratamento", value: 1 },
            { label: "Monitoramento", value: 1 },
          ],
        },
        {
          label: "Acessibilidade",
          value: 3,
          note: "Rampas, guarda-corpo e conexoes sem rota alternativa claramente sinalizada.",
          stages: [
            { label: "Critico", value: 1 },
            { label: "Em tratamento", value: 1 },
            { label: "Monitoramento", value: 1 },
          ],
        },
        {
          label: "Iluminacao",
          value: 3,
          note: "Refletores e luminarias de percurso com desempenho irregular no acesso noturno.",
          stages: [
            { label: "Em tratamento", value: 2 },
            { label: "Monitoramento", value: 1 },
          ],
        },
      ],
    },
    {
      id: "reitoria",
      name: "Reitoria",
      short: "Reitoria",
      active: 8,
      critical: 2,
      trend: "+6%",
      response: "Correcoes leves na rota",
      color: "#f0b06e",
      summary:
        "Carteira mais estavel, concentrada em ajustes de sinalizacao, piso e mobilidade leve no eixo administrativo.",
      categories: [
        {
          label: "Infraestrutura",
          value: 3,
          note: "Pontos de desgaste e pequenos reparos em halls, acessos e percursos administrativos.",
          stages: [
            { label: "Critico", value: 1 },
            { label: "Em tratamento", value: 1 },
            { label: "Monitoramento", value: 1 },
          ],
        },
        {
          label: "Mobilidade",
          value: 3,
          note: "Ajustes de rota e controle de fluxo em horario de pico nos acessos principais.",
          stages: [
            { label: "Em tratamento", value: 1 },
            { label: "Critico", value: 1 },
            { label: "Monitoramento", value: 1 },
          ],
        },
        {
          label: "Sinalizacao",
          value: 2,
          note: "Correcoes leves para orientar atendimento e acessos internos.",
          stages: [
            { label: "Em tratamento", value: 1 },
            { label: "Monitoramento", value: 1 },
          ],
        },
      ],
    },
  ],
  urgentReports: [
    {
      priority: "Critica",
      title: "Vazamento recorrente em corredor tecnico",
      detail: "Reincidencia em area de alta circulacao academica.",
      area: "CT / Bloco A",
      category: "Infraestrutura",
      status: "Aberto",
      impact: "Risco de ampliacao do dano e interferencia direta na passagem interna.",
      response: "Equipe local em 6h",
      followUp: "Prioridade de campo confirmada",
    },
    {
      priority: "Critica",
      title: "Falha de iluminacao em travessia principal",
      detail: "Baixa visibilidade no trajeto entre RU e salas de aula.",
      area: "Av. Pedro Calmon",
      category: "Iluminacao",
      status: "Em analise",
      impact: "Eleva risco operacional no periodo noturno e afeta percepcao de seguranca.",
      response: "Inspecao tecnica hoje",
      followUp: "Ajuste de luminarias em programacao",
    },
    {
      priority: "Critica",
      title: "Fluxo improvisado entre recepcao e exames",
      detail: "Desvio temporario pressiona o percurso principal de pacientes e visitantes.",
      area: "HU / eixo ambulatorial",
      category: "Mobilidade",
      status: "Aberto",
      impact: "Amplia tempo de deslocamento, dificulta orientacao e cria pontos de conflito no corredor.",
      response: "Revisao assistida em 4h",
      followUp: "Sinalizacao provisoria sendo reforcada",
    },
    {
      priority: "Alta",
      title: "Rampa sem rota alternativa sinalizada",
      detail: "Obstrucao parcial em acesso prioritario do CCMN.",
      area: "CCMN / Bloco F",
      category: "Acessibilidade",
      status: "Planejado",
      impact: "Afeta acessibilidade e induz desvios inadequados de circulacao.",
      response: "Sinalizacao em 24h",
      followUp: "Equipe itinerante acionada",
    },
    {
      priority: "Alta",
      title: "Ponto com sensacao de inseguranca no eixo hospitalar",
      detail: "Baixa visibilidade no entorno do CCS.",
      area: "CCS / HUCFF",
      category: "Seguranca",
      status: "Registrado",
      impact: "Demanda reforco de ronda e correcoes complementares de iluminacao.",
      response: "Ronda ampliada nesta noite",
      followUp: "Acompanhamento com seguranca local",
    },
    {
      priority: "Alta",
      title: "Piso solto no hall principal",
      detail: "Desgaste localizado em acesso de grande fluxo administrativo.",
      area: "Reitoria / hall central",
      category: "Infraestrutura",
      status: "Aberto",
      impact: "Eleva risco de queda e reduz fluidez na circulacao de servidores e visitantes.",
      response: "Isolamento parcial imediato",
      followUp: "Correcao de piso na fila de execucao",
    },
    {
      priority: "Alta",
      title: "Placa de orientacao ausente em acesso clinico",
      detail: "Percurso para atendimento ficou sem referencia apos ajuste operacional.",
      area: "HU / recepcao sul",
      category: "Sinalizacao",
      status: "Em analise",
      impact: "Aumenta duvidas de orientacao e concentra pedidos de apoio humano no saguo.",
      response: "Reposicao ainda hoje",
      followUp: "Conteudo visual em revisao com a equipe local",
    },
    {
      priority: "Alta",
      title: "Refletores apagados no acesso das quadras",
      detail: "Trecho de ligacao com baixa visibilidade no retorno noturno.",
      area: "EEFD / complexo esportivo",
      category: "Iluminacao",
      status: "Registrado",
      impact: "Afeta seguranca do deslocamento e reduz conforto de uso no fim do dia.",
      response: "Inspecao eletrica em 12h",
      followUp: "Troca de modulo ja solicitada",
    },
    {
      priority: "Media",
      title: "Drenagem irregular em bloco de apoio",
      detail: "Acumulo de agua recorrente no entorno dos vestiarios da EEFD.",
      area: "EEFD / bloco de apoio",
      category: "Infraestrutura",
      status: "Planejado",
      impact: "Pode acelerar desgaste do piso e gerar escorregamento em dias de uso intenso.",
      response: "Limpeza tecnica em 24h",
      followUp: "Ajuste definitivo em programacao",
    },
  ],
};

const numberFormatter = new Intl.NumberFormat("pt-BR");

const REPORTS_API_URL = resolveReportsApiUrl();
const REPORTS_SEED_URL = "../../packages/reports-domain/seeds/reports.seed.geojson";
const LOCAL_REPORTS_STORAGE_KEY = "engaja.reports.local";

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => bootstrapDashboard(), {
    once: true,
  });
} else {
  bootstrapDashboard();
}

async function bootstrapDashboard() {
  initDashboardDetailsToggle();
  renderDashboard(dashboardData);
  renderReportsTableState("Carregando reports persistidos...");

  try {
    const reports = await loadReports();
    renderReportsTable(reports);
  } catch (error) {
    console.warn("Nao foi possivel carregar os reports para a tabela.", error);
    renderReportsTableState("Nao foi possivel carregar os reports.", true);
  }
}

function initDashboardDetailsToggle() {
  const toggleButton = document.getElementById("dashboard-details-toggle");
  const detailsSection = document.getElementById("dashboard-details");

  if (!toggleButton || !detailsSection) {
    return;
  }

  const updateToggle = (isVisible) => {
    detailsSection.hidden = !isVisible;
    toggleButton.setAttribute("aria-expanded", String(isVisible));
    toggleButton.textContent = "Dashboard";
  };

  updateToggle(false);

  toggleButton.addEventListener("click", () => {
    updateToggle(detailsSection.hidden);
  });
}

async function loadReports() {
  const [apiReports, localReports, seedReports] = await Promise.all([
    loadReportsFromApi(),
    Promise.resolve(loadReportsFromLocalStorage()),
    loadReportsFromSeed(),
  ]);

  return dedupeReports([...apiReports, ...localReports, ...seedReports]).sort(
    sortReportsByRecencyDesc,
  );
}

async function loadReportsFromApi() {
  try {
    const response = await fetch(REPORTS_API_URL, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return [];
    }

    const payload = await response.json();
    return normalizeReportCollection(payload?.data);
  } catch {
    return [];
  }
}

function resolveReportsApiUrl() {
  const location = globalThis.location;

  if (!location || !["http:", "https:"].includes(location.protocol)) {
    return "http://127.0.0.1:3001/api/reports";
  }

  const apiUrl = new URL("/api/reports", location.origin);
  apiUrl.port = "3001";
  return apiUrl.toString();
}

async function loadReportsFromSeed() {
  try {
    const response = await fetch(REPORTS_SEED_URL, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return [];
    }

    const payload = await response.json();
    return normalizeReportCollection(payload?.features);
  } catch {
    return [];
  }
}

function loadReportsFromLocalStorage() {
  try {
    const storage = globalThis.localStorage;

    if (!storage) {
      return [];
    }

    const rawReports = storage.getItem(LOCAL_REPORTS_STORAGE_KEY);

    if (!rawReports) {
      return [];
    }

    const parsedReports = JSON.parse(rawReports);
    return normalizeReportCollection(parsedReports);
  } catch {
    return [];
  }
}

function normalizeReportCollection(collection) {
  if (!Array.isArray(collection)) {
    return [];
  }

  return collection.map((entry) => normalizeReportRecord(entry)).filter(Boolean);
}

function normalizeReportRecord(entry) {
  const source = entry?.properties && entry?.geometry ? entry.properties : entry;

  if (!source) {
    return null;
  }

  const reportedAt = normalizeDateString(source.reportedAt ?? source.createdAt ?? source.updatedAt);
  const createdAt = normalizeTimestampString(source.createdAt ?? `${reportedAt}T00:00:00.000Z`);
  const updatedAt = normalizeTimestampString(source.updatedAt ?? createdAt);
  const confirmersText = String(source.reportConfirmers ?? "").trim();
  const confirmerCount = Number(source.reportConfirmersCount);

  return {
    id: String(source.id ?? cryptoRandomId()),
    title: String(source.title ?? "").trim(),
    categoryId: String(source.categoryId ?? source.category ?? "").trim(),
    categoryLabel: String(source.categoryLabel ?? source.category ?? "").trim(),
    categoryColor: String(source.categoryColor ?? "").trim(),
    description: String(source.description ?? "").trim(),
    locationName: String(source.locationName ?? source.location ?? "").trim(),
    status: String(source.status ?? "Registrado").trim() || "Registrado",
    severity: String(source.severity ?? "Media").trim() || "Media",
    latitude: Number(source.latitude),
    longitude: Number(source.longitude),
    reportedAt,
    createdAt,
    updatedAt,
    reportBuilding: String(source.reportBuilding ?? "").trim(),
    reportBlock: String(source.reportBlock ?? "").trim(),
    reportFloor: String(source.reportFloor ?? "").trim(),
    reportEnvironment: String(source.reportEnvironment ?? "").trim(),
    reportProblem: String(source.reportProblem ?? "").trim(),
    reportImageDataUrl: String(source.reportImageDataUrl ?? ""),
    reportImageName: String(source.reportImageName ?? "").trim(),
    reportConfirmers: confirmersText,
    reportConfirmersCount: Number.isFinite(confirmerCount)
      ? confirmerCount
      : inferConfirmersCount(confirmersText),
  };
}

function dedupeReports(reports) {
  const seenIds = new Set();
  const uniqueReports = [];

  reports.forEach((report) => {
    if (!report || seenIds.has(report.id)) {
      return;
    }

    seenIds.add(report.id);
    uniqueReports.push(report);
  });

  return uniqueReports;
}

function sortReportsByRecencyDesc(a, b) {
  return `${b.reportedAt}${b.createdAt}`.localeCompare(`${a.reportedAt}${a.createdAt}`);
}

function renderReportsTableState(message, isError = false) {
  const tbody = document.getElementById("reports-table-body");
  const summary = document.getElementById("reports-summary");

  if (tbody) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" class="reports-table__empty">${escapeHtml(message)}</td>
      </tr>
    `;
  }

  if (summary) {
    summary.textContent = message;
    summary.classList.toggle("reports-summary--error", isError);
  }
}

function renderReportsTable(reports) {
  const tbody = document.getElementById("reports-table-body");
  const summary = document.getElementById("reports-summary");

  if (!tbody) {
    return;
  }

  if (!reports.length) {
    renderReportsTableState("Nenhum report encontrado.");
    return;
  }

  tbody.innerHTML = reports
    .map(
      (report) => `
        <tr>
          <td>
            <span class="report-id">${escapeHtml(formatShortReportId(report.id))}</span>
          </td>
          <td>
            <div class="report-location">
              <strong class="report-location__title">
                ${escapeHtml(report.locationName || "Local nao informado")}
              </strong>
              <span class="report-location__line">
                Predio: ${escapeHtml(report.reportBuilding || "Nao informado")}
              </span>
              <span class="report-location__line">
                Bloco: ${escapeHtml(report.reportBlock || "Nao informado")}
              </span>
              <span class="report-location__line">
                Andar: ${escapeHtml(report.reportFloor || "Nao informado")}
              </span>
              <span class="report-location__line">
                Ambiente: ${escapeHtml(report.reportEnvironment || "Nao informado")}
              </span>
            </div>
          </td>
          <td>
            <span class="report-status">${escapeHtml(report.status)}</span>
          </td>
          <td>${escapeHtml(formatReportDate(report.reportedAt))}</td>
          <td>
            <span class="report-count">
              ${numberFormatter.format(mockSolicitantsCount(report))}
            </span>
          </td>
        </tr>
      `,
    )
    .join("");

  if (summary) {
    summary.textContent = `${numberFormatter.format(reports.length)} reports carregados.`;
    summary.classList.remove("reports-summary--error");
  }
}

function inferConfirmersCount(confirmersText) {
  if (!confirmersText) {
    return 0;
  }

  return confirmersText
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean).length;
}

function mockSolicitantsCount(report) {
  return 1 + (hashString(`${report.id}|${report.reportedAt}|${report.status}`) % 9);
}

function formatShortReportId(value) {
  return `#${hashString(String(value ?? ""))}`;
}

function hashString(value) {
  let hash = 2166136261;
  const text = String(value ?? "");

  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return Math.abs(hash % 1000000)
    .toString()
    .padStart(6, "0");
}

function normalizeDateString(value) {
  const text = String(value ?? "").trim();

  if (!text) {
    return new Date().toISOString().slice(0, 10);
  }

  return text.slice(0, 10);
}

function normalizeTimestampString(value) {
  const text = String(value ?? "").trim();

  if (!text) {
    return `${new Date().toISOString().slice(0, 10)}T00:00:00.000Z`;
  }

  return text;
}

function formatReportDate(value) {
  const normalized = normalizeDateString(value);
  const [year, month, day] = normalized.split("-");

  if (!year || !month || !day) {
    return normalized;
  }

  return `${day}/${month}/${year}`;
}

function renderDashboard(data) {
  renderSnapshot(data.snapshot);
  renderStatuses(data.statuses);
  renderMetrics(data.metrics);
  renderCategoryChart(data.categories);
  renderTerritory(data.territory);
  renderUrgentReports(data.urgentReports);
  applyRevealDelays();
}

function renderSnapshot(snapshot) {
  const container = document.getElementById("snapshot-chips");

  if (!container) {
    return;
  }

  container.innerHTML = snapshot
    .map(
      (item) =>
        `<span class="chip" style="--chip-color: ${item.color}">${escapeHtml(item.label)}</span>`,
    )
    .join("");
}

function renderStatuses(statuses) {
  const container = document.getElementById("status-breakdown");

  if (!container) {
    return;
  }

  container.innerHTML = statuses
    .map(
      (status) => `
        <article class="status-card">
          <span class="status-card__label">${escapeHtml(status.label)}</span>
          <strong>${numberFormatter.format(status.count)}</strong>
        </article>
      `,
    )
    .join("");
}

function renderMetrics(metrics) {
  const container = document.getElementById("metric-grid");

  if (!container) {
    return;
  }

  container.innerHTML = metrics
    .map(
      (metric) => `
        <article class="panel metric-card" data-reveal style="--metric-color: ${metric.tone}">
          <span class="metric-card__label">${escapeHtml(metric.label)}</span>
          <div class="metric-card__value-row">
            <strong class="metric-card__value">${escapeHtml(String(metric.value))}</strong>
            <span class="metric-card__badge">${escapeHtml(metric.badge)}</span>
          </div>
          <p class="metric-card__helper">${escapeHtml(metric.helper)}</p>
        </article>
      `,
    )
    .join("");
}

function renderCategoryChart(categories) {
  const container = document.getElementById("category-chart");
  if (!container) {
    return;
  }

  const maxTotal = Math.max(...categories.map((category) => category.total));

  container.innerHTML = categories
    .map((category, index) => {
      const totalWidth = `${(category.total / maxTotal) * 100}%`;
      const resolvedWidth = `${(category.resolved / maxTotal) * 100}%`;
      const resolvedRate = Math.round((category.resolved / category.total) * 100);

      return `
        <article class="chart-row" style="--delay: ${index * 70}ms">
          <div class="chart-row__meta">
            <div>
              <div class="chart-row__title">
                <span class="chart-row__dot" style="--bar-color: ${category.color}"></span>
                <span>${escapeHtml(category.label)}</span>
              </div>
              <p class="chart-row__helper">${resolvedRate}% resolvidos no periodo</p>
            </div>
            <div class="chart-row__values">
              <strong>${numberFormatter.format(category.total)}</strong>
              <span class="chart-row__helper">${numberFormatter.format(category.resolved)} concluidos</span>
            </div>
          </div>
          <div class="chart-row__track">
            <span
              class="chart-row__fill"
              style="--bar-color: ${category.color}; --target-width: ${totalWidth}"
            ></span>
            <span class="chart-row__resolved" style="--resolved-width: ${resolvedWidth}"></span>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderTerritory(areas) {
  const chart = document.getElementById("territory-chart");
  const legend = document.getElementById("territory-legend");
  const focus = document.getElementById("territory-focus");
  const areaList = document.getElementById("critical-area-list");
  const centerValue = document.getElementById("territory-center-value");
  const centerUnit = document.getElementById("territory-center-unit");
  const centerCaption = document.getElementById("territory-center-caption");

  if (
    !chart ||
    !legend ||
    !focus ||
    !areaList ||
    !centerValue ||
    !centerUnit ||
    !centerCaption
  ) {
    return;
  }

  const geometry = {
    width: 680,
    height: 520,
    cx: 340,
    cy: 260,
    startAngle: -0.58,
    sweepAngle: Math.PI * 1.64,
    padAngle: 0.022,
    coreRadius: 58,
    levelGap: 12,
    levels: {
      area: { minThickness: 28, maxThickness: 64 },
      category: { minThickness: 20, maxThickness: 54 },
      stage: { minThickness: 16, maxThickness: 44 },
    },
  };

  const totalActive = areas.reduce((sum, area) => sum + area.active, 0);
  const totalCritical = areas.reduce((sum, area) => sum + area.critical, 0);
  const topArea = areas.reduce((current, area) => (area.active > current.active ? area : current), areas[0]);
  const allCategories = areas.reduce((acc, area) => acc.concat(area.categories), []);
  const allStages = allCategories.reduce((acc, category) => acc.concat(category.stages), []);
  const maxByLevel = {
    area: Math.max(...areas.map((area) => area.active)),
    category: Math.max(...allCategories.map((category) => category.value)),
    stage: Math.max(...allStages.map((stage) => stage.value)),
  };
  const maxOuterRadii = {
    area: geometry.coreRadius + geometry.levelGap + geometry.levels.area.maxThickness,
    category:
      geometry.coreRadius +
      geometry.levelGap +
      geometry.levels.area.maxThickness +
      geometry.levelGap +
      geometry.levels.category.maxThickness,
    stage:
      geometry.coreRadius +
      geometry.levelGap +
      geometry.levels.area.maxThickness +
      geometry.levelGap +
      geometry.levels.category.maxThickness +
      geometry.levelGap +
      geometry.levels.stage.maxThickness,
  };
  const getLevelThickness = (level, value) => {
    const { minThickness, maxThickness } = geometry.levels[level];
    const maxValue = maxByLevel[level] || 1;
    const normalized = Math.max(0, Math.min(1, value / maxValue));
    return minThickness + (maxThickness - minThickness) * normalized;
  };

  const nodes = new Map();
  const rootNode = {
    id: ROOT_NODE_ID,
    kind: "root",
    label: "Leitura territorial",
    value: totalActive,
    unit: "ativos",
    caption: "campus",
    eyebrow: "Visao geral",
    badge: `${numberFormatter.format(areas.length)} frentes`,
    color: "#93a2ad",
    focusBackground: "rgba(147, 162, 173, 0.18)",
    description: `${numberFormatter.format(totalActive)} ocorrencias ativas distribuidas em ${numberFormatter.format(areas.length)} frentes territoriais e prediais, com maior pressao em ${topArea.short} e ${numberFormatter.format(totalCritical)} casos criticos no recorte atual.`,
    stats: [
      { label: "Frentes", value: String(areas.length) },
      { label: "Casos criticos", value: numberFormatter.format(totalCritical) },
      { label: "Maior pressao", value: topArea.short },
    ],
    pathIds: [],
  };

  nodes.set(rootNode.id, rootNode);

  const segments = [];
  let cursor = geometry.startAngle;

  areas.forEach((area) => {
    const areaAngle = geometry.sweepAngle * (area.active / totalActive);
    const areaInnerRadius = geometry.coreRadius + geometry.levelGap;
    const areaOuterRadius = areaInnerRadius + getLevelThickness("area", area.active);
    const areaId = `area-${area.id}`;
    const areaNode = {
      id: areaId,
      kind: "area",
      label: area.name,
      value: area.active,
      unit: "ativos",
      caption: area.short,
      eyebrow: "Area critica",
      badge: `${numberFormatter.format(area.critical)} criticos`,
      color: area.color,
      focusBackground: hexToRgba(area.color, 0.16),
      description: area.summary,
      stats: [
        { label: "Ativos", value: numberFormatter.format(area.active) },
        { label: "Criticos", value: numberFormatter.format(area.critical) },
        { label: "Tendencia", value: area.trend },
      ],
      areaId: area.id,
      pathIds: [areaId],
    };

    nodes.set(areaNode.id, areaNode);
    segments.push(
      createSegment({
        node: areaNode,
        fill: mixColors(area.color, "#17212b", 0.08),
        startAngle: cursor,
        endAngle: cursor + areaAngle,
        innerRadius: areaInnerRadius,
        outerRadius: areaOuterRadius,
        geometry,
      }),
    );

    let categoryCursor = cursor;

    area.categories.forEach((category, categoryIndex) => {
      const categoryAngle = areaAngle * (category.value / area.active);
      const categoryId = `category-${area.id}-${slugify(category.label)}`;
      const categoryShare = Math.round((category.value / area.active) * 100);
      const categoryColor = mixColors(area.color, "#ffffff", 0.12 + categoryIndex * 0.06);
      const categoryInnerRadius = areaOuterRadius + geometry.levelGap;
      const categoryOuterRadius = categoryInnerRadius + getLevelThickness("category", category.value);
      const categoryNode = {
        id: categoryId,
        kind: "category",
        label: category.label,
        value: category.value,
        unit: "casos",
        caption: area.short,
        eyebrow: "Frente operacional",
        badge: area.short,
        color: categoryColor,
        focusBackground: hexToRgba(area.color, 0.14),
        description: `${category.note} ${categoryShare}% da carteira desta area.`,
        stats: [
          { label: "Casos", value: numberFormatter.format(category.value) },
          { label: "Peso na area", value: `${categoryShare}%` },
          { label: "Area", value: area.short },
        ],
        areaId: area.id,
        pathIds: [areaId, categoryId],
      };

      nodes.set(categoryNode.id, categoryNode);
      segments.push(
        createSegment({
          node: categoryNode,
          fill: categoryColor,
          startAngle: categoryCursor,
          endAngle: categoryCursor + categoryAngle,
          innerRadius: categoryInnerRadius,
          outerRadius: categoryOuterRadius,
          geometry,
        }),
      );

      let stageCursor = categoryCursor;

      category.stages.forEach((stage, stageIndex) => {
        const stageAngle = categoryAngle * (stage.value / category.value);
        const stageId = `stage-${area.id}-${slugify(category.label)}-${slugify(stage.label)}`;
        const stageShare = Math.round((stage.value / category.value) * 100);
        const stageColor = mixColors(categoryColor, "#ffffff", 0.12 + stageIndex * 0.08);
        const stageInnerRadius = categoryOuterRadius + geometry.levelGap;
        const stageOuterRadius = stageInnerRadius + getLevelThickness("stage", stage.value);
        const stageNode = {
          id: stageId,
          kind: "stage",
          label: stage.label,
          value: stage.value,
          unit: "casos",
          caption: category.label,
          eyebrow: "Estagio de resposta",
          badge: category.label,
          color: stageColor,
          focusBackground: hexToRgba(area.color, 0.14),
          description: `${stageNarrative(stage.label)} ${stageShare}% desta frente em ${area.short}.`,
          stats: [
            { label: "Casos", value: numberFormatter.format(stage.value) },
            { label: "Categoria", value: category.label },
            { label: "Area", value: area.short },
          ],
          areaId: area.id,
          pathIds: [areaId, categoryId, stageId],
        };

        nodes.set(stageNode.id, stageNode);
        segments.push(
          createSegment({
            node: stageNode,
            fill: stageColor,
            startAngle: stageCursor,
            endAngle: stageCursor + stageAngle,
            innerRadius: stageInnerRadius,
            outerRadius: stageOuterRadius,
            geometry,
          }),
        );

        stageCursor += stageAngle;
      });

      categoryCursor += categoryAngle;
    });

    cursor += areaAngle;
  });

  chart.setAttribute("viewBox", `0 0 ${geometry.width} ${geometry.height}`);
  chart.innerHTML = [
    `<title id="territory-chart-title">Leitura territorial por predio, area e estagio</title>`,
    `<desc id="territory-chart-desc">Grafico radial interativo com barras radiais de profundidade variavel que organiza a pressao operacional por predio, frente e estagio de resposta.</desc>`,
    `<circle class="territory-guide" cx="${geometry.cx}" cy="${geometry.cy}" r="${geometry.coreRadius + geometry.levelGap}"></circle>`,
    `<circle class="territory-guide" cx="${geometry.cx}" cy="${geometry.cy}" r="${maxOuterRadii.area}"></circle>`,
    `<circle class="territory-guide" cx="${geometry.cx}" cy="${geometry.cy}" r="${maxOuterRadii.category}"></circle>`,
    `<circle class="territory-guide" cx="${geometry.cx}" cy="${geometry.cy}" r="${maxOuterRadii.stage}"></circle>`,
    `<circle class="territory-core" cx="${geometry.cx}" cy="${geometry.cy}" r="${geometry.coreRadius}"></circle>`,
    ...segments.map(
      (segment) => `
        <path
          class="territory-segment"
          data-node-id="${segment.node.id}"
          d="${segment.path}"
          fill="${segment.fill}"
          tabindex="0"
          role="button"
          aria-label="${escapeHtml(buildTerritoryAriaLabel(segment.node))}"
        ></path>
      `,
    ),
  ].join("");

  legend.innerHTML = [
    `
      <button type="button" class="territory-legend__item" data-node-id="${ROOT_NODE_ID}">
        <span class="territory-legend__swatch" style="--legend-color: #93a2ad"></span>
        <span>Visao geral</span>
      </button>
    `,
    ...areas.map(
      (area) => `
        <button type="button" class="territory-legend__item" data-node-id="area-${area.id}">
          <span class="territory-legend__swatch" style="--legend-color: ${area.color}"></span>
          <span>${escapeHtml(area.short)} | ${numberFormatter.format(area.active)}</span>
        </button>
      `,
    ),
  ].join("");

  const maxActive = Math.max(...areas.map((area) => area.active));

  areaList.innerHTML = areas
    .map((area, index) => {
      const width = `${(area.active / maxActive) * 100}%`;

      return `
        <button
          type="button"
          class="area-card"
          data-node-id="area-${area.id}"
          style="--delay: ${index * 70}ms; --area-color: ${area.color}; --area-color-soft: ${mixColors(area.color, "#ffffff", 0.46)}"
        >
          <div class="area-card__header">
            <strong>${escapeHtml(area.name)}</strong>
            <span class="area-card__tag">${numberFormatter.format(area.critical)} criticos</span>
          </div>
          <div class="area-card__bar">
            <span style="--target-width: ${width}"></span>
          </div>
          <div class="area-card__meta">
            <span>${numberFormatter.format(area.active)} ativos</span>
            <span>${escapeHtml(area.trend)} vs anterior</span>
          </div>
        </button>
      `;
    })
    .join("");

  const segmentElements = Array.from(chart.querySelectorAll(".territory-segment"));
  const legendButtons = Array.from(legend.querySelectorAll("[data-node-id]"));
  const areaButtons = Array.from(areaList.querySelectorAll("[data-node-id]"));
  const allInteractiveElements = [...segmentElements, ...legendButtons, ...areaButtons];

  let lockedNodeId = ROOT_NODE_ID;

  function updateCenter(node) {
    centerValue.textContent = numberFormatter.format(node.value);
    centerUnit.textContent = node.unit;
    centerCaption.textContent = node.caption;
  }

  function updateFocus(node) {
    focus.innerHTML = `
      <div class="territory-focus__header">
        <span class="territory-focus__eyebrow">${escapeHtml(node.eyebrow)}</span>
        <div class="territory-focus__headline">
          <div>
            <h3>${escapeHtml(node.label)}</h3>
            <p class="territory-focus__description">${escapeHtml(node.description)}</p>
          </div>
          <span
            class="territory-focus__tag"
            style="--focus-color: ${node.color}; --focus-background: ${node.focusBackground}"
          >
            ${escapeHtml(node.badge)}
          </span>
        </div>
      </div>
      <div class="territory-focus__stats">
        ${node.stats
          .map(
            (stat) => `
              <div class="territory-focus__stat">
                <span>${escapeHtml(stat.label)}</span>
                <strong>${escapeHtml(stat.value)}</strong>
              </div>
            `,
          )
          .join("")}
      </div>
    `;
  }

  function updateSelection(nodeId) {
    const selectedNode = nodes.get(nodeId) ?? rootNode;

    segmentElements.forEach((element) => {
      const currentNode = nodes.get(element.dataset.nodeId);
      if (!currentNode || selectedNode.id === ROOT_NODE_ID) {
        element.classList.remove("is-active", "is-dimmed");
        return;
      }

      const familyRelated = currentNode.pathIds.some((id) => selectedNode.pathIds.includes(id));
      const pathRelated =
        currentNode.id === selectedNode.id ||
        currentNode.pathIds.includes(selectedNode.id) ||
        selectedNode.pathIds.includes(currentNode.id);

      element.classList.toggle("is-active", pathRelated);
      element.classList.toggle("is-dimmed", !familyRelated);
    });

    legendButtons.forEach((button) => {
      const isActive =
        selectedNode.id === button.dataset.nodeId ||
        (selectedNode.id !== ROOT_NODE_ID &&
          button.dataset.nodeId === `area-${selectedNode.areaId}`);

      button.classList.toggle("is-active", Boolean(isActive));
    });

    areaButtons.forEach((button) => {
      button.classList.toggle(
        "is-active",
        selectedNode.id !== ROOT_NODE_ID && button.dataset.nodeId === `area-${selectedNode.areaId}`,
      );
    });

    updateCenter(selectedNode);
    updateFocus(selectedNode);
  }

  allInteractiveElements.forEach((element) => {
    const nodeId = element.dataset.nodeId;
    if (!nodeId) {
      return;
    }

    const previewSelection = () => updateSelection(nodeId);
    const restoreSelection = () => updateSelection(lockedNodeId);

    element.addEventListener("mouseenter", previewSelection);
    element.addEventListener("mouseleave", restoreSelection);
    element.addEventListener("focus", previewSelection);
    element.addEventListener("blur", restoreSelection);
    element.addEventListener("click", () => {
      lockedNodeId = nodeId;
      updateSelection(nodeId);
    });

    if (element.matches("path")) {
      element.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          lockedNodeId = nodeId;
          updateSelection(nodeId);
        }
      });
    }
  });

  updateSelection(ROOT_NODE_ID);
}

function renderUrgentReports(reports) {
  const tbody = document.getElementById("urgent-table-body");

  if (!tbody) {
    return;
  }

  tbody.innerHTML = reports
    .map(
      (report) => `
        <tr>
          <td>
            <span class="table-badge table-badge--${slugify(report.priority)}">
              ${escapeHtml(report.priority)}
            </span>
          </td>
          <td>
            <div class="table-title">
              <strong>${escapeHtml(report.title)}</strong>
              <span class="table-meta">
                ${escapeHtml(report.area)} | ${escapeHtml(report.category)}
              </span>
              <p class="table-impact">${escapeHtml(report.detail)}</p>
            </div>
          </td>
          <td>
            <div class="table-response">
              <span class="table-status">${escapeHtml(report.status)}</span>
              <span class="table-impact">${escapeHtml(report.impact)}</span>
            </div>
          </td>
          <td>
            <div class="table-response">
              <strong>${escapeHtml(report.response)}</strong>
              <span class="table-meta">${escapeHtml(report.followUp)}</span>
            </div>
          </td>
        </tr>
      `,
    )
    .join("");
}

function createSegment({ node, fill, startAngle, endAngle, innerRadius, outerRadius, geometry }) {
  const safePad = Math.min(geometry.padAngle, (endAngle - startAngle) / 3);
  const paddedStart = startAngle + safePad / 2;
  const paddedEnd = endAngle - safePad / 2;

  return {
    node,
    fill,
    path: createArcPath(
      geometry.cx,
      geometry.cy,
      innerRadius,
      outerRadius,
      paddedStart,
      paddedEnd,
    ),
  };
}

function createArcPath(cx, cy, innerRadius, outerRadius, startAngle, endAngle) {
  const outerStart = polarToCartesian(cx, cy, outerRadius, startAngle);
  const outerEnd = polarToCartesian(cx, cy, outerRadius, endAngle);
  const innerEnd = polarToCartesian(cx, cy, innerRadius, endAngle);
  const innerStart = polarToCartesian(cx, cy, innerRadius, startAngle);
  const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;

  return [
    "M",
    formatPoint(outerStart.x),
    formatPoint(outerStart.y),
    "A",
    outerRadius,
    outerRadius,
    0,
    largeArcFlag,
    1,
    formatPoint(outerEnd.x),
    formatPoint(outerEnd.y),
    "L",
    formatPoint(innerEnd.x),
    formatPoint(innerEnd.y),
    "A",
    innerRadius,
    innerRadius,
    0,
    largeArcFlag,
    0,
    formatPoint(innerStart.x),
    formatPoint(innerStart.y),
    "Z",
  ].join(" ");
}

function polarToCartesian(cx, cy, radius, angle) {
  return {
    x: cx + Math.cos(angle) * radius,
    y: cy + Math.sin(angle) * radius,
  };
}

function buildTerritoryAriaLabel(node) {
  return `${node.label}: ${numberFormatter.format(node.value)} ${node.unit}. ${node.description}`;
}

function stageNarrative(label) {
  if (label === "Critico") {
    return "Demandas com impacto imediato sobre operacao, seguranca ou circulacao.";
  }

  if (label === "Em tratamento") {
    return "Ocorrencias ja encaminhadas para correcao ou intervencao de campo.";
  }

  return "Casos estabilizados que ainda pedem validacao e acompanhamento local.";
}

function mixColors(baseHex, targetHex, ratio) {
  const base = parseHexColor(baseHex);
  const target = parseHexColor(targetHex);
  const safeRatio = Math.max(0, Math.min(1, ratio));

  return rgbToHex({
    r: Math.round(base.r + (target.r - base.r) * safeRatio),
    g: Math.round(base.g + (target.g - base.g) * safeRatio),
    b: Math.round(base.b + (target.b - base.b) * safeRatio),
  });
}

function hexToRgba(hex, alpha) {
  const color = parseHexColor(hex);
  const safeAlpha = Math.max(0, Math.min(1, alpha));
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${safeAlpha})`;
}

function parseHexColor(hex) {
  const normalized = String(hex).replace("#", "");
  const value =
    normalized.length === 3
      ? normalized
          .split("")
          .map((part) => `${part}${part}`)
          .join("")
      : normalized;

  return {
    r: Number.parseInt(value.slice(0, 2), 16),
    g: Number.parseInt(value.slice(2, 4), 16),
    b: Number.parseInt(value.slice(4, 6), 16),
  };
}

function rgbToHex({ r, g, b }) {
  return `#${[r, g, b]
    .map((channel) => Math.max(0, Math.min(255, channel)).toString(16).padStart(2, "0"))
    .join("")}`;
}

function formatPoint(value) {
  return value.toFixed(2);
}

function applyRevealDelays() {
  const revealElements = Array.from(document.querySelectorAll("[data-reveal]"));
  revealElements.forEach((element, index) => {
    if (!element.style.getPropertyValue("--delay")) {
      element.style.setProperty("--delay", `${index * 80}ms`);
    }
  });
}

function slugify(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
