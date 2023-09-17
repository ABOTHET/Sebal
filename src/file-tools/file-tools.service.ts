import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import { Buffer } from 'node:buffer';
import path from "path";

@Injectable()
export class FileToolsService {

  async createFolder(path: string): Promise<boolean> {
    try {
      await fs.mkdir(path);
      return true;
    } catch (error) {
      return false;
    }
  }

  async createFile(path: string): Promise<boolean> {
    try {
      await fs.writeFile(path, "");
      return true;
    } catch (error) {
      return false;
    }
  }

  async writeBufferToFile(path: string, buffer: Buffer): Promise<boolean> {
    try {
      await fs.writeFile(path, buffer);
      return true;
    } catch (error) {
      return false;
    }
  }

  async readBufferFromFile(path: string) {
    try {
      const buffer: Buffer = await fs.readFile(path);
      return buffer;
    } catch (error) {
      return null;
    }
  }

  async deleteFolder(path: string): Promise<boolean> {
    try {
      await fs.rm(path, { recursive: true, force: true });
      return true;
    } catch (error) {
      return false;
    }
  }

}
