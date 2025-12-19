"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  ArrowRight, 
  Users, 
  Award, 
  Clock, 
  Heart, 
  Stethoscope, 
  Calendar,
  Shield,
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionHeading from "@/components/ui/SectionHeading";
import { useAuth } from "@/context/AuthContext";
import { getTranslation } from "@/lib/translations";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { language } = useAuth();
  const t = getTranslation(language);
  const defaultT = getTranslation("TR");

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const stats = [
    { icon: Users, value: "10,000+", label: t.stats.happyPatients },
    { icon: Stethoscope, value: "50+", label: t.stats.expertDoctors },
    { icon: Award, value: "15+", label: t.stats.yearsExperience },
    { icon: Clock, value: "24/7", label: t.stats.available },
  ];

  const services = [
    {
      icon: Calendar,
      title: t.services.easyAppointments,
      description: t.services.easyAppointmentsDesc,
    },
    {
      icon: Shield,
      title: t.services.securePrivate,
      description: t.services.securePrivateDesc,
    },
    {
      icon: Activity,
      title: t.services.healthMonitoring,
      description: t.services.healthMonitoringDesc,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-teal-50 via-blue-50 to-cyan-50 pt-16">
        {/* Background Decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6">
                {t.hero.title}{" "}
                <span className="text-teal-600">{t.hero.titleHighlight}</span>
              </h1>
            </motion.div>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto px-4"
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/doctors">
                <Button
                  size="lg"
                  className="bg-teal-600 hover:bg-teal-700 text-white text-lg px-8 py-6 rounded-xl flex items-center gap-2"
                >
                  {t.hero.findDoctor}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 rounded-xl border-2 border-teal-600 text-teal-600 hover:bg-teal-50"
                >
                  {t.hero.ourServices}
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            variants={fadeInUp}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-teal-600" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading
              title={mounted ? (t?.cta?.whyChoose || "Why Choose MediFlow?") : (defaultT?.cta?.whyChoose || "Why Choose MediFlow?")}
              subtitle={mounted ? (t?.cta?.experienceHealthcare || "Experience healthcare that puts you first with our comprehensive services") : (defaultT?.cta?.experienceHealthcare || "Experience healthcare that puts you first with our comprehensive services")}
            />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-xl mb-6">
                  <service.icon className="w-8 h-8 text-teal-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
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
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-6">
              <Heart className="w-10 h-10 text-white" fill="currentColor" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {mounted ? t?.cta?.readyToBook : defaultT?.cta?.readyToBook || "Ready to Book Your Appointment?"}
            </h2>
            <p className="text-xl text-teal-50 mb-10 max-w-2xl mx-auto">
              {mounted ? t?.cta?.joinThousands : defaultT?.cta?.joinThousands || "Join thousands of satisfied patients who trust MediFlow for their healthcare needs."}
            </p>
            <Link href="/doctors">
              <Button
                size="lg"
                className="bg-white text-teal-600 hover:bg-gray-100 text-lg px-8 py-6 rounded-xl"
              >
                {mounted ? t?.cta?.getStartedNow : defaultT?.cta?.getStartedNow || "Get Started Now"}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
