const reports = [
  {
    id: "r-vaso",
    title: "Vaso entupido",
    date: "10/05/26",
    time: "14:00",
    reporter: "Joao da Silva",
    document: "DRE: 111222333",
    location: "Bloco A, 2o andar, banheiro masc",
    status: "Em analise",
  },
  {
    id: "r-luz",
    title: "Lampada queimada",
    date: "10/05/26",
    time: "12:20",
    reporter: "Maria Oliveira",
    document: "DRE: 118445220",
    location: "Bloco C, terreo, corredor principal",
    status: "Chamado aberto",
  },
  {
    id: "r-vazamento",
    title: "Vazamento em pia",
    date: "09/05/26",
    time: "17:35",
    reporter: "Pedro Nascimento",
    document: "DRE: 109773841",
    location: "Bloco B, 1o andar, laboratorio 103",
    status: "Em analise",
  },
  {
    id: "r-porta",
    title: "Porta travando",
    date: "09/05/26",
    time: "09:10",
    reporter: "Ana Costa",
    document: "SIAPE: 2240191",
    location: "Bloco A, sala 204",
    status: "Resolvido",
  },
];

const managerView = document.getElementById("manager-view");
const detailView = document.getElementById("detail-view");
const reportsList = document.getElementById("reports-list");
const menuButton = document.getElementById("manager-menu-button");
const menuPanel = document.getElementById("manager-menu");
const backButton = document.getElementById("back-to-dashboard");
const detailTitle = document.getElementById("detail-title");
const detailReporter = document.getElementById("detail-reporter");
const detailLocation = document.getElementById("detail-location");
const statusForm = document.getElementById("status-form");
const statusSelect = document.getElementById("status-select");
const statusFeedback = document.getElementById("status-feedback");

let selectedReport = reports[0];

renderReports();
bindEvents();

function renderReports() {
  reportsList.innerHTML = reports
    .map(
      (report, index) => `
        <button class="report-row" type="button" data-report-id="${report.id}">
          <span class="report-row__content">
            <span class="report-row__title">
              <strong>${index + 1}. ${escapeHtml(report.title)}</strong>
              <span>(${escapeHtml(report.date)} - ${escapeHtml(report.time)})</span>
            </span>
            <span class="report-row__meta">
              <span>Local: ${escapeHtml(report.location)}</span>
              <span>Reportante: ${escapeHtml(report.reporter)} (${escapeHtml(report.document)})</span>
            </span>
          </span>
          <span class="report-row__image">IMG</span>
        </button>
      `,
    )
    .join("");
}

function bindEvents() {
  reportsList.addEventListener("click", (event) => {
    const reportRow = event.target.closest("[data-report-id]");

    if (!reportRow) {
      return;
    }

    const report = findReport(reportRow.dataset.reportId);
    openReportDetail(report);
  });

  document.querySelectorAll(".map-pin").forEach((pin) => {
    pin.addEventListener("click", () => {
      openReportDetail(findReport(pin.dataset.reportId));
    });
  });

  menuButton.addEventListener("click", () => {
    menuPanel.hidden = !menuPanel.hidden;
  });

  backButton.addEventListener("click", () => {
    detailView.hidden = true;
    managerView.hidden = false;
    statusFeedback.textContent = "";
  });

  statusForm.addEventListener("submit", (event) => {
    event.preventDefault();
    selectedReport.status = statusSelect.value;
    statusFeedback.textContent = `Situacao atualizada para: ${selectedReport.status}.`;
    renderReports();
  });
}

function openReportDetail(report) {
  selectedReport = report;
  detailTitle.textContent = `${report.title} (${report.date} - ${report.time})`;
  detailReporter.textContent = `${report.reporter} (${report.document})`;
  detailLocation.textContent = report.location;
  statusSelect.value = report.status;
  statusFeedback.textContent = "";
  managerView.hidden = true;
  detailView.hidden = false;
  detailView.scrollIntoView({ block: "start" });
}

function findReport(reportId) {
  return reports.find((report) => report.id === reportId) ?? reports[0];
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
