"use client";

import { useState, useEffect } from "react";
import { doctorApi } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Clock } from "lucide-react";
import BookingModal from "@/components/appointments/BookingModal";
import { toast } from "sonner";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience?: number;
  price?: number;
}

export default function DoctorsPage() {
  const { user } = useAuth();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await doctorApi.getAllDoctors();
        // STRAPI/CMS ÇÖZÜMÜ: Veri genellikle response.data.data içindedir
        const rawData = response.data?.data || response.data || [];
        const mappedData = rawData.map((doc: any) => ({
          id: doc.id,
          name: doc.name || doc.attributes?.name || doc.Fullname || doc.attributes?.Fullname || "Unknown Doctor",
          specialty: doc.specialty || doc.attributes?.specialty || doc.Branch || doc.attributes?.Branch || "General Practice",
          experience: doc.experience || doc.attributes?.experience || doc.Experience || doc.attributes?.Experience || 5,
          price: doc.price || doc.attributes?.price || doc.Price || doc.attributes?.Price,
        }));
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
      toast.error("Lütfen randevu almak için giriş yapın");
      return;
    }
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDoctor(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 pt-24 pb-12">
        <h1 className="text-3xl font-bold mb-8 text-center text-teal-900">Uzman Doktorlarımız</h1>
        
        {loading ? (
          <div className="text-center py-20">Yükleniyor...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor) => (
              <Card key={doctor.id} className="hover:shadow-lg transition-shadow border-none">
                <CardHeader className="bg-teal-50/50 pb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {(doctor.name || "D").charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <CardTitle className="text-xl">{doctor.name || "Unknown Doctor"}</CardTitle>
                      <p className="text-teal-600 font-medium">{doctor.specialty || "General Practice"}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-3 text-gray-600 text-sm mb-6">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span>{doctor.experience || 5}+ Yıl Deneyim</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-teal-600" />
                      <span>Hafta İçi: 09:00 - 18:00</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                    onClick={() => handleBookingClick(doctor)}
                  >
                    Book Appointment
                  </Button>
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
    </div>
  );
}