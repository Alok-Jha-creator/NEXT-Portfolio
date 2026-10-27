"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Check, Sparkles } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import online from "../assets/online.png";
import image1 from "../assets/image.png";
import room from "../assets/room.png";
import port from "../assets/port.png";
import pro from "../assets/pro.png";

const featured = {
  title: "Snapcart",
  subtitle: "Full-Stack Grocery App",
  description:
    "A full-stack grocery delivery platform where customers, admins and delivery partners each get their own dashboard.",
  highlights: [
    "Separate dashboards for users, admins and delivery partners",
    "Google and email login",
    "Cart, checkout and eSewa online payments",
    "Order management and delivery request broadcasting",
  ],
  image: pro,
  tags: ["Next.js", "MongoDB", "NextAuth", "Redux", "Socket.io", "Cloudinary", "Tailwind CSS"],
  github: "https://github.com/Alok-Jha-creator/snapcart",
  live: "https://snapcart-pied-gamma.vercel.app/",
};

const projects = [
  {
    id: 2,
    title: "Room Finder App",
    subtitle: "Full Stack Web App",
    description:
      "A room rental platform where owners list rooms with photos and prices, and tenants search, filter and contact owners directly. Built with secure JWT authentication.",
    image: room,
    tags: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    github: "https://github.com/Alok-Jha-creator",
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
  },
  {
    id: 4,
    title: "Tech Booking System",
    subtitle: "Full Stack App",
    description:
      "A booking platform where users browse technicians or services, pick a time slot and manage their bookings, with an admin panel to approve and track requests.",
    image: image1,
    tags: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    github: "https://github.com/Alok-Jha-creator",
  },
  {
    id: 5,
    title: "Portfolio Website",
    subtitle: "Frontend Project",
    description:
      "Personal developer portfolio with smooth animations, particle backgrounds and a fully responsive design.",
    image: port,
    tags: ["React", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/Alok-Jha-creator",
  },
];

const quickFacts = [
  { label: "Projects", value: `${projects.length + 1} built` },
  { label: "Main stack", value: "MERN · Next.js" },
  { label: "Latest", value: "Snapcart" },
];

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

function BrowserFrame({ src, alt, sizes, ratio = "aspect-[16/10]" }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a]">
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-[#141414] px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
      </div>
      <div className={`relative overflow-hidden ${ratio}`}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>
    </div>
  );
}

function Tags({ tags }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge
          key={tag}
          variant="secondary"
          className="rounded-md border-0 bg-white/5 px-2.5 py-1 text-xs font-normal text-zinc-300"
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
}

function Links({ github, live }) {
  return (
    <div className="flex flex-wrap gap-3">
      {live && (
        <Button
          asChild
          className="rounded-full bg-teal-400 font-semibold text-black hover:bg-teal-300"
        >
          <a href={live} target="_blank" rel="noopener noreferrer">
            Live demo <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      )}
      <Button
        asChild
        variant="outline"
        className="rounded-full border-white/15 bg-[#161616] text-white hover:border-teal-400/50 hover:bg-[#161616] hover:text-white"
      >
        <a href={github} target="_blank" rel="noopener noreferrer">
          <GithubIcon /> Source code
        </a>
      </Button>
    </div>
  );
}

const EASE = [0.22, 1, 0.36, 1];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const rise = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const spring = { type: "spring", stiffness: 300, damping: 24 };

export default function Projects() {
  const reduce = useReducedMotion();
  const vp = { once: true, margin: "-80px" };
  const hover = reduce ? undefined : { y: -4 };

  return (
    <section
      id="projects"
      aria-label="Projects"
      className="relative overflow-hidden bg-black px-6 py-24 text-white md:px-12 lg:px-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-80 w-160 -translate-x-1/2 rounded-full bg-teal-500/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl">
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
            Real apps I designed, built and shipped, from the database and API
            to the interface.
          </motion.p>

          <motion.div
            variants={{
              hidden: { scaleX: 0 },
              show: { scaleX: 1, transition: { duration: 0.8, ease: EASE } },
            }}
            className="mx-auto mt-6 h-px w-24 bg-teal-400"
          />

          <motion.div
            variants={rise}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            {quickFacts.map((f) => (
              <div
                key={f.label}
                className="rounded-xl border border-white/10 bg-[#0d0d0d] px-5 py-3 text-center"
              >
                <p className="text-xs text-zinc-500">{f.label}</p>
                <p className="mt-1 text-sm font-semibold text-white">
                  {f.value}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.header>

        {/* ---------- Featured: Snapcart ---------- */}
        <motion.div
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={vp}
          variants={rise}
          whileHover={hover}
          transition={spring}
        >
          <Card className="group gap-0 overflow-hidden rounded-2xl border-teal-400/30 bg-[#0d0d0d] p-5 text-white shadow-none transition-colors duration-300 hover:border-teal-400/60 sm:p-6">
            <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_1fr]">
              <BrowserFrame
                src={featured.image}
                alt={`${featured.title} screenshot`}
                sizes="(max-width: 1024px) 100vw, 55vw"
              />

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge className="gap-1.5 rounded-full border-0 bg-teal-400/10 px-3 py-1 text-xs font-medium text-teal-300">
                    <Sparkles className="h-3 w-3" />
                    Featured
                  </Badge>
                  <span className="inline-flex items-center gap-2 text-xs text-zinc-400">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                    Live
                  </span>
                </div>

                <h3 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
                  {featured.title}
                </h3>
                <p className="mt-1 text-sm font-medium text-teal-300">
                  {featured.subtitle}
                </p>
                <p className="mt-4 text-sm leading-7 text-zinc-400">
                  {featured.description}
                </p>

                <ul className="mt-5 space-y-2.5">
                  {featured.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-2.5 text-sm text-zinc-300"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-teal-400" />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <Tags tags={featured.tags} />
                </div>
                <div className="mt-6">
                  <Links github={featured.github} live={featured.live} />
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* ---------- Other projects ---------- */}
        <motion.div
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={vp}
          variants={stagger}
          className="mt-8 grid gap-8 md:grid-cols-2"
        >
          {projects.map((p) => (
            <motion.div
              key={p.id}
              variants={rise}
              whileHover={hover}
              transition={spring}
              className="h-full"
            >
              <Card className="group h-full gap-0 overflow-hidden rounded-2xl border-white/10 bg-[#0d0d0d] p-5 text-white shadow-none transition-colors duration-300 hover:border-teal-400/40 sm:p-6">
                <BrowserFrame
                  src={p.image}
                  alt={`${p.title} screenshot`}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                <div className="flex flex-1 flex-col pt-6">
                  <p className="text-xs font-medium text-teal-300">
                    {p.subtitle}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold text-white">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-zinc-400">
                    {p.description}
                  </p>

                  <div className="mt-5">
                    <Tags tags={p.tags} />
                  </div>

                  <div className="mt-auto pt-6">
                    <Links github={p.github} live={p.live} />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* ---------- CTA ---------- */}
        <div className="mt-14 flex justify-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full border-white/15 bg-[#0d0d0d] px-7 text-white hover:border-teal-400/50 hover:bg-[#0d0d0d] hover:text-white"
          >
            <a
              href="https://github.com/Alok-Jha-creator"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon /> See all projects on GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}