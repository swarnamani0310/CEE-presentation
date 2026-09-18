import { useEffect, useRef } from "react";

/* ── shared overlay wrapper ── */
function Overlay({ children, style }) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      pointerEvents: "none", overflow: "hidden", ...style
    }}>
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   1. PARTICLE EXPLOSION — cyan/purple particles burst from center
══════════════════════════════════════════════════════════ */
export function ParticleExplosion({ onDone }) {
  const ref = useRef();
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const cx = canvas.width / 2, cy = canvas.height / 2;

    const particles = Array.from({ length: 220 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 4 + Math.random() * 18;
      const colors = ["#00d9ff","#7b5fff","#ffffff","#00ffcc","#ff3cac"];
      return {
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        decay: 0.012 + Math.random() * 0.018,
        size: 1.5 + Math.random() * 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        trail: [],
      };
    });

    let frame;
    const draw = () => {
      ctx.fillStyle = "rgba(3,7,13,0.18)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.trail.push({ x: p.x, y: p.y });
        if (p.trail.length > 8) p.trail.shift();
        p.x += p.vx; p.y += p.vy;
        p.vx *= 0.97; p.vy *= 0.97;
        p.life -= p.decay;

        // trail
        p.trail.forEach((pt, i) => {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, p.size * (i / p.trail.length) * 0.6, 0, Math.PI * 2);
          ctx.fillStyle = p.color + Math.floor(p.life * (i / p.trail.length) * 180).toString(16).padStart(2,"0");
          ctx.fill();
        });

        // particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.life * 255).toString(16).padStart(2,"0");
        ctx.shadowBlur = 12;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // shockwave rings
      const elapsed = (Date.now() - start) / 1000;
      [0, 0.12, 0.24].forEach(offset => {
        const r = (elapsed - offset) * 900;
        if (r > 0 && r < 1400) {
          const alpha = Math.max(0, 1 - r / 1400);
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0,217,255,${alpha * 0.6})`;
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });

      if (particles.some(p => p.life > 0)) {
        frame = requestAnimationFrame(draw);
      } else {
        onDone();
      }
    };

    const start = Date.now();
    frame = requestAnimationFrame(draw);
    const t = setTimeout(onDone, 1100);
    return () => { cancelAnimationFrame(frame); clearTimeout(t); };
  }, []);

  return <Overlay><canvas ref={ref} style={{ width: "100%", height: "100%" }} /></Overlay>;
}

/* ══════════════════════════════════════════════════════════
   2. MATRIX RAIN — green/cyan binary columns cascade down
══════════════════════════════════════════════════════════ */
export function MatrixRain({ onDone }) {
  const ref = useRef();
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const cols = Math.floor(canvas.width / 18);
    const drops = Array.from({ length: cols }, () => -Math.random() * 30);
    const chars = "01アイウエオカキクケコCEEROSAI量子認知進化エンジン";
    const start = Date.now();

    let frame;
    const draw = () => {
      const elapsed = (Date.now() - start) / 1000;
      ctx.fillStyle = elapsed < 0.4 ? "rgba(3,7,13,0.25)" : "rgba(3,7,13,0.18)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * 18;
        // head glow
        ctx.fillStyle = "#ffffff";
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#00d9ff";
        ctx.font = "bold 14px 'IBM Plex Mono', monospace";
        ctx.fillText(char, x, y * 18);
        // body
        ctx.fillStyle = i % 5 === 0 ? "#00d9ff" : "#00ff88";
        ctx.shadowBlur = 4;
        ctx.shadowColor = "#00ff88";
        ctx.font = "13px 'IBM Plex Mono', monospace";
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, (y - 1) * 18);
        ctx.shadowBlur = 0;

        drops[i] += 0.9 + Math.random() * 0.5;
        if (drops[i] * 18 > canvas.height && Math.random() > 0.97) drops[i] = 0;
      });

      if (elapsed < 0.85) {
        frame = requestAnimationFrame(draw);
      } else {
        // fade out
        ctx.fillStyle = "rgba(3,7,13,0.95)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        onDone();
      }
    };

    frame = requestAnimationFrame(draw);
    const t = setTimeout(onDone, 900);
    return () => { cancelAnimationFrame(frame); clearTimeout(t); };
  }, []);

  return <Overlay><canvas ref={ref} style={{ width: "100%", height: "100%" }} /></Overlay>;
}

/* ══════════════════════════════════════════════════════════
   3. HOLOGRAPHIC SHATTER — screen cracks into glowing shards
══════════════════════════════════════════════════════════ */
export function HolographicShatter({ onDone }) {
  const ref = useRef();
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const W = canvas.width, H = canvas.height;

    // generate voronoi-like shards
    const seeds = Array.from({ length: 28 }, () => ({ x: Math.random() * W, y: Math.random() * H }));
    const shards = seeds.map((s, i) => ({
      cx: s.x, cy: s.y,
      vx: (s.x - W / 2) * 0.008 + (Math.random() - 0.5) * 3,
      vy: (s.y - H / 2) * 0.008 + (Math.random() - 0.5) * 3,
      rot: (Math.random() - 0.5) * 0.15,
      angle: 0,
      life: 1,
      hue: i % 2 === 0 ? "0,217,255" : "120,80,255",
      points: Array.from({ length: 5 + Math.floor(Math.random() * 4) }, (_, j) => {
        const a = (j / (5 + Math.floor(Math.random() * 4))) * Math.PI * 2;
        const r = 40 + Math.random() * 80;
        return [Math.cos(a) * r, Math.sin(a) * r];
      }),
    }));

    const start = Date.now();
    let frame;
    const draw = () => {
      const elapsed = (Date.now() - start) / 1000;
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = `rgba(3,7,13,${Math.min(1, elapsed * 1.8)})`;
      ctx.fillRect(0, 0, W, H);

      shards.forEach(s => {
        s.cx += s.vx * elapsed * 2.5;
        s.cy += s.vy * elapsed * 2.5;
        s.angle += s.rot;
        s.life = Math.max(0, 1 - elapsed * 1.2);

        ctx.save();
        ctx.translate(s.cx, s.cy);
        ctx.rotate(s.angle);
        ctx.globalAlpha = s.life;

        ctx.beginPath();
        s.points.forEach(([px, py], i) => i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py));
        ctx.closePath();

        const grad = ctx.createLinearGradient(-60, -60, 60, 60);
        grad.addColorStop(0, `rgba(${s.hue},0.05)`);
        grad.addColorStop(0.5, `rgba(${s.hue},0.18)`);
        grad.addColorStop(1, `rgba(${s.hue},0.03)`);
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.strokeStyle = `rgba(${s.hue},${s.life * 0.9})`;
        ctx.lineWidth = 1.5;
        ctx.shadowBlur = 14;
        ctx.shadowColor = `rgba(${s.hue},1)`;
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.restore();
      });

      if (elapsed < 0.75) {
        frame = requestAnimationFrame(draw);
      } else {
        onDone();
      }
    };

    frame = requestAnimationFrame(draw);
    const t = setTimeout(onDone, 850);
    return () => { cancelAnimationFrame(frame); clearTimeout(t); };
  }, []);

  return <Overlay><canvas ref={ref} style={{ width: "100%", height: "100%" }} /></Overlay>;
}

/* ══════════════════════════════════════════════════════════
   4. WORMHOLE — spiraling tunnel that sucks the screen in
══════════════════════════════════════════════════════════ */
export function Wormhole({ onDone }) {
  const ref = useRef();
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const cx = canvas.width / 2, cy = canvas.height / 2;
    const start = Date.now();
    let frame;

    const draw = () => {
      const elapsed = (Date.now() - start) / 1000;
      const progress = Math.min(elapsed / 0.85, 1);

      ctx.fillStyle = "rgba(3,7,13,0.35)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const rings = 18;
      for (let i = rings; i >= 0; i--) {
        const t = (i / rings + elapsed * 1.4) % 1;
        const r = t * Math.max(canvas.width, canvas.height) * 0.85;
        const alpha = (1 - t) * 0.7 * progress;
        const hue = i % 2 === 0 ? `0,217,255` : `120,80,255`;

        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${hue},${alpha})`;
        ctx.lineWidth = 2 + (1 - t) * 4;
        ctx.shadowBlur = 20 * (1 - t);
        ctx.shadowColor = `rgba(${hue},0.8)`;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // spiral arms
      for (let arm = 0; arm < 3; arm++) {
        ctx.beginPath();
        for (let a = 0; a < Math.PI * 6; a += 0.05) {
          const r2 = a * 28 * progress;
          const x = cx + Math.cos(a + arm * (Math.PI * 2 / 3) + elapsed * 4) * r2;
          const y = cy + Math.sin(a + arm * (Math.PI * 2 / 3) + elapsed * 4) * r2;
          a === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(0,217,255,${0.25 * progress})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // center core
      const coreR = 20 + Math.sin(elapsed * 12) * 8;
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR * 3);
      coreGrad.addColorStop(0, "rgba(255,255,255,0.9)");
      coreGrad.addColorStop(0.3, "rgba(0,217,255,0.6)");
      coreGrad.addColorStop(1, "rgba(0,217,255,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, coreR * 3, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.fill();

      if (elapsed < 0.85) {
        frame = requestAnimationFrame(draw);
      } else {
        onDone();
      }
    };

    frame = requestAnimationFrame(draw);
    const t = setTimeout(onDone, 950);
    return () => { cancelAnimationFrame(frame); clearTimeout(t); };
  }, []);

  return <Overlay><canvas ref={ref} style={{ width: "100%", height: "100%" }} /></Overlay>;
}

/* ══════════════════════════════════════════════════════════
   5. NEURAL NETWORK — nodes connect across screen then flash
══════════════════════════════════════════════════════════ */
export function NeuralNetwork({ onDone }) {
  const ref = useRef();
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const W = canvas.width, H = canvas.height;

    const nodes = Array.from({ length: 55 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 1.2, vy: (Math.random() - 0.5) * 1.2,
      r: 2 + Math.random() * 4,
      pulse: Math.random() * Math.PI * 2,
    }));

    const start = Date.now();
    let frame;
    const draw = () => {
      const elapsed = (Date.now() - start) / 1000;
      const progress = Math.min(elapsed / 0.9, 1);

      ctx.fillStyle = "rgba(3,7,13,0.22)";
      ctx.fillRect(0, 0, W, H);

      // connections
      nodes.forEach((a, i) => {
        nodes.slice(i + 1).forEach(b => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 180) {
            const alpha = (1 - dist / 180) * progress * 0.7;
            const pulse = Math.sin(elapsed * 6 + a.pulse) * 0.5 + 0.5;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(0,217,255,${alpha * pulse})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();

            // signal pulse traveling along edge
            if (Math.random() < 0.008) {
              const t2 = (elapsed * 2) % 1;
              const px = a.x + (b.x - a.x) * t2;
              const py = a.y + (b.y - a.y) * t2;
              ctx.beginPath();
              ctx.arc(px, py, 2.5, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(255,255,255,${alpha * 2})`;
              ctx.shadowBlur = 8;
              ctx.shadowColor = "#00d9ff";
              ctx.fill();
              ctx.shadowBlur = 0;
            }
          }
        });
      });

      // nodes
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
        const pulse = Math.sin(elapsed * 5 + n.pulse) * 0.4 + 0.8;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * pulse * progress, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,217,255,${0.85 * progress})`;
        ctx.shadowBlur = 16;
        ctx.shadowColor = "#00d9ff";
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // final flash
      if (elapsed > 0.75) {
        const flashAlpha = Math.min((elapsed - 0.75) / 0.15, 1);
        ctx.fillStyle = `rgba(0,217,255,${flashAlpha * 0.35})`;
        ctx.fillRect(0, 0, W, H);
      }

      if (elapsed < 0.9) {
        frame = requestAnimationFrame(draw);
      } else {
        onDone();
      }
    };

    frame = requestAnimationFrame(draw);
    const t = setTimeout(onDone, 1000);
    return () => { cancelAnimationFrame(frame); clearTimeout(t); };
  }, []);

  return <Overlay><canvas ref={ref} style={{ width: "100%", height: "100%" }} /></Overlay>;
}

/* ══════════════════════════════════════════════════════════
   6. PLASMA WAVE — liquid plasma ripple sweeps across
══════════════════════════════════════════════════════════ */
export function PlasmaWave({ onDone }) {
  const ref = useRef();
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const W = canvas.width, H = canvas.height;
    const start = Date.now();
    let frame;

    const draw = () => {
      const elapsed = (Date.now() - start) / 1000;
      ctx.clearRect(0, 0, W, H);

      // plasma background
      const imageData = ctx.createImageData(W, H);
      const data = imageData.data;
      const step = 4; // skip pixels for performance
      for (let y = 0; y < H; y += step) {
        for (let x = 0; x < W; x += step) {
          const v =
            Math.sin(x * 0.012 + elapsed * 5) +
            Math.sin(y * 0.012 + elapsed * 4) +
            Math.sin((x + y) * 0.008 + elapsed * 6) +
            Math.sin(Math.sqrt(x * x + y * y) * 0.01 - elapsed * 8);
          const norm = (v + 4) / 8;
          const r = Math.floor(norm * 0 + (1 - norm) * 0);
          const g = Math.floor(norm * 217 + (1 - norm) * 120);
          const b = Math.floor(norm * 255 + (1 - norm) * 255);
          const alpha = Math.floor(norm * 180 + 30);
          for (let dy = 0; dy < step; dy++) {
            for (let dx = 0; dx < step; dx++) {
              const idx = ((y + dy) * W + (x + dx)) * 4;
              data[idx] = r; data[idx+1] = g; data[idx+2] = b; data[idx+3] = alpha;
            }
          }
        }
      }
      ctx.putImageData(imageData, 0, 0);

      // wave sweep
      const waveX = elapsed * W * 1.4 - W * 0.2;
      const grad = ctx.createLinearGradient(waveX - 120, 0, waveX + 120, 0);
      grad.addColorStop(0, "rgba(0,217,255,0)");
      grad.addColorStop(0.4, "rgba(0,217,255,0.7)");
      grad.addColorStop(0.5, "rgba(255,255,255,0.95)");
      grad.addColorStop(0.6, "rgba(120,80,255,0.7)");
      grad.addColorStop(1, "rgba(120,80,255,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      if (elapsed < 0.75) {
        frame = requestAnimationFrame(draw);
      } else {
        onDone();
      }
    };

    frame = requestAnimationFrame(draw);
    const t = setTimeout(onDone, 850);
    return () => { cancelAnimationFrame(frame); clearTimeout(t); };
  }, []);

  return <Overlay><canvas ref={ref} style={{ width: "100%", height: "100%" }} /></Overlay>;
}
