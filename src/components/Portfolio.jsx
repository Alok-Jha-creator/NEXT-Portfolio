"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import About from "../sections/About";
import Contact from "../sections/Contact";
import Footer from "../sections/Footer";
import Home from "../sections/Home";
import CustomCursior from "./CustomCursior";
import IntroAnimation from "./IntroAnimation";
import Skills from "../sections/Skill";

export default function App() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <div className="relative gradient text-white bg-black min-h-screen">
      {!introDone && <IntroAnimation onFinish={() => setIntroDone(true)} />}
      <CustomCursior />
      <Navbar />
      <Home />
      <About />
      <Skills />
      <Contact />
      <Footer />
    </div>
  );
}