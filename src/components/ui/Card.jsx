import React from "react";
import { cn } from "../../utils/cn";

const Card = React.forwardRef(
  ({ className, hoverEffect = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "bg-[#14171c] border border-[#222731] rounded-lg overflow-hidden",
          hoverEffect && "hover:border-[#2d3542] hover:bg-[#161a20] transition-all duration-150",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";

const CardHeader = ({ className, children, ...props }) => (
  <div className={cn("px-4 py-3 border-b border-[#222731] bg-[#101317]/50 flex items-center justify-between", className)} {...props}>
    {children}
  </div>
);

const CardTitle = ({ className, children, ...props }) => (
  <h3 className={cn("text-xs font-semibold text-[#f3f4f6] tracking-wide uppercase font-mono", className)} {...props}>
    {children}
  </h3>
);

const CardDescription = ({ className, children, ...props }) => (
  <p className={cn("text-[11px] text-[#9ca3af] mt-0.5", className)} {...props}>
    {children}
  </p>
);

const CardContent = ({ className, children, ...props }) => (
  <div className={cn("p-4", className)} {...props}>
    {children}
  </div>
);

const CardFooter = ({ className, children, ...props }) => (
  <div className={cn("px-4 py-2.5 bg-[#101317]/60 border-t border-[#222731] flex items-center justify-between text-xs text-[#9ca3af]", className)} {...props}>
    {children}
  </div>
);

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
export default Card;

