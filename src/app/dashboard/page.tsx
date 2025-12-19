"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { getTranslation } from "@/lib/translations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, LogOut, Calendar, Settings as SettingsIcon, Clock } from "lucide-react";
import { userApi, appointmentApi, doctorApi } from "@/lib/api";
import { toast } from "sonner";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import ProtectedRoute from "@/components/layout/ProtectedRoute";

// --- HATA YAKALAYICI (BEYAZ EKRAN KORUMASI) ---
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean, error: any }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }
  componentDidCatch(error: any, errorInfo: any) {
    console.error("🔥 DASHBOARD HATASI:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-10 text-center">
          <h2 className="text-xl font-bold text-red-600">Bir şeyler ters gitti</h2>
          <p className="text-sm text-gray-500 mt-2">{this.state.error?.toString()}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">Sayfayı Yenile</Button>
        </div>
      );
    }
    return this.props.children;
  }
}

// --- VALIDATION SCHEMAS ---
const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// --- ANA İÇERİK ---
const DashboardContent = () => {
  const { user, logout, refreshUser, language } = useAuth();
  
  // Çeviri hatası olursa boş obje dönsün ki patlamasın
  const t = getTranslation(language) || { 
    userDashboard: {}, nav: {}, hero: {}, booking: {}, dashboard: {}, common: {}, contact: {} 
  } as any; 
  
  const [activeTab, setActiveTab] = useState("overview");
  const [appointments, setAppointments] = useState<any[]>([]);
  const [appointmentsLoading, setAppointmentsLoading] = useState(false);
  const [doctorsList, setDoctorsList] = useState<any[]>([]);
  
  // Profile form state
  const [profileData, setProfileData] = useState({ firstName: "", lastName: "" });
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileErrors, setProfileErrors] = useState<Record<string, string>>({});

  // Password form state
  const [passwordData, setPasswordData] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>({});

  // Update profile data when user changes
  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
      });
    }
  }, [user]);

  // Fetch doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await doctorApi.getAllDoctors();
        setDoctorsList(response.data || []);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, []);

  // Fetch appointments
  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user) return;
      try {
        setAppointmentsLoading(true);
        const response = await appointmentApi.getMyAppointments();
        setAppointments(response.data || []);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        toast.error("Failed to load appointments");
      } finally {
        setAppointmentsLoading(false);
      }
    };
    if (activeTab === "appointments") {
      fetchAppointments();
    }
  }, [user, activeTab]);

  // Helper: Get doctor by ID
  const getDoctorById = (id: number | string) => {
    const doctor = doctorsList.find((d) => d.id === Number(id));
    if (!doctor) return null;
    return {
      name: doctor.Title && doctor.Fullname ? `${doctor.Title} ${doctor.Fullname}` : doctor.Fullname || "Unknown Doctor",
      specialty: doctor.Branch || "General Practice",
    };
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileErrors({});
    try {
      profileSchema.parse(profileData);
      setProfileLoading(true);
      await userApi.updateProfile(profileData);
      await refreshUser();
      toast.success(t.userDashboard?.profileUpdated || "Profile updated");
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        error.issues.forEach((err) => { if (err.path[0]) errors[err.path[0] as string] = err.message; });
        setProfileErrors(errors);
      } else {
        toast.error(error.response?.data?.message || "Failed to update profile");
      }
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordErrors({});
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("Passwords don't match");
      setPasswordErrors({ confirmPassword: "Passwords don't match" });
      return;
    }
    const result = passwordSchema.safeParse(passwordData);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      const errors: Record<string, string> = {};
      Object.keys(fieldErrors).forEach((key) => { 
        if (fieldErrors[key as keyof typeof fieldErrors]?.[0]) 
          errors[key] = fieldErrors[key as keyof typeof fieldErrors]![0]; 
      });
      setPasswordErrors(errors);
      return;
    }
    try {
      setPasswordLoading(true);
      await userApi.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      toast.success(t.userDashboard?.passwordUpdated || "Password updated");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update password");
    } finally {
      setPasswordLoading(false);
    }
  };

  // User ProtectedRoute tarafından garanti edildiği için burada null kontrolüne gerek yok ama yine de güvenli olsun
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="bg-teal-600 p-2 rounded-lg">
                <Heart className="w-6 h-6 text-white" fill="currentColor" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">MediFlow</h1>
                <p className="text-xs text-gray-500">Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</p>
                <p className="text-xs text-gray-500">{user.role}</p>
              </div>
              <Button onClick={logout} variant="outline" size="sm" className="flex items-center space-x-2">
                <LogOut className="w-4 h-4" />
                <span>{t.nav?.logout || "Logout"}</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="overview">{t.userDashboard?.overview || "Overview"}</TabsTrigger>
            <TabsTrigger value="appointments">
              <Calendar className="w-4 h-4 mr-2" />
              {t.userDashboard?.appointments || "Appointments"}
            </TabsTrigger>
            <TabsTrigger value="settings">
              <SettingsIcon className="w-4 h-4 mr-2" />
              {t.userDashboard?.settings || "Settings"}
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card className="border-teal-200 bg-gradient-to-br from-teal-50 to-white">
              <CardHeader>
                <CardTitle className="text-xl">{t.userDashboard?.overview || "Overview"}</CardTitle>
                <CardDescription>{t.hero?.subtitle}</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row gap-4">
                <Button onClick={() => window.location.href = "/doctors"} className="flex-1 bg-teal-600 hover:bg-teal-700 text-white h-16 text-lg">
                  <Calendar className="w-5 h-5 mr-2" />
                  {t.booking?.bookAppointment || "Book Appointment"}
                </Button>
                <Button onClick={() => window.location.href = "/"} variant="outline" className="flex-1 h-16 text-lg border-teal-600 text-teal-600 hover:bg-teal-50">
                  <Heart className="w-5 h-5 mr-2" />
                  {t.nav?.home || "Home"}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t.dashboard?.welcome || "Welcome"}, {user.firstName}! 🎉</CardTitle>
                <CardDescription>{t.hero?.subtitle}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader><CardTitle className="text-base">{t.userDashboard?.profile}</CardTitle></CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-sm text-gray-600"><strong>Email:</strong> {user.email}</p>
                      <p className="text-sm text-gray-600"><strong>Role:</strong> {user.role}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader><CardTitle className="text-base">{t.userDashboard?.appointments}</CardTitle></CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">{t.dashboard?.myAppointments}</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <CardTitle>{t.userDashboard?.appointments}</CardTitle>
                <CardDescription>{t.dashboard?.myAppointments}</CardDescription>
              </CardHeader>
              <CardContent>
                {appointmentsLoading ? (
                  <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-teal-500 border-t-transparent"></div>
                    <p className="mt-4 text-gray-600">{t.common?.loading || "Loading..."}</p>
                  </div>
                ) : appointments.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p>{t.dashboard?.noAppointments || "No appointments found"}</p>
                    <Button onClick={() => window.location.href = "/doctors"} className="mt-4 bg-teal-600 hover:bg-teal-700">
                      {t.dashboard?.bookNew || "Book New"}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {appointments.map((appointment) => {
                      const doctor = getDoctorById(appointment.strapiDoctorId);
                      const statusColor = ({
                        PENDING: "bg-yellow-100 text-yellow-800",
                        CONFIRMED: "bg-blue-100 text-blue-800",
                        COMPLETED: "bg-green-100 text-green-800",
                        CANCELLED: "bg-red-100 text-red-800",
                      }[appointment.status as string]) || "bg-gray-100 text-gray-800";

                      return (
                        <Card key={appointment.id} className="border-l-4 border-l-teal-500">
                          <CardContent className="pt-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold text-lg">{doctor?.name || "Unknown Doctor"}</h3>
                                  <Badge className={statusColor}>{appointment.status}</Badge>
                                </div>
                                <p className="text-sm text-gray-600">
                                  <strong>{t.userDashboard?.specialty}:</strong> {doctor?.specialty || "N/A"}
                                </p>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <Clock className="w-4 h-4" />
                                  <span>{new Date(appointment.appointmentDate).toLocaleString()}</span>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{t.userDashboard?.profile}</CardTitle>
                <CardDescription>{t.hero?.subtitle}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">{t.userDashboard?.firstName || "First Name"}</Label>
                      <Input id="firstName" value={profileData.firstName} onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })} className={profileErrors.firstName ? "border-red-500" : ""} />
                      {profileErrors.firstName && <p className="text-sm text-red-600">{profileErrors.firstName}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">{t.userDashboard?.lastName || "Last Name"}</Label>
                      <Input id="lastName" value={profileData.lastName} onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })} className={profileErrors.lastName ? "border-red-500" : ""} />
                      {profileErrors.lastName && <p className="text-sm text-red-600">{profileErrors.lastName}</p>}
                    </div>
                  </div>
                  <Button type="submit" disabled={profileLoading}>{profileLoading ? t.common?.loading : t.userDashboard?.updateProfile}</Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t.userDashboard?.security}</CardTitle>
                <CardDescription>{t.userDashboard?.changePassword}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                   <div className="space-y-2">
                    <Label htmlFor="currentPassword">{t.userDashboard?.currentPassword || "Current Password"}</Label>
                    <Input id="currentPassword" type="password" value={passwordData.currentPassword} onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">{t.userDashboard?.newPassword || "New Password"}</Label>
                    <Input id="newPassword" type="password" value={passwordData.newPassword} onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">{t.userDashboard?.confirmPassword || "Confirm Password"}</Label>
                    <Input id="confirmPassword" type="password" value={passwordData.confirmPassword} onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })} />
                  </div>
                  <Button type="submit" disabled={passwordLoading}>{passwordLoading ? t.common?.loading : t.userDashboard?.changePassword}</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

// --- ANA SAYFA COMPONENTI (KORUMALI + HATA YAKALAYICILI) ---
const DashboardPage = () => {
  return (
    <ProtectedRoute>
      <ErrorBoundary>
        <DashboardContent />
      </ErrorBoundary>
    </ProtectedRoute>
  );
};

export default DashboardPage;
