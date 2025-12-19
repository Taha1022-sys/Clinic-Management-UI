import axios from "axios";

// Base instance
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1", 
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request Interceptor (Token Kontrolü ve Enjeksiyonu)
api.interceptors.request.use(
  (config) => {
    // Token'ı bulmaya çalış
    let token = null;
    if (typeof window !== 'undefined') {
        token = localStorage.getItem("token") || localStorage.getItem("accessToken");
    }

    if (!token && typeof document !== 'undefined') {
       const match = document.cookie.match(new RegExp('(^| )token=([^;]+)'));
       if (match) token = match[2];
    }

    // Token varsa Header'a ekle ve konsola bas (Debug için)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      // console.log("🔑 Token isteğe eklendi:", config.url); // İstersen bu yorumu açıp bakabilirsin
    } else {
      console.warn("⚠️ İstek tokensiz gidiyor:", config.url);
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// --- TÜM API EXPORTLARI ---

export const authApi = {
    login: (credentials: any) => api.post("/auth/login", credentials),
    register: (data: any) => api.post("/auth/register", data),
    getProfile: () => api.get("/users/profile"), // DÜZELTİLDİ: /auth/profile yerine /users/profile
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

// DÜZELTİLDİ: Auth yerine Users endpoint'i kullanılıyor
export const userApi = {
  getProfile: () => api.get("/users/profile"), 
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
