import Card from "./Card.tsx";
import { useBoard } from "@/contexts/BoardContext.tsx";
import { useDrop } from "react-dnd";
import { Column as ColumnType } from "@/types/board.ts";
import { Board, DraggedCard, Card as CardType } from "@/types/board.ts";
import React, { useRef } from "react";
import { Plus } from "lucide-react";
const Column: React.FC<{ column: ColumnType; boardId: Board["id"] }> = ({
  column,
  boardId,
}) => {
  const { moveCard, addCard } = useBoard();

  // Drop configuration for entire column
  const [, drop] = useDrop<DraggedCard>({
    accept: "CARD",
    drop: (draggedItem) => {
      if (draggedItem.columnId !== column.id) {
        // If dropped in a different column, move to the end
        moveCard(
          boardId,
          draggedItem.columnId,
          column.id,
          draggedItem.originalIndex,
          column.cards.length,
        );
      }
    },
  });

  const dummyCard: CardType = {
    id: "dummy",
    title: "Test Title",
    description: "Lorem Ipsum",
    priority: "low",
  };

  const columnRef = useRef<HTMLDivElement>(null);
  drop(columnRef);

  return (
    <div
      ref={columnRef}
      className="w-full max-w-80 min-w-60 h-full p-4 bg-pink rounded-lg relative snap-center"
      style={{
        boxShadow: "0px 0px 6px 2px rgba(67,48,43,0.10)",
        height: "calc(100% - 4px)",
      }}
    >
      <div className="flex justify-between items-center mb-4 mr-4">
        <h2 className="text-lg text-brown font-semibold">{column.title}</h2>
        <div className="flex">
          <div
            className="text-brown font-bold text-2xl h-6 w-6 flex items-center justify-center cursor-pointer hover:bg-[#12a594] hover:text-[#fff1e7] rounded-sm"
            onClick={() => addCard(boardId, column.id, dummyCard)}
          >
            <Plus strokeWidth="2" />
          </div>
        </div>
      </div>
      <div className="bg-brown h-6 w-6 text-white absolute top-0 right-0 font-bold text-md flex items-center justify-center rounded-tr-sm rounded-bl-sm">
        {column.cards.length}
      </div>
      {column.cards && column.cards.length > 0 ? (
        column.cards.map(
          (card, index) =>
            card && (
              <Card
                key={card.id}
                card={card}
                columnId={column.id}
                boardId={boardId}
                index={index}
              />
            ),
        )
      ) : (
        <p>All finished! 🎉</p>
      )}
    </div>
  );
};

export default Column;
