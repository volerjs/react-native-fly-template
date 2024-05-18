import {useRef} from 'react';
const useDebounce = (
  func: Function,
  wait: number = 3000,
  immediate: boolean = true,
) => {
  const timeout = useRef<NodeJS.Timeout | null>(null);
  return (...args: any) => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    if (immediate) {
      var callNow = !timeout.current;
      timeout.current = setTimeout(() => {
        timeout.current = null;
      }, wait);
      if (callNow) {
        func(...args);
      }
    } else {
      timeout.current = setTimeout(() => {
        func(...args);
      }, wait);
    }
  };
};

export default useDebounce;
