import { useBoard } from "../contexts/BoardContext.tsx";
import { useEffect } from "react";

const Dashboard = () => {
  const { deselectBoard } = useBoard();
  useEffect(() => {
    deselectBoard();
  });

  return <h2 className="font-bold text-2xl">Kanban Projects Dashboard</h2>;
};

export default Dashboard;
