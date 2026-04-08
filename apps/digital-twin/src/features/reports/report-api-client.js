export function createReportApiClient({ reportsApiUrl }) {
  return {
    async createReport(payload) {
      const response = await requestJson(reportsApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const body = await parseJsonResponse(response);

      if (!response.ok) {
        throw new ReportApiError(body?.error?.message ?? "Falha ao criar o report.", {
          details: body?.error?.details ?? [],
          statusCode: response.status,
        });
      }

      return body.data;
    },

    async listReports() {
      const response = await requestJson(reportsApiUrl, {
        headers: {
          Accept: "application/json",
        },
      });

      const body = await parseJsonResponse(response);

      if (!response.ok) {
        throw new ReportApiError(body?.error?.message ?? "Falha ao listar os reports.", {
          details: body?.error?.details ?? [],
          statusCode: response.status,
        });
      }

      return Array.isArray(body?.data) ? body.data : [];
    },
  };
}

export class ReportApiError extends Error {
  constructor(message, { details = [], isConnectionError = false, statusCode = 500 } = {}) {
    super(message);
    this.name = "ReportApiError";
    this.details = details;
    this.isConnectionError = isConnectionError;
    this.statusCode = statusCode;
  }
}

async function requestJson(url, options) {
  try {
    return await fetch(url, options);
  } catch {
    throw new ReportApiError("Nao foi possivel conectar a API de reports.", {
      isConnectionError: true,
      statusCode: 503,
    });
  }
}

async function parseJsonResponse(response) {
  const rawBody = await response.text();

  if (!rawBody) {
    return null;
  }

  try {
    return JSON.parse(rawBody);
  } catch {
    throw new ReportApiError("A API respondeu com um JSON invalido.", {
      statusCode: response.status,
    });
  }
}
