import { BoardContextType } from "../types/board.ts";
import { createContext, useContext } from "react";

const defaultBoardContextValue: BoardContextType = {
  boards: [],
  currentBoard: null,
  addBoard: () => {},
  addColumn: () => {},
  addCard: () => {},
  moveCard: () => {},
  selectBoard: () => {},
  deselectBoard: () => {},
};

export const BoardContext = createContext<BoardContextType>(
  defaultBoardContextValue,
);
export const useBoard = () => useContext(BoardContext);
