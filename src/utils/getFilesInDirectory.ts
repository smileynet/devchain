import fs from 'fs';
import path from 'path';

export default async function getFilesInDirectory(directory: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    fs.readdir(directory, (err, files) => {
      if (err) {
        reject(err);
      } else {
        const filePaths = files.map(file => path.join(directory, file));
        resolve(filePaths);
      }
    });
  });
}
