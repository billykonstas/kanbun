import { useBoard } from "../contexts/BoardContext.tsx";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

const Dashboard = () => {
  const { deselectBoard, boards } = useBoard();
  useEffect(() => {
    deselectBoard();
  });

  return (
    <div className="w-full h-full">
      <h2 className="font-bold text-2xl bg-beige w-fit mb-6">
        Kanban Projects Dashboard
      </h2>
      <div className="flex flex-row pl-4 pt-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-6 w-fit">
          <div className="bg-pink text-brown border-1 border-solid border-gray min-w-44 h-30 text-base flex justify-center items-center rounded-lg drop-shadow-xs cursor-pointer hover:drop-shadow-md transition-all duration-300 ease-in-out">
            <Plus strokeWidth="2" />
          </div>
          {boards.map((board) => (
            <Link
              to={`board/${board.id}`}
              key={board.id}
              className="bg-pink border-1 border-solid border-gray min-w-44 h-30 text-base flex justify-center items-center rounded-lg drop-shadow-xs cursor-pointer hover:drop-shadow-md transition-all duration-300 ease-in-out"
            >
              <div className="w-full h-full px-4 py-3">
                <h3 className="text-lg font-semibold mb-2">{board.title}</h3>
                <div>{board.description}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
