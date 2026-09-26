import React from "react";
import { cn } from "../../utils/cn";
const Table = React.forwardRef(
  ({ className, children, ...props }, ref) => /* @__PURE__ */ React.createElement("div", { className: "w-full overflow-x-auto rounded border border-outline-variant/60 shadow-sm bg-surface-container-lowest" }, /* @__PURE__ */ React.createElement("table", { ref, className: cn("w-full text-left border-collapse text-body-sm font-body-sm", className), ...props }, children))
);
Table.displayName = "Table";
const TableHeader = React.forwardRef(
  ({ className, children, ...props }, ref) => /* @__PURE__ */ React.createElement("thead", { ref, className: cn("h-8 bg-surface-container-high border-b border-outline-variant", className), ...props }, children)
);
TableHeader.displayName = "TableHeader";
const TableBody = React.forwardRef(
  ({ className, children, ...props }, ref) => /* @__PURE__ */ React.createElement("tbody", { ref, className: cn("divide-y divide-outline-variant/40 bg-surface-container-lowest", className), ...props }, children)
);
TableBody.displayName = "TableBody";
const TableRow = React.forwardRef(
  ({ className, children, ...props }, ref) => /* @__PURE__ */ React.createElement(
    "tr",
    {
      ref,
      className: cn("h-10 hover:bg-surface-container-low transition-colors duration-100 cursor-pointer", className),
      ...props
    },
    children
  )
);
TableRow.displayName = "TableRow";
const TableHead = React.forwardRef(
  ({ className, children, ...props }, ref) => /* @__PURE__ */ React.createElement(
    "th",
    {
      ref,
      className: cn(
        "px-3 py-1 font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold select-none",
        className
      ),
      ...props
    },
    children
  )
);
TableHead.displayName = "TableHead";
const TableCell = React.forwardRef(
  ({ className, children, ...props }, ref) => /* @__PURE__ */ React.createElement(
    "td",
    {
      ref,
      className: cn("px-3 py-1.5 text-on-surface align-middle font-tabular-nums", className),
      ...props
    },
    children
  )
);
TableCell.displayName = "TableCell";
export {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
};
