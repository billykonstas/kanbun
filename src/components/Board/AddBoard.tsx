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
import { useState } from "react";

const AddBoard = () => {
  const { addBoard } = useBoard();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddCard = () => {
    if (!title.trim()) return;
    addBoard(title, description);
    setTitle(""); // Clear input fields after adding
    setDescription("");
  };

  return (
    <Sheet>
      <SheetTrigger className="w-full h-full flex items-center justify-center cursor-pointer">
        <Plus size="24" strokeWidth={2} className="text-brown" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-lg">Add Board</SheetTitle>
          <SheetDescription>
            Create a new board. Click the button when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 text-base">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-left">
              Board Title
            </Label>
            <Input
              id="title"
              placeholder="My board"
              className="col-span-3"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-left">
              Board Description
            </Label>
            <Textarea
              id="description"
              placeholder="Describe what this board is for"
              className="col-span-3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit" onClick={handleAddCard}>
              Create Board
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default AddBoard;
