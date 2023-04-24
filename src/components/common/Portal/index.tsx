import {
  useEffect,
  useRef,
  useState,
  ReactNode,
  PropsWithChildren,
} from "react";
import ReactDOM from "react-dom";

interface PortalProps {
  children: ReactNode;
}

const Portal = ({ children }: PortalProps & PropsWithChildren) => {
  const [mounted, setMounted] = useState(false);
  const elementRef = useRef<Element | null>(null);

  useEffect(() => {
    setMounted(true);
    if (mounted) {
      const portal = document.createElement("div");
      elementRef.current = portal;
    }

    return () => {
      setMounted(false);
    };
  }, [mounted]);

  if (!mounted || !elementRef.current) {
    return null;
  }

  return ReactDOM.createPortal(children, elementRef.current);
};

export default Portal;
