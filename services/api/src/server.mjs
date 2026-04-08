import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { FileReportRepository } from "./repositories/file-report-repository.mjs";
import { createReportRoutes } from "./routes/report-routes.mjs";
import { ReportService } from "./services/report-service.mjs";

const currentFilePath = fileURLToPath(import.meta.url);
const currentDirectory = path.dirname(currentFilePath);
const repository = new FileReportRepository({
  storageFilePath: path.resolve(currentDirectory, "../../database/data/reports.json"),
});
const reportService = new ReportService({
  reportRepository: repository,
  seedFilePath: path.resolve(
    currentDirectory,
    "../../../packages/reports-domain/seeds/reports.seed.geojson",
  ),
});
const handleRoutes = createReportRoutes({
  reportService,
});

const port = Number(process.env.API_PORT ?? 3001);
const host = process.env.API_HOST ?? "0.0.0.0";

const server = http.createServer((request, response) => {
  handleRoutes(request, response).catch((error) => {
    console.error("Falha inesperada ao atender a requisicao.", error);
    response.writeHead(500, {
      "Content-Type": "application/json; charset=utf-8",
    });
    response.end(
      `${JSON.stringify(
        {
          error: {
            code: "internal_error",
            message: "Falha inesperada na API.",
          },
        },
        null,
        2,
      )}\n`,
    );
  });
});

server.listen(port, host, () => {
  console.log(`Reports API escutando em http://${host}:${port}`);
});
