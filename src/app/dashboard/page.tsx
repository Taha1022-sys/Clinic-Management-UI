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
import ProtectedRoute from "@/components/layout/ProtectedRoute";

// Validation schemas
const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z. string().min(6, "Password must be at least 6 characters"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Extract the dashboard content into a separate component
const DashboardContent = () => {
  const { user, logout, refreshUser, language } = useAuth();
  const t = getTranslation(language);
  
  // State declarations
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
    newPassword:  "",
    confirmPassword: "",
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>({});

  // Update profile data when user changes
  useEffect(() => {
    if (user) {
      setProfileData({
        firstName:  user.firstName || "",
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
        console. error("Error fetching appointments:", error);
        toast.error("Failed to load appointments");
      } finally {
        setAppointmentsLoading(false);
      }
    };
    if (activeTab === "appointments") {
      fetchAppointments();
    }
  }, [user, activeTab]);

  // Helper:  Get doctor by ID
  const getDoctorById = (id: number | string) => {
    const doctor = doctorsList.find((d) => d.id === Number(id));
    if (! doctor) return null;
    return {
      name: doctor.Title && doctor. Fullname ? `${doctor.Title} ${doctor.Fullname}` : doctor. Fullname || "Unknown Doctor",
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
      toast.success(t. userDashboard.profileUpdated);
    } catch (error:  any) {
      if (error instanceof z.ZodError) {
        const errors:  Record<string, string> = {};
        error.issues.forEach((err) => {
          if (err.path[0]) {
            errors[err.path[0] as string] = err.message;
          }
        });
        setProfileErrors(errors);
      } else {
        const errorMessage = error. response?.data?.message || "Failed to update profile";
        toast.error(errorMessage);
      }
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordErrors({});

    if (passwordData.newPassword !== passwordData. confirmPassword) {
      toast.error(language === "TR" ? "Şifreler uyuşmuyor" : language === "AR" ? "كلمات المرور غير متطابقة" :  "Passwords don't match");
      setPasswordErrors({ confirmPassword: "Passwords don't match" });
      return;
    }

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
      await userApi.changePassword({
        currentPassword:  passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      toast.success(t.userDashboard.passwordUpdated);
    } catch (error: any) {
      const errorMessage = error. response?.data?.message || "Failed to update password";
      toast.error(errorMessage);
    } finally {
      setPasswordLoading(false);
    }
  };

  // user is guaranteed to exist here because of ProtectedRoute
  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg: px-8">
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

      {/* Main Content - Keep the rest of your existing JSX here */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ...  rest of your tabs and content ... */}
      </main>
    </div>
  );
};

// Main export - wrap with ProtectedRoute
const DashboardPage = () => {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
};

export default DashboardPage;
