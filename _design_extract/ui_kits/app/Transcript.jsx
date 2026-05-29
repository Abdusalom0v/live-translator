/* Transcript.jsx
   ----------------------------------------------------------
   Two-panel transcript:
     - Original (left) and Translation (right)
     - Each chunk slides in from bottom (opacity 0→1, y 20→0)
     - "active" chunk has accent border-left + blinking caret
     - "translating" chunk shows three-dot loader
     - Panel auto-scrolls to bottom on new chunk
     - Top of scroll area fades behind a blur mask
   ---------------------------------------------------------- */
const { useEffect: tUseEffect, useRef: tUseRef } = React;

function Chunk({ chunk, side }) {
  const cls = [
    'lt-chunk',
    chunk.active && 'lt-chunk--active',
    chunk.translating && 'lt-chunk--translating',
  ].filter(Boolean).join(' ');
  const text = side === 'left' ? chunk.source : chunk.translation;
  const showDots = side === 'right' && chunk.translating;
  return (
    <div className={cls}>
      <span className="lt-chunk__time">{chunk.time}</span>
      <div className="lt-chunk__text">
        {text}
        {showDots && (
          <span className="lt-dots" aria-label="Translating">
            <span></span><span></span><span></span>
          </span>
        )}
      </div>
      {!chunk.active && !chunk.translating && (
        <button className="lt-chunk__copy" aria-label="Copy">
          <IconCopy size={14} />
        </button>
      )}
    </div>
  );
}

function TranscriptPanel({ side, label, lang, chunks, className = '' }) {
  const scrollRef = tUseRef(null);
  tUseEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chunks.length, chunks[chunks.length - 1]?.translation, chunks[chunks.length - 1]?.source]);
  return (
    <section className={`lt-panel ${className}`} aria-label={label}>
      <header className="lt-panel__head">
        <div className="lt-panel__title">
          <span className="lt-lang__flag" aria-hidden="true">{lang.flag}</span>
          <span style={{ fontWeight: 600 }}>{lang.name}</span>
          <span className="lt-label" style={{ marginLeft: 8 }}>{label}</span>
        </div>
      </header>
      <div className="lt-panel__fade" aria-hidden="true"></div>
      <div className="lt-panel__scroll" ref={scrollRef}>
        {chunks.map((c) => <Chunk key={c.id + side} chunk={c} side={side} />)}
      </div>
    </section>
  );
}

window.TranscriptPanel = TranscriptPanel;
