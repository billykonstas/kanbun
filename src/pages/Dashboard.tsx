import { useBoard } from "../contexts/BoardContext.tsx";
import { useEffect } from "react";

const Dashboard = () => {
  const { deselectBoard } = useBoard();
  useEffect(() => {
    deselectBoard();
  });

  return (
    <h2 className="font-bold text-3xl">
      Welcome to Gravy, your daily Kanban organiser!
    </h2>
  );
};

export default Dashboard;
