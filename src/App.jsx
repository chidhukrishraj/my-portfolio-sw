// src/App.js

import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ---------------------------------------
// NOTE ABOUT ASSETS / BUGFIX
// ---------------------------------------
// The previous version used `new URL('x', import.meta.env.BASE_URL).href` which
// threw: TypeError: import.meta.env is undefined (in sandbox/non-Vite contexts).
// This rewrite switches to simple relative paths like "profile.jpg" so it works
// both locally and on GitHub Pages without relying on `import.meta`.
// Put images and cv.pdf in your project's public/ folder.

// Small helper to gracefully handle missing images (adds a border + alt text)
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
    <div className={`flex items-center justify-center bg-black/10 text-white/70 text-xs ${className}`}
         role="img" aria-label={alt}>
      image not found
    </div>
  );
};

// ---------------------------
// Profile Data (EDIT ME)
// ---------------------------
const profile = {
  name: "Chidhanandh Krishnaraj",
  title: "System-/Software Engineer (Automotive)",
  location: "Stuttgart Region, Germany",
  summary:
    "System engineer with 10+ years in ADAS & Brake Systems. Passionate about E/E architecture, system integration, and building the world’s safest vehicles. I combine deep technical expertise with a collaborative leadership style to deliver robust, high-performance automotive solutions.",
  // IMPORTANT: keep files in /public and reference them without a leading slash
  // so they resolve correctly at /my-portfolio/ on GitHub Pages.
  photo: "profile.jpg",
  siteUrl: "https://chidhukrishraj.github.io/my-portfolio", // set to your live URL
  contacts: [
    { label: "Email", value: "chidhukrishraj@gmail.com", href: "mailto:chidhukrishraj@gmail.com" },
    { label: "LinkedIn", value: "linkedin.com/in/chidhanandh-krishnaraj-172b9688", href: "https://www.linkedin.com/in/chidhanandh-krishnaraj-172b9688/" },
    { label: "GitHub", value: "github.com/chidhanandh", href: "https://github.com/chidhanandh" },
  ],
};

// ---------------------------
// Experience Data (EDIT ME)
// ---------------------------
const experiences = [
  {
    id: "bosch-adas",
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
// Tools, Skills, Values, Hobbies
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
  key: ["E/E Architecture", "System Integration", "Verification & Validation", "Functional Safety (ISO 26262)", "ASPICE"],
  technical: ["C/C++", "Python", "MATLAB", "UML", "Simulink", "ASCET"],
  buses: ["CAN", "LIN", "FlexRay", "Automotive Ethernet", "PCIe (basics)"],
};

const values = [
  { id: "safety-performance", title: "Safety & Performance", text: "Focus on safe, robust functions that perform under extreme conditions, ensuring reliability and compliance." },
  { id: "clarity-ownership", title: "Clarity & Ownership", text: "Champion clear specifications, complete traceability, and end-to-end ownership from requirements definition to final release." },
  { id: "continuous-learning", title: "Continuous Learning", text: "Actively expanding knowledge in E/E topology, advanced diagnostics, and cutting-edge validation practices to stay ahead." },
  { id: "team-first", title: "Team First", text: "Committed to mentoring, conducting practical workshops, and fostering high-performing teams that consistently deliver innovative solutions." },
];

const hobbies = [
  { id: "sim-racing", title: "Sim Racing", text: "Deep dives into telemetry analysis, race strategy, and vehicle dynamics – blending passion with a practical understanding of automotive principles." },
  { id: "photography", title: "Photography", text: "Capturing moments in automotive, cityscape, and portrait photography – a creative outlet for telling stories with light and composition." },
  { id: "cycling", title: "Cycling", text: "Building endurance, maintaining focus, and enjoying the outdoors – a balance to technical challenges." },
];

// ---------------------------
// Tiny Router
// ---------------------------
const useHashRoute = () => {
  const [hash, setHash] = useState(() => (typeof window !== 'undefined' ? window.location.hash : '#'));

  useEffect(() => {
    if (typeof window === 'undefined') return;
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
  <div className="max-w-6xl mx-auto px-4 md:px-6">{children}</div>
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
// Pages
// ---------------------------
const HomePage = () => (
  <Container>
    <div className="grid lg:grid-cols-[1.3fr,0.7fr] gap-6 py-6 items-center">
      <Card className="bg-[#0e2247]/60 border border-[#223d74]">
        <h1 className="text-3xl font-bold text-white">{profile.name}</h1>
        <p className="text-lg text-white/90">{profile.title}</p>
        <p className="text-sm text-white/70">{profile.location}</p>
        <p className="mt-3 text-white/90 leading-relaxed">{profile.summary}</p>

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

        <div className="mt-4 flex flex-wrap gap-2">
          <a href="#experience" className="inline-flex items-center rounded-full border border-[#2b4a86] px-4 py-2 text-sm text-white/90 hover:bg-[#132a55] transition-colors">View Experience</a>
          <a href="#contact" className="inline-flex items-center rounded-full border border-[#2b4a86] px-4 py-2 text-sm text-white/90 hover:bg-[#132a55] transition-colors">Contact Me</a>
        </div>
      </Card>

      <Card className="flex justify-center lg:justify-end bg-[#0e2247]/60 border border-[#223d74] p-4 lg:p-6">
        <SafeImg
          src={profile.photo}
          alt={`${profile.name} profile photo`}
          className="w-28 h-28 lg:w-32 lg:h-32 object-cover rounded-full border-2 border-[#2b4a86]"
        />
      </Card>
    </div>

    <Card className="bg-[#0e2247]/60 border border-[#223d74] mt-6">
      <SectionTitle title="Work Experience" className="!mt-0" />
      <div className="space-y-3">
        {experiences.map((exp) => (
          <a
            key={exp.id}
            href={`#experience/${exp.id}`}
            className="block rounded-lg border border-[#223d74] bg-[#0e2247]/40 p-3 hover:bg-[#132a55] transition-colors"
          >
            <h3 className="font-semibold text-white">{exp.role}</h3>
            <p className="text-sm text-white/80">{exp.company}</p>
            <p className="text-xs text-white/60">{exp.period} • Projects: {exp.projectsCount}</p>
          </a>
        ))}
      </div>
    </Card>
  </Container>
);

const ExperienceDetailPage = ({ experienceId }) => {
  const exp = useMemo(() => experiences.find((e) => e.id === experienceId), [experienceId]);
  if (!exp) return <Container><p className="py-10 text-white/70 text-center">Experience not found. Please navigate back to the home page.</p></Container>;
  return (
    <Container>
      <Card className="space-y-4">
        <h1 className="text-2xl font-bold text-white">{exp.role}</h1>
        <p className="text-sm text-white/80">{exp.company} — {exp.location}</p>
        <p className="text-xs text-white/60">{exp.period} • Projects: {exp.projectsCount}</p>
        <p className="mt-3 text-white/90 leading-relaxed">{exp.summary}</p>

        <SectionTitle title="Responsibilities" className="!mt-4" />
        <ul className="list-disc ml-6 space-y-1 text-white/90">
          {exp.responsibilities.map((r, i) => <li key={i}>{r}</li>)}
        </ul>

        <SectionTitle title="Achievements" className="!mt-4" />
        <ul className="list-disc ml-6 space-y-1 text-white/90">
          {exp.achievements.map((a, i) => <li key={i}>{a}</li>)}
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
          <a href="#experience" className="text-sm text-white/70 hover:underline">← Back to Experience List</a>
        </div>
      </Card>
    </Container>
  );
};

const ToolsPage = () => (
  <Container>
    <SectionTitle title="Tools & Platforms" />
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tools.map((t) => (
        <Card key={t.id}>
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
      <h4 className="font-semibold text-white mt-4 mb-2">Bus Systems</h4>
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
          <h4 className="font-semibold text-white">{h.title}</h4>
          <p className="text-sm text-white/90 mt-2 leading-relaxed">{h.text}</p>
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
          href="cv.pdf" // file must be in public/
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
const App = () => {
  const hash = useHashRoute();

  const active = (h) => {
    const normalizedHash = hash === "" ? "#" : hash;
    return normalizedHash === h ? "bg-[#132a55]" : "";
  };

  const page = useMemo(() => {
    if (hash === "#" || hash === "") return <HomePage />;
    if (hash.startsWith("#experience/")) {
      const experienceId = hash.replace("#experience/", "");
      return <ExperienceDetailPage experienceId={experienceId} />;
    }
    if (hash === "#tools") return <ToolsPage />;
    if (hash === "#skills") return <SkillsPage />;
    if (hash === "#values") return <ValuesPage />;
    if (hash === "#hobbies") return <HobbiesPage />;
    if (hash === "#contact") return <ContactPage />;
    return <HomePage />;
  }, [hash]);

  return (
    <div className="min-h-screen flex flex-col bg-[#34495E] text-white">
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

        <nav className="bg-[#0c1f40] border-t border-[#34495E]">
          <Container>
            <div className="grid grid-cols-3 sm:grid-cols-6 text-sm text-white/90">
              <a className={`text-center py-3 hover:bg-[#132a55] transition-colors ${active("#")}`} href="#">Home</a>
              <a className={`text-center py-3 hover:bg-[#132a55] transition-colors ${active("#tools")}`} href="#tools">Tools</a>
              <a className={`text-center py-3 hover:bg-[#132a55] transition-colors ${active("#skills")}`} href="#skills">Skills</a>
              <a className={`text-center py-3 hover:bg-[#132a55] transition-colors ${active("#values")}`} href="#values">Values</a>
              <a className={`text-center py-3 hover:bg-[#132a55] transition-colors ${active("#hobbies")}`} href="#hobbies">Hobbies</a>
              <a className={`text-center py-3 hover:bg-[#132a55] transition-colors ${active("#contact")}`} href="#contact">Contact</a>
            </div>
          </Container>
        </nav>
      </header>

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
