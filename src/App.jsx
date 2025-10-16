// src/App.jsx

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ---------------------------------------
// NOTE ABOUT ASSETS / BUGFIX
// ---------------------------------------
// Using plain relative paths so it works with GitHub Pages (no import.meta.env).
// Put images/logos/pdf in the /public folder.

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
    <p key="line2">Software Developer with 10+ years in ADAS, safety-critical software, and control systems. Specialized in function development, algorithm design, and embedded C/C++ with strong experience in testing and validation.</p>,
    <p key="line3">Hands-on with model-based development (MATLAB/Simulink, ASCET), build systems (CMake), CI/CD, and unit testing (GoogleTest). Familiar with system design, Kalman filtering, and automotive standards (ISO 26262, ASPICE).</p>,
    <p key="line4">I collaborate closely with OEMs and cross-functional teams to design, integrate, and validate software functions that meet strict safety and performance requirements.</p>,
  ],
  photo: "profile.jpg",
  siteUrl: "https://chidhukrishraj.github.io/my-portfolio-sw",
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
    location: "Leonberg, Germany",
    role: "Software Developer – ADAS Automated Parking",
    period: "09/2019 — Present",
    summary:
      "Developing automated parking functions using MATLAB/Simulink (Stateflow) and embedded C/C++ on QNX ECUs; builds with CMake; unit tests with GoogleTest; experience with Kalman filters.",
    projectsCount: 6,
    responsibilities: [
      "Function development: automated parking functions in MATLAB/Simulink and C/C++",
      "Testing: SIL/HIL (CarMaker) and vehicle testing, results analysis and alignment with system & hardware teams",
      "Process & safety: work in ASPICE/V-model; functions in ASIL-B context per ISO 26262",
      "Architecture support: interface design, UML models in Enterprise Architect (reading, small updates)",
      "Requirements & tracking: maintained OEM requirements in DOORS; tracked status in Jira",
      "Customer alignment: coordinated with OEM teams (Daimler, Audi, JLR, Porsche)",
    ],
    achievements: [
      "Introduced lean concept for target hardware testing according to ISO 26262 (ASIL B), aligned with project team and customer.",
    ],
    images: [
      { src: "adas_parking.jpg", alt: "Automated parking function development" },
    ],
  },
  {
    id: "ts-tech-lead",
    company: "Technology & Strategy GmbH",
    logos: ["ts_logo.png", "bosch_logo.png"],
    location: "Abstatt, Germany",
    role: "Technical Lead",
    period: "09/2017 — 08/2019",
    summary:
      "Led a 12-person system/software team delivering vehicle dynamics functions, acting as main technical contact with customers.",
    projectsCount: 3,
    responsibilities: [
      "Led a 12-member team from concept to delivery of vehicle dynamics functions",
      "Acted as primary technical interface with customers, translating requirements into specifications",
      "Supported business development through technical contributions",
      "Trained team members on automotive tools and braking concepts; fostered knowledge sharing",
    ],
    achievements: [
      "Directed root cause analysis during a critical phase and coordinated corrective measures, ensuring on-time release.",
    ],
    images: [
      { src: "tech_lead.jpg", alt: "Team leadership and training" },
    ],
  },
  {
    id: "ts-vmc",
    company: "Technology & Strategy GmbH (for Robert Bosch GmbH)",
    logos: ["ts_logo.png", "bosch_logo.png"],
    location: "Abstatt, Germany",
    role: "Function Developer – Vehicle Motion Controller (VMC)",
    period: "06/2018 — 07/2019",
    summary:
      "Designed and implemented vehicle state estimation algorithms in C++ for Jaguar Land Rover within the Vehicle Motion Controller (VMC).",
    projectsCount: 2,
    responsibilities: [
      "Developed estimation algorithms in C++ with ASCET support, defined I/O and interfaces",
      "Set design and V&V strategy (incl. SIL) to ensure stability and data integrity (IMU, wheel-speed, yaw-rate)",
      "Delivered end-to-end: concept, design, implementation, integration, testing",
    ],
    achievements: [
      "Successfully migrated ASCET function into C++ implementation.",
    ],
    images: [
      { src: "vmc.jpg", alt: "Vehicle Motion Controller development" },
    ],
  },
  {
    id: "ts-brake",
    company: "Technology & Strategy GmbH (for Robert Bosch GmbH)",
    logos: ["ts_logo.png", "bosch_logo.png"],
    location: "Abstatt, Germany",
    role: "Function Developer – Active Safety Brake Systems",
    period: "09/2015 — 05/2018",
    summary:
      "Developed longitudinal and hold functions, as well as Sensor Signal Processing for Active Safety Brake Systems (Volvo, Geely, JLR).",
    projectsCount: 3,
    responsibilities: [
      "Implemented functions using ASCET for embedded ECUs",
      "Defined requirements, states, interfaces, and safety behavior (ISO 26262 up to ASIL D)",
      "Executed V&V with HIL and vehicle testing to ensure timing and reliability",
      "Acted as technical contact for system/software integration, change management, and planning",
    ],
    achievements: [
      "Presented Bosch functional safety concept in a Volvo workshop, clarified critical points, and defined joint approach with customer.",
    ],
    images: [
      { src: "brake_systems.jpg", alt: "Active safety brake systems development" },
    ],
  },
];

// ---------------------------
// Software-Focused Skills
// ---------------------------
const skills = {
  programming: ["C/C++", "Python", "MATLAB"],
  modelBased: ["Simulink", "ASCET"],
  testing: ["GoogleTest", "SIL/HIL (CarMaker, Labcar)", "Vehicle Testing"],
  buildTools: ["CMake", "Git", "CI/CD Pipelines"],
  standards: ["ISO 26262", "Automotive SPICE"],
  concepts: ["Algorithms", "Kalman Filter", "Control Systems"],
  soft: ["Collaboration", "Communication", "Problem Solving"],
};

// (Keep your earlier certifications/values if you had them)
const certifications = [
  { title: "IBM AI Product Manager", issuer: "Coursera", issued: "20.08.2025", url: "https://www.coursera.org/account/accomplishments/professional-cert/certificate/GC0OUIKU774S" },
  { title: "Professional Scrum Product Owner I", issuer: "Scrum.org", issued: "28.03.2025", url: "https://www.scrum.org/certificates/1203557" },
  { title: "Self Driving Car Engineer", issuer: "Udacity", issued: "24.04.2019", url: "https://www.udacity.com/certificate/JKPPUEPE" },
];

const values = [
  { id: "safety-performance", title: "Safety & Performance", text: "Focus on safe, robust functions that perform under extreme conditions, ensuring reliability and compliance." },
  { id: "clarity-ownership", title: "Clarity & Ownership", text: "Champion clear specifications, complete traceability, and end-to-end ownership from requirements definition to final release." },
  { id: "continuous-learning", title: "Continuous Learning", text: "Actively expanding knowledge in E/E topology, advanced diagnostics, and cutting-edge validation practices to stay ahead." },
  { id: "team-first", title: "Team First", text: "Committed to mentoring, conducting practical workshops, and fostering high-performing teams that consistently deliver innovative solutions." },
];

const hobbies = [
  { id: "cricket", title: "Cricket", text: "Playing cricket regularly, enjoying both batting and bowling, and following competitive matches to learn strategy and teamwork.", image: "cricket.jpg" },
  { id: "go-karting", title: "Go-Karting", text: "Passionate about motorsports—go-karting gives me the thrill of racing while improving focus, reaction time, and control.", image: "karting.jpg" },
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
      <h1 className="text-4xl font-bold text-white mb-2 break-words">{profile.name}</h1>
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
          <span className="break-words">
            {exp.company} — {exp.location}
          </span>
        </div>
        <p className="text-xs text-white/60">{exp.period} • Projects: {exp.projectsCount}</p>
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
  const groups = [
    { title: "Programming", items: skills.programming },
    { title: "Model-Based", items: skills.modelBased },
    { title: "Testing", items: skills.testing },
    { title: "Build & CI", items: skills.buildTools },
    { title: "Standards", items: skills.standards },
    { title: "Concepts", items: skills.concepts },
    { title: "Soft Skills", items: skills.soft },
  ];

  return (
    <Container>
      <SectionTitle title="Skills" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {groups.map((g) => (
          <Card key={g.title}>
            <h4 className="font-semibold text-white mb-2">{g.title}</h4>
            <div className="flex flex-wrap gap-2">
              {g.items.map((item) => (
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
              View Certificate
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
        I’m currently available for challenging roles in software development and embedded systems. Feel free to reach out to discuss potential opportunities or collaborations.
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
