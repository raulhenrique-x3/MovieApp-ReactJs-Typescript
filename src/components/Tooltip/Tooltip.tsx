import React, { useState } from "react";
import "./tooltip.css";

interface TooltipProps {
  description?: string;
  children?: any | React.ReactNode;
  direction?: string;
}

export const Tooltip: React.FC<TooltipProps> = ({ description, children, direction }) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <span className="container" onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
      {isVisible && <span className={`tooltip ${direction || "bottom"}`}>{description}</span>}
      {children}
    </span>
  );
};
