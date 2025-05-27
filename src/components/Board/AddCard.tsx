import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea.tsx";
import { useBoard } from "@/contexts/BoardContext.tsx";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Board, Card, Column as ColumnType } from "@/types/board.ts";

const AddCard: React.FC<{
  columnId: ColumnType["id"];
  boardId: Board["id"];
}> = ({ columnId, boardId }) => {
  const { addCard } = useBoard();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddCard = () => {
    if (!title.trim()) return;
    const newCard: Card = {
      id: uuidv4(),
      title,
      description,
      priority: "low",
    };
    addCard(boardId, columnId, newCard);
    setTitle(""); // Clear input fields after adding
    setDescription("");
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="h-6 w-6 rounded-sm">
          <Plus strokeWidth="2" width="18" height="18" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-lg">Add Card</SheetTitle>
          <SheetDescription>
            Create a new card. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 text-base">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              placeholder="My card"
              className="col-span-3"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="A very long and thorough description"
              className="col-span-3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" onClick={handleAddCard}>
              Add card
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default AddCard;
