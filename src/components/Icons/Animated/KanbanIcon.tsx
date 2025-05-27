import React from "react";

const KanbanIcon: React.FC<{ isHovered: boolean; color: string }> = ({
  isHovered,
  color,
}) => {
  return (
    <div
      className="transition-all duration-300"
      style={{ width: "fit-content" }}
    >
      <div className="relative w-7 h-7">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`text-${color}`}
        >
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path
            d={isHovered ? "M8 7v3" : "M8 7v7"}
            className="transition-all duration-300 ease-in-out"
          />
          <path
            d={isHovered ? "M12 7v7" : "M12 7v4"}
            className="transition-all duration-300 ease-in-out"
          />
          <path
            d={isHovered ? "M16 7v6" : "M16 7v9"}
            className="transition-all duration-300 ease-in-out"
          />
        </svg>
      </div>
    </div>
  );
};

export default KanbanIcon;
