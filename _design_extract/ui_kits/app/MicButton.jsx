/* MicButton.jsx
   ----------------------------------------------------------
   Microphone button with four states:
     idle       — neutral circle, accent border on hover
     listening  — pulsing icon + 3 ripples expanding outward
     processing — rotating conic-gradient border
     error      — red, shake animation

   Props:
     status: 'idle'|'listening'|'processing'|'error'
     size:   number (px), default 64
     onClick
   ---------------------------------------------------------- */

function MicIcon({ className }) {
  // Lucide "mic" — copied inline so we can size + recolor reliably
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="1.6"
         strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="2" width="6" height="12" rx="3"></rect>
      <path d="M5 10v2a7 7 0 0 0 14 0v-2"></path>
      <line x1="12" y1="19" x2="12" y2="22"></line>
      <line x1="8"  y1="22" x2="16" y2="22"></line>
    </svg>
  );
}

function MicButton({ status = 'idle', size = 64, onClick, ariaLabel }) {
  const showRipples = status === 'listening';
  const cls = `lt-mic lt-mic--${status}`;
  return (
    <button
      type="button"
      className={cls}
      style={{ width: size, height: size }}
      onClick={onClick}
      aria-label={ariaLabel || `Microphone: ${status}`}
      data-status={status}
    >
      {showRipples && <span className="lt-mic__ring"></span>}
      {showRipples && <span className="lt-mic__ring"></span>}
      {showRipples && <span className="lt-mic__ring"></span>}
      <span className="lt-mic__inner">
        <MicIcon className="lt-mic__icon" />
      </span>
    </button>
  );
}

window.MicButton = MicButton;
window.MicIcon = MicIcon;
