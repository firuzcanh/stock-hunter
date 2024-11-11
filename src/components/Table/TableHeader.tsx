import { twMerge } from "tailwind-merge";

export type TableHeaderProps = {
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
  className?: string;
};

const TableHeader: React.FC<TableHeaderProps> = ({
  endContent,
  startContent,
  className,
}) => {
  return (
    <div
      className={twMerge("relative z-10 flex justify-between mb-4", className)}
    >
      <div className="flex items-center gap-3">{startContent}</div>

      <div className="flex items-center gap-3">{endContent}</div>
    </div>
  );
};

export default TableHeader;
