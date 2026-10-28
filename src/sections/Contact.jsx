"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import emailjs from "@emailjs/browser";
import Image from "next/image";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Copy,
  Check,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Download,
} from "lucide-react";
import { FaLinkedinIn, FaGithub, FaFacebook } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Astra from "../assets/Astra.png";

const MotionImage = motion.create(Image);

const SERVICE_ID = process.env.NEXT_PUBLIC_SERVICE_ID;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_TEMPLATE_ID;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_PUBLIC_KEY;

/* ---------------------------------------------------------------
   CONTACT DATA  (yahin edit karein)
---------------------------------------------------------------- */
const contactMethods = [
  {
    id: "email",
    label: "Email",
    value: "ajha49993@gmail.com",
    href: "mailto:ajha49993@gmail.com",
    icon: Mail,
    copy: true,
  },
  {
    id: "phone",
    label: "Phone",
    value: "+977 9807741196",
    href: "tel:+9779807741196",
    icon: Phone,
    copy: true,
  },
  {
    id: "location",
    label: "Location",
    value: "Kathmandu, Nepal",
    icon: MapPin,
  },
];

const socials = [
  { Icon: FaLinkedinIn, label: "LinkedIn", href: "https://www.linkedin.com/in/alok-jha-83810a3a0" },
  { Icon: FaGithub, label: "GitHub", href: "https://github.com/Alok-Jha-creator" },
  { Icon: FaFacebook, label: "Facebook", href: "https://www.facebook.com/alok.jha.23607" },
];

const services = ["Web Development", "Others"];
const EASE = [0.22, 1, 0.36, 1];
const spring = { type: "spring", stiffness: 320, damping: 24 };

const leftStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const slideIn = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } },
};

const inputStyle =
  "h-9 border-white/10 bg-[#141414] text-sm text-white placeholder:text-zinc-500 focus-visible:border-teal-400/60 focus-visible:ring-teal-400/20 dark:bg-[#141414]";

function Field({ id, label, error, children }) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-sm text-zinc-300">
        {label} <span className="text-red-400">*</span>
      </Label>
      {children}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden text-xs text-red-400"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

function ContactRow({ item, copied, onCopy }) {
  const Icon = item.icon;
  const content = (
    <>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-400/10 text-teal-300 transition-colors duration-300 group-hover:bg-teal-400/20">
        <Icon size={17} strokeWidth={1.8} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs text-zinc-400">{item.label}</span>
        <span className="block truncate text-sm font-medium text-white">
          {item.value}
        </span>
      </span>
    </>
  );

  return (
    <div className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-[#0d0d0d]/70 p-2.5 backdrop-blur-sm transition-colors duration-300 hover:border-teal-400/40">
      {item.href ? (
        <a
          href={item.href}
          className="flex min-w-0 flex-1 items-center gap-3 rounded-xl focus-visible:outline focus-visible:outline-teal-400"
        >
          {content}
        </a>
      ) : (
        <div className="flex min-w-0 flex-1 items-center gap-3">{content}</div>
      )}

      {item.copy && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={`Copy ${item.label}`}
          onClick={() => onCopy(item)}
          className="h-8 w-8 shrink-0 rounded-full text-zinc-400 hover:bg-white/10 hover:text-white"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={copied ? "done" : "copy"}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="inline-flex"
            >
              {copied ? (
                <Check className="size-4 text-teal-300" />
              ) : (
                <Copy className="size-4" />
              )}
            </motion.span>
          </AnimatePresence>
        </Button>
      )}
    </div>
  );
}

const emptyForm = { name: "", email: "", service: "", budget: "", idea: "" };

export default function Contact() {
  const reduce = useReducedMotion();
  const router = useRouter();
  const pathname = usePathname();
  const vp = { once: true, margin: "-40px" };

  const isPage = pathname === "/contact";

  const goBack = () => {
    if (window.history.length > 1) router.back();
    else router.push("/");
  };

  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(""); // "", "sending", "success", "error"
  const [copiedId, setCopiedId] = useState(null);
  const copyTimer = useRef(null);

  useEffect(() => () => clearTimeout(copyTimer.current), []);

  const setField = (name, value) => {
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "budget" && value && !/^\d+$/.test(value)) return; // budget me sirf number
    setField(name, value);
  };

  // "Others" chunne par budget nahi chahiye
  const needsBudget = Boolean(formData.service) && formData.service !== "Others";

  const validateForm = () => {
    const newErrors = {};
    ["name", "email", "service", "idea"].forEach((f) => {
      if (!formData[f].trim()) newErrors[f] = "Fill this field";
    });
    if (formData.email.trim() && !/^\S+@\S+\.\S+$/.test(formData.email.trim()))
      newErrors.email = "Enter a valid email";
    if (needsBudget && !formData.budget.trim()) newErrors.budget = "Fill this field";

    setErrors(newErrors);
    return !Object.keys(newErrors).length;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus("sending");
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          ...formData,
          from_name: formData.name,
          reply_to: formData.email,
        },
        PUBLIC_KEY
      );
      setStatus("success");
      setFormData(emptyForm);
    } catch (err) {
      console.error("EmailJS Error:", err?.status, err?.text || err);
      setStatus("error");
    }
  };

  const handleCopy = async (item) => {
    try {
      await navigator.clipboard.writeText(item.value);
      setCopiedId(item.id);
      clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopiedId(null), 1800);
    } catch {
      /* clipboard allow nahi hua to kuch nahi hoga */
    }
  };

  return (
    <section
      id="contact"
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-black px-6 pb-10 pt-1 text-white md:px-12 lg:px-20"
    >
      {/* background image (Astra) */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* floating background image - poori image dikhegi (object-contain) */}
        <motion.div
          className="absolute inset-0"
          animate={reduce ? undefined : { y: [0, -14, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src={Astra}
            alt=""
            fill
            priority
            sizes="100vw"
            className="select-none object-contain object-center"
          />
        </motion.div>
        {/* halka overlay taaki text readable rahe */}
        <div className="absolute inset-0 bg-black/45" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <div className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
          <motion.div
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={vp}
            variants={leftStagger}
            className="space-y-5"
          >
            {isPage && (
              <motion.div variants={slideIn}>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={goBack}
                  className="group h-8 rounded-full border-white/15 bg-[#0d0d0d]/70 px-3 text-xs text-zinc-300 backdrop-blur-sm hover:border-teal-400/50 hover:bg-[#0d0d0d] hover:text-teal-300"
                >
                  <ArrowLeft className="size-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
                  Back
                </Button>
              </motion.div>
            )}

            <motion.div variants={slideIn}>
              <h2 className="bg-linear-to-r from-teal-400 to-emerald-500 bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl">
                Let&apos;s Work Together
              </h2>
              <p className="mt-3 max-w-md text-sm leading-6 text-zinc-300">
                Have an idea or a project in mind? Reach out directly, or send a
                message with the form.
              </p>
            </motion.div>

            <motion.div variants={slideIn} className="space-y-2.5">
              {contactMethods.map((item) => (
                <ContactRow
                  key={item.id}
                  item={item}
                  copied={copiedId === item.id}
                  onCopy={handleCopy}
                />
              ))}
            </motion.div>

            <motion.div
              variants={slideIn}
              className="flex flex-wrap items-center gap-3"
            >
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
                    className="rounded-full border-white/15 bg-[#0d0d0d]/70 text-zinc-300 backdrop-blur-sm hover:border-teal-400/50 hover:bg-[#0d0d0d] hover:text-teal-300"
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

              <Button
                asChild
                variant="outline"
                className="rounded-full border-white/15 bg-[#0d0d0d]/70 text-white backdrop-blur-sm hover:border-teal-400/50 hover:bg-[#0d0d0d] hover:text-white"
              >
                <a href="/Resume.pdf" download>
                  <Download className="h-4 w-4" /> Resume
                </a>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={vp}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <Card className="gap-0 rounded-2xl border-white/10 bg-[#0d0d0d]/75 p-5 py-5 text-white shadow-none backdrop-blur-md">
              <h3 className="mb-4 text-base font-semibold text-white">
                Send a message
              </h3>

              <form className="space-y-3" onSubmit={handleSubmit} noValidate>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field id="name" label="Name" error={errors.name}>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      className={inputStyle}
                    />
                  </Field>
                  <Field id="email" label="Email" error={errors.email}>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Your email"
                      value={formData.email}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      className={inputStyle}
                    />
                  </Field>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <motion.div
                    layout
                    transition={{ layout: { duration: 0.3, ease: EASE } }}
                    className={needsBudget ? "" : "sm:col-span-2"}
                  >
                    <Field
                      id="service"
                      label="Service needed"
                      error={errors.service}
                    >
                      <Select
                        value={formData.service}
                        onValueChange={(v) => setField("service", v)}
                      >
                        <SelectTrigger
                          id="service"
                          aria-invalid={Boolean(errors.service)}
                          className={`${inputStyle} w-full data-placeholder:text-zinc-400 dark:hover:bg-gray-300`}
                        >
                          <SelectValue placeholder="Something in mind?" />
                        </SelectTrigger>
                        <SelectContent
                          position="popper"
                          side="bottom"
                          align="start"
                          sideOffset={8}
                          className="z-100 w-(--radix-select-trigger-width) border-white/15 bg-gray-500 p-1 text-black shadow-xl"
                        >
                          {services.map((s) => (
                            <SelectItem
                              key={s}
                              value={s}
                              className="cursor-pointer py-2 text-sm text-white focus:bg-white/10 focus:text-white data-[state=checked]:text-teal-300"
                            >
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </Field>
                  </motion.div>

                  <AnimatePresence initial={false}>
                    {needsBudget && (
                      <motion.div
                        key="budget"
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: EASE }}
                      >
                        <Field id="budget" label="Budget" error={errors.budget}>
                          <Input
                            id="budget"
                            name="budget"
                            inputMode="numeric"
                            placeholder="Your budget"
                            value={formData.budget}
                            onChange={handleChange}
                            aria-invalid={Boolean(errors.budget)}
                            aria-describedby={
                              errors.budget ? "budget-error" : undefined
                            }
                            className={inputStyle}
                          />
                        </Field>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Field id="idea" label="Idea" error={errors.idea}>
                  <Textarea
                    id="idea"
                    name="idea"
                    rows={3}
                    placeholder="Tell me about your idea"
                    value={formData.idea}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.idea)}
                    aria-describedby={errors.idea ? "idea-error" : undefined}
                    className="min-h-20 resize-none border-white/10 bg-[#141414] text-sm text-white placeholder:text-zinc-500 focus-visible:border-teal-400/60 focus-visible:ring-teal-400/20 dark:bg-[#141414]"
                  />
                </Field>
                <AnimatePresence mode="wait" initial={false}>
                  {(status === "success" || status === "error") && (
                    <motion.p
                      key={status}
                      role="status"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                        status === "success"
                          ? "bg-emerald-400/10 text-emerald-300"
                          : "bg-red-400/10 text-red-300"
                      }`}
                    >
                      {status === "success" ? (
                        <>
                          <CheckCircle2 className="size-4 shrink-0" />
                          Message sent successfully.
                        </>
                      ) : (
                        <>
                          <AlertCircle className="size-4 shrink-0" />
                          Something went wrong. Please try again.
                        </>
                      )}
                    </motion.p>
                  )}
                </AnimatePresence>

                <motion.div
                  whileHover={reduce || status === "sending" ? undefined : { y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={spring}
                >
                  <Button
                    type="submit"
                    disabled={status === "sending"}
                    className="h-10 w-full rounded-full bg-linear-to-r from-teal-400 to-emerald-500 font-semibold text-black shadow-[0_4px_14px_rgba(45,212,191,0.12)] hover:from-teal-300 hover:to-emerald-400 disabled:opacity-70"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 className="animate-spin" /> Sending...
                      </>
                    ) : (
                      <>
                        Send message <Send />
                      </>
                    )}
                  </Button>
                </motion.div>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}