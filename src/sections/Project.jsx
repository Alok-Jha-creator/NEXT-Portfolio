"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import online from "../assets/online.png";
import image1 from "../assets/image.png";
import room from "../assets/room.png";
import port from "../assets/port.png";
import pro from "../assets/pro.png";

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
    featured: true,
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
    accent: "#00bf9f",
  },
  {
    id: 3,
    title: "Online Voting System",
    subtitle: "Full Stack App",
    description:
      "A secure online voting system with voter registration, one-person-one-vote verification, candidate management and live result counting for admins.",
    image: online,
    tags: ["React", "Node.js", "MongoDB"],
    github: "https://github.com/Alok-Jha-creator",
    accent: "#a78bfa",
  },
  {
    id: 4,
    title: "Tech Booking System",
    subtitle: "Full Stack App",
    description:
      "A booking platform where users can browse technicians or services, pick a time slot, and manage their bookings, with an admin panel to approve and track requests.",
    image: image1,
    tags: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    github: "https://github.com/Alok-Jha-creator",
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
    accent: "#38bdf8",
  },
];

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const ExternalIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-2" aria-hidden="true">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" strokeLinecap="round" strokeLinejoin="round" />
    <polyline points="15 3 21 3 21 9" strokeLinecap="round" strokeLinejoin="round" />
    <line x1="10" y1="14" x2="21" y2="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function ProjectCard({ project, index }) {
  const { featured, accent } = project;

  return (
    <motion.article
      className={`group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm
        transition-all duration-300 hover:-translate-y-1
        ${featured ? "lg:col-span-2 lg:flex-row" : ""}`}
      style={{ "--accent": accent }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.15 }}
      whileHover={{ boxShadow: `0 0 30px ${accent}33`, borderColor: `${accent}66` }}
    >
      {/* Image: poora dekhincha, crop hudaina */}
      <div
        className={`relative w-full shrink-0 overflow-hidden bg-black/40
          ${featured ? "h-56 lg:h-auto lg:w-1/2 lg:min-h-80" : "h-48"}`}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p
          className="mb-1 text-xs font-semibold uppercase tracking-widest"
          style={{ color: accent }}
        >
          {project.subtitle}
        </p>
        <h3 className="mb-2 text-xl font-extrabold text-white sm:text-2xl">
          {project.title}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-gray-300">
          {project.description}
        </p>

        <div className="mb-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-white/15 bg-white/10 px-2 py-1 text-xs text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex flex-wrap gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20"
          >
            <GithubIcon /> GitHub
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-black transition hover:opacity-90"
              style={{ backgroundColor: accent }}
            >
              <ExternalIcon /> Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative min-h-screen w-full overflow-hidden bg-black text-white"
      aria-label="Projects"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-10 -left-15 h-50 w-50 animate-pulse rounded-full bg-linear-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63] opacity-15 blur-[80px]" />
        <div className="absolute bottom-10 -right-10 h-60 w-60 animate-pulse rounded-full bg-linear-to-r from-[#302b63] via-[#00bf8f] to-[#1CD8D2] opacity-15 blur-[90px]" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-24 md:px-10 lg:px-12">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <h2 className="bg-linear-to-r from-[#1CD8D2] via-[#00bf8f] to-[#302b63] bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
            My Projects
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base text-gray-400 sm:text-lg">
            Real-world apps I&apos;ve designed, built, and shipped, from concept to production.
          </p>
        </motion.div>

        {/* lg: Snapcart(2 col) + 1, ani 3 ota = perfect grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        <div className="flex justify-center">
          <a
            href="https://github.com/Alok-Jha-creator"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3 font-semibold text-white transition-all hover:border-[#1CD8D2]/40 hover:bg-white/10"
          >
            <GithubIcon />
            View All on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}