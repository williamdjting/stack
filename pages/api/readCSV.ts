import fs from 'fs';
import path from 'path';


// pages/api/csv-data.js
import { readCSV } from '@/app/lib/readCSV';

import type { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  try {
    console.log("Starting to read CSV data");

    try {
      const data = await readCSV('/Users/aida/Documents/GitHub/stack/src/app/lib/submittedDataSideNav.csv'); // Update with your CSV file path
      //const data = await readCSV('/Users/willting/Desktop/Stack/stack-app/src/app/lib/submittedDataSideNav.csv'); // Update with your CSV file path

      console.log("CSV data read successfully");
      console.log("line 17", data)
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