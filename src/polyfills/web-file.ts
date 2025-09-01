import { Blob } from "buffer";
class NodeFile extends Blob {
  name: string;
  lastModified: number;
  constructor(parts: any[], name: string, options: any = {}) {
    super(parts, options);
    this.name = String(name);
    this.lastModified = options.lastModified ?? Date.now();
  }
}
(globalThis as any).File = (globalThis as any).File ?? NodeFile;
