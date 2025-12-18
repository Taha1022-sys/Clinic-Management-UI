"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { appointmentApi } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { getTranslation } from "@/lib/translations";

interface BookingModalProps {
  doctor: {
    id: string | number;
    name: string;
    specialty: string;
    price?: number;
  };
  children: React.ReactNode;
}

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00"
];

export default function BookingModal({ doctor, children }: BookingModalProps) {
  const { user, language } = useAuth();
  const router = useRouter();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const t = getTranslation(language);

  const handleBooking = async () => {
    const t = getTranslation(language);
    
    if (!user) {
      toast.error(t.booking.loginRequired);
      router.push("/login");
      return;
    }

    if (!date || !selectedTime) {
      toast.error(t.booking.selectDateTime);
      return;
    }

    try {
      setLoading(true);
      // Combine date and time
      const appointmentDate = new Date(date);
      const [hours, minutes] = selectedTime.split(":");
      appointmentDate.setHours(parseInt(hours, 10), parseInt(minutes, 10));

      // CRITICAL: Backend expects "doctorId" as a POSITIVE NUMBER
      const doctorIdNumber = Number(doctor.id);
      
      // Type verification log
      console.log("[BOOKING] Doctor ID Type:", typeof doctorIdNumber);
      console.log("[BOOKING] Doctor ID Value:", doctorIdNumber);
      
      const payload = {
        doctorId: doctorIdNumber,
        appointmentDate: appointmentDate.toISOString(),
        notes: notes.trim()
      };

      console.log("[BOOKING] Final Payload:", JSON.stringify(payload, null, 2));

      await appointmentApi.createAppointment(payload);

      toast.success(t.booking.bookingSuccess);
      setOpen(false);
      router.push("/dashboard");
    } catch (error: any) {
      console.error("[BOOKING ERROR]:", error);
      console.error("[BOOKING ERROR] Response:", error.response?.data);
      toast.error(error.response?.data?.message || t.booking.bookingError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t.booking.bookAppointment}: {doctor.name}</DialogTitle>
          <DialogDescription>
            {doctor.specialty}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Date Selection */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-teal-600" />
              {t.booking.selectDate}
            </Label>
            <div className="border rounded-md p-2 flex justify-center bg-white">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border-none"
                disabled={(date) => date < new Date() || date.getDay() === 0}
              />
            </div>
          </div>

          {/* Time Selection */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-teal-600" />
              {t.booking.selectTime}
            </Label>
            <div className="grid grid-cols-4 gap-2">
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? "default" : "outline"}
                  className={selectedTime === time ? "bg-teal-600" : "text-xs p-1"}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes">{t.booking.notes}</Label>
            <Textarea
              id="notes"
              placeholder={t.booking.notesPlaceholder}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>{t.booking.cancel}</Button>
          <Button 
            className="bg-teal-600 hover:bg-teal-700 text-white" 
            onClick={handleBooking}
            disabled={loading}
          >
            {loading ? t.common.loading : t.booking.confirmBooking}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}