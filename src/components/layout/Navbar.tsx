"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, X, User, Globe, LogOut, LayoutDashboard, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { getTranslation } from "@/lib/translations";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  // HYDRATION FIX: Track if component is mounted
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  
  // Connect to AuthContext with language
  const { user, loading, logout, language, setLanguage } = useAuth();
  const t = getTranslation(language);
  // Default translations (matches server-side render)
  const defaultT = getTranslation("TR");

  // HYDRATION FIX: Set mounted after client-side render
  useEffect(() => {
    setMounted(true);
  }, []);

  // HYDRATION FIX: Use default translations until mounted
  const navLinks = [
    { name: mounted ? t.nav.home : defaultT.nav.home, href: "/" },
    { name: mounted ? t.nav.findDoctors : defaultT.nav.findDoctors, href: "/doctors" },
    { name: mounted ? t.nav.services : defaultT.nav.services, href: "/services" },
    { name: mounted ? t.nav.contact : defaultT.nav.contact, href: "/contact" },
  ];

  const languages = [
    { code: "EN", label: "English", flag: "🇬🇧" },
    { code: "TR", label: "Türkçe", flag: "🇹🇷" },
    { code: "AR", label: "العربية", flag: "🇸🇦" },
  ];

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-teal-600 p-1.5 rounded-lg">
              <Heart className="w-5 h-5 text-white" fill="currentColor" />
            </div>
            <span className="text-xl font-bold text-gray-900">MediFlow</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-teal-600"
                    : "text-gray-600 hover:text-teal-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Language Selector & Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {/* Language Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-gray-600 hover:text-teal-600 gap-2"
                >
                  <Globe className="w-4 h-4" />
                  {language}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                    }}
                    className={`cursor-pointer ${
                      language === lang.code ? "bg-teal-50 text-teal-600" : ""
                    }`}
                  >
                    <span className="mr-2">{lang.flag}</span>
                    {lang.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Auth State: Show loading spinner, user menu, or login buttons */}
            {loading ? (
              // Loading state - show skeleton or nothing
              <div className="w-24 h-10 bg-gray-100 animate-pulse rounded-md"></div>
            ) : user ? (
              // Authenticated - show user dropdown
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2 border-teal-600 text-teal-600 hover:bg-teal-50">
                    <User className="w-4 h-4" />
                    {user.firstName}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5 text-sm">
                    <p className="font-medium">{user.firstName} {user.lastName}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                    {user.role && (
                      <p className="text-xs text-teal-600 font-medium mt-1">Role: {user.role}</p>
                    )}
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={user.role === "ADMIN" ? "/panel/dashboard" : "/dashboard"} className="cursor-pointer">
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      {mounted ? (user.role === "ADMIN" ? t.nav.adminPanel : t.nav.dashboard) : defaultT.nav.dashboard}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="cursor-pointer">
                      <Settings className="w-4 h-4 mr-2" />
                      {mounted ? t.nav.settings : defaultT.nav.settings}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={logout}
                    className="cursor-pointer text-red-600 focus:text-red-600"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    {mounted ? t.nav.logout : defaultT.nav.logout}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              // Not authenticated - show login/register buttons
              <>
                <Link href="/login">
                  <Button variant="ghost" className="text-gray-600 hover:text-teal-600">
                    {mounted ? t.nav.login : defaultT.nav.login}
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white rounded-full px-6">
                    {mounted ? t.nav.register : defaultT.nav.register}
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-teal-600 p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === link.href
                    ? "bg-teal-50 text-teal-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-teal-600"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-2 border-t border-gray-100 mt-2">
              {/* Language Selector for Mobile */}
              <div className="px-3 py-2">
                <p className="text-xs font-semibold text-gray-500 mb-2">Language</p>
                <div className="flex gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        language === lang.code
                          ? "bg-teal-600 text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      <span className="mr-1">{lang.flag}</span>
                      {lang.code}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Mobile Auth State */}
              {loading ? (
                <div className="px-3 py-2">
                  <div className="w-full h-10 bg-gray-100 animate-pulse rounded-md"></div>
                </div>
              ) : user ? (
                <>
                  <div className="px-3 py-2 bg-teal-50 rounded-md">
                    <p className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</p>
                    <p className="text-xs text-gray-600">{user.email}</p>
                  </div>
                  <Link 
                    href={user.role === "ADMIN" ? "/panel/dashboard" : "/dashboard"} 
                    onClick={() => setIsOpen(false)}
                  >
                    <Button variant="ghost" className="w-full justify-start">
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      {mounted ? (user.role === "ADMIN" ? t.nav.adminPanel : t.nav.dashboard) : defaultT.nav.dashboard}
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={() => {
                      setIsOpen(false);
                      logout();
                    }}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    {mounted ? t.nav.logout : defaultT.nav.logout}
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start">
                      <User className="w-4 h-4 mr-2" />
                      {mounted ? t.nav.login : defaultT.nav.login}
                    </Button>
                  </Link>
                  <Link href="/register" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-teal-600 hover:bg-teal-700">
                      {mounted ? t.nav.register : defaultT.nav.register}
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;