import fs from 'fs';
import path from 'path';

import { NextResponse } from 'next/server'
import type { NextApiHandler } from 'next';

// source of API logic: https://medium.com/@NikolovLazar/creating-and-using-api-routes-in-next-js-7c9798e67684

const handler: NextApiHandler = async (req, res) => {
  
  if (req.method === 'GET') {
    //process the GET request
    try {
      const filePath = path.resolve('src/app/lib/submittedDataSideNav.csv'); // Adjust the path as needed
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const rows = fileContent.trim().split('\n');
      const rowToProcess = rows[4]
      console.error("line 17");
      // const data = rows.map(row => {
      //   try {
      //     const values = row.split(',');
      //     return {
      //         projectid: values[0],
      //         projectname: values[1],
      //         url: values[2],
      //         description: values[3],
      //         icon: values[4],
      //         github: values[5],
      //     };
      // } catch (innerError) {
      //     console.error('Error parsing row:', innerError);
      //     throw innerError; // Re-throw the error to bubble it up to the outer catch block
      // }
      // });
      try {
        const values = rowToProcess.split(',');
        const data = {
            projectid: values[0],
            projectname: values[1],
            url: values[2],
            description: values[3],
            icon: values[4],
            github: values[5],
        };

        // Log the response data
        console.log('Response data:', data);

        // Send the response
        res.status(200).json(data);
    } catch (innerError) {
        console.error('Error parsing row:', innerError);
        res.status(500).json({ error: 'Internal Server Error' });
    }
} catch (error) {
    console.error('Error reading CSV file:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}   

    // return res.status(200).json({ success: true, message: 'GET Message success submitDataSideNav'});
  } else if (req.method === 'POST') {
    try {
      // Parse the incoming data from the request body
      const submittedData = req.body;

      // Process the submitted data as needed
      console.log('Received submittedData:', submittedData);

      // Convert submittedData to CSV format
      const csvData = convertToCSV(submittedData);

      // Write CSV data to file
      const filePath = path.join('src/app/lib', 'submittedDataSideNav.csv');
      fs.writeFileSync(filePath, csvData);

      // Respond with a success message
      return res.status(200).json({ success: true, message: 'POST Message success submitDataSideNav', submittedData });
    } catch (error) {
      // Handle any errors that occur during parsing or processing
      console.error('Error:', error.message);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  } else {
    // Handle unsupported HTTP methods
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
  
  
};



// Function to convert object to CSV format
function convertToCSV(data: any[]): string {
  const headers = Object.keys(data[0]);
  const csvRows = [];

  // Add header row
  csvRows.push(headers.join(','));

  // Add data rows
  for (const item of data) {
    const values = headers.map(header => {
      const value = item[header];
      // Handle nested objects
      if (typeof value === 'object') {
        return JSON.stringify(value);
      } else {
        return value;
      }
    });
    csvRows.push(values.join(','));
  }

  return csvRows.join('\n');
}


export default handler;