"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Send, Loader2 } from "lucide-react";
import { Github } from "./Icons";
import { useState } from "react";


export default function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState('idle');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus('idle');

        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message'),
        };

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers,
                body: JSON.stringify(data),
            });

            if (res.ok) {
                setStatus('success');
                (e.target).reset();
            } else {
                setStatus('error');
            }
        } catch (err) {
            setStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

  return (
    <section id="contact" className="py-32 px-[clamp(1.5rem,5vw,6rem)] relative overflow-hidden bg-[#050505]">
      {/* Top Divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      <div className="w-full mt-8">
        <motion.div 


          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-full glass p-10 md:p-16 xl:p-20 rounded-[40px] relative overflow-hidden box-shadow-brick"
        >
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-brick/10 rounded-full blur-[120px] -z-10 translate-x-1/2 -translate-y-1/2" />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Let&apos;s <span className="text-gradient">Connect</span></h2>
              <p className="text-slate-400 mb-12 max-w-md leading-relaxed">
                Have a project idea or just want to say hi? Feel free to reach out. I&apos;m always open to new opportunities.
              </p>

              <div className="space-y-8">
                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-accent-brick/10 transition-colors">
                    <Mail className="w-6 h-6 text-accent-brick" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">Email Me</p>
                    <a href="mailto:thakorarpitsinh25@gmail.com" className="text-lg font-medium hover:text-accent-brick transition-colors">
                      thakorarpitsinh25@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-accent-sage/10 transition-colors">
                    <Github className="w-6 h-6 text-accent-sage" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">Github</p>
                    <a href="https://github.com/arpitthakor28" target="_blank" rel="noopener noreferrer" className="text-lg font-medium hover:text-accent-sage transition-colors">
                      github.com/arpitthakor28
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-6 group">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-accent-warm/10 transition-colors">
                    <MapPin className="w-6 h-6 text-accent-warm" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">Location</p>
                    <p className="text-lg font-medium">Surat, Gujarat, India</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">Name</label>
                    <input 
                      name="name"
                      required
                      type="text" 
                      placeholder="Arpitsinh"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-accent-brick/50 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">Email</label>
                    <input 
                      name="email"
                      required
                      type="email" 
                      placeholder="email@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-accent-brick/50 transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">Message</label>
                  <textarea 
                    name="message"
                    required
                    rows={4} 
                    placeholder="Tell me about your project..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-accent-brick/50 transition-all resize-none"
                  />
                </div>
                <button 
                  disabled={isSubmitting}
                  className="w-full py-4 bg-accent-brick text-white font-bold rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 animate-glow-warm disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>Sending... <Loader2 className="w-5 h-5 animate-spin" /></>
                  ) : status === 'success' ? (
                    "Message Sent!"
                  ) : (
                    <>Send Message <Send className="w-5 h-5" /></>
                  )}
                </button>
              </form>
            </div>
          </div>
        </motion.div>

        <footer className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Arpitsinh Thakor. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </footer>
      </div>
    </section>
  );
}
