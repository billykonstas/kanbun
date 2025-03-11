// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard";
import BoardView from "./pages/BoardView";
import Settings from "./pages/Settings";
import { BoardProvider } from "./contexts/BoardProvider.tsx";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { ROUTES } from "./utils/routes.ts";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <BoardProvider>
          <Layout>
            <Routes>
              <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
              <Route path={ROUTES.BOARD(":boardId")} element={<BoardView />} />
              <Route path={ROUTES.SETTINGS} element={<Settings />} />
            </Routes>
          </Layout>
        </BoardProvider>
      </Router>
    </DndProvider>
  );
}

export default App;
