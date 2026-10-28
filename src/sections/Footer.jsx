"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUp, ArrowUpRight, Heart } from "lucide-react";
import { FaLinkedinIn, FaFacebook, FaGithub } from "react-icons/fa6";

import { Button } from "@/components/ui/button";

/* ---------------------------------------------------------------
   DATA  (yahi ek thau ma edit garnus)
   id   -> home page ko section id (smooth scroll ko lagi)
   href -> alag page, ya "/#id"
---------------------------------------------------------------- */
const socials = [
  { Icon: FaLinkedinIn, label: "LinkedIn", href: "https://www.linkedin.com/in/alok-jha-83810a3a0" },
  { Icon: FaGithub, label: "GitHub", href: "https://github.com/Alok-Jha-creator" },
  { Icon: FaFacebook, label: "Facebook", href: "https://www.facebook.com/alok.jha.23607" },
];

const navLinks = [
  { label: "Home", href: "/", id: "home" },
  { label: "About", href: "/#about", id: "about" },
  { label: "Skills", href: "/#skills", id: "skills" },
  { label: "Projects", href: "/projects" },
  { label: "Qualification", href: "/qualification" },
  { label: "Contact", href: "/contact" },
];

/* ---------------------------------------------------------------
   ANIMATION
---------------------------------------------------------------- */
const EASE = [0.22, 1, 0.36, 1];
const spring = { type: "spring", stiffness: 320, damping: 22 };

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const rise = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function Footer() {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  /* home page ma bhae smooth scroll, natra normal navigation */
  const go = (e, item) => {
    if (pathname !== "/" || !item.id) return;

    if (item.id === "home") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(item.id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative overflow-hidden bg-black text-white">
      {/* ---------- background ---------- */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* halka grid, kinara ma fade hunchha */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(28,216,210,1) 1px, transparent 1px), linear-gradient(90deg, rgba(28,216,210,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage:
              "radial-gradient(ellipse at 50% 0%, black 20%, transparent 70%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at 50% 0%, black 20%, transparent 70%)",
          }}
        />
        <div className="absolute -top-20 left-1/2 h-72 w-150 -translate-x-1/2 rounded-full bg-teal-500/15 blur-[120px]" />
        <div className="absolute -bottom-10 left-0 h-52 w-72 rounded-full bg-[#302b63]/25 blur-[100px]" />
      </div>

      <motion.div
        aria-hidden
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: EASE }}
        className="h-px w-full origin-center bg-linear-to-r from-transparent via-teal-400 to-transparent"
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 pb-8 pt-14 md:px-10">
        <motion.div
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={stagger}
          className="grid gap-12 border-b border-white/10 pb-12 md:grid-cols-[1.3fr_1fr_1.3fr] md:gap-10"
        >
          <motion.div variants={rise} className="flex flex-col gap-4">
            <h2 className="bg-linear-to-br from-teal-400 via-emerald-400 to-white bg-clip-text text-5xl font-black leading-none tracking-tight text-transparent">
              Alok Jha
            </h2>
            <p className="max-w-xs text-sm leading-relaxed text-zinc-400">
              Full Stack Developer crafting scalable, modern apps, from robust
              APIs to pixel-perfect UIs.
            </p>

            <div className="mt-1 flex gap-3">
              {socials.map(({ Icon, label, href }) => (
                <motion.div
                  key={label}
                  whileHover={reduce ? undefined : { y: -4 }}
                  whileTap={{ scale: 0.92 }}
                  transition={spring}
                >
                  <Button
                    asChild
                    size="icon"
                    variant="outline"
                    className="rounded-full border-white/15 bg-[#0d0d0d] text-zinc-400 hover:border-teal-400/50 hover:bg-[#0d0d0d] hover:text-teal-300"
                  >
                    <a
                      href={href}
                      aria-label={label}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon className="h-4.5 w-4.5" />
                    </a>
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.nav
            variants={rise}
            aria-label="Footer"
            className="flex flex-col gap-3"
          >
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-teal-400">
              Navigation
            </p>
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={(e) => go(e, item)}
                className="group inline-flex w-fit items-center gap-2 rounded text-sm text-zinc-400 transition-all duration-300 hover:translate-x-1.5 hover:text-white focus-visible:outline focus-visible:outline-teal-400"
              >
                <span className="h-px w-0 bg-teal-400 transition-all duration-300 group-hover:w-3" />
                {item.label}
              </Link>
            ))}
          </motion.nav>

          <motion.div
            variants={rise}
            className="flex flex-col justify-between gap-6"
          >
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-teal-400">
                Life Principle
              </p>
              <blockquote className="border-l-2 border-teal-400 pl-4 text-base italic leading-relaxed text-white/80">
                “Small steps, taken consistently, create extraordinary results.”
              </blockquote>
            </div>

            <motion.div
              className="w-fit"
              whileHover={reduce ? undefined : { y: -3 }}
              whileTap={{ scale: 0.97 }}
              transition={spring}
            >
              <Button
                asChild
                size="lg"
                className="group rounded-full bg-linear-to-r from-teal-400 to-emerald-500 px-6 font-semibold text-black shadow-[0_8px_30px_rgba(45,212,191,0.25)] hover:from-teal-300 hover:to-emerald-400"
              >
                <Link href="/contact">
                  Let&apos;s Work Together
                  <ArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col items-center justify-between gap-4 pt-6 text-xs text-zinc-500 sm:flex-row"
        >
          <span>© {new Date().getFullYear()} Alok Jha. All rights reserved.</span>

          <span className="inline-flex items-center gap-1.5">
            Built with
            <Heart className="size-3.5 fill-teal-400 text-teal-400" />
            using Next.js, Tailwind CSS &amp; Framer Motion
          </span>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={toTop}
            className="group h-8 rounded-full border-white/15 bg-[#0d0d0d] px-3 text-xs text-zinc-300 hover:border-teal-400/50 hover:bg-[#0d0d0d] hover:text-teal-300"
          >
            Back to top
            <ArrowUp className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </Button>
        </motion.div>
      </div>
    </footer>
  );
}