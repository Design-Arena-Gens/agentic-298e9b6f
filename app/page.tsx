"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type Chapter = {
  id: string;
  title: string;
  narration: string;
  palette: { sky: string; glow: string };
  ambience: string;
};

const chapters: Chapter[] = [
  {
    id: "dawn",
    title: "Dawn Chorus",
    narration:
      "In the hush of a violet dawn, Leo the lion padded softly through a clearing, the jungle dew shimmering like stars at his paws.",
    palette: { sky: "linear-gradient(135deg, #2d1f55 0%, #0f3b5d 60%, #1d855d 100%)", glow: "rgba(255, 183, 77, 0.45)" },
    ambience: "A warm breeze rustles the canopy as birds greet the sunrise."
  },
  {
    id: "grove",
    title: "Hidden Grove",
    narration:
      "From beneath a fern, Rilla the rabbit appeared, ears twitching with excitement as she beckoned Leo toward a secret grove of bioluminescent blooms.",
    palette: { sky: "linear-gradient(135deg, #123447 0%, #0d6136 50%, #72d09c 100%)", glow: "rgba(123, 255, 199, 0.35)" },
    ambience: "Fireflies hum in soft patterns, painting the air with emerald halos."
  },
  {
    id: "canopy",
    title: "Moonlit Canopy",
    narration:
      "Above them, Ori the owl unfurled her wings, scattering droplets of moonlight as she guided her friends toward a shimmering lagoon.",
    palette: { sky: "linear-gradient(135deg, #04092b 0%, #192b6b 50%, #5f52c1 100%)", glow: "rgba(114, 129, 255, 0.35)" },
    ambience: "The moon glides overhead while distant waterfalls applaud."
  },
  {
    id: "promise",
    title: "Promise of Dawn",
    narration:
      "Together they promised to share the lagoon’s song with every creature at sunrise, their laughter echoing like a melody through the jungle night.",
    palette: { sky: "linear-gradient(135deg, #1b1741 0%, #5e1f5f 50%, #f8c861 100%)", glow: "rgba(255, 208, 120, 0.5)" },
    ambience: "The jungle settles into a hush, holding the secret for morning."
  }
];

const chapterDurationMs = 9000;

export default function Page() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % chapters.length);
    }, chapterDurationMs);
    return () => clearInterval(timer);
  }, []);

  const activeChapter = chapters[index];

  const nextChapter = useMemo(() => chapters[(index + 1) % chapters.length], [index]);

  return (
    <main>
      <div className="story-shell">
        <motion.div
          key={activeChapter.id}
          className="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          style={{ backgroundImage: activeChapter.palette.sky }}
        />
        <div className="story-content">
          <AnimatePresence mode="popLayout">
            <motion.section
              key={activeChapter.id}
              className="scene"
              initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -18, filter: "blur(6px)" }}
              transition={{ duration: 0.9, ease: [0.6, 0.01, -0.05, 0.95] }}
            >
              <SceneLights glow={activeChapter.palette.glow} />
              <header className="scene-header">
                <h1>{activeChapter.title}</h1>
                <p className="ambience">{activeChapter.ambience}</p>
              </header>
              <div className="canvas">
                <Lion animateKey={activeChapter.id} />
                <Rabbit animateKey={activeChapter.id} />
                <Owl animateKey={activeChapter.id} />
                <Foreground />
              </div>
              <p className="narration">{activeChapter.narration}</p>
            </motion.section>
          </AnimatePresence>
          <aside className="timeline">
            <span className="sr-only">Next scene</span>
            <div className="next-label">Up Next</div>
            <div className="next-card">
              <div className="dot" />
              <div>
                <h2>{nextChapter.title}</h2>
                <p>{nextChapter.narration}</p>
              </div>
            </div>
            <div className="progress">
              <motion.div
                key={activeChapter.id}
                className="bar"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: chapterDurationMs / 1000, ease: "linear" }}
              />
            </div>
          </aside>
        </div>
      </div>
      <style jsx>{`
        .story-shell {
          position: relative;
          width: min(980px, 100%);
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 24px 80px rgba(0, 0, 0, 0.55);
        }

        .backdrop {
          position: absolute;
          inset: 0;
        }

        .story-content {
          position: relative;
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 0;
          min-height: 540px;
          background: linear-gradient(180deg, rgba(6, 9, 20, 0.8), rgba(5, 9, 18, 0.9));
        }

        .scene {
          position: relative;
          padding: 48px;
          display: flex;
          flex-direction: column;
          gap: 24px;
          color: #f7f8fb;
        }

        .scene-header h1 {
          font-size: clamp(1.75rem, 3vw, 2.6rem);
          letter-spacing: 0.03em;
        }

        .ambience {
          margin-top: 0.4rem;
          opacity: 0.75;
          font-size: 0.95rem;
        }

        .canvas {
          position: relative;
          flex: 1;
          border-radius: 20px;
          overflow: hidden;
          background: rgba(10, 20, 35, 0.55);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .narration {
          font-size: 1.05rem;
          line-height: 1.7;
          max-width: 52ch;
          text-shadow: 0 2px 6px rgba(0, 0, 0, 0.45);
        }

        .timeline {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 38px 32px 32px;
          background: rgba(3, 6, 18, 0.62);
          border-left: 1px solid rgba(255, 255, 255, 0.08);
        }

        .next-label {
          font-size: 0.85rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(231, 236, 255, 0.58);
        }

        .next-card {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 16px;
          border-radius: 16px;
          padding: 18px;
          background: rgba(18, 26, 46, 0.55);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .next-card h2 {
          font-size: 1.15rem;
          margin-bottom: 0.35rem;
        }

        .next-card p {
          font-size: 0.95rem;
          line-height: 1.5;
          opacity: 0.75;
        }

        .dot {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.6);
          margin-top: 6px;
        }

        .progress {
          margin-top: 24px;
          height: 4px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.18);
          overflow: hidden;
        }

        .bar {
          height: 100%;
          background: linear-gradient(90deg, #ffb74d, #72d09c, #728bff);
        }

        @media (max-width: 900px) {
          .story-content {
            grid-template-columns: 1fr;
          }

          .timeline {
            border-left: none;
            border-top: 1px solid rgba(255, 255, 255, 0.08);
          }
        }

        @media (max-width: 640px) {
          main {
            padding: 1.5rem 1rem;
          }

          .story-shell {
            border-radius: 20px;
          }

          .scene {
            padding: 24px;
          }

          .timeline {
            padding: 24px;
          }
        }
      `}</style>
    </main>
  );
}

function SceneLights({ glow }: { glow: string }) {
  return (
    <div className="lights">
      <div className="orb orb-primary" />
      <div className="orb orb-secondary" />
      <style jsx>{`
        .lights {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.8;
        }

        .orb-primary {
          width: 60%;
          height: 60%;
          top: 10%;
          left: 10%;
          background: ${glow};
          animation: float 12s ease-in-out infinite;
        }

        .orb-secondary {
          width: 45%;
          height: 45%;
          bottom: 5%;
          right: 12%;
          background: ${glow};
          opacity: 0.55;
          animation: float 10s ease-in-out infinite reverse;
        }

        @keyframes float {
          0% {
            transform: translate3d(-4%, -2%, 0);
          }
          50% {
            transform: translate3d(6%, 4%, 0);
          }
          100% {
            transform: translate3d(-4%, -2%, 0);
          }
        }
      `}</style>
    </div>
  );
}

function Lion({ animateKey }: { animateKey: string }) {
  return (
    <motion.div
      key={`lion-${animateKey}`}
      className="lion"
      initial={{ x: -40, y: 20, opacity: 0 }}
      animate={{ x: -10, y: 0, opacity: 1 }}
      transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
    >
      <div className="mane" />
      <div className="face">
        <div className="eye eye-left" />
        <div className="eye eye-right" />
        <div className="snout" />
      </div>
      <div className="body">
        <div className="tail" />
        <div className="paw paw-front" />
        <div className="paw paw-back" />
      </div>
      <style jsx>{`
        .lion {
          position: absolute;
          bottom: 12%;
          left: 16%;
          width: 160px;
          height: 160px;
        }

        .mane {
          position: absolute;
          width: 130px;
          height: 130px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, #f9c66d, #d87c32);
          top: 5px;
          left: 18px;
          box-shadow: 0 0 25px rgba(255, 158, 34, 0.35);
        }

        .face {
          position: absolute;
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: #fbe4a2;
          top: 24px;
          left: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 4s ease-in-out;
          animation: lionPulse 6s ease-in-out infinite;
        }

        .eye {
          position: absolute;
          width: 10px;
          height: 10px;
          background: #332b29;
          border-radius: 50%;
          top: 40%;
        }

        .eye-left {
          left: 30%;
        }

        .eye-right {
          right: 30%;
        }

        .snout {
          position: absolute;
          width: 26px;
          height: 22px;
          background: #f4cb8f;
          border-radius: 50% 50% 60% 60%;
          bottom: 22%;
          box-shadow: inset 0 -2px 0 rgba(210, 120, 46, 0.35);
        }

        .body {
          position: absolute;
          bottom: 0;
          left: 40px;
          width: 120px;
          height: 85px;
          border-radius: 50%;
          background: linear-gradient(90deg, #f2b347, #d98631);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
        }

        .tail {
          position: absolute;
          right: -18px;
          top: 26px;
          width: 48px;
          height: 12px;
          border-radius: 999px;
          background: linear-gradient(90deg, rgba(226, 156, 62, 0.8), rgba(148, 86, 35, 0.8));
          transform-origin: left center;
          animation: tailWave 3.8s ease-in-out infinite;
        }

        .tail::after {
          content: "";
          position: absolute;
          right: -12px;
          top: -4px;
          width: 22px;
          height: 22px;
          border-radius: 50% 50% 40% 40%;
          background: #8e5125;
        }

        .paw {
          position: absolute;
          bottom: -18px;
          width: 38px;
          height: 22px;
          border-radius: 50%;
          background: #f5c77f;
          box-shadow: inset 0 -3px 0 rgba(166, 97, 42, 0.32);
        }

        .paw-front {
          left: 20px;
        }

        .paw-back {
          right: 12px;
        }

        @keyframes tailWave {
          0%,
          100% {
            transform: rotate(8deg);
          }
          50% {
            transform: rotate(-14deg);
          }
        }

        @keyframes lionPulse {
          0%,
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(0, -4px, 0) scale(1.03);
          }
        }
      `}</style>
    </motion.div>
  );
}

function Rabbit({ animateKey }: { animateKey: string }) {
  return (
    <motion.div
      key={`rabbit-${animateKey}`}
      className="rabbit"
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.2, ease: [0.65, 0, 0.35, 1] }}
    >
      <div className="ear ear-left" />
      <div className="ear ear-right" />
      <div className="head">
        <div className="eye eye-left" />
        <div className="eye eye-right" />
        <div className="nose" />
        <div className="whisker whisker-left" />
        <div className="whisker whisker-right" />
      </div>
      <div className="body" />
      <div className="foot foot-left" />
      <div className="foot foot-right" />
      <style jsx>{`
        .rabbit {
          position: absolute;
          bottom: 14%;
          right: 20%;
          width: 120px;
          height: 160px;
          filter: drop-shadow(0 16px 32px rgba(12, 18, 32, 0.55));
          animation: rabbitBounce 4.5s ease-in-out infinite;
        }

        .ear {
          position: absolute;
          width: 26px;
          height: 82px;
          border-radius: 999px;
          background: linear-gradient(180deg, #f2f4ff, #c8d9ff);
          border: 2px solid rgba(255, 255, 255, 0.7);
        }

        .ear-left {
          left: 24px;
          transform: rotate(-8deg);
        }

        .ear-right {
          right: 24px;
          transform: rotate(8deg);
        }

        .head {
          position: absolute;
          top: 38px;
          left: 24px;
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: #f6f8ff;
          border: 2px solid rgba(255, 255, 255, 0.7);
        }

        .eye {
          position: absolute;
          top: 38%;
          width: 8px;
          height: 8px;
          background: #27344c;
          border-radius: 50%;
        }

        .eye-left {
          left: 22px;
        }

        .eye-right {
          right: 22px;
        }

        .nose {
          position: absolute;
          bottom: 28%;
          left: 50%;
          transform: translateX(-50%);
          width: 14px;
          height: 10px;
          border-radius: 40% 40% 60% 60%;
          background: #ff7d8d;
        }

        .whisker {
          position: absolute;
          width: 32px;
          height: 2px;
          background: rgba(255, 255, 255, 0.7);
          top: calc(50% + 6px);
        }

        .whisker-left {
          left: -32px;
        }

        .whisker-right {
          right: -32px;
        }

        .body {
          position: absolute;
          bottom: 32px;
          left: 30px;
          width: 62px;
          height: 78px;
          border-radius: 32px;
          background: linear-gradient(180deg, #e8edff, #c8d9ff);
          border: 2px solid rgba(255, 255, 255, 0.6);
        }

        .foot {
          position: absolute;
          bottom: 0;
          width: 36px;
          height: 20px;
          border-radius: 50%;
          background: #f7f9ff;
          border: 2px solid rgba(255, 255, 255, 0.65);
        }

        .foot-left {
          left: 16px;
        }

        .foot-right {
          right: 16px;
        }

        @keyframes rabbitBounce {
          0%,
          100% {
            transform: translateY(0);
          }

          50% {
            transform: translateY(-6px);
          }
        }
      `}</style>
    </motion.div>
  );
}

function Owl({ animateKey }: { animateKey: string }) {
  return (
    <motion.div
      key={`owl-${animateKey}`}
      className="owl"
      initial={{ y: -80, opacity: 0, scale: 0.85 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 1.4, delay: 0.3, ease: [0.6, -0.05, 0.01, 0.99] }}
    >
      <div className="body">
        <div className="eye eye-left" />
        <div className="eye eye-right" />
        <div className="beak" />
      </div>
      <div className="wing wing-left" />
      <div className="wing wing-right" />
      <style jsx>{`
        .owl {
          position: absolute;
          top: 14%;
          right: 26%;
          width: 120px;
          height: 120px;
          animation: owlFloat 7s ease-in-out infinite;
        }

        .body {
          position: relative;
          width: 90px;
          height: 110px;
          margin: 0 auto;
          border-radius: 45px 45px 42px 42px;
          background: radial-gradient(circle at 50% 25%, #f9f6f0, #d3c5b6 70%);
          box-shadow: 0 12px 35px rgba(8, 10, 18, 0.4);
        }

        .eye {
          position: absolute;
          top: 30%;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: radial-gradient(circle, #fff, #f7d997);
          box-shadow: inset 0 0 8px rgba(255, 255, 255, 0.35);
        }

        .eye::after {
          content: "";
          position: absolute;
          top: 8px;
          left: 8px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #1e1b30;
        }

        .eye-left {
          left: 16px;
        }

        .eye-right {
          right: 16px;
        }

        .beak {
          position: absolute;
          bottom: 32%;
          left: 50%;
          transform: translateX(-50%);
          width: 16px;
          height: 22px;
          background: #f3ac4b;
          clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
        }

        .wing {
          position: absolute;
          top: 32px;
          width: 48px;
          height: 90px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.85), rgba(120, 110, 160, 0.65));
          filter: brightness(1.1);
          animation: flap 3.6s ease-in-out infinite;
        }

        .wing-left {
          left: -10px;
          transform-origin: top right;
        }

        .wing-right {
          right: -10px;
          transform-origin: top left;
          animation-delay: 0.3s;
        }

        @keyframes flap {
          0%,
          100% {
            transform: rotate(14deg);
          }
          50% {
            transform: rotate(-10deg);
          }
        }

        @keyframes owlFloat {
          0%,
          100% {
            transform: translateY(-8px);
          }
          50% {
            transform: translateY(6px);
          }
        }
      `}</style>
    </motion.div>
  );
}

function Foreground() {
  return (
    <div className="foreground">
      <div className="grass grass-left" />
      <div className="grass grass-right" />
      <div className="glow" />
      <style jsx>{`
        .foreground {
          position: absolute;
          inset: 0;
        }

        .grass {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 160px;
          background: linear-gradient(180deg, rgba(18, 38, 44, 0), rgba(8, 16, 20, 0.75) 55%, rgba(5, 12, 14, 0.95));
          mask-image: radial-gradient(circle, rgba(0, 0, 0, 1) 45%, rgba(0, 0, 0, 0) 100%);
          animation: sway 12s ease-in-out infinite;
        }

        .grass-left {
          transform-origin: left bottom;
          animation-delay: -2s;
        }

        .grass-right {
          transform-origin: right bottom;
          animation-delay: 4s;
        }

        .glow {
          position: absolute;
          bottom: 30%;
          left: 50%;
          transform: translateX(-50%);
          width: 40%;
          height: 40%;
          background: radial-gradient(circle, rgba(255, 246, 200, 0.15) 0%, rgba(255, 246, 200, 0) 70%);
          animation: pulse 8s ease-in-out infinite;
        }

        @keyframes sway {
          0%,
          100% {
            transform: skewX(0deg);
          }
          50% {
            transform: skewX(2deg);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 0.6;
          }
          50% {
            opacity: 0.9;
          }
        }
      `}</style>
    </div>
  );
}
