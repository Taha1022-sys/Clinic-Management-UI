"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link"; // EKLENDİ
import { useAuth } from "@/context/AuthContext";
import { 
  Calendar, 
  Users, 
  Stethoscope, 
  DollarSign, 
  Clock, 
  CheckCircle,
  XCircle,
  MoreHorizontal,
  LogOut,
  LayoutDashboard,
  Home // EKLENDİ
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

// Admin API endpoints
const adminApi = {
  getAllAppointments: () => api.get("/appointments"),
  updateAppointmentStatus: (appointmentId: string, status: string) =>
    api.patch(`/appointments/${appointmentId}/status?status=${status}`),
  deleteDoctor: (id: string) => api.delete(`/doctors/${id}`),
};

// GÜVENLİ TİP TANIMLAMASI
interface Appointment {
  id: string;
  appointmentDate: string;
  status: string;
  notes?: string;
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
  const router = useRouter();
  const { user, logout, loading: authLoading } = useAuth();
  
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("appointments");
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
    todayRevenue: 0,
  });

  // Fetch data when user is authenticated and is admin
  useEffect(() => {
    if (user?.role === "ADMIN") {
      fetchAppointments();
      if (activeTab === "doctors") {
        fetchDoctors();
      } else if (activeTab === "patients") {
        fetchPatients();
      }
    }
  }, [user, activeTab]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await adminApi.getAllAppointments();
      const appointmentsData = response.data || [];
      
      setAppointments(appointmentsData);
      
      const total = appointmentsData.length;
      const pending = appointmentsData.filter((a: Appointment) => a.status === "PENDING").length;
      const confirmed = appointmentsData.filter((a: Appointment) => a.status === "CONFIRMED").length;
      const completed = appointmentsData.filter((a: Appointment) => a.status === "COMPLETED").length;
      
      const today = new Date().toDateString();
      const todayRevenue = appointmentsData
        .filter((a: Appointment) => {
          const apptDate = new Date(a.appointmentDate).toDateString();
          return apptDate === today && a.status === "COMPLETED";
        })
        .reduce((sum: number, a: Appointment) => sum + (a.doctor?.price || 0), 0);
      
      setStats({ total, pending, confirmed, completed, todayRevenue });
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
      const rawData = response.data?.data || response.data || [];
      const doctorsData = rawData.map((doc: any) => ({
        id: doc.id,
        name: doc.name || doc.attributes?.name || doc.Fullname || doc.attributes?.Fullname || `${doc.firstName || ""} ${doc.lastName || ""}`,
        specialty: doc.specialty || doc.attributes?.specialty || doc.Branch || doc.attributes?.Branch || "General Practice",
        experience: doc.experience || doc.attributes?.experience || doc.Experience || doc.attributes?.Experience,
        price: doc.price || doc.attributes?.price || doc.Price || doc.attributes?.Price,
        contact_email: doc.contact_email || doc.attributes?.contact_email,
        is_active: (doc.is_active !== false) && (doc.attributes?.is_active !== false),
      }));
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

  const handleDeleteDoctor = async (doctorId: string) => {
    if (!confirm("Are you sure you want to delete this doctor?")) return;
    
    try {
      await adminApi.deleteDoctor(doctorId);
      toast.success("Doctor deleted successfully");
      fetchDoctors();
    } catch (error) {
      console.error("Error deleting doctor:", error);
      toast.error("Failed to delete doctor");
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
      <aside className="w-64 bg-gradient-to-b from-purple-900 to-indigo-900 text-white fixed h-full shadow-xl">
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
      <main className="ml-64 flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-l-purple-500">
            <CardHeader className="pb-2"><CardTitle className="text-3xl">{stats.total}</CardTitle></CardHeader>
            <CardContent><p className="text-sm text-purple-600">Total Appointments</p></CardContent>
          </Card>
          <Card className="border-l-4 border-l-yellow-500">
            <CardHeader className="pb-2"><CardTitle className="text-3xl">{stats.pending}</CardTitle></CardHeader>
            <CardContent><p className="text-sm text-yellow-600">Pending Actions</p></CardContent>
          </Card>
          <Card className="border-l-4 border-l-green-500">
            <CardHeader className="pb-2"><CardTitle className="text-3xl">{stats.completed}</CardTitle></CardHeader>
            <CardContent><p className="text-sm text-green-600">Completed Today</p></CardContent>
          </Card>
          <Card className="border-l-4 border-l-indigo-500">
            <CardHeader className="pb-2"><CardTitle className="text-3xl">${stats.todayRevenue}</CardTitle></CardHeader>
            <CardContent><p className="text-sm text-indigo-600">Today's Revenue</p></CardContent>
          </Card>
        </div>

        {/* Content based on active tab */}
        {activeTab === "appointments" && (
          <Card>
            <CardHeader>
              <CardTitle>Appointments Management</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-center py-8">Loading appointments...</p>
              ) : appointments.length === 0 ? (
                <p className="text-center py-8">No appointments found</p>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Patient</TableHead>
                        <TableHead>Doctor</TableHead>
                        <TableHead>Specialty</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {appointments.map((appointment) => {
                        const { date, time } = formatDateTime(appointment.appointmentDate);
                        return (
                          <TableRow key={appointment.id}>
                            <TableCell>
                              <div className="font-medium">{date}</div>
                              <div className="text-xs text-gray-500">{time}</div>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">
                                {appointment.patient?.firstName || "Unknown"} {appointment.patient?.lastName || "Patient"}
                              </div>
                              <div className="text-xs text-gray-500">{appointment.patient?.email || "-"}</div>
                            </TableCell>
                            <TableCell>
                              <div className="font-medium">{appointment.doctor?.name || "Unknown Doctor"}</div>
                            </TableCell>
                            <TableCell>{appointment.doctor?.specialty || "-"}</TableCell>
                            <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm"><MoreHorizontal className="w-4 h-4" /></Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => handleStatusUpdate(appointment.id, "CONFIRMED")}>Confirm</DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleStatusUpdate(appointment.id, "COMPLETED")}>Complete</DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleStatusUpdate(appointment.id, "CANCELLED")} className="text-red-600">Cancel</DropdownMenuItem>
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
              <CardTitle>Doctors Management</CardTitle>
              <Button 
                className="bg-purple-600 hover:bg-purple-700"
                onClick={() => toast.info("Add Doctor feature coming soon!")}
              >
                + Add New Doctor
              </Button>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-center py-8">Loading doctors...</p>
              ) : doctors.length === 0 ? (
                <p className="text-center py-8">No doctors found</p>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Avatar</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Specialty</TableHead>
                        <TableHead>Experience</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
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
                          <TableCell>{doctor.specialty}</TableCell>
                          <TableCell>
                            {doctor.experience ? `${doctor.experience} years` : "-"}
                          </TableCell>
                          <TableCell>
                            {doctor.price ? `$${doctor.price}` : "-"}
                          </TableCell>
                          <TableCell>
                            <Badge variant={doctor.is_active ? "default" : "destructive"}>
                              {doctor.is_active ? "Active" : "Inactive"}
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
                                <DropdownMenuItem onClick={() => router.push(`/doctors/${doctor.id}`)}>
                                  View Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => toast.info("Edit feature coming soon!")}>
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => handleDeleteDoctor(doctor.id)}
                                  className="text-red-600"
                                >
                                  Delete
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

        {/* Patients Tab */}
        {activeTab === "patients" && (
          <Card>
            <CardHeader>
              <CardTitle>Patients Management</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-center py-8">Loading patients...</p>
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
    </div>
  );
};

export default AdminDashboardPage;