import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { key } = useLocation();
  const positions = useRef(new Map());

  useEffect(() => {
    if (positions.current.has(key)) {
      const { x, y } = positions.current.get(key);
      window.scrollTo(x, y);
    } else {
      window.scrollTo(0, 0);
    }

    const handler = () => {
      positions.current.set(key, { x: window.scrollX, y: window.scrollY });
    };

    window.addEventListener('scroll', handler);

    return () => {
      window.removeEventListener('scroll', handler);
    };
  }, [key]);

  return null;
}
