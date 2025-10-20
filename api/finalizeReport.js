// api/finalizeReport.js
import { getGoogleAuthClients } from './_utils.js';

export default async function handler(req, res) {
  const updateData = req.body;
  try {
    const { sheets } = await getGoogleAuthClients();
    
    const data = [];

    // Chuẩn bị data update cho Giám định
    data.push({
      range: `${process.env.GIAMDINH_SHEET_NAME}!H${updateData.giamDinhRowIndex}`,
      values: [[updateData.giamDinhImageUrls.join(' , ')]]
    });

    // Chuẩn bị data update cho EAIP
    if (updateData.eaipUpdates && updateData.eaipUpdates.length > 0) {
      updateData.eaipUpdates.forEach(item => {
        data.push({
          range: `${process.env.EAIP_SHEET_NAME}!I${item.rowIndex}`,
          values: [[item.urls.join(' , ')]]
        });
      });
    }

    // Gửi yêu cầu cập nhật hàng loạt để tăng hiệu năng
    await sheets.spreadsheets.values.batchUpdate({
        spreadsheetId: process.env.SHEET_ID,
        resource: {
            valueInputOption: 'USER_ENTERED',
            data: data
        }
    });

    res.status(200).json({ status: 'success' });
  } catch (error) {
    console.error(`finalizeReport Error: ${error.message}`);
    res.status(500).json({ status: 'error', message: error.message });
  }
}
