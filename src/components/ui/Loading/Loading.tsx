import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './Loading.module.css';

interface LoadingProps {
  onComplete: () => void;
}

const Loading = ({ onComplete }: LoadingProps) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const titleEnRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ onComplete });

    // Title glitch-in
    tl.fromTo(titleRef.current, { opacity: 0, skewX: -15, x: -40 },
      { opacity: 1, skewX: 0, x: 0, duration: 0.6, ease: 'power4.out' }, 0.3)
      .fromTo(titleEnRef.current, { opacity: 0, scale: 0.9 },
        { opacity: 0.08, scale: 1, duration: 0.8, ease: 'power2.out' }, 0.4)

      // Glitch flickers
      .to(titleRef.current, { skewX: 8, duration: 0.04 }, 1.1)
      .to(titleRef.current, { skewX: -5, duration: 0.04 }, 1.14)
      .to(titleRef.current, { skewX: 3, duration: 0.04 }, 1.18)
      .to(titleRef.current, { skewX: 0, duration: 0.06 }, 1.22)

      // Hold
      .to({}, { duration: 0.6 }, 1.3)

      // Horizontal line expands
      .fromTo(lineRef.current, { scaleX: 0 },
        { scaleX: 1, duration: 0.5, ease: 'power3.inOut' }, 1.9)

      // Title fades
      .to(titleRef.current, { opacity: 0, duration: 0.2, ease: 'power2.in' }, 2.3)
      .to(titleEnRef.current, { opacity: 0, duration: 0.2 }, 2.3)

      // Flash
      .to(flashRef.current, { opacity: 1, duration: 0.06 }, 2.5)
      .to(flashRef.current, { opacity: 0, duration: 0.12 }, 2.56)

      // Curtain split — top up, bottom down
      .to(topRef.current, { y: '-100%', duration: 0.8, ease: 'power3.inOut' }, 2.6)
      .to(bottomRef.current, { y: '100%', duration: 0.8, ease: 'power3.inOut' }, 2.6)
      .to(lineRef.current, { opacity: 0, duration: 0.3 }, 2.6);

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div ref={wrapRef} className={styles.wrapper}>
      {/* Top curtain */}
      <div ref={topRef} className={styles.curtainTop} />
      {/* Bottom curtain */}
      <div ref={bottomRef} className={styles.curtainBottom} />
      {/* Flash */}
      <div ref={flashRef} className={styles.flash} />
      {/* Center line */}
      <div ref={lineRef} className={styles.line} />
      {/* Background EN text */}
      <div ref={titleEnRef} className={styles.titleEn}>HOKUSEI</div>
      {/* Company name */}
      <div ref={titleRef} className={styles.title}>北誠建設株式会社</div>
    </div>
  );
};

export default Loading;
