import fs from 'fs';
import path from 'path';

import { NextResponse } from 'next/server'
import type { NextApiHandler } from 'next';

// source of API logic: https://medium.com/@NikolovLazar/creating-and-using-api-routes-in-next-js-7c9798e67684

const handler: NextApiHandler = async (req, res) => {
  
  if (req.method === 'GET') {
    // process the GET request
    

    return res.status(200).json({ success: true, message: 'GET Message success'});
  } else if (req.method === 'POST') {
    try {
      // Parse the incoming data from the request body
      const submittedData = req.body;

      // Process the submitted data as needed
      console.log('Received submittedData:', submittedData);

      // Respond with a success message
      return res.status(200).json({ success: true, message: 'POST Message success', submittedData });
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

export default handler;