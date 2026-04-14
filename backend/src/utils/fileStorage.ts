import fs from 'fs/promises';
import path from 'path';

const dataPath = path.join(__dirname, '../../../data');

export async function readJSON<T>(filename: string): Promise<T> {
  const content = await fs.readFile(path.join(dataPath, filename), 'utf-8');
  return JSON.parse(content);
}

export async function writeJSON<T>(filename: string, data: T): Promise<void> {
  await fs.writeFile(path.join(dataPath, filename), JSON.stringify(data, null, 2));
}