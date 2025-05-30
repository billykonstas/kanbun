import { useLocation, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Dashboard from "./pages/Dashboard";
import BoardView from "./pages/BoardView";
import Settings from "./pages/Settings";
import { ROUTES } from "./utils/routes.ts";
import { AnimatePresence, motion } from "framer-motion";

const AppRoutes = () => {
  const location = useLocation();

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path={ROUTES.DASHBOARD}
            element={
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <Dashboard />
              </motion.div>
            }
          />
          <Route
            path={ROUTES.BOARD(":boardId")}
            element={
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <BoardView />
              </motion.div>
            }
          />
          <Route
            path={ROUTES.SETTINGS}
            element={
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <Settings />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
};

export default AppRoutes;
