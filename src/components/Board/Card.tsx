import { useDrag, useDrop } from "react-dnd";
import { useBoard } from "@/contexts/BoardContext.tsx";
import { Board, Card as CardType, DraggedCard, Column } from "@/types/board.ts";
import React, { useRef } from "react";
import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const Card: React.FC<{
  card: CardType;
  columnId: Column["id"];
  boardId: Board["id"];
  index: number;
}> = ({ card, columnId, boardId, index }) => {
  const { moveCard, deleteCard } = useBoard();

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
      className="min-h-20 h-20 mb-2 p-2 cursor-move font-bold flex flex-row justify-between text-brown bg-white rounded shadow hover:shadow-lg"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <HoverCard>
        <HoverCardTrigger>
          <h3 className="font-bold h-min overflow-hidden overflow-ellipsis hover:underline hover:cursor-pointer">
            {card.title}
          </h3>
        </HoverCardTrigger>
        <HoverCardContent>
          <div className="space-y-1">
            <h4 className="text-md font-semibold">{card.title}</h4>
            <p className="text-sm font-normal">{card.description}</p>
          </div>
        </HoverCardContent>
      </HoverCard>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <EllipsisVertical
            height="20"
            width="18"
            className="hover:cursor-pointer hover:bg-pink hover:rounded-sm"
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className="text-brown">
          <DropdownMenuItem className="hover:cursor-pointer hover:text-brown flex gap-2">
            <Pencil className="text-brown" />
            Edit card
          </DropdownMenuItem>
          <DropdownMenuItem
            className="hover:cursor-pointer hover:text-brown flex gap-2"
            onClick={() => deleteCard(boardId, columnId, card.id)}
          >
            <Trash2 className="text-brown" />
            Delete card
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Card;
