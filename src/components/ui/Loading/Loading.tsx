import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './Loading.module.css';

interface LoadingProps {
  onComplete: () => void;
}

const Loading = ({ onComplete }: LoadingProps) => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const layerDarkRef = useRef<HTMLDivElement>(null);
  const layerRedRef = useRef<HTMLDivElement>(null);
  const layerSkyRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const textMaskRef = useRef<HTMLDivElement>(null);
  const accentLine1 = useRef<HTMLDivElement>(null);
  const accentLine2 = useRef<HTMLDivElement>(null);
  const accentLine3 = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ onComplete });

    // Accent lines fly across
    tl.fromTo(accentLine1.current, { x: '-120%' }, { x: '120%', duration: 0.5, ease: 'power2.in' }, 0)
      .fromTo(accentLine2.current, { x: '120%' }, { x: '-120%', duration: 0.5, ease: 'power2.in' }, 0.12)
      .fromTo(accentLine3.current, { x: '-120%' }, { x: '120%', duration: 0.4, ease: 'power2.in' }, 0.25)

      // Text diagonal wipe reveal (clip-path from left)
      .fromTo(textMaskRef.current,
        { clipPath: 'polygon(0 0, 0 0, -20% 100%, 0 100%)' },
        { clipPath: 'polygon(0 0, 120% 0, 100% 100%, 0 100%)', duration: 0.8, ease: 'power3.inOut' }, 0.6)

      // Shake/vibration effect on text
      .to(textRef.current, { x: 8, duration: 0.04 }, 1.5)
      .to(textRef.current, { x: -6, duration: 0.04 }, 1.54)
      .to(textRef.current, { x: 5, duration: 0.04 }, 1.58)
      .to(textRef.current, { x: -3, duration: 0.04 }, 1.62)
      .to(textRef.current, { x: 0, duration: 0.06 }, 1.66)

      // Hold
      .to({}, { duration: 0.6 }, 1.8)

      // Flash
      .to(flashRef.current, { opacity: 1, duration: 0.06 }, 2.4)
      .to(flashRef.current, { opacity: 0, duration: 0.15 }, 2.46)

      // Layers slide out in different directions
      .to(layerDarkRef.current, { x: '-110%', duration: 0.7, ease: 'power3.inOut' }, 2.5)
      .to(layerRedRef.current, { x: '110%', duration: 0.7, ease: 'power3.inOut' }, 2.55)
      .to(layerSkyRef.current, { y: '-110%', duration: 0.7, ease: 'power3.inOut' }, 2.6)
      .to(textRef.current, { opacity: 0, duration: 0.2 }, 2.5);

    return () => { tl.kill(); };
  }, [onComplete]);

  return (
    <div ref={wrapRef} className={styles.wrapper}>
      <div ref={flashRef} className={styles.flash} />

      {/* 3 diagonal layers */}
      <div ref={layerDarkRef} className={`${styles.layer} ${styles.layerDark}`} />
      <div ref={layerRedRef} className={`${styles.layer} ${styles.layerRed}`} />
      <div ref={layerSkyRef} className={`${styles.layer} ${styles.layerSky}`} />

      {/* Accent lines */}
      <div ref={accentLine1} className={`${styles.accentLine} ${styles.accent1}`} />
      <div ref={accentLine2} className={`${styles.accentLine} ${styles.accent2}`} />
      <div ref={accentLine3} className={`${styles.accentLine} ${styles.accent3}`} />

      {/* Company text with diagonal clip mask */}
      <div ref={textRef} className={styles.textCenter}>
        <div ref={textMaskRef} className={styles.textMask}>
          <div className={styles.titleBig}>北誠建設</div>
          <div className={styles.titleSub}>HOKUSEI CONSTRUCTION</div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
