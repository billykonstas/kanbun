import { useDrag, useDrop } from "react-dnd";
import { useBoard } from "@/contexts/BoardContext.tsx";
import { Board, Card as CardType, DraggedCard, Column } from "@/types/board.ts";
import React, { useRef } from "react";
const Card: React.FC<{
  card: CardType;
  columnId: Column["id"];
  boardId: Board["id"];
  index: number;
}> = ({ card, columnId, boardId, index }) => {
  const { moveCard } = useBoard();

  // Drag configuration
  const [{ isDragging }, drag] = useDrag({
    type: "CARD",
    item: {
      id: card.id,
      originalIndex: index,
      columnId,
      boardId,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Drop configuration
  const [, drop] = useDrop<DraggedCard>({
    accept: "CARD",
    hover: (draggedItem) => {
      if (draggedItem.columnId === columnId) {
        // Reordering within the same column
        if (draggedItem.originalIndex !== index) {
          moveCard(
            boardId,
            columnId,
            columnId,
            draggedItem.originalIndex,
            index,
          );
          draggedItem.originalIndex = index;
        }
      }
    },
    drop: (draggedItem) => {
      if (draggedItem.columnId !== columnId) {
        // Moving between columns
        moveCard(
          boardId,
          draggedItem.columnId,
          columnId,
          draggedItem.originalIndex,
          index,
        );
      }
    },
  });

  const cardRef = useRef<HTMLDivElement>(null);
  drag(drop(cardRef));

  return (
    <div
      ref={cardRef}
      className="min-h-20 h-20 mb-2 p-2 cursor-pointer font-bold text-brown bg-white rounded shadow hover:shadow-lg"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <div className="font-bold h-min overflow-hidden overflow-ellipsis">
        {card.title}
      </div>
    </div>
  );
};

export default Card;
