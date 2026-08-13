/* mr.havath */
import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import {
  Github,
  Mail,
  MapPin,
  Sparkles,
  Shield,
  Cpu,
  Code2,
  ArrowUpRight,
  Zap,
  Instagram,
  MessageCircle,
} from "lucide-react";
import { Terminal } from "@/components/Terminal";
import { ProjectCard } from "@/components/ProjectCard";
import { profile, repos, stack } from "@/data/profile";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hadhi Havath — Full Stack Developer & Systems Engineer" },
      {
        name: "description",
        content:
          "Portfolio of Hadhi Havath — Python & Django full-stack developer, software engineer, and systems auditor.",
      },
      { property: "og:title", content: "Hadhi Havath — Software Engineer" },
      {
        property: "og:description",
        content: "Full Stack Developer · Python & Django · Systems Auditor.",
      },
      { property: "og:image", content: profile.avatar },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: profile.avatar },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    console.log("🚀 [System Diagnostics] Portfolio loaded successfully.");
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Stack />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}

function Nav() {
  const links = [
    { href: "#about", label: "About" },
    { href: "#stack", label: "Stack" },
    { href: "#work", label: "Work" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <header className="fixed inset-x-0 top-0 z-30">
      <div className="mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-full glass px-5 py-3 shadow-sm">
        <a href="#top" className="flex items-center gap-2 font-mono text-sm">
          <span className="size-2 rounded-full bg-primary animate-pulse" />
          <span className="font-semibold text-foreground">hadhi.havath</span>
        </a>
        <nav className="hidden gap-6 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-mono text-primary transition-all hover:bg-primary/20"
        >
          <Github className="size-3.5" />
          github
          <ArrowUpRight className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      </div>
    </header>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-screen items-center justify-center px-6 pt-28"
    >
      {/* Subtle realistic gradient light source */}
      <div className="pointer-events-none absolute left-1/4 top-1/4 size-96 rounded-full bg-primary/5 blur-[120px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/4 size-96 rounded-full bg-accent/5 blur-[120px]" />

      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 font-mono text-xs"
        >
          <span className="size-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-muted-foreground">status</span>
          <span className="text-primary font-semibold">/ open to opportunities</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl lg:text-8xl"
        >
          <span>I build clean,</span>
          <br />
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            stable applications.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg"
        >
          I'm <span className="text-foreground font-semibold">Hadhi Havath</span> — full-stack
          engineer specializing in Python & Django, application security, and clean system
          integrations. Prototyping robust products with stable, maintainable backends.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#work"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:scale-105 shadow-md hover:shadow-lg"
          >
            <Sparkles className="size-4" />
            See the work
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-medium transition-all hover:border-primary/50"
          >
            <Mail className="size-4" />
            Get in touch
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mx-auto mt-12 max-w-2xl text-left"
        >
          <Terminal />
        </motion.div>
      </motion.div>
    </section>
  );
}

function Marquee() {
  const items = [
    "python",
    "django",
    "web development",
    "software engineering",
    "clean code",
    "linux",
    "typescript",
    "react",
    "api security",
    "automation",
  ];
  const row = [...items, ...items];
  return (
    <section className="relative overflow-hidden border-y border-border bg-black/5 py-5">
      <div className="flex animate-marquee whitespace-nowrap">
        {row.map((it, i) => (
          <span
            key={i}
            className="mx-8 flex items-center gap-6 font-mono text-lg uppercase tracking-wider text-muted-foreground md:text-xl"
          >
            {it}
            <span className="text-primary opacity-60">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}

function SectionHeading({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <div className="mb-12 max-w-2xl text-left">
      <div className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-primary font-semibold">
        <span className="h-px w-6 bg-primary" />
        {kicker}
      </div>
      <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
      {sub && <p className="mt-4 text-muted-foreground text-sm leading-relaxed">{sub}</p>}
    </div>
  );
}

function About() {
  const stats = [
    { label: "Public repos", value: profile.publicRepos, icon: Code2 },
    { label: "Building since", value: "2020", icon: Cpu },
    { label: "Status", value: "Available", icon: Zap },
    { label: "Focus Areas", value: "Web · Sec · Backend", icon: Shield },
  ];
  return (
    <section id="about" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="// profiles"
          title="Engineering stable web software."
          sub="With five years of programming experience, my focus is building scalable web platforms using Python and Django. I value performance, robust security practices, and clean codebase architecture."
        />
        <div className="grid gap-8 md:grid-cols-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-5"
          >
            <div className="glass relative overflow-hidden rounded-2xl p-2 shadow-md">
              <div className="relative overflow-hidden rounded-xl">
                <img
                  src={profile.avatar}
                  alt="Hadhi Havath profile"
                  className="aspect-square w-full object-cover transition-all duration-500 hover:scale-[1.02]"
                />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between font-mono text-xs bg-black/60 backdrop-blur-md p-2.5 rounded-lg border border-border/40">
                  <div>
                    <div className="text-primary font-bold">@{profile.handle}</div>
                    <div className="text-muted-foreground text-[10px]">active developer</div>
                  </div>
                  <div className="rounded-full bg-primary/20 px-2.5 py-0.5 text-primary text-[10px] font-semibold">
                    ONLINE
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-7 text-left"
          >
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                I treat{" "}
                <span className="text-foreground font-semibold">
                  maintainability and reliability
                </span>{" "}
                as core design principles. The majority of my applications are shipped with cleanly
                decoupled backend APIs, structured database layers, and responsive UI components.
              </p>
              <p>
                Lately, I've been working on custom internal dashboards, automation systems, data
                parsing utilities, and auditing web integrations to keep workflows performant and
                secure.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="glass rounded-xl p-4 transition-all hover:realistic-hover"
                >
                  <s.icon className="mb-2 size-5 text-primary" />
                  <div className="font-mono text-lg font-bold text-foreground">{s.value}</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground/80 mt-1">
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
    <section id="stack" className="relative px-6 py-28">
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          kicker="// tech stack"
          title="Core Technologies & Frameworks."
          sub="A detailed breakdown of my primary development toolkit."
        />
        <div className="flex flex-wrap gap-2.5">
          {stack.map((s, i) => (
            <motion.span
              key={s}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: i * 0.02 }}
              className="cursor-default rounded-full glass px-4 py-2 font-mono text-xs text-muted-foreground transition-all hover:border-primary/50 hover:text-foreground"
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
    <section id="work" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 text-left">
          <div className="max-w-2xl">
            <div className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-primary font-semibold">
              <span className="h-px w-6 bg-primary" />
              // repositories
            </div>
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              Project Archive.
            </h2>
            <p className="mt-4 text-muted-foreground text-sm leading-relaxed">
              A comprehensive selection of open-source utilities, tools, and experimental
              repositories.
            </p>
          </div>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-1 font-mono text-xs text-primary hover:underline"
          >
            view all on GitHub →
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
    <section id="contact" className="relative px-6 py-28">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl glass p-8 md:p-12 shadow-lg"
        >
          {/* Subtle accent gradients */}
          <div className="pointer-events-none absolute -top-20 left-1/2 size-96 -translate-x-1/2 rounded-full bg-primary/5 blur-[100px]" />

          <div className="relative z-10 flex flex-col items-center text-center space-y-8">
            <div className="space-y-4 flex flex-col items-center">
              <Mail className="size-10 text-primary" />
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl leading-none text-foreground">
                Let's collaborate on your next project.
              </h2>
              <p className="max-w-2xl text-base text-muted-foreground leading-relaxed">
                I am open to full-time engineering roles, codebase reviews, and freelance projects.
                Get in touch through the channels below.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl glass border-border/40 px-5 py-3 text-sm font-medium transition-all hover:scale-[1.01] hover:border-primary hover:shadow-sm"
              >
                <Github className="size-4" />
                github / @hadhihavath
              </a>
              <a
                href="mailto:mrhavath@gmail.com"
                className="inline-flex items-center gap-2 rounded-xl glass border-border/40 px-5 py-3 text-sm font-medium transition-all hover:scale-[1.01] hover:border-primary hover:shadow-sm"
              >
                <Mail className="size-4" />
                email / mrhavath@gmail.com
              </a>
              <a
                href="https://wa.me/919207659510"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl glass border-border/40 px-5 py-3 text-sm font-medium transition-all hover:scale-[1.01] hover:border-primary hover:shadow-sm"
              >
                <MessageCircle className="size-4" />
                whatsapp / +919207659510
              </a>
              <a
                href="https://instagram.com/hadhihavath"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl glass border-border/40 px-5 py-3 text-sm font-medium transition-all hover:scale-[1.01] hover:border-primary hover:shadow-sm"
              >
                <Instagram className="size-4" />
                instagram / @hadhihavath
              </a>
            </div>

            <div className="w-full flex flex-wrap justify-center items-center gap-x-6 gap-y-2 pt-6 border-t border-border/10 font-mono text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin className="size-3.5" /> remote · worldwide
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="size-3.5 text-primary" /> typically replies within 24h
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border/30 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 font-mono text-xs text-muted-foreground md:flex-row">
        <div>© {new Date().getFullYear()} hadhi.havath — Software Engineer.</div>
        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-primary animate-pulse" />
          portfolio online
        </div>
      </div>
    </footer>
  );
}
