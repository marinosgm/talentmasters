"use client";

import { useEffect, useState } from "react";

const LINES = [
"Leadership reveals itself in critical decisions.",
  "Context beats credentials.",
  "Results decide. Not resumes.",
  "Capability reveals itself under pressure."
];

export function StrategicStackTypewriter() {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const currentLine = LINES[lineIndex];

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (charIndex < currentLine.length) {
      // typing
      timeout = setTimeout(() => {
        setCharIndex((prev) => prev + 1);
      }, 35);
    } else {
      // line finished
      timeout = setTimeout(() => {
        setVisibleLines((prev) => {
          const next = [...prev, currentLine];
          return next.slice(-2); // keep last 2 lines only
        });
        setCharIndex(0);
        setLineIndex((prev) => (prev + 1) % LINES.length);
      }, 1200);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, currentLine, lineIndex]);

  return (
    <div className="space-y-1 text-lg font-medium tracking-tight text-orange-400">
      {visibleLines.map((line, i) => (
        <div
          key={i}
          className={i === 0 ? "opacity-60" : "opacity-100"}
        >
          {line}
        </div>
      ))}

      <div>
        {currentLine.slice(0, charIndex)}
        <span className="ml-1 animate-pulse opacity-70">▍</span>
      </div>
    </div>
  );
}
