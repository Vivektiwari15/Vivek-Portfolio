"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      document.body.style.setProperty("--x", `${e.clientX}px`);
      document.body.style.setProperty("--y", `${e.clientY}px`);
    };

    const activate = () => setActive(true);
    const deactivate = () => setActive(false);

    window.addEventListener("mousemove", move);

    document.querySelectorAll(".glass-button, .depth-button").forEach((el) => {
      el.addEventListener("mouseenter", activate);
      el.addEventListener("mouseleave", deactivate);
    });

    return () => {
      window.removeEventListener("mousemove", move);
      document
        .querySelectorAll(".glass-button, .depth-button")
        .forEach((el) => {
          el.removeEventListener("mouseenter", activate);
          el.removeEventListener("mouseleave", deactivate);
        });
    };
  }, []);

  return (
    <>
      <div
        className="fixed pointer-events-none z-[999999]"
        style={{
          left: pos.x,
          top: pos.y,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          className="w-3 h-3 rounded-full transition-transform duration-150"
          style={{
            backgroundColor: "var(--cursor-color)",
            transform: active ? "scale(1.6)" : "scale(1)",
          }}
        />
      </div>
      <div
        className="fixed pointer-events-none z-[999998] transition-opacity duration-200"
        style={{
          left: pos.x,
          top: pos.y,
          transform: "translate(-50%, -50%)",
          opacity: active ? 1 : 0,
        }}
      >
        <div
          className="w-28 h-28 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 35%, transparent 70%)",
            mixBlendMode: "overlay",
          }}
        />
      </div>
    </>
  );
}
