import React, { useEffect } from "react";
import Column from "./Column.tsx";
import { useBoard } from "@/contexts/BoardContext.tsx";
import { Board as BoardType } from "@/types/board.ts";

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
      <div className="bg-[#FDF3EE]/50 backdrop-blur relative z-20 pb-3 pl-2">
        <h2 className="text-2xl font-bold">{currentBoard.title}</h2>
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
