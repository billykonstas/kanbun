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
import { ChevronsDown, ChevronsDownUp, ChevronsUp, Plus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  const [priority, setPriority] = useState("medium");
  const [description, setDescription] = useState("");

  const handleAddCard = () => {
    if (!title.trim()) return;
    const newCard: Card = {
      id: uuidv4(),
      title,
      description,
      priority,
    };
    addCard(boardId, columnId, newCard);
    resetCardFields();
  };

  const resetCardFields = () => {
    setTitle("");
    setPriority("medium");
    setDescription("");
  };

  return (
    <Sheet
      modal={false}
      onOpenChange={(open) => {
        if (!open) resetCardFields();
      }}
    >
      <SheetTrigger asChild>
        <div className="flex justify-center items-center ">
          <Plus
            size="20"
            className="p-0.5 rounded-sm text-brown hover:bg-orange  hover:text-white hover:cursor-pointer"
          />
        </div>
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
            <Label htmlFor="title" className="text-left">
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
          <div className="grid grid-cols-4">
            <Label htmlFor="selection" className="text-left">
              Priority
            </Label>
            <Select value={priority} onValueChange={setPriority}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">
                  <ChevronsDown
                    size="20"
                    className="bg-low/10 rounded-sm text-low"
                  />
                  Low
                </SelectItem>
                <SelectItem value="medium">
                  <ChevronsDownUp
                    size="20"
                    className="bg-mid/10 rounded-sm text-mid"
                  />
                  Medium
                </SelectItem>
                <SelectItem value="high">
                  <ChevronsUp
                    size="20"
                    className="bg-high/10 rounded-sm text-high"
                  />{" "}
                  High
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-left">
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
