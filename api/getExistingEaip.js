// api/getExistingEaip.js
import { getGoogleAuthClients } from './_utils.js';

export default async function handler(req, res) {
  const { maTaiSan } = req.query;

  if (!maTaiSan) {
    return res.status(200).json([]);
  }

  try {
    const { sheets } = await getGoogleAuthClients();

    // Lấy dữ liệu từ cả 2 sheet cùng lúc
    const [giamDinhRes, eaipRes] = await Promise.all([
        sheets.spreadsheets.values.get({
            spreadsheetId: process.env.SHEET_ID,
            range: process.env.GIAMDINH_SHEET_NAME,
        }),
        sheets.spreadsheets.values.get({
            spreadsheetId: process.env.SHEET_ID,
            range: process.env.EAIP_SHEET_NAME,
        })
    ]);

    // Xử lý sheet GiamDinh để tìm GiamDinh_ID mới nhất
    const giamDinhRows = giamDinhRes.data.values;
    const giamDinhHeaders = giamDinhRows.shift();
    const gdIdIndex = giamDinhHeaders.indexOf("ID");
    const gdMaTaiSanIndex = giamDinhHeaders.indexOf("Mã tài sản");

    let latestGiamDinhId = null;
    for (let i = giamDinhRows.length - 1; i >= 0; i--) {
        if (giamDinhRows[i][gdMaTaiSanIndex] === maTaiSan) {
            latestGiamDinhId = giamDinhRows[i][gdIdIndex];
            break;
        }
    }
    
    if (!latestGiamDinhId) {
        return res.status(200).json([]);
    }

    // Xử lý sheet EAIP để lọc theo GiamDinh_ID
    const eaipRows = eaipRes.data.values;
    const eaipHeaders = eaipRows.shift();
    const eaipGiamDinhIdIndex = eaipHeaders.indexOf("GiamDinh_ID");
    const maChungThuIndex = eaipHeaders.indexOf("Mã Chứng Thư");
    const chuTrinhIndex = eaipHeaders.indexOf("Chu Trình");
    // ... (lấy các index cột khác tương tự)
    
    const reports = eaipRows
      .filter(row => row[eaipGiamDinhIdIndex] === latestGiamDinhId)
      .map(row => ({
          maChungThu: row[maChungThuIndex],
          chuTrinh: row[chuTrinhIndex],
          // ... (map các trường khác)
          hinhAnh: row[eaipHeaders.indexOf("Link Hình Ảnh")] ? row[eaipHeaders.indexOf("Link Hình Ảnh")].split(' , ') : []
      }));

    res.status(200).json(reports);
  } catch (error) {
    console.error(`getExistingEaip Error: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
}
