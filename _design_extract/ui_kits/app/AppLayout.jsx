/* AppLayout.jsx
   ----------------------------------------------------------
   Composite app shell. Mounts:
     - AnimatedBackground
     - Header (logo, settings, history)
     - Language bar (source ↔ target)
     - Main: two TranscriptPanel s
     - Controls (mic, devices, voice, toggles)
     - Status bar (recording, latency, save)
   Simulates incoming chunks while "listening" so the demo
   shows the chunk-in animation and auto-scroll.
   ---------------------------------------------------------- */
const { useState: aUseState, useEffect: aUseEffect, useRef: aUseRef } = React;

const SAMPLE_CHUNKS = [
  {
    source: "Today we'll talk about photosynthesis.",
    translation: "Bugun fotosintez haqida gaplashamiz.",
    time: '14:21',
  },
  {
    source: "Plants take in carbon dioxide from the air.",
    translation: "O'simliklar havodan karbonat angidridni oladi.",
    time: '14:22',
  },
  {
    source: "The green pigment is called chlorophyll.",
    translation: "Yashil pigment xlorofil deb ataladi.",
    time: '14:22',
  },
  {
    source: "It absorbs sunlight, mostly red and blue wavelengths.",
    translation: "U quyosh nurini, asosan qizil va ko'k to'lqinlarni yutadi.",
    time: '14:23',
  },
];

function Header() {
  return (
    <header className="lt-header">
      <div className="lt-logo">
        <div className="lt-logo__mark">
          <IconSparkles size={18} strokeWidth={2} />
        </div>
        LiveTranslate
        <span className="lt-pill">BETA</span>
      </div>
      <div className="lt-header__actions">
        <button className="lt-iconbtn" aria-label="History"><IconHistory /></button>
        <button className="lt-iconbtn" aria-label="Settings"><IconSettings /></button>
      </div>
    </header>
  );
}

function LangBar({ source, target, onSwap }) {
  return (
    <div className="lt-langbar">
      <button className="lt-lang">
        <span className="lt-lang__flag">{source.flag}</span>
        {source.name}
        <IconChevron size={16} />
      </button>
      <button className="lt-lang__swap" aria-label="Swap languages" onClick={onSwap}>
        <IconSwap size={18} />
      </button>
      <button className="lt-lang lt-lang--right">
        <span className="lt-lang__flag">{target.flag}</span>
        {target.name}
        <IconChevron size={16} />
      </button>
    </div>
  );
}

function Waveform({ active }) {
  const w1 = aUseRef(null), w2 = aUseRef(null), w3 = aUseRef(null);
  const SAMPLES = 64;
  const WIDTH = 600;
  const HEIGHT = 56;
  const MID = HEIGHT / 2;

  aUseEffect(() => {
    if (!active) {
      [w1, w2, w3].forEach(r => r.current && r.current.setAttribute('d', `M0 ${MID} L${WIDTH} ${MID}`));
      return;
    }
    let raf, t = 0;
    const envelope = (time) => {
      const slow = 0.5 + 0.35 * Math.sin(time * 0.0008);
      const med  = 0.5 + 0.30 * Math.sin(time * 0.003 + 1.7);
      const fast = 0.5 + 0.45 * Math.sin(time * 0.012 + 3.3);
      let a = slow * 0.55 + med * 0.30 + fast * 0.35;
      const gate = (Math.sin(time * 0.0006) + 0.7);
      a *= Math.max(0.15, Math.min(1, gate));
      return Math.max(0.08, Math.min(1, a));
    };
    const path = (time, amp, phase, freq) => {
      let d = '';
      for (let i = 0; i <= SAMPLES; i++) {
        const x = (i / SAMPLES) * WIDTH;
        const tau = i / SAMPLES;
        const win = Math.sin(tau * Math.PI);
        const y = MID
          + Math.sin(tau * Math.PI * freq + time * 0.005 + phase) * 12 * amp * win
          + Math.sin(tau * Math.PI * (freq * 1.7) - time * 0.003 + phase * 1.3) * 6 * amp * win;
        d += (i === 0 ? 'M ' : ' L ') + x.toFixed(1) + ' ' + y.toFixed(1);
      }
      return d;
    };
    const tick = () => {
      t += 16;
      const amp = envelope(t);
      if (w1.current) w1.current.setAttribute('d', path(t, amp,        0,    5));
      if (w2.current) w2.current.setAttribute('d', path(t, amp * 0.78, 1.2,  7));
      if (w3.current) w3.current.setAttribute('d', path(t, amp * 0.55, 2.4,  9));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  return (
    <svg
      className={`lt-flow ${active ? '' : 'lt-flow--idle'}`}
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ltflow-grad" x1="0" x2="1">
          <stop offset="0"   stopColor="#7F77DD"/>
          <stop offset=".5"  stopColor="#9B91F2"/>
          <stop offset="1"   stopColor="#7F77DD"/>
        </linearGradient>
      </defs>
      <path ref={w3} className="lt-flow__path lt-flow__path--3" d={`M0 ${MID}`} />
      <path ref={w2} className="lt-flow__path lt-flow__path--2" d={`M0 ${MID}`} />
      <path ref={w1} className="lt-flow__path lt-flow__path--1" d={`M0 ${MID}`} stroke="url(#ltflow-grad)" />
    </svg>
  );
}

function ControlsBar({ status, setStatus }) {
  const next = {
    idle: 'listening',
    listening: 'processing',
    processing: 'idle',
    error: 'idle',
  };
  return (
    <div className="lt-controls">
      <div className="lt-controls__mic">
        <MicButton status={status} size={64}
          onClick={() => setStatus(next[status])} />
      </div>
      <Waveform active={status === 'listening'} />
      <div className="lt-controls__spacer"></div>
      <button className="lt-control-btn">
        <IconHeadphones size={16} /> Built-in mic
        <IconChevron size={14} />
      </button>
      <button className="lt-control-btn">
        <IconVolume size={16} /> Voice off
        <IconChevron size={14} />
      </button>
      <button className="lt-control-btn lt-control-btn--active">
        <span style={{ width: 8, height: 8, borderRadius: 999, background: 'currentColor' }}></span>
        Auto-scroll
      </button>
      <button className="lt-control-btn lt-control-btn--toggle" title="Projector mode">
        <IconSparkles size={16} />
      </button>
    </div>
  );
}

function StatusBar({ status }) {
  const isRec = status === 'listening';
  return (
    <div className="lt-statusbar">
      <span className={`lt-status-rec ${isRec ? '' : 'lt-status-rec--ready'}`}>
        <span className="lt-status-rec__dot"></span>
        {isRec ? 'Yozilmoqda' : 'Tayyor'}
      </span>
      <span className="lt-status-latency">~1.2s</span>
      <span className="lt-status-latency" style={{ color: 'var(--fg-3)' }}>
        4 chunks · 28s
      </span>
      <div className="lt-statusbar__spacer"></div>
      <button className="lt-save-btn"><IconSave size={16} /> Saqlash</button>
    </div>
  );
}

function AppLayout({ initialLanguages }) {
  const sourceLang = initialLanguages?.source
    ? window.LIVETRANSLATE_LANGS.find(l => l.code === initialLanguages.source)
    : window.LIVETRANSLATE_LANGS[0];
  const targetLang = initialLanguages?.target
    ? window.LIVETRANSLATE_LANGS.find(l => l.code === initialLanguages.target)
    : window.LIVETRANSLATE_LANGS[1];

  const [source, setSource] = aUseState(sourceLang);
  const [target, setTarget] = aUseState(targetLang);
  const [status, setStatus] = aUseState('listening');
  const [chunks, setChunks] = aUseState(() =>
    SAMPLE_CHUNKS.slice(0, 3).map((c, i) => ({ ...c, id: i, active: false, translating: false }))
  );

  // Simulate a live chunk being typed + translated when listening
  aUseEffect(() => {
    if (status !== 'listening') return;
    let cancelled = false;
    const id = setTimeout(() => {
      if (cancelled) return;
      const incoming = SAMPLE_CHUNKS[3];
      setChunks(prev => [...prev, { ...incoming, id: prev.length, active: true, translating: true, translation: '' }]);
      // Type the source word-by-word
      const words = incoming.source.split(' ');
      let i = 0;
      const typer = setInterval(() => {
        if (cancelled) return clearInterval(typer);
        i++;
        setChunks(prev => prev.map((c, idx) =>
          idx === prev.length - 1
            ? { ...c, source: words.slice(0, i).join(' ') }
            : c
        ));
        if (i >= words.length) {
          clearInterval(typer);
          // Then fill translation
          setTimeout(() => {
            if (cancelled) return;
            setChunks(prev => prev.map((c, idx) =>
              idx === prev.length - 1
                ? { ...c, translation: incoming.translation, active: false, translating: false }
                : c
            ));
          }, 800);
        }
      }, 220);
    }, 1200);
    return () => { cancelled = true; clearTimeout(id); };
  }, [status, chunks.length === 3]);

  const onSwap = () => { const s = source; setSource(target); setTarget(s); };

  // Mobile: which side is shown (left=original, right=translation)
  const [activeSide, setActiveSide] = aUseState('right');

  return (
    <div className="lt-app">
      <Header />
      <LangBar source={source} target={target} onSwap={onSwap} />
      <div className="lt-tabs" role="tablist" aria-label="Transcript view">
        <button
          role="tab"
          aria-pressed={activeSide === 'left'}
          onClick={() => setActiveSide('left')}>
          <span className="flag">{source.flag}</span>
          {source.name}
        </button>
        <button
          role="tab"
          aria-pressed={activeSide === 'right'}
          onClick={() => setActiveSide('right')}>
          <span className="flag">{target.flag}</span>
          {target.name}
        </button>
      </div>
      <div className="lt-main">
        <TranscriptPanel side="left"  label="ORIGINAL"    lang={source} chunks={chunks}
          className={activeSide === 'left'  ? 'is-active' : ''} />
        <TranscriptPanel side="right" label="TRANSLATION" lang={target} chunks={chunks}
          className={activeSide === 'right' ? 'is-active' : ''} />
      </div>
      <ControlsBar status={status} setStatus={setStatus} />
      <StatusBar status={status} />
    </div>
  );
}

window.AppLayout = AppLayout;
