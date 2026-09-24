"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState(""); // success | error

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("");

    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setTimeout(() => setStatus(""), 5000); // Clear error message after 5 sec
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus("error");
      setTimeout(() => setStatus(""), 5000); // Clear error message after 5 sec
      return;
    }

    const recipient = "rahashik129@gmail.com";
    const subject = encodeURIComponent(`Portfolio Message from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );

    const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${subject}&body=${body}`;

    window.open(gmailComposeUrl, "_blank");

    setStatus("success");
    setFormData({ name: "", email: "", message: "" });

    // Clear success message after 5 sec
    setTimeout(() => {
      setStatus("");
    }, 5000);
  };

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative overflow-hidden" id="contact">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.3 }}
        transition={{ duration: 1.5 }}
        viewport={{ once: true }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] glow-indigo -z-10"
      ></motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
        viewport={{ once: true, margin: "-100px" }}
        className="glass max-w-3xl mx-auto p-8 md:p-12 rounded-3xl border-t border-black/20 dark:border-white/20 relative z-10"
      >
        <div className="text-center mb-12">
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">Have a project? Let's talk!</h2>
          <p className="text-outline">I'm currently accepting new freelance projects and full-time opportunities.</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              whileFocus={{ scale: 1.02 }}
              className="space-y-2 origin-left"
            >
              <label className="font-label-caps text-xs text-outline uppercase tracking-widest ml-1">Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-surface-container-low border border-black/10 dark:border-white/10 rounded-lg py-4 px-6 text-on-surface focus:ring-secondary focus:border-secondary transition-all outline-none"
                placeholder="Your Name"
                type="text"
              />
            </motion.div>

            <motion.div
              whileFocus={{ scale: 1.02 }}
              className="space-y-2 origin-left"
            >
              <label className="font-label-caps text-xs text-outline uppercase tracking-widest ml-1">Your Email</label>
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-surface-container-low border border-black/10 dark:border-white/10 rounded-lg py-4 px-6 text-on-surface focus:ring-secondary focus:border-secondary transition-all outline-none"
                placeholder="[EMAIL_ADDRESS]"
                type="email"
              />
            </motion.div>
          </div>

          <motion.div
            whileFocus={{ scale: 1.01 }}
            className="space-y-2 origin-bottom"
          >
            <label className="font-label-caps text-xs text-outline uppercase tracking-widest ml-1">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full bg-surface-container-low border border-black/10 dark:border-white/10 rounded-lg py-4 px-6 text-on-surface focus:ring-secondary focus:border-secondary transition-all outline-none resize-y min-h-[120px]"
              placeholder="Let’s discuss your project needs..."
              rows={5}
            ></textarea>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.02, filter: "brightness(1.1)" }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-primary-container text-white py-5 rounded-lg font-bold text-lg transition-all shadow-xl shadow-indigo-500/10 relative overflow-hidden group"
            type="submit"
          >
            <span className="absolute inset-0 bg-black/10 dark:bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>
            <span className="relative z-10">Compose in Gmail</span>
          </motion.button>

          {status === "success" && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-500 text-center font-medium">
              ✅ Gmail compose opened in a new tab!
            </motion.p>
          )}
          {status === "error" && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-center font-medium">
              ❌ Please fill out all fields with a valid email.
            </motion.p>
          )}
        </form>
      </motion.div>
    </section>
  );
}