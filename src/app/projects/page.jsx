"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useDragControls,
} from "framer-motion";
import {
  FiArrowLeft,
  FiArrowUpRight,
  FiExternalLink,
  FiGithub,
  FiX,
} from "react-icons/fi";
import CustomCursor from "../../components/CustomCursior";
import Footer from "../../sections/Footer";
import online from "../../assets/online.png";
import image1 from "../../assets/image.png";
import room from "../../assets/room.png";
import port from "../../assets/port.png";
import pro from "../../assets/pro.png";

const projects = [
  {
    id: 1,
    title: "Snapcart",
    subtitle: "Full-Stack Grocery App",
    description:
      "A full-stack grocery delivery platform with separate dashboards for users, admins and delivery partners. Features Google and email login, cart and checkout, eSewa online payments, order management, and delivery request broadcasting.",
    image: pro,
    tags: ["Next.js", "MongoDB", "NextAuth", "Redux", "Socket.io", "Cloudinary", "Tailwind CSS"],
    github: "https://github.com/Alok-Jha-creator/snapcart",
    live: "https://snapcart-pied-gamma.vercel.app/",
    accent: "#1CD8D2",
  },
  {
    id: 2,
    title: "Room Finder App",
    subtitle: "Full Stack Web App",
    description:
      "A room rental platform where owners list rooms with photos and prices, and tenants search, filter and contact owners directly. Built with secure JWT authentication.",
    image: room,
    tags: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    github: "https://github.com/Alok-Jha-creator",
    // live: "https://your-room-finder-link.com",
    accent: "#00bf9f",
  },
  {
    id: 3,
    title: "Online Voting System",
    subtitle: "Full Stack App",
    description:
      "A secure online voting system with voter registration, one-person-one-vote verification, candidate management and live result counting for admins.",
    image: online,
    tags: ["React", "Node.js", "MongoDB"], // real tags haru yaha milaunu
    github: "https://github.com/Alok-Jha-creator",
    // live: "https://your-voting-link.com",
    accent: "#a78bfa",
  },
  {
    id: 4,
    title: "Tech Booking System",
    subtitle: "Full Stack App",
    description:
      "A booking platform where users can browse technicians or services, pick a time slot, and manage their bookings, with an admin panel to approve and track requests.",
    image: image1,
    tags: ["React", "Node.js", "MongoDB", "Tailwind CSS"], // real tags haru yaha milaunu
    github: "https://github.com/Alok-Jha-creator",
    // live: "https://your-booking-link.com",
    accent: "#f59e0b",
  },
  {
    id: 5,
    title: "Portfolio Website",
    subtitle: "Frontend Project",
    description:
      "Personal developer portfolio with smooth animations, particle backgrounds, and a fully responsive design using React, Tailwind CSS, and Framer Motion.",
    image: port,
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/Alok-Jha-creator",
    // live: "https://your-portfolio-link.com",
    accent: "#38bdf8",
  },
];

const GITHUB_PROFILE = "https://github.com/Alok-Jha-creator";


const EASE = [0.22, 1, 0.36, 1];

const headerGroup = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const headerItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/* ── Filter chips ─────────────────────────────────────────────────────── */
function FilterChips({ filters, value, onChange }) {
  return (
    <div
      role="group"
      aria-label="Filter projects by technology"
      className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 scrollbar-none [&::-webkit-scrollbar]:hidden"
    >
      {filters.map((f) => {
        const active = f === value;
        return (
          <button
            key={f}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(f)}
            className={`relative shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1CD8D2] ${
              active
                ? "border-transparent text-black"
                : "border-white/15 text-gray-300 hover:border-white/35 hover:text-white"
            }`}
          >
            {active && (
              <motion.span
                layoutId="chip-pill"
                className="absolute inset-0 rounded-full bg-linear-to-r from-[#1CD8D2] to-[#00bf8f]"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <span className="relative">{f}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ── Tag list ─────────────────────────────────────────────────────────── */
function Tags({ tags, max }) {
  const shown = max ? tags.slice(0, max) : tags;
  const rest = tags.length - shown.length;
  return (
    <ul className="flex flex-wrap gap-1.5">
      {shown.map((t) => (
        <li
          key={t}
          className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-xs text-gray-300"
        >
          {t}
        </li>
      ))}
      {rest > 0 && (
        <li className="px-1 py-1 text-xs text-gray-500">+{rest} more</li>
      )}
    </ul>
  );
}

/* ── Card ─────────────────────────────────────────────────────────────── */
function Card({ project, featured, onOpen }) {
  return (
    <motion.li
      layout="position"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.55, ease: EASE }}
      className={featured ? "md:col-span-2" : ""}
      style={{ "--accent": project.accent }}
    >
      <button
        type="button"
        onClick={(e) => onOpen(project, e.currentTarget)}
        aria-label={`Open details for ${project.title}`}
        className={`group flex h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-white/4 text-left transition-[border-color,box-shadow,transform] duration-300 hover:border-(--accent) hover:shadow-[0_0_40px_-12px_var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent) active:scale-[0.99] ${
          featured ? "flex-col lg:flex-row" : "flex-col"
        }`}
      >
        <div
          className={`relative w-full shrink-0 overflow-hidden bg-black/40 ${
            featured
              ? "aspect-16/10 lg:aspect-auto lg:min-h-85 lg:w-[58%]"
              : "aspect-16/10"
          }`}
        >
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            fill
            sizes={
              featured
                ? "(min-width:1024px) 640px, 100vw"
                : "(min-width:768px) 50vw, 100vw"
            }
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/50 to-transparent" />
        </div>

        <div
          className={`flex flex-1 flex-col gap-3 p-5 sm:p-6 ${
            featured ? "lg:justify-center lg:p-8" : ""
          }`}
        >
          <p className="text-sm font-medium" style={{ color: project.accent }}>
            {project.subtitle}
          </p>
          <h3
            className={`font-bold leading-tight text-white ${
              featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
            }`}
          >
            {project.title}
          </h3>
          <p
            className={`text-sm leading-relaxed text-gray-400 sm:text-base ${
              featured ? "line-clamp-4" : "line-clamp-3"
            }`}
          >
            {project.description}
          </p>
          <Tags tags={project.tags} max={featured ? 5 : 3} />

          <div className="mt-auto flex items-center justify-between pt-2 text-sm">
            {project.live ? (
              <span className="inline-flex items-center gap-2 text-gray-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Live
              </span>
            ) : (
              <span className="text-gray-500">Source only</span>
            )}
            <span className="inline-flex items-center gap-1 font-medium text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              Details
              <FiArrowUpRight aria-hidden="true" />
            </span>
          </div>
        </div>
      </button>
    </motion.li>
  );
}

/* ── Detail panel: bottom sheet on phones, centered dialog above 640px ── */
function Detail({ project, onClose }) {
  const controls = useDragControls();
  const closeRef = useRef(null);
  // Mounted only after a click, so reading window here is safe.
  const [sheet] = useState(() => window.innerWidth < 640);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const panelVariants = sheet
    ? { hidden: { y: "100%" }, show: { y: 0 } }
    : {
        hidden: { opacity: 0, scale: 0.94, y: 24 },
        show: { opacity: 1, scale: 1, y: 0 },
      };

  return (
    <motion.div
      className="fixed inset-0 z-60 flex items-end justify-center sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} details`}
      initial="hidden"
      animate="show"
      exit="hidden"
    >
      <motion.div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
        onClick={onClose}
      />

      <motion.div
        className="relative flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-3xl border border-white/10 bg-zinc-950 shadow-2xl sm:max-w-3xl sm:rounded-3xl"
        style={{ "--accent": project.accent }}
        variants={panelVariants}
        transition={{ type: "spring", damping: 32, stiffness: 320 }}
        drag="y"
        dragControls={controls}
        dragListener={false}
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={{ top: 0, bottom: 0.6 }}
        onDragEnd={(_, info) => {
          if (info.offset.y > 120 || info.velocity.y > 600) onClose();
        }}
      >
        {/* Drag handle (phones only) */}
        <div
          className="flex shrink-0 cursor-grab touch-none justify-center pb-2 pt-3 sm:hidden"
          onPointerDown={(e) => controls.start(e)}
          aria-hidden="true"
        >
          <span className="h-1.5 w-12 rounded-full bg-white/25" />
        </div>

        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close details"
          className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/60 text-xl text-white backdrop-blur transition hover:bg-black/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)"
        >
          <FiX aria-hidden="true" />
        </button>

        <div className="overflow-y-auto overscroll-contain">
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            sizes="(min-width:640px) 768px, 100vw"
            className="h-auto w-full"
            priority
          />

          <div className="p-5 sm:p-8">
            <p className="text-sm font-medium" style={{ color: project.accent }}>
              {project.subtitle}
            </p>
            <h2 className="mt-1 text-2xl font-bold text-white sm:text-4xl">
              {project.title}
            </h2>
            <p className="mt-4 max-w-prose text-base leading-relaxed text-gray-300">
              {project.description}
            </p>

            <h3 className="mb-3 mt-6 text-sm font-semibold text-white">
              Built with
            </h3>
            <Tags tags={project.tags} />

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 font-semibold text-black transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  style={{ backgroundColor: project.accent }}
                >
                  <FiExternalLink aria-hidden="true" />
                  Open live demo
                </a>
              )}
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 font-semibold text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <FiGithub aria-hidden="true" />
                View source
              </a>
            </div>
            {!project.live && (
              <p className="mt-4 text-sm text-gray-500">
                This project has no public demo yet.
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Page ─────────────────────────────────────────────────────────────── */
export default function ProjectsPage() {
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState(null);
  const openerRef = useRef(null);

  const filters = useMemo(() => {
    const counts = {};
    projects.forEach((p) =>
      p.tags.forEach((t) => (counts[t] = (counts[t] || 0) + 1))
    );
    return [
      "All",
      ...Object.entries(counts)
        .filter(([, n]) => n > 1)
        .sort((a, b) => b[1] - a[1])
        .map(([t]) => t),
    ];
  }, []);

  const visible =
    filter === "All" ? projects : projects.filter((p) => p.tags.includes(filter));

  const open = useCallback((project, el) => {
    openerRef.current = el;
    setActive(project);
  }, []);

  const close = useCallback(() => {
    setActive(null);
    requestAnimationFrame(() => openerRef.current?.focus());
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <title>Projects | Alok Jha</title>
      <div className="relative min-h-screen overflow-x-clip bg-black text-white">
        <CustomCursor />

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-linear-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63] opacity-15 blur-[100px]" />
          <div className="absolute -right-24 top-[60%] h-80 w-80 rounded-full bg-linear-to-r from-[#302b63] via-[#00bf8f] to-[#1CD8D2] opacity-15 blur-[110px]" />
        </div>

        <main className="relative z-10 mx-auto max-w-6xl px-4 pb-24 pt-28 sm:px-6 lg:px-8">
          <motion.header
            variants={headerGroup}
            initial="hidden"
            animate="show"
            className="max-w-2xl"
          >
            <motion.div variants={headerItem}>
              <Link
                href="/"
                className="inline-flex min-h-11 items-center gap-2 text-sm text-gray-400 transition hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1CD8D2]"
              >
                <FiArrowLeft aria-hidden="true" />
                Back to home
              </Link>
            </motion.div>

            <motion.h1
              variants={headerItem}
              className="mt-2 bg-linear-to-r from-[#1CD8D2] via-[#00bf8f] to-[#7c6df0] bg-clip-text pb-1 text-5xl font-extrabold tracking-tight text-transparent sm:text-6xl lg:text-7xl"
            >
              Projects
            </motion.h1>

            <motion.p
              variants={headerItem}
              className="mt-4 text-base leading-relaxed text-gray-400 sm:text-lg"
            >
              Apps I built end to end, from the database to the interface. Open
              any project to see its stack and links.
            </motion.p>
          </motion.header>

          <motion.div
            className="mt-8 sm:mt-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6, ease: EASE }}
          >
            <FilterChips filters={filters} value={filter} onChange={setFilter} />
            <p className="mt-3 text-sm text-gray-500" aria-live="polite">
              Showing {visible.length} of {projects.length}{" "}
              {projects.length === 1 ? "project" : "projects"}
            </p>
          </motion.div>

          <motion.ul
            layout
            className="mt-6 grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2"
          >
            <AnimatePresence mode="popLayout">
              {visible.map((project, i) => (
                <Card
                  key={project.id}
                  project={project}
                  featured={filter === "All" && i === 0}
                  onOpen={open}
                />
              ))}
            </AnimatePresence>
          </motion.ul>

          <motion.div
            className="mt-12 flex justify-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <a
              href={GITHUB_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 font-semibold text-white transition hover:border-[#1CD8D2]/50 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1CD8D2]"
            >
              <FiGithub aria-hidden="true" />
              See everything on GitHub
            </a>
          </motion.div>
        </main>

        <Footer />

        <AnimatePresence>
          {active && <Detail key={active.id} project={active} onClose={close} />}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}