import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ---------------------------
// Profile Data (EDIT ME)
// ---------------------------
const profile = {
  name: "Chidhanandh Krishnaraj",
  title: "System-/Software Engineer (Automotive)",
  location: "Stuttgart Region, Germany",
  summary:
    "System engineer with 10+ years in ADAS & Brake Systems. Passionate about E/E architecture, system integration, and building the world’s safest vehicles.",
  photo: "/profile.jpg", // put in /public
  siteUrl: "https://your-domain.example", /* <-- set this after deploy */
  contacts: [
    { label: "Email", value: "chidhukrishraj@gmail.com", href: "mailto:chidhukrishraj@gmail.com" },
    { label: "LinkedIn", value: "linkedin.com/in/chidhanandh-krishnaraj-172b9688", href: "https://www.linkedin.com/in/chidhanandh-krishnaraj-172b9688/" },
    { label: "GitHub", value: "github.com/your-handle", href: "https://github.com/your-handle" },
  ],
};
// ---------------------------
// Experience Data (EDIT ME)
// ---------------------------
const experiences = [
  {
    slug: "bosch-adas",
    company: "Robert Bosch GmbH",
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
      "Resolved a critical escalation via risk analysis and coordination; prevented major cost impact",
    ],
    images: ["/adas1.jpg", "/adas2.jpg"],
  },
  {
    slug: "bosch-technical-lead-brakes",
    company: "Robert Bosch GmbH (via Technology & Strategy)",
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
      "Built a fully functional team that secured multiple customer projects",
      "Delivered multiple trainings & workshops for Bosch colleagues",
    ],
    images: ["/technical_lead.jpg"],
  },
  {
    slug: "bosch-function-owner-brakes",
    company: "Robert Bosch GmbH (via Technology & Strategy)",
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
      "Presented Bosch functional safety concept in a Volvo workshop; clarified critical points and defined a joint approach",
    ],
    images: ["/function_owner.jpg"],
  },
  {
    slug: "bosch-software-brakes",
    company: "Robert Bosch GmbH (via Technology & Strategy)",
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
      "Delivered a brake function that entered series production across multiple OEMs",
    ],
    images: ["/software_engineer.jpg"],
  },
];

// ---------------------------
// Tools, Skills, Values, Hobbies
// ---------------------------
const tools = [
  { name: "DOORS 9.7", what: "Requirements management & traceability" },
  { name: "Jira / ALM", what: "Backlog, sprint planning, and test management" },
  { name: "Enterprise Architect (UML)", what: "System modeling, architecture & interface specification" },
  { name: "MATLAB/Simulink", what: "Model-based design & prototyping" },
  { name: "CarMaker / Labcar", what: "SIL/HIL validation and vehicle testing" },
  { name: "CANoe / CANalyzer", what: "Bus analysis and diagnostics" },
  { name: "Git / CMake / Docker", what: "Build, versioning, and environments" },
];

const skills = {
  key: ["E/E Architecture", "System Integration", "Verification & Validation", "Functional Safety (ISO 26262)", "ASPICE"],
  technical: ["C/C++", "Python", "MATLAB", "UML", "Simulink", "ASCET"],
  buses: ["CAN", "LIN", "FlexRay", "Automotive Ethernet", "PCIe (basics)"],
};

const values = [
  { title: "Safety & Performance", text: "Focus on safe, robust functions that perform under extreme conditions." },
  { title: "Clarity & Ownership", text: "Clear specs, traceability, and ownership from requirements to release." },
  { title: "Continuous Learning", text: "Expanding into E/E topology, diagnostics, and validation practices." },
  { title: "Team First", text: "Mentoring, workshops, and building teams that deliver." },
];

const hobbies = [
  { title: "Sim Racing", text: "Telemetry analysis, strategy, and dynamics — for fun and learning." },
  { title: "Photography", text: "Cars, cityscapes, and people — telling stories with light." },
  { title: "Cycling", text: "Endurance, focus, and getting outdoors." },
];

// ---------------------------
// Tiny Router
// ---------------------------
const useHashRoute = () => {
  const [hash, setHash] = useState(() => window.location.hash || "#");
  useEffect(() => {
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
// UI Primitives (dark-blue)
// ---------------------------
const Container = ({ children }) => (
  <div className="max-w-6xl mx-auto px-4">{children}</div>
);

// Card styled for dark-blue theme
const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl border border-[#223d74] bg-[#0e2247]/70 p-6 shadow-sm text-white ${className}`}>
    {children}
  </div>
);

const SectionTitle = ({ title }) => (
  <h2 className="text-xl font-semibold mb-4 text-white/95">{title}</h2>
);

// ---------------------------
// Pages
// ---------------------------
const HomePage = () => (
  <Container>
    {/* Header hero: left text, right photo */}
    <div className="grid lg:grid-cols-[1.3fr,0.7fr] gap-6 py-6 items-center">
      {/* Left: name, title, location, summary, contacts */}
      <Card className="bg-[#0e2247]/60 border border-[#223d74]">
        <h1 className="text-3xl font-bold text-white">{profile.name}</h1>
        <p className="text-lg text-white/90">{profile.title}</p>
        <p className="text-sm text-white/70">{profile.location}</p>
        <p className="mt-3 text-white/90 leading-relaxed">{profile.summary}</p>

        {/* Contacts */}
        <div className="mt-4 flex flex-wrap gap-3">
          {profile.contacts.map((c, i) => (
            <a
              key={i}
              href={c.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full border border-[#2b4a86] px-4 py-2 text-sm text-white/90 hover:bg-[#132a55]"
            >
              {c.label}
            </a>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-4 flex flex-wrap gap-2">
          <a
            href="#experience"
            className="inline-flex items-center rounded-full border border-[#2b4a86] px-4 py-2 text-sm text-white/90 hover:bg-[#132a55]"
          >
            View Experience
          </a>
          <a
            href="#contact"
            className="inline-flex items-center rounded-full border border-[#2b4a86] px-4 py-2 text-sm text-white/90 hover:bg-[#132a55]"
          >
            Contact Me
          </a>
        </div>
      </Card>

      {/* Right: smaller round photo, right-aligned */}
      <Card className="flex justify-end bg-[#0e2247]/60 border border-[#223d74]">
        <img
          src={profile.photo}
          alt={`${profile.name} profile`}
          className="w-28 h-28 lg:w-32 lg:h-32 object-cover rounded-full"
        />
      </Card>
    </div>

    {/* Experience list under the header section */}
    <Card className="bg-[#0e2247]/60 border border-[#223d74]">
      <SectionTitle title="Work Experience" />
      <div className="space-y-3">
        {experiences.map((exp) => (
          <a
            key={exp.slug}
            href={`#experience/${exp.slug}`}
            className="block rounded-lg border border-[#223d74] bg-[#0e2247]/40 p-3 hover:bg-[#132a55] transition"
          >
            <h3 className="font-semibold text-white">{exp.role}</h3>
            <p className="text-sm text-white/80">{exp.company}</p>
            <p className="text-xs text-white/60">
              {exp.period} • Projects: {exp.projectsCount}
            </p>
          </a>
        ))}
      </div>
    </Card>
  </Container>
);



const ExperienceDetailPage = ({ slug }) => {
  const exp = useMemo(() => experiences.find((e) => `#experience/${e.slug}` === slug), [slug]);
  if (!exp) return <Container><p className="py-10 text-white/70">Not found</p></Container>;
  return (
    <Container>
      <Card>
        <h1 className="text-2xl font-bold text-white">{exp.role}</h1>
        <p className="text-sm text-white/80">{exp.company} — {exp.location}</p>
        <p className="text-xs text-white/60">{exp.period} • Projects: {exp.projectsCount}</p>
        <p className="mt-3 text-white/90">{exp.summary}</p>

        <SectionTitle title="Responsibilities" />
        <ul className="list-disc ml-6 space-y-1 text-white/90">
          {exp.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
        </ul>

        <SectionTitle title="Achievements" />
        <ul className="list-disc ml-6 space-y-1 text-white/90">
          {exp.achievements.map((a, i) => <li key={i}>{a}</li>)}
        </ul>

        <SectionTitle title="Gallery" />
        <div className="grid grid-cols-2 gap-3">
          {exp.images.map((src, i) => (
            <img key={i} src={src} alt="exp" className="rounded-lg border border-[#223d74] object-cover w-full h-40" />
          ))}
        </div>
      </Card>
    </Container>
  );
};

const ToolsPage = () => (
  <Container>
    <SectionTitle title="Tools & Platforms" />
    <div className="grid md:grid-cols-2 gap-4">
      {tools.map((t, i) => (
        <Card key={i}>
          <h4 className="font-semibold text-white">{t.name}</h4>
          <p className="text-sm text-white/85 mt-1">{t.what}</p>
        </Card>
      ))}
    </div>
  </Container>
);

const SkillsPage = () => (
  <Container>
    <SectionTitle title="Skills" />
    <Card>
      <h4 className="font-semibold text-white mb-2">Key Skills</h4>
      <div className="flex flex-wrap gap-2">
        {skills.key.map((s) => (
          <span key={s} className="inline-block bg-[#0e2247]/50 border border-[#223d74] text-white/90 px-3 py-1 rounded-full text-xs">{s}</span>
        ))}
      </div>
      <h4 className="font-semibold text-white mt-4 mb-2">Technical</h4>
      <div className="flex flex-wrap gap-2">
        {skills.technical.map((s) => (
          <span key={s} className="inline-block bg-[#0e2247]/50 border border-[#223d74] text-white/90 px-3 py-1 rounded-full text-xs">{s}</span>
        ))}
      </div>
      <h4 className="font-semibold text-white mt-4 mb-2">Buses</h4>
      <div className="flex flex-wrap gap-2">
        {skills.buses.map((s) => (
          <span key={s} className="inline-block bg-[#0e2247]/50 border border-[#223d74] text-white/90 px-3 py-1 rounded-full text-xs">{s}</span>
        ))}
      </div>
    </Card>
  </Container>
);

const ValuesPage = () => (
  <Container>
    <SectionTitle title="Personal Values & Goals" />
    <div className="grid md:grid-cols-2 gap-4">
      {values.map((v, i) => (
        <Card key={i}>
          <h4 className="font-semibold text-white">{v.title}</h4>
          <p className="text-sm text-white/90 mt-2">{v.text}</p>
        </Card>
      ))}
    </div>
  </Container>
);

const HobbiesPage = () => (
  <Container>
    <SectionTitle title="Hobbies & Free Time" />
    <div className="grid md:grid-cols-2 gap-4">
      {hobbies.map((h, i) => (
        <Card key={i}>
          <h4 className="font-semibold text-white">{h.title}</h4>
          <p className="text-sm text-white/90 mt-2">{h.text}</p>
        </Card>
      ))}
    </div>
  </Container>
);

const ContactPage = () => (
  <Container>
    <SectionTitle title="Contact" />
    <Card>
      <p className="text-white/90">
        I’m available for roles in automotive system/software engineering and technical leadership.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <a
          href="mailto:chidhukrishraj@gmail.com"
          className="inline-flex items-center rounded-full border border-[#2b4a86] px-4 py-2 text-sm text-white/90 hover:bg-[#132a55]"
        >
          Email Me
        </a>
        <a
          href="/cv.pdf"
          className="inline-flex items-center rounded-full border border-[#2b4a86] px-4 py-2 text-sm text-white/90 hover:bg-[#132a55]"
          download
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
const App = () => {
  const hash = useHashRoute();

  // highlight current tab based on hash
  const active = (h) =>
    hash === h || (h === "#" && (hash === "" || hash === "#"))
      ? "bg-[#132a55]"
      : "";

  const page = useMemo(() => {
    if (hash === "#" || hash === "") return <HomePage />;
    if (hash.startsWith("#experience/")) return <ExperienceDetailPage slug={hash} />;
    if (hash === "#tools") return <ToolsPage />;
    if (hash === "#skills") return <SkillsPage />;
    if (hash === "#values") return <ValuesPage />;
    if (hash === "#hobbies") return <HobbiesPage />;
    if (hash === "#contact") return <ContactPage />;
    return <HomePage />;
  }, [hash]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0b1d3a] text-white">
      {/* Header brand bar */}
      <header className="border-b border-[#1d3567] bg-[#0c1f40]">
        <Container>
          <div className="h-16 flex items-center justify-between">
            <div className="font-semibold tracking-wide">{profile.name.split(" ")[0]}</div>
          </div>
        </Container>

        {/* Equal-spaced tabs */}
        <nav className="bg-[#0c1f40] border-t border-[#1d3567]">
          <Container>
            <div className="grid grid-cols-6 text-sm text-white/90">
              <a className={`text-center py-3 hover:bg-[#132a55] ${active("#")}`} href="#">Home</a>
              <a className={`text-center py-3 hover:bg-[#132a55] ${active("#tools")}`} href="#tools">Tools</a>
              <a className={`text-center py-3 hover:bg-[#132a55] ${active("#skills")}`} href="#skills">Skills</a>
              <a className={`text-center py-3 hover:bg-[#132a55] ${active("#values")}`} href="#values">Values</a>
              <a className={`text-center py-3 hover:bg-[#132a55] ${active("#hobbies")}`} href="#hobbies">Hobbies</a>
              <a className={`text-center py-3 hover:bg-[#132a55] ${active("#contact")}`} href="#contact">Contact</a>
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

      {/* Footer pinned to bottom */}
      <footer className="border-t border-[#1d3567] bg-[#0c1f40]">
        <Container>
          <div className="py-6 text-center text-xs text-white/70">
            © 2025 {profile.name}
          </div>
        </Container>
      </footer>
    </div>
  );
};


export default App;
