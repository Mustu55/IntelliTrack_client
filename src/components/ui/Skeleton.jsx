import React from "react";
import { cn } from "../../utils/cn";
const Skeleton = ({ className, ...props }) => {
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      className: cn("animate-pulse rounded bg-surface-container-high/60", className),
      ...props
    }
  );
};
export {
  Skeleton
};
