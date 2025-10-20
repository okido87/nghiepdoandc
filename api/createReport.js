// api/createReport.js
import { getGoogleAuthClients } from './_utils.js';
import { v4 as uuidv4 } from 'uuid';

// Hàm helper để tìm hoặc tạo folder
async function getOrCreateFolder(drive, parentFolderId, folderName) {
  // Tìm folder
  const query = `'${parentFolderId}' in parents and name = '${folderName}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`;
  const res = await drive.files.list({ q: query, fields: 'files(id)' });

  if (res.data.files.length > 0) {
    return res.data.files[0].id; // Trả về ID folder đã có
  } else {
    // Tạo folder mới
    const fileMetadata = {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [parentFolderId],
    };
    const newFolder = await drive.files.create({
      resource: fileMetadata,
      fields: 'id',
    });
    return newFolder.data.id;
  }
}

export default async function handler(req, res) {
  const { giamDinhData, eaipData } = req.body;

  try {
    const { sheets, drive } = await getGoogleAuthClients();

    // 1. Logic tạo thư mục lồng nhau trên Drive
    const { maChungThu, maTaiSan, maKepChi } = giamDinhData;
    if (!maChungThu || !maTaiSan || !maKepChi) {
      throw new Error("Mã chứng thư, Mã tài sản, và Mã kẹp chì không được để trống.");
    }
    const chungThuFolderId = await getOrCreateFolder(drive, process.env.FOLDER_ID, maChungThu);
    const taiSanFolderId = await getOrCreateFolder(drive, chungThuFolderId, maTaiSan);
    const finalUploadFolderId = await getOrCreateFolder(drive, taiSanFolderId, maKepChi);

    // 2. Ghi dữ liệu placeholder vào Sheets
    const timestamp = new Date().toISOString();
    const giamDinhId = uuidv4();

    // Ghi vào sheet giám định
    const giamDinhAppendResult = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SHEET_ID,
      range: process.env.GIAMDINH_SHEET_NAME,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values: [[
          giamDinhId, timestamp, giamDinhData.maChungThu, giamDinhData.maTaiSan,
          giamDinhData.maKepChi, giamDinhData.tinhTrang, giamDinhData.nguoiTao,
          "Đang tải ảnh lên..."
        ]],
      },
    });

    const updatedRange = giamDinhAppendResult.data.updates.updatedRange;
    const giamDinhRowIndex = parseInt(updatedRange.match(/!A(\d+)/)[1], 10);
    
    let eaipRowIndexes = [];
    if (eaipData && eaipData.length > 0) {
      const eaipValues = eaipData.map(item => [
        uuidv4(), giamDinhId, timestamp, item.maChungThu, item.chuTrinh,
        item.nguoiChiuTrachNhiem, item.nguoiTao, item.tinhTrang, "Đang tải ảnh lên..."
      ]);

      // Note: append trả về range đã update, nhưng để lấy index chính xác của từng dòng
      // cần tính toán hoặc thực hiện append từng dòng một. Để đơn giản, ta tính toán.
      const eaipSheetInfo = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.SHEET_ID, range: process.env.EAIP_SHEET_NAME
      });
      const lastEaipRow = eaipSheetInfo.data.values ? eaipSheetInfo.data.values.length : 0;
      
      await sheets.spreadsheets.values.append({
        spreadsheetId: process.env.SHEET_ID,
        range: process.env.EAIP_SHEET_NAME,
        valueInputOption: 'USER_ENTERED',
        resource: { values: eaipValues }
      });
      
      eaipRowIndexes = eaipData.map((item, index) => ({
        id: item.id,
        rowIndex: lastEaipRow + 1 + index
      }));
    }

    res.status(200).json({ 
      status: 'success',
      folderId: finalUploadFolderId,
      giamDinhRowIndex,
      eaipRowIndexes
    });

  } catch (error) {
    console.error(`createReport Error: ${error.message}`);
    res.status(500).json({ status: 'error', message: error.message });
  }
}
