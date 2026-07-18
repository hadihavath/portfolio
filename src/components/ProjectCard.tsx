/* mr.havath */
import { useRef } from "react";
import { motion } from "framer-motion";
import { Github, Star, GitFork, Info } from "lucide-react";
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

const langGradients: Record<string, string> = {
  Python: "from-blue-600/30 to-sky-600/10",
  JavaScript: "from-yellow-600/30 to-amber-600/10",
  TypeScript: "from-blue-500/30 to-indigo-600/10",
  HTML: "from-orange-500/30 to-red-600/10",
  PHP: "from-purple-500/30 to-indigo-600/10",
  Java: "from-red-600/30 to-orange-600/10",
  C: "from-slate-500/30 to-blue-700/10",
  Shell: "from-emerald-500/30 to-teal-700/10",
  Markdown: "from-gray-500/30 to-zinc-700/10",
};

export function ProjectCard({ repo, index }: { repo: Repo; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4, delay: index * 0.03 }}
          className="group relative block overflow-hidden rounded-xl glass p-5 transition-all duration-300 hover:realistic-hover cursor-pointer text-left select-none"
        >
          <div className="relative flex flex-col gap-3">
            {/* Realistic CSS Gradient Card Banner */}
            <div
              className={`relative h-28 w-full overflow-hidden rounded-lg border border-border/20 bg-gradient-to-br ${langGradients[repo.language || ""] || "from-slate-700/30 to-zinc-800/10"} flex items-center justify-center p-4`}
            >
              <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]" />
              <span className="font-mono text-[10px] font-bold text-muted-foreground/60 uppercase tracking-widest select-none">
                // {repo.language || "Source"}
              </span>
            </div>

            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2">
                <Github className="size-5 text-primary" />
                <h3 className="font-mono text-base font-semibold tracking-tight">{repo.name}</h3>
              </div>
              <Info className="size-4 text-muted-foreground transition-colors group-hover:text-primary" />
            </div>

            <p className="line-clamp-2 min-h-[2.5rem] text-sm text-muted-foreground">
              {repo.description || "Experimental build — code, notes & repository archive."}
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

      <DialogContent className="glass border border-border/40 bg-zinc-950/95 text-foreground max-w-md p-6 font-mono">
        <DialogHeader>
          <DialogTitle className="text-lg flex items-center gap-2 text-foreground font-semibold">
            <Github className="size-5 text-primary" />
            {repo.name}
          </DialogTitle>
          <DialogDescription className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">
            [REPOSITORY STATUS: STABLE / PRIVATE]
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 text-sm mt-4 border-t border-border/20 pt-4 leading-relaxed">
          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground bg-black/20 border border-border/10 p-2.5 rounded-lg">
            <div>
              <span className="text-foreground font-semibold">LANGUAGE:</span>{" "}
              {repo.language || "Unknown"}
            </div>
            <div>
              <span className="text-foreground font-semibold">STARS:</span> {repo.stars}
            </div>
            <div>
              <span className="text-foreground font-semibold">FORKS:</span> {repo.forks}
            </div>
            <div>
              <span className="text-foreground font-semibold">BUILD STATUS:</span>{" "}
              <span className="text-emerald-400 font-semibold">STABLE</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-primary text-xs font-semibold block uppercase tracking-wider">
              // PROJECT OVERVIEW
            </span>
            <p className="text-muted-foreground bg-black/10 p-3 rounded-lg border border-border/5 text-xs leading-relaxed">
              {repo.description || "Experimental build — code, notes & repository archive."}
            </p>
          </div>

          <div className="space-y-1.5">
            <span className="text-accent text-xs font-semibold block uppercase tracking-wider">
              // REPOSITORY NOTES
            </span>
            <ul className="list-disc list-inside text-[11px] text-muted-foreground/80 space-y-1 bg-black/15 p-3 rounded-lg border border-border/5">
              <li>This repository is currently maintained privately by Hadhi Havath.</li>
              <li>Documentation hooks and releases have been archived.</li>
              <li>Please reach out via email to request access or collaboration.</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
