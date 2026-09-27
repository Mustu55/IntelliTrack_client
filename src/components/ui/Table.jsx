import React from "react";
import { cn } from "../../utils/cn";

const Table = React.forwardRef(({ className, children, ...props }, ref) => (
  <div className="w-full overflow-x-auto rounded-lg border border-[#222731] bg-[#14171c]">
    <table ref={ref} className={cn("w-full text-left border-collapse text-xs font-sans", className)} {...props}>
      {children}
    </table>
  </div>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef(({ className, children, ...props }, ref) => (
  <thead ref={ref} className={cn("h-9 bg-[#101317] border-b border-[#222731]", className)} {...props}>
    {children}
  </thead>
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef(({ className, children, ...props }, ref) => (
  <tbody ref={ref} className={cn("divide-y divide-[#222731] bg-[#14171c]", className)} {...props}>
    {children}
  </tbody>
));
TableBody.displayName = "TableBody";

const TableRow = React.forwardRef(({ className, children, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn("h-10 hover:bg-[#181d24] transition-colors duration-100 cursor-pointer text-[#f3f4f6]", className)}
    {...props}
  >
    {children}
  </tr>
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef(({ className, children, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "px-3.5 py-2 font-mono text-[10px] text-[#9ca3af] uppercase tracking-wider font-semibold select-none",
      className
    )}
    {...props}
  >
    {children}
  </th>
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef(({ className, children, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("px-3.5 py-2.5 text-[#d1d5db] align-middle font-sans text-xs", className)}
    {...props}
  >
    {children}
  </td>
));
TableCell.displayName = "TableCell";

export { Table, TableBody, TableCell, TableHead, TableHeader, TableRow };
export default Table;

