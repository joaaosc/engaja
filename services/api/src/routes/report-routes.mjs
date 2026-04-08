import { ReportValidationError } from "../services/report-service.mjs";

export function createReportRoutes({ reportService }) {
  return async function handleReportRoutes(request, response) {
    applyCorsHeaders(response);

    if (request.method === "OPTIONS") {
      response.writeHead(204);
      response.end();
      return;
    }

    const url = new URL(request.url, "http://localhost");

    if (url.pathname === "/api/reports" && request.method === "GET") {
      const reports = await reportService.listReports();
      sendJson(response, 200, {
        data: reports,
      });
      return;
    }

    if (url.pathname === "/api/reports" && request.method === "POST") {
      try {
        const payload = await readJsonBody(request);
        const report = await reportService.createReport(payload);

        sendJson(response, 201, {
          data: report,
        });
      } catch (error) {
        handleRouteError(response, error);
      }

      return;
    }

    sendJson(response, 404, {
      error: {
        code: "not_found",
        message: "Rota nao encontrada.",
      },
    });
  };
}

function applyCorsHeaders(response) {
  response.setHeader("Access-Control-Allow-Origin", "*");
  response.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  response.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
  });
  response.end(`${JSON.stringify(payload, null, 2)}\n`);
}

async function readJsonBody(request) {
  const chunks = [];

  for await (const chunk of request) {
    chunks.push(chunk);
  }

  const rawBody = Buffer.concat(chunks).toString("utf8").trim();

  if (!rawBody) {
    return {};
  }

  try {
    return JSON.parse(rawBody);
  } catch {
    throw new ReportValidationError("O corpo da requisicao precisa ser JSON valido.", [
      "Envie um objeto JSON no body da requisicao.",
    ]);
  }
}

function handleRouteError(response, error) {
  if (error instanceof ReportValidationError) {
    sendJson(response, error.statusCode, {
      error: {
        code: "validation_error",
        message: error.message,
        details: error.details,
      },
    });
    return;
  }

  console.error("Falha ao processar a rota de reports.", error);

  sendJson(response, 500, {
    error: {
      code: "internal_error",
      message: "Falha interna ao processar reports.",
    },
  });
}
