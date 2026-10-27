"use client";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  Award,
  ChevronDown,
  Server,
  Network,
  BarChart3,
  ShieldCheck,
  MapPin,
  Clock,
} from "lucide-react";

const education = [
  {
    title: "Bachelor of Information Technology (BIT)",
    institution: "Aryan School of Engineering and Management",
    duration: "2021 – 2026",
    note: "8th Semester",
    status: "Completed",
    icon: GraduationCap,
    semesters: [
      {
        name: "Semester 1",
        subjects: [
          "Introduction to Information Technology",
          "C Programming",
          "Mathematics I",
          "Communication English",
          "Sociology and Ethics"
        ],
      },
      {
        name: "Semester 2",
        subjects: [
          "Finance and Accounts",
          "Digital Logic",
          "Object Oriented C++ Programming",
          "Mathematics II",
          "Statistics",
        ],
      },
      {
        // TODO: Sem 3 ra Sem 4 ma DBMS / OS repeat chha, real subject rakha
        name: "Semester 3",
        subjects: [
          "Database Management System",
          "Computer Networks",
          "Operating System",
          "Software Engineering",
        ],
      },
      {
        name: "Semester 4",
        subjects: [
          "Database Management System",
          "Probability and Statistics",
          "Operating System",
          "Computer Architecture and Organization",
          "Java Programming",
        ],
      },
      {
        // TODO: Web Technology ra Java Sem 2/4 ma pani chha, check garnus
        name: "Semester 5",
        subjects: [
          "Web Technology",
          "Internet of Things",
          "Cyber Security",
          "Research Methodology",
          "Java Programming",
        ],
      },
      // Sem 6, 7, 8 yaha thapnus
    ],
  },
  {
    title: "Higher Secondary (+2 / SLC)",
    institution: "DAV Shushil Kedia College",
    duration: "2018 – 2020",
    status: "Completed",
    icon: Award,
  },
  {
    title: "Secondary Education Examination (SEE)",
    institution: "Durga Secondary School",
    duration: "2006 – 2017",
    status: "Completed",
    icon: BookOpen,
  },
];

const trainings = [
  {
    title: "MERN Stack",
    org: "Broadway Infosys",
    place: "Tinkune, Kathmandu",
    duration: "3 Months",
    icon: Server,
  },
  {
    title: "CCNA",
    org: "Laba Pvt. Ltd",
    place: "Anamnagar, Kathmandu",
    duration: "7 Days",
    icon: Network,
  },
  {
    title: "Business Analysis",
    org: "Broadway Infosys",
    place: "Tinkune, Kathmandu",
    duration: "10 Days",
    icon: BarChart3,
  },
  {
    title: "Ethical Hacking",
    org: "Phoenix College of Management",
    place: "Kathmandu",
    duration: "10 Days",
    icon: ShieldCheck,
  },
];

const quickFacts = [
  { label: "Completed", value: "BIT · 8th Sem" },
  { label: "Trainings", value: `${trainings.length} completed` },
  { label: "Focus", value: "MERN · Networking" },
];

/* ---------------------------------------------------------------
   COMPONENT
---------------------------------------------------------------- */
export default function Qualification() {
  const [openIndex, setOpenIndex] = useState(0); // pahilo card by default khulla
  const reduce = useReducedMotion();

  const toggle = (i) => setOpenIndex((cur) => (cur === i ? null : i));

  return (
    <section
      id="qualification"
      className="relative overflow-hidden px-6 py-24 text-white md:px-12 lg:px-20"
    >
      {/* soft teal glow, homepage jastai */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-teal-500/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* ---------- Header ---------- */}
        <header className="mb-12 text-center">
          <h2 className="bg-gradient-to-r from-teal-400 to-emerald-500 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl">
            Qualifications
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-zinc-400 sm:text-base">
            Where I studied and what I trained in, from school to my IT degree
            and hands-on courses.
          </p>
          <div className="mx-auto mt-6 h-px w-24 bg-teal-400" />

          <div className="mt-8 flex flex-wrap justify-center gap-3">
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
          </div>
        </header>

        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
          {/* ---------- Education timeline ---------- */}
          <div>
            <h3 className="mb-8 text-xl font-semibold text-white">Education</h3>

            <div className="relative pl-12 sm:pl-14">
              {/* vertical line, ek choti draw hunchha */}
              <motion.div
                aria-hidden
                initial={reduce ? false : { scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                style={{ originY: 0 }}
                className="absolute bottom-0 left-[1.1rem] top-2 w-px bg-gradient-to-b from-teal-400 via-teal-400/30 to-transparent sm:left-[1.35rem]"
              />

              <ol className="space-y-8">
                {education.map((item, index) => {
                  const Icon = item.icon;
                  const hasMore = Boolean(item.semesters?.length);
                  const isOpen = openIndex === index;
                  const current = item.status === "In Progress";

                  return (
                    <li key={item.title} className="relative">
                      {/* timeline node */}
                      <span
                        className={`absolute -left-12 top-5 flex h-9 w-9 items-center justify-center rounded-full border bg-black sm:-left-14 sm:h-11 sm:w-11 ${
                          current
                            ? "border-teal-400 text-teal-300 shadow-[0_0_20px_rgba(45,212,191,0.35)]"
                            : "border-white/15 text-zinc-400"
                        }`}
                      >
                        <Icon size={18} strokeWidth={1.8} />
                      </span>

                      <article
                        className={`rounded-2xl border bg-[#0d0d0d] p-6 transition-colors sm:p-7 ${
                          current
                            ? "border-teal-400/30"
                            : "border-white/10 hover:border-white/20"
                        }`}
                      >
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="text-sm font-medium text-teal-300">
                            {item.duration}
                          </span>
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-medium ${
                              current
                                ? "bg-teal-400/10 text-teal-300"
                                : "bg-white/5 text-zinc-400"
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>

                        <h4 className="mt-3 text-lg font-semibold leading-snug text-white sm:text-xl">
                          {item.title}
                        </h4>
                        <p className="mt-1.5 text-sm text-zinc-400">
                          {item.institution}
                        </p>
                        {item.note && (
                          <p className="mt-1 text-sm text-zinc-500">
                            {item.note}
                          </p>
                        )}

                        {hasMore && (
                          <button
                            type="button"
                            onClick={() => toggle(index)}
                            aria-expanded={isOpen}
                            className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#161616] px-4 py-2 text-sm font-medium text-white transition hover:border-teal-400/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-400"
                          >
                            {isOpen ? "Hide subjects" : "View subjects"}
                            <motion.span
                              animate={{ rotate: isOpen ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                              className="inline-flex"
                            >
                              <ChevronDown size={16} />
                            </motion.span>
                          </button>
                        )}

                        <AnimatePresence initial={false}>
                          {hasMore && isOpen && (
                            <motion.div
                              key="details"
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.35, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="mt-6 grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-2">
                                {item.semesters.map((sem) => (
                                  <div
                                    key={sem.name}
                                    className="rounded-xl border border-white/10 bg-[#141414] p-4"
                                  >
                                    <h5 className="mb-3 text-sm font-semibold text-teal-300">
                                      {sem.name}
                                    </h5>
                                    <ul className="space-y-1.5">
                                      {sem.subjects.map((s) => (
                                        <li
                                          key={s}
                                          className="flex items-start gap-2 text-sm text-zinc-300"
                                        >
                                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-teal-400" />
                                          {s}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </article>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>

          {/* ---------- Training ---------- */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <h3 className="mb-8 text-xl font-semibold text-white">
              Training &amp; Courses
            </h3>

            <ul className="space-y-4">
              {trainings.map((t) => {
                const Icon = t.icon;
                return (
                  <li
                    key={t.title}
                    className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-5 transition-colors hover:border-teal-400/40"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-400/10 text-teal-300">
                        <Icon size={20} strokeWidth={1.8} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <h4 className="font-semibold text-white">
                            {t.title}
                          </h4>
                          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-white/5 px-2.5 py-1 text-xs text-zinc-300">
                            <Clock size={12} />
                            {t.duration}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-zinc-400">{t.org}</p>
                        <p className="mt-1 inline-flex items-center gap-1 text-xs text-zinc-500">
                          <MapPin size={12} />
                          {t.place}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}