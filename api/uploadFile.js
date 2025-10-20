// api/uploadFile.js
import { getGoogleAuthClients } from './_utils.js';
import { Readable } from 'stream';

export default async function handler(req, res) {
  const { folderId, fileName, mimeType } = req.query;
  const base64Data = req.body; // Vercel tự động parse body dạng text/plain

  if (!folderId || !fileName || !base64Data) {
    return res.status(400).json({ status: 'error', message: 'Thiếu thông tin cần thiết.' });
  }

  try {
    const { drive } = await getGoogleAuthClients();
    const fileBuffer = Buffer.from(base64Data, 'base64');

    const fileMetadata = {
      name: decodeURIComponent(fileName),
      parents: [folderId],
    };

    const media = {
      mimeType: decodeURIComponent(mimeType || 'application/octet-stream'),
      body: Readable.from(fileBuffer),
    };

    const file = await drive.files.create({
      resource: fileMetadata,
      media: media,
      fields: 'id',
    });

    const fileId = file.data.id;
    // URL này dùng để hiển thị ảnh trực tiếp, tương tự như cách Apps Script làm
    const fileUrl = `https://lh3.googleusercontent.com/d/${fileId}`;

    res.status(200).json({ status: 'success', url: fileUrl, id: fileId });

  } catch (error) {
    console.error(`uploadFile Error: ${error.message}`);
    res.status(500).json({ status: 'error', message: error.message });
  }
}

// Cấu hình để Vercel không parse body thành JSON mà để dạng text
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // Tăng giới hạn nếu cần
    },
  },
};
