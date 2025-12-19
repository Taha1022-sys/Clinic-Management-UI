import axios from "axios";

// 🚨 BURAYI DİKKATLİ OKU: Environment variable riskini sildik.
// Adresi doğrudan yazdık. Artık localhost'a gitme şansı %0.
const API_URL = "https://clinic-management-api-production.up.railway.app/api/v1";

export const api = axios.create({
  baseURL: API_URL, 
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request Interceptor (Token Kontrolü)
api.interceptors.request.use(
  (config) => {
    let token = null;
    
    // Güvenli Token Okuma
    if (typeof window !== 'undefined') {
        token = localStorage.getItem("token") || localStorage.getItem("accessToken");
    }

    if (!token && typeof document !== 'undefined') {
       const match = document.cookie.match(new RegExp('(^| )token=([^;]+)'));
       if (match) token = match[2];
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// --- API ENDPOINTS ---

export const authApi = {
    login: (credentials: any) => api.post("/auth/login", credentials),
    register: (data: any) => api.post("/auth/register", data),
    getProfile: () => api.get("/auth/profile"), // Auth controller üzerinden çekelim
};

export const doctorApi = {
  getAllDoctors: () => api.get("/cms/doctors"), 
  getDoctorById: (id: string) => api.get(`/cms/doctors/${id}`),
};

export const appointmentApi = {
  createAppointment: (data: {
    strapiDoctorId: number;
    appointmentDate: string; 
    notes?: string;
  }) => api.post("/appointments", data),
  getMyAppointments: () => api.get("/appointments/my-appointments"),
  getAllAppointments: () => api.get("/appointments"),
  cancelAppointment: (id: string) => api.patch(`/appointments/${id}/cancel`),
};

export const userApi = {
  getProfile: () => api.get("/auth/profile"), // BURAYI DÜZELTTİM: /users/profile yerine /auth/profile
  updateProfile: (data: { firstName: string; lastName: string }) =>
    api.patch("/users/profile", data),
  changePassword: (data: { currentPassword: string; newPassword: string }) =>
    api.patch("/users/password", data),
  getAllUsers: () => api.get("/users"), 
};

export const adminApi = {
  getAllAppointments: () => api.get("/appointments"),
  updateAppointmentStatus: (id: string, status: string) =>
    api.patch(`/appointments/${id}/status?status=${status}`),
  deleteDoctor: (id: string) => api.delete(`/cms/doctors/${id}`),
  createDoctor: (data: any) => api.post("/cms/doctors", data),
};

export const contactApi = {
  getAllContacts: () => api.get("/cms/contacts"),
  sendMessage: (data: { name: string; email: string; message: string }) =>
    api.post("/cms/contacts", data),
};

export default api;
