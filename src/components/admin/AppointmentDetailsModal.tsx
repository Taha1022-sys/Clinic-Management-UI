"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Stethoscope, FileText } from "lucide-react";

interface AppointmentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointment: any;
  doctor?: any;
}

export default function AppointmentDetailsModal({
  isOpen,
  onClose,
  appointment,
  doctor,
}: AppointmentDetailsModalProps) {
  if (!appointment) return null;

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      time: date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  const { date, time } = formatDateTime(appointment.appointmentDate);

  const getStatusColor = (status: string) => {
    const colors = {
      PENDING: "bg-yellow-100 text-yellow-800",
      CONFIRMED: "bg-blue-100 text-blue-800",
      COMPLETED: "bg-green-100 text-green-800",
      CANCELLED: "bg-red-100 text-red-800",
    };
    return colors[status as keyof typeof colors] || colors.PENDING;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto w-[95vw]">
        <DialogHeader>
          <DialogTitle className="text-xl sm:text-2xl flex items-center gap-2">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-teal-600" />
            Appointment Details
          </DialogTitle>
          <DialogDescription className="text-sm">
            Complete information about this appointment
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Status Badge */}
          <div>
            <Badge className={getStatusColor(appointment.status)}>
              {appointment.status}
            </Badge>
          </div>

          {/* Date & Time */}
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-5 h-5 text-teal-600" />
              <h3 className="font-semibold text-gray-900">Appointment Schedule</h3>
            </div>
            <p className="text-sm text-gray-700 ml-8">{date}</p>
            <p className="text-sm text-gray-700 ml-8 font-medium">{time}</p>
          </div>

          {/* Patient Information */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <User className="w-5 h-5 text-gray-600" />
              <h3 className="font-semibold text-gray-900">Patient Information</h3>
            </div>
            <div className="ml-8 space-y-1">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Name:</span>{" "}
                {appointment.user?.firstName || "N/A"}{" "}
                {appointment.user?.lastName || ""}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Email:</span>{" "}
                {appointment.user?.email || "N/A"}
              </p>
            </div>
          </div>

          {/* Doctor Information */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Stethoscope className="w-5 h-5 text-gray-600" />
              <h3 className="font-semibold text-gray-900">Doctor Information</h3>
            </div>
            <div className="ml-8 space-y-1">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Name:</span>{" "}
                {doctor ? `${doctor.Title || "Dr."} ${doctor.Fullname}` : `Dr. [ID: ${appointment.strapiDoctorId}]`}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Specialty:</span>{" "}
                {doctor?.Branch || "N/A"}
              </p>
              {doctor?.Price && (
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Consultation Fee:</span> ${doctor.Price}
                </p>
              )}
            </div>
          </div>

          {/* Patient Notes */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <FileText className="w-5 h-5 text-gray-600" />
              <h3 className="font-semibold text-gray-900">Patient Notes</h3>
            </div>
            <div className="ml-8">
              {appointment.notes ? (
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{appointment.notes}</p>
              ) : (
                <p className="text-sm text-gray-500 italic">No notes provided</p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
