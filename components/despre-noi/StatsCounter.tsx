"use client";

import { useEffect, useRef, useState } from "react";
import Container from "@/components/ui/Container";

const stats = [
  { value: 10, suffix: "+", label: "Ani de Experiență" },
  { value: 500, suffix: "+", label: "Mașini Vândute" },
  { value: 98, suffix: "%", label: "Clienți Mulțumiți" },
  { value: 50, suffix: "+", label: "Branduri Premium" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(interval);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function StatsCounter() {
  return (
    <section className="bg-[#D90429] py-14">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-4xl md:text-5xl font-black text-white">
                <Counter target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-white/80 text-sm font-medium uppercase tracking-widest mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
