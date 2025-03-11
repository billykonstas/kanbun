import { Link, useLocation } from "react-router-dom";
import { useBoard } from "@/contexts/BoardContext.tsx";
import React, { useState } from "react";
import DashboardIcon from "../Icons/Animated/DashboardIcon.tsx";
import SettingsIcon from "../Icons/Animated/SettingsIcon.tsx";
import KanbanIcon from "../Icons/Animated/KanbanIcon.tsx";
import { PanelLeftClose, PanelRightClose } from "lucide-react";
import { ROUTES } from "@/utils/routes.ts";

type HoveredState = {
  kanban: boolean;
  dashboard: boolean;
  settings: boolean;
};
const Sidebar: React.FC<{ isOpen: boolean; toggle: () => void }> = ({
  isOpen,
  toggle,
}) => {
  const { boards, currentBoard } = useBoard();
  const [hovered, setHovered] = useState<HoveredState>({
    kanban: false,
    dashboard: false,
    settings: false,
  });

  const route = useLocation().pathname;

  const handleMouseEnter = (icon: keyof HoveredState) => {
    setHovered((prev) => ({ ...prev, [icon]: true }));
  };

  const handleMouseLeave = (icon: keyof HoveredState) => {
    setHovered((prev) => ({ ...prev, [icon]: false }));
  };

  return (
    <div
      className={`bg-beige border-r border-gray p-3 h-full overflow-x-hidden transition-all duration-300 flex flex-col justify-between ${isOpen ? "w-52 min-w-52" : "w-16 min-w-16"}`}
    >
      {/*Boards List*/}
      <div>
        <div
          className={`flex justify-between pb-2 border-b-1 border-gray items-center min-h-[37px] ${isOpen ? "" : "justify-center"}`}
        >
          {isOpen && (
            <span className="text-xl font-semibold text-brown max-h-7 whitespace-nowrap">
              My boards
            </span>
          )}
          {isOpen ? (
            <PanelLeftClose
              className="cursor-pointer text-brown"
              onClick={() => {
                toggle();
              }}
            />
          ) : (
            <PanelRightClose
              className="cursor-pointer text-brown"
              onClick={() => {
                toggle();
              }}
            />
          )}
        </div>

        <ul className="mt-3">
          {boards &&
            boards.map((board) => (
              <Link
                to={ROUTES.BOARD(board.id)}
                key={board.id}
                onMouseEnter={() => handleMouseEnter("kanban")}
                onMouseLeave={() => handleMouseLeave("kanban")}
              >
                <li
                  key={board.id}
                  className={`flex gap-2 text-brown p-2 hover:bg-pink rounded-lg transition-all duration-300 relative overflow-x-hidden whitespace-nowrap max-h-10 ${
                    currentBoard?.id === board.id ? "bg-pink" : ""
                  } ${isOpen ? "pl-3" : ""}`}
                >
                  {currentBoard?.id === board.id && isOpen && (
                    <div className="w-2 h-full bg-brown rounded-l-sm absolute left-0 top-0"></div>
                  )}
                  <KanbanIcon isHovered={hovered.kanban} color="brown" />
                  <span className="overflow-hidden ">{board.title}</span>
                </li>
              </Link>
            ))}
        </ul>
      </div>
      {/*Navigation*/}
      <div className="flex flex-col gap-1 relative text-lg py-3 border-y-1 text-brown font-semibold border-gray overflow-x-hidden">
        <Link
          to={ROUTES.DASHBOARD}
          className={`flex items-center gap-2 p-2 hover:bg-pink rounded-lg transition-all duration-300 ${route === ROUTES.DASHBOARD ? "bg-pink" : ""}`}
          onMouseEnter={() => handleMouseEnter("dashboard")}
          onMouseLeave={() => handleMouseLeave("dashboard")}
        >
          <DashboardIcon isHovered={hovered.dashboard} color="brown" />
          <span>Dashboard</span>
        </Link>
        <Link
          to={ROUTES.SETTINGS}
          className={`flex items-center gap-2 p-2 hover:bg-pink rounded-lg transition-all duration-300 ${route === ROUTES.SETTINGS ? "bg-pink" : ""}`}
          onMouseEnter={() => handleMouseEnter("settings")}
          onMouseLeave={() => handleMouseLeave("settings")}
        >
          <SettingsIcon isHovered={hovered.settings} color="brown" />
          <span>Settings</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
