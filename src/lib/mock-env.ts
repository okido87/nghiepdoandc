// Fake environment variables for demo purposes
export const mockEnvironmentVariables = {
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

// Function to get environment variable with fallback to mock values
export function getEnv(key: string): string {
  // Try to get from actual environment first
  const envValue = process.env[key];
  
  // If not found in environment, use mock value
  if (!envValue) {
    return mockEnvironmentVariables[key as keyof typeof mockEnvironmentVariables] || '';
  }
  
  return envValue;
}

// Function to initialize mock environment if needed
export function initMockEnvironment(): void {
  // Only initialize mock environment in development or if explicitly requested
  if (process.env.NODE_ENV !== 'production' || process.env.USE_MOCK_ENV === 'true') {
    console.log('🔧 Initializing mock environment variables for demo');
    
    // Set mock values to process.env for components that directly access process.env
    Object.entries(mockEnvironmentVariables).forEach(([key, value]) => {
      if (!process.env[key]) {
        process.env[key] = typeof value === 'string' ? value : JSON.stringify(value);
      }
    });
  }
}