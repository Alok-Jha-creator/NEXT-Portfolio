"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
const navItems = [
  { label: "Home", href: "/", id: "home" },
  { label: "About", href: "/#about", id: "about" },
  { label: "Skills", href: "/#skills", id: "skills" },
  { label: "Projects", href: "/projects" },
  { label: "Qualification", href: "/qualification" },
  { label: "Contact", href: "/contact", id: "contact" },
];

const contactItem = navItems.find((i) => i.id === "contact");

const EASE = [0.22, 1, 0.36, 1];
const spring = { type: "spring", stiffness: 380, damping: 30 };

const listV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.06 } },
};
const itemV = {
  hidden: { opacity: 0, x: -14 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: EASE } },
};

export default function Navbar() {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [activeId, setActiveId] = useState("home");

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 20);
    setHidden(!reduce && latest > prev && latest > 160 && !open);
  });

  useEffect(() => {
    if (pathname !== "/") return;
    const els = navItems
      .filter((i) => i.id)
      .map((i) => document.getElementById(i.id))
      .filter(Boolean);
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (item) =>
    item.id
      ? pathname === "/" && activeId === item.id
      : pathname.startsWith(item.href);

  const go = (e, item) => {
    setOpen(false);
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

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 cursor-default bg-black/60 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.header
        initial={{ y: -120, opacity: 0 }}
        animate={{ y: hidden ? -120 : 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-1"
      >
        <div className="relative mx-auto max-w-5xl">
          <nav
            aria-label="Main"
            className={`pointer-events-auto relative flex items-center justify-between rounded-full border px-2.5 py-2 backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300 ${
              scrolled
                ? "border-white/10 bg-black/65 shadow-[0_8px_40px_rgba(0,0,0,0.55)]"
                : "border-white/5 bg-black/20"
            }`}
          >
           
            <Link
              href="/"
              onClick={(e) => go(e, navItems[0])}
              className="group flex items-center gap-2.5 rounded-full py-0.5 pl-0.5 pr-3 focus-visible:outline focus-visible:outline-teal-400"
            >
              <span className="flex h-9 w-9 font-bold-black items-center justify-center rounded-full bg-linear-to-br from-teal-400 to-emerald-500 text-base font-black text-black transition-transform duration-300 group-hover:rotate-12 group-hover:scale-105">
                A
              </span>
              <span className="text-base font-semibold tracking-tight text-white">
                Alok
              </span>
            </Link>

            <ul
              className="hidden items-center gap-0.5 lg:flex"
              onMouseLeave={() => setHovered(null)}
            >
              {navItems.map((item) => {
                const active = isActive(item);
                return (
                  <li
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setHovered(item.label)}
                  >
                    {hovered === item.label && (
                      <motion.span
                        layoutId="nav-hover"
                        transition={reduce ? { duration: 0 } : spring}
                        className="absolute inset-0 rounded-full bg-white/8"
                      />
                    )}
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        transition={reduce ? { duration: 0 } : spring}
                        className="absolute inset-0 rounded-full border border-teal-400/30 bg-teal-400/10"
                      />
                    )}

                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className={`relative z-10 h-9 rounded-full px-4 text-sm font-medium hover:bg-transparent dark:hover:bg-transparent ${
                        active
                          ? "text-teal-300 hover:text-teal-300"
                          : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      <Link
                        href={item.href}
                        onClick={(e) => go(e, item)}
                        aria-current={active ? "page" : undefined}
                      >
                        {item.label}
                      </Link>
                    </Button>
                  </li>
                );
              })}
            </ul>

            <div className="flex items-center gap-2">
              <motion.div
                className="hidden sm:block"
                whileHover={reduce ? undefined : { y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={spring}
              >
                <Button
                  asChild
                  size="sm"
                  className="group h-9 rounded-full bg-linear-to-r from-teal-400 to-emerald-500 px-5 font-semibold text-black shadow-[0_6px_24px_rgba(45,212,191,0.3)] hover:from-teal-300 hover:to-emerald-400"
                >
                  <Link
                    href={contactItem.href}
                    onClick={(e) => go(e, contactItem)}
                  >
                    Reach Out
                    <ArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </Button>
              </motion.div>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="mobile-menu"
                onClick={() => setOpen((v) => !v)}
                className="h-9 w-9 rounded-full text-white hover:bg-white/10 hover:text-white lg:hidden"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={open ? "x" : "menu"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="inline-flex"
                  >
                    {open ? <X className="size-5" /> : <Menu className="size-5" />}
                  </motion.span>
                </AnimatePresence>
              </Button>
            </div>

            <motion.div
              aria-hidden
              style={{ scaleX: progress, opacity: scrolled ? 1 : 0 }}
              className="absolute inset-x-8 -bottom-px h-px origin-left bg-linear-to-r from-teal-400 via-emerald-400 to-teal-300 shadow-[0_0_8px_rgba(45,212,191,0.8)] transition-opacity duration-300"
            />
          </nav>

          <AnimatePresence>
            {open && (
              <motion.div
                id="mobile-menu"
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.28, ease: EASE }}
                className="pointer-events-auto absolute inset-x-0 top-full mt-3 origin-top rounded-3xl border border-white/10 bg-[#0a0a0a]/95 p-3 backdrop-blur-xl lg:hidden"
              >
                <motion.ul
                  variants={listV}
                  initial="hidden"
                  animate="show"
                  className="space-y-1"
                >
                  {navItems.map((item) => {
                    const active = isActive(item);
                    return (
                      <motion.li key={item.label} variants={itemV}>
                        <Button
                          asChild
                          variant="ghost"
                          className={`h-11 w-full justify-start rounded-2xl px-4 text-base font-medium ${
                            active
                              ? "bg-teal-400/10 text-teal-300 hover:bg-teal-400/10 hover:text-teal-300"
                              : "text-zinc-300 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          <Link
                            href={item.href}
                            onClick={(e) => go(e, item)}
                            aria-current={active ? "page" : undefined}
                          >
                            {item.label}
                            {active && (
                              <span className="ml-auto h-1.5 w-1.5 rounded-full bg-teal-400" />
                            )}
                          </Link>
                        </Button>
                      </motion.li>
                    );
                  })}
                </motion.ul>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.35 }}
                  className="mt-3 border-t border-white/10 pt-3"
                >
                  <Button
                    asChild
                    className="h-11 w-full rounded-2xl bg-linear-to-r from-teal-400 to-emerald-500 font-semibold text-black hover:from-teal-300 hover:to-emerald-400"
                  >
                    <Link
                      href={contactItem.href}
                      onClick={(e) => go(e, contactItem)}
                    >
                      Reach Out <ArrowUpRight />
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </>
  );
}