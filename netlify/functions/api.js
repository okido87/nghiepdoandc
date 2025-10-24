// Netlify serverless function để xử lý các API request
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

exports.handler = async (event, context) => {
  const { path, httpMethod, headers, body, queryStringParameters } = event;
  
  // Khởi tạo Next.js app nếu chưa sẵn sàng
  await app.prepare();
  
  try {
    // Tạo request và response objects
    const req = {
      method: httpMethod,
      headers,
      url: path + (Object.keys(queryStringParameters || {}).length > 0 
        ? '?' + new URLSearchParams(queryStringParameters).toString() 
        : ''),
      body: body ? JSON.parse(body) : undefined
    };
    
    let responseData = '';
    const res = {
      statusCode: 200,
      headers: {},
      setHeader: (name, value) => {
        res.headers[name.toLowerCase()] = value;
        return res;
      },
      write: (chunk) => {
        responseData += chunk;
        return true;
      },
      end: (chunk) => {
        if (chunk) responseData += chunk;
      }
    };
    
    // Xử lý request với Next.js
    await new Promise((resolve) => {
      handle(req, res).then(resolve);
    });
    
    // Trả về response
    return {
      statusCode: res.statusCode,
      headers: res.headers,
      body: responseData
    };
  } catch (error) {
    console.error('Error processing request:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' })
    };
  }
};