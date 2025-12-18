import axios from "axios";

// Base instance
export const api = axios.create({
  baseURL: "http://localhost:3000/api/v1", 
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request Interceptor (Token Kontrolü)
api.interceptors.request.use(
  (config) => {
    let token = typeof window !== 'undefined' ? localStorage.getItem("token") || localStorage.getItem("accessToken") : null;

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

// --- TÜM API EXPORTLARI BURADA ---

export const authApi = {
    login: (credentials: any) => api.post("/auth/login", credentials),
    register: (data: any) => api.post("/auth/register", data),
    getProfile: () => api.get("/auth/profile"),
};

export const doctorApi = {
  // Senin yakaladığın CMS rotası
  getAllDoctors: () => api.get("/cms/doctors"), 
  getDoctorById: (id: string) => api.get(`/cms/doctors/${id}`),
};

export const appointmentApi = {
  createAppointment: (data: {
    doctorId: number;
    appointmentDate: string; 
    notes: string;
  }) => api.post("/appointments", data),
  getMyAppointments: () => api.get("/appointments/my-appointments"),
  cancelAppointment: (id: string) => api.delete(`/appointments/${id}`),
};

export const userApi = {
  getProfile: () => api.get("/auth/profile"),
  updateProfile: (data: { firstName: string; lastName: string }) =>
    api.patch("/users/profile", data),
  changePassword: (data: { currentPassword: string; newPassword: string }) =>
    api.patch("/users/password", data),
  getAllUsers: () => api.get("/users"), // Admin only
};

export const adminApi = {
  getAllAppointments: () => api.get("/appointments"),
  updateAppointmentStatus: (id: string, status: string) =>
    api.patch(`/appointments/${id}/status?status=${status}`),
  deleteDoctor: (id: string) => api.delete(`/cms/doctors/${id}`),
  createDoctor: (data: any) => api.post("/cms/doctors", data),
};

export default api;