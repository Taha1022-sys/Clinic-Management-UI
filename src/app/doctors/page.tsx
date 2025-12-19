"use client";

import { useState, useEffect } from "react";
import { doctorApi } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Info } from "lucide-react";
import BookingModal from "@/components/appointments/BookingModal";
import DoctorDetailModal from "@/components/doctors/DoctorDetailModal";
import { toast } from "sonner";
import { getTranslation, translateBranch } from "@/lib/translations";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience?: number;
  price?: number;
  // Raw API fields for detail modal
  Title?: string;
  Fullname?: string;
  Branch?: string;
  Experience?: number;
  Price?: number;
  Biography?: Array<{
    type: string;
    children: Array<{
      type: string;
      text: string;
    }>;
  }>;
}

export default function DoctorsPage() {
  const { user, language } = useAuth();
  const t = getTranslation(language);
  
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [doctorForDetail, setDoctorForDetail] = useState<Doctor | null>(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await doctorApi.getAllDoctors();
        // API returns an array directly or in response.data
        const rawData = response.data || [];
        const mappedData = rawData.map((doc: any) => ({
          id: doc.id,
          // Map API fields: Title + Fullname = name
          name: doc.Title && doc.Fullname ? `${doc.Title} ${doc.Fullname}` : doc.Fullname || "Unknown Doctor",
          // Map Branch to specialty
          specialty: doc.Branch || "General Practice",
          // Map capitalized fields
          experience: doc.Experience || 5,
          price: doc.Price,
          // Preserve raw API fields for detail modal
          Title: doc.Title,
          Fullname: doc.Fullname,
          Branch: doc.Branch,
          Experience: doc.Experience,
          Price: doc.Price,
          Biography: doc.Biography,
        }));
        console.log("Mapped doctors:", mappedData); // Debug log
        setDoctors(mappedData);
      } catch (error) {
        console.error("Error fetching doctors:", error);
        toast.error("Doktorlar yüklenemedi.");
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const handleBookingClick = (doctor: Doctor) => {
    if (!user) {
      toast.error(t.booking.loginRequired);
      return;
    }
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDoctor(null);
  };

  const handleViewDetails = (doctor: Doctor) => {
    setDoctorForDetail(doctor);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setDoctorForDetail(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 pt-20 sm:pt-24 pb-12">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-teal-900">{t.doctors.title}</h1>
        
        {loading ? (
          <div className="text-center py-20">{t.doctors.loading}</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {doctors.map((doctor) => (
              <Card key={doctor.id} className="hover:shadow-lg transition-shadow border-none">
                <CardHeader className="bg-teal-50/50 pb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {(doctor.name || "D").charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{doctor.name || "Unknown Doctor"}</CardTitle>
                    <p className="text-teal-600 font-medium">{translateBranch(doctor.specialty || "General Practice", language)}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-3 text-gray-600 text-sm mb-6">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-teal-600" />
                      <span>{t.doctors.workingHours}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline"
                      className="flex-1 border-teal-600 text-teal-600 hover:bg-teal-50"
                      onClick={() => handleViewDetails(doctor)}
                    >
                      <Info className="w-4 h-4 mr-2" />
                      {t.doctors.viewDetails}
                    </Button>
                    <Button 
                      className="flex-1 bg-teal-600 hover:bg-teal-700 text-white"
                      onClick={() => handleBookingClick(doctor)}
                    >
                      {t.booking.bookAppointment}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />

      {/* Booking Modal */}
      {selectedDoctor && (
        <BookingModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          doctor={selectedDoctor}
          isAuthenticated={!!user}
        />
      )}

      {/* Doctor Detail Modal */}
      {doctorForDetail && (
        <DoctorDetailModal
          isOpen={isDetailModalOpen}
          onClose={handleCloseDetailModal}
          doctor={doctorForDetail}
        />
      )}
    </div>
  );
}