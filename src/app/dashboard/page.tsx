"use client";

import { useState, useEffect } from "react";
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

// Validation schemas
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

const DashboardPage = () => {
  // ==========================================
  // ALL HOOKS MUST BE AT THE TOP - NO EXCEPTIONS
  // ==========================================
  const { user, loading, logout, refreshUser, language } = useAuth();
  const t = getTranslation(language);
  
  // State declarations - ALL hooks before any conditional logic
  const [activeTab, setActiveTab] = useState("overview");
  const [appointments, setAppointments] = useState<any[]>([]);
  const [appointmentsLoading, setAppointmentsLoading] = useState(false);
  const [doctorsList, setDoctorsList] = useState<any[]>([]);
  
  // Profile form state
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
  });
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileErrors, setProfileErrors] = useState<Record<string, string>>({});

  // Password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
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

  // Fetch doctors for lookup
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

  // ==========================================
  // CONDITIONAL RENDERING - AFTER ALL HOOKS
  // ==========================================
  
  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-teal-500 border-t-transparent mb-4"></div>
          <p className="text-gray-600">{t.userDashboard.loadingDashboard}</p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!user) {
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    return null;
  }

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
      // Validate
      profileSchema.parse(profileData);

      setProfileLoading(true);

      // Call API
      await userApi.updateProfile(profileData);

      // CRITICAL: Refresh user data to update the context
      await refreshUser();

      toast.success(t.userDashboard.profileUpdated);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const errors: Record<string, string> = {};
        error.issues.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0] as string] = err.message;
          }
        });
        setProfileErrors(errors);
      } else {
        const errorMessage = error.response?.data?.message || "Failed to update profile";
        toast.error(errorMessage);
      }
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordErrors({});

    // Check password match first
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error(language === "TR" ? "Şifreler uyuşmuyor" : language === "AR" ? "كلمات المرور غير متطابقة" : "Passwords don't match");
      setPasswordErrors({ confirmPassword: "Passwords don't match" });
      return;
    }

    // Use safeParse instead of parse
    const result = passwordSchema.safeParse(passwordData);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      const errors: Record<string, string> = {};
      Object.keys(fieldErrors).forEach((key) => {
        const messages = fieldErrors[key as keyof typeof fieldErrors];
        if (messages && messages.length > 0) {
          errors[key] = messages[0];
        }
      });
      setPasswordErrors(errors);
      return;
    }

    try {
      setPasswordLoading(true);

      // Call API
      await userApi.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      // Reset form
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      toast.success(t.userDashboard.passwordUpdated);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to update password";
      toast.error(errorMessage);
    } finally {
      setPasswordLoading(false);
    }
  };

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
                <p className="text-sm font-medium text-gray-900">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-gray-500">{user.role}</p>
              </div>
              <Button
                onClick={logout}
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>{t.nav.logout}</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="overview">{t.userDashboard.overview}</TabsTrigger>
            <TabsTrigger value="appointments">
              <Calendar className="w-4 h-4 mr-2" />
              {t.userDashboard.appointments}
            </TabsTrigger>
            <TabsTrigger value="settings">
              <SettingsIcon className="w-4 h-4 mr-2" />
              {t.userDashboard.settings}
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Quick Actions Card */}
            <Card className="border-teal-200 bg-gradient-to-br from-teal-50 to-white">
              <CardHeader>
                <CardTitle className="text-xl">{t.userDashboard.overview}</CardTitle>
                <CardDescription>
                  {t.hero.subtitle}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => window.location.href = "/doctors"}
                  className="flex-1 bg-teal-600 hover:bg-teal-700 text-white h-16 text-lg"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  {t.booking.bookAppointment}
                </Button>
                <Button
                  onClick={() => window.location.href = "/"}
                  variant="outline"
                  className="flex-1 h-16 text-lg border-teal-600 text-teal-600 hover:bg-teal-50"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  {t.nav.home}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{t.dashboard.welcome}, {user.firstName}! 🎉</CardTitle>
                <CardDescription>
                  {t.hero.subtitle}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">{t.userDashboard.profile}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-sm text-gray-600"><strong>Email:</strong> {user.email}</p>
                      <p className="text-sm text-gray-600"><strong>Role:</strong> {user.role}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">{t.userDashboard.appointments}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">{t.dashboard.myAppointments}</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-teal-600 font-medium">✓ System Ready</p>
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
                <CardTitle>{t.userDashboard.appointments}</CardTitle>
                <CardDescription>{t.dashboard.myAppointments}</CardDescription>
              </CardHeader>
              <CardContent>
                {appointmentsLoading ? (
                  <div className="text-center py-12">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-teal-500 border-t-transparent"></div>
                    <p className="mt-4 text-gray-600">{t.common.loading}</p>
                  </div>
                ) : appointments.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p>{t.dashboard.noAppointments}</p>
                    <Button 
                      onClick={() => window.location.href = "/doctors"}
                      className="mt-4 bg-teal-600 hover:bg-teal-700"
                    >
                      {t.dashboard.bookNew}
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
                      } as Record<string, string>)[appointment.status] || "bg-gray-100 text-gray-800";

                      return (
                        <Card key={appointment.id} className="border-l-4 border-l-teal-500">
                          <CardContent className="pt-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-semibold text-lg">
                                    {doctor?.name || "Unknown Doctor"}
                                  </h3>
                                  <Badge className={statusColor}>{appointment.status}</Badge>
                                </div>
                                <p className="text-sm text-gray-600">
                                  <strong>{t.userDashboard.specialty}:</strong> {doctor?.specialty || "N/A"}
                                </p>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <Clock className="w-4 h-4" />
                                  <span>
                                    {new Date(appointment.appointmentDate).toLocaleString(language === "TR" ? "tr-TR" : language === "AR" ? "ar-SA" : "en-US")}
                                  </span>
                                </div>
                                {appointment.notes && (
                                  <p className="text-sm text-gray-600 mt-2">
                                    <strong>Notes:</strong> {appointment.notes}
                                  </p>
                                )}
                              </div>
                              {appointment.status === "PENDING" && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-red-500 text-red-500 hover:bg-red-50"
                                  onClick={async () => {
                                    try {
                                      await appointmentApi.cancelAppointment(appointment.id);
                                      toast.success(t.userDashboard.cancelSuccess);
                                      setAppointments(appointments.filter(a => a.id !== appointment.id));
                                    } catch (error) {
                                      toast.error(t.userDashboard.cancelError);
                                    }
                                  }}
                                >
                                  {t.userDashboard.cancel}
                                </Button>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                    <div className="text-center pt-4">
                      <Button 
                        onClick={() => window.location.href = "/doctors"}
                        variant="outline"
                        className="border-teal-600 text-teal-600 hover:bg-teal-50"
                      >
                        {t.dashboard.bookNew}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            {/* Profile Settings */}
            <Card>
              <CardHeader>
                <CardTitle>{t.userDashboard.profile}</CardTitle>
                <CardDescription>{t.hero.subtitle}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">{t.userDashboard.firstName}</Label>
                      <Input
                        id="firstName"
                        value={profileData.firstName}
                        onChange={(e) =>
                          setProfileData({ ...profileData, firstName: e.target.value })
                        }
                        className={profileErrors.firstName ? "border-red-500" : ""}
                      />
                      {profileErrors.firstName && (
                        <p className="text-sm text-red-600">{profileErrors.firstName}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lastName">{t.userDashboard.lastName}</Label>
                      <Input
                        id="lastName"
                        value={profileData.lastName}
                        onChange={(e) =>
                          setProfileData({ ...profileData, lastName: e.target.value })
                        }
                        className={profileErrors.lastName ? "border-red-500" : ""}
                      />
                      {profileErrors.lastName && (
                        <p className="text-sm text-red-600">{profileErrors.lastName}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">{t.contact.email}</Label>
                    <Input id="email" value={user.email || ""} disabled className="bg-gray-50" />
                    <p className="text-sm text-gray-500">Email cannot be changed</p>
                  </div>

                  <Button type="submit" disabled={profileLoading}>
                    {profileLoading ? t.common.loading : t.userDashboard.updateProfile}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Password Settings */}
            <Card>
              <CardHeader>
                <CardTitle>{t.userDashboard.security}</CardTitle>
                <CardDescription>{t.userDashboard.changePassword}</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">{t.userDashboard.currentPassword}</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) =>
                        setPasswordData({ ...passwordData, currentPassword: e.target.value })
                      }
                      className={passwordErrors.currentPassword ? "border-red-500" : ""}
                    />
                    {passwordErrors.currentPassword && (
                      <p className="text-sm text-red-600">{passwordErrors.currentPassword}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">{t.userDashboard.newPassword}</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        setPasswordData({ ...passwordData, newPassword: e.target.value })
                      }
                      className={passwordErrors.newPassword ? "border-red-500" : ""}
                    />
                    {passwordErrors.newPassword && (
                      <p className="text-sm text-red-600">{passwordErrors.newPassword}</p>
                    )}
                    <p className="text-sm text-gray-500">Minimum 6 characters</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">{t.userDashboard.confirmPassword}</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) =>
                        setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                      }
                      className={passwordErrors.confirmPassword ? "border-red-500" : ""}
                    />
                    {passwordErrors.confirmPassword && (
                      <p className="text-sm text-red-600">{passwordErrors.confirmPassword}</p>
                    )}
                  </div>

                  <Button type="submit" disabled={passwordLoading}>
                    {passwordLoading ? t.common.loading : t.userDashboard.changePassword}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default DashboardPage;
