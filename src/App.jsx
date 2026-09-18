import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import CEECognitiveCore from "./components/CEECognitiveCore";
import {
  ParticleExplosion, MatrixRain, HolographicShatter,
  Wormhole, NeuralNetwork, PlasmaWave
} from "./components/SlideTransition";
import vistasLogo from "./assets/vistas-logo.png";
import architectureImg from "./assets/architecture diagram.png";
import flowchartImg from "./assets/flowchart.png";
import flow1Img from "./assets/flow1.drawio.png";
import flow2Img from "./assets/flow2.drawio.png";
import ani1Vid from "./assets/ani1.webm";
import ani2Vid from "./assets/ani2.webm";
import timelineImg from "./assets/project timeline.jpg";
import demoVideo from "./assets/working-demo.mp4";
import demoVideo2 from "./assets/working-demo2.mp4";
import "./App.css";

const slides = [
  "Title",                        // 0
  "Abstract",                     // 1
  "Introduction",                 // 2
  "Problem Statement",            // 3
  "Objective",                    // 4
  "Literature Survey",            // 5
  "Research Gap",                 // 6
  "Proposed Methodology",         // 7
  "System Architecture",          // 8
  "Flowchart",                    // 9
  "Breakdown of Flowchart 1",     // 10
  "Breakdown of Flowchart 2",     // 11
  "Hardware & Software Requirements", // 12
  "Working Demo",                 // 13
  "Working Demo 2",               // 14
  "Challenges & Solutions",       // 15
  "Project Timeline",             // 16
  "Future Work",                  // 17
  "Conclusion",                   // 18
  "References",                   // 19
  "Thank You",                    // 20
];

const TRANSITION_TYPES = [
  "particle",   // 0→1
  "matrix",     // 1→2
  "shatter",    // 2→3
  "wormhole",   // 3→4
  "neural",     // 4→5
  "plasma",     // 5→6
  "particle",   // 6→7
  "shatter",    // 7→8
  "wormhole",   // 8→9
  "matrix",     // 9→10
  "neural",     // 10→11
  "plasma",     // 11→12
  "particle",   // 12→13
  "wormhole",   // 13→14
  "matrix",     // 14→15
  "shatter",    // 15→16
  "neural",     // 16→17
  "plasma",     // 17→18
  "matrix",     // 18→19
  "particle",   // 19→20
];

const TRANSITION_COMPONENTS = {
  particle: ParticleExplosion,
  matrix:   MatrixRain,
  shatter:  HolographicShatter,
  wormhole: Wormhole,
  neural:   NeuralNetwork,
  plasma:   PlasmaWave,
};



const slideVariants = {
  initial: { opacity: 0, y: 40, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -30, scale: 1.01 },
};

const slideTransition = { duration: 0.65, ease: [0.22, 1, 0.36, 1] };

function SlideHeader({ eyebrow, title, delay = 0 }) {
  return (
    <>
      <motion.div className="slide-eyebrow"
        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: delay + 0.2 }}>
        {eyebrow}
      </motion.div>
      <motion.h2 className="content-slide-title"
        initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: delay + 0.3 }}>
        {title}
      </motion.h2>
      <motion.div className="content-title-line"
        initial={{ width: 0 }} animate={{ width: "110px" }}
        transition={{ duration: 0.6, delay: delay + 0.5 }} />
    </>
  );
}

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [txType, setTxType] = useState("glitch");
  const pendingSlide = useRef(null);

  const goToSlide = (next) => {
    if (transitioning || next === currentSlide) return;
    const from = Math.min(currentSlide, next);
    setTxType(TRANSITION_TYPES[from] ?? "glitch");
    pendingSlide.current = next;
    setTransitioning(true);
  };

  const handleTransitionDone = () => {
    if (pendingSlide.current !== null) {
      setCurrentSlide(pendingSlide.current);
      pendingSlide.current = null;
    }
    setTransitioning(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        goToSlide(Math.min(currentSlide + 1, slides.length - 1));
      }
      if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        goToSlide(Math.max(currentSlide - 1, 0));
      }
      if (e.key === "Home") goToSlide(0);
      if (e.key === "End") goToSlide(slides.length - 1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide, transitioning]);

  const progressWidth = `${((currentSlide + 1) / slides.length) * 100}%`;

  return (
    <main className="presentation">
      <div className="background-grid" />
      <div className="background-glow glow-one" />
      <div className="background-glow glow-two" />
      <div className="scan-line" />

      <AnimatePresence mode="wait">

        {/* ── SLIDE 1 — TITLE ── */}
        {currentSlide === 0 && (
          <motion.section key="cover" className="cover-slide"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.5 }}>

            {/* GRAND ENTRANCE FLASH */}
            <motion.div className="cover-boot-flash"
              initial={{ opacity: 1 }} animate={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }} />
            <motion.div className="cover-boot-scanline"
              initial={{ top: 0 }} animate={{ top: "100vh" }}
              transition={{ duration: 0.9, delay: 0.15, ease: "linear" }} />

            <div className="cover-content">

              {/* LEFT */}
              <div className="cover-left">
                <motion.div className="cee-small"
                  initial={{ opacity: 0, x: -25 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8, duration: 0.6 }}>CEE</motion.div>

                <motion.h1 className="project-title"
                  initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}>
                  Cognitive<br />Evolution<br />Engine
                </motion.h1>

                <motion.div className="title-accent"
                  initial={{ width: 0 }} animate={{ width: "160px" }}
                  transition={{ delay: 1.35, duration: 0.7 }} />

                <motion.p className="project-subtitle"
                  initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.7 }}>
                  A Middleware Framework for Self-Evolving<br />
                  Physical AI Robots Using Reflective<br />
                  Knowledge Intelligence
                </motion.p>

                <motion.div className="cover-tags"
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.55, duration: 0.6 }}>
                  {["Physical AI","Edge Computing","Knowledge Graph","Reflective Reasoning","ROS 2"].map(t => (
                    <span key={t} className="cover-tag">{t}</span>
                  ))}
                </motion.div>

                <motion.div className="cover-bottom"
                  initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.65, duration: 0.7 }}>

                  <div className="cover-info-block">
                    <div className="cover-info-label">TEAM MEMBERS</div>
                    <div className="cover-members">
                      <div><strong>SWARNA M</strong><span>23619139</span></div>
                      <div><strong>VISHAL S S M</strong><span>23619143</span></div>
                      <div><strong>AANANDHA SUBASH S</strong><span>23619147</span></div>
                    </div>
                  </div>

                  <div className="cover-info-block">
                    <div className="cover-info-label">INTERNAL GUIDES</div>
                    <strong className="cover-guide-name">MS. B. REKHA DEVI</strong>
                    <span className="cover-guide-sub">M.Tech — Asst. Professor, VISTAS</span>
                    <strong className="cover-guide-name" style={{ marginTop: "8px" }}>MS. B. USHA</strong>
                    <span className="cover-guide-sub">M.Sc., M.Phil., M.Tech., SLET — Asst. Professor</span>
                  </div>

                </motion.div>
              </div>

              {/* RIGHT */}
              <div className="cover-right">
                <motion.div className="research-badge"
                  initial={{ opacity: 0, x: 35 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1, duration: 0.7 }}>
                  <span className="research-label">RESEARCH PROJECT</span>
                  <strong>BATCH 13</strong>
                </motion.div>

                <motion.div className="visual-section"
                  initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.85, duration: 1.1, ease: "easeOut" }}>
                  <div className="visual-ring ring-one" />
                  <div className="visual-ring ring-two" />
                  <div className="visual-ring ring-three" />
                  <div className="visual-glow" />
                  <CEECognitiveCore />
                  <motion.div className="visual-label label-top"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: 1.6 }}>COGNITIVE CORE</motion.div>
                </motion.div>

                <motion.div className="cover-stats"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.7, duration: 0.6 }}>
                  <div className="cover-stat"><strong>7</strong><span>Modules</span></div>
                  <div className="cover-stat-divider" />
                  <div className="cover-stat"><strong>ROS 2</strong><span>Platform</span></div>
                  <div className="cover-stat-divider" />
                  <div className="cover-stat"><strong>Edge AI</strong><span>Deployment</span></div>
                </motion.div>
              </div>

            </div>

            <div className="slide-indicator">
              <span>01</span><div /><span>{slides.length}</span>
            </div>
            <div className="progress-track">
              <motion.div className="progress-fill"
                initial={{ width: 0 }} animate={{ width: progressWidth }}
                transition={{ delay: 1.7, duration: 1 }} />
            </div>
          </motion.section>
        )}

        {/* ── SLIDES 2–22 ── */}
        {currentSlide > 0 && (
          <motion.section key={currentSlide} className="content-page"
            variants={slideVariants} initial="initial" animate="animate" exit="exit"
            transition={slideTransition}>

            {/* slide number watermark */}
            <div className="slide-watermark">
              {String(currentSlide + 1).padStart(2, "0")}
            </div>

            {/* top accent line */}
            <motion.div className="slide-top-line"
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }} />

            <div className="slide-inner">

              {/* ── SLIDE 2 — ABSTRACT ── */}
              {currentSlide === 1 && (
                <div className="abstract-layout">
                  <SlideHeader eyebrow="COGNITIVE EVOLUTION ENGINE" title="Abstract" />
                  <motion.p className="abstract-body"
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}>
                    Contemporary autonomous robots mainly perform better by retraining machine learning models and gathering huge amounts of data. These methods improve accuracy on certain jobs, but they fail to give systems an understanding of what they do and the errors made, the ability to obtain reusable knowledge, and the ability to self-adapt to changing environments (context). This means that robots are very dependent on the current tasks they perform and need human support in their work.
                    In this Project, we present <span className="highlight">Cognitive Evolution Engine (CEE)</span>, which is a system designed to help robots think and change their knowledge through cognition instead of constant retraining of machine learning models. Located between the level of perception and decision making, CEE converts raw sensory information into a structured operational knowledge base with the help of several components: Experience Interpreter, Reflective Reasoning Engine, Operational Knowledge Graph, Knowledge Evolution Engine, Intelligent Forgetting Module, Curiosity Engine, and Knowledge Transfer Engine.

                    The middleware presented has been created to work with mobile robots built on ROS 2 technology, which are equipped with many distinct types of sensors, making it possible for them to undergo continuous cognitive adaptation as a result of interacting with the real world. To show how the robot learns autonomously from its navigation failures and modifies its knowledge base accordingly so it can use this knowledge later, a warehouse navigation route is used as an example.
                    In contrast to traditional learning processes that revolve around making predictions, CEE focuses on explanation, knowledge evolution, and long-term adaptability through reflective reasoning. CEE allows robots to continuously gather knowledge, refine it, and employ it in different situations, leading the way for lifelong robotics intelligence.
                  </motion.p>
                </div>
              )}

              {/* ── SLIDE 3 — INTRODUCTION ── */}
              {currentSlide === 2 && (
                <div className="intro-layout">
                  <SlideHeader eyebrow="COGNITIVE EVOLUTION ENGINE" title="Introduction" />
                  <div className="intro-grid">
                    <motion.div className="intro-left"
                      initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}>
                      <div className="mini-label">ROBOTICS LANDSCAPE</div>
                      <h3>Autonomous robots are becoming <span className="highlight">increasingly intelligent.</span></h3>
                      <p>Autonomous robots are increasingly deployed in warehouse automation, healthcare, manufacturing, agriculture, and logistics.</p>
                      <div className="tag-row">
                        {["WAREHOUSE","HEALTHCARE","MANUFACTURING","AGRICULTURE","LOGISTICS"].map(t => (
                          <span key={t} className="tag">{t}</span>
                        ))}
                      </div>
                    </motion.div>
                    <motion.div className="intro-right"
                      initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.75 }}>
                      <div className="mini-label">CURRENT PARADIGM</div>
                      {[
                        "Most existing robots improve their performance through machine learning model retraining and large-scale data collection.",
                        "However, they cannot effectively interpret experiences, explain failures, generate reusable knowledge, or adapt autonomously to changing environments.",
                        "Consequently, robotic systems remain task-specific and require frequent human intervention for continuous improvement."
                      ].map((text, i) => (
                        <div key={i} className="numbered-point">
                          <span className="point-num">0{i+1}</span>
                          <p>{text}</p>
                        </div>
                      ))}
                    </motion.div>
                  </div>
                  <motion.div className="cee-bar"
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 1.0 }}>
                    <div className="cee-bar-label">PROPOSED DIRECTION</div>
                    <div className="cee-bar-body">
                      <strong>CEE</strong>
                      <span>To overcome these limitations, this project proposes the Cognitive Evolution Engine (CEE), a cognitive middleware framework that enables Physical AI robots to evolve through reflective knowledge intelligence.</span>
                    </div>
                    <div className="cee-bar-flow">
                      {["EXPERIENCE","KNOWLEDGE","REASONING","ADAPTATION"].map((s, i, arr) => (
                        <span key={s}>{s}{i < arr.length - 1 && <b> → </b>}</span>
                      ))}
                    </div>
                  </motion.div>
                </div>
              )}

              {/* ── SLIDE 4 — PROBLEM STATEMENT ── */}
              {currentSlide === 3 && (
                <div className="problem-layout">
                  <SlideHeader eyebrow="RESEARCH CHALLENGE" title="Problem Statement" />
                  <motion.p className="lead-text"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}>
                    Current robotic learning approaches focus primarily on prediction and retraining rather than understanding, reasoning, and reusable knowledge.
                  </motion.p>
                  <div className="problem-grid">
                    {[
                      { n:"01", h:"Retraining Dependency", p:"Robots improve through ML model retraining and large-scale data collection, making adaptation time-consuming and computationally expensive." },
                      { n:"02", h:"Raw Experience Storage", p:"Robots store raw sensor data rather than transforming experiences into reusable operational knowledge." },
                      { n:"03", h:"Failure Understanding", p:"Existing systems cannot explain the causes of failures or learn meaningful lessons from past missions." },
                      { n:"04", h:"Knowledge Transfer", p:"Knowledge acquired by one robot is difficult to transfer to other robots without retraining." },
                      { n:"05", h:"Limited Evolution", p:"Most robotic systems lack mechanisms for knowledge evolution, intelligent forgetting, and continuous adaptation." },
                      { n:"06", h:"Result", p:"Robots remain task-specific, require frequent human intervention, and exhibit limited long-term autonomy.", accent: true },
                    ].map((c, i) => (
                      <motion.div key={c.n} className={`prob-card${c.accent ? " prob-accent" : ""}`}
                        initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.65 + i * 0.1 }}>
                        <span className="card-num">{c.n}</span>
                        <h3>{c.h}</h3>
                        <p>{c.p}</p>
                      </motion.div>
                    ))}
                  </div>
                  <motion.div className="flow-bar"
                    initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.7, delay: 1.3 }}>
                    {["RETRAIN","REPEAT","HUMAN INTERVENTION","LIMITED AUTONOMY"].map((s, i, arr) => (
                      <span key={s}>{s}{i < arr.length - 1 && <b> → </b>}</span>
                    ))}
                  </motion.div>
                </div>
              )}

              {/* ── SLIDE 5 — OBJECTIVE ── */}
              {currentSlide === 4 && (
                <div className="objective-layout">
                  <SlideHeader eyebrow="PROJECT GOALS" title="Objective" />
                  <div className="objective-grid">
                    {[
                      {
                        n: "01",
                        h: "Decouple Learning from Retraining",
                        p: "Engineer a real-time cognitive middleware (CEE) that breaks the reliance on cloud-based machine learning, enabling robots to evolve entirely on the edge.",
                        icon: "https://assets6.lottiefiles.com/packages/lf20_jcikwtux.json"
                      },
                      {
                        n: "02",
                        h: "Achieve Explainable AI (XAI) in Robotics",
                        p: "Autonomously translate raw, multi-sensor anomalies (e.g., wheel slip or collision) into transparent, human-readable operational rules using Reflective Reasoning.",
                        icon: "https://assets9.lottiefiles.com/packages/lf20_ystsffqy.json"
                      },
                      {
                        n: "03",
                        h: "Deploy an Active Memory Architecture",
                        p: "Architect an Operational Knowledge Graph that acts as a queryable, dynamic memory system — capable of instantly retrieving vital lessons and intelligently forgetting obsolete data.",
                        icon: "https://assets4.lottiefiles.com/packages/lf20_qp1q7mct.json"
                      },
                      {
                        n: "04",
                        h: "Validate Physical Autonomy",
                        p: "Successfully deploy and validate the CEE framework on a physical, IoT-enabled autonomous rover, demonstrating real-time environmental adaptation without human intervention.",
                        icon: "https://assets2.lottiefiles.com/packages/lf20_xvmprung.json"
                      },
                    ].map((obj, i) => (
                      <motion.div key={obj.n} className="obj-card"
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.55, delay: 0.6 + i * 0.15 }}>
                        <div className="obj-card-top">
                          <span className="card-num">{obj.n}</span>
                          <div className="obj-lottie">
                            <Player autoplay loop src={obj.icon} style={{ width: 64, height: 64 }} />
                          </div>
                        </div>
                        <h3>{obj.h}</h3>
                        <p>{obj.p}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── SLIDE 6 — LITERATURE SURVEY ── */}
              {currentSlide === 5 && (
                <div className="lit-layout">
                  <SlideHeader eyebrow="PRIOR WORK" title="Literature Survey" />
                  <div className="lit-list">
                    {[
                      { ref: "[1]", p: "Scientific study on autonomous robotic instruction has continued to shift towards methods of learning over time. Modern approaches give robots opportunities to develop new capabilities but still pose obstacles to learning and recalling their previous knowledge." },
                      { ref: "[2]", p: "Implementation of continual learning of knowledge based on graphs was expounded, giving knowledge representations the ability to evolve step by step. Nevertheless, this method does not give importance to changing physical experience of robots into actionable operational knowledge." },
                      { ref: "[3]", p: "Self-organizing and reflective cognitive mechanisms show the significance of reflection in cognitive processes of independent robots, supporting lifelong learning through autonomous self-reflection." },
                      { ref: "[4]", p: "Cognitive architectures emphasize reasoning, memory, and open-ended learning, all meant for autonomous work of robots. Nonetheless, implementation remains a problem for real-world Physical AI scenarios." },
                      { ref: "[5]", p: "Interactive continual learning has confirmed its ability to adapt through interaction but is limited to specific applications and does not generalize across diverse robotic platforms." },
                    ].map((item, i) => (
                      <motion.div key={item.ref} className="lit-item"
                        initial={{ opacity: 0, x: -25 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.55 + i * 0.12 }}>
                        <span className="lit-ref">{item.ref}</span>
                        <p>{item.p}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── SLIDE 7 — RESEARCH GAP ── */}
              {currentSlide === 6 && (
                <div className="gap-layout">
                  <SlideHeader eyebrow="IDENTIFIED GAP" title="Research Gap" />
                  <div className="gap-body">
                    <motion.div className="gap-existing"
                      initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}>
                      <div className="mini-label">EXISTING STUDIES ADDRESS INDIVIDUALLY</div>
                      <div className="gap-tags">
                        {["Continual Learning","Knowledge Graphs","Lifelong Cognition","Cognitive Architectures"].map(t => (
                          <span key={t} className="gap-tag">{t}</span>
                        ))}
                      </div>
                      <p className="gap-desc">
                        Existing studies address continual learning, knowledge graphs, lifelong cognition, and cognitive architectures <span className="highlight">individually</span>.
                      </p>
                    </motion.div>

                    <motion.div className="gap-missing"
                      initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.75 }}>
                      <div className="mini-label">WHAT IS MISSING</div>
                      <div className="gap-missing-list">
                        {[
                          "Experience Interpretation",
                          "Reflective Reasoning",
                          "Operational Knowledge Generation",
                          "Intelligent Forgetting",
                          "Knowledge Evolution",
                          "Cross-Robot Knowledge Transfer",
                        ].map((item, i) => (
                          <motion.div key={item} className="gap-missing-item"
                            initial={{ opacity: 0, x: 15 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.85 + i * 0.08 }}>
                            <span className="gap-x">✕</span>
                            <span>{item}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  <motion.div className="gap-solution"
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 1.4 }}>
                    <span className="highlight-box">CEE</span>
                    <p>addresses this gap by providing an <strong>integrated framework</strong> for experience-driven, explainable, and continuously evolving robotic intelligence — unified into a single reusable middleware for Physical AI robots.</p>
                  </motion.div>
                </div>
              )}

              {/* ── SLIDE 9 — SYSTEM ARCHITECTURE ── */}
              {currentSlide === 8 && (
                <div className="image-slide-layout">
                  <SlideHeader eyebrow="SYSTEM DESIGN" title="System Architecture" />
                  <motion.div className="image-slide-frame"
                    initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}>
                    <img src={architectureImg} alt="System Architecture" className="slide-full-image" />
                  </motion.div>
                </div>
              )}

              {/* ── SLIDE 10 — FLOWCHART ── */}
              {currentSlide === 9 && (
                <div className="image-slide-layout">
                  <SlideHeader eyebrow="PROCESS FLOW" title="Flowchart" />
                  <motion.div className="image-slide-frame"
                    initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}>
                    <img src={flowchartImg} alt="Flowchart" className="slide-full-image" />
                  </motion.div>
                </div>
              )}

              {/* ── SLIDE 17 — PROJECT TIMELINE ── */}
              {currentSlide === 16 && (
                <div className="image-slide-layout">
                  <SlideHeader eyebrow="SCHEDULE" title="Project Timeline" />
                  <motion.div className="image-slide-frame"
                    initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}>
                    <img src={timelineImg} alt="Project Timeline" className="slide-full-image" />
                  </motion.div>
                </div>
              )}

              {/* ── SLIDE 11 — BREAKDOWN FLOWCHART 1 ── */}
              {currentSlide === 10 && (
                <div className="image-slide-layout">
                  <SlideHeader eyebrow="FLOWCHART ANALYSIS" title="Breakdown of Flowchart 1" />
                  <motion.div className="image-slide-frame"
                    initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}>
                    <img src={flow1Img} alt="Flowchart Breakdown 1" className="slide-full-image" />
                  </motion.div>
                </div>
              )}

              {/* ── SLIDE 12 — BREAKDOWN FLOWCHART 2 ── */}
              {currentSlide === 11 && (
                <div className="image-slide-layout">
                  <SlideHeader eyebrow="FLOWCHART ANALYSIS" title="Breakdown of Flowchart 2" />
                  <motion.div className="image-slide-frame"
                    initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}>
                    <img src={flow2Img} alt="Flowchart Breakdown 2" className="slide-full-image" />
                  </motion.div>
                </div>
              )}

              {/* ── SLIDE 13 — HARDWARE & SOFTWARE ── */}
              {currentSlide === 12 && (
                <div className="hw-layout">
                  <SlideHeader eyebrow="IMPLEMENTATION" title="Hardware & Software Requirements" />
                  <div className="hw-grid">
                    <motion.div className="hw-card"
                      initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.55 }}>
                      <div className="hw-card-title">⚙ Core Computing Hardware</div>
                      <div className="hw-item"><span className="hw-label">Edge-AI Hub</span><span className="hw-val">Raspberry Pi 4 — Hosts the CEE Middleware &amp; Database</span></div>
                      <div className="hw-item"><span className="hw-label">Telemetry Controller</span><span className="hw-val">ESP32 NodeMCU — Handles real-time sensor polling</span></div>
                    </motion.div>
                    <motion.div className="hw-card"
                      initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 }}>
                      <div className="hw-card-title">🤖 Perception &amp; Actuation</div>
                      <div className="hw-item"><span className="hw-label">Kinematics</span><span className="hw-val">4WD Rover Chassis with L298N Motor Drivers</span></div>
                      <div className="hw-item"><span className="hw-label">Spatial Awareness</span><span className="hw-val">MPU-6050 (6-DoF IMU) and standard Wheel Encoders</span></div>
                      <div className="hw-item"><span className="hw-label">Environment</span><span className="hw-val">HC-SR04 Ultrasonic proximity sensors</span></div>
                    </motion.div>
                    <motion.div className="hw-card hw-card-full"
                      initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.85 }}>
                      <div className="hw-card-title">💻 Software Stack</div>
                      <div className="hw-item"><span className="hw-label">Languages</span><span className="hw-val">Python (Middleware logic) &amp; C++ (ESP32 firmware)</span></div>
                      <div className="hw-item"><span className="hw-label">Networking</span><span className="hw-val">Mosquitto MQTT for asynchronous local communication</span></div>
                      <div className="hw-item"><span className="hw-label">Knowledge Base</span><span className="hw-val">NetworkX or lightweight Neo4j instance for the operational graph</span></div>
                    </motion.div>
                  </div>
                </div>
              )}

              {/* ── SLIDE 16 — CHALLENGES & SOLUTIONS ── */}
              {currentSlide === 15 && (
                <div className="challenge-layout">
                  <SlideHeader eyebrow="OBSTACLES & RESOLUTIONS" title="Challenges & Solutions" />
                  <div className="challenge-grid">
                    <motion.div className="challenge-col"
                      initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}>
                      <div className="challenge-col-header challenge-red">⚠ Technical Challenges</div>
                      <div className="challenge-item">
                        <h3>Dependency Conflicts in Cutting-Edge Environments</h3>
                        <p>Standard physics/3D libraries failed to compile on the bleeding-edge Python 3.14 architecture.</p>
                      </div>
                      <div className="challenge-item">
                        <h3>Network Firewalls Blocking IoT Telemetry</h3>
                        <p>Strict campus/enterprise firewalls blocked standard MQTT ports, severing the connection between the Edge and the CEE Brain.</p>
                      </div>
                    </motion.div>
                    <motion.div className="challenge-col"
                      initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.65 }}>
                      <div className="challenge-col-header challenge-green">✓ Engineering Solutions</div>
                      <div className="challenge-item">
                        <h3>Native Kinematic Engine</h3>
                        <p>Bypassed external C++ dependencies by engineering a custom kinematic physics and raycasting engine using native, pre-installed GUI libraries (Tkinter).</p>
                      </div>
                      <div className="challenge-item">
                        <h3>Broker Failover &amp; Abstraction</h3>
                        <p>Abstracted the data pipeline to support instant swapping between cloud brokers (HiveMQ / Mosquitto) and implemented mobile-hotspot local fallbacks.</p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              )}

              {/* ── SLIDE 8 — PROPOSED METHODOLOGY ── */}
              {currentSlide === 7 && (
                <div className="method-layout">
                  <SlideHeader eyebrow="OUR APPROACH" title="Proposed Methodology" />
                  <div className="method-body">
                    <motion.div className="method-intro"
                      initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}>
                      The Cognitive Evolution Engine (CEE) is positioned as a cognitive middleware between the robot's perception and decision-making layers.
                    </motion.div>
                    <div className="method-grid">
                      {[
                        { n:"01", h:"Sensor Data Acquisition", p:"Real-time data acquired from multiple sensors — IMU, LiDAR, camera, encoders — forming the raw experience stream." },
                        { n:"02", h:"Experience Interpretation", p:"Raw experiences are converted into structured operational knowledge through experience interpretation and reflective reasoning." },
                        { n:"03", h:"Knowledge Graph", p:"Generated knowledge is organized using an Operational Knowledge Graph — continuously refined and queryable." },
                        { n:"04", h:"Knowledge Evolution", p:"Knowledge is refined through evolution mechanisms, maintained using intelligent forgetting, and shared across multiple robots via knowledge transfer." },
                        { n:"05", h:"Decision Making", p:"Evolved knowledge is utilized during decision-making, enabling the robot to adapt to dynamic environments and improve future mission performance." },
                        { n:"06", h:"Reduced Retraining", p:"The robot adapts and improves without dependence on repeated machine learning model retraining." },
                      ].map((m, i) => (
                        <motion.div key={m.n} className="method-card"
                          initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}>
                          <span className="card-num">{m.n}</span>
                          <h3>{m.h}</h3>
                          <p>{m.p}</p>
                        </motion.div>
                      ))}
                    </div>
                    <motion.div className="method-flow"
                      initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 1.4 }}>
                      {["SENSORS","EXPERIENCE INTERPRETER","KNOWLEDGE GRAPH","REASONING ENGINE","DECISION MAKING"].map((s, i, arr) => (
                        <span key={s}>{s}{i < arr.length - 1 && <b> → </b>}</span>
                      ))}
                    </motion.div>
                  </div>
                </div>
              )}

              {/* ── SLIDE 18 — FUTURE WORK ── */}
              {currentSlide === 17 && (
                <div className="future-layout">
                  <SlideHeader eyebrow="LOOKING AHEAD" title="Future Work" />
                  <div className="future-grid">
                    {[
                      { n:"01", h:"Multimodal Experience Integration", p:"Integrating visual, auditory, and additional sensor modalities to enable more comprehensive experience interpretation." },
                      { n:"02", h:"Advanced Knowledge Evolution", p:"Introducing knowledge confidence, revision, prioritization, and intelligent forgetting to maintain relevant and reliable operational knowledge." },
                      { n:"03", h:"Cross-Robot Knowledge Transfer", p:"Enabling learned operational knowledge to be shared across robots operating in similar environments, reducing redundant learning." },
                      { n:"04", h:"Autonomous Cognitive Adaptation", p:"Extending reflective reasoning and knowledge retrieval to support more autonomous adaptation of navigation and task-level decisions." },
                      { n:"05", h:"Large-Scale Physical Validation", p:"Evaluating CEE across diverse environments, operational conditions, and extended-duration robotic tasks to assess its generalizability and robustness." },
                    ].map((f, i) => (
                      <motion.div key={f.n} className="future-card"
                        initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.55 + i * 0.12 }}>
                        <span className="card-num">{f.n}</span>
                        <h3>{f.h}</h3>
                        <p>{f.p}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── SLIDE 19 — CONCLUSION ── */}
              {currentSlide === 18 && (
                <div className="conclusion-layout">
                  <SlideHeader eyebrow="SUMMARY" title="Conclusion" />
                  <div className="conclusion-body">
                    <motion.div className="conclusion-block"
                      initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.6 }}>
                      <p>The <span className="highlight">Cognitive Evolution Engine (CEE)</span> introduces a middleware-based framework for experience-driven learning in Physical AI robots. It integrates experience interpretation, anomaly detection, reflective reasoning, operational knowledge representation, and knowledge evolution into a unified cognitive loop.</p>
                    </motion.div>
                    <motion.div className="conclusion-block"
                      initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.85 }}>
                      <p>CEE transforms relevant real-world experiences into structured, reusable knowledge, enabling previously acquired knowledge to support future robotic decisions. The resulting <span className="highlight">experience–reasoning–knowledge–adaptation</span> loop provides a foundation for developing more adaptive, reusable, and explainable robotic intelligence.</p>
                    </motion.div>
                    <motion.div className="conclusion-flow"
                      initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 1.2 }}>
                      {["EXPERIENCE","REASONING","KNOWLEDGE","ADAPTATION"].map((s, i, arr) => (
                        <span key={s}>{s}{i < arr.length - 1 && <b> → </b>}</span>
                      ))}
                    </motion.div>
                  </div>
                </div>
              )}

              {/* ── SLIDE 20 — REFERENCES ── */}
              {currentSlide === 19 && (
                <div className="ref-layout">
                  <SlideHeader eyebrow="BIBLIOGRAPHY" title="References" />
                  <div className="ref-list">
                    {[
                      { n:"[1]", t:"S. A. Parisi et al.", p:'"Continual Learning for Robotics: Definition, Framework, Learning Strategies, Opportunities and Challenges," Journal of Systems Architecture, vol. 123, Art. no. 102338, 2022.' },
                      { n:"[2]", t:"Y. Zhang, X. Wang, and Y. Li", p:'"Continual Learning of Knowledge Graph Embeddings," IEEE Robotics and Automation Letters, vol. 8, no. 11, pp. 7316–7323, Nov. 2023.' },
                      { n:"[3]", t:"H. Wang, J. Zhang, and X. Liu", p:'"Autonomous Cognition Development with Lifelong Learning: A Self-Organizing and Reflecting Cognitive Network," Neurocomputing, vol. 430, pp. 100–114, 2021.' },
                      { n:"[4]", t:"A. M. Schmid, F. Pecora, and A. Saffiotti", p:'"A Perspective on Lifelong Open-Ended Learning Autonomy for Robotics through Cognitive Architectures," Sensors, vol. 23, no. 3, Art. no. 1611, 2023.' },
                      { n:"[5]", t:"A. Neves, J. Ribeiro, and L. Seabra", p:'"Interactive Continual Learning Architecture for Long-Term Personalization of Home Service Robots," arXiv preprint, arXiv:2403.03462, 2024.' },
                    ].map((r, i) => (
                      <motion.div key={r.n} className="ref-item"
                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 + i * 0.12 }}>
                        <span className="ref-num">{r.n}</span>
                        <div>
                          <strong className="ref-author">{r.t}</strong>
                          <p>{r.p}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── SLIDE 14 — WORKING DEMO ── */}
              {currentSlide === 13 && (
                <div className="image-slide-layout">
                  <SlideHeader eyebrow="LIVE DEMONSTRATION" title="Working Demo" />
                  <motion.div className="image-slide-frame"
                    initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}>
                    <video src={demoVideo} controls autoPlay loop muted
                      className="slide-full-image" style={{ objectFit: "contain", background: "#000" }} />
                  </motion.div>
                </div>
              )}

              {/* ── SLIDE 15 — WORKING DEMO 2 ── */}
              {currentSlide === 14 && (
                <div className="image-slide-layout">
                  <SlideHeader eyebrow="LIVE DEMONSTRATION" title="Working Demo 2" />
                  <motion.div className="image-slide-frame"
                    initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}>
                    <video src={demoVideo2} controls autoPlay loop muted
                      className="slide-full-image" style={{ objectFit: "contain", background: "#000" }} />
                  </motion.div>
                </div>
              )}

              {/* ── SLIDE 21 — THANK YOU ── */}
              {currentSlide === 20 && (
                <div className="thankyou-layout">
                  <div className="thankyou-left">
                    <motion.div
                      initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.3 }}>
                      <div className="slide-eyebrow" style={{ marginBottom: 12 }}>COGNITIVE EVOLUTION ENGINE</div>
                      <h2 className="ty-title">Thank<br />You</h2>
                      <motion.div className="content-title-line" style={{ width: 110, marginTop: 16, marginBottom: 28 }}
                        initial={{ width: 0 }} animate={{ width: 110 }}
                        transition={{ duration: 0.6, delay: 0.7 }} />
                    </motion.div>
                    <motion.div className="ty-quote"
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: 0.9 }}>
                      <span className="ty-quote-mark">"</span>
                      <p>The robot that learns from experience<br />never stops evolving.</p>
                    </motion.div>
                    <motion.div className="ty-tags"
                      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.1 }}>
                      {["Physical AI","ROS 2","Edge Intelligence","Lifelong Learning"].map(t => (
                        <span key={t} className="cover-tag">{t}</span>
                      ))}
                    </motion.div>
                    <motion.div className="ty-team"
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 1.3 }}>
                      <div className="cover-info-label" style={{ marginBottom: 8 }}>PRESENTED BY</div>
                      {["Swarna M","Vishal S S M","Aanandha Subash S"].map(n => (
                        <div key={n} className="ty-member">{n}</div>
                      ))}
                    </motion.div>
                  </div>
                  <motion.div className="thankyou-right"
                    initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.1, delay: 0.4, ease: "easeOut" }}>
                    <video src={ani1Vid} autoPlay loop muted playsInline className="ty-ani-single" />
                  </motion.div>
                </div>
              )}

              {/* ── PLACEHOLDER (none remaining) ── */}

            </div>

            {/* slide indicator + progress */}
            <div className="slide-indicator">
              <span>{String(currentSlide + 1).padStart(2, "0")}</span>
              <div />
              <span>{slides.length}</span>
            </div>
            <div className="progress-track">
              <motion.div className="progress-fill"
                animate={{ width: progressWidth }}
                transition={{ duration: 0.6 }} />
            </div>
          </motion.section>
        )}

      </AnimatePresence>

      {/* ── TRANSITION OVERLAY ── */}
      <AnimatePresence>
        {transitioning && (() => {
          const TxComp = TRANSITION_COMPONENTS[txType];
          return <TxComp key={txType + Date.now()} onDone={handleTransitionDone} />;
        })()}
      </AnimatePresence>

      <div className="navigation">
        <button onClick={() => goToSlide(0)}
          disabled={currentSlide === 0 || transitioning} aria-label="First slide" title="Home">⏮</button>
        <button onClick={() => goToSlide(Math.max(currentSlide - 1, 0))}
          disabled={currentSlide === 0 || transitioning} aria-label="Previous slide">←</button>
        <button onClick={() => goToSlide(Math.min(currentSlide + 1, slides.length - 1))}
          disabled={currentSlide === slides.length - 1 || transitioning} aria-label="Next slide">→</button>
        <button onClick={() => goToSlide(slides.length - 1)}
          disabled={currentSlide === slides.length - 1 || transitioning} aria-label="Last slide" title="End">⏭</button>
      </div>
    </main>
  );
}

export default App;
