import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Cursor from './components/Cursor';
import ParticleBackground from './components/ParticleBackground';

export default function App() {
  return (
    <div className="relative w-full min-h-screen">
      <Cursor />
      <ParticleBackground />
      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </div>
  );
}
