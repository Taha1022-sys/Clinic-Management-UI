"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Stethoscope,
  Heart,
  Activity,
  Calendar,
  FileText,
  Clock,
  Shield,
  Pill,
  Baby,
  Brain,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionHeading from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { getTranslation } from "@/lib/translations";

const ServicesPage = () => {
  // HYDRATION FIX: Track if component is mounted
  const [mounted, setMounted] = useState(false);
  const { language } = useAuth();
  const t = getTranslation(language);
  const defaultT = getTranslation("TR");

  // HYDRATION FIX: Set mounted after client-side render
  useEffect(() => {
    setMounted(true);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const sp = mounted ? t.servicesPage : defaultT.servicesPage;

  const services = [
    {
      icon: Stethoscope,
      title: sp.generalConsultation,
      description: sp.generalConsultationDesc,
      features: [sp.feature1, sp.feature2, sp.feature3],
    },
    {
      icon: Heart,
      title: sp.cardiology,
      description: sp.cardiologyDesc,
      features: ["ECG & Echo", "Heart Disease Management", "Cardiac Rehabilitation"],
    },
    {
      icon: Brain,
      title: sp.neurology,
      description: sp.neurologyDesc,
      features: ["Brain Imaging", "Stroke Care", "Migraine Treatment"],
    },
    {
      icon: Baby,
      title: sp.pediatrics,
      description: sp.pediatricsDesc,
      features: ["Well-Child Visits", "Vaccinations", "Growth Monitoring"],
    },
    {
      icon: Activity,
      title: sp.orthopedics,
      description: sp.orthopedicsDesc,
      features: ["Joint Replacement", "Sports Medicine", "Fracture Care"],
    },
    {
      icon: Pill,
      title: sp.pharmacy,
      description: sp.pharmacyDesc,
      features: ["Prescription Filling", "Drug Counseling", "Home Delivery"],
    },
  ];

  const benefits = [
    {
      icon: Calendar,
      title: sp.easyBooking,
      description: sp.easyBookingDesc,
    },
    {
      icon: Clock,
      title: sp.flexibleHours,
      description: sp.flexibleHoursDesc,
    },
    {
      icon: Shield,
      title: sp.insuranceAccepted,
      description: sp.insuranceAcceptedDesc,
    },
    {
      icon: FileText,
      title: sp.digitalRecords,
      description: sp.digitalRecordsDesc,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-600 to-teal-700 pt-24 sm:pt-32 pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              {sp.heroTitle}
            </h1>
            <p className="text-lg sm:text-xl text-teal-50 max-w-2xl mx-auto">
              {sp.heroSubtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading
              title={sp.ourServices}
              subtitle={sp.servicesSubtitle}
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeInUp}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-xl mb-6">
                  <service.icon className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center text-sm text-gray-700"
                    >
                      <div className="w-1.5 h-1.5 bg-teal-600 rounded-full mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading
              title={sp.whyChoose}
              subtitle={sp.whyChooseSubtitle}
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
                  <benefit.icon className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-teal-600 to-teal-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {mounted ? t.footer.readyToBook : defaultT.footer.readyToBook}
            </h2>
            <p className="text-xl text-teal-50 mb-10 max-w-2xl mx-auto">
              {mounted ? t.footer.readyToBookDesc : defaultT.footer.readyToBookDesc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/doctors">
                <Button
                  size="lg"
                  className="bg-white text-teal-600 hover:bg-gray-100 text-lg px-8 py-6 rounded-xl"
                >
                  {mounted ? t.nav.findDoctors : defaultT.nav.findDoctors}
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6 rounded-xl"
                >
                  {mounted ? t.nav.register : defaultT.nav.register}
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServicesPage;
