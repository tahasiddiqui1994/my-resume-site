// Resume data — single source of truth
window.RESUME = {
  name: "Muhammad Taha Siddiqui",
  headline: "Lead Technical Consultant & Full-Stack Developer",
  tagline: "Architecting NetSuite solutions and full-stack platforms for enterprise clients across America, Europe and the Middle East.",
  location: "Karachi, Pakistan",
  email: "taha_siddiqui1994@yahoo.com",
  phone: "+92 303 253 5638",
  whatsapp: "923032535638", // wa.me format
  linkedin: "https://www.linkedin.com/in/itahasiddiqui",
  linkedinHandle: "/in/itahasiddiqui",
  resumeUrl: "assets/resume.pdf",
  yearsExperience: 7,

  about: [
    "I'm a Lead Technical Consultant with 7+ years of experience translating complex business requirements into scalable software — specializing in NetSuite (SuiteScript 1.0 / 2.0 / 2.1, SuiteCloud, SuiteAnalytics, SuiteTalk) and full-stack development across the JavaScript and PHP ecosystems.",
    "I lead solution design and code reviews for enterprise clients across America, Europe and the Middle East, architecting custom integrations and overseeing end-to-end development across project management, logistics, and e-commerce platforms.",
    "I care about operational efficiency, clean automation, and mentoring the people I work with."
  ],

  experience: [
    {
      role: "Lead Technical Consultant",
      company: "Beyond Cloud Consulting",
      location: "Remote",
      period: "Feb 2026 – Present",
      current: true,
      highlights: [
        "Leading NetSuite technical consulting engagements — solution design, integration architecture, and code reviews for enterprise clients.",
        "Continuing to specialize in SuiteScript 2.1, SuiteCloud, and custom integrations with third-party platforms."
      ]
    },
    {
      role: "Lead Technical Consultant / Senior Software Engineer",
      company: "Folio3 LLC",
      location: "Karachi, Pakistan",
      period: "Oct 2019 – Feb 2026",
      highlights: [
        "Lead solution design and code reviews for NetSuite customizations, translating SOW requirements into scalable technical implementations for enterprise clients across America, Europe and the Middle East.",
        "Architected end-to-end integrations between NetSuite and third-party platforms including Asana, Calendly, logistics partners, and online shopping apps using custom integration frameworks.",
        "Developed advanced single-page web applications and custom reporting interfaces using Vue.js — optimized for large datasets with computed properties and real-time data rendering.",
        "Designed business process automation workflows using SuiteAnalytics and SuiteScript 2.1, improving reporting accuracy and operational visibility.",
        "Mentored junior developers and maintained code quality standards across projects."
      ]
    },
    {
      role: "Software Engineer",
      company: "HMI Ventures",
      location: "Karachi, Pakistan",
      period: "Jan 2019 – Oct 2019",
      highlights: [
        "Backend developer (Laravel) on HomeChef — a live homemade food delivery platform — building and refining RESTful API endpoints to support evolving product requirements."
      ]
    },
    {
      role: "Software Engineer",
      company: "Sudoware",
      location: "Karachi, Pakistan",
      period: "Jul 2018 – Oct 2018",
      highlights: [
        "Developed new features and enhanced an existing live CRM product using Laravel and Node.js, improving system functionality and user experience."
      ]
    }
  ],

  projects: [
    {
      title: "NetSuite × Asana Integration Module",
      region: "America",
      summary: "Custom producer-consumer integration architecture syncing data bidirectionally between Asana and NetSuite.",
      details: [
        "Automated employee record sync, project creation, and time-log entries — ensuring accurate, real-time time tracking within NetSuite.",
        "Improved operational efficiency and cross-system visibility between project management and financial reporting workflows.",
        "Producer-consumer architecture handles backpressure cleanly under spikes in event volume."
      ],
      stack: ["SuiteScript 2.1", "Node.js", "Asana API", "SuiteTalk"]
    },
    {
      title: "Advanced Timesheet Management System",
      region: "Middle East",
      summary: "Dynamic timesheet platform with multi-level custom reporting for employee work hours and job cards.",
      details: [
        "Vue.js front-end optimized for large datasets with computed properties and real-time updates.",
        "Custom report generation covering job-specific totals, employee summaries, and global metrics.",
        "Robust Node.js back-end ensuring data integrity and seamless timesheet processing across departments."
      ],
      stack: ["Vue.js", "Node.js", "MongoDB", "Express"]
    },
    {
      title: "Real-Estate ERP Customizations",
      region: "Middle East",
      summary: "Developed and upgraded NetSuite environments for several Middle East real-estate clients — Revenue Recognition, Payment Cancellation, Petty Cash, Loan Management, Parking Allocation, Inventory Aging.",
      details: [
        "Revenue Recognition workflows aligned to tenant lifecycle events.",
        "Customer/Tenant payment cancellation with audit trail and reversal logic.",
        "Petty Cash, Loan Management, and Parking Allocation modules.",
        "Inventory aging report and assorted vendor/customer reporting features."
      ],
      stack: ["SuiteScript 2.0", "SuiteCloud", "SuiteAnalytics"]
    },
    {
      title: "HomeChef — Food Delivery Backend",
      region: "Pakistan",
      summary: "Laravel REST API for a live homemade-food delivery product, plus rider/vendor live-location monitoring.",
      details: [
        "Built and modified Laravel API endpoints to support evolving product needs.",
        "Helped develop a separate application to monitor rider and vendor live locations."
      ],
      stack: ["Laravel", "PHP", "MySQL"]
    }
  ],

  skillGroups: [
    {
      name: "NetSuite",
      skills: ["SuiteScript 1.0", "SuiteScript 2.0", "SuiteScript 2.1", "SuiteCloud", "SuiteAnalytics", "SuiteTalk", "SuiteFlow"]
    },
    {
      name: "Full-Stack",
      skills: ["MongoDB", "Express.js", "Vue.js", "Node.js", "REST APIs", "MVC Architecture"]
    },
    {
      name: "Backend",
      skills: ["Laravel (PHP)", "Node.js", "MySQL", "Redis"]
    },
    {
      name: "Integrations",
      skills: ["Asana API", "Calendly API", "Logistics APIs", "e-Commerce APIs"]
    },
    {
      name: "Practice",
      skills: ["Solution Design", "Code Review", "Agile / Scrum", "Git", "Technical Documentation", "Mentoring"]
    }
  ],

  certifications: [
    "NetSuite SuiteFoundations Certification",
    "NetSuite Application Developer Certification",
    "NetSuite Foundation Associate",
    "Node.js — MVC, REST APIs & Application Architecture"
  ],

  achievements: [
    { title: "Divisional Star Performer of the Year", year: "2021", org: "Folio3" },
    { title: "Winner — GIKI Coding Competition", year: "", org: "GIK Institute" },
    { title: "2nd Place — Product Development Hackathon", year: "", org: "" },
    { title: "3rd Place — Debugging Competition", year: "", org: "IBA Sukkur" }
  ],

  education: {
    degree: "BS — Computer Science",
    school: "DHA Suffa University",
    location: "Karachi, Pakistan",
    period: "2015 – 2019"
  },

  languages: [
    { name: "Urdu", level: "Native" },
    { name: "English", level: "Expert" }
  ]
};
