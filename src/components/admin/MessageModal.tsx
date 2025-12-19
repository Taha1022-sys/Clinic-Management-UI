"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Mail, Calendar, User } from "lucide-react";

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: any;
}

export default function MessageModal({ isOpen, onClose, message }: MessageModalProps) {
  if (!message) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-purple-900">
            Message Details
          </DialogTitle>
          <DialogDescription>
            Contact form submission
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Sender Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <User className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-xs text-gray-500">Name</p>
                <p className="font-semibold text-gray-900">{message.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Mail className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p className="font-semibold text-gray-900">{message.email}</p>
              </div>
            </div>
          </div>

          {/* Date */}
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <Calendar className="w-5 h-5 text-purple-600" />
            <div>
              <p className="text-xs text-gray-500">Date</p>
              <p className="font-semibold text-gray-900">
                {new Date(message.createdAt || message.created_at).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Subject */}
          {message.subject && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Subject</h3>
              <p className="text-gray-900 bg-gray-50 p-4 rounded-lg">{message.subject}</p>
            </div>
          )}

          {/* Message Content */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Message</h3>
            <div className="prose prose-sm max-w-none bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">
                {message.message}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
