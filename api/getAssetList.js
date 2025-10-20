// api/getAssetList.js
import { getGoogleAuthClients } from './_utils.js';

export default async function handler(req, res) {
  // Lấy maChungThu từ query string của URL
  const { maChungThu } = req.query;

  if (!maChungThu) {
    return res.status(200).json({ status: 'success', data: [] });
  }

  try {
    const { sheets } = await getGoogleAuthClients();

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range: process.env.DMTAISAN_SHEET_NAME,
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return res.status(200).json({ status: 'success', data: [] });
    }

    const headers = rows.shift();
    const maTaiSanIndex = headers.indexOf("ID Tài sản");
    const maChungThuIndex = headers.indexOf("Số chứng thư");
    const mucIndex = headers.indexOf("Mục");
    const tenTaiSanIndex = headers.indexOf("Tên tài sản");

    if ([maTaiSanIndex, maChungThuIndex, mucIndex, tenTaiSanIndex].includes(-1)) {
      throw new Error("Sheet DMTaiSan thiếu một trong các cột bắt buộc.");
    }

    const filteredData = rows
      .filter(row => row[maChungThuIndex] === maChungThu)
      .map(row => ({
        maTaiSan: row[maTaiSanIndex],
        maChungThu: row[maChungThuIndex],
        muc: row[mucIndex],
        tenTaiSan: row[tenTaiSanIndex]
      }));

    res.status(200).json({ status: 'success', data: filteredData });
  } catch (error) {
    console.error(`getAssetList Error: ${error.message}`);
    res.status(500).json({ status: 'error', message: error.message });
  }
}
