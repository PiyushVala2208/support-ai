"use client";

import axios from "axios";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";

import { useEffect, useRef, useState } from "react";

const HomeClient = ({ email }: { email?: string }) => {
  const [open, setOpen] = useState(false);

  const navigate = useRouter();
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => removeEventListener("mousedown", handler);
  }, []);

  const handleLogin = () => {
    window.location.href = "/api/auth/login";
  };

  const firstLetter = email ? email[0]?.toUpperCase() : "";

  const features = [
    {
      title: "Plug & Play",
      desc: "Add the chatbot to your site with a single script tag.",
    },
    {
      title: "Admin Controlled",
      desc: "You control exactly what the AI knows and answers",
    },
    {
      title: "Always Online",
      desc: "Your customers get instant support 24/7.",
    },
  ];

  const handleLogOut = async () => {
    try {
      const result = await axios.get("/api/auth/logout");
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-white to-zinc-50 text-zinc-900 overflow-x-hidden">
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-sm border-b border-zinc-200"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-lg font-semibold tracking-tight">
            Support <span className="text-zinc-500">AI</span>
          </div>

          {email ? (
            <div className="relative" ref={popupRef}>
              <button
                onClick={() => setOpen(!open)}
                className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-semibold hover:scale-105 transition"
              >
                {firstLetter}
              </button>

              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-10 right-0 mt-3 w-44 bg-white rounded-xl shadow-xl border border-zinc-200 overflow-hidden"
                  >
                    <button
                      onClick={() => navigate.push("/dashboard")}
                      className="w-full text-left px-4 py-3 text-sm hover:bg-zinc-100"
                    >
                      Dashboard
                    </button>
                    <button
                      onClick={handleLogOut}
                      className="w-full text-left  px-4 py-3 text-sm text-red-600 hover:bg-red-100"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="px-5 py-2 rounded-full bg-black text-white text-sm font-medium hover:bg-zinc-800 transition disabled:opacity-60 flex items-center gap-2"
            >
              Login
            </button>
          )}
        </div>
      </motion.div>

      <section className="pt-36 pb-28 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              AI Customer Support <br />
              Build for Modern Website
            </h1>
            <p className="mt-6 text-lg text-zinc-600 max-w-xl leading-tight">
              Add a powerful AI chatbot to your website in minutes. Let your
              customers get instant answers using your own business knowledge
            </p>

            <div className="mt-10 flex gap-4">
              {email ? (
                <button
                  onClick={() => navigate.push("/dashboard")}
                  className="px-7 py-3 rounded-xl bg-black text-white font-medium hover:bg-zinc-800 transition disabled:opacity-60"
                >
                  Go to Dashboard
                </button>
              ) : (
                <button
                  onClick={handleLogin}
                  className="px-7 py-3 rounded-xl bg-black text-white font-medium hover:bg-zinc-800 transition disabled:opacity-60"
                >
                  Get Strated
                </button>
              )}

              <button className="px-10 py-3 rounded-xl border border-zinc-300 text-zinc-700 hover:bg-zinc-100 transition">
                Learn More
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 95 }}
            animate={{ opacity: 1, y: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-2xl bg-white shadow-2xl border border-zinc-200 p-6">
              <div className="text-sm text-zinc-500 mb-3">
                Live Chat Preview
              </div>
              <div className="space-y-3">
                <div className="bg-black text-white rounded-lg px-4 py-2 text-sm ml-auto w-fit">
                  Do you offer cash on delivery?
                </div>
                <div className="bg-zinc-100 rounded-lg px-4 py-2 text-sm mr-auto w-fit">
                  yes, Cash On Delivery is available.
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute text-xl -bottom-6 -right-6 w-14 h-14 rounded-full bg-black text-white flex items-center justify-center shadow-xl"
              >
                💭
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-zinc-50 py-28 px-6 border-t border-zinc-200">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false }}
            className="text-3xl font-extrabold text-center"
          >
            Why Business Choose SupportAI ?
          </motion.h2>

          <div className="mt-16 grid md:grid-cols-3 grid-cols-1 gap-10">
            {features.map((f, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: false }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-zinc-200"
              >
                <h1 className="text-lg font-medium">{f.title}</h1>
                <p className="mt-3 text-zinc-600 text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-white text-zinc-500 pt-12 pb-6 border-t border-zinc-200 overflow-hidden relative w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 items-start">
            <div className="flex flex-col gap-5 text-left">
              <div className="text-2xl font-bold tracking-tight text-zinc-900">
                Support <span className="text-zinc-500">AI</span>
              </div>
              <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
                Empowering modern businesses with next-generation cognitive
                support agents. Simple to integrate, infinitely capable.
              </p>
            </div>

            <div className="flex flex-row justify-between md:justify-end gap-10 sm:gap-16 md:gap-20 w-full">
              <div className="flex flex-col gap-4 min-w-[100px]">
                <span className="text-xs font-semibold text-zinc-900 uppercase tracking-widest">
                  Product
                </span>
                <a
                  href="#"
                  className="text-sm hover:text-zinc-900 transition-colors"
                >
                  Features
                </a>
                <a
                  href="#"
                  className="text-sm hover:text-zinc-900 transition-colors"
                >
                  Security
                </a>
                <a
                  href="#"
                  className="text-sm hover:text-zinc-900 transition-colors"
                >
                  Pricing
                </a>
              </div>

              <div className="flex flex-col gap-4 min-w-[100px]">
                <span className="text-xs font-semibold text-zinc-900 uppercase tracking-widest">
                  Resources
                </span>
                <a
                  href="#"
                  className="text-sm hover:text-zinc-900 transition-colors"
                >
                  Docs
                </a>
                <a
                  href="#"
                  className="text-sm hover:text-zinc-900 transition-colors"
                >
                  Contact
                </a>
                <a
                  href="#"
                  className="text-sm hover:text-zinc-900 transition-colors"
                >
                  Status
                </a>
              </div>
            </div>
          </div>

          <div className="h-px bg-zinc-200 my-5 md:my-6"></div>

          <div className="relative select-none pointer-events-none -mb-4 md:-mb-8 overflow-hidden py-8 md:py-10">
            <motion.h1
              initial={{ opacity: 0, y: 60, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: false, amount: 0.2 }}
              className="text-[clamp(2.5rem,12vw,10rem)] font-black text-center leading-none tracking-tighter bg-clip-text text-transparent bg-linear-to-b from-zinc-900 to-zinc-700 whitespace-nowrap"
            >
              SUPPORT AI
            </motion.h1>
          </div>

          <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-6 text-xs text-zinc-400 border-t border-zinc-200/80 pt-8 mt-10 md:mt-12">
            <div className="text-center md:text-left">
              &copy; {new Date().getFullYear()} Support AI Inc. All rights
              reserved.
            </div>
            <div className="flex gap-6 sm:gap-8 justify-center">
              <a href="#" className="hover:text-zinc-600 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-zinc-600 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomeClient;
