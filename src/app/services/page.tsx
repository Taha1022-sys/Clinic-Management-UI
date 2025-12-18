"use client";

import React from "react";
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

const ServicesPage = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const services = [
    {
      icon: Stethoscope,
      title: "General Consultation",
      description:
        "Comprehensive health check-ups and consultations with experienced general practitioners.",
      features: ["Physical Examination", "Health Screening", "Preventive Care"],
    },
    {
      icon: Heart,
      title: "Cardiology",
      description:
        "Expert cardiac care including diagnostics, treatment, and rehabilitation services.",
      features: ["ECG & Echo", "Heart Disease Management", "Cardiac Rehabilitation"],
    },
    {
      icon: Brain,
      title: "Neurology",
      description:
        "Specialized care for neurological conditions with advanced diagnostic capabilities.",
      features: ["Brain Imaging", "Stroke Care", "Migraine Treatment"],
    },
    {
      icon: Baby,
      title: "Pediatrics",
      description:
        "Dedicated healthcare services for infants, children, and adolescents.",
      features: ["Well-Child Visits", "Vaccinations", "Growth Monitoring"],
    },
    {
      icon: Activity,
      title: "Orthopedics",
      description:
        "Treatment for bone, joint, and muscle conditions with surgical and non-surgical options.",
      features: ["Joint Replacement", "Sports Medicine", "Fracture Care"],
    },
    {
      icon: Pill,
      title: "Pharmacy Services",
      description:
        "On-site pharmacy with a wide range of medications and health products.",
      features: ["Prescription Filling", "Drug Counseling", "Home Delivery"],
    },
  ];

  const benefits = [
    {
      icon: Calendar,
      title: "Easy Booking",
      description: "Schedule appointments online 24/7 with instant confirmation.",
    },
    {
      icon: Clock,
      title: "Flexible Hours",
      description: "Extended hours and weekend availability for your convenience.",
    },
    {
      icon: Shield,
      title: "Insurance Accepted",
      description: "We work with most major insurance providers.",
    },
    {
      icon: FileText,
      title: "Digital Records",
      description: "Secure access to your medical records anytime, anywhere.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-600 to-teal-700 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Our Healthcare Services
            </h1>
            <p className="text-xl text-teal-50 max-w-2xl mx-auto">
              Comprehensive medical care tailored to your needs
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
              title="Medical Services We Offer"
              subtitle="From routine check-ups to specialized treatments, we're here for you"
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
              title="Why Choose Our Services?"
              subtitle="Experience healthcare that's designed around you"
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
              Ready to Get Started?
            </h2>
            <p className="text-xl text-teal-50 mb-10 max-w-2xl mx-auto">
              Book an appointment with our expert doctors today and experience
              quality healthcare.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/doctors">
                <Button
                  size="lg"
                  className="bg-white text-teal-600 hover:bg-gray-100 text-lg px-8 py-6 rounded-xl"
                >
                  Find a Doctor
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6 rounded-xl"
                >
                  Create Account
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
