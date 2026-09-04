const resources = {
  // =========================================================
  // 🇫🇷 FRANÇAIS
  // =========================================================
  fr: {
    translation: {
      // -------------------------
      // NAVBAR
      // -------------------------
      nav: {
          home: "Accueil",
          jobs: "Offres",
          applications: "Mes candidatures",
          myJobs: "Mes offres",
          candidateApplications: "Candidatures",
          dashboard: "Tableau de bord",
          chat: "Messages",
          login: "Connexion",
          register: "Inscription",
          logout: "Déconnexion",
          favorites: "Favoris",
          profile: "Profil",
},

      // -------------------------
      // JOBS
      // -------------------------
      jobs: {
        badge: "TROUVEZ VOTRE PROCHAINE OPPORTUNITÉ",

        title: "Offres d'emploi",
        subtitle: "Trouvez l'opportunité qui vous correspond",

        searchTitle: "Rechercher une offre",
        searchSubtitle:
          "Utilisez les filtres pour trouver l'emploi idéal",

        search: "Rechercher",
        searchPlaceholder: "Poste, compétence ou mot-clé",

        location: "Localisation",
        locationPlaceholder: "Ville ou région",

        filters: {
          contract: "Type de contrat",
          experience: "Niveau d'expérience",
          workMode: "Mode de travail",
        },

        filter: "Filtrer",
        reset: "Réinitialiser",

        clearFilters: "Effacer les filtres",
        all: "Toutes",

        contracts: {
          cdi: "CDI",
          cdd: "CDD",
          internship: "Stage",
          freelance: "Freelance",
          partTime: "Temps partiel",
        },

        experience: {
          entry: "Débutant",
          junior: "Junior",
          mid: "Intermédiaire",
          senior: "Senior",
        },

        remote: "Télétravail",
        onsite: "Sur site",
        hybrid: "Hybride",

        salary: "Salaire",

        company: "Entreprise",

        posted: "Publié le",

        results: "Résultats",
        offers: "offres",
        total: "Total des offres",

        viewDetails: "Voir les détails",

        noJobs: "Aucune offre trouvée",
        noJobsDescription:
          "Aucune offre ne correspond à vos critères de recherche.",

        noResults: "Aucune offre trouvée",
        noResultsDescription:
          "Aucune offre ne correspond à vos critères de recherche.",

        previous: "Précédent",
        next: "Suivant",

        loading: "Chargement des offres...",
        error: "Impossible de charger les offres.",
        retry: "Réessayer",

        locationNotSpecified: "Localisation non spécifiée",

        fullTime: "Temps plein",
        permanent: "CDI",
        fixedTerm: "CDD",
      },

      // -------------------------
      // APPLICATIONS
      // -------------------------
      applications: {
        title: "Mes candidatures",

        subtitle:
          "Suivez l'évolution de toutes vos candidatures",

        loading: "Chargement de vos candidatures...",

        error:
          "Impossible de charger vos candidatures.",

        retry: "Réessayer",

        empty: "Aucune candidature",

        emptyDescription:
          "Vous n'avez encore envoyé aucune candidature.",

        browseJobs: "Parcourir les offres",

        appliedOn: "Candidature envoyée le",

        status: "Statut",

        viewJob: "Voir l'offre",

        pending: "En attente",

        reviewing: "En cours d'examen",

        shortlisted: "Présélectionné",

        interview: "Entretien",

        accepted: "Accepté",

        rejected: "Refusé",

        withdrawn: "Retiré",

        PENDING: "En attente",

        REVIEWING: "En cours d'examen",

        SHORTLISTED: "Présélectionné",

        INTERVIEW: "Entretien",

        ACCEPTED: "Accepté",

        REJECTED: "Refusé",

        WITHDRAWN: "Retiré",
      },

      // -------------------------
      // FAVORITES
      // -------------------------
      favorites: {
        title: "Mes favoris",

        loading: "Chargement de vos favoris...",

        error:
          "Impossible de charger vos favoris.",

        empty: "Aucune offre favorite",

        emptyDescription:
          "Ajoutez des offres à vos favoris pour les retrouver facilement ici.",

        browseJobs: "Parcourir les offres",

        offer: "offre",

        company: "Entreprise",

        location: "Localisation",

        locationNotSpecified: "Non spécifiée",

        remove: "Retirer",

        removeError:
          "Impossible de retirer cette offre des favoris.",

        viewOffer: "Voir l'offre",

        job: "Emploi",
      },

      // -------------------------
      // JOB DETAILS
      // -------------------------
      jobDetails: {
        backToJobs: "Retour aux offres",

        notFoundTitle: "Offre introuvable",

        notFound:
          "Cette offre n'existe pas ou a été supprimée.",

        description: "Description du poste",

        noDescription:
          "Aucune description disponible.",

        skills: "Compétences recherchées",

        skillsSubtitle:
          "Les compétences nécessaires pour ce poste",

        information: "Informations",

        location: "Localisation",

        contract: "Type de contrat",

        workMode: "Mode de travail",

        experience: "Expérience",

        company: "Entreprise",

        moreJobs:
          "Plus d'offres de cette entreprise",

        interested:
          "Cette offre vous intéresse ?",

        applyTitle: "Postulez maintenant",

        applySubtitle:
          "Envoyez votre candidature et donnez un nouvel élan à votre carrière.",

        deadline: "Date limite",

        apply: "Postuler",

        sending: "Envoi...",

        alreadyApplied:
          "Vous avez déjà postulé",

        applySuccess:
          "Votre candidature a été envoyée avec succès.",

        applyError:
          "Impossible d'envoyer votre candidature.",

        favoriteError:
          "Impossible de modifier les favoris.",

        addFavorite:
          "Ajouter aux favoris",

        removeFavorite:
          "Retirer des favoris",

        loginToApply:
          "Connectez-vous pour postuler",

        loginHint:
          "Vous devez être connecté en tant que candidat pour postuler.",
      },

      // -------------------------
      // HOME
      // -------------------------
      home: {
        badge:
          "TROUVEZ VOTRE PROCHAINE OPPORTUNITÉ",

        heroTitle:
          "Trouvez le job qui correspond à",

        heroHighlight:
          "votre avenir",

        heroSubtitle:
          "Découvrez des opportunités professionnelles, postulez facilement et suivez toutes vos candidatures au même endroit.",

        viewJobs:
          "Voir les offres",

        createAccount:
          "Créer un compte",

        featuredOffer:
          "OFFRE À LA UNE",

        salary:
          "Salaire",

        open:
          "Ouvert",

        applicationSent:
          "Candidature envoyée",

        applicationStatus:
          "En cours d'examen",

        searchPlaceholder:
          "Poste, compétence ou mot-clé",

        locationPlaceholder:
          "Ville ou localisation",

        search:
          "Rechercher",

        jobsAvailable:
          "Offres disponibles",

        companies:
          "Entreprises",

        candidates:
          "Candidats",

        applications:
          "Candidatures",

        simpleProcess:
          "PROCESSUS SIMPLE",

        howTitle:
          "Trouvez votre emploi en quelques étapes",

        howSubtitle:
          "JobConnect simplifie votre recherche d'emploi et vous permet de gérer vos candidatures facilement.",

        step1Title:
          "Créez votre profil",

        step1Description:
          "Créez votre profil professionnel et mettez en valeur vos compétences.",

        step2Title:
          "Trouvez une offre",

        step2Description:
          "Recherchez les opportunités qui correspondent à votre profil.",

        step3Title:
          "Postulez",

        step3Description:
          "Envoyez votre candidature rapidement et simplement.",

        step4Title:
          "Suivez votre candidature",

        step4Description:
          "Suivez l'évolution de vos candidatures depuis votre espace personnel.",

        ctaTitle:
          "Prêt à trouver votre prochaine opportunité ?",

        ctaSubtitle:
          "Rejoignez JobConnect et donnez un nouvel élan à votre carrière.",
      },
    },
  },

  // =========================================================
  // 🇬🇧 ENGLISH
  // =========================================================
  en: {
    translation: {
      // -------------------------
      // NAVBAR
      // -------------------------
      nav: {
  home: "Home",
  jobs: "Jobs",
  applications: "My applications",
  myJobs: "My jobs",
  candidateApplications: "Applications",
  dashboard: "Dashboard",
  chat: "Messages",
  login: "Login",
  register: "Register",
  logout: "Logout",
  favorites: "Favorites",
  profile: "Profile",
},

      // -------------------------
      // JOBS
      // -------------------------
      jobs: {
        badge: "FIND YOUR NEXT OPPORTUNITY",

        title: "Job Offers",
        subtitle:
          "Find the opportunity that matches you",

        searchTitle: "Search for a job",
        searchSubtitle:
          "Use the filters to find the perfect job",

        search: "Search",
        searchPlaceholder:
          "Job title, skill, or keyword",

        location: "Location",
        locationPlaceholder:
          "City or region",

        filters: {
          contract: "Contract type",
          experience: "Experience level",
          workMode: "Work mode",
        },

        filter: "Filter",
        reset: "Reset",

        clearFilters: "Clear filters",
        all: "All",

        contracts: {
          cdi: "Permanent",
          cdd: "Fixed-term",
          internship: "Internship",
          freelance: "Freelance",
          partTime: "Part-time",
        },

        experience: {
          entry: "Entry level",
          junior: "Junior",
          mid: "Mid-level",
          senior: "Senior",
        },

        remote: "Remote",
        onsite: "On-site",
        hybrid: "Hybrid",

        salary: "Salary",

        company: "Company",

        posted: "Posted on",

        results: "Results",
        offers: "jobs",
        total: "Total offers",

        viewDetails: "View details",

        noJobs: "No jobs found",
        noJobsDescription:
          "No jobs match your search criteria.",

        noResults: "No jobs found",
        noResultsDescription:
          "No jobs match your search criteria.",

        previous: "Previous",
        next: "Next",

        loading: "Loading jobs...",
        error: "Unable to load jobs.",
        retry: "Retry",

        locationNotSpecified:
          "Location not specified",

        fullTime: "Full-time",
        permanent: "Permanent",
        fixedTerm: "Fixed-term",
      },

      // -------------------------
      // APPLICATIONS
      // -------------------------
      applications: {
        title: "My Applications",

        subtitle:
          "Track the progress of all your applications",

        loading:
          "Loading your applications...",

        error:
          "Unable to load your applications.",

        retry: "Retry",

        empty: "No applications",

        emptyDescription:
          "You haven't submitted any applications yet.",

        browseJobs:
          "Browse jobs",

        appliedOn: "Applied on",

        status: "Status",

        viewJob: "View job",

        pending: "Pending",

        reviewing: "Under review",

        shortlisted: "Shortlisted",

        interview: "Interview",

        accepted: "Accepted",

        rejected: "Rejected",

        withdrawn: "Withdrawn",

        PENDING: "Pending",

        REVIEWING: "Under review",

        SHORTLISTED: "Shortlisted",

        INTERVIEW: "Interview",

        ACCEPTED: "Accepted",

        REJECTED: "Rejected",

        WITHDRAWN: "Withdrawn",
      },

      // -------------------------
      // FAVORITES
      // -------------------------
      favorites: {
        title: "My Favorites",

        loading:
          "Loading your favorites...",

        error:
          "Unable to load your favorites.",

        empty:
          "No favorite jobs",

        emptyDescription:
          "Add jobs to your favorites to easily find them here.",

        browseJobs:
          "Browse jobs",

        offer: "job",

        company: "Company",

        location: "Location",

        locationNotSpecified:
          "Not specified",

        remove: "Remove",

        removeError:
          "Unable to remove this job from favorites.",

        viewOffer:
          "View job",

        job: "Job",
      },

      // -------------------------
      // JOB DETAILS
      // -------------------------
      jobDetails: {
        backToJobs:
          "Back to jobs",

        notFoundTitle:
          "Job not found",

        notFound:
          "This job does not exist or has been removed.",

        description:
          "Job description",

        noDescription:
          "No description available.",

        skills:
          "Required skills",

        skillsSubtitle:
          "Skills required for this position",

        information:
          "Information",

        location:
          "Location",

        contract:
          "Contract type",

        workMode:
          "Work mode",

        experience:
          "Experience",

        company:
          "Company",

        moreJobs:
          "More jobs from this company",

        interested:
          "Interested in this job?",

        applyTitle:
          "Apply now",

        applySubtitle:
          "Submit your application and take the next step in your career.",

        deadline:
          "Application deadline",

        apply:
          "Apply",

        sending:
          "Sending...",

        alreadyApplied:
          "You already applied",

        applySuccess:
          "Your application has been submitted successfully.",

        applyError:
          "Unable to submit your application.",

        favoriteError:
          "Unable to update favorites.",

        addFavorite:
          "Add to favorites",

        removeFavorite:
          "Remove from favorites",

        loginToApply:
          "Login to apply",

        loginHint:
          "You must be logged in as a candidate to apply.",
      },

      // -------------------------
      // HOME
      // -------------------------
      home: {
        badge:
          "FIND YOUR NEXT OPPORTUNITY",

        heroTitle:
          "Find the job that matches",

        heroHighlight:
          "your future",

        heroSubtitle:
          "Discover professional opportunities, apply easily, and track all your applications in one place.",

        viewJobs:
          "View job offers",

        createAccount:
          "Create an account",

        featuredOffer:
          "FEATURED OFFER",

        salary:
          "Salary",

        open:
          "Open",

        applicationSent:
          "Application sent",

        applicationStatus:
          "Under review",

        searchPlaceholder:
          "Job title, skill, or keyword",

        locationPlaceholder:
          "City or location",

        search:
          "Search",

        jobsAvailable:
          "Available jobs",

        companies:
          "Companies",

        candidates:
          "Candidates",

        applications:
          "Applications",

        simpleProcess:
          "SIMPLE PROCESS",

        howTitle:
          "Find your job in a few steps",

        howSubtitle:
          "JobConnect simplifies your job search and allows you to manage your applications easily.",

        step1Title:
          "Create your profile",

        step1Description:
          "Create your professional profile and highlight your skills.",

        step2Title:
          "Find a job",

        step2Description:
          "Search for opportunities that match your profile.",

        step3Title:
          "Apply",

        step3Description:
          "Submit your application quickly and easily.",

        step4Title:
          "Track your application",

        step4Description:
          "Track your applications from your personal space.",

        ctaTitle:
          "Ready to find your next opportunity?",

        ctaSubtitle:
          "Join JobConnect and take the next step in your career.",
      },
    },
  },

  // =========================================================
  // 🇲🇦 ARABE
  // =========================================================
  ar: {
    translation: {
      // -------------------------
      // NAVBAR
      // -------------------------
      nav: {
  home: "الرئيسية",
  jobs: "الوظائف",
  applications: "طلباتي",
  myJobs: "عروضي",
  candidateApplications: "طلبات التوظيف",
  dashboard: "لوحة التحكم",
  chat: "الرسائل",
  login: "تسجيل الدخول",
  register: "إنشاء حساب",
  logout: "تسجيل الخروج",
  favorites: "المفضلة",
  profile: "الملف الشخصي",
},

      // -------------------------
      // JOBS
      // -------------------------
      jobs: {
        badge: "اعثر على فرصتك التالية",

        title: "عروض العمل",

        subtitle:
          "اعثر على الفرصة التي تناسبك",

        searchTitle:
          "البحث عن وظيفة",

        searchSubtitle:
          "استخدم الفلاتر للعثور على الوظيفة المناسبة",

        search: "بحث",

        searchPlaceholder:
          "المسمى الوظيفي، المهارة أو الكلمة المفتاحية",

        location: "الموقع",

        locationPlaceholder:
          "المدينة أو المنطقة",

        filters: {
          contract: "نوع العقد",
          experience: "مستوى الخبرة",
          workMode: "طريقة العمل",
        },

        filter: "تصفية",

        reset:
          "إعادة تعيين",

        clearFilters:
          "مسح الفلاتر",

        all: "الكل",

        contracts: {
          cdi: "عقد دائم",
          cdd: "عقد محدد المدة",
          internship: "تدريب",
          freelance: "عمل حر",
          partTime: "دوام جزئي",
        },

        experience: {
          entry: "مبتدئ",
          junior: "مستوى مبتدئ",
          mid: "مستوى متوسط",
          senior: "مستوى متقدم",
        },

        remote: "عن بعد",

        onsite:
          "في مقر الشركة",

        hybrid:
          "مختلط",

        salary:
          "الراتب",

        company:
          "الشركة",

        posted:
          "نشر في",

        results:
          "النتائج",

        offers:
          "وظائف",

        total:
          "إجمالي عدد الوظائف",

        viewDetails:
          "عرض التفاصيل",

        noJobs:
          "لم يتم العثور على وظائف",

        noJobsDescription:
          "لا توجد عروض عمل تطابق معايير البحث الخاصة بك.",

        noResults:
          "لم يتم العثور على وظائف",

        noResultsDescription:
          "لا توجد وظائف تطابق معايير البحث الخاصة بك.",

        previous:
          "السابق",

        next:
          "التالي",

        loading:
          "جاري تحميل الوظائف...",

        error:
          "تعذر تحميل الوظائف.",

        retry:
          "إعادة المحاولة",

        locationNotSpecified:
          "الموقع غير محدد",

        fullTime:
          "دوام كامل",

        permanent:
          "عقد دائم",

        fixedTerm:
          "عقد محدد المدة",
      },

      // -------------------------
      // APPLICATIONS
      // -------------------------
      applications: {
        title:
          "طلباتي",

        subtitle:
          "تتبع تقدم جميع طلبات التوظيف الخاصة بك",

        loading:
          "جاري تحميل طلباتك...",

        error:
          "تعذر تحميل طلباتك.",

        retry:
          "إعادة المحاولة",

        empty:
          "لا توجد طلبات توظيف",

        emptyDescription:
          "لم تقم بإرسال أي طلب توظيف حتى الآن.",

        browseJobs:
          "تصفح الوظائف",

        appliedOn:
          "تم التقديم في",

        status:
          "الحالة",

        viewJob:
          "عرض الوظيفة",

        pending:
          "في الانتظار",

        reviewing:
          "قيد المراجعة",

        shortlisted:
          "تم اختيارك مبدئياً",

        interview:
          "مقابلة",

        accepted:
          "تم القبول",

        rejected:
          "مرفوض",

        withdrawn:
          "تم السحب",

        PENDING:
          "في الانتظار",

        REVIEWING:
          "قيد المراجعة",

        SHORTLISTED:
          "تم اختيارك مبدئياً",

        INTERVIEW:
          "مقابلة",

        ACCEPTED:
          "تم القبول",

        REJECTED:
          "مرفوض",

        WITHDRAWN:
          "تم السحب",
      },

      // -------------------------
      // FAVORITES
      // -------------------------
      favorites: {
        title:
          "المفضلة",

        loading:
          "جاري تحميل المفضلة...",

        error:
          "تعذر تحميل المفضلة.",

        empty:
          "لا توجد وظائف مفضلة",

        emptyDescription:
          "أضف الوظائف إلى المفضلة للعثور عليها بسهولة هنا.",

        browseJobs:
          "تصفح الوظائف",

        offer:
          "وظيفة",

        company:
          "الشركة",

        location:
          "الموقع",

        locationNotSpecified:
          "غير محدد",

        remove:
          "إزالة",

        removeError:
          "تعذر إزالة هذه الوظيفة من المفضلة.",

        viewOffer:
          "عرض الوظيفة",

        job:
          "وظيفة",
      },

      // -------------------------
      // JOB DETAILS
      // -------------------------
      jobDetails: {
        backToJobs:
          "العودة إلى الوظائف",

        notFoundTitle:
          "الوظيفة غير موجودة",

        notFound:
          "هذه الوظيفة غير موجودة أو تم حذفها.",

        description:
          "وصف الوظيفة",

        noDescription:
          "لا يوجد وصف متاح.",

        skills:
          "المهارات المطلوبة",

        skillsSubtitle:
          "المهارات المطلوبة لهذا المنصب",

        information:
          "المعلومات",

        location:
          "الموقع",

        contract:
          "نوع العقد",

        workMode:
          "طريقة العمل",

        experience:
          "الخبرة",

        company:
          "الشركة",

        moreJobs:
          "المزيد من الوظائف من هذه الشركة",

        interested:
          "هل أنت مهتم بهذه الوظيفة؟",

        applyTitle:
          "قدم طلبك الآن",

        applySubtitle:
          "أرسل طلب التوظيف الخاص بك وابدأ الخطوة التالية في مسيرتك المهنية.",

        deadline:
          "آخر موعد للتقديم",

        apply:
          "التقديم",

        sending:
          "جاري الإرسال...",

        alreadyApplied:
          "لقد تقدمت لهذه الوظيفة بالفعل",

        applySuccess:
          "تم إرسال طلب التوظيف بنجاح.",

        applyError:
          "تعذر إرسال طلب التوظيف.",

        favoriteError:
          "تعذر تحديث المفضلة.",

        addFavorite:
          "إضافة إلى المفضلة",

        removeFavorite:
          "إزالة من المفضلة",

        loginToApply:
          "سجل الدخول للتقديم",

        loginHint:
          "يجب تسجيل الدخول كمرشح للتقديم على الوظيفة.",
      },

      // -------------------------
      // HOME
      // -------------------------
      home: {
        badge:
          "اعثر على فرصتك التالية",

        heroTitle:
          "ابحث عن الوظيفة التي تناسب",

        heroHighlight:
          "مستقبلك المهني",

        heroSubtitle:
          "اكتشف فرص العمل المتاحة، قدم طلبك بسهولة، وتتبع جميع طلباتك في مكان واحد.",

        viewJobs:
          "عرض الوظائف المتاحة",

        createAccount:
          "إنشاء حساب",

        featuredOffer:
          "عرض مميز",

        salary:
          "الراتب",

        open:
          "متاح",

        applicationSent:
          "تم إرسال الطلب",

        applicationStatus:
          "قيد المراجعة",

        searchPlaceholder:
          "المسمى الوظيفي، المهارة أو الكلمة المفتاحية",

        locationPlaceholder:
          "المدينة أو الموقع",

        search:
          "بحث",

        jobsAvailable:
          "الوظائف المتاحة",

        companies:
          "الشركات",

        candidates:
          "الباحثين عن عمل",

        applications:
          "طلبات التوظيف",

        simpleProcess:
          "عملية بسيطة",

        howTitle:
          "اعثر على وظيفتك في خطوات بسيطة",

        howSubtitle:
          "JobConnect يبسط عملية البحث عن وظيفة ويتيح لك إدارة طلباتك بسهولة.",

        step1Title:
          "أنشئ ملفك الشخصي",

        step1Description:
          "أنشئ ملفك الشخصي المهني وسلط الضوء على مهاراتك.",

        step2Title:
          "ابحث عن وظيفة",

        step2Description:
          "ابحث عن الفرص التي تناسب ملفك الشخصي.",

        step3Title:
          "قدم طلبك",

        step3Description:
          "أرسل طلب التوظيف بسرعة وسهولة.",

        step4Title:
          "تابع طلبك",

        step4Description:
          "تابع حالة طلباتك من خلال حسابك الشخصي.",

        ctaTitle:
          "جاهز للعثور على فرصتك التالية؟",

        ctaSubtitle:
          "انضم إلى JobConnect وابدأ الخطوة التالية في مسيرتك المهنية.",
      },
    },
  },
};

export default resources;