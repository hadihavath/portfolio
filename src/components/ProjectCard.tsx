/* mr.havath */
import { useRef } from "react";
import { motion } from "framer-motion";
import { Github, Star, GitFork, Shield } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export type Repo = {
  name: string;
  description: string;
  language: string | null;
  url: string;
  stars: number;
  forks: number;
  topics?: string[];
};

const langColor: Record<string, string> = {
  Python: "#3b82f6",
  JavaScript: "#facc15",
  TypeScript: "#60a5fa",
  HTML: "#f97316",
  PHP: "#a78bfa",
  Java: "#ef4444",
  C: "#94a3b8",
  Shell: "#22c55e",
  Markdown: "#6b7280",
};

export function ProjectCard({ repo, index }: { repo: Repo; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<{ left: number; top: number } | null>(null);

  const handleMouseEnter = () => {
    if (cardRef.current) {
      const r = cardRef.current.getBoundingClientRect();
      rectRef.current = { left: r.left, top: r.top };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (cardRef.current && rectRef.current) {
      const x = e.clientX - rectRef.current.left;
      const y = e.clientY - rectRef.current.top;
      cardRef.current.style.setProperty("--mx", `${x}px`);
      cardRef.current.style.setProperty("--my", `${y}px`);
    }
  };

  const handleMouseLeave = () => {
    rectRef.current = null;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
          whileHover={{ y: -6 }}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="group relative block overflow-hidden rounded-xl glass p-5 transition-shadow hover:neon-border cursor-pointer text-left select-none"
        >
          <div
            className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(400px circle at var(--mx,50%) var(--my,50%), color-mix(in oklab, var(--neon) 18%, transparent), transparent 60%)",
            }}
          />
          <div className="relative flex flex-col gap-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <Github className="size-5 text-[color:var(--neon)]" />
                <h3 className="font-mono text-lg font-semibold tracking-tight">{repo.name}</h3>
              </div>
              <Shield className="size-4 text-muted-foreground transition-colors group-hover:text-red-400" />
            </div>
            <p className="line-clamp-2 min-h-[2.5rem] text-sm text-muted-foreground">
              {repo.description || "Experimental build — code, notes & lab work."}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              {repo.language && (
                <span className="flex items-center gap-1.5">
                  <span
                    className="size-2.5 rounded-full"
                    style={{ background: langColor[repo.language] || "#888" }}
                  />
                  {repo.language}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Star className="size-3.5" />
                {repo.stars}
              </span>
              <span className="flex items-center gap-1">
                <GitFork className="size-3.5" />
                {repo.forks}
              </span>
            </div>
          </div>
        </motion.div>
      </DialogTrigger>
      
      <DialogContent className="glass border border-border/40 bg-black/95 text-foreground max-w-md p-6 font-mono">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2 text-foreground font-semibold">
            <Github className="size-5 text-[color:var(--neon)]" />
            {repo.name}
          </DialogTitle>
          <DialogDescription className="text-[10px] text-red-500/80 uppercase tracking-widest mt-1">
            [ACCESS STATUS: RESTRICTED / PRIVATE]
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 text-sm mt-4 border-t border-border/20 pt-4 leading-relaxed">
          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground bg-black/40 border border-border/10 p-2.5 rounded-lg">
            <div>
              <span className="text-foreground font-semibold">LANGUAGE:</span> {repo.language || "Unknown"}
            </div>
            <div>
              <span className="text-foreground font-semibold">STARS:</span> {repo.stars}
            </div>
            <div>
              <span className="text-foreground font-semibold">FORKS:</span> {repo.forks}
            </div>
            <div>
              <span className="text-foreground font-semibold">SECURITY:</span> <span className="text-red-400 font-semibold animate-pulse">SECURE LOCK</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-[color:var(--neon)] text-xs font-semibold block uppercase tracking-wider">// PROJECT OVERVIEW</span>
            <p className="text-muted-foreground bg-black/20 p-3 rounded-lg border border-border/5 text-xs leading-relaxed">
              {repo.description || "Experimental build — code, notes & lab work."}
            </p>
          </div>

          <div className="space-y-1.5">
            <span className="text-[color:var(--neon-3)] text-xs font-semibold block uppercase tracking-wider">// SECURE ARCHIVE LOGS</span>
            <ul className="list-disc list-inside text-[11px] text-muted-foreground/80 space-y-1 bg-black/30 p-3 rounded-lg border border-border/5">
              <li>Source files are private for confidentiality.</li>
              <li>Public redirection hooks have been disabled.</li>
              <li>Contact Hadhi Havath to request declassification.</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
