import React, { useEffect } from "react";
import Column from "./Column.tsx";
import { useBoard } from "@/contexts/BoardContext.tsx";
import { Board as BoardType } from "@/types/board.ts";
import { BetweenVerticalStart } from "lucide-react";

const Board: React.FC<{ boardId: BoardType["id"] }> = ({ boardId }) => {
  const { currentBoard, selectBoard } = useBoard();

  // Ensure the correct board is selected
  useEffect(() => {
    if (!currentBoard || currentBoard.id !== boardId) {
      selectBoard(boardId);
    }
  }, [boardId, currentBoard, selectBoard]);

  if (!currentBoard) {
    return <div className="p-3 pt-5 h-full text-center">Board not found!</div>;
  }

  return (
    <div className="h-full flex-col flex w-full">
      <div className="bg-brown text-beige flex content-center z-20 p-4 ml-2 mb-3 rounded-lg items-center">
        <span className="text-xl font-bold">{currentBoard.title}</span>
        <BetweenVerticalStart width="18" height="18" />
      </div>
      <div className="flex space-x-4 flex-1 p-2 w-full h-full overflow-x-auto snap-x snap-mandatory rounded-xl">
        {currentBoard.columns.map((column) => (
          <Column key={column.id} column={column} boardId={currentBoard.id} />
        ))}
      </div>
    </div>
  );
};

export default Board;
