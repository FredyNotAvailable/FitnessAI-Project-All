import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import { routes } from "./routes/routes";

function RoutesWrapper() {
  return useRoutes(routes);
}

export default function App() {
  return (
    <Router>
      <RoutesWrapper />
    </Router>
  );
}
