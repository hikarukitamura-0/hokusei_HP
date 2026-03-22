import { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography, Grid, TextField, Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const RED = '#E84420';
const DARK = '#1a1a1a';
const SKY = '#4da6d9';
const LIGHT_BG = '#f0f7fb';

/* ===== Diagonal decorator ===== */
const DiagDeco = ({ top, right, width = 120, height = 8, delay = 0, color = RED }: { top: string; right?: string; width?: number; height?: number; delay?: number; color?: string }) => (
  <Box className="deco-slash" data-delay={delay}
    sx={{ position: 'absolute', top, right: right || 'auto', left: right ? 'auto' : '-40px', width, height, backgroundColor: color, transform: 'rotate(-20deg)', opacity: 0, zIndex: 1 }} />
);

/* ===== Section heading ===== */
const SectionHeading = ({ en, jp, align = 'left', light = false }: { en: string; jp: string; align?: string; light?: boolean }) => (
  <Box className="section-heading" sx={{ textAlign: align, mb: 6, position: 'relative' }}>
    <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: light ? 'rgba(255,255,255,0.6)' : RED, letterSpacing: '0.2em', mb: 0.5 }}>{jp}</Typography>
    <Typography sx={{ fontSize: { xs: '2.5rem', md: '4.5rem' }, fontWeight: 900, color: light ? '#fff' : DARK, letterSpacing: '0.05em', lineHeight: 1.1, fontFamily: '"Helvetica Neue", Arial, sans-serif' }}>
      {en}
    </Typography>
    <Box sx={{ width: 60, height: 4, backgroundColor: light ? '#fff' : RED, mt: 2, mx: align === 'center' ? 'auto' : align === 'right' ? '0 0 0 auto' : 0 }} />
  </Box>
);

/* ===== Service Card ===== */
const ServiceCard = ({ title, num, img }: { title: string; num: number; img: string }) => (
  <Box className="service-card" sx={{
    backgroundColor: '#fff', borderRadius: 2, overflow: 'hidden', cursor: 'pointer',
    boxShadow: '0 2px 16px rgba(0,0,0,0.06)', transition: 'all 0.4s ease',
    '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 16px 40px rgba(77,166,217,0.15)' },
    '&:hover .card-img': { transform: 'scale(1.1)' },
  }}>
    <Box sx={{ overflow: 'hidden', height: 140 }}>
      <Box className="card-img" component="img" src={img} alt={title}
        sx={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }} />
    </Box>
    <Box sx={{ p: 2, textAlign: 'center' }}>
      <Typography sx={{ fontSize: '1.6rem', fontWeight: 100, color: '#ccc', fontFamily: '"Helvetica Neue", sans-serif', lineHeight: 1, mb: 0.5 }}>
        {String(num).padStart(2, '0')}
      </Typography>
      <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, color: '#444', lineHeight: 1.6 }}>{title}</Typography>
    </Box>
  </Box>
);

/* ===== Flow Step ===== */
const FlowStep = ({ num, title }: { num: number; title: string }) => (
  <Box className="flow-step" sx={{
    display: 'flex', alignItems: 'center', gap: 2, py: 2.5, borderBottom: '1px solid rgba(255,255,255,0.08)',
    transition: 'all 0.3s ease', '&:hover': { pl: 2, backgroundColor: 'rgba(255,255,255,0.03)' },
  }}>
    <Box sx={{
      width: 44, height: 44, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)',
      color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '0.8rem', fontWeight: 700, fontFamily: '"Helvetica Neue", sans-serif', flexShrink: 0,
    }}>
      {String(num).padStart(2, '0')}
    </Box>
    <Typography sx={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.85)', letterSpacing: '0.05em' }}>{title}</Typography>
  </Box>
);

/* ===== Info Row ===== */
const InfoRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <Box className="info-row" sx={{ display: 'flex', borderBottom: '1px solid #e8eef2', flexDirection: { xs: 'column', sm: 'row' } }}>
    <Box sx={{ minWidth: 160, px: 2.5, py: 2, fontWeight: 600, fontSize: '0.85rem', color: '#fff', background: `linear-gradient(135deg, ${RED}, #f05a36)` }}>{label}</Box>
    <Box sx={{ px: 2.5, py: 2, fontSize: '0.85rem', color: '#444', lineHeight: 1.8, flex: 1, backgroundColor: '#fff' }}>{children}</Box>
  </Box>
);

/* ===== Recruit Row ===== */
const RecruitRow = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <Box className="recruit-row" sx={{ display: 'flex', borderBottom: '1px solid #f0f0f0', flexDirection: { xs: 'column', md: 'row' } }}>
    <Box sx={{ minWidth: 160, px: 3, py: 2, fontWeight: 600, fontSize: '0.85rem', color: '#555', backgroundColor: LIGHT_BG, letterSpacing: '0.05em' }}>{label}</Box>
    <Box sx={{ px: 3, py: 2, fontSize: '0.85rem', color: '#444', lineHeight: 1.8, flex: 1 }}>{children}</Box>
  </Box>
);

/* ===== Counter Stat ===== */
const StatItem = ({ num, suffix, label }: { num: string; suffix: string; label: string }) => (
  <Box className="stat-item" sx={{ textAlign: 'center' }}>
    <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 0.5 }}>
      <Typography className="stat-num" data-target={num} sx={{
        fontSize: { xs: '3rem', md: '4.5rem' }, fontWeight: 100, color: '#fff',
        fontFamily: '"Helvetica Neue", sans-serif', lineHeight: 1,
      }}>0</Typography>
      <Typography sx={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.6)', fontWeight: 300 }}>{suffix}</Typography>
    </Box>
    <Typography sx={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em', mt: 1 }}>{label}</Typography>
  </Box>
);

/* ================================================================ */
const Home = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', tel: '', mail: '', message: '' });
  const [categories, setCategories] = useState<string[]>([]);
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section headings
      gsap.utils.toArray<HTMLElement>('.section-heading').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } });
      });
      // Diagonal decorators
      gsap.utils.toArray<HTMLElement>('.deco-slash').forEach((el) => {
        const d = parseFloat(el.dataset.delay || '0');
        gsap.fromTo(el, { opacity: 0, x: -100 }, { opacity: 0.7, x: 0, duration: 0.6, delay: d, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 90%' } });
      });
      // Service cards
      gsap.utils.toArray<HTMLElement>('.service-card').forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0, y: 60, rotateX: 15 }, { opacity: 1, y: 0, rotateX: 0, duration: 0.6, delay: i * 0.08, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } });
      });
      // Flow steps
      gsap.utils.toArray<HTMLElement>('.flow-step').forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0, x: -40 }, { opacity: 1, x: 0, duration: 0.5, delay: i * 0.06, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 90%' } });
      });
      // Info rows
      gsap.utils.toArray<HTMLElement>('.info-row').forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.4, delay: i * 0.05, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 92%' } });
      });
      // Recruit rows
      gsap.utils.toArray<HTMLElement>('.recruit-row').forEach((el, i) => {
        gsap.fromTo(el, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, delay: i * 0.05, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 92%' } });
      });
      // Generic animations
      gsap.utils.toArray<HTMLElement>('.anim-up').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } });
      });
      gsap.utils.toArray<HTMLElement>('.anim-left').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, x: -80 }, { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } });
      });
      gsap.utils.toArray<HTMLElement>('.anim-right').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, x: 80 }, { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } });
      });
      gsap.utils.toArray<HTMLElement>('.anim-scale').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } });
      });
      // Parallax
      gsap.utils.toArray<HTMLElement>('.parallax-bg').forEach((el) => {
        gsap.to(el, { y: -80, ease: 'none', scrollTrigger: { trigger: el.parentElement!, start: 'top bottom', end: 'bottom top', scrub: true } });
      });
      // Hero parallax
      gsap.to('.hero-bg', { y: 250, ease: 'none', scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true } });
      // Scrolling banner
      gsap.to('.scroll-banner', { x: '-50%', ease: 'none', scrollTrigger: { trigger: '.scroll-banner-wrap', start: 'top bottom', end: 'bottom top', scrub: true } });
      // Stat counters
      gsap.utils.toArray<HTMLElement>('.stat-num').forEach((el) => {
        const target = parseInt(el.dataset.target || '0', 10);
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target, duration: 2, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 85%' },
          onUpdate: () => { el.textContent = String(Math.floor(obj.val)); },
        });
      });
      // Horizontal text reveal
      gsap.utils.toArray<HTMLElement>('.text-reveal').forEach((el) => {
        gsap.fromTo(el, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1, ease: 'power3.inOut', scrollTrigger: { trigger: el, start: 'top 80%' } });
      });
    }, mainRef);
    return () => ctx.revert();
  }, []);

  const handleCategoryChange = (cat: string) => {
    setCategories((prev) => prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]);
  };

  return (
    <Box ref={mainRef} sx={{ backgroundColor: '#fff' }}>
      {/* =============== HERO =============== */}
      <Box id="hero" sx={{ position: 'relative', height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box className="hero-bg" sx={{ position: 'absolute', inset: '-100px 0 0 0', zIndex: 0, overflow: 'hidden' }}>
          <Box component="img" src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80" alt="Building"
            sx={{ width: '100%', height: '130%', objectFit: 'cover', filter: 'brightness(0.35)' }} />
        </Box>
        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(77,166,217,0.2) 0%, rgba(0,0,0,0.35) 50%, rgba(232,68,32,0.12) 100%)', zIndex: 1 }} />
        <Box sx={{ position: 'absolute', top: '8%', right: '-5%', width: 350, height: 80, backgroundColor: RED, opacity: 0.25, transform: 'rotate(-20deg)', zIndex: 2 }} />
        <Box sx={{ position: 'absolute', top: '22%', right: '5%', width: 200, height: 35, backgroundColor: SKY, opacity: 0.2, transform: 'rotate(-20deg)', zIndex: 2 }} />
        <Box sx={{ position: 'absolute', bottom: '15%', left: '-3%', width: 250, height: 50, backgroundColor: '#fff', opacity: 0.05, transform: 'rotate(-20deg)', zIndex: 2 }} />

        <Box sx={{ position: 'relative', zIndex: 3, textAlign: 'center', px: 3 }}>
          <Typography className="anim-up" sx={{ fontSize: { xs: '2.2rem', md: '4.5rem' }, fontWeight: 900, color: '#fff', letterSpacing: '0.12em', lineHeight: 1.3, mb: 3, textShadow: '0 4px 40px rgba(0,0,0,0.4)' }}>
            わかりあう喜びを<br />かたちに
          </Typography>
          <Typography className="anim-up" sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.55)', letterSpacing: '0.3em', fontFamily: '"Helvetica Neue", sans-serif', mb: 5 }}>
            The joy of understanding each other shaped into form.
          </Typography>
          <Box className="anim-up" sx={{ width: 1, height: 70, backgroundColor: 'rgba(255,255,255,0.4)', mx: 'auto' }} />
        </Box>
      </Box>

      {/* =============== ABOUT =============== */}
      <Box id="about" sx={{ position: 'relative', py: { xs: 10, md: 18 }, overflow: 'hidden', background: 'linear-gradient(180deg, #fff 0%, #f8fbfd 100%)' }}>
        <DiagDeco top="60px" width={200} height={12} />
        <DiagDeco top="95px" width={120} height={6} delay={0.1} color={SKY} />
        <Container maxWidth="lg">
          <SectionHeading en="ABOUT" jp="北誠建設とは" />

          {/* SINCERITY - image left, text right (more visual weight) */}
          <Grid container spacing={8} sx={{ mt: 4 }} alignItems="center">
            <Grid size={{ xs: 12, md: 7 }}>
              <Box className="anim-left" sx={{ position: 'relative' }}>
                <Box component="img" src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80" alt="Business meeting"
                  sx={{ width: '100%', height: { xs: 250, md: 340 }, objectFit: 'cover', borderRadius: 2 }} />
                <Box sx={{ position: 'absolute', top: -15, right: -15, width: 60, height: 60, backgroundColor: RED, borderRadius: 1 }} />
                <Box sx={{ position: 'absolute', bottom: -10, left: -10, width: 35, height: 35, border: `3px solid ${SKY}`, borderRadius: 1 }} />
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <Box className="anim-right">
                <Typography sx={{ fontSize: { xs: '2rem', md: '3rem' }, fontWeight: 900, color: DARK, fontFamily: '"Helvetica Neue", sans-serif', letterSpacing: '0.05em' }}>
                  SINCERITY
                </Typography>
                <Box sx={{ width: 40, height: 3, backgroundColor: RED, my: 2 }} />
                <Typography sx={{ fontSize: '0.95rem', color: '#555', lineHeight: 2.4 }}>
                  すべての出会いひとつひとつを<br />大切にし、誠意を尽くす。
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* CONTRIBUTION - text left, image right */}
          <Grid container spacing={8} sx={{ mt: { xs: 6, md: 12 } }} alignItems="center" direction={{ xs: 'column', md: 'row-reverse' }}>
            <Grid size={{ xs: 12, md: 7 }}>
              <Box className="anim-right" sx={{ position: 'relative' }}>
                <Box component="img" src="https://images.unsplash.com/photo-1416431615457-d83c2e18ddc4?w=800&q=80" alt="Nature"
                  sx={{ width: '100%', height: { xs: 250, md: 340 }, objectFit: 'cover', borderRadius: 2 }} />
                <Box sx={{ position: 'absolute', bottom: -15, right: -15, width: 60, height: 60, backgroundColor: SKY, borderRadius: 1 }} />
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <Box className="anim-left">
                <Typography sx={{ fontSize: { xs: '2rem', md: '3rem' }, fontWeight: 900, color: DARK, fontFamily: '"Helvetica Neue", sans-serif', letterSpacing: '0.05em' }}>
                  CONTRIBUTION
                </Typography>
                <Box sx={{ width: 40, height: 3, backgroundColor: SKY, my: 2 }} />
                <Typography sx={{ fontSize: '0.95rem', color: '#555', lineHeight: 2.4 }}>
                  建設を通じて幅広く地域、<br />社会、生命に貢献する。
                </Typography>
              </Box>
            </Grid>
          </Grid>

          {/* TECHNOLOGY - full width dramatic */}
          <Box sx={{ mt: { xs: 6, md: 14 }, position: 'relative' }}>
            <Box className="anim-scale" sx={{ position: 'relative', borderRadius: 3, overflow: 'hidden' }}>
              <Box component="img" src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80" alt="Construction"
                sx={{ width: '100%', height: { xs: 250, md: 400 }, objectFit: 'cover' }} />
              <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(26,26,26,0.7) 0%, rgba(77,166,217,0.3) 100%)' }} />
              <Box sx={{ position: 'absolute', bottom: { xs: 20, md: 40 }, left: { xs: 20, md: 50 } }}>
                <Typography sx={{ fontSize: { xs: '2rem', md: '3.5rem' }, fontWeight: 900, color: '#fff', fontFamily: '"Helvetica Neue", sans-serif', letterSpacing: '0.05em' }}>
                  TECHNOLOGY
                </Typography>
                <Box sx={{ width: 50, height: 3, backgroundColor: RED, my: 2 }} />
                <Typography sx={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.8)', lineHeight: 2 }}>
                  新しいものを率先して取り入れ、技術を高める努力をする。
                </Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* =============== FULL-BLEED PARALLAX BREAK =============== */}
      <Box sx={{ position: 'relative', height: { xs: 300, md: 450 }, overflow: 'hidden' }}>
        <Box className="parallax-bg" sx={{ position: 'absolute', inset: '-80px 0', zIndex: 0 }}>
          <Box component="img" src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=80" alt="Construction site"
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </Box>
        <Box sx={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${DARK}cc 0%, ${RED}66 100%)`, zIndex: 1 }} />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography className="text-reveal" sx={{
            fontSize: { xs: '1.5rem', md: '2.5rem' }, fontWeight: 700, color: '#fff', textAlign: 'center',
            letterSpacing: '0.15em', lineHeight: 1.8,
          }}>
            建設を通じて、<br />人と人をつなぐ。
          </Typography>
        </Container>
      </Box>

      {/* =============== STATS COUNTER =============== */}
      <Box sx={{ py: { xs: 6, md: 10 }, backgroundColor: DARK, position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ position: 'absolute', top: '30%', left: '-10%', width: 500, height: 40, backgroundColor: RED, opacity: 0.05, transform: 'rotate(-20deg)' }} />
        <Container maxWidth="md">
          <Grid container spacing={4} justifyContent="center">
            <Grid size={{ xs: 6, md: 3 }}><StatItem num="2018" suffix="年" label="創立" /></Grid>
            <Grid size={{ xs: 6, md: 3 }}><StatItem num="500" suffix="件+" label="施工実績" /></Grid>
            <Grid size={{ xs: 6, md: 3 }}><StatItem num="5" suffix="種" label="建設業許可" /></Grid>
            <Grid size={{ xs: 6, md: 3 }}><StatItem num="100" suffix="%" label="お客様満足" /></Grid>
          </Grid>
        </Container>
      </Box>

      {/* =============== BUSINESS =============== */}
      <Box id="business" sx={{ position: 'relative', py: { xs: 10, md: 18 }, backgroundColor: LIGHT_BG, overflow: 'hidden' }}>
        <Box sx={{ position: 'absolute', top: -50, left: 0, width: '100%', height: 100, backgroundColor: DARK, transform: 'skewY(-2deg)', zIndex: 0 }} />
        <DiagDeco top="80px" right="30px" width={180} height={10} />
        <DiagDeco top="110px" right="10px" width={100} height={5} delay={0.15} color={SKY} />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <SectionHeading en="BUSINESS" jp="事業内容" align="right" />
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {[
              { title: '設計・新築工事', img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&q=80' },
              { title: '工事に関する現場監督', img: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80' },
              { title: 'オフィス・ビル・病院の内装工事', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80' },
              { title: '外壁のリノベーション', img: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&q=80' },
              { title: '屋上のリノベーション', img: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&q=80' },
              { title: '店舗内装のリノベーション', img: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&q=80' },
              { title: '公共事業の建設工事', img: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&q=80' },
            ].map((item, i) => (
              <Grid key={i} size={{ xs: 6, sm: 4, md: 3 }}>
                <ServiceCard title={item.title} num={i + 1} img={item.img} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* =============== SCROLLING BANNER =============== */}
      <Box className="scroll-banner-wrap" sx={{ py: 3, background: `linear-gradient(135deg, ${RED}, #f05a36, ${SKY})`, overflow: 'hidden' }}>
        <Box className="scroll-banner" sx={{ display: 'flex', whiteSpace: 'nowrap', gap: 8 }}>
          {Array(10).fill(null).map((_, i) => (
            <Typography key={i} sx={{ fontSize: '2.5rem', fontWeight: 900, color: 'rgba(255,255,255,0.15)', fontFamily: '"Helvetica Neue", sans-serif', letterSpacing: '0.1em', flexShrink: 0 }}>
              HOKUSEI CONSTRUCTION
            </Typography>
          ))}
        </Box>
      </Box>

      {/* =============== FLOW (dark, dramatic) =============== */}
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <Grid container sx={{ minHeight: { xs: 'auto', md: 600 } }}>
          {/* Left: Image */}
          <Grid size={{ xs: 12, md: 5 }} sx={{ position: 'relative', minHeight: { xs: 250, md: 'auto' } }}>
            <Box component="img" src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80" alt="Architecture"
              sx={{ position: { md: 'absolute' }, inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            <Box sx={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, transparent 60%, ${DARK} 100%)`, display: { xs: 'none', md: 'block' } }} />
          </Grid>
          {/* Right: Flow content */}
          <Grid size={{ xs: 12, md: 7 }} sx={{ backgroundColor: DARK, py: { xs: 6, md: 8 }, px: { xs: 3, md: 6 } }}>
            <SectionHeading en="FLOW" jp="ご依頼から完了まで" light />
            {[
              'ご依頼内容の確認', '現場の調査、お見積り', '契約書の合意後、契約', '各種図面、計画書作成',
              '関係者様へのご挨拶', '工事着手', '工事内容通りに進行', '工事完了',
            ].map((step, i) => (
              <FlowStep key={i} num={i + 1} title={step} />
            ))}
          </Grid>
        </Grid>
      </Box>

      {/* =============== MESSAGE =============== */}
      <Box sx={{ position: 'relative', py: { xs: 10, md: 18 }, overflow: 'hidden', background: 'linear-gradient(180deg, #fff 0%, #f8fbfd 100%)' }}>
        <DiagDeco top="50px" width={220} height={14} />
        <DiagDeco top="90px" width={140} height={6} delay={0.12} color={SKY} />
        <Container maxWidth="lg">
          <SectionHeading en="MESSAGE" jp="代表メッセージ" />
          <Grid container spacing={8} alignItems="center">
            <Grid size={{ xs: 12, md: 5 }}>
              <Box className="anim-left" sx={{ position: 'relative' }}>
                <Box component="img" src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80" alt="CEO Portrait"
                  sx={{ width: '100%', height: { xs: 300, md: 450 }, objectFit: 'cover', borderRadius: 2, boxShadow: '0 12px 40px rgba(0,0,0,0.12)' }} />
                <Box sx={{ position: 'absolute', top: -15, right: -15, width: 60, height: 60, backgroundColor: RED, borderRadius: 1 }} />
                <Box sx={{ position: 'absolute', bottom: -12, left: -12, width: 40, height: 40, border: `3px solid ${SKY}`, borderRadius: 1 }} />
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 7 }}>
              <Box className="anim-right">
                <Typography className="text-reveal" sx={{ fontSize: { xs: '1.3rem', md: '1.6rem' }, fontWeight: 700, color: DARK, lineHeight: 1.8, mb: 3 }}>
                  「わかりあう喜びをかたちに」
                </Typography>
                <Typography sx={{ fontSize: '0.9rem', color: '#555', lineHeight: 2.6 }}>
                  弊社は、京都、滋賀、大阪を中心に総合建設業を営む会社でございます。
                  主に建設現場での新築工事や改修工事など幅広く展開しております。
                  <br /><br />
                  『わかりあう喜びをかたちに』をキャッチフレーズにクライアント様とのつくりあげる楽しさ、
                  そしてその醍醐味をあらためて実感させていただいております。
                  なにより、ひとりひとりとの出会いに大きな喜びを感じております。
                  <br /><br />
                  これからは、高品質な建物と高品質なサービスを心掛け、多くの方々のご期待に添えるよう
                  社員一同努力してまいります。どんな時も気軽に相談していただける
                  良きパートナーを目指し続けてまいります。
                </Typography>
                <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ width: 40, height: 2, backgroundColor: RED }} />
                  <Typography sx={{ fontSize: '0.85rem', color: '#888' }}>代表取締役　北村 博史</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* =============== PARALLAX BREAK 2 =============== */}
      <Box sx={{ position: 'relative', height: { xs: 200, md: 350 }, overflow: 'hidden' }}>
        <Box className="parallax-bg" sx={{ position: 'absolute', inset: '-80px 0', zIndex: 0 }}>
          <Box component="img" src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80" alt="Office interior"
            sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </Box>
        <Box sx={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${SKY}99 0%, ${DARK}cc 100%)`, zIndex: 1 }} />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography className="text-reveal" sx={{ fontSize: { xs: '1.2rem', md: '2rem' }, fontWeight: 700, color: '#fff', textAlign: 'center', letterSpacing: '0.15em', lineHeight: 1.8 }}>
            確かな技術と誠意で、<br />お客様の想いをかたちに。
          </Typography>
        </Container>
      </Box>

      {/* =============== COMPANY OVERVIEW =============== */}
      <Box sx={{ py: { xs: 10, md: 16 }, backgroundColor: LIGHT_BG, position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ position: 'absolute', top: -40, left: 0, width: '100%', height: 80, backgroundColor: '#fff', transform: 'skewY(2deg)' }} />
        <DiagDeco top="60px" right="20px" width={160} height={10} />
        <DiagDeco top="85px" right="50px" width={90} height={5} delay={0.1} color={SKY} />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <SectionHeading en="COMPANY&#10;OVERVIEW" jp="会社概要" align="right" />
          <Box sx={{ mt: 4, overflow: 'hidden', borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            <InfoRow label="社名">北誠建設株式会社（ホクセイケンセツカブシキガイシャ）</InfoRow>
            <InfoRow label="所在地">〒612-8333　京都府京都市伏見区白銀町944番地</InfoRow>
            <InfoRow label="TEL">075-623-6701</InfoRow>
            <InfoRow label="FAX">075-623-6702</InfoRow>
            <InfoRow label="代表取締役">北村 博史（キタムラヒロフミ）</InfoRow>
            <InfoRow label="従業員数">5名</InfoRow>
            <InfoRow label="資本金">10,000,000円</InfoRow>
            <InfoRow label="建設業許可番号">京都府知事 許可（般一6）第42163号</InfoRow>
            <InfoRow label="建設業の種類">建築工事業、大工工事業、屋根工事業、タイル・煉瓦・ブロック工事業、内装仕上工事業</InfoRow>
            <InfoRow label="事業内容">建築工事一式（企業オフィス、ビル、病院、商業施設、公共事業、個人など）</InfoRow>
            <InfoRow label="創立">2018年11月1日</InfoRow>
            <InfoRow label="設立">2019年2月1日</InfoRow>
            <InfoRow label="主要取引銀行">京都中央信用金庫、京都信用金庫</InfoRow>
          </Box>
        </Container>
      </Box>

      {/* =============== RECRUIT =============== */}
      <Box id="recruit" sx={{ position: 'relative', py: { xs: 10, md: 18 }, overflow: 'hidden', backgroundColor: '#fff' }}>
        <DiagDeco top="40px" width={220} height={14} />
        <DiagDeco top="80px" width={140} height={6} delay={0.1} color={SKY} />
        <Container maxWidth="lg">
          <SectionHeading en="RECRUIT" jp="採用情報" />

          <Grid container spacing={6} sx={{ mb: 6 }}>
            <Grid size={{ xs: 12, md: 5 }}>
              <Box className="anim-left" sx={{ position: 'relative' }}>
                <Box component="img" src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80" alt="Workers"
                  sx={{ width: '100%', height: { xs: 250, md: 380 }, objectFit: 'cover', borderRadius: 2, boxShadow: '0 12px 30px rgba(0,0,0,0.1)' }} />
                <Box sx={{ position: 'absolute', bottom: -12, right: -12, width: 50, height: 50, backgroundColor: RED, borderRadius: 1 }} />
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 7 }}>
              <Box className="anim-scale" sx={{ backgroundColor: '#fff', borderRadius: 2, boxShadow: '0 4px 30px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
                <RecruitRow label="仕事内容">建築工事の施工管理</RecruitRow>
                <RecruitRow label="雇用形態">正社員またはパート・アルバイト（見習い期間あり）</RecruitRow>
                <RecruitRow label="対象となる方">経験：不問　資格：不問　年齢：59歳まで</RecruitRow>
                <RecruitRow label="給与">24万円～業績連動による（スキル、経験により年収は決定）</RecruitRow>
                <RecruitRow label="通勤手当">実費（上限あり）毎月20,000円まで<br />社用車支給（駐車場全額会社負担）</RecruitRow>
              </Box>
            </Grid>
          </Grid>

          <Box className="anim-scale" sx={{ backgroundColor: '#fff', borderRadius: 2, boxShadow: '0 4px 30px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
            <RecruitRow label="就業時間">8：00～17：30（休憩90分）※残業の場合あり</RecruitRow>
            <RecruitRow label="休日等">休日：土曜日・日・祝日　会社カレンダーによる<br />年末年始、GW、夏季6ヶ月経過後の有給休暇日数10日</RecruitRow>
            <RecruitRow label="加入保険">雇用・労災・健康・厚生</RecruitRow>
            <RecruitRow label="諸手当">各種手当あり（資格手当、家族手当、残業手当、通勤手当、休日手当、出張手当）</RecruitRow>
            <RecruitRow label="応募方法">お問い合わせ、またはお電話下さい。075-623-6701 受付/平日9:00～17:30</RecruitRow>
          </Box>

          <Box className="anim-up" sx={{ mt: 8, textAlign: 'center', py: 5, px: 3, backgroundColor: LIGHT_BG, borderRadius: 3 }}>
            <Typography sx={{ fontSize: '0.95rem', color: '#555', lineHeight: 2.6 }}>
              当社は建設工事全般の請負を主に行っております。<br />
              建設現場では担当管理者によって出来栄えや評価は大きく左右されます。<br />
              その醍醐味を味わい、完成時の喜びは他にかえがたいものがあります。<br />
              <strong style={{ color: RED }}>人生を幅広く楽しくするために一緒にどうですか！</strong>
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* =============== ACCESS =============== */}
      <Box id="access" sx={{ py: { xs: 10, md: 16 }, backgroundColor: LIGHT_BG, position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ position: 'absolute', top: -40, left: 0, width: '100%', height: 80, backgroundColor: '#fff', transform: 'skewY(-2deg)' }} />
        <DiagDeco top="50px" width={180} height={10} />
        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
          <SectionHeading en="ACCESS" jp="アクセス" />
          <Box className="anim-up" sx={{ textAlign: 'center', mt: 4 }}>
            <Typography sx={{ fontSize: '1.2rem', fontWeight: 700, color: DARK, mb: 2, letterSpacing: '0.1em' }}>北誠建設株式会社</Typography>
            <Typography variant="body2" sx={{ color: '#666', lineHeight: 2 }}>
              〒612-8333<br />京都市伏見区白銀町944番地<br />
              TEL：075-623-6701 / FAX：075-623-6702<br />平日：8時00分～17時30分
            </Typography>
          </Box>
          <Box className="anim-scale" sx={{ mt: 4, overflow: 'hidden', borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3269.1!2d135.7647!3d34.9345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z5Lqs6YO95biC5LyP6KaL5Yy655m96YqA55S6OTQ05Zyw!5e0!3m2!1sja!2sjp!4v1600000000000"
              width="100%" height="400" style={{ border: 0 }} allowFullScreen loading="lazy" title="Map"
            />
          </Box>
        </Container>
      </Box>

      {/* =============== CONTACT =============== */}
      <Box id="contact" sx={{ py: { xs: 10, md: 16 }, backgroundColor: DARK, position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ position: 'absolute', top: '10%', left: '-5%', width: 300, height: 50, backgroundColor: SKY, opacity: 0.06, transform: 'rotate(-20deg)' }} />
        <Box sx={{ position: 'absolute', bottom: '20%', right: '-5%', width: 200, height: 30, backgroundColor: RED, opacity: 0.06, transform: 'rotate(-20deg)' }} />
        <Container maxWidth="sm">
          <SectionHeading en="CONTACT" jp="お問い合わせ" align="center" light />
          <Typography className="anim-up" sx={{ mb: 5, fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', textAlign: 'center', lineHeight: 2 }}>
            ご依頼、お見積り、求人、その他の内容まで受付けております。<br />お気軽にお問い合わせください。
          </Typography>
          <Box component="form" className="anim-up" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {(['お名前', '電話番号', 'メールアドレス'] as const).map((label) => (
              <TextField key={label} label={label} required fullWidth size="small" variant="filled"
                type={label === 'メールアドレス' ? 'email' : 'text'}
                value={formData[label === 'お名前' ? 'name' : label === '電話番号' ? 'tel' : 'mail']}
                onChange={(e) => {
                  const key = label === 'お名前' ? 'name' : label === '電話番号' ? 'tel' : 'mail';
                  setFormData({ ...formData, [key]: e.target.value });
                }}
                sx={{
                  '& .MuiFilledInput-root': { backgroundColor: 'rgba(255,255,255,0.07)', color: '#fff', borderRadius: 1, '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } },
                  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.45)' },
                  '& .MuiFilledInput-underline:after': { borderBottomColor: SKY },
                }}
              />
            ))}
            <FormGroup row>
              {['お問い合わせ', 'お見積もり', '求人募集', 'その他'].map((cat) => (
                <FormControlLabel key={cat}
                  control={<Checkbox checked={categories.includes(cat)} onChange={() => handleCategoryChange(cat)}
                    sx={{ color: 'rgba(255,255,255,0.25)', '&.Mui-checked': { color: SKY } }} size="small" />}
                  label={<Typography sx={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)' }}>{cat}</Typography>}
                />
              ))}
            </FormGroup>
            <TextField label="お問い合わせ内容" required fullWidth multiline rows={5} variant="filled"
              value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              sx={{
                '& .MuiFilledInput-root': { backgroundColor: 'rgba(255,255,255,0.07)', color: '#fff', borderRadius: 1, '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' } },
                '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.45)' },
                '& .MuiFilledInput-underline:after': { borderBottomColor: SKY },
              }}
            />
            <FormControlLabel
              control={<Checkbox checked={agreed} onChange={(e) => setAgreed(e.target.checked)} sx={{ color: 'rgba(255,255,255,0.25)', '&.Mui-checked': { color: SKY } }} size="small" />}
              label={<Typography sx={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.55)' }}>プライバシーポリシーに同意する</Typography>}
            />
            <Button variant="contained" disabled={!agreed}
              sx={{
                background: `linear-gradient(135deg, ${RED}, ${SKY})`, py: 1.5, fontSize: '0.9rem',
                letterSpacing: '0.15em', fontWeight: 700, borderRadius: 1,
                '&:hover': { transform: 'translateY(-2px)', boxShadow: `0 8px 25px rgba(77,166,217,0.3)` },
                '&.Mui-disabled': { backgroundColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.25)' },
                transition: 'all 0.3s ease',
              }}
            >
              送信する
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Home;
