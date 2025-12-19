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
    slotOccupied: string;
    occupiedLabel: string;
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
    workingHoursValue: string;
    biography: string;
    noBiography: string;
    consultationFee: string;
    viewDetails: string;
  };

  // Services Page
  servicesPage: {
    heroTitle: string;
    heroSubtitle: string;
    ourServices: string;
    servicesSubtitle: string;
    whyChoose: string;
    whyChooseSubtitle: string;
    generalConsultation: string;
    generalConsultationDesc: string;
    cardiology: string;
    cardiologyDesc: string;
    neurology: string;
    neurologyDesc: string;
    pediatrics: string;
    pediatricsDesc: string;
    orthopedics: string;
    orthopedicsDesc: string;
    pharmacy: string;
    pharmacyDesc: string;
    easyBooking: string;
    easyBookingDesc: string;
    flexibleHours: string;
    flexibleHoursDesc: string;
    insuranceAccepted: string;
    insuranceAcceptedDesc: string;
    digitalRecords: string;
    digitalRecordsDesc: string;
    feature1: string;
    feature2: string;
    feature3: string;
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

  // Footer
  footer: {
    brandDescription: string;
    quickLinks: string;
    servicesTitle: string;
    contactUs: string;
    allRightsReserved: string;
    readyToBook: string;
    readyToBookDesc: string;
    bookNow: string;
  };

  // CTA Section
  cta: {
    readyToBook: string;
    joinThousands: string;
    getStartedNow: string;
    whyChoose: string;
    experienceHealthcare: string;
  };

  // User Dashboard
  userDashboard: {
    overview: string;
    appointments: string;
    settings: string;
    profile: string;
    security: string;
    loadingDashboard: string;
    firstName: string;
    lastName: string;
    updateProfile: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
    changePassword: string;
    profileUpdated: string;
    passwordUpdated: string;
    noUpcoming: string;
    appointmentWith: string;
    specialty: string;
    time: string;
    cancel: string;
    cancelSuccess: string;
    cancelError: string;
  };

  // Admin Dashboard Extended
  adminDashboard: {
    dashboardOverview: string;
    totalAppointments: string;
    pendingActions: string;
    completedToday: string;
    todayRevenue: string;
    appointmentsManagement: string;
    doctorsManagement: string;
    patientsManagement: string;
    addNewDoctor: string;
    avatar: string;
    name: string;
    specialty: string;
    experience: string;
    price: string;
    status: string;
    actions: string;
    active: string;
    inactive: string;
    viewProfile: string;
    edit: string;
    delete: string;
    confirm: string;
    complete: string;
    patientName: string;
    email: string;
    totalAppointmentsCount: string;
    viewHistory: string;
    contactPatient: string;
    appointmentDetails: string;
    notes: string;
    noNotes: string;
    filterByPatient: string;
    filterByStatus: string;
    permanentDelete: string;
    confirmDelete: string;
    deleteWarning: string;
    areYouSure: string;
    confirmDeleteBtn: string;
    deleteSuccess: string;
    deleteError: string;
    filterBySpecialty: string;
    searchPatient: string;
    allStatuses: string;
    allSpecialties: string;
    clearFilters: string;
    viewProfileBtn: string;
    messagesTitle: string;
    messagesComingSoonTitle: string;
    messagesComingSoonDesc: string;
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
      slotOccupied: "Bu saat dolu",
      occupiedLabel: "DOLU",
    },
    doctors: {
      title: "Doktorlarımız",
      subtitle: "Uzman doktorlarımızla tanışın",
      search: "Doktor ara...",
      loading: "Doktorlar yükleniyor...",
      noResults: "Doktor bulunamadı.",
      experience: "Deneyim",
      yearsExp: "Yıl Deneyim",
      workingHours: "Çalışma Saatleri",
      workingHoursValue: "Pazartesi - Cuma: 09:00 - 17:00",
      biography: "Hakkında",
      noBiography: "Biyografi bilgisi mevcut değil.",
      consultationFee: "Muayene Ücreti",
      viewDetails: "Detayları Görüntüle",
    },
    servicesPage: {
      heroTitle: "Sağlık Hizmetlerimiz",
      heroSubtitle: "İhtiyaçlarınıza özel kapsamlı tıbbi bakım",
      ourServices: "Sunduğumuz Tıbbi Hizmetler",
      servicesSubtitle: "Rutin muayenelerden özel tedavilere, her zaman yanınızdayız",
      whyChoose: "Neden Hizmetlerimizi Seçmelisiniz?",
      whyChooseSubtitle: "Size özel tasarlanmış sağlık hizmeti deneyimleyin",
      generalConsultation: "Genel Muayene",
      generalConsultationDesc: "Deneyimli pratisyen hekimlerimizle kapsamlı sağlık kontrolleri ve konsültasyonlar.",
      cardiology: "Kardiyoloji",
      cardiologyDesc: "Teşhis, tedavi ve rehabilitasyon hizmetlerini içeren uzman kalp bakımı.",
      neurology: "Nöroloji",
      neurologyDesc: "Gelişmiş teşhis yetenekleriyle nörolojik rahatsızlıklar için özel bakım.",
      pediatrics: "Pediatri",
      pediatricsDesc: "Bebekler, çocuklar ve ergenler için özel sağlık hizmetleri.",
      orthopedics: "Ortopedi",
      orthopedicsDesc: "Cerrahi ve cerrahi olmayan seçeneklerle kemik, eklem ve kas rahatsızlıkları tedavisi.",
      pharmacy: "Eczane Hizmetleri",
      pharmacyDesc: "Geniş ilaç ve sağlık ürünleri yelpazesi sunan yerinde eczane.",
      easyBooking: "Kolay Randevu",
      easyBookingDesc: "7/24 online randevu alın, anında onay.",
      flexibleHours: "Esnek Çalışma Saatleri",
      flexibleHoursDesc: "Kolaylığınız için uzun saatler ve hafta sonu erişilebilirlik.",
      insuranceAccepted: "Sigorta Kabul Edilir",
      insuranceAcceptedDesc: "Çoğu büyük sigorta sağlayıcılarıyla çalışıyoruz.",
      digitalRecords: "Dijital Kayıtlar",
      digitalRecordsDesc: "Tıbbi kayıtlarınıza güvenli erişim, her zaman, her yerde.",
      feature1: "Fiziksel Muayene",
      feature2: "Sağlık Taraması",
      feature3: "Koruyucu Bakım",
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
    footer: {
      brandDescription: "Hasta konforu ve ileri tıbbi tedaviye odaklanarak dünya standartlarında sağlık hizmetleri sunuyoruz.",
      quickLinks: "Hızlı Bağlantılar",
      servicesTitle: "Hizmetler",
      contactUs: "İletişim",
      allRightsReserved: "Tüm hakları saklıdır.",
      readyToBook: "Randevunuzu almaya hazır mısınız?",
      readyToBookDesc: "Uzman doktorlarımızla hemen randevu alın.",
      bookNow: "Hemen Randevu Al",
    },
    cta: {
      readyToBook: "Randevunuzu Almaya Hazır Mısınız?",
      joinThousands: "Sağlık ihtiyaçları için MediFlow'a güvenen binlerce memnun hastaya katılın.",
      getStartedNow: "Hemen Başlayın",
      whyChoose: "Neden MediFlow'u Seçmelisiniz?",
      experienceHealthcare: "Sizi öncelik olarak gören sağlık hizmetini deneyimleyin...",
    },
    userDashboard: {
      overview: "Genel Bakış",
      appointments: "Randevular",
      settings: "Ayarlar",
      profile: "Profil",
      security: "Güvenlik",
      loadingDashboard: "Panonuz yükleniyor...",
      firstName: "Ad",
      lastName: "Soyad",
      updateProfile: "Profili Güncelle",
      currentPassword: "Mevcut Şifre",
      newPassword: "Yeni Şifre",
      confirmPassword: "Şifre Onayı",
      changePassword: "Şifreyi Değiştir",
      profileUpdated: "Profil başarıyla güncellendi!",
      passwordUpdated: "Şifre başarıyla değiştirildi!",
      noUpcoming: "Yaklaşan randevunuz yok.",
      appointmentWith: "Randevu",
      specialty: "Uzmanlık",
      time: "Saat",
      cancel: "İptal",
      cancelSuccess: "Randevu iptal edildi",
      cancelError: "Randevu iptal edilemedi",
    },
    adminDashboard: {
      dashboardOverview: "Yönetim Paneli",
      totalAppointments: "Toplam Randevular",
      pendingActions: "Bekleyen İşlemler",
      completedToday: "Bugün Tamamlanan",
      todayRevenue: "Bugünün Geliri",
      appointmentsManagement: "Randevu Yönetimi",
      doctorsManagement: "Doktor Yönetimi",
      patientsManagement: "Hasta Yönetimi",
      addNewDoctor: "+ Yeni Doktor Ekle",
      avatar: "Avatar",
      name: "İsim",
      specialty: "Uzmanlık",
      experience: "Deneyim",
      price: "Ücret",
      status: "Durum",
      actions: "İşlemler",
      active: "Aktif",
      inactive: "Pasif",
      viewProfile: "Profili Görüntüle",
      edit: "Düzenle",
      delete: "Sil",
      confirm: "Onayla",
      complete: "Tamamla",
      patientName: "Hasta Adı",
      email: "E-posta",
      totalAppointmentsCount: "Toplam Randevu",
      viewHistory: "Geçmişi Görüntüle",
      contactPatient: "Hasta ile İletişim",
      appointmentDetails: "Randevu Detayları",
      notes: "Notlar",
      noNotes: "Not yok",
      filterByPatient: "Hasta Adına Göre Filtrele",
      filterByStatus: "Duruma Göre Filtrele",
      filterBySpecialty: "Uzmanlığa Göre Filtrele",
      searchPatient: "Hasta adı ara...",
      allStatuses: "Tüm Durumlar",
      allSpecialties: "Tüm Uzmanlıklar",
      clearFilters: "Filtreleri Temizle",
      viewProfileBtn: "Profili Görüntüle",
      permanentDelete: "Kalıcı Olarak Sil",
      confirmDelete: "Kalıcı Silmeyi Onayla",
      deleteWarning: "Bu işlem geri alınamaz. Bu, randevuyu veritabanından kalıcı olarak silecektir.",
      areYouSure: "Devam etmek istediğinizden emin misiniz?",
      confirmDeleteBtn: "Evet, Kalıcı Olarak Sil",
      deleteSuccess: "Randevu başarıyla silindi",
      deleteError: "Randevu silinemedi",
      messagesTitle: "Mesaj Yönetimi",
      messagesComingSoonTitle: "Mesajlar Özelliği Çok Yakında",
      messagesComingSoonDesc: "Bu özellik çok yakında aktif edilecek. Buradan tüm hasta mesajlarını ve soruşturmalarını yönetebileceksiniz.",
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
      slotOccupied: "Slot is occupied",
      occupiedLabel: "FULL",
    },
    doctors: {
      title: "Our Doctors",
      subtitle: "Meet our expert doctors",
      search: "Search doctors...",
      loading: "Loading doctors...",
      noResults: "No doctors found.",
      experience: "Experience",
      yearsExp: "Years Experience",
      workingHours: "Working Hours",
      workingHoursValue: "Monday - Friday: 9:00 AM - 5:00 PM",
      biography: "About",
      noBiography: "No biography available.",
      consultationFee: "Consultation Fee",
      viewDetails: "View Details",
    },
    servicesPage: {
      heroTitle: "Our Healthcare Services",
      heroSubtitle: "Comprehensive medical care tailored to your needs",
      ourServices: "Medical Services We Offer",
      servicesSubtitle: "From routine check-ups to specialized treatments, we're here for you",
      whyChoose: "Why Choose Our Services?",
      whyChooseSubtitle: "Experience healthcare that's designed around you",
      generalConsultation: "General Consultation",
      generalConsultationDesc: "Comprehensive health check-ups and consultations with experienced general practitioners.",
      cardiology: "Cardiology",
      cardiologyDesc: "Expert cardiac care including diagnostics, treatment, and rehabilitation services.",
      neurology: "Neurology",
      neurologyDesc: "Specialized care for neurological conditions with advanced diagnostic capabilities.",
      pediatrics: "Pediatrics",
      pediatricsDesc: "Dedicated healthcare services for infants, children, and adolescents.",
      orthopedics: "Orthopedics",
      orthopedicsDesc: "Treatment for bone, joint, and muscle conditions with surgical and non-surgical options.",
      pharmacy: "Pharmacy Services",
      pharmacyDesc: "On-site pharmacy with a wide range of medications and health products.",
      easyBooking: "Easy Booking",
      easyBookingDesc: "Schedule appointments online 24/7 with instant confirmation.",
      flexibleHours: "Flexible Hours",
      flexibleHoursDesc: "Extended hours and weekend availability for your convenience.",
      insuranceAccepted: "Insurance Accepted",
      insuranceAcceptedDesc: "We work with most major insurance providers.",
      digitalRecords: "Digital Records",
      digitalRecordsDesc: "Secure access to your medical records anytime, anywhere.",
      feature1: "Physical Examination",
      feature2: "Health Screening",
      feature3: "Preventive Care",
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
    footer: {
      brandDescription: "Providing world-class healthcare services with a focus on patient comfort and advanced medical treatment.",
      quickLinks: "Quick Links",
      servicesTitle: "Services",
      contactUs: "Contact Us",
      allRightsReserved: "All rights reserved.",
      readyToBook: "Ready to book your appointment?",
      readyToBookDesc: "Schedule with our expert doctors now.",
      bookNow: "Book Now",
    },
    cta: {
      readyToBook: "Ready to Book Your Appointment?",
      joinThousands: "Join thousands of satisfied patients who trust MediFlow for their healthcare needs.",
      getStartedNow: "Get Started Now",
      whyChoose: "Why Choose MediFlow?",
      experienceHealthcare: "Experience healthcare that puts you first...",
    },
    userDashboard: {
      overview: "Overview",
      appointments: "Appointments",
      settings: "Settings",
      profile: "Profile",
      security: "Security",
      loadingDashboard: "Loading your dashboard...",
      firstName: "First Name",
      lastName: "Last Name",
      updateProfile: "Update Profile",
      currentPassword: "Current Password",
      newPassword: "New Password",
      confirmPassword: "Confirm Password",
      changePassword: "Change Password",
      profileUpdated: "Profile updated successfully!",
      passwordUpdated: "Password changed successfully!",
      noUpcoming: "No upcoming appointments.",
      appointmentWith: "Appointment with",
      specialty: "Specialty",
      time: "Time",
      cancel: "Cancel",
      cancelSuccess: "Appointment cancelled",
      cancelError: "Failed to cancel appointment",
    },
    adminDashboard: {
      dashboardOverview: "Dashboard Overview",
      totalAppointments: "Total Appointments",
      pendingActions: "Pending Actions",
      completedToday: "Completed Today",
      todayRevenue: "Today's Revenue",
      appointmentsManagement: "Appointments Management",
      doctorsManagement: "Doctors Management",
      patientsManagement: "Patients Management",
      addNewDoctor: "+ Add New Doctor",
      avatar: "Avatar",
      name: "Name",
      specialty: "Specialty",
      experience: "Experience",
      price: "Price",
      status: "Status",
      actions: "Actions",
      active: "Active",
      inactive: "Inactive",
      viewProfile: "View Profile",
      edit: "Edit",
      delete: "Delete",
      confirm: "Confirm",
      complete: "Complete",
      patientName: "Patient Name",
      email: "Email",
      totalAppointmentsCount: "Total Appointments",
      viewHistory: "View History",
      contactPatient: "Contact Patient",
      appointmentDetails: "Appointment Details",
      notes: "Notes",
      noNotes: "No notes",
      filterByPatient: "Filter by Patient",
      filterByStatus: "Filter by Status",
      filterBySpecialty: "Filter by Specialty",
      searchPatient: "Search patient name...",
      allStatuses: "All Statuses",
      allSpecialties: "All Specialties",
      clearFilters: "Clear Filters",
      viewProfileBtn: "View Profile",
      permanentDelete: "Permanent Delete",
      confirmDelete: "Confirm Permanent Delete",
      deleteWarning: "This action cannot be undone. This will permanently delete the appointment from the database.",
      areYouSure: "Are you sure you want to proceed?",
      confirmDeleteBtn: "Yes, Delete Permanently",
      deleteSuccess: "Appointment deleted successfully",
      deleteError: "Failed to delete appointment",
      messagesTitle: "Message Management",
      messagesComingSoonTitle: "Messages Feature Coming Soon",
      messagesComingSoonDesc: "This feature will be activated very soon. You'll be able to manage all patient messages and inquiries from here.",
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
      slotOccupied: "الوقت محجوز",
      occupiedLabel: "ممتلئ",
    },
    doctors: {
      title: "أطباؤنا",
      subtitle: "تعرف على أطبائنا الخبراء",
      search: "البحث عن الأطباء...",
      loading: "جاري تحميل الأطباء...",
      noResults: "لم يتم العثور على أطباء.",
      experience: "الخبرة",
      yearsExp: "سنوات الخبرة",
      workingHours: "ساعات العمل",
      workingHoursValue: "الإثنين - الجمعة: 9:00 صباحاً - 5:00 مساءً",
      biography: "نبذة عنه",
      noBiography: "لا توجد سيرة ذاتية متاحة.",
      consultationFee: "رسوم الاستشارة",
      viewDetails: "عرض التفاصيل",
    },
    servicesPage: {
      heroTitle: "خدماتنا الصحية",
      heroSubtitle: "رعاية طبية شاملة مصممة حسب احتياجاتك",
      ourServices: "الخدمات الطبية التي نقدمها",
      servicesSubtitle: "من الفحوصات الروتينية إلى العلاجات المتخصصة، نحن هنا من أجلك",
      whyChoose: "لماذا تختار خدماتنا؟",
      whyChooseSubtitle: "جرب الرعاية الصحية المصممة من حولك",
      generalConsultation: "الاستشارة العامة",
      generalConsultationDesc: "فحوصات صحية شاملة واستشارات مع أطباء ممارسين عامين ذوي خبرة.",
      cardiology: "أمراض القلب",
      cardiologyDesc: "رعاية قلبية متخصصة بما في ذلك التشخيص والعلاج وخدمات إعادة التأهيل.",
      neurology: "طب الأعصاب",
      neurologyDesc: "رعاية متخصصة للحالات العصبية مع قدرات تشخيصية متقدمة.",
      pediatrics: "طب الأطفال",
      pediatricsDesc: "خدمات رعاية صحية مخصصة للرضع والأطفال والمراهقين.",
      orthopedics: "جراحة العظام",
      orthopedicsDesc: "علاج لحالات العظام والمفاصل والعضلات مع خيارات جراحية وغير جراحية.",
      pharmacy: "خدمات الصيدلة",
      pharmacyDesc: "صيدلية في الموقع مع مجموعة واسعة من الأدوية والمنتجات الصحية.",
      easyBooking: "حجز سهل",
      easyBookingDesc: "جدولة المواعيد عبر الإنترنت على مدار الساعة طوال أيام الأسبوع مع التأكيد الفوري.",
      flexibleHours: "ساعات مرنة",
      flexibleHoursDesc: "ساعات ممتدة وتوفر في عطلة نهاية الأسبوع لراحتك.",
      insuranceAccepted: "قبول التأمين",
      insuranceAcceptedDesc: "نعمل مع معظم شركات التأمين الكبرى.",
      digitalRecords: "السجلات الرقمية",
      digitalRecordsDesc: "وصول آمن إلى سجلاتك الطبية في أي وقت وفي أي مكان.",
      feature1: "الفحص البدني",
      feature2: "الفحص الصحي",
      feature3: "الرعاية الوقائية",
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
    footer: {
      brandDescription: "نقدم خدمات رعاية صحية عالمية المستوى مع التركيز على راحة المريض والعلاج الطبي المتقدم.",
      quickLinks: "روابط سريعة",
      servicesTitle: "الخدمات",
      contactUs: "اتصل بنا",
      allRightsReserved: "جميع الحقوق محفوظة.",
      readyToBook: "هل أنت مستعد لحجز موعدك؟",
      readyToBookDesc: "احجز الآن مع أطبائنا الخبراء.",
      bookNow: "احجز الآن",
    },
    cta: {
      readyToBook: "هل أنت مستعد لحجز موعدك؟",
      joinThousands: "انضم إلى آلاف المرضى الراضين الذين يثقون في MediFlow لتلبية احتياجاتهم الصحية.",
      getStartedNow: "ابدأ الآن",
      whyChoose: "لماذا تختار MediFlow؟",
      experienceHealthcare: "جرب الرعاية الصحية التي تضعك في المقام الأول...",
    },
    userDashboard: {
      overview: "نظرة عامة",
      appointments: "المواعيد",
      settings: "الإعدادات",
      profile: "الملف الشخصي",
      security: "الأمان",
      loadingDashboard: "جاري تحميل لوحة التحكم...",
      firstName: "الاسم الأول",
      lastName: "اسم العائلة",
      updateProfile: "تحديث الملف الشخصي",
      currentPassword: "كلمة المرور الحالية",
      newPassword: "كلمة المرور الجديدة",
      confirmPassword: "تأكيد كلمة المرور",
      changePassword: "تغيير كلمة المرور",
      profileUpdated: "تم تحديث الملف الشخصي بنجاح!",
      passwordUpdated: "تم تغيير كلمة المرور بنجاح!",
      noUpcoming: "لا توجد مواعيد قادمة.",
      appointmentWith: "موعد مع",
      specialty: "التخصص",
      time: "الوقت",
      cancel: "إلغاء",
      cancelSuccess: "تم إلغاء الموعد",
      cancelError: "فشل إلغاء الموعد",
    },
    adminDashboard: {
      dashboardOverview: "نظرة عامة على لوحة التحكم",
      totalAppointments: "إجمالي المواعيد",
      pendingActions: "الإجراءات المعلقة",
      completedToday: "المكتمل اليوم",
      todayRevenue: "إيرادات اليوم",
      appointmentsManagement: "إدارة المواعيد",
      doctorsManagement: "إدارة الأطباء",
      patientsManagement: "إدارة المرضى",
      addNewDoctor: "+ إضافة طبيب جديد",
      avatar: "الصورة",
      name: "الاسم",
      specialty: "التخصص",
      experience: "الخبرة",
      price: "السعر",
      status: "الحالة",
      actions: "الإجراءات",
      active: "نشط",
      inactive: "غير نشط",
      viewProfile: "عرض الملف الشخصي",
      edit: "تعديل",
      delete: "حذف",
      confirm: "تأكيد",
      complete: "إكمال",
      patientName: "اسم المريض",
      email: "البريد الإلكتروني",
      totalAppointmentsCount: "إجمالي المواعيد",
      viewHistory: "عرض السجل",
      contactPatient: "الاتصال بالمريض",
      appointmentDetails: "تفاصيل الموعد",
      notes: "ملاحظات",
      noNotes: "لا توجد ملاحظات",
      filterByPatient: "تصفية حسب المريض",
      filterByStatus: "تصفية حسب الحالة",
      filterBySpecialty: "تصفية حسب التخصص",
      searchPatient: "ابحث عن اسم المريض...",
      allStatuses: "جميع الحالات",
      allSpecialties: "جميع التخصصات",
      clearFilters: "مسح الفلاتر",
      viewProfileBtn: "عرض الملف الشخصي",
      permanentDelete: "حذف دائم",
      confirmDelete: "تأكيد الحذف الدائم",
      deleteWarning: "لا يمكن التراجع عن هذا الإجراء. سيتم حذف الموعد بشكل دائم من قاعدة البيانات.",
      areYouSure: "هل أنت متأكد من أنك تريد المتابعة؟",
      confirmDeleteBtn: "نعم، احذف بشكل دائم",
      deleteSuccess: "تم حذف الموعد بنجاح",
      deleteError: "فشل حذف الموعد",
      messagesTitle: "إدارة الرسائل",
      messagesComingSoonTitle: "ميزة الرسائل قريبًا",
      messagesComingSoonDesc: "سيتم تفعيل هذه الميزة قريبًا جدًا. ستتمكن من إدارة جميع رسائل المرضى والاستفسارات من هنا.",
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

/**
 * BRANCH TRANSLATION MAPPER
 * Maps medical branches from English to TR and AR
 */
export const branchTranslations: Record<string, Record<string, string>> = {
  TR: {
    "Cardiology": "Kardiyoloji",
    "Neurology": "Nöroloji",
    "Orthopedics": "Ortopedi",
    "Pediatrics": "Pediatri",
    "Dermatology": "Dermatoloji",
    "Psychiatry": "Psikiyatri",
    "Dental": "Diş Hekimliği",
    "Dentist": "Diş Hekimi",
    "Plastic Surgery": "Plastik Cerrahi",
    "Ophthalmology": "Göz Hastalıkları",
    "ENT": "Kulak Burun Boğaz",
    "Gynecology": "Kadın Hastalıkları",
    "Urology": "Üroloji",
    "General Practice": "Genel Pratisyen",
    "Internal Medicine": "İç Hastalıkları",
    "Surgery": "Genel Cerrahi",
  },
  EN: {
    // Already in English, return as is
    "Cardiology": "Cardiology",
    "Neurology": "Neurology",
    "Orthopedics": "Orthopedics",
    "Pediatrics": "Pediatrics",
    "Dermatology": "Dermatology",
    "Psychiatry": "Psychiatry",
    "Dental": "Dental",
    "Dentist": "Dentist",
    "Plastic Surgery": "Plastic Surgery",
    "Ophthalmology": "Ophthalmology",
    "ENT": "ENT",
    "Gynecology": "Gynecology",
    "Urology": "Urology",
    "General Practice": "General Practice",
    "Internal Medicine": "Internal Medicine",
    "Surgery": "Surgery",
  },
  AR: {
    "Cardiology": "أمراض القلب",
    "Neurology": "طب الأعصاب",
    "Orthopedics": "جراحة العظام",
    "Pediatrics": "طب الأطفال",
    "Dermatology": "الأمراض الجلدية",
    "Psychiatry": "الطب النفسي",
    "Dental": "طب الأسنان",
    "Dentist": "طبيب أسنان",
    "Plastic Surgery": "الجراحة التجميلية",
    "Ophthalmology": "طب العيون",
    "ENT": "الأنف والأذن والحنجرة",
    "Gynecology": "أمراض النساء",
    "Urology": "المسالك البولية",
    "General Practice": "طبيب عام",
    "Internal Medicine": "الطب الباطني",
    "Surgery": "الجراحة العامة",
  },
};

/**
 * Translate a medical branch to the specified language
 * @param branch - The branch name in English
 * @param lang - Target language (TR, EN, AR)
 * @returns Translated branch name or original if not found
 */
export const translateBranch = (branch: string, lang: string): string => {
  const langUpper = lang.toUpperCase();
  return branchTranslations[langUpper]?.[branch] || branch;
};
