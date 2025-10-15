// src/App.jsx

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ---------------------------------------
// NOTE ABOUT ASSETS / BUGFIX
// ---------------------------------------
// Using plain relative paths so it works with GitHub Pages (no import.meta.env).
// Put images/logos/pdf in the /public folder, e.g. public/profile.jpg, cricket.jpg, karting.jpg

const SafeImg = ({ src, alt, className = "" }) => {
  const [ok, setOk] = useState(true);
  return ok ? (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setOk(false)}
      loading="lazy"
    />
  ) : (
    <div
      className={`flex items-center justify-center bg-black/10 text-white/70 text-xs ${className}`}
      role="img"
      aria-label={alt}
    >
      image not found
    </div>
  );
};

// ---------------------------
// Profile Data
// ---------------------------
const profile = {
  name: "Chidhanandh Krishnaraj",
  title: "Software Developer",
  location: "Stuttgart Region, Germany",
  summary: [
    <p key="line1"><strong>My passion lives at the crossroads of technology, safety, creativity, and innovation.</strong></p>,
    <p key="line2">Software Developer with 10+ years building reliable, high‑performance software. I design and implement clean, testable code across embedded, backend, and frontend systems, with a strong focus on data flows, interfaces, and performance.</p>,
    <p key="line3">Hands‑on with modern tooling: version control and CI/CD (Git, GitHub Actions), build systems (CMake), containers (Docker), and automated testing. Comfortable in C/C++ and Python, with production experience using React for simple UI layers when needed.</p>,
    <p key="line4">I collaborate closely with cross‑functional teams to translate requirements into robust architectures, iterate quickly, and ship. I care about readability, diagnostics/observability, and long‑term maintainability — building systems that are fast, safe, and a joy to work on.</p>,
  ],
  photo: "profile.jpg",
  siteUrl: "https://chidhukrishraj.github.io/my-portfolio",
  contacts: [
    { label: "LinkedIn", value: "linkedin.com/in/chidhanandh-krishnaraj-172b9688", href: "https://www.linkedin.com/in/chidhanandh-krishnaraj-172b9688/" },
    { label: "GitHub", value: "github.com/chidhanandh", href: "https://github.com/chidhanandh" },
  ],
};

// ---------------------------
// Experience Data
// ---------------------------
const experiences = [
  {
    id: "bosch-adas",
    company: "Robert Bosch GmbH",
    logos: ["bosch_logo.png"],
    client: "OEMs: Daimler, Audi, Porsche, CARIAD",
    location: "Leonberg, Germany",
    role: "Product Owner / System Engineer – ADAS (Automated Parking)",
    period: "09/2019 — Present",
    summary:
      "Planning, tracking and release of system functions; worked on E/E architecture analysis with SW architects; coordinated SIL/HIL/vehicle validation and aligned results with OEMs.",
    projectsCount: 6,
    responsibilities: [
      "E/E architecture & interface analysis with software architects",
      "Define V&V strategies; coordinate SIL/HIL/vehicle validation",
      "Analyze test data and derive corrective measures",
      "Customer communication and release alignment with OEMs",
      "Risk analysis & escalation handling to protect cost/schedule",
    ],
    achievements: [
      "Resolved a critical escalation via risk analysis and coordination, preventing a significant project delay and cost impact.",
    ],
    images: [
      { src: "adas1.jpg", alt: "ADAS system block diagram" },
      { src: "adas2.jpg", alt: "Automated parking in action" },
    ],
  },
  {
    id: "bosch-technical-lead-brakes",
    company: "Robert Bosch GmbH (via Technology & Strategy)",
    logos: ["bosch_logo.png", "ts_logo.png"], // both Bosch and T&S
    location: "Abstatt, Germany",
    role: "Technical Lead – Brake Systems (Vehicle Motion)",
    period: "06/2017 — 08/2019",
    summary:
      "Built and led a functional team; supported project planning & releases; drove best practices and quality improvements.",
    projectsCount: 5,
    responsibilities: [
      "Led a team of 12 engineers; coaching, onboarding, mentoring",
      "Supported project planning, effort estimation, resource allocation",
      "Drove design/code reviews and development best practices",
      "Aligned stakeholders to meet quality and schedule",
    ],
    achievements: [
      "Built a fully functional team that successfully secured multiple customer projects, expanding the department's portfolio.",
      "Delivered multiple internal trainings & workshops for Bosch colleagues on system integration and testing methodologies.",
    ],
    images: [
      { src: "technical_lead.jpg", alt: "Team collaboration on vehicle motion control" },
    ],
  },
  {
    id: "bosch-function-owner-brakes",
    company: "Robert Bosch GmbH (via Technology & Strategy)",
    logos: ["bosch_logo.png", "ts_logo.png"],
    location: "Abstatt, Germany",
    role: "Function Owner – Brake Systems",
    period: "06/2015 — 05/2017",
    summary:
      "Owned functions (e.g., Degradation State Mgmt, Bus Signal Monitoring), traceability in DOORS, and integration & V&V.",
    projectsCount: 4,
    responsibilities: [
      "Requirements management & traceability in DOORS",
      "Integration & verification (SIL/HIL/vehicle)",
      "Customer alignment on interfaces and releases (JLR, Volvo, Geely)",
    ],
    achievements: [
      "Presented Bosch functional safety concept in a Volvo workshop, clarifying critical points and defining a joint approach that met safety standards.",
    ],
    images: [
      { src: "function_owner.jpg", alt: "Brake system diagram with functional blocks" },
    ],
  },
  {
    id: "bosch-software-brakes",
    company: "Robert Bosch GmbH (via Technology & Strategy)",
    logos: ["bosch_logo.png", "ts_logo.png"],
    location: "Abstatt, Germany",
    role: "Software/Systems Engineer – Brake Systems",
    period: "03/2013 — 05/2015",
    summary:
      "Developed C/C++ brake functions, created & executed tests (module/HIL/vehicle), and collaborated with system & HW teams.",
    projectsCount: 3,
    responsibilities: [
      "Function development in C/C++ for safety-critical braking",
      "Module, HIL and vehicle testing",
      "Function specification with system & hardware teams",
    ],
    achievements: [
      "Delivered a critical brake function that successfully entered series production across multiple OEMs, impacting millions of vehicles.",
    ],
    images: [
      { src: "software_engineer.jpg", alt: "Code snippet for brake control system" },
    ],
  },
];

// ---------------------------
// Tools, Skills, Values, Certifications, Hobbies
// ---------------------------
const tools = [
  { id: "doors", name: "DOORS 9.7", what: "Requirements management & traceability" },
  { id: "jira", name: "Jira / ALM", what: "Backlog, sprint planning, and test management" },
  { id: "enterprise-architect", name: "Enterprise Architect (UML)", what: "System modeling, architecture & interface specification" },
  { id: "matlab-simulink", name: "MATLAB/Simulink", what: "Model-based design & prototyping" },
  { id: "carmaker-labcar", name: "CarMaker / Labcar", what: "SIL/HIL validation and vehicle testing" },
  { id: "canoe-canalyzer", name: "CANoe / CANalyzer", what: "Bus analysis and diagnostics" },
  { id: "git-cmake-docker", name: "Git / CMake / Docker", what: "Build, versioning, and environments" },
];

const skills = {
  system: [
    "E/E Architecture",
    "System Integration",
    "Interface Definition",
    "Requirements Management (DOORS, Docs-as-Code)",
    "Functional & Safety Concepts",
  ],
  verification: [
    "Verification & Validation: SIL/HIL (CarMaker, Labcar)",
    "Field Testing & Data Analysis",
    "GoogleTest, RQM, Code Reviews",
  ],
  technical: [
    "C/C++",
    "Python",
    "MATLAB",
    "UML (Enterprise Architect, PlantUML)",
    "Simulink",
    "ASCET",
  ],
  tools: [
    "Build & CI/CD: Git (GitHub), CMake, Conan, Docker",
    "Project & Requirement Management: Jira, ALM, MS Project, Quality Center",
  ],
  standards: ["ISO 26262 (Functional Safety)", "Automotive SPICE", "AUTOSAR"],
  buses: ["CAN", "LIN", "FlexRay", "Ethernet", "PCIe (basics)"],
  measurement: [
    "Lauterbach Debugger",
    "Vector Diagnostic Tools (CANoe, CANalyzer)",
    "Data Loggers",
  ],
  management: [
    "Project Planning & Tracking",
    "Milestone & Release Coordination",
    "Stakeholder Communication",
    "Agile/Scrum (PSPO I Certified)",
    "Backlog & Risk Management",
  ],
  leadership: [
    "Team Building",
    "Mentoring",
    "Onboarding",
    "Cross-functional Coordination",
    "Technical Trainings",
  ],
  soft: ["Teamwork", "Leadership", "Communication", "Flexibility", "Decision Making"],
  languages: [
    "German: daily work at B2 level",
    "English: fluent",
    "Kannada: native",
    "Hindi: fluent",
  ],
};

const certifications = [
  {
    title: "IBM AI Product Manager",
    issuer: "Coursera",
    issued: "20.08.2025",
    url: "https://www.coursera.org/account/accomplishments/professional-cert/certificate/GC0OUIKU774S", // paste direct cert URL her
  },
  {
    title: "Professional Scrum Product Owner I",
    issuer: "Scrum.org",
    issued: "28.03.2025",
    url: "https://www.scrum.org/certificates/1203557", // paste direct cert URL here
  },
  {
    title: "AI for Project Managers and Scrum Masters",
    issuer: "Coursera",
    issued: "30.03.2025",
    url: "https://www.coursera.org/account/accomplishments/verify/XEPP5WAKQ1EH", // paste direct cert URL here
  },
  {
    title: "Introduction to Software Product Management",
    issuer: "Coursera",
    issued: "29.03.2025",
    url: "https://www.coursera.org/account/accomplishments/verify/VKV1YIV0BOYZ", // paste direct cert URL here
  },
  {
    title: "Self Driving Car Engineer",
    issuer: "Udacity",
    issued: "24.04.2019",
    url: "https://www.udacity.com/certificate/JKPPUEPE", // paste direct cert URL here
  },
  {
    title: "Modelling and Simulation using MATLAB®",
    issuer: "iversity",
    issued: "30.08.2014",
    url: "https://iversity.org/verify/KtLtEL", // paste direct cert URL here
  },
  // add more...
];


const values = [
  {
    id: "safety-performance",
    title: "Safety & Performance",
    text: "Focus on safe, robust functions that perform under extreme conditions, ensuring reliability and compliance.",
  },
  {
    id: "clarity-ownership",
    title: "Clarity & Ownership",
    text: "Champion clear specifications, complete traceability, and end-to-end ownership from requirements definition to final release.",
  },
  {
    id: "continuous-learning",
    title: "Continuous Learning",
    text: "Actively expanding knowledge in E/E topology, advanced diagnostics, and cutting-edge validation practices to stay ahead.",
  },
  {
    id: "team-first",
    title: "Team First",
    text: "Committed to mentoring, conducting practical workshops, and fostering high-performing teams that consistently deliver innovative solutions.",
  },
];

// NEW hobbies (old ones removed) with images
const hobbies = [
  {
    id: "cricket",
    title: "Cricket",
    text: "Playing cricket regularly, enjoying both batting and bowling, and following competitive matches to learn strategy and teamwork.",
    image: "cricket.jpg", // put this in public/
  },
  {
    id: "go-karting",
    title: "Go-Karting",
    text: "Passionate about motorsports—go-karting gives me the thrill of racing while improving focus, reaction time, and control.",
    image: "karting.jpg", // put this in public/
  },
];

// ---------------------------
// Tiny Router
// ---------------------------
const useHashRoute = () => {
  const [hash, setHash] = useState(() => (typeof window !== "undefined" ? window.location.hash : "#"));

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.hash === "") setHash("#");
    const onHashChange = () => setHash(window.location.hash || "#");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
  return hash;
};

// Animation variants
const pageVariants = {
  initial: { opacity: 0, y: 8 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -8 },
};

// ---------------------------
// UI Primitives (theme)
// ---------------------------
const Container = ({ children }) => (
  <div className="w-full max-w-6xl mx-auto px-4 md:px-6">{children}</div>
);

const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl border border-[#223d74] bg-[#0e2247]/70 p-6 shadow-sm text-white ${className}`}>
    {children}
  </div>
);

const SectionTitle = ({ title, className = "" }) => (
  <h2 className={`text-xl font-semibold mb-4 mt-8 first:mt-0 text-white/95 ${className}`}>{title}</h2>
);

// ---------------------------
// Header Section (hero)
// ---------------------------
const HeaderSection = () => (
  <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between gap-8 py-6">
    {/* Left: text */}
    <div className="flex-1 min-w-0 flex flex-col justify-center text-center lg:text-left">
      <h1 className="text-4xl font-bold text-white mb-2">{profile.name}</h1>
      <p className="text-2xl text-white/90 mb-1">{profile.title}</p>
      <p className="text-base text-white/70 mb-4">{profile.location}</p>
      <div className="mt-3 text-white/90 space-y-3 max-w-3xl mx-auto lg:mx-0 text-justify leading-8">
        {profile.summary}
      </div>
    </div>

    {/* Right: larger profile photo */}
    <div className="shrink-0 flex justify-center lg:justify-end items-center">
      <SafeImg
        src={profile.photo}
        alt={`${profile.name} profile photo`}
        className="w-40 h-40 sm:w-56 sm:h-56 lg:w-72 lg:h-72 object-cover rounded-full border-4 border-[#2b4a86] shadow-xl"
      />
    </div>
  </div>
);

// ---------------------------
// Pages
// ---------------------------
const HomePage = () => (
  <Container>
    {/* Hero */}
    <Card className="bg-[#0e2247]/60 border border-[#223d74]">
      <HeaderSection />

      {/* Contacts */}
      <div className="mt-4 flex flex-wrap gap-3">
        {profile.contacts.map((c, i) => (
          <a
            key={i}
            href={c.href}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center rounded-full border border-[#2b4a86] px-4 py-2 text-sm text-white/90 hover:bg-[#132a55] transition-colors"
          >
            {c.label}
          </a>
        ))}
      </div>
    </Card>

    {/* Experience Section */}
    <Card className="bg-[#0e2247]/60 border border-[#223d74] mt-6 p-8">
      <SectionTitle title="Work Experience" className="!mt-0 text-2xl" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {experiences.map((exp) => (
          <a
            key={exp.id}
            href={`#experience/${exp.id}`}
            className="flex items-center gap-4 rounded-xl border border-[#223d74] bg-[#0e2247]/40 p-4 hover:bg-[#132a55] transition-colors"
          >
            {/* Logos block – supports single or multiple logos */}
            <div className="flex items-center gap-2 shrink-0">
              {(exp.logos ?? []).map((logo, i) => (
                <SafeImg
                  key={i}
                  src={logo}
                  alt={`${exp.company} logo ${i + 1}`}
                  className="w-10 h-10 rounded-md object-contain bg-white p-1"
                />
              ))}
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-white text-lg leading-snug break-words">{exp.role}</h3>
              <p className="text-sm text-white/85 leading-snug break-words">{exp.company}</p>
              <p className="text-xs text-white/60 leading-snug">{exp.period} • Projects: {exp.projectsCount}</p>
            </div>
          </a>
        ))}
      </div>
    </Card>
  </Container>
);

const ExperienceDetailPage = ({ experienceId }) => {
  const exp = useMemo(() => experiences.find((e) => e.id === experienceId), [experienceId]);
  if (!exp)
    return (
      <Container>
        <Card>
          <p className="py-10 text-white/80 text-center">
            Experience not found. <a className="underline" href="#">Go back home</a>.
          </p>
        </Card>
      </Container>
    );
  return (
    <Container>
      <Card className="space-y-4">
        <h1 className="text-2xl font-bold text-white">{exp.role}</h1>
        <div className="flex items-center gap-3 text-sm text-white/80">
          {(exp.logos ?? []).map((logo, i) => (
            <SafeImg
              key={i}
              src={logo}
              alt={`${exp.company} logo ${i + 1}`}
              className="w-8 h-8 rounded-md object-contain bg-white p-1 shrink-0"
            />
          ))}
          <span className="break-words">{exp.company} — {exp.location}</span>
        </div>
        <p className="text-xs text-white/60 leading-snug">{exp.period} • Projects: {exp.projectsCount}</p>
        <p className="mt-3 text-white/90 leading-relaxed">{exp.summary}</p>

        <SectionTitle title="Responsibilities" className="!mt-4" />
        <ul className="list-disc ml-6 space-y-1 text-white/90">
          {exp.responsibilities.map((r, i) => (
            <li key={i}>{r}</li>
          ))}
        </ul>

        <SectionTitle title="Achievements" className="!mt-4" />
        <ul className="list-disc ml-6 space-y-1 text-white/90">
          {exp.achievements.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ul>

        {exp.images?.length > 0 && (
          <>
            <SectionTitle title="Gallery" className="!mt-4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {exp.images.map((img, i) => (
                <SafeImg
                  key={i}
                  src={img.src}
                  alt={img.alt || `Image related to ${exp.company} experience`}
                  className="rounded-lg border border-[#223d74] object-cover w-full h-40"
                />
              ))}
            </div>
          </>
        )}
        <div className="mt-6">
          <a href="#experience" className="text-sm text-white/70 hover:underline">
            ← Back to Experience List
          </a>
        </div>
      </Card>
    </Container>
  );
};

const SkillsPage = () => {
  const skillGroups = [
    { title: "System & Architecture", items: skills.system },
    { title: "Verification & Validation", items: skills.verification },
    { title: "Technical", items: skills.technical },
    { title: "Tools & Platforms", items: skills.tools },
    { title: "Standards & Processes", items: skills.standards },
    { title: "Bus Protocols", items: skills.buses },
    { title: "Measurement & Diagnostics", items: skills.measurement },
    { title: "Project & Product Management", items: skills.management },
    { title: "Leadership", items: skills.leadership },
    { title: "Soft Skills", items: skills.soft },
    { title: "Languages", items: skills.languages },
  ];

  return (
    <Container>
      <SectionTitle title="Skills & Tools" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skillGroups.map((group) => (
          <Card key={group.title}>
            <h4 className="font-semibold text-white mb-2">{group.title}</h4>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="inline-block bg-[#0e2247]/50 border border-[#223d74] text-white/90 px-3 py-1 rounded-full text-xs"
                >
                  {item}
                </span>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Container>
  );
};

// ---------------------------
// Certifications Page
// ---------------------------
const CertificationsPage = () => (
  <Container>
    <SectionTitle title="Certifications" />
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {certifications.map((c, i) => (
        <Card key={i}>
          <h4 className="font-semibold text-white">{c.title}</h4>
          <p className="text-sm text-white/80 mt-1">
            {c.issuer}{c.issued ? ` • Issued: ${c.issued}` : ""}
          </p>
          <div className="mt-3">
            <a
              href={c.url}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center rounded-full border border-[#2b4a86] px-3 py-1 text-xs text-white/90 hover:bg-[#132a55] transition-colors"
            >
              View on LinkedIn / Provider
            </a>
          </div>
        </Card>
      ))}
    </div>
  </Container>
);

const ValuesPage = () => (
  <Container>
    <SectionTitle title="Personal Values & Goals" />
    <div className="grid md:grid-cols-2 gap-4">
      {values.map((v) => (
        <Card key={v.id}>
          <h4 className="font-semibold text-white">{v.title}</h4>
          <p className="text-sm text-white/90 mt-2 leading-relaxed">{v.text}</p>
        </Card>
      ))}
    </div>
  </Container>
);

const HobbiesPage = () => (
  <Container>
    <SectionTitle title="Hobbies & Free Time" />
    <div className="grid md:grid-cols-2 gap-4">
      {hobbies.map((h) => (
        <Card key={h.id}>
          <div className="flex items-center gap-4">
            <SafeImg
              src={h.image}
              alt={`${h.title} image`}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg object-cover border border-[#223d74] shrink-0"
            />
            <div className="min-w-0">
              <h4 className="font-semibold text-white">{h.title}</h4>
              <p className="text-sm text-white/90 mt-2 leading-relaxed">{h.text}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  </Container>
);

const ContactPage = () => (
  <Container>
    <SectionTitle title="Contact Me" />
    <Card>
      <p className="text-white/90 leading-relaxed">
        I’m currently available for challenging roles in automotive system/software engineering and technical leadership, especially those focusing on E/E architecture, ADAS, and functional safety. Feel free to reach out to discuss potential opportunities or collaborations.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <a
          href="mailto:chidhukrishraj@gmail.com"
          className="inline-flex items-center rounded-full border border-[#2b4a86] px-4 py-2 text-sm text-white/90 hover:bg-[#132a55] transition-colors"
        >
          Email Me
        </a>
        <a
          href="cv.pdf"
          className="inline-flex items-center rounded-full border border-[#2b4a86] px-4 py-2 text-sm text-white/90 hover:bg-[#132a55] transition-colors"
          download="Chidhanandh_Krishnaraj_CV.pdf"
          target="_blank"
          rel="noreferrer noopener"
        >
          Download CV (PDF)
        </a>
      </div>
    </Card>
  </Container>
);

// ---------------------------
// App Shell with Equal-Spaced Tabs
// ---------------------------
const useActive = (hash, h) => {
  const normalizedHash = hash === "" ? "#" : hash;
  return normalizedHash === h ? "bg-[#132a55]" : "";
};

const App = () => {
  const hash = useHashRoute();

  const page = useMemo(() => {
    if (hash === "#" || hash === "") return <HomePage />;
    if (hash.startsWith("#experience/")) {
      const experienceId = hash.replace("#experience/", "");
      return <ExperienceDetailPage experienceId={experienceId} />;
    }
    if (hash === "#skills") return <SkillsPage />;
    if (hash === "#certs") return <CertificationsPage />;
    if (hash === "#values") return <ValuesPage />;
    if (hash === "#hobbies") return <HobbiesPage />;
    if (hash === "#contact") return <ContactPage />;
    return <HomePage />;
  }, [hash]);

  return (
    <div className="min-h-screen flex flex-col bg-[#34495E] text-white overflow-x-hidden">
      {/* Header brand bar */}
      <header className="border-b border-[#1d3567] bg-[#34495E]">
        <Container>
          <div className="h-16 flex items-center justify-between">
            <div className="font-semibold tracking-wide text-lg">
              <a href="#" className="hover:text-white/80 transition-colors">
                {profile.name.split(" ")[0]} <span className="hidden sm:inline">Krishnaraj</span>
              </a>
            </div>
          </div>
        </Container>

        {/* Equal-spaced tabs */}
        <nav className="bg-[#0c1f40] border-t border-[#34495E]">
          <Container>
            <div className="grid grid-cols-4 sm:grid-cols-6 text-sm text-white/90">
              <a className={`text-center py-3 hover:bg-[#132a55] transition-colors ${useActive(hash, "#")}`} href="#">Home</a>
              <a className={`text-center py-3 hover:bg-[#132a55] transition-colors ${useActive(hash, "#skills")}`} href="#skills">Skills</a>
              <a className={`text-center py-3 hover:bg-[#132a55] transition-colors ${useActive(hash, "#certs")}`} href="#certs">Certifications</a>
              <a className={`text-center py-3 hover:bg-[#132a55] transition-colors ${useActive(hash, "#values")}`} href="#values">Values</a>
              <a className={`text-center py-3 hover:bg-[#132a55] transition-colors ${useActive(hash, "#hobbies")}`} href="#hobbies">Hobbies</a>
              <a className={`text-center py-3 hover:bg-[#132a55] transition-colors ${useActive(hash, "#contact")}`} href="#contact">Contact</a>
            </div>
          </Container>
        </nav>
      </header>

      {/* Page content */}
      <AnimatePresence mode="wait">
        <motion.main
          key={hash}
          variants={pageVariants}
          initial="initial"
          animate="in"
          exit="out"
          transition={{ duration: 0.2 }}
          className="flex-1 py-6"
        >
          {page}
        </motion.main>
      </AnimatePresence>

      {/* Footer */}
      <footer className="border-t border-[#1d3567] bg-[#34495E]">
        <Container>
          <div className="py-6 text-center text-xs text-white/70">
            © {new Date().getFullYear()} {profile.name}. All rights reserved.
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default App;
