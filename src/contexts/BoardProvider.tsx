import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import useLocalStorage from "@/hooks/useLocalStorage.tsx";
import { Board, Card, Column } from "@/types/board.ts";
import { BoardContext } from "./BoardContext.tsx";

export const BoardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [boards, setBoards] = useLocalStorage("kanban-boards", [
    {
      id: "my-first-board",
      title: "My First Board",
      description: "First Board I have created",
      columns: [
        {
          id: "column-1",
          title: "To Do",
          cards: [
            {
              id: "card-1",
              title: "Task 1",
              description: "Complete the project setup",
              priority: "high",
            },
            {
              id: "card-2",
              title: "Task 2",
              description: "Create UI components",
              priority: "medium",
            },
          ],
        },
        {
          id: "column-2",
          title: "In Progress",
          cards: [
            {
              id: "card-3",
              title: "Task 3",
              description: "Implement drag and drop",
              priority: "high",
            },
          ],
        },
        {
          id: "column-3",
          title: "Done",
          cards: [
            {
              id: "card-4",
              title: "Task 4",
              description: "Project initialization",
              priority: "low",
            },
          ],
        },
        {
          id: "column-4",
          title: "Backlog",
          cards: [
            {
              id: "card-10",
              title: "Task 10",
              description: "Discussion",
              priority: "low",
            },
          ],
        },
      ],
    },
    {
      id: "teeest",
      title: "My test Board",
      description: "This is a testing board",
      columns: [
        {
          id: "column-1",
          title: "To Do",
          cards: [
            {
              id: "card-1",
              title: "Task 1",
              description: "Complete the project setup",
              priority: "high",
            },
            {
              id: "card-2",
              title: "Task 2",
              description: "Create UI components",
              priority: "medium",
            },
          ],
        },
        {
          id: "column-2",
          title: "In Progress",
          cards: [
            {
              id: "card-3",
              title: "Task 3",
              description: "Implement drag and drop",
              priority: "high",
            },
          ],
        },
        {
          id: "column-3",
          title: "Done",
          cards: [
            {
              id: "card-4",
              title: "Task 4",
              description: "Project initialization",
              priority: "low",
            },
          ],
        },
        {
          id: "column-4",
          title: "Backlog",
          cards: [
            {
              id: "card-10",
              title: "Task 10",
              description: "Discussion",
              priority: "low",
            },
          ],
        },
      ],
    },
  ]);

  const [currentBoard, setCurrentBoard] = useState<Board | null>(null);

  // Add a useEffect to keep currentBoard in sync with boards
  useEffect(() => {
    if (currentBoard) {
      const updatedBoard = boards.find(
        (board: Board) => board.id === currentBoard.id,
      );
      if (updatedBoard) {
        setCurrentBoard(updatedBoard);
      }
    }
  }, [boards, currentBoard]);

  // Add a new board
  const addBoard = (
    title: Board["title"],
    description: Board["description"],
  ) => {
    const newBoard = {
      id: uuidv4(),
      title,
      description,
      columns: [
        { id: uuidv4(), title: "To Do", cards: [] },
        { id: uuidv4(), title: "In Progress", cards: [] },
        { id: uuidv4(), title: "Done", cards: [] },
      ],
    };

    setBoards([...boards, newBoard]);
    return newBoard.id;
  };

  // Add a column to a board
  const addColumn = (boardId: Board["id"], title: Column["title"]) => {
    const updatedBoards = boards.map((board: Board) => {
      if (board.id === boardId) {
        return {
          ...board,
          columns: [...board.columns, { id: uuidv4(), title, cards: [] }],
        };
      }
      return board;
    });

    setBoards(updatedBoards);
  };

  // Add a card to a column
  const addCard = (
    boardId: Board["id"],
    columnId: Column["id"],
    card: Card,
  ) => {
    const updatedBoards = boards.map((board: Board) => {
      if (board.id === boardId) {
        return {
          ...board,
          columns: board.columns.map((column) => {
            if (column.id === columnId) {
              return {
                ...column,
                cards: [...column.cards, { ...card, id: uuidv4() }],
              };
            }
            return column;
          }),
        };
      }
      return board;
    });

    setBoards(updatedBoards);
  };

  // Handle drag and drop
  const moveCard = (
    boardId: Board["id"],
    sourceColumnId: Column["id"],
    destinationColumnId: Column["id"],
    sourceIndex: number,
    destinationIndex: number,
  ) => {
    const updatedBoards = boards.map((board: Board) => {
      if (board.id === boardId) {
        const newColumns = [...board.columns];

        const sourceColumn = newColumns.find(
          (col) => col.id === sourceColumnId,
        );
        const destColumn = newColumns.find(
          (col) => col.id === destinationColumnId,
        );

        if (!sourceColumn || !destColumn) return board;

        // Remove from source
        const [movedCard] = sourceColumn.cards.splice(sourceIndex, 1);
        if (!movedCard) return board;

        // Add to destination at the correct index
        destColumn.cards.splice(destinationIndex, 0, movedCard);

        return { ...board, columns: newColumns };
      }
      return board;
    });

    setBoards(updatedBoards);
  };

  // Set current active board
  const selectBoard = (boardId: Board["id"]) => {
    const board = boards.find((b: Board) => b.id === boardId);
    if (board) setCurrentBoard(board);
    return board;
  };

  const deselectBoard = () => {
    setCurrentBoard(null);
  };

  return (
    <BoardContext.Provider
      value={{
        boards,
        currentBoard,
        addBoard,
        addColumn,
        addCard,
        moveCard,
        selectBoard,
        deselectBoard,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
