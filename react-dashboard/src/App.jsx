import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/header/Header";
import Dashboard from "./pages/dashboard/Dashboard";

function App() {
  return (
    <Router>
      <Header />
      <Dashboard />
    </Router>
  );
}

export default App;