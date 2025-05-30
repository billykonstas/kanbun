import { useDrag, useDrop } from "react-dnd";
import { useBoard } from "@/contexts/BoardContext.tsx";
import { Board, Card as CardType, DraggedCard, Column } from "@/types/board.ts";
import React, { useRef } from "react";
import {
  ChevronsDown,
  ChevronsUp,
  EllipsisVertical,
  Pencil,
  Trash2,
} from "lucide-react";
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
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { TooltipContent } from "@/components/ui/tooltip.tsx";
import { toast } from "sonner";

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

  const handleCardDelete = () => {
    console.log("handleCardDelete");
    deleteCard(boardId, columnId, card.id);
    toast("Card " + card.title + " has been deleted successfully.");
  };

  const cardRef = useRef<HTMLDivElement>(null);
  drag(drop(cardRef));

  return (
    <TooltipProvider>
      <div
        ref={cardRef}
        className="min-h-20 h-20 mb-2 p-2 cursor-move font-bold flex flex-row justify-between text-brown bg-white rounded shadow hover:shadow-lg"
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        <div className="flex-3/5">
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
        </div>
        <div className="flex justify-end gap-3 flex-2/5">
          <Tooltip>
            <TooltipTrigger asChild>
              {card.priority === "high" ? (
                <ChevronsUp
                  size="20"
                  className="bg-high/10 rounded-sm text-high hover:cursor-default"
                />
              ) : (
                card.priority === "low" && (
                  <ChevronsDown
                    size="20"
                    className="bg-low/10 rounded-sm text-low hover:cursor-default"
                  />
                )
              )}
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={5}>
              {card.priority === "high" ? (
                <p>High priority</p>
              ) : (
                card.priority === "low" && <p>Low priority</p>
              )}
            </TooltipContent>
          </Tooltip>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <EllipsisVertical
                size="20"
                className="hover:cursor-pointer p-0.5 hover:bg-orange hover:text-white hover:rounded-sm"
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-brown">
              <DropdownMenuItem className="hover:cursor-pointer hover:text-brown flex gap-2">
                <Pencil className="text-brown" />
                Edit card
              </DropdownMenuItem>
              <DropdownMenuItem
                className="hover:cursor-pointer hover:text-brown flex gap-2"
                onClick={() => handleCardDelete()}
              >
                <Trash2 className="text-brown" />
                Delete card
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default Card;
