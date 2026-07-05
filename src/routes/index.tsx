/* mr.havath */
import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import {
  Github,
  Mail,
  MapPin,
  Sparkles,
  Shield,
  Cpu,
  Code2,
  ArrowUpRight,
  Terminal as TerminalIcon,
  Zap,
  Instagram,
  MessageCircle,
} from "lucide-react";
import { CursorGlow } from "@/components/CursorGlow";
import { MatrixRain } from "@/components/MatrixRain";
import { Terminal } from "@/components/Terminal";
import { ProjectCard } from "@/components/ProjectCard";
import { InteractiveMap } from "@/components/InteractiveMap";
import { profile, repos, stack } from "@/data/profile";
import { trackVisit, updateVisitorGeolocation } from "@/lib/visitor-tracker";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hadhi Havath — Full Stack Dev · Ethical Hacker · AI/ML" },
      {
        name: "description",
        content:
          "Portfolio of Hadhi Havath — Python & Django full-stack developer, ethical hacker and AI/ML researcher. I build it, then I secure it.",
      },
      { property: "og:title", content: "Hadhi Havath — Builder & Breaker" },
      {
        property: "og:description",
        content: "Full Stack Developer · Ethical Hacking · AI/ML Researcher. Open to work.",
      },
      { property: "og:image", content: profile.avatar },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: profile.avatar },
    ],
  }),
  component: Index,
});

function GlitchOverlay() {
  return (
    <div className="fixed inset-0 z-50 pointer-events-none bg-black/95 flex flex-col items-center justify-center font-mono">
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px] animate-pulse" />
      <div className="absolute inset-0 bg-red-950/20 pointer-events-none select-none animate-pulse" />
      <div className="relative z-10 text-center px-6">
        <div className="text-red-500 font-bold text-3xl md:text-5xl tracking-widest uppercase mb-4 animate-[blink_0.2s_infinite]">
          [!] INTRUSION DETECTED
        </div>
        <div className="text-white text-base md:text-lg tracking-wider animate-[pulse_0.4s_infinite] select-none">
          OUR DEMOCRACY HAS BEEN HACKED.
        </div>
        <div className="text-red-600/70 text-xs mt-8 tracking-widest font-mono">
          FSOCIETY.EXE CORRUPTING ALLSAFE PRIVILEGE LOGS...
        </div>
      </div>
    </div>
  );
}

function Index() {
  const [fsocietyMode, setFsocietyMode] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    trackVisit();
    console.log(
      "🕵️‍♂️ [SecOps Diagnostics] System bypass key is embedded in DOM. Inspect element #ctf-key.",
    );
  }, []);

  const handleToggleFsociety = (val: boolean) => {
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 1000);
    setFsocietyMode(val);
  };

  return (
    <main className={`relative min-h-screen overflow-x-hidden transition-colors duration-500 ${fsocietyMode ? "fsociety-theme" : ""}`}>
      {isGlitching && <GlitchOverlay />}
      <div id="ctf-key" style={{ display: "none" }} data-key="hadhi" />
      <CursorGlow />
      <ScanLine />
      <Nav fsocietyMode={fsocietyMode} setFsocietyMode={handleToggleFsociety} />
      <Hero fsocietyMode={fsocietyMode} setFsocietyMode={handleToggleFsociety} />
      <Marquee />
      <About fsocietyMode={fsocietyMode} />
      <Stack />
      <Projects />
      <Contact />
      <Footer fsocietyMode={fsocietyMode} />
    </main>
  );
}

function ScanLine() {
  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      <div
        className="absolute left-0 right-0 h-px animate-scan"
        style={{
          background:
            "linear-gradient(90deg, transparent, color-mix(in oklab, var(--neon) 70%, transparent), transparent)",
          boxShadow: "0 0 20px color-mix(in oklab, var(--neon) 60%, transparent)",
        }}
      />
    </div>
  );
}

function Nav({ fsocietyMode, setFsocietyMode }: { fsocietyMode: boolean; setFsocietyMode: (val: boolean) => void }) {
  const links = [
    { href: "#about", label: "About" },
    { href: "#stack", label: "Stack" },
    { href: "#work", label: "Work" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <header className="fixed inset-x-0 top-0 z-30">
      <div className="mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-full glass px-5 py-3">
        <a href="#top" className="flex items-center gap-2 font-mono text-sm">
          <span className="size-2 rounded-full bg-[color:var(--neon)] animate-pulse-glow" />
          <span className="glow-text">{fsocietyMode ? "fsociety" : "hadhi.havath"}</span>
        </a>
        <nav className="hidden gap-6 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="story-link text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setFsocietyMode(!fsocietyMode)}
            className={`font-mono text-[10px] md:text-xs rounded-full border px-3 py-1.5 transition-all select-none duration-300 cursor-pointer ${
              fsocietyMode
                ? "bg-red-950/40 border-red-500/70 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.3)] hover:bg-red-950/70"
                : "bg-black/40 border-muted-foreground/30 text-muted-foreground hover:border-[color:var(--neon)] hover:text-[color:var(--neon)]"
            }`}
          >
            {fsocietyMode ? "fsociety.exe [ACTIVE]" : "run fsociety.exe"}
          </button>

          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-[color:var(--neon)]/40 bg-[color:var(--neon)]/10 px-4 py-1.5 text-xs font-mono text-[color:var(--neon)] transition-all hover:bg-[color:var(--neon)]/20"
          >
            <Github className="size-3.5" />
            github
            <ArrowUpRight className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero({ fsocietyMode, setFsocietyMode }: { fsocietyMode: boolean; setFsocietyMode: (val: boolean) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-screen items-center justify-center px-6 pt-28"
    >
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute inset-0 overflow-hidden">
        <MatrixRain fsocietyMode={fsocietyMode} />
      </div>
      {/* floating orbs */}
      <div className="pointer-events-none absolute left-10 top-32 size-72 rounded-full bg-[color:var(--neon)]/20 blur-[100px] animate-float" />
      <div
        className="pointer-events-none absolute right-10 bottom-20 size-96 rounded-full bg-[color:var(--neon-2)]/20 blur-[120px] animate-float"
        style={{ animationDelay: "-3s" }}
      />

      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 font-mono text-xs ${
            fsocietyMode ? "border-red-500/30" : ""
          }`}
        >
          <span
            className={`size-1.5 rounded-full ${
              fsocietyMode ? "bg-red-500 animate-pulse" : "bg-[color:var(--neon)] animate-pulse-glow"
            }`}
          />
          <span className="text-muted-foreground">status</span>
          <span className={fsocietyMode ? "text-red-400 font-bold uppercase tracking-wider animate-[blink_1s_step-end_infinite]" : "text-[color:var(--neon)]"}>
            {fsocietyMode ? "/ just a tech." : "/ open to work · just a tech"}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl lg:text-8xl"
        >
          <span className="glow-text">{fsocietyMode ? "We are" : "I build it,"}</span>
          <br />
          <span
            className={fsocietyMode ? "glitch-text-effect font-bold text-red-500" : "animate-gradient bg-clip-text text-transparent"}
            data-text={fsocietyMode ? "fsociety." : "then I secure it."}
            style={{
              backgroundImage: fsocietyMode
                ? "none"
                : "linear-gradient(90deg, var(--neon), var(--neon-3), var(--neon-2), var(--neon))",
              textShadow: fsocietyMode ? "0 0 10px rgba(239, 68, 68, 0.6)" : "inherit"
            }}
          >
            {fsocietyMode ? "fsociety." : "then I secure it."}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mx-auto mt-7 max-w-2xl text-base text-muted-foreground md:text-lg"
        >
          {fsocietyMode ? (
            <>
              Our democracy has been hacked. <span className="text-foreground">Elliot Alderson</span> at{" "}
              <span className="text-red-400 font-bold">Allsafe Cybersecurity</span> by day,
              securing or breaking the conglomerate servers by night.
            </>
          ) : (
            <>
              I'm <span className="text-foreground">Hadhi Havath</span> — full-stack engineer in Python
              & Django, ethical hacker, and AI/ML researcher. Shipping code by day, breaking it by
              night.
            </>
          )}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#work"
            className="group inline-flex items-center gap-2 rounded-full bg-[color:var(--neon)] px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:scale-105"
            style={{ boxShadow: "0 0 40px color-mix(in oklab, var(--neon) 50%, transparent)" }}
          >
            <Sparkles className="size-4" />
            See the work
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-medium transition-all hover:neon-border"
          >
            <Mail className="size-4" />
            Get in touch
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mx-auto mt-14 max-w-2xl text-left"
        >
          <Terminal fsocietyMode={fsocietyMode} setFsocietyMode={setFsocietyMode} />
        </motion.div>
      </motion.div>
    </section>
  );
}

function Marquee() {
  const items = [
    "python",
    "django",
    "ai / ml",
    "ethical hacking",
    "owasp",
    "linux",
    "typescript",
    "react",
    "penetration testing",
    "automation",
  ];
  const row = [...items, ...items];
  return (
    <section className="relative overflow-hidden border-y border-border bg-black/20 py-6">
      <div className="flex animate-marquee whitespace-nowrap">
        {row.map((it, i) => (
          <span
            key={i}
            className="mx-8 flex items-center gap-8 font-mono text-2xl uppercase tracking-widest text-muted-foreground md:text-3xl"
          >
            {it}
            <span className="text-[color:var(--neon)]">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}

function SectionHeading({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <div className="mb-14 max-w-2xl">
      <div className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[color:var(--neon)]">
        <span className="h-px w-8 bg-[color:var(--neon)]" />
        {kicker}
      </div>
      <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">{title}</h2>
      {sub && <p className="mt-4 text-muted-foreground">{sub}</p>}
    </div>
  );
}

function About({ fsocietyMode }: { fsocietyMode: boolean }) {
  const stats = [
    { label: "Public repos", value: profile.publicRepos, icon: Code2 },
    { label: "Building since", value: "2020", icon: Cpu },
    { label: "Status", value: "Hireable", icon: Zap },
    { label: "Domains", value: "Web · Sec · AI", icon: Shield },
  ];
  return (
    <section id="about" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="// about"
          title="Builder & breaker."
          sub="Five years writing software, three of them thinking about how to break it. I prototype products end-to-end in Django and ship hardened, observable services. On the offensive side I research practical attacks against the web stack and document fixes."
        />
        <div className="grid gap-6 md:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-5"
          >
            <div className="glass relative overflow-hidden rounded-2xl p-2 neon-border">
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={profile.avatar}
                  alt="Hadhi Havath avatar"
                  className="aspect-square w-full object-cover grayscale transition-all duration-500 hover:grayscale-0"
                />
                <div className="pointer-events-none absolute inset-0 scanlines" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between font-mono text-xs">
                  <div>
                    <div className="text-[color:var(--neon)]">@{profile.handle}</div>
                    <div className="text-muted-foreground">id // 64075280</div>
                  </div>
                  <div className="rounded-full bg-[color:var(--neon)]/20 px-2 py-1 text-[color:var(--neon)]">
                    LIVE
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-7"
          >
            <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p>
                I'm a full-stack developer who treats{" "}
                <span className="text-foreground">security as a feature</span>, not a checklist.
                Most of my product work lives in Python and Django; my research lives in lab
                notebooks and shell scripts.
              </p>
              <p>
                Lately I've been building AI-assisted tooling — assistants, content detectors, OCR
                pipelines — and auditing the network layer around them. I like products that have a
                <span className="text-foreground"> sharp edge</span> and a clean back of house.
              </p>
            </div>
            
            {/* Mr. Robot 'just a tech' dialogue block */}
            <div className={`mt-6 border-l-2 pl-4 py-2.5 italic text-sm font-mono bg-black/20 rounded-r-lg max-w-lg select-none transition-all duration-500 ${
              fsocietyMode ? "border-red-500 bg-red-950/5 text-red-400" : "border-[color:var(--neon)]/50 text-muted-foreground"
            }`}>
              {fsocietyMode ? (
                <div className="space-y-1">
                  <p className="text-red-400 font-semibold">"I don't care about the money. I'm just a tech, after all."</p>
                  <p className="text-[10px] text-red-500/70 not-italic uppercase tracking-widest font-sans">// Elliot Alderson (Pilot Confrontation)</p>
                </div>
              ) : (
                <div className="space-y-1">
                  <p className="text-[color:var(--neon)] font-semibold">"I build it, then I secure it. I'm just a tech, after all."</p>
                  <p className="text-[10px] text-muted-foreground/60 not-italic uppercase tracking-widest font-sans">// System Audit Log</p>
                </div>
              )}
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="glass rounded-xl p-4 transition-all hover:neon-border"
                >
                  <s.icon className="mb-2 size-5 text-[color:var(--neon)]" />
                  <div className="font-mono text-xl font-semibold">{s.value}</div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stack() {
  return (
    <section id="stack" className="relative px-6 py-32">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          kicker="// stack"
          title="Tools of the trade."
          sub="A working selection — the rest is whatever the problem requires."
        />
        <div className="flex flex-wrap gap-3">
          {stack.map((s, i) => (
            <motion.span
              key={s}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.03 }}
              whileHover={{ y: -4, scale: 1.05 }}
              className="cursor-default rounded-full glass px-5 py-2.5 font-mono text-sm transition-all hover:neon-border"
            >
              {s}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="work" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[color:var(--neon)]">
              <span className="h-px w-8 bg-[color:var(--neon)]" />
              // work
            </div>
            <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
              Selected repositories.
            </h2>
            <p className="mt-4 text-muted-foreground">
              A slice of what's public on GitHub — labs, products, and weekend experiments.
            </p>
          </div>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 font-mono text-sm text-[color:var(--neon)]"
          >
            view all 36 →
          </a>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {repos.map((r, i) => (
            <ProjectCard key={r.name} repo={r} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl glass p-8 md:p-12 lg:p-16 neon-border"
        >
          <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />
          <div className="pointer-events-none absolute -top-20 left-1/2 size-96 -translate-x-1/2 rounded-full bg-[color:var(--neon)]/20 blur-[100px]" />
          
          <div className="relative z-10 grid gap-10 lg:grid-cols-12 items-stretch">
            {/* Left Column: Contact text & details */}
            <div className="lg:col-span-7 flex flex-col justify-between text-left space-y-6">
              <div className="space-y-4">
                <TerminalIcon className="size-10 text-[color:var(--neon)]" />
                <h2 className="font-display text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl leading-none">
                  Let's <span className="glow-text-magenta">ship something</span> together.
                </h2>
                <p className="max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
                  I'm open to full-time roles, freelance builds, and security audits. Get in touch via any of the channels below.
                </p>
              </div>

              <div className="flex flex-wrap gap-3.5">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl glass border-muted-foreground/20 px-5 py-3.5 text-sm font-medium transition-all hover:scale-[1.03] hover:border-[color:var(--neon)] hover:shadow-[0_0_15px_-3px_color-mix(in_oklab,var(--neon)_40%,transparent)]"
                >
                  <Github className="size-4" />
                  github / @hadhihavath
                </a>
                <a
                  href="mailto:mrhavath@gmail.com"
                  className="inline-flex items-center gap-2 rounded-xl glass border-muted-foreground/20 px-5 py-3.5 text-sm font-medium transition-all hover:scale-[1.03] hover:border-[color:var(--neon-3)] hover:shadow-[0_0_15px_-3px_color-mix(in_oklab,var(--neon-3)_40%,transparent)]"
                >
                  <Mail className="size-4" />
                  email / mrhavath@gmail.com
                </a>
                <a
                  href="https://wa.me/919207659510"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl glass border-muted-foreground/20 px-5 py-3.5 text-sm font-medium transition-all hover:scale-[1.03] hover:border-[color:var(--neon)] hover:shadow-[0_0_15px_-3px_color-mix(in_oklab,var(--neon)_40%,transparent)]"
                >
                  <MessageCircle className="size-4" />
                  whatsapp / +919207659510
                </a>
                <a
                  href="https://instagram.com/mr.havath"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl glass border-muted-foreground/20 px-5 py-3.5 text-sm font-medium transition-all hover:scale-[1.03] hover:border-[color:var(--neon-2)] hover:shadow-[0_0_15px_-3px_color-mix(in_oklab,var(--neon-2)_40%,transparent)]"
                >
                  <Instagram className="size-4" />
                  instagram / @mr.havath
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-4 border-t border-border/10 font-mono text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-3.5" /> remote · worldwide
                </span>
                <span className="flex items-center gap-1.5">
                  <Zap className="size-3.5 text-[color:var(--neon)]" /> typically replies within 24h
                </span>
              </div>
            </div>

            {/* Right Column: Dynamic Cyberpunk Google Map */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <InteractiveMap />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer({ fsocietyMode }: { fsocietyMode?: boolean }) {
  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 font-mono text-xs text-muted-foreground md:flex-row">
        <div>© {new Date().getFullYear()} {fsocietyMode ? "fsociety" : "hadhi.havath"} — built & {fsocietyMode ? "liberated." : "secured."}</div>
        <div className="flex items-center gap-2">
          <span className={`size-1.5 rounded-full ${fsocietyMode ? "bg-red-500 animate-pulse" : "bg-[color:var(--neon)] animate-pulse-glow"}`} />
          {fsocietyMode ? "ecorp servers down" : "system online"}
        </div>
      </div>
    </footer>
  );
}
