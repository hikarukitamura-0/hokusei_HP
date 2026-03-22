import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './Loading.module.css';

interface LoadingProps {
  onComplete: () => void;
}

const Loading = ({ onComplete }: LoadingProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const counterWrapperRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const titleEnRef = useRef<HTMLDivElement>(null);
  const catchRef = useRef<HTMLDivElement>(null);
  const lineLeftRef = useRef<HTMLDivElement>(null);
  const lineRightRef = useRef<HTMLDivElement>(null);
  const slashRef1 = useRef<HTMLDivElement>(null);
  const slashRef2 = useRef<HTMLDivElement>(null);
  const slashRef3 = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ onComplete });
    const counter = { value: 0 };

    // Diagonal slashes fly in
    tl.fromTo(slashRef1.current, { x: '-100%', rotation: -20 }, { x: '120%', rotation: -20, duration: 0.6, ease: 'power2.in' }, 0)
      .fromTo(slashRef2.current, { x: '120%', rotation: -20 }, { x: '-100%', rotation: -20, duration: 0.6, ease: 'power2.in' }, 0.1)
      .fromTo(slashRef3.current, { x: '-100%', rotation: -20 }, { x: '120%', rotation: -20, duration: 0.5, ease: 'power2.in' }, 0.2)

      // Counter 0→100 with glitch-style updates
      .to(counter, {
        value: 100,
        duration: 1.8,
        ease: 'power3.inOut',
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = String(Math.floor(counter.value)).padStart(3, '0');
          }
        },
      }, 0.3)
      .to(barRef.current, { scaleX: 1, duration: 1.8, ease: 'power3.inOut' }, 0.3)

      // Flash
      .to(flashRef.current, { opacity: 1, duration: 0.08 }, 2.1)
      .to(flashRef.current, { opacity: 0, duration: 0.15 }, 2.18)

      // Counter out
      .to(counterWrapperRef.current, { opacity: 0, y: -30, duration: 0.3, ease: 'power2.in' }, 2.2)

      // Company name - glitch appear
      .fromTo(titleRef.current, { opacity: 0, y: 50, skewX: -10 }, { opacity: 1, y: 0, skewX: 0, duration: 0.5, ease: 'power4.out' }, 2.4)
      .fromTo(titleEnRef.current, { opacity: 0, x: -80 }, { opacity: 0.15, x: 0, duration: 0.6, ease: 'power3.out' }, 2.5)

      // Glitch flicker on title
      .to(titleRef.current, { skewX: 5, duration: 0.05 }, 2.8)
      .to(titleRef.current, { skewX: -3, duration: 0.05 }, 2.85)
      .to(titleRef.current, { skewX: 0, duration: 0.05 }, 2.9)

      // Hold
      .to({}, { duration: 0.4 }, 2.95)

      // Title out
      .to(titleRef.current, { opacity: 0, scale: 1.05, duration: 0.3, ease: 'power2.in' }, 3.35)
      .to(titleEnRef.current, { opacity: 0, duration: 0.2 }, 3.35)

      // Catchcopy in with lines
      .fromTo(catchRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 3.6)
      .fromTo(lineLeftRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, 3.7)
      .fromTo(lineRightRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: 'power2.out' }, 3.7)

      // Hold
      .to({}, { duration: 0.7 }, 4.2)

      // Flash + slide out
      .to(flashRef.current, { opacity: 1, duration: 0.06 }, 4.9)
      .to(flashRef.current, { opacity: 0, duration: 0.1 }, 4.96)
      .to(overlayRef.current, { y: '-100%', duration: 0.7, ease: 'power3.inOut' }, 5.0);

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div ref={overlayRef} className={styles.overlay}>
      {/* Flash layer */}
      <div ref={flashRef} className={styles.flash} />

      {/* Animated diagonal slashes */}
      <div ref={slashRef1} className={`${styles.slash} ${styles.slash1}`} />
      <div ref={slashRef2} className={`${styles.slash} ${styles.slash2}`} />
      <div ref={slashRef3} className={`${styles.slash} ${styles.slash3}`} />

      {/* Counter */}
      <div ref={counterWrapperRef} className={styles.counterWrapper}>
        <span ref={counterRef} className={styles.counter}>000</span>
        <div className={styles.barTrack}>
          <div ref={barRef} className={styles.barFill} />
        </div>
      </div>

      {/* Company title */}
      <div ref={titleEnRef} className={styles.titleEn}>HOKUSEI</div>
      <div ref={titleRef} className={styles.title}>北誠建設株式会社</div>

      {/* Catchcopy with lines */}
      <div className={styles.catchWrapper}>
        <div ref={lineLeftRef} className={`${styles.catchLine} ${styles.catchLineLeft}`} />
        <div ref={catchRef} className={styles.catchcopy}>わかりあう喜びをかたちに</div>
        <div ref={lineRightRef} className={`${styles.catchLine} ${styles.catchLineRight}`} />
      </div>
    </div>
  );
};

export default Loading;
