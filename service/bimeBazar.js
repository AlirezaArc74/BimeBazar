// // const { handleResponse } = require("./handler");
// // import axios from "axios";
// 'use client'

// export  async function getAddressesService() {
//   try {
//     const response = await axios.get(
//       "https://front-end-task.bmbzr.ir/my-addresses"
//     );
//     return response;
//   } catch (e) {
//     return {
//       message: e,
//     };
//   }
// }

// // pages/api/postToApi.js

// export default async function handler(req, res) {
//   console.log(req, res, 'req res');
//   if (req.method === 'POST') {
//     const formData = req.body;

//     try {
//       // Make the HTTP POST request to the external API
//       const response = await fetch('https://front-end-task.bmbzr.ir/order/completion/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const responseData = await response.json();
//       res.status(200).json(responseData);
//     } catch (error) {
//       console.error('Error:', error.message);
//       res.status(500).json({ error: 'Failed to post data' });
//     }
//   } else {
//     res.status(405).json({ error: 'Method Not Allowed' });
//   }
// }

