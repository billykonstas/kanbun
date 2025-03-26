import React from "react";

const SettingsIcon: React.FC<{
  isHovered: boolean;
  color: string;
}> = ({ isHovered, color }) => {
  return (
    <div
      className="transition-all duration-500"
      style={{ width: "24px", height: "24px" }}
    >
      <div className="relative">
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
          {/* Horizontal lines - these stay fixed */}
          <path d={"M20 7h-15"} />
          <path d={"M20 17h-15"} />

          {/* Circles that will switch positions */}
          <circle
            cx={isHovered ? "7" : "17"}
            cy={isHovered ? "17" : "17"}
            r="3"
            className="transition-all duration-700 ease-in-out fill-pink"
            style={{
              transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          />
          <circle
            cx={isHovered ? "17" : "7"}
            cy={isHovered ? "7" : "7"}
            r="3"
            className="transition-all duration-700 ease-in-out fill-pink"
            style={{
              transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          />
        </svg>
      </div>
    </div>
  );
};

export default SettingsIcon;
