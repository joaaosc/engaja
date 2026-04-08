import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";

export class FileReportRepository {
  constructor({ storageFilePath }) {
    this.storageFilePath = storageFilePath;
  }

  async exists() {
    try {
      await readFile(this.storageFilePath, "utf8");
      return true;
    } catch (error) {
      if (error?.code === "ENOENT") {
        return false;
      }

      throw error;
    }
  }

  async initialize(reports) {
    await this.#writeAll(reports);
  }

  async list() {
    return this.#readAll();
  }

  async create(report) {
    const reports = await this.#readAll();
    reports.push(report);
    await this.#writeAll(reports);
    return report;
  }

  async #readAll() {
    try {
      const raw = await readFile(this.storageFilePath, "utf8");
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      if (error?.code === "ENOENT") {
        return [];
      }

      throw error;
    }
  }

  async #writeAll(reports) {
    await mkdir(path.dirname(this.storageFilePath), { recursive: true });

    const tempFilePath = `${this.storageFilePath}.tmp`;
    const serialized = `${JSON.stringify(reports, null, 2)}\n`;

    await writeFile(tempFilePath, serialized, "utf8");
    await rename(tempFilePath, this.storageFilePath);
  }
}
