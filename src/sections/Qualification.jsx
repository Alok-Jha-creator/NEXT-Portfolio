"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, BookOpen, Award, ChevronDown } from "lucide-react";

const qualifications = [
  {
    title: "Bachelor of Information Technology (BIT)",
    institution: "Aryan School of Engineering and Management",
    duration: "2021 – Present",
    status: "In Progress",
    icon: GraduationCap,
    // YAHA APANO REAL SUBJECT HARU RAKHA
    semesters: [
      {
        name: "Semester 1",
        subjects: [
          "Introduction to Information Technology",
          "C Programming",
          "Digital Logic",
          "Mathematics I",
          "Communication English",
        ],
      },
      {
        name: "Semester 2",
        subjects: [
          "Data Structures and Algorithms",
          "Object Oriented Programming",
          "Web Technology",
          "Mathematics II",
          "Statistics",
        ],
      },
      {
        name: "Semester 3",
        subjects: [
          "Database Management System",
          "Computer Networks",
          "Operating System",
          "Software Engineering",
        ],
      },
      // Aru semester haru yestai thap
    ],
  },
  {
    title: "Secondary Education Examination (SEE)",
    institution: "Durga Secondary School",
    duration: "Completed",
    status: "Completed",
    icon: BookOpen,
  },
  {
    title: "School Leaving Certificate (SLC)",
    institution: "DAV College",
    duration: "Completed",
    status: "Completed",
    icon: Award,
  },
];

export default function Qualification() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) =>
    setOpenIndex((current) => (current === index ? null : index));

  return (
    <section
      id="qualification"
      className="relative overflow-hidden px-6 py-24 text-white md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-14 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-indigo-400">
            My Education
          </p>

          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
            Academic <span className="text-indigo-400">Qualifications</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-zinc-400 sm:text-base">
            My educational journey and academic background in information
            technology.
          </p>
        </div>

        <div className="relative space-y-6">
          {qualifications.map((item, index) => {
            const Icon = item.icon;
            const hasMore = Boolean(item.semesters?.length);
            const isOpen = openIndex === index;

            return (
              <article
                key={item.title}
                className="group relative rounded-2xl border border-white/10 bg-white/3 p-6 backdrop-blur-sm transition-all duration-300 hover:border-indigo-400/40 hover:bg-white/5 sm:p-8"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-500/10 text-indigo-400 transition group-hover:bg-indigo-500/20">
                    <Icon size={28} strokeWidth={1.7} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <span className="text-xs font-medium uppercase tracking-wider text-indigo-400">
                        Qualification 0{index + 1}
                      </span>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          item.status === "In Progress"
                            ? "bg-amber-500/10 text-amber-300"
                            : "bg-emerald-500/10 text-emerald-300"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold leading-snug text-white sm:text-xl">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm text-zinc-400">
                      {item.institution}
                    </p>

                    <p className="mt-3 text-sm text-zinc-500">
                      {item.duration}
                    </p>

                    {hasMore && (
                      <button
                        type="button"
                        onClick={() => toggle(index)}
                        aria-expanded={isOpen}
                        className="mt-4 inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-2 text-sm font-medium text-indigo-300 transition hover:bg-indigo-500/20"
                      >
                        {isOpen ? "View less" : "View more"}
                        <motion.span
                          animate={{ rotate: isOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="inline-flex"
                        >
                          <ChevronDown size={16} />
                        </motion.span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Expandable subjects */}
                <AnimatePresence initial={false}>
                  {hasMore && isOpen && (
                    <motion.div
                      key="details"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="mt-6 grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-2">
                        {item.semesters.map((sem) => (
                          <div
                            key={sem.name}
                            className="rounded-xl border border-white/10 bg-white/3 p-4"
                          >
                            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-indigo-300">
                              {sem.name}
                            </h4>
                            <ul className="space-y-2">
                              {sem.subjects.map((subject) => (
                                <li
                                  key={subject}
                                  className="flex items-start gap-2 text-sm text-zinc-300"
                                >
                                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
                                  {subject}
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
            );
          })}
        </div>
      </div>
    </section>
  );
}