export interface Card {
  id: string;
  title: string;
  description: string;
  priority: string;
}

export interface DraggedCard {
  id: string;
  columnId: string;
  originalIndex: number;
}

export interface Column {
  id: string;
  title: string;
  cards: Card[];
}
export interface Board {
  id: string;
  title: string;
  description: string;
  columns: Column[];
}

export interface BoardContextType {
  boards: Board[];
  currentBoard: Board | null;
  addBoard: (title: Board["title"], description: Board["description"]) => void;
  addColumn: (boardId: Board["id"], columnTitle: Column["title"]) => void;
  addCard: (boardId: Board["id"], columnId: Column["id"], card: Card) => void;
  moveCard: (
    boardId: Board["id"],
    sourceColumnId: Column["id"],
    destinationColumnId: Column["id"],
    sourceIndex: number,
    destinationIndex: number,
  ) => void;
  selectBoard: (boardId: Board["id"]) => void;
  deselectBoard: () => void;
}
