"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { appointmentApi } from "@/lib/api";
import { toast } from "sonner";
import { Calendar as CalendarIcon, Clock } from "lucide-react";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  price?: number | null;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: Doctor;
  isAuthenticated: boolean;
}

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00"
];

export default function BookingModal({ isOpen, onClose, doctor, isAuthenticated }: BookingModalProps) {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConfirmBooking = async () => {
    // Validation
    if (!isAuthenticated) {
      toast.error("Please login to book an appointment");
      router.push("/login");
      return;
    }

    if (!selectedDate) {
      toast.error("Please select a date");
      return;
    }

    if (!selectedTime) {
      toast.error("Please select a time slot");
      return;
    }

    try {
      setLoading(true);

      // Combine date and time into ISO string
      const [hours, minutes] = selectedTime.split(":").map(Number);
      const appointmentDateTime = new Date(selectedDate);
      appointmentDateTime.setHours(hours, minutes, 0, 0);

      // Create appointment payload with EXACT backend field name
      const payload = {
        strapiDoctorId: Number(doctor.id), // Backend expects 'strapiDoctorId' as a Number
        appointmentDate: appointmentDateTime.toISOString(),
        notes: notes.trim() || undefined,
      };

      console.log("✅ [BookingModal] Sending payload:", payload); // Debug log

      await appointmentApi.createAppointment(payload);

      toast.success("Appointment booked successfully!");
      onClose();
      
      // Redirect to dashboard to see the appointment
      router.push("/dashboard");
      
    } catch (error: any) {
      console.error("Booking error:", error);
      const errorMessage = error.response?.data?.message || "Failed to book appointment. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setSelectedDate(undefined);
      setSelectedTime("");
      setNotes("");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Book Appointment</DialogTitle>
          <DialogDescription>
            Schedule your appointment with {doctor.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Doctor Info */}
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg text-gray-900">{doctor.name}</h3>
                <p className="text-sm text-gray-600">{doctor.specialty}</p>
              </div>
              {doctor.price && (
                <div className="text-right">
                  <p className="text-sm text-gray-600">Consultation Fee</p>
                  <p className="text-lg font-bold text-teal-600">${doctor.price}</p>
                </div>
              )}
            </div>
          </div>

          {/* Date Picker */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              Select Date
            </Label>
            <div className="flex justify-center border rounded-lg p-4 bg-gray-50">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={(date) => {
                  // Disable past dates
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  return date < today;
                }}
                className="rounded-md"
              />
            </div>
            {selectedDate && (
              <p className="text-sm text-teal-600 font-medium">
                Selected: {selectedDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            )}
          </div>

          {/* Time Slot Picker */}
          {selectedDate && (
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Select Time Slot
              </Label>
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    type="button"
                    variant={selectedTime === time ? "default" : "outline"}
                    className={`h-10 ${
                      selectedTime === time
                        ? "bg-teal-600 hover:bg-teal-700"
                        : "hover:bg-teal-50 hover:border-teal-300"
                    }`}
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          {selectedTime && (
            <div className="space-y-2">
              <Label htmlFor="notes">
                Additional Notes (Optional)
              </Label>
              <Textarea
                id="notes"
                placeholder="Any specific concerns or symptoms you'd like to mention..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="resize-none"
              />
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleConfirmBooking}
            disabled={loading || !selectedDate || !selectedTime}
            className="bg-teal-600 hover:bg-teal-700"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                Booking...
              </>
            ) : (
              "Confirm Booking"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
