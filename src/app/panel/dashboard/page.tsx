"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import AppointmentDetailsModal from "@/components/admin/AppointmentDetailsModal";
import DoctorDetailModal from "@/components/doctors/DoctorDetailModal";
import { 
  Calendar, 
  Users, 
  Stethoscope, 
  MoreHorizontal,
  LogOut,
  LayoutDashboard,
  Home,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import api, { doctorApi } from "@/lib/api";
import { toast } from "sonner";
import { getTranslation, translateBranch } from "@/lib/translations";

// Admin API endpoints
const adminApi = {
  getAllAppointments: () => api.get("/appointments"),
  updateAppointmentStatus: (appointmentId: string, status: string) =>
    api.patch(`/appointments/${appointmentId}/status?status=${status}`),
  deleteDoctor: (id: string) => api.delete(`/doctors/${id}`),
};

// UPDATED TYPE DEFINITION with real API structure
interface Appointment {
  id: string;
  appointmentDate: string;
  status: string;
  notes?: string;
  strapiDoctorId: number; // The ID we use for lookup
  user?: { 
    firstName: string;
    lastName: string;
    email: string;
  };
  // Legacy fields (kept for backward compatibility)
  patient?: { 
    firstName: string;
    lastName: string;
    email: string;
  };
  doctor?: { 
    name: string;
    specialty: string;
    price?: number;
  };
}

const AdminDashboardPage = () => {
  const { user, logout, loading: authLoading, language } = useAuth();
  const t = getTranslation(language);
  
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [doctorsList, setDoctorsList] = useState<any[]>([]); // For lookup
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("appointments");
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedDoctorForDetail, setSelectedDoctorForDetail] = useState<any>(null);
  const [isDoctorDetailModalOpen, setIsDoctorDetailModalOpen] = useState(false);
  
  // Filter states
  const [patientSearch, setPatientSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [specialtyFilter, setSpecialtyFilter] = useState("ALL");

  // Helper: Get doctor by ID from the list
  const getDoctorById = (id: number | string) => {
    return doctorsList.find((doc) => doc.id === Number(id));
  };

  // Filter appointments
  const filteredAppointments = appointments.filter((appointment) => {
    const patient = appointment.user;
    const patientName = `${patient?.firstName || ""} ${patient?.lastName || ""}`.toLowerCase();
    const matchesPatient = patientName.includes(patientSearch.toLowerCase());
    
    const matchesStatus = statusFilter === "ALL" || appointment.status === statusFilter;
    
    const doctor = getDoctorById(appointment.strapiDoctorId);
    const matchesSpecialty = specialtyFilter === "ALL" || doctor?.Branch === specialtyFilter;
    
    return matchesPatient && matchesStatus && matchesSpecialty;
  });

  // Get unique specialties from doctors list
  const uniqueSpecialties = Array.from(new Set(doctorsList.map(d => d.Branch).filter(Boolean)));
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
  });

  // Fetch doctors first for lookup
  useEffect(() => {
    if (user?.role === "ADMIN") {
      fetchDoctorsForLookup();
    }
  }, [user]);

  // Fetch data when user is authenticated and is admin
  useEffect(() => {
    if (user?.role === "ADMIN" && doctorsList.length > 0) {
      fetchAppointments();
      if (activeTab === "doctors") {
        fetchDoctors();
      } else if (activeTab === "patients") {
        fetchPatients();
      }
    }
  }, [user, activeTab, doctorsList]);

  const fetchDoctorsForLookup = async () => {
    try {
      const response = await doctorApi.getAllDoctors();
      const rawData = response.data || [];
      const mappedDoctors = rawData.map((doc: any) => ({
        id: doc.id,
        Fullname: doc.Fullname,
        Title: doc.Title,
        Branch: doc.Branch,
        Price: doc.Price,
        Experience: doc.Experience,
      }));
      setDoctorsList(mappedDoctors);
      console.log("👨‍⚕️ [Admin] Doctors loaded for lookup:", mappedDoctors.length);
    } catch (error) {
      console.error("Error fetching doctors for lookup:", error);
    }
  };

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await adminApi.getAllAppointments();
      const appointmentsData = response.data || [];
      
      // Debug log to check data structure
      console.log("📋 [Admin] Raw Appointment Data:", appointmentsData[0]);
      
      setAppointments(appointmentsData);
      
      const total = appointmentsData.length;
      const pending = appointmentsData.filter((a: Appointment) => a.status === "PENDING").length;
      const confirmed = appointmentsData.filter((a: Appointment) => a.status === "CONFIRMED").length;
      const completed = appointmentsData.filter((a: Appointment) => a.status === "COMPLETED").length;
      
      setStats({ total, pending, confirmed, completed });
    } catch (error: unknown) {
      console.error("Error fetching appointments:", error);
      toast.error("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const response = await doctorApi.getAllDoctors();
      // API returns an array directly or in response.data
      const rawData = response.data || [];
      const doctorsData = rawData.map((doc: any) => ({
        id: doc.id,
        // Map API fields: Title + Fullname = name
        name: doc.Title && doc.Fullname ? `${doc.Title} ${doc.Fullname}` : doc.Fullname || "Unknown Doctor",
        // Map Branch to specialty
        specialty: doc.Branch || "General Practice",
        // Map capitalized fields
        experience: doc.Experience,
        price: doc.Price,
        contact_email: doc.contact_email,
        is_active: doc.is_active !== false,
        // Preserve raw API fields for detail modal
        Title: doc.Title,
        Fullname: doc.Fullname,
        Branch: doc.Branch,
        Experience: doc.Experience,
        Price: doc.Price,
        Biography: doc.Biography,
      }));
      console.log("Admin - Mapped doctors:", doctorsData); // Debug log
      setDoctors(doctorsData);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      toast.error("Failed to load doctors");
    } finally {
      setLoading(false);
    }
  };

  const fetchPatients = async () => {
    try {
      setLoading(true);
      
      // Extract unique patients from appointments
      const uniquePatients = new Map();
      appointments.forEach((appointment) => {
        if (appointment.patient) {
          const patientId = appointment.patient.email; // Use email as unique identifier
          if (!uniquePatients.has(patientId)) {
            uniquePatients.set(patientId, {
              name: `${appointment.patient.firstName} ${appointment.patient.lastName}`,
              email: appointment.patient.email,
              totalAppointments: 0,
            });
          }
          uniquePatients.get(patientId).totalAppointments += 1;
        }
      });
      
      setPatients(Array.from(uniquePatients.values()));
    } catch (error) {
      console.error("Error processing patients:", error);
      toast.error("Failed to load patients");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (appointmentId: string, newStatus: string) => {
    try {
      await adminApi.updateAppointmentStatus(appointmentId, newStatus);
      toast.success(`Appointment ${newStatus.toLowerCase()} successfully!`);
      fetchAppointments();
    } catch (error: unknown) {
      console.error("Error updating appointment:", error);
      toast.error("Failed to update appointment");
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      PENDING: { variant: "default" as const, className: "bg-yellow-500 hover:bg-yellow-600" },
      CONFIRMED: { variant: "default" as const, className: "bg-blue-500 hover:bg-blue-600" },
      COMPLETED: { variant: "default" as const, className: "bg-green-500 hover:bg-green-600" },
      CANCELLED: { variant: "destructive" as const, className: "" },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.PENDING;
    
    return (
      <Badge variant={config.variant} className={config.className}>
        {status}
      </Badge>
    );
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("en-US", { 
        month: "short", 
        day: "numeric", 
        year: "numeric" 
      }),
      time: date.toLocaleTimeString("en-US", { 
        hour: "2-digit", 
        minute: "2-digit" 
      }),
    };
  };

  // CRITICAL: Show loading while auth initializes
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  // CRITICAL: Redirect if not authenticated (ONLY after loading is complete)
  if (!authLoading && !user) {
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    return null;
  }

  // CRITICAL: Redirect if not admin (ONLY after loading is complete)
  if (!authLoading && user && user.role !== "ADMIN") {
    if (typeof window !== "undefined") {
      window.location.href = "/dashboard";
    }
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gradient-to-b from-purple-900 to-indigo-900 text-white fixed h-full shadow-xl hidden lg:block">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-white p-2 rounded-lg">
              <LayoutDashboard className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Admin Panel</h1>
              <p className="text-xs text-purple-200">MediFlow</p>
            </div>
          </div>

          <nav className="space-y-2">
            {/* EKLENEN BUTON: SİTEYE DÖN */}
            <Link href="/" className="w-full block mb-6">
              <Button 
                variant="outline" 
                className="w-full justify-start text-white border-purple-400 hover:bg-white hover:text-purple-900 bg-purple-800/50"
              >
                <Home className="w-4 h-4 mr-2" />
                Go to Website
              </Button>
            </Link>

            <button
              onClick={() => setActiveTab("appointments")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === "appointments"
                  ? "bg-white text-purple-900 font-semibold"
                  : "hover:bg-purple-800"
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span>Appointments</span>
            </button>
            <button
              onClick={() => setActiveTab("patients")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === "patients"
                  ? "bg-white text-purple-900 font-semibold"
                  : "hover:bg-purple-800"
              }`}
            >
              <Users className="w-5 h-5" />
              <span>Patients</span>
            </button>
            <button
              onClick={() => setActiveTab("doctors")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === "doctors"
                  ? "bg-white text-purple-900 font-semibold"
                  : "hover:bg-purple-800"
              }`}
            >
              <Stethoscope className="w-5 h-5" />
              <span>Doctors</span>
            </button>
            <button
              onClick={() => setActiveTab("messages")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === "messages"
                  ? "bg-white text-purple-900 font-semibold"
                  : "hover:bg-purple-800"
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              <span>Messages</span>
            </button>
          </nav>
        </div>

        {/* User Info & Logout */}
        <div className="absolute bottom-0 w-64 p-6 border-t border-purple-800">
          <div className="mb-3">
            <p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p>
            <p className="text-xs text-purple-300">{user?.email}</p>
          </div>
          <Button
            onClick={logout}
            variant="ghost"
            size="sm"
            className="w-full justify-start text-purple-200 hover:text-white hover:bg-purple-800"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{t.adminDashboard.dashboardOverview}</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="pb-2"><CardTitle className="text-3xl">{stats.total}</CardTitle></CardHeader>
            <CardContent><p className="text-sm text-purple-600">{t.adminDashboard.totalAppointments}</p></CardContent>
          </Card>
          <Card className="border-l-4 border-l-yellow-500">
            <CardHeader className="pb-2"><CardTitle className="text-3xl">{stats.pending}</CardTitle></CardHeader>
            <CardContent><p className="text-sm text-yellow-600">{t.adminDashboard.pendingActions}</p></CardContent>
          </Card>
          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-2"><CardTitle className="text-3xl">{stats.completed}</CardTitle></CardHeader>
            <CardContent><p className="text-sm text-green-600">{t.adminDashboard.completedToday}</p></CardContent>
          </Card>
        </div>

        {/* Content based on active tab */}
        {activeTab === "appointments" && (
          <Card>
            <CardHeader>
              <CardTitle>{t.adminDashboard.appointmentsManagement}</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Filter Bar */}
              <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Patient Search */}
                <div>
                  <Label htmlFor="patientSearch" className="text-sm font-medium mb-2 block">
                    {t.adminDashboard.filterByPatient}
                  </Label>
                  <Input
                    id="patientSearch"
                    placeholder={t.adminDashboard.searchPatient}
                    value={patientSearch}
                    onChange={(e) => setPatientSearch(e.target.value)}
                    className="w-full"
                  />
                </div>

                {/* Status Filter */}
                <div>
                  <Label htmlFor="statusFilter" className="text-sm font-medium mb-2 block">
                    {t.adminDashboard.filterByStatus}
                  </Label>
                  <select
                    id="statusFilter"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="ALL">{t.adminDashboard.allStatuses}</option>
                    <option value="PENDING">{t.admin.pending}</option>
                    <option value="CONFIRMED">{t.admin.confirmed}</option>
                    <option value="COMPLETED">{t.admin.completed}</option>
                    <option value="CANCELLED">{t.admin.cancelled}</option>
                  </select>
                </div>

                {/* Specialty Filter */}
                <div>
                  <Label htmlFor="specialtyFilter" className="text-sm font-medium mb-2 block">
                    {t.adminDashboard.filterBySpecialty}
                  </Label>
                  <select
                    id="specialtyFilter"
                    value={specialtyFilter}
                    onChange={(e) => setSpecialtyFilter(e.target.value)}
                    className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="ALL">{t.adminDashboard.allSpecialties}</option>
                    {uniqueSpecialties.map((specialty) => (
                      <option key={specialty} value={specialty}>
                        {translateBranch(specialty, language)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Clear Filters Button */}
              {(patientSearch || statusFilter !== "ALL" || specialtyFilter !== "ALL") && (
                <div className="mb-4">
                  <Button
                    onClick={() => {
                      setPatientSearch("");
                      setStatusFilter("ALL");
                      setSpecialtyFilter("ALL");
                    }}
                    variant="outline"
                    size="sm"
                  >
                    {t.adminDashboard.clearFilters}
                  </Button>
                  <span className="ml-3 text-sm text-gray-600">
                    {filteredAppointments.length} / {appointments.length} appointments
                  </span>
                </div>
              )}

              {loading ? (
                <p className="text-center py-8">{t.common.loading}</p>
              ) : appointments.length === 0 ? (
                <p className="text-center py-8">No appointments found</p>
              ) : filteredAppointments.length === 0 ? (
                <p className="text-center py-8">No appointments match your filters</p>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t.admin.date}</TableHead>
                        <TableHead>{t.admin.patient}</TableHead>
                        <TableHead>{t.admin.doctor}</TableHead>
                        <TableHead>{t.adminDashboard.specialty}</TableHead>
                        <TableHead>{t.admin.status}</TableHead>
                        <TableHead className="text-right">{t.admin.actions}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAppointments.map((appointment) => {
                        const { date, time } = formatDateTime(appointment.appointmentDate);
                        return (
                          <TableRow key={appointment.id}>
                            <TableCell>
                              <div className="font-medium">{date}</div>
                              <div className="text-xs text-gray-500">{time}</div>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">
                                {appointment.user?.firstName || "Unknown"} {appointment.user?.lastName || "Patient"}
                              </div>
                              <div className="text-xs text-gray-500">{appointment.user?.email || "-"}</div>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">
                                {(() => {
                                  const doctor = getDoctorById(appointment.strapiDoctorId);
                                  return doctor ? `${doctor.Title || "Dr."} ${doctor.Fullname}` : `Dr. [ID: ${appointment.strapiDoctorId}]`;
                                })()}
                              </div>
                            </TableCell>
                            <TableCell>
                              {(() => {
                                const doctor = getDoctorById(appointment.strapiDoctorId);
                                return doctor?.Branch ? translateBranch(doctor.Branch, language) : "-";
                              })()}
                            </TableCell>
                            <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm"><MoreHorizontal className="w-4 h-4" /></Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => {
                                    setSelectedAppointment(appointment);
                                    setIsDetailsModalOpen(true);
                                  }}>View Details</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuLabel className="text-xs text-gray-500">Change Status</DropdownMenuLabel>
                                  <DropdownMenuItem 
                                    onClick={() => handleStatusUpdate(appointment.id, "PENDING")}
                                  >
                                    {t.admin.pending}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={() => handleStatusUpdate(appointment.id, "CONFIRMED")}
                                  >
                                    {t.admin.confirmed}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={() => handleStatusUpdate(appointment.id, "COMPLETED")}
                                  >
                                    {t.admin.completed}
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={() => handleStatusUpdate(appointment.id, "CANCELLED")} 
                                    className="text-red-600"
                                  >
                                    {t.admin.cancelled}
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Doctors Tab */}
        {activeTab === "doctors" && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{t.adminDashboard.doctorsManagement}</CardTitle>
              <Button 
                className="bg-purple-600 hover:bg-purple-700"
                onClick={() => toast.info("Add Doctor feature coming soon!")}
              >
                {t.adminDashboard.addNewDoctor}
              </Button>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-center py-8">{t.common.loading}</p>
              ) : doctors.length === 0 ? (
                <p className="text-center py-8">No doctors found</p>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t.adminDashboard.avatar}</TableHead>
                        <TableHead>{t.adminDashboard.name}</TableHead>
                        <TableHead>{t.adminDashboard.specialty}</TableHead>
                        <TableHead>{t.adminDashboard.experience}</TableHead>
                        <TableHead>{t.adminDashboard.price}</TableHead>
                        <TableHead>{t.adminDashboard.status}</TableHead>
                        <TableHead className="text-right">{t.adminDashboard.actions}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {doctors.map((doctor) => (
                        <TableRow key={doctor.id}>
                          <TableCell>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center text-white font-bold">
                              {doctor.name.charAt(0).toUpperCase()}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{doctor.name}</div>
                            <div className="text-xs text-gray-500">{doctor.contact_email || "-"}</div>
                          </TableCell>
                          <TableCell>{translateBranch(doctor.specialty, language)}</TableCell>
                          <TableCell>
                            {doctor.experience ? `${doctor.experience} ${t.doctors.yearsExp}` : "-"}
                          </TableCell>
                          <TableCell>
                            {doctor.price ? `$${doctor.price}` : "-"}
                          </TableCell>
                          <TableCell>
                            <Badge variant={doctor.is_active ? "default" : "destructive"}>
                              {doctor.is_active ? t.adminDashboard.active : t.adminDashboard.inactive}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              onClick={() => {
                                setSelectedDoctorForDetail(doctor);
                                setIsDoctorDetailModalOpen(true);
                              }}
                              variant="outline"
                              size="sm"
                              className="border-purple-600 text-purple-600 hover:bg-purple-50"
                            >
                              {t.adminDashboard.viewProfileBtn}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Messages Tab - Coming Soon */}
        {activeTab === "messages" && (
          <Card>
            <CardHeader>
              <CardTitle>{t.adminDashboard?.messagesTitle || "Message Management"}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="bg-purple-100 p-6 rounded-full mb-6">
                  <MessageSquare className="w-16 h-16 text-purple-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  {t.adminDashboard?.messagesComingSoonTitle || "Messages Feature Coming Soon"}
                </h3>
                <p className="text-gray-600 max-w-md">
                  {t.adminDashboard?.messagesComingSoonDesc || "This feature will be activated very soon. You'll be able to manage all patient messages and inquiries from here."}
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Patients Tab */}
        {activeTab === "patients" && (
          <Card>
            <CardHeader>
              <CardTitle>{t.adminDashboard.patientsManagement}</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-center py-8">{t.common.loading}</p>
              ) : patients.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600">No patients found</p>
                  <p className="text-sm text-gray-500 mt-2">Patients will appear here once they book appointments</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Patient Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Total Appointments</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {patients.map((patient, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white font-bold">
                                {patient.name.charAt(0).toUpperCase()}
                              </div>
                              <span className="font-medium">{patient.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{patient.email}</TableCell>
                          <TableCell>
                            <Badge variant="default" className="bg-blue-500">
                              {patient.totalAppointments} {patient.totalAppointments === 1 ? "appointment" : "appointments"}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => toast.info("View history feature coming soon!")}>
                                  View History
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => toast.info("Contact feature coming soon!")}>
                                  Contact Patient
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </main>

      {/* Appointment Details Modal */}
      <AppointmentDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedAppointment(null);
        }}
        appointment={selectedAppointment}
        doctor={selectedAppointment ? getDoctorById(selectedAppointment.strapiDoctorId) : null}
      />

      {/* Doctor Detail Modal */}
      {selectedDoctorForDetail && (
        <DoctorDetailModal
          isOpen={isDoctorDetailModalOpen}
          onClose={() => {
            setIsDoctorDetailModalOpen(false);
            setSelectedDoctorForDetail(null);
          }}
          doctor={selectedDoctorForDetail}
        />
      )}

    </div>
  );
};

export default AdminDashboardPage;