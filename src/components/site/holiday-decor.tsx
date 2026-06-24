/**
 * holiday-decor — shared decorative SVG props for the Holiday Village sections
 * (cream / berry / antique-gold + seasonal accents, NO brown wood). All aria-hidden.
 * Used to dress the "dead" edges of HolidayPasses / HolidayNotes / HolidayFaq /
 * HolidayBooking with Christmas trees, wreaths, gifts, candles, blossoms, eggs,
 * pumpkins, holly and ornaments.
 */

export function Blossom({ className, color, center = "#E2C271" }: { className?: string; color: string; center?: string }) {
  return (
    <svg className={className} viewBox="0 0 36 36" aria-hidden>
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx="18" cy="8" rx="4.8" ry="7.6" fill={color} transform={`rotate(${a} 18 18)`} />
      ))}
      <circle cx="18" cy="18" r="3.8" fill={center} />
    </svg>
  );
}

export function Holly({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" aria-hidden>
      <path d="M20 6 C26 10 26 17 20 21 C14 17 14 10 20 6 Z" fill="#1F6E45" transform="rotate(-26 20 14)" />
      <path d="M20 6 C26 10 26 17 20 21 C14 17 14 10 20 6 Z" fill="#2C7D4F" transform="rotate(26 20 14)" />
      <circle cx="18" cy="24" r="3" fill="#C8262C" /><circle cx="23" cy="26" r="3" fill="#B0232A" /><circle cx="20" cy="29" r="3" fill="#D23A38" />
    </svg>
  );
}

export function EasterEgg({ className, color, dot = "#FFFDF5" }: { className?: string; color: string; dot?: string }) {
  return (
    <svg className={className} viewBox="0 0 32 42" aria-hidden>
      <path d="M16 2 C24 2 29 16 29 26 C29 35 23 40 16 40 C9 40 3 35 3 26 C3 16 8 2 16 2 Z" fill={color} />
      <path d="M3.6 24 q12.4 6.5 24.8 0 l0 4.6 q-12.4 6.5 -24.8 0 Z" fill={dot} opacity="0.82" />
      <g fill={dot} opacity="0.9"><circle cx="10" cy="15" r="1.5" /><circle cx="16" cy="12" r="1.5" /><circle cx="22" cy="15" r="1.5" /></g>
    </svg>
  );
}

export function MiniPumpkin({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 42 34" aria-hidden>
      <ellipse cx="21" cy="21" rx="14" ry="11" fill="#E07B39" />
      <ellipse cx="14" cy="21" rx="5.4" ry="11" fill="#D9722F" /><ellipse cx="28" cy="21" rx="5.4" ry="11" fill="#D9722F" />
      <ellipse cx="21" cy="21" rx="3.4" ry="11" fill="#C9651F" />
      <rect x="19" y="6" width="4" height="7" rx="1.5" fill="#3E6B3A" />
    </svg>
  );
}

export function Ornament({ className, color }: { className?: string; color: string }) {
  return (
    <svg className={className} viewBox="0 0 24 30" aria-hidden>
      <rect x="9.5" y="4" width="5" height="4" rx="1" fill="#C9A24B" />
      <circle cx="12" cy="19" r="9" fill={color} />
      <path d="M4 16 q8 4 16 0" stroke="#E2C271" strokeWidth="1.4" fill="none" opacity="0.7" />
      <ellipse cx="9" cy="15" rx="2.2" ry="3" fill="#fff" opacity="0.35" />
    </svg>
  );
}

export function Present({ className, box = "#B0232A", ribbon = "#E0C271" }: { className?: string; box?: string; ribbon?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden>
      <rect x="7" y="19" width="34" height="25" rx="2" fill={box} />
      <rect x="4" y="14" width="40" height="8" rx="2" fill={box} />
      <rect x="20" y="14" width="8" height="30" fill={ribbon} />
      <rect x="4" y="16" width="40" height="4" fill={ribbon} />
      <path d="M24 14 C18 5 8 7 12 14 C15 18 21 16 24 14 Z" fill={ribbon} />
      <path d="M24 14 C30 5 40 7 36 14 C33 18 27 16 24 14 Z" fill={ribbon} />
      <circle cx="24" cy="13.5" r="3" fill="#FBF3E0" />
    </svg>
  );
}

/** Decorated evergreen Christmas tree with a gold star, baubles and a gold pot (no brown trunk). */
export function ChristmasTree({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 86" aria-hidden>
      <path d="M30 2 l2.3 4.9 5.4.5 -4 3.7 1.1 5.3 -4.8-2.7 -4.8 2.7 1.1-5.3 -4-3.7 5.4-.5z" fill="#E2C271" />
      <path d="M30 12 L44 36 L16 36 Z" fill="#2C7D4F" />
      <path d="M30 26 L50 54 L10 54 Z" fill="#1E6E4A" />
      <path d="M30 42 L55 74 L5 74 Z" fill="#2C7D4F" />
      <g>
        <circle cx="24" cy="32" r="2.2" fill="#B0232A" /><circle cx="36" cy="46" r="2.2" fill="#E2C271" />
        <circle cx="21" cy="50" r="2.2" fill="#E2C271" /><circle cx="39" cy="64" r="2.2" fill="#B0232A" />
        <circle cx="30" cy="60" r="2.2" fill="#9B7BB8" /><circle cx="30" cy="40" r="2.2" fill="#3E7CA8" />
      </g>
      <path d="M21 74 h18 l-2.4 9 h-13.2 z" fill="#C19A3C" />
      <rect x="19" y="72" width="22" height="4.5" rx="1.5" fill="#9A6E2B" />
    </svg>
  );
}

/** Evergreen wreath with red berries and a berry-bow. */
export function Wreath({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 64" aria-hidden>
      <circle cx="30" cy="30" r="20" fill="none" stroke="#1E6E4A" strokeWidth="11" />
      <circle cx="30" cy="30" r="20" fill="none" stroke="#2C7D4F" strokeWidth="6" strokeDasharray="2 5" />
      <g fill="#B0232A">
        <circle cx="30" cy="9.5" r="2.2" /><circle cx="48" cy="23" r="2" /><circle cx="12" cy="23" r="2" />
        <circle cx="41" cy="46" r="2" /><circle cx="19" cy="46" r="2" />
      </g>
      <path d="M30 49 C24 43 16 46 20 52 C23 56 28 53 30 49 Z" fill="#C8262C" />
      <path d="M30 49 C36 43 44 46 40 52 C37 56 32 53 30 49 Z" fill="#C8262C" />
      <circle cx="30" cy="49" r="3" fill="#E2C271" />
    </svg>
  );
}

/** Warm candle in a gold holder (no brown). */
export function Candle({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 28 50" aria-hidden>
      <path d="M14 3 c-2.6 3.6 -2.6 8 0 11 c2.6 -3 2.6 -7.4 0 -11z" fill="#F7A93B" />
      <ellipse cx="14" cy="11" rx="1.5" ry="2.6" fill="#FFF1C2" />
      <rect x="9" y="16" width="10" height="25" rx="2.5" fill="#FBEFD2" />
      <rect x="9" y="16" width="10" height="5" rx="2.5" fill="#FFFDF5" />
      <path d="M6 41 h16 l-2 6 h-12 z" fill="#C19A3C" />
      <rect x="5" y="39" width="18" height="4" rx="1.5" fill="#9A6E2B" />
    </svg>
  );
}
