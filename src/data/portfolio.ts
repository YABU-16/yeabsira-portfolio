// ============================================================================
// PORTFOLIO DATA — Edit everything here. All visible content is driven by this
// file so you never have to dig through component code to change copy, links,
// projects, skills, or experience.
// ============================================================================

export const profile = {
  name: "Yeabsira Tamirat",
  firstName: "Yeabsira",
  role: "Web Developer & Designer",
  tagline: "Building Digital Experiences That Feel Different.",
  taglineAccent: "Feel Different.",
  intro:
    "I'm a developer and designer focused on creating modern, beautiful, and functional digital experiences.",
  availability: "Available for freelance projects",
  email: "yabtam12@gmail.com",
  location: "Remote · Worldwide",
};

export const socials = {
  github: "https://github.com/yourusername",
  linkedin: "https://www.linkedin.com/in/yourusername",
  twitter: "https://twitter.com/yourusername",
  email: "mailto:yabtam12@gmail.com",
};

// ---------------- About section ----------------
export const about = {
  heading: "A developer who thinks beyond code.",
  paragraph:
    "I blend development, UI/UX, and design into products that solve real problems. Every project starts with a question — how should this feel? — and ends with something fast, elegant, and genuinely useful. I care about the details most people never notice, because those are the details everyone feels.",
  stats: [
    { label: "Projects Built", value: 12 },
    { label: "Technologies", value: 15 },
    { label: "Years Learning", value: 4 },
    { label: "Always", value: "∞", note: "Always Learning", isInfinite: true },
  ],
};

// ---------------- Skills ----------------
export type Skill = { name: string; icon: string };
export type SkillCategory = { title: string; skills: Skill[] };

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      { name: "HTML", icon: "html" },
      { name: "CSS", icon: "css" },
      { name: "JavaScript", icon: "javascript" },
      { name: "React", icon: "react" },
      { name: "Tailwind CSS", icon: "tailwind" },
      { name: "Bootstrap", icon: "bootstrap" },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: "node" },
      { name: "Express.js", icon: "express" },
      { name: "PHP", icon: "php" },
      { name: "REST APIs", icon: "api" },
    ],
  },
  {
    title: "Database",
    skills: [
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "MySQL", icon: "mysql" },
      { name: "SQL", icon: "sql" },
    ],
  },
  {
    title: "Tools",
    skills: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "VS Code", icon: "vscode" },
      { name: "Figma", icon: "figma" },
    ],
  },
];

// ---------------- Projects ----------------
export type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  technologies: string[];
  github: string;
  live: string;
  category: string;
  overview: string;
  problem: string;
  solution: string;
  features: string[];
  challenges: string;
  results: string;
};

// To replace placeholder images with your real screenshots, drop the files in
// the /public/projects folder and update the "image" path below, e.g.
//   image: "/projects/techgadget.png"
export const projects: Project[] = [
  {
    id: "techgadget",
    title: "TechGadget",
    subtitle: "Modern Electronics E-commerce",
    description:
      "A modern electronics e-commerce platform with product browsing, a full shopping cart, checkout flow, and an admin product management dashboard.",
    image: "/projects/techgadget.png",
    technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    github: socials.github,
    live: "#",
    category: "E-commerce",
    overview:
      "TechGadget is a full-stack electronics storefront that lets customers browse products, manage a cart, and check out, while admins manage inventory through a dedicated dashboard.",
    problem:
      "Small electronics retailers rely on generic tools that are hard to customize and don't reflect the brand. Customers expect a smooth, trustworthy shopping experience.",
    solution:
      "I built a custom storefront with PHP and MySQL, designing a clean product catalog, a persistent cart, and an admin panel for adding and editing products.",
    features: [
      "Product browsing with filtering",
      "Shopping cart with live totals",
      "Checkout flow with order summary",
      "Admin dashboard for product management",
      "Fully responsive design",
    ],
    challenges:
      "Coordinating cart state across page loads with PHP sessions required careful data modeling and clean SQL queries to keep performance snappy.",
    results:
      "A complete, production-ready storefront where non-technical admins can manage the catalog easily, and customers get a seamless purchasing experience.",
  },
  {
    id: "hotel-booking",
    title: "Hotel Reservation System",
    subtitle: "Booking & Management Platform",
    description:
      "A modern hotel booking and management platform with room browsing, a reservation system, booking management, and an admin dashboard.",
    image: "/projects/hotel.png",
    technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    github: socials.github,
    live: "#",
    category: "Web App",
    overview:
      "A hotel platform where guests can browse rooms and book stays, while staff manage reservations and availability through an admin dashboard.",
    problem:
      "Hotels juggle phone bookings and spreadsheets, leading to double bookings, lost reservations, and a dated guest experience.",
    solution:
      "I designed a reservation engine with clear room cards, an availability-aware booking form, and a dashboard that surfaces every reservation in real time.",
    features: [
      "Room browsing with photos and details",
      "Availability-aware reservation system",
      "Booking management for staff",
      "Admin dashboard with analytics",
    ],
    challenges:
      "Preventing overlapping bookings meant writing careful SQL date-range checks and handling timezone considerations across reservations.",
    results:
      "An end-to-end platform that removes booking conflicts, gives guests a modern booking flow, and gives staff full visibility and control.",
  },
  {
    id: "smart-marketplace",
    title: "Smart Marketplace",
    subtitle: "Ethiopian Digital Commerce Concept",
    description:
      "A marketplace concept inspired by Ethiopian digital commerce, with product listings, search, categories, a seller interface, and a shopping experience.",
    image: "/projects/marketplace.png",
    technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    github: socials.github,
    live: "#",
    category: "Concept",
    overview:
      "Smart Marketplace reimagines local digital commerce — an interface designed for sellers and buyers to connect over goods in a fast, modern way.",
    problem:
      "Traditional local commerce happens offline, with limited discoverability and trust. Sellers needed a modern digital storefront that feels accessible.",
    solution:
      "I prototyped a marketplace with a seller onboarding flow, categorized listings, instant search, and a clean shopping experience tuned for mobile-first users.",
    features: [
      "Product listings with images",
      "Instant search across listings",
      "Category browsing",
      "Seller interface for managing products",
      "Streamlined shopping experience",
    ],
    challenges:
      "Designing an interface that stays fast and legible on limited-bandwidth connections required a focus on lightweight markup and deliberate visual hierarchy.",
    results:
      "A concept that proves local commerce can feel as polished and modern as global platforms, opening the door to a real rollout.",
  },
];

// ---------------- Services ----------------
export type Service = {
  id: string;
  icon: string;
  title: string;
  description: string;
  features: string[];
};

export const services: Service[] = [
  {
    id: "web-development",
    icon: "code",
    title: "Web Development",
    description:
      "Modern, responsive websites and web applications built with clean, maintainable code.",
    features: [
      "Responsive websites",
      "Single-page apps",
      "Performance focused",
    ],
  },
  {
    id: "uiux",
    icon: "palette",
    title: "UI/UX Design",
    description:
      "Clean, intuitive, and modern interfaces designed around how people actually use software.",
    features: ["Interface design", "Prototyping", "Design systems"],
  },
  {
    id: "ecommerce",
    icon: "shopping-cart",
    title: "E-commerce",
    description:
      "Modern online stores with powerful functionality, from catalogs to checkout.",
    features: ["Storefronts", "Cart & checkout", "Admin panels"],
  },
  {
    id: "backend",
    icon: "server",
    title: "Backend Development",
    description:
      "APIs, databases, and server-side applications that power reliable products.",
    features: ["REST APIs", "Database design", "Server logic"],
  },
];

// ---------------- Experience / Learning Journey ----------------
export type Milestone = { year: string; title: string; description: string };

export const journey: Milestone[] = [
  {
    year: "2023",
    title: "Started learning web development",
    description:
      "Began with HTML, CSS, and JavaScript — building my first static pages and falling in love with the web.",
  },
  {
    year: "2024",
    title: "Built projects and learned databases",
    description:
      "Moved into real projects, adding SQL and PHP to build dynamic, data-driven applications.",
  },
  {
    year: "2025",
    title: "Focused on backend & modern web tech",
    description:
      "Dived into Node.js, Express, and modern frontend frameworks to build faster, cleaner apps.",
  },
  {
    year: "2026",
    title: "Building production-ready applications",
    description:
      "Now shipping polished, production-ready products and a professional portfolio worth showing clients.",
  },
];

// ---------------- Design Philosophy ----------------
export type Principle = { number: string; title: string; description: string };

export const philosophy = {
  heading: "Code is only part of the experience.",
  principles: [
    {
      number: "01",
      title: "Design",
      description:
        "Good software should look beautiful. Aesthetics aren't decoration — they're how people judge quality in the first seconds.",
    },
    {
      number: "02",
      title: "Experience",
      description:
        "Technology should feel simple to use. The best interfaces disappear so people can focus on what matters.",
    },
    {
      number: "03",
      title: "Performance",
      description:
        "Beautiful experiences should still be fast. Elegance means nothing if the page takes five seconds to load.",
    },
  ] as Principle[],
};

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];
