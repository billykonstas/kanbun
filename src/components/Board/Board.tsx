import React, { useEffect } from "react";
import Column from "./Column.tsx";
import { useBoard } from "@/contexts/BoardContext.tsx";
import { Board as BoardType } from "@/types/board.ts";
import { Button } from "@/components/ui/button.tsx";
import { ClipboardPenLine, ClipboardPaste, ClipboardX } from "lucide-react";

const Board: React.FC<{ boardId: BoardType["id"] }> = ({ boardId }) => {
  const { currentBoard, selectBoard, deleteBoard } = useBoard();

  // Ensure the correct board is selected
  useEffect(() => {
    if (!currentBoard || currentBoard.id !== boardId) {
      selectBoard(boardId);
    }
  }, [boardId, currentBoard, selectBoard]);

  if (!currentBoard) {
    return <div className="p-3 pt-5 h-full text-center">Board not found!</div>;
  }

  const boardFunctions = [
    { name: "Edit", icon: ClipboardPenLine },
    { name: "Share", icon: ClipboardPaste },
    {
      name: "Delete",
      icon: ClipboardX,
      action: () => deleteBoard(currentBoard.id),
    },
  ];

  return (
    <div className="h-full flex-col flex w-full">
      <div className="bg-brown text-beige content-center z-20 p-4 ml-2 mb-3 rounded-lg grid grid-cols-3">
        <h2 className="text-2xl font-bold">{currentBoard.title}</h2>
        <div></div>
        <div className="px-3 text-beige flex gap-4 items-center justify-end content-center">
          {boardFunctions.map(({ name, icon: Icon, action }) => (
            <Button variant="ghost" onClick={() => action?.()}>
              <Icon size={24} />
              <span className="text-lg">{name}</span>
            </Button>
          ))}
        </div>
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
