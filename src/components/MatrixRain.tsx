/* mr.havath */
import { useEffect, useRef } from "react";

interface MatrixRainProps {
  fsocietyMode?: boolean;
}

export function MatrixRain({ fsocietyMode = false }: MatrixRainProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    let raf = 0;

    const chars = fsocietyMode
      ? "01FSOCIETYECORPhellofriend59".split("")
      : "01ハドアク#@$%abcdef</>HACK".split("");
    const fontSize = 14;
    let cols = 0;
    let drops: number[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      cols = Math.floor(canvas.width / fontSize);
      drops = new Array(cols).fill(1);
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.fillStyle = "rgba(10, 12, 20, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = fsocietyMode ? "#ff003c" : "#5cffb0";
      ctx.font = `${fontSize}px JetBrains Mono, monospace`;

      for (let i = 0; i < cols; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [fsocietyMode]);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full opacity-25" aria-hidden />;
}
