import { BrowserRouter as Router } from "react-router-dom";
import { BoardProvider } from "./contexts/BoardProvider.tsx";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import AppRoutes from "./AppRoutes.tsx";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <BoardProvider>
          <AppRoutes />
        </BoardProvider>
      </Router>
    </DndProvider>
  );
}

export default App;
