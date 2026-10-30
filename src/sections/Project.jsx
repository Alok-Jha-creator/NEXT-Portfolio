"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Check, ExternalLink } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import online from "../assets/online.png";
import image1 from "../assets/image.png";
import room from "../assets/room.png";
import bank from "../assets/bank.png"
import pro from "../assets/pro.png";
import quiz from "../assets/quiz.png"
import back from "../assets/back.png"

const projects = [
  {
    slug: "snapcart",
    title: "Snapcart",
    subtitle: "Full-Stack Grocery E-Commerce App",
    description:
      "A full-stack grocery delivery platform with separate dashboards for users, admins and delivery partners.",
    highlights: [
      "Separate dashboards for users, admins and delivery partners",
      "Google and email login",
      "Cart and checkout",
      "eSewa online payments",
      "Order management and delivery request broadcasting",
    ],
    image: pro,
    tags: ["Next.js", "MongoDB", "NextAuth", "Redux", "Socket.io", "Cloudinary", "Tailwind CSS"],
    github: "https://github.com/Alok-Jha-creator/snapcart",
    live: "https://snapcart-pied-gamma.vercel.app/",
  },
  {
    slug: "room-finder",
    title: "Room Finder App",
    subtitle: "Full Stack Web App",
    description:
      "A room rental platform connecting owners who list rooms with tenants who search for them.",
    highlights: [
      "Owners list rooms with photos and prices",
      "Tenants search, filter and contact owners directly",
      "Secure JWT authentication",
    ],
    image: room,
    tags: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    github: "https://github.com/Alok-Jha-creator",
  },
  {
    slug: "online-voting",
    title: "Online Voting System",
    subtitle: "Full Stack App",
    description:
      "A secure online voting system with live result counting for admins.",
    highlights: [
      "Voter registration",
      "One-person-one-vote verification",
      "Candidate management",
      "Live result counting for admins",
    ],
    image: online,
    tags: ["React", "Node.js", "MongoDB"],
    github: "https://github.com/Alok-Jha-creator",
  },
  {
    slug: "tech-booking",
    title: "Tech Booking System",
    subtitle: "Full Stack App",
    description:
      "A booking platform for technicians and services, with an admin panel to manage requests.",
    highlights: [
      "Browse technicians or services",
      "Pick a time slot and manage your bookings",
      "Admin panel to approve and track requests",
    ],
    image: image1,
    tags: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    github: "https://github.com/Alok-Jha-creator",
  },
{
  slug: "bank-management-system",
  title: "Bank Management System",
  subtitle: "DESKTOP APPLICATION",
  description:
    "A console-based Bank Management System developed using C++ that allows administrators to manage bank accounts, handle deposits and withdrawals, check account balances, modify account details, and maintain customer records using binary file handling.",
  highlights: [
    "Create and manage bank accounts",
    "Deposit and withdraw money",
    "Balance enquiry and account holder list",
    "Modify and delete bank accounts",
    "Admin login authentication",
    "Customer information validation",
    "Binary file handling for data storage"
  ],
  image: bank,
  tags: ["C++", "OOP", "File Handling", "Data Validation"],
  github: "https://github.com/Alok-Jha-creator",
},
{
  slug: "c-program-quiz-game",
  title: "C Program Quiz Game",
  subtitle: "CONSOLE APPLICATION",
  description:
    "An interactive quiz game developed using C programming. It features a warmup round and a challenge round where players answer multiple-choice questions, earn virtual prize money, and compete for the highest score.",
  highlights: [
    "Interactive multiple-choice quiz",
    "Player name registration",
    "Warmup and challenge rounds",
    "Instant correct and incorrect answer feedback",
    "Virtual prize money and score calculation",
    "Highest score tracking",
    "Reset score functionality",
    "Built-in help and game instructions"
  ],
  image: quiz,
  tags: ["C", "Programming", "Console Application", "File Handling"],
  github: "https://github.com/Alok-Jha-creator",
},
{
  slug: "ecommerce-backend-api",
  title: "E-commerce Backend API",
  subtitle: "BACKEND DEVELOPMENT",
  description:
    "A backend-focused e-commerce project built with Node.js and Express.js. It uses MongoDB with Mongoose and PostgreSQL with Sequelize for database operations, JWT for authentication, bcryptjs for password hashing, Cloudinary for image management, Joi for data validation, and Nodemailer for email services.",
  highlights: [
    "RESTful API development using Express.js",
    "JWT-based authentication support",
    "Password hashing using bcryptjs",
    "Database integration with MongoDB and PostgreSQL",
    "Data validation using Joi",
    "Image upload and management using Cloudinary and Multer",
    "Email services using Nodemailer",
    "Environment variable configuration using dotenv"
  ],
  image: back,
  tags: [
    "Node.js",
    "Express.js",
    "MongoDB",
    "Mongoose",
    "PostgreSQL",
    "Sequelize",
    "JWT",
    "Cloudinary"
  ],
  github: "https://github.com/Alok-Jha-creator",
},


];

/* ---------------------------------------------------------------
   SMALL PIECES
---------------------------------------------------------------- */
const GithubIcon = ({ className = "h-4 w-4" }) => (
  <svg viewBox="0 0 24 24" className={`${className} fill-current`} aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const EASE = [0.22, 1, 0.36, 1];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const rise = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};

const modalStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const modalRise = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

const spring = { type: "spring", stiffness: 300, damping: 24 };

function ProjectTile({ project, index, onOpen }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      variants={rise}
      whileHover={reduce ? undefined : { y: -6 }}
      transition={spring}
    >
      <div className="group relative aspect-16/10 overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)] transition-[border-color,box-shadow] duration-300 focus-within:border-teal-400/60 hover:border-teal-400/40 hover:shadow-[0_24px_60px_-20px_rgba(45,212,191,0.25)]">
        <Image
          src={project.image}
          alt={`${project.title} screenshot`}
          fill
          loading={index === 0 ? "eager" : undefined}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {project.live && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/70 px-2.5 py-1 text-xs text-zinc-200 backdrop-blur">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            Live
          </span>
        )}

        {/* tala: naam + subtitle (hamesha dekhincha, mobile ma pani) */}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-linear-to-t from-black/90 via-black/50 to-transparent p-4 pt-20">
          <div className="min-w-0">
            <p className="text-xs font-medium text-teal-300">
              {project.subtitle}
            </p>
            <h3 className="mt-0.5 truncate text-lg font-semibold text-white sm:text-xl">
              {/* stretched button: pura tile thichda khulchha, keyboard le pani chalchha */}
              <button
                type="button"
                onClick={() => onOpen(project)}
                className="text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
              >
                {project.title}
              </button>
            </h3>
          </div>

          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-all duration-300 group-hover:bg-teal-400 group-hover:text-black">
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* grid pura bharna: 6 aun tile GitHub ko lagi */
function GithubTile() {
  const reduce = useReducedMotion();

  return (
    <motion.a
      variants={rise}
      whileHover={reduce ? undefined : { y: -6 }}
      transition={spring}
      href="https://github.com/Alok-Jha-creator"
      target="_blank"
      rel="noopener noreferrer"
      className="group flex aspect-16/10 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/15 bg-[#0d0d0d]/60 p-6 text-center transition-colors duration-300 hover:border-teal-400/50 focus-visible:outline focus-visible:outline-teal-400"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/5 text-zinc-300 transition-colors duration-300 group-hover:bg-teal-400/10 group-hover:text-teal-300">
        <GithubIcon className="h-7 w-7" />
      </span>
      <span className="text-lg font-semibold text-white">More on GitHub</span>
      <span className="inline-flex items-center gap-1 text-sm text-zinc-400 transition-colors duration-300 group-hover:text-teal-300">
        See all projects
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </motion.a>
  );
}

function ProjectDialog({ project, open, onOpenChange }) {
  const reduce = useReducedMotion();
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] max-w-[calc(100%-2rem)] gap-0 overflow-y-auto rounded-2xl border-white/10 bg-[#0d0d0d] p-0 text-white [scrollbar-color:#3f3f46_transparent] scrollbar-thin sm:max-w-5xl [&>button]:rounded-full [&>button]:bg-black/60 [&>button]:p-1.5 [&>button]:text-zinc-300 [&>button]:opacity-100 [&>button]:hover:text-white">
        <div className="grid lg:grid-cols-[1.1fr_1fr]">
          {/* ---------- LEFT ---------- */}
          <div className="flex flex-col justify-center gap-5 bg-[#0a0a0a] p-6 pt-14 lg:pt-6 [@media(max-height:700px)]:gap-3">
            <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a]">
              <div className="flex items-center gap-1.5 border-b border-white/10 bg-[#141414] px-3 py-2">
                <span className="h-2 w-2 rounded-full bg-white/20" />
                <span className="h-2 w-2 rounded-full bg-white/20" />
                <span className="h-2 w-2 rounded-full bg-white/20" />
              </div>
              <div className="relative aspect-16/10 overflow-hidden [@media(max-height:700px)]:aspect-2/1">
                <Image
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-cover object-top"
                />
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-teal-300">
                {project.subtitle}
              </p>
              <DialogTitle className="mt-1 text-2xl font-bold text-white sm:text-3xl">
                {project.title}
              </DialogTitle>
            </div>
          </div>

          <motion.div
            initial={reduce ? false : "hidden"}
            animate="show"
            variants={modalStagger}
            className="flex flex-col justify-center space-y-5 p-6 lg:p-7 [@media(max-height:700px)]:space-y-3"
          >
            <motion.div variants={modalRise}>
              <DialogDescription className="text-sm leading-6 text-zinc-400 lg:pr-8">
                {project.description}
              </DialogDescription>
            </motion.div>

            <motion.div variants={modalRise}>
              <h4 className="mb-2.5 text-sm font-semibold text-white">
                What it does
              </h4>
              <ul className="space-y-1.5">
                {project.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-2.5 text-sm text-zinc-300"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" />
                    {h}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={modalRise}>
              <h4 className="mb-2.5 text-sm font-semibold text-white">
                Built with
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="rounded-md border-0 bg-white/5 px-2.5 py-1 text-xs font-normal text-zinc-300"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </motion.div>

            <motion.div variants={modalRise} className="flex flex-wrap gap-3">
              {project.live && (
                <Button
                  asChild
                  className="rounded-full bg-teal-400 font-semibold text-black hover:bg-teal-300"
                >
                  <a href={project.live} target="_blank" rel="noopener noreferrer">
                    Open live demo <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              )}
              <Button
                asChild
                variant="outline"
                className="rounded-full border-white/15 bg-[#161616] text-white hover:border-teal-400/50 hover:bg-[#161616] hover:text-white"
              >
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <GithubIcon /> View source
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function Projects() {
  const reduce = useReducedMotion();
  const vp = { once: true, margin: "-80px" };

  // active alag: modal band huda content ekdam nahaarna
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  const openProject = (p) => {
    setActive(p);
    setOpen(true);
  };

  return (
    <section
      id="projects"
      aria-label="Projects"
      className="relative overflow-hidden bg-black px-6 py-24 text-white md:px-12 lg:px-20"
    >
      {/* background glow, homepage jastai teal + purple */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-80 w-160 -translate-x-1/2 rounded-full bg-teal-500/10 blur-3xl" />
        <div className="absolute -right-24 bottom-20 h-96 w-96 rounded-full bg-[#302b63]/30 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-5xl">
        {/* ---------- Header ---------- */}
        <motion.header
          initial={reduce ? false : "hidden"}
          animate="show"
          variants={stagger}
          className="mb-14 text-center"
        >
          <motion.h2
            variants={rise}
            className="bg-linear-to-r from-teal-400 to-emerald-500 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl"
          >
            My Projects
          </motion.h2>

          <motion.p
            variants={rise}
            className="mx-auto mt-4 max-w-xl text-sm leading-7 text-zinc-400 sm:text-base"
          >
            Real apps I designed, built and shipped. Click any project for
            details.
          </motion.p>

          <motion.div
            variants={{
              hidden: { scaleX: 0 },
              show: { scaleX: 1, transition: { duration: 0.8, ease: EASE } },
            }}
            className="mx-auto mt-6 h-px w-24 bg-teal-400"
          />
        </motion.header>

        {/* ---------- Gallery ---------- */}
        <motion.div
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={vp}
          variants={stagger}
          className="grid gap-6 sm:gap-8 md:grid-cols-2"
        >
          {projects.map((p, i) => (
            <ProjectTile key={p.slug} project={p} index={i} onOpen={openProject} />
          ))}
          <GithubTile />
        </motion.div>
      </div>

      <ProjectDialog project={active} open={open} onOpenChange={setOpen} />
    </section>
  );
}