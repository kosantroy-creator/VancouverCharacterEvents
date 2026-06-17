import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type CinemaContextValue = {
  /** True while the fullscreen "Watch Us In Action" reel is on screen. */
  isCinema: boolean;
  setCinema: (on: boolean) => void;
};

const CinemaContext = createContext<CinemaContextValue>({
  isCinema: false,
  setCinema: () => {},
});

/**
 * CinemaProvider — shares the hero "cinema mode" flag across the chrome (Header)
 * and the page. When the reel plays, the header glides away and the page locks
 * scroll; when it ends, everything slides back. Provided once at the root.
 */
export function CinemaProvider({ children }: { children: ReactNode }) {
  const [isCinema, setCinema] = useState(false);

  // Lock background scroll while the reel is on screen.
  useEffect(() => {
    if (!isCinema) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isCinema]);

  return (
    <CinemaContext.Provider value={{ isCinema, setCinema }}>{children}</CinemaContext.Provider>
  );
}

export const useCinema = () => useContext(CinemaContext);
