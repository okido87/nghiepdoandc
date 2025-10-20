// api/_utils.js
import { google } from 'googleapis';

// Hàm này khởi tạo và trả về các client đã được xác thực của Google
export async function getGoogleAuthClients() {
  const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS);

  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: [
      'https://www.googleapis.com/auth/spreadsheets',
      'https://www.googleapis.com/auth/drive',
    ],
  });

  const authClient = await auth.getClient();

  const sheets = google.sheets({ version: 'v4', auth: authClient });
  const drive = google.drive({ version: 'v3', auth: authClient });

  return { sheets, drive, auth };
}
