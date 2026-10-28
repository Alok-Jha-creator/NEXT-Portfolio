"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  Award,
  Server,
  Network,
  BarChart3,
  ShieldCheck,
  MapPin,
  Clock,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import WaveBackground from "@/components/WaveBackground";

/* ---------------------------------------------------------------
   DATA
---------------------------------------------------------------- */
const education = [
  {
    title: "Bachelor of Information Technology (BIT)",
    institution: "Aryan School of Engineering and Management",
    duration: "2021 – 2026",
    note: "8 Semesters",
    status: "Completed",
    highlight: true,
    icon: GraduationCap,
    semesters: [
      {
        name: "Semester 1",
        subjects: [
          "Fundamentals of Information Technology",
          "Mathematics I",
          "Technical Communication",
          "Society and Ethics in IT",
          "Computer Programming in C",
          "Project I(QUIZ Game)",
        ],
      },
      {
        name: "Semester 2",
        subjects: [
          "Mathematics II",
          "Digital Logic",
          "Discrete Structure",
          "Object Oriented Programming in C++",
          "Financial Management and Accounting",
          "Project II(BMS)",
        ],
      },
      {
        name: "Semester 3",
        subjects: [
          "Numerical Methods",
          "Microcontroller",
          "Data Structure and Algorithm",
          "Computer Network and Data Communication",
          "System Analysis and Design",
          "Project III (water level detector)",
        ],
      },
      {
        name: "Semester 4",
        subjects: [
          "Operating System",
          "Java Programming",
          "Database Management System",
          "Probability and Statistics",
          "Computer Organization and Architecture",
          "Project IV (SMS)",
        ],
      },
      {
        name: "Semester 5",
        subjects: [
          "Research Methodology",
          "Computer Graphics",
          "Cryptography and Network Security",
          "Web Technology",
          "Internet of Things",
          "Project V (e-commerce site)",
        ],
      },
      {
        name: "Semester 6",
        subjects: [
          "Artificial Intelligence",
          "Management Information System",
          "Data Warehousing and Data Mining",
          "Simulation and Modeling",
          "Software Engineering",
          "Project VI (Job Finder)",
        ],
      },
      {
        name: "Semester 7",
        subjects: [
          "Network Programming",
          "Digital Governance",
          "Internship (Bussiness Analysist)",
          "Digital Commerce",
          "Multimedia and Application",
        ],
      },
      {
        name: "Semester 8",
        subjects: [
          "Principles of Management and Entrepreneurship in IT",
          "Distributed and Cloud Computing",
          "Apprentice Project (Blogify)",
          "Big Data",
          "Mobile App Development",
        ],
      },
    ],
  },
  {
    title: "Higher Secondary (+2 Science / SLC)",
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
  { label: "Degree", value: "BIT · Completed" },
  { label: "Trainings", value: `${trainings.length} completed` },
  { label: "Focus", value: "MERN · Networking" },
];

const EASE = [0.22, 1, 0.36, 1]; // smooth "ease-out-expo" jasto

const timelineItem = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

const nodePop = {
  hidden: { scale: 0.5, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 260, damping: 18, delay: 0.1 },
  },
};

const listStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const rise = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const semesterStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const semesterCard = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE } },
};

export default function Qualification() {
  const reduce = useReducedMotion();

  // Scroll garda timeline ko teal line smooth tarika le bharinchha
  const listRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 75%", "end 65%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    restDelta: 0.001,
  });

  const vp = { once: true, margin: "-80px" };

  return (
    <section
      id="qualification"
      className="relative overflow-hidden px-6 py-24 text-white md:px-12 lg:px-20"
    >
      {/* wave lines: mathi ko header bhaag ma matra, tala tira halka fade hunchha */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-130"
        style={{
          maskImage: "linear-gradient(to bottom, black 50%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent)",
        }}
      >
        <WaveBackground lines={26} amplitude={0.14} focusX={0.5} />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-80 w-160 -translate-x-1/2 rounded-full bg-teal-500/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl">
        <motion.header
          initial={reduce ? false : "hidden"}
          animate="show"
          variants={listStagger}
          className="mb-12 text-center"
        >
          <motion.h2
            variants={rise}
            className="bg-linear-to-r from-teal-400 to-emerald-500 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl"
          >
            Qualifications
          </motion.h2>

          <motion.p
            variants={rise}
            className="mx-auto mt-2 max-w-xl text-sm leading-7 text-zinc-400 sm:text-base"
          >
            Bachelor of Information Technology, focused on software
            development,Web Devlopment, databases, and networking, with hands-on training in
            MERN Stack, CCNA, Business Analysis, and Ethical Hacking.
          </motion.p>

          <motion.div
            variants={{
              hidden: { scaleX: 0 },
              show: { scaleX: 1, transition: { duration: 0.8, ease: EASE } },
            }}
            className="mx-auto mt-4 h-px w-24 bg-teal-400"
          />

          <motion.div
            variants={rise}
            className="mt-4 flex flex-wrap justify-center gap-3"
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

        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
          {/* ---------- Education timeline ---------- */}
          <div>
            <h3 className="mb-8 text-xl font-semibold text-white">Education</h3>

            <div ref={listRef} className="relative pl-12 sm:pl-14">
              {/* background track */}
              <div
                aria-hidden
                className="absolute bottom-0 left-[1.1rem] top-2 w-px bg-white/10 sm:left-[1.35rem]"
              />
              {/* scroll-linked teal progress line */}
              <motion.div
                aria-hidden
                style={{ scaleY: reduce ? 1 : progress, originY: 0 }}
                className="absolute bottom-0 left-[1.1rem] top-2 w-px bg-linear-to-b from-teal-300 via-teal-400 to-emerald-500 shadow-[0_0_10px_rgba(45,212,191,0.6)] sm:left-[1.35rem]"
              />

              <ol className="space-y-8">
                {education.map((item) => {
                  const Icon = item.icon;
                  const hasMore = Boolean(item.semesters?.length);

                  return (
                    <motion.li
                      key={item.title}
                      initial={reduce ? false : "hidden"}
                      whileInView="show"
                      viewport={vp}
                      variants={timelineItem}
                      className="relative"
                    >
                      {/* node */}
                      <motion.span
                        variants={nodePop}
                        className={`absolute -left-12 top-5 flex h-9 w-9 items-center justify-center rounded-full border bg-black sm:-left-14 sm:h-11 sm:w-11 ${
                          item.highlight
                            ? "border-teal-400 text-teal-300 shadow-[0_0_20px_rgba(45,212,191,0.35)]"
                            : "border-white/15 text-zinc-400"
                        }`}
                      >
                        <Icon size={18} strokeWidth={1.8} />
                      </motion.span>

                      <motion.div
                        whileHover={reduce ? undefined : { y: -3 }}
                        transition={{ type: "spring", stiffness: 300, damping: 24 }}
                      >
                        <Card
                          className={`gap-0 rounded-2xl bg-[#0d0d0d] py-0 text-white shadow-none transition-colors duration-300 ${
                            item.highlight
                              ? "border-teal-400/30"
                              : "border-white/10 hover:border-white/20"
                          }`}
                        >
                          <CardContent className="p-6 sm:p-7">
                            <div className="flex flex-wrap items-center gap-3">
                              <span className="text-sm font-medium text-teal-300">
                                {item.duration}
                              </span>
                              <Badge
                                variant="secondary"
                                className={`rounded-full border-0 px-3 py-1 text-xs font-medium ${
                                  item.highlight
                                    ? "bg-teal-400/10 text-teal-300"
                                    : "bg-white/5 text-zinc-400"
                                }`}
                              >
                                {item.status}
                              </Badge>
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
                              <Accordion type="single" collapsible>
                                <AccordionItem
                                  value="subjects"
                                  className="border-none"
                                >
                                  <AccordionTrigger className="group mt-5 w-auto flex-none items-center gap-2 rounded-full border border-white/10 bg-[#161616] px-4 py-2 text-sm font-medium text-white hover:border-teal-400/50 hover:no-underline focus-visible:ring-teal-400/50">
                                    <span className="group-data-[state=open]:hidden">
                                      View more
                                    </span>
                                    <span className="hidden group-data-[state=open]:inline">
                                      View less
                                    </span>
                                  </AccordionTrigger>

                                  <AccordionContent className="pb-0">
                                    <motion.div
                                      initial="hidden"
                                      animate="show"
                                      variants={semesterStagger}
                                      className="mt-6 grid gap-3 border-t border-white/10 pt-6 sm:grid-cols-2"
                                    >
                                      {item.semesters.map((sem) => (
                                        <motion.div
                                          key={sem.name}
                                          variants={semesterCard}
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
                                        </motion.div>
                                      ))}
                                    </motion.div>
                                  </AccordionContent>
                                </AccordionItem>
                              </Accordion>
                            )}
                          </CardContent>
                        </Card>
                      </motion.div>
                    </motion.li>
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

            <motion.ul
              initial={reduce ? false : "hidden"}
              whileInView="show"
              viewport={vp}
              variants={listStagger}
              className="space-y-4"
            >
              {trainings.map((t) => {
                const Icon = t.icon;
                return (
                  <motion.li
                    key={t.title}
                    variants={rise}
                    whileHover={reduce ? undefined : { y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  >
                    <Card className="gap-0 rounded-2xl border-white/10 bg-[#0d0d0d] py-0 text-white shadow-none transition-colors duration-300 hover:border-teal-400/40">
                      <CardContent className="flex items-start gap-4 p-5">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-400/10 text-teal-300">
                          <Icon size={20} strokeWidth={1.8} />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <h4 className="font-semibold text-white">
                              {t.title}
                            </h4>
                            <Badge
                              variant="secondary"
                              className="shrink-0 gap-1 rounded-full border-0 bg-white/5 px-2.5 py-1 text-xs font-normal text-zinc-300"
                            >
                              <Clock size={12} />
                              {t.duration}
                            </Badge>
                          </div>
                          <p className="mt-1 text-sm text-zinc-400">{t.org}</p>
                          <p className="mt-1 inline-flex items-center gap-1 text-xs text-zinc-500">
                            <MapPin size={12} />
                            {t.place}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.li>
                );
              })}
            </motion.ul>
          </aside>
        </div>
      </div>
    </section>
  );
}