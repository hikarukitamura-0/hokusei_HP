import { useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import styles from './Loading.module.css';

interface LoadingProps {
  onComplete: () => void;
}

const PARTICLE_COUNT = 28;
const RED = '#E84420';
const SKY = '#4da6d9';

const Loading = ({ onComplete }: LoadingProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<(HTMLDivElement | null)[]>([]);
  const seiRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const catchRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);

  const particles = useMemo(() =>
    Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 4 + Math.random() * 8,
      color: i % 3 === 0 ? SKY : RED,
      delay: Math.random() * 0.4,
    })), []);

  useEffect(() => {
    const tl = gsap.timeline({ onComplete });

    // Initial floating particles
    particlesRef.current.forEach((el, i) => {
      if (!el) return;
      const p = particles[i];
      gsap.set(el, { x: `${p.x}vw`, y: `${p.y}vh`, opacity: 0 });
      tl.to(el, { opacity: 0.8, duration: 0.3, delay: p.delay }, 0);
      // Gentle float
      gsap.to(el, {
        y: `${p.y + (Math.random() - 0.5) * 10}vh`,
        x: `${p.x + (Math.random() - 0.5) * 5}vw`,
        duration: 1.5 + Math.random(),
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
    });

    // Converge to center
    tl.add(() => {
      particlesRef.current.forEach((el) => {
        if (!el) return;
        gsap.to(el, {
          x: '50vw', y: '50vh', scale: 0.5, opacity: 0.6,
          duration: 0.6, ease: 'power3.in',
        });
      });
    }, 1.0);

    // Flash + hide particles, show SEI
    tl.to(flashRef.current, { opacity: 1, duration: 0.06 }, 1.7)
      .to(flashRef.current, { opacity: 0, duration: 0.15 }, 1.76)
      .add(() => {
        particlesRef.current.forEach((el) => {
          if (el) gsap.set(el, { opacity: 0 });
        });
      }, 1.7)

      // SEI text appears with scale bounce
      .fromTo(seiRef.current, { opacity: 0, scale: 2 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(2)' }, 1.8)

      // Hold SEI
      .to({}, { duration: 0.5 }, 2.3)

      // SEI out, title in
      .to(seiRef.current, { opacity: 0, scale: 0.8, duration: 0.3 }, 2.8)
      .fromTo(titleRef.current, { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 3.0)

      // Catchphrase with letter-spacing animation
      .fromTo(catchRef.current, { opacity: 0, letterSpacing: '1.5em' },
        { opacity: 1, letterSpacing: '0.4em', duration: 0.8, ease: 'power2.out' }, 3.2)

      // Hold
      .to({}, { duration: 0.5 }, 4.0)

      // Everything out
      .to([titleRef.current, catchRef.current], { opacity: 0, y: -20, duration: 0.3 }, 4.5)

      // Flash and slide away
      .to(flashRef.current, { opacity: 1, duration: 0.06 }, 4.8)
      .to(flashRef.current, { opacity: 0, duration: 0.1 }, 4.86)
      .to(overlayRef.current, { y: '-100%', duration: 0.7, ease: 'power3.inOut' }, 4.9);

    return () => { tl.kill(); };
  }, [onComplete, particles]);

  return (
    <div ref={overlayRef} className={styles.overlay}>
      <div ref={flashRef} className={styles.flash} />

      {/* Particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          ref={(el) => { particlesRef.current[i] = el; }}
          className={styles.particle}
          style={{ width: p.size, height: p.size, backgroundColor: p.color }}
        />
      ))}

      {/* SEI logo text */}
      <div ref={seiRef} className={styles.sei}>SEI</div>

      {/* Company name */}
      <div ref={titleRef} className={styles.title}>北誠建設株式会社</div>

      {/* Catchphrase */}
      <div ref={catchRef} className={styles.catchcopy}>わかりあう喜びをかたちに</div>
    </div>
  );
};

export default Loading;
