import React from "react";

const DashboardIcon: React.FC<{ isHovered: boolean; color: string }> = ({
  isHovered,
  color,
}) => {
  return (
    <div
      className="transition-all duration-300"
      style={{ width: "fit-content" }}
    >
      <div className="relative w-6 h-6">
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
          {/* The dashboard icon rectangles */}
          <rect
            width={isHovered ? "7" : "7"}
            height={isHovered ? "7" : "9"}
            x="3"
            y="3"
            rx="1"
            className="transition-all duration-300 ease-in-out"
          />
          <rect
            width="7"
            height={isHovered ? "7" : "5"}
            x="14"
            y="3"
            rx="1"
            className="transition-all duration-300 ease-in-out"
          />
          <rect
            width="7"
            height={isHovered ? "7" : "9"}
            x="14"
            y={isHovered ? "14" : "12"}
            rx="1"
            className="transition-all duration-300 ease-in-out"
          />
          <rect
            width="7"
            height={isHovered ? "7" : "5"}
            x="3"
            y={isHovered ? "14" : "16"}
            rx="1"
            className="transition-all duration-300 ease-in-out"
          />
        </svg>
      </div>
    </div>
  );
};

export default DashboardIcon;
