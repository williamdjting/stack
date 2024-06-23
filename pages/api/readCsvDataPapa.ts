import fs from 'fs';
import path from 'path';


// pages/api/csv-data.js
import { readCsv } from '@/app/lib/readCsvDataPapa';

import type { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  try {
    console.log("Starting to read CSV data");

    try {
      const data = await readCsv('submittedDataSideNav.csv'); // Update with your CSV file path
      console.log("CSV data read successfully");
      res.status(200).json(data);
    } catch (error) {
      console.error("Error reading CSV data:", error.message);
      throw new Error("Failed to read CSV data");
    }
  } catch (error) {
    console.error("Handler error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

export default handler;