// Netlify serverless function để xử lý các API request
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

// Mock environment variables for demo
const mockEnvironmentVariables = {
  DMTAISAN_SHEET_NAME: 'DanhMucTaiSan',
  EAIP_SHEET_NAME: 'EAIP',
  FOLDER_ID: '1_mock_folder_id_for_demo_purposes',
  GIAMDINH_SHEET_NAME: 'GiamDinh',
  GOOGLE_SERVICE_ACCOUNT_CREDENTIALS: JSON.stringify({
    "type": "service_account",
    "project_id": "mock-project-id",
    "private_key_id": "mock-key-id",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMOCK_PRIVATE_KEY_FOR_DEMO\n-----END PRIVATE KEY-----\n",
    "client_email": "mock-service-account@mock-project.iam.gserviceaccount.com",
    "client_id": "000000000000000000000",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/mock-email"
  }),
  SHEET_ID: '1mock_sheet_id_for_demo_purposes'
};

// Initialize mock environment
Object.entries(mockEnvironmentVariables).forEach(([key, value]) => {
  if (!process.env[key]) {
    process.env[key] = typeof value === 'string' ? value : JSON.stringify(value);
  }
});

const dev = false; // Always use production mode in Netlify functions
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