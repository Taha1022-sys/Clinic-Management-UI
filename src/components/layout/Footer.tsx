"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { getTranslation } from "@/lib/translations";

export default function Footer() {
  // HYDRATION FIX: Track if component is mounted
  const [mounted, setMounted] = useState(false);
  const { language } = useAuth();
  const t = getTranslation(language);
  const defaultT = getTranslation("TR");

  // HYDRATION FIX: Set mounted after client-side render
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-12">
          {/* Brand Info */}
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 mb-6 justify-center md:justify-start">
              <div className="bg-teal-600 p-2 rounded-lg">
                <Heart className="w-6 h-6 text-white" fill="currentColor" />
              </div>
              <span className="text-2xl font-bold text-white">MediFlow</span>
            </div>
            <p className="text-gray-400 mb-6">
              {mounted ? t.footer.brandDescription : defaultT.footer.brandDescription}
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <a href="#" className="hover:text-teal-500 transition-colors"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-teal-500 transition-colors"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-teal-500 transition-colors"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="hover:text-teal-500 transition-colors"><Linkedin className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-white mb-6">{mounted ? t.footer.quickLinks : defaultT.footer.quickLinks}</h3>
            <ul className="space-y-4">
              <li><Link href="/" className="hover:text-teal-500 transition-colors">{mounted ? t.nav.home : defaultT.nav.home}</Link></li>
              <li><Link href="/doctors" className="hover:text-teal-500 transition-colors">{mounted ? t.nav.findDoctors : defaultT.nav.findDoctors}</Link></li>
              <li><Link href="/services" className="hover:text-teal-500 transition-colors">{mounted ? t.nav.services : defaultT.nav.services}</Link></li>
              <li><Link href="/contact" className="hover:text-teal-500 transition-colors">{mounted ? t.nav.contact : defaultT.nav.contact}</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-white mb-6">{mounted ? t.footer.servicesTitle : defaultT.footer.servicesTitle}</h3>
            <ul className="space-y-4">
              <li><Link href="#" className="hover:text-teal-500 transition-colors">Cardiology</Link></li>
              <li><Link href="#" className="hover:text-teal-500 transition-colors">Neurology</Link></li>
              <li><Link href="#" className="hover:text-teal-500 transition-colors">Orthopedics</Link></li>
              <li><Link href="#" className="hover:text-teal-500 transition-colors">Pediatrics</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-white mb-6">{mounted ? t.footer.contactUs : defaultT.footer.contactUs}</h3>
            <ul className="space-y-4 text-left inline-block">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-teal-600 mt-1" />
                <span>123 Healthcare Ave,<br />Medical District, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-teal-600" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-teal-600" />
                <span>contact@mediflow.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} MediFlow. {mounted ? t.footer.allRightsReserved : defaultT.footer.allRightsReserved}</p>
        </div>
      </div>
    </footer>
  );
}