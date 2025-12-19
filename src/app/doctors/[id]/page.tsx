"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Calendar, 
  Award, 
  DollarSign, 
  Mail, 
  Loader2,
  User as UserIcon,
  Stethoscope
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import BookingModal from "@/components/appointments/BookingModal";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import Image from "next/image";
import { Doctor } from "@/types";

const DoctorDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const doctorId = params.id as string;

  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  useEffect(() => {
    if (doctorId) {
      fetchDoctorDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doctorId]);

  const fetchDoctorDetails = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";
      const response = await fetch(`${apiUrl}/cms/doctors/${doctorId}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch doctor details");
      }

      const data = await response.json();
      
      // Transform the data from Strapi field names to our interface
      const transformedDoctor: Doctor = {
        id: data.id?.toString() || doctorId,
        name: data.Fullname || "Unknown",
        specialty: data.Branch || "General Practice",
        image: data.image || null,
        biography: data.Biography || null,
        experience: data.Experience || null,
        price: data.Price || null,
        contact_email: data.contact_email || null,
        is_active: data.is_active ?? true,
      };

      setDoctor(transformedDoctor);
    } catch (error) {
      console.error("Error fetching doctor details:", error);
      toast.error("Failed to load doctor details", {
        description: "Please try again later.",
      });
      // Redirect back to doctors list after a delay
      setTimeout(() => router.push("/doctors"), 2000);
    } finally {
      setLoading(false);
    }
  };

  const handleBookAppointment = () => {
    if (!user) {
      toast.error("Please login to book an appointment");
      router.push("/login");
      return;
    }
    
    if (doctor && !doctor.is_active) {
      toast.error("This doctor is currently unavailable for appointments");
      return;
    }
    
    setIsBookingModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-32">
          <Loader2 className="w-12 h-12 text-teal-600 animate-spin mb-4" />
          <p className="text-gray-600 text-lg">Loading doctor details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex flex-col items-center justify-center py-32">
          <p className="text-gray-600 text-lg">Doctor not found</p>
          <Button onClick={() => router.push("/doctors")} className="mt-4">
            Back to Doctors
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-600 to-teal-700 pt-24 sm:pt-32 pb-8 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            onClick={() => router.push("/doctors")}
            variant="ghost"
            className="text-white hover:bg-teal-700 mb-4 sm:mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Doctors
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Doctor Image */}
            <div className="lg:col-span-1">
              <div className="relative h-80 lg:h-96 bg-white rounded-2xl overflow-hidden shadow-xl">
                {doctor.image ? (
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-teal-50 to-blue-50">
                    <div className="bg-teal-100 p-12 rounded-full">
                      <UserIcon className="w-32 h-32 text-teal-600" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Doctor Info */}
            <div className="lg:col-span-2 text-white">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
                    Dr. {doctor.name}
                  </h1>
                  <div className="flex items-center gap-2 mb-4">
                    <Stethoscope className="w-5 h-5" />
                    <p className="text-lg sm:text-xl text-teal-50">{doctor.specialty}</p>
                  </div>
                </div>
                {!doctor.is_active && (
                  <Badge variant="destructive" className="text-sm">
                    Unavailable
                  </Badge>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {doctor.experience && doctor.experience > 0 && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Award className="w-5 h-5" />
                      <span className="text-sm font-medium">Experience</span>
                    </div>
                    <p className="text-2xl font-bold">
                      {doctor.experience} Year{doctor.experience !== 1 ? 's' : ''}
                    </p>
                  </div>
                )}

                {doctor.price && doctor.price > 0 && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <DollarSign className="w-5 h-5" />
                      <span className="text-sm font-medium">Consultation</span>
                    </div>
                    <p className="text-2xl font-bold">${doctor.price}</p>
                    <p className="text-xs text-teal-100">per session</p>
                  </div>
                )}

                {doctor.contact_email && (
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Mail className="w-5 h-5" />
                      <span className="text-sm font-medium">Email</span>
                    </div>
                    <a
                      href={`mailto:${doctor.contact_email}`}
                      className="text-sm hover:underline break-all"
                    >
                      {doctor.contact_email}
                    </a>
                  </div>
                )}
              </div>

              <Button
                onClick={handleBookAppointment}
                size="lg"
                disabled={!doctor.is_active}
                className="bg-white text-teal-700 hover:bg-gray-100 font-semibold"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Appointment
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Biography Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">About Dr. {doctor.name}</CardTitle>
            </CardHeader>
            <CardContent>
              {doctor.biography ? (
                <div className="prose max-w-none">
                  {/* For now, display as plain text. You can add react-markdown later */}
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {doctor.biography}
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 italic">
                  No biography available for this doctor.
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Additional Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Specialization</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge className="bg-teal-600 text-white text-base px-4 py-2">
                  {doctor.specialty}
                </Badge>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <Badge
                  variant={doctor.is_active ? "default" : "destructive"}
                  className="text-base px-4 py-2"
                >
                  {doctor.is_active ? "Available for Appointments" : "Currently Unavailable"}
                </Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />

      {/* Booking Modal */}
      {doctor && (
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          doctor={{
            id: doctor.id,
            name: doctor.name,
            specialty: doctor.specialty,
            price: doctor.price,
          }}
          isAuthenticated={!!user}
        />
      )}
    </div>
  );
};

export default DoctorDetailPage;
