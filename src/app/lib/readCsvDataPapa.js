// lib/readCsv.js
import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

export const readCsv = async (filePath) => {
  const csvFile = fs.readFileSync(path.join(process.cwd(), filePath), 'utf8');
  return new Promise((resolve, reject) => {
    Papa.parse(csvFile, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        resolve(result.data);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};
