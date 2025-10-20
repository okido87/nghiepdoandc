// public/script.js

// ===================================================================
// I. KHAI BÁO BIẾN VÀ THAM CHIẾU DOM
// ===================================================================
// Bỏ appUrl vì chúng ta sẽ dùng đường dẫn tương đối
// const nguoiTao = document.getElementById('nguoiTao').value; // Sẽ lấy từ URL parameter
const assetSelector = document.getElementById('asset-selector');
// ... (giữ nguyên các tham chiếu DOM khác)

// ===================================================================
// II. BIẾN TRẠNG THÁI TOÀN CỤC
// ===================================================================
let nguoiTao = '';
let initialMaChungThu = '';
let initialMaTaiSan = '';
// ... (giữ nguyên các biến trạng thái khác)

// ===================================================================
// III. KHỞI TẠO VÀ TẢI DỮ LIỆU
// ===================================================================

// Hàm helper để gọi API, thay thế google.script.run
async function api(endpoint, options = {}) {
  const { method = 'GET', body, params } = options;
  let url = `/api/${endpoint}`;

  if (params) {
    url += '?' + new URLSearchParams(params).toString();
  }

  const fetchOptions = {
    method,
    headers: {},
  };

  if (body) {
    if (typeof body === 'object') {
      fetchOptions.headers['Content-Type'] = 'application/json';
      fetchOptions.body = JSON.stringify(body);
    } else {
      fetchOptions.headers['Content-Type'] = 'text/plain'; // For file upload
      fetchOptions.body = body;
    }
  }

  const response = await fetch(url, fetchOptions);
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || `Lỗi server: ${response.status}`);
  }

  // Một số API trả về JSON, một số thì không
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return response.json();
  }
  return response.text();
}


document.addEventListener('DOMContentLoaded', async () => {
  // Lấy tham số từ URL
  const urlParams = new URLSearchParams(window.location.search);
  nguoiTao = urlParams.get('nguoiTao') || 'Chưa cung cấp';
  initialMaChungThu = urlParams.get('maChungThu') || '';
  initialMaTaiSan = urlParams.get('maTaiSan') || '';

  if (initialMaChungThu) {
    try {
      const response = await api('getAssetList', { params: { maChungThu: initialMaChungThu } });
      populateAssetSelector(response);
    } catch (error) {
      showError(error);
    }
  } else {
    assetSelector.innerHTML = '<option value="">Vui lòng cung cấp Mã Chứng Thư trong URL</option>';
    assetSelector.disabled = true;
  }
  setupDragAndDropListeners();
  updateButtonStates(); 
  document.getElementById('giamdinh-maKepChi').addEventListener('input', updateButtonStates);
  document.getElementById('giamdinh-tinhTrang').addEventListener('input', updateButtonStates);
});

assetSelector.addEventListener('change', async function() {
    // ... (logic bên trong giữ nguyên)
    if (maTaiSan) {
      // ...
      eaipListContainer.innerHTML = '<p id="eaip-loader">Đang tải dữ liệu sự cố đã có...</p>';
      try {
        const items = await api('getExistingEaip', { params: { maTaiSan }});
        renderExistingEaipItems(items);
      } catch (error) {
        handleLoadError(error);
      }
    } else {
      // ...
    }
});


// ... (Các hàm khác như populateAssetSelector, renderExistingEaipItems, showError, ... giữ nguyên)


// ===================================================================
// VIII. LOGIC GỬI FORM VÀ UPLOAD MỚI (PHẦN QUAN TRỌNG NHẤT)
// ===================================================================
async function handleSubmit() {
  // ... (phần validation giữ nguyên)
  
  // ... (phần tạo task và thêm vào queue giữ nguyên)

  const giamDinhData = { /* ... */ };
  const eaipData = [ /* ... */ ];

  try {
    const response = await api('createReport', {
      method: 'POST',
      body: { giamDinhData, eaipData }
    });
    
    if (response.status === 'success') {
      startFileUploadProcess(task.id, response, giamDinhFiles, eaipReportsWithFiles);
    } else {
      updateTaskStatus(task.id, 'error', `Lỗi server: ${response.message}`);
    }
  } catch (err) {
    updateTaskStatus(task.id, 'error', `Lỗi kết nối: ${err.message}`);
  }

  showToast('info', 'Đã vào hàng chờ', `Báo cáo cho TS '${task.maTaiSan}' đang được xử lý.`);
  resetForm(false);
}

async function startFileUploadProcess(taskId, serverResponse, giamDinhFiles, eaipReportsWithFiles) {
    // ... (logic bên trong giữ nguyên)
    // Phần upload file sẽ gọi hàm uploadFile mới
    // ...
}

async function uploadFile(file, folderId) {
  const base64Data = await fileToBase64Data(file);
  const params = {
    folderId,
    fileName: encodeURIComponent(file.name),
    mimeType: encodeURIComponent(file.type)
  };

  // Thay thế fetch cũ bằng hàm api helper
  const result = await api('uploadFile', {
    method: 'POST',
    body: base64Data,
    params: params
  });
  
  if (result.status === 'success') {
    return result.url;
  } else {
    throw new Error(result.message);
  }
}

async function finalizeReportOnServer(updateData) {
    try {
        await api('finalizeReport', {
            method: 'POST',
            body: updateData
        });
        return { status: 'success' };
    } catch (err) {
        return { status: 'error', message: err.message };
    }
}

// Trong hàm startFileUploadProcess, thay thế lời gọi google.script.run.finalizeReport
// ...
updateTaskStatus(taskId, 'pending', 'Đang hoàn tất báo cáo...');
const updatePayload = {
    giamDinhRowIndex: giamDinhRowIndex,
    giamDinhImageUrls: allImageUrls.giamDinh,
    eaipUpdates: eaipUpdates
};

const finalizeResult = await finalizeReportOnServer(updatePayload);

if (finalizeResult.status === 'success') {
    updateTaskStatus(taskId, 'completed', 'Xử lý thành công!');
} else {
    updateTaskStatus(taskId, 'error', `Lỗi hoàn tất: ${finalizeResult.message}`);
}
// ...
