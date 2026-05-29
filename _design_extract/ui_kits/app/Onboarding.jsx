/* Onboarding.jsx
   ----------------------------------------------------------
   3-step onboarding flow.
     Step 1: Welcome — animated mic logo + product line
     Step 2: Microphone permission request
     Step 3: Source + target language picker
   ---------------------------------------------------------- */
const { useState: oUseState } = React;

const LANGS = [
  { code: 'en', name: 'English',  flag: '🇬🇧' },
  { code: 'uz', name: "O'zbekcha", flag: '🇺🇿' },
  { code: 'es', name: 'Español',  flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch',  flag: '🇩🇪' },
  { code: 'ru', name: 'Русский',  flag: '🇷🇺' },
];

function ProgressDots({ step, total = 3 }) {
  return (
    <div className="lt-onb__progress">
      {Array.from({ length: total }).map((_, i) => (
        <span key={i} className={`lt-onb__dot ${i === step ? 'lt-onb__dot--active' : ''}`}></span>
      ))}
    </div>
  );
}

function OnboardingStep1({ onNext }) {
  return (
    <div className="lt-onb__step">
      <div className="lt-onb__hero" aria-hidden="true">
        <IconMic size={56} strokeWidth={1.4} />
      </div>
      <h1 className="lt-onb__title">LiveTranslate</h1>
      <p className="lt-onb__sub">
        Real-time tarjimon — dars vaqtida ustoz va talabalar uchun.
        Gapiring, biz darhol tarjima qilamiz.
      </p>
      <button className="lt-btn" onClick={onNext}>
        Boshlash <IconChevron size={18} style={{ transform: 'rotate(-90deg)' }} />
      </button>
    </div>
  );
}

function OnboardingStep2({ onNext }) {
  return (
    <div className="lt-onb__step">
      <div className="lt-onb__hero" style={{ background: 'var(--color-card)', boxShadow: 'none' }}>
        <IconShield size={56} strokeWidth={1.4} />
      </div>
      <h1 className="lt-onb__title">Mikrofon kerak</h1>
      <p className="lt-onb__sub">
        LiveTranslate sizning ovozingizni eshitishi va tarjima qilishi uchun
        mikrofon ruxsati kerak. Hech narsa sizning ruxsatingizsiz yuborilmaydi.
      </p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
        <button className="lt-btn lt-btn--ghost" onClick={onNext}>Keyinroq</button>
        <button className="lt-btn" onClick={onNext}>
          <IconMic size={18} /> Ruxsat berish
        </button>
      </div>
    </div>
  );
}

function OnboardingStep3({ onNext, source, target, setSource, setTarget }) {
  return (
    <div className="lt-onb__step" style={{ maxWidth: 640 }}>
      <h1 className="lt-onb__title" style={{ fontSize: 32 }}>Tillarni tanlang</h1>
      <p className="lt-onb__sub">Manba va tarjima tillarini tanlang.</p>
      <div className="lt-langpicker">
        <div className="lt-langpicker__col">
          <span className="lt-langpicker__label">Manba tili</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {LANGS.slice(0, 3).map(l => (
              <button key={l.code}
                className={`lt-langtile ${source === l.code ? 'lt-langtile--active' : ''}`}
                onClick={() => setSource(l.code)}>
                <span className="lt-langtile__flag">{l.flag}</span>
                {l.name}
              </button>
            ))}
          </div>
        </div>
        <div className="lt-langpicker__col">
          <span className="lt-langpicker__label">Tarjima tili</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {LANGS.slice(0, 3).map(l => (
              <button key={l.code}
                className={`lt-langtile ${target === l.code ? 'lt-langtile--active' : ''}`}
                onClick={() => setTarget(l.code)}>
                <span className="lt-langtile__flag">{l.flag}</span>
                {l.name}
              </button>
            ))}
          </div>
        </div>
      </div>
      <button className="lt-btn" onClick={onNext}>Boshlash</button>
    </div>
  );
}

function Onboarding({ onComplete }) {
  const [step, setStep] = oUseState(0);
  const [source, setSource] = oUseState('en');
  const [target, setTarget] = oUseState('uz');
  const next = () => {
    if (step >= 2) onComplete?.({ source, target });
    else setStep(step + 1);
  };
  return (
    <div className="lt-onb">
      <button className="lt-onb__skip" onClick={() => onComplete?.({ source, target })}>
        O'tkazib yuborish
      </button>
      {step === 0 && <OnboardingStep1 onNext={next} />}
      {step === 1 && <OnboardingStep2 onNext={next} />}
      {step === 2 && <OnboardingStep3 onNext={next}
                       source={source} target={target}
                       setSource={setSource} setTarget={setTarget} />}
      <ProgressDots step={step} total={3} />
    </div>
  );
}

window.Onboarding = Onboarding;
window.LIVETRANSLATE_LANGS = LANGS;
