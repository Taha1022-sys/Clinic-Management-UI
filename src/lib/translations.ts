/**
 * GLOBAL TRANSLATION DICTIONARY
 * Complete translations for TR (Turkish), EN (English), AR (Arabic)
 */

export interface TranslationDictionary {
  // Navigation
  nav: {
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
  };
  
  // Hero Section (Home Page)
  hero: {
    title: string;
    titleHighlight: string;
    subtitle: string;
    findDoctor: string;
    ourServices: string;
  };
  
  // Stats Section
  stats: {
    happyPatients: string;
    expertDoctors: string;
    yearsExperience: string;
    available: string;
  };
  
  // Services Section
  services: {
    title: string;
    subtitle: string;
    easyAppointments: string;
    easyAppointmentsDesc: string;
    securePrivate: string;
    securePrivateDesc: string;
    healthMonitoring: string;
    healthMonitoringDesc: string;
  };
  
  // About Section
  about: {
    title: string;
    subtitle: string;
    description: string;
    learnMore: string;
  };
  
  // Booking/Appointments
  booking: {
    bookAppointment: string;
    selectDate: string;
    selectTime: string;
    notes: string;
    notesPlaceholder: string;
    confirmBooking: string;
    cancel: string;
    bookingSuccess: string;
    bookingError: string;
    loginRequired: string;
    selectDateTime: string;
  };
  
  // Doctor Page
  doctors: {
    title: string;
    subtitle: string;
    search: string;
    loading: string;
    noResults: string;
    experience: string;
    yearsExp: string;
    workingHours: string;
  };
  
  // Dashboard
  dashboard: {
    welcome: string;
    myAppointments: string;
    upcomingAppointments: string;
    pastAppointments: string;
    noAppointments: string;
    bookNew: string;
    cancelAppointment: string;
    viewDetails: string;
  };
  
  // Contact Page
  contact: {
    title: string;
    subtitle: string;
    getInTouch: string;
    name: string;
    email: string;
    message: string;
    sendMessage: string;
    sending: string;
    successMessage: string;
    errorMessage: string;
    ourInfo: string;
    address: string;
    phone: string;
    emailLabel: string;
    businessHours: string;
    hoursValue: string;
  };
  
  // Admin Panel
  admin: {
    appointments: string;
    doctors: string;
    patients: string;
    allAppointments: string;
    manageDoctors: string;
    managePatients: string;
    patient: string;
    doctor: string;
    date: string;
    status: string;
    actions: string;
    pending: string;
    confirmed: string;
    cancelled: string;
    completed: string;
    viewAll: string;
  };
  
  // Common
  common: {
    save: string;
    edit: string;
    delete: string;
    confirm: string;
    cancel: string;
    close: string;
    loading: string;
    error: string;
    success: string;
    back: string;
    next: string;
  };
  
  // Form Validation
  validation: {
    nameMin: string;
    emailInvalid: string;
    messageMin: string;
    required: string;
  };
}

export const translations: Record<string, TranslationDictionary> = {
  TR: {
    nav: {
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
    },
    hero: {
      title: "Aileniz İçin Modern",
      titleHighlight: "Sağlık Hizmeti",
      subtitle: "Deneyimli doktorlar, kolay randevular ve kişiselleştirilmiş bakımla kaliteli sağlık hizmetlerine erişin.",
      findDoctor: "Doktor Bul",
      ourServices: "Hizmetlerimiz",
    },
    stats: {
      happyPatients: "Mutlu Hasta",
      expertDoctors: "Uzman Doktor",
      yearsExperience: "Yıllık Deneyim",
      available: "Müsait",
    },
    services: {
      title: "Hizmetlerimiz",
      subtitle: "Sağlığınız için kapsamlı çözümler",
      easyAppointments: "Kolay Randevular",
      easyAppointmentsDesc: "Tercih ettiğiniz doktorla sadece birkaç tıklamayla randevu alın.",
      securePrivate: "Güvenli ve Özel",
      securePrivateDesc: "Sağlık verileriniz kurumsal düzeyde güvenlikle korunur.",
      healthMonitoring: "Sağlık Takibi",
      healthMonitoringDesc: "Sağlık kayıtlarınızı takip edin ve kişiselleştirilmiş bakım önerileri alın.",
    },
    about: {
      title: "Neden Bizi Seçmelisiniz?",
      subtitle: "Sağlığınız bizim önceliğimiz",
      description: "15 yılı aşkın deneyimimiz ve hasta memnuniyetine olan bağlılığımızla aileniz için en iyi sağlık hizmetini sunuyoruz. Modern teknoloji ve deneyimli kadromuz sayesinde güvenle hizmet veriyoruz.",
      learnMore: "Daha Fazla Bilgi",
    },
    booking: {
      bookAppointment: "Randevu Al",
      selectDate: "Tarih Seçin",
      selectTime: "Saat Seçin",
      notes: "Notlarınız (Opsiyonel)",
      notesPlaceholder: "Şikayetiniz veya belirtmek istediğiniz detaylar...",
      confirmBooking: "Randevuyu Onayla",
      cancel: "İptal",
      bookingSuccess: "Randevunuz başarıyla oluşturuldu!",
      bookingError: "Randevu oluşturulurken bir hata oluştu.",
      loginRequired: "Randevu almak için giriş yapmalısınız.",
      selectDateTime: "Lütfen tarih ve saat seçiniz.",
    },
    doctors: {
      title: "Doktorlarımız",
      subtitle: "Uzman doktorlarımızla tanışın",
      search: "Doktor ara...",
      loading: "Doktorlar yükleniyor...",
      noResults: "Doktor bulunamadı.",
      experience: "Deneyim",
      yearsExp: "Yıl Deneyim",
      workingHours: "Hafta İçi: 09:00 - 18:00",
    },
    dashboard: {
      welcome: "Hoş Geldiniz",
      myAppointments: "Randevularım",
      upcomingAppointments: "Yaklaşan Randevular",
      pastAppointments: "Geçmiş Randevular",
      noAppointments: "Henüz randevunuz yok.",
      bookNew: "Yeni Randevu Al",
      cancelAppointment: "Randevuyu İptal Et",
      viewDetails: "Detayları Gör",
    },
    contact: {
      title: "İletişime Geçin",
      subtitle: "Size nasıl yardımcı olabiliriz?",
      getInTouch: "Bize Ulaşın",
      name: "Adınız",
      email: "E-posta",
      message: "Mesajınız",
      sendMessage: "Mesaj Gönder",
      sending: "Gönderiliyor...",
      successMessage: "Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.",
      errorMessage: "Mesaj gönderilemedi. Lütfen tekrar deneyin.",
      ourInfo: "İletişim Bilgileri",
      address: "Adres",
      phone: "Telefon",
      emailLabel: "E-posta",
      businessHours: "Çalışma Saatleri",
      hoursValue: "Pazartesi - Cuma: 09:00 - 18:00",
    },
    admin: {
      appointments: "Randevular",
      doctors: "Doktorlar",
      patients: "Hastalar",
      allAppointments: "Tüm Randevular",
      manageDoctors: "Doktor Yönetimi",
      managePatients: "Hasta Yönetimi",
      patient: "Hasta",
      doctor: "Doktor",
      date: "Tarih",
      status: "Durum",
      actions: "İşlemler",
      pending: "Beklemede",
      confirmed: "Onaylandı",
      cancelled: "İptal Edildi",
      completed: "Tamamlandı",
      viewAll: "Tümünü Gör",
    },
    common: {
      save: "Kaydet",
      edit: "Düzenle",
      delete: "Sil",
      confirm: "Onayla",
      cancel: "İptal",
      close: "Kapat",
      loading: "Yükleniyor...",
      error: "Hata",
      success: "Başarılı",
      back: "Geri",
      next: "İleri",
    },
    validation: {
      nameMin: "İsim en az 2 karakter olmalıdır",
      emailInvalid: "Lütfen geçerli bir e-posta adresi girin",
      messageMin: "Mesaj en az 10 karakter olmalıdır",
      required: "Bu alan zorunludur",
    },
  },
  
  EN: {
    nav: {
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
    },
    hero: {
      title: "Modern Healthcare for",
      titleHighlight: "Your Family",
      subtitle: "Access quality healthcare services with experienced doctors, convenient appointments, and personalized care.",
      findDoctor: "Find a Doctor",
      ourServices: "Our Services",
    },
    stats: {
      happyPatients: "Happy Patients",
      expertDoctors: "Expert Doctors",
      yearsExperience: "Years Experience",
      available: "Available",
    },
    services: {
      title: "Our Services",
      subtitle: "Comprehensive solutions for your health",
      easyAppointments: "Easy Appointments",
      easyAppointmentsDesc: "Book appointments with your preferred doctors in just a few clicks.",
      securePrivate: "Secure & Private",
      securePrivateDesc: "Your health data is protected with enterprise-grade security.",
      healthMonitoring: "Health Monitoring",
      healthMonitoringDesc: "Track your health records and get personalized care recommendations.",
    },
    about: {
      title: "Why Choose Us?",
      subtitle: "Your health is our priority",
      description: "With over 15 years of experience and commitment to patient satisfaction, we provide the best healthcare for your family. Our modern technology and experienced staff ensure quality service.",
      learnMore: "Learn More",
    },
    booking: {
      bookAppointment: "Book Appointment",
      selectDate: "Select Date",
      selectTime: "Select Time",
      notes: "Your Notes (Optional)",
      notesPlaceholder: "Your complaints or details you'd like to mention...",
      confirmBooking: "Confirm Appointment",
      cancel: "Cancel",
      bookingSuccess: "Your appointment has been successfully created!",
      bookingError: "An error occurred while creating the appointment.",
      loginRequired: "You must login to book an appointment.",
      selectDateTime: "Please select date and time.",
    },
    doctors: {
      title: "Our Doctors",
      subtitle: "Meet our expert doctors",
      search: "Search doctors...",
      loading: "Loading doctors...",
      noResults: "No doctors found.",
      experience: "Experience",
      yearsExp: "Years Experience",
      workingHours: "Weekdays: 09:00 - 18:00",
    },
    dashboard: {
      welcome: "Welcome",
      myAppointments: "My Appointments",
      upcomingAppointments: "Upcoming Appointments",
      pastAppointments: "Past Appointments",
      noAppointments: "You don't have any appointments yet.",
      bookNew: "Book New Appointment",
      cancelAppointment: "Cancel Appointment",
      viewDetails: "View Details",
    },
    contact: {
      title: "Get in Touch",
      subtitle: "How can we help you?",
      getInTouch: "Contact Us",
      name: "Your Name",
      email: "Email",
      message: "Your Message",
      sendMessage: "Send Message",
      sending: "Sending...",
      successMessage: "Message sent successfully! We'll get back to you soon.",
      errorMessage: "Failed to send message. Please try again.",
      ourInfo: "Contact Information",
      address: "Address",
      phone: "Phone",
      emailLabel: "Email",
      businessHours: "Business Hours",
      hoursValue: "Monday - Friday: 09:00 - 18:00",
    },
    admin: {
      appointments: "Appointments",
      doctors: "Doctors",
      patients: "Patients",
      allAppointments: "All Appointments",
      manageDoctors: "Manage Doctors",
      managePatients: "Manage Patients",
      patient: "Patient",
      doctor: "Doctor",
      date: "Date",
      status: "Status",
      actions: "Actions",
      pending: "Pending",
      confirmed: "Confirmed",
      cancelled: "Cancelled",
      completed: "Completed",
      viewAll: "View All",
    },
    common: {
      save: "Save",
      edit: "Edit",
      delete: "Delete",
      confirm: "Confirm",
      cancel: "Cancel",
      close: "Close",
      loading: "Loading...",
      error: "Error",
      success: "Success",
      back: "Back",
      next: "Next",
    },
    validation: {
      nameMin: "Name must be at least 2 characters",
      emailInvalid: "Please enter a valid email address",
      messageMin: "Message must be at least 10 characters",
      required: "This field is required",
    },
  },
  
  AR: {
    nav: {
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
    },
    hero: {
      title: "رعاية صحية حديثة",
      titleHighlight: "لعائلتك",
      subtitle: "احصل على خدمات رعاية صحية عالية الجودة مع أطباء ذوي خبرة ومواعيد مريحة ورعاية شخصية.",
      findDoctor: "ابحث عن طبيب",
      ourServices: "خدماتنا",
    },
    stats: {
      happyPatients: "مريض سعيد",
      expertDoctors: "طبيب خبير",
      yearsExperience: "سنوات الخبرة",
      available: "متاح",
    },
    services: {
      title: "خدماتنا",
      subtitle: "حلول شاملة لصحتك",
      easyAppointments: "مواعيد سهلة",
      easyAppointmentsDesc: "احجز موعدًا مع الأطباء المفضلين لديك ببضع نقرات فقط.",
      securePrivate: "آمن وخاص",
      securePrivateDesc: "بياناتك الصحية محمية بأمان على مستوى المؤسسات.",
      healthMonitoring: "مراقبة الصحة",
      healthMonitoringDesc: "تتبع سجلاتك الصحية واحصل على توصيات رعاية شخصية.",
    },
    about: {
      title: "لماذا تختارنا؟",
      subtitle: "صحتك أولويتنا",
      description: "مع أكثر من 15 عامًا من الخبرة والتزامنا برضا المرضى، نقدم أفضل رعاية صحية لعائلتك. تضمن تقنيتنا الحديثة وموظفونا ذوو الخبرة خدمة عالية الجودة.",
      learnMore: "اعرف المزيد",
    },
    booking: {
      bookAppointment: "احجز موعد",
      selectDate: "اختر التاريخ",
      selectTime: "اختر الوقت",
      notes: "ملاحظاتك (اختياري)",
      notesPlaceholder: "شكواك أو التفاصيل التي تريد ذكرها...",
      confirmBooking: "تأكيد الموعد",
      cancel: "إلغاء",
      bookingSuccess: "تم إنشاء موعدك بنجاح!",
      bookingError: "حدث خطأ أثناء إنشاء الموعد.",
      loginRequired: "يجب عليك تسجيل الدخول لحجز موعد.",
      selectDateTime: "الرجاء تحديد التاريخ والوقت.",
    },
    doctors: {
      title: "أطباؤنا",
      subtitle: "تعرف على أطبائنا الخبراء",
      search: "البحث عن الأطباء...",
      loading: "جاري تحميل الأطباء...",
      noResults: "لم يتم العثور على أطباء.",
      experience: "الخبرة",
      yearsExp: "سنوات الخبرة",
      workingHours: "أيام الأسبوع: 09:00 - 18:00",
    },
    dashboard: {
      welcome: "مرحباً",
      myAppointments: "مواعيدي",
      upcomingAppointments: "المواعيد القادمة",
      pastAppointments: "المواعيد السابقة",
      noAppointments: "ليس لديك أي مواعيد بعد.",
      bookNew: "احجز موعد جديد",
      cancelAppointment: "إلغاء الموعد",
      viewDetails: "عرض التفاصيل",
    },
    contact: {
      title: "تواصل معنا",
      subtitle: "كيف يمكننا مساعدتك؟",
      getInTouch: "اتصل بنا",
      name: "اسمك",
      email: "البريد الإلكتروني",
      message: "رسالتك",
      sendMessage: "إرسال الرسالة",
      sending: "جاري الإرسال...",
      successMessage: "تم إرسال الرسالة بنجاح! سنتواصل معك قريبًا.",
      errorMessage: "فشل إرسال الرسالة. يرجى المحاولة مرة أخرى.",
      ourInfo: "معلومات الاتصال",
      address: "العنوان",
      phone: "الهاتف",
      emailLabel: "البريد الإلكتروني",
      businessHours: "ساعات العمل",
      hoursValue: "الاثنين - الجمعة: 09:00 - 18:00",
    },
    admin: {
      appointments: "المواعيد",
      doctors: "الأطباء",
      patients: "المرضى",
      allAppointments: "جميع المواعيد",
      manageDoctors: "إدارة الأطباء",
      managePatients: "إدارة المرضى",
      patient: "المريض",
      doctor: "الطبيب",
      date: "التاريخ",
      status: "الحالة",
      actions: "الإجراءات",
      pending: "قيد الانتظار",
      confirmed: "مؤكد",
      cancelled: "ملغى",
      completed: "مكتمل",
      viewAll: "عرض الكل",
    },
    common: {
      save: "حفظ",
      edit: "تعديل",
      delete: "حذف",
      confirm: "تأكيد",
      cancel: "إلغاء",
      close: "إغلاق",
      loading: "جاري التحميل...",
      error: "خطأ",
      success: "نجح",
      back: "رجوع",
      next: "التالي",
    },
    validation: {
      nameMin: "يجب أن يكون الاسم على الأقل حرفين",
      emailInvalid: "الرجاء إدخال عنوان بريد إلكتروني صالح",
      messageMin: "يجب أن تكون الرسالة على الأقل 10 أحرف",
      required: "هذا الحقل مطلوب",
    },
  },
};

/**
 * Get translation dictionary for a specific language
 * Defaults to TR if language not found
 */
export const getTranslation = (lang: string): TranslationDictionary => {
  return translations[lang.toUpperCase()] || translations.TR;
};
