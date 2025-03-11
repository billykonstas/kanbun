// src/pages/BoardView.jsx
import { useParams } from "react-router-dom";
import Board from "@/components/Board/Board";

const BoardView = () => {
  const { boardId } = useParams();

  return (
    <div>
      <Board boardId={boardId} />
    </div>
  );
};

export default BoardView;
