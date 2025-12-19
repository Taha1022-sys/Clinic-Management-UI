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
import { Clock, DollarSign, Briefcase } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getTranslation, translateBranch } from "@/lib/translations";

interface Doctor {
  id: string;
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

interface DoctorDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctor: Doctor;
}

export default function DoctorDetailModal({ isOpen, onClose, doctor }: DoctorDetailModalProps) {
  const { language } = useAuth();
  const t = getTranslation(language);

  // Parse Strapi Rich Text Biography
  const parseBiography = (bio: Doctor["Biography"]): string => {
    if (!bio || !Array.isArray(bio)) return t.doctors.noBiography || "No biography available.";
    
    return bio
      .map((paragraph) => {
        if (!paragraph.children || !Array.isArray(paragraph.children)) return "";
        return paragraph.children
          .map((child) => child.text || "")
          .join("");
      })
      .filter((text) => text.trim().length > 0)
      .join("\n\n");
  };

  const biography = parseBiography(doctor.Biography);
  const doctorName = doctor.Title && doctor.Fullname 
    ? `${doctor.Title} ${doctor.Fullname}` 
    : doctor.Fullname || "Unknown Doctor";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl font-bold text-teal-900">
            {doctorName}
          </DialogTitle>
          <DialogDescription>
            <Badge variant="secondary" className="mt-2 bg-teal-100 text-teal-700">
              {doctor.Branch ? translateBranch(doctor.Branch, language) : "General Practice"}
            </Badge>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Doctor Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Experience */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Briefcase className="w-5 h-5 text-teal-600" />
              <div>
                <p className="text-xs text-gray-500">{t.doctors.experience}</p>
                <p className="font-semibold text-gray-900">
                  {doctor.Experience || 5}+ {t.doctors.yearsExp}
                </p>
              </div>
            </div>

            {/* Price */}
            {doctor.Price && (
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-xs text-gray-500">{t.doctors.consultationFee || "Fee"}</p>
                  <p className="font-semibold text-gray-900">${doctor.Price}</p>
                </div>
              </div>
            )}
          </div>

          {/* Biography Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-teal-600" />
              {t.doctors.biography || "About"}
            </h3>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                {biography}
              </p>
            </div>
          </div>

          {/* Working Hours */}
          <div className="p-4 bg-teal-50 rounded-lg">
            <h3 className="text-sm font-semibold text-teal-900 mb-2">
              {t.doctors.workingHours}
            </h3>
            <p className="text-sm text-gray-700">
              {t.doctors.workingHoursValue || "Monday - Friday: 9:00 AM - 5:00 PM"}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
