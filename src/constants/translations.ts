export interface Translation {
  // Navigation
  home: string;
  findDoctors: string;
  services: string;
  contact: string;
  login: string;
  register: string;
  logout: string;
  dashboard: string;
  adminPanel: string;
  settings: string;
  
  // Common Actions
  bookAppointment: string;
  cancel: string;
  confirm: string;
  save: string;
  edit: string;
  delete: string;
  search: string;
  
  // Booking
  selectDate: string;
  selectTime: string;
  notes: string;
  notesPlaceholder: string;
  confirmBooking: string;
  bookingSuccess: string;
  bookingError: string;
  
  // Auth
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  loginRequired: string;
  
  // Doctor Info
  experience: string;
  workingHours: string;
  yearsExperience: string;
}

export const translations: Record<string, Translation> = {
  TR: {
    // Navigation
    home: "Ana Sayfa",
    findDoctors: "Doktor Bul",
    services: "Hizmetlerimiz",
    contact: "İletişim",
    login: "Giriş Yap",
    register: "Kayıt Ol",
    logout: "Çıkış Yap",
    dashboard: "Panel",
    adminPanel: "Yönetim Paneli",
    settings: "Ayarlar",
    
    // Common Actions
    bookAppointment: "Randevu Al",
    cancel: "İptal",
    confirm: "Onayla",
    save: "Kaydet",
    edit: "Düzenle",
    delete: "Sil",
    search: "Ara",
    
    // Booking
    selectDate: "Tarih Seçin",
    selectTime: "Saat Seçin",
    notes: "Notlarınız (Opsiyonel)",
    notesPlaceholder: "Şikayetiniz veya belirtmek istediğiniz detaylar...",
    confirmBooking: "Randevuyu Onayla",
    bookingSuccess: "Randevunuz başarıyla oluşturuldu!",
    bookingError: "Randevu oluşturulurken bir hata oluştu.",
    
    // Auth
    email: "E-posta",
    password: "Şifre",
    firstName: "Ad",
    lastName: "Soyad",
    loginRequired: "Randevu almak için giriş yapmalısınız.",
    
    // Doctor Info
    experience: "Deneyim",
    workingHours: "Hafta İçi: 09:00 - 18:00",
    yearsExperience: "Yıl Deneyim",
  },
  
  EN: {
    // Navigation
    home: "Home",
    findDoctors: "Find Doctors",
    services: "Services",
    contact: "Contact",
    login: "Login",
    register: "Register",
    logout: "Logout",
    dashboard: "Dashboard",
    adminPanel: "Admin Panel",
    settings: "Settings",
    
    // Common Actions
    bookAppointment: "Book Appointment",
    cancel: "Cancel",
    confirm: "Confirm",
    save: "Save",
    edit: "Edit",
    delete: "Delete",
    search: "Search",
    
    // Booking
    selectDate: "Select Date",
    selectTime: "Select Time",
    notes: "Your Notes (Optional)",
    notesPlaceholder: "Your complaints or details you'd like to mention...",
    confirmBooking: "Confirm Appointment",
    bookingSuccess: "Your appointment has been successfully created!",
    bookingError: "An error occurred while creating the appointment.",
    
    // Auth
    email: "Email",
    password: "Password",
    firstName: "First Name",
    lastName: "Last Name",
    loginRequired: "You must login to book an appointment.",
    
    // Doctor Info
    experience: "Experience",
    workingHours: "Weekdays: 09:00 - 18:00",
    yearsExperience: "Years Experience",
  },
  
  AR: {
    // Navigation
    home: "الرئيسية",
    findDoctors: "ابحث عن طبيب",
    services: "الخدمات",
    contact: "اتصل بنا",
    login: "تسجيل الدخول",
    register: "التسجيل",
    logout: "تسجيل الخروج",
    dashboard: "لوحة التحكم",
    adminPanel: "لوحة الإدارة",
    settings: "الإعدادات",
    
    // Common Actions
    bookAppointment: "احجز موعد",
    cancel: "إلغاء",
    confirm: "تأكيد",
    save: "حفظ",
    edit: "تعديل",
    delete: "حذف",
    search: "بحث",
    
    // Booking
    selectDate: "اختر التاريخ",
    selectTime: "اختر الوقت",
    notes: "ملاحظاتك (اختياري)",
    notesPlaceholder: "شكواك أو التفاصيل التي تريد ذكرها...",
    confirmBooking: "تأكيد الموعد",
    bookingSuccess: "تم إنشاء موعدك بنجاح!",
    bookingError: "حدث خطأ أثناء إنشاء الموعد.",
    
    // Auth
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    firstName: "الاسم الأول",
    lastName: "اسم العائلة",
    loginRequired: "يجب عليك تسجيل الدخول لحجز موعد.",
    
    // Doctor Info
    experience: "الخبرة",
    workingHours: "أيام الأسبوع: 09:00 - 18:00",
    yearsExperience: "سنوات الخبرة",
  },
};

export const getTranslation = (lang: string): Translation => {
  return translations[lang] || translations.TR;
};
