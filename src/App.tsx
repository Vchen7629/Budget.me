import { Route, Routes } from "react-router";
import BudgetPage from "./pages/budgetpage.js"
import HomePage from "./pages/homepage.js";
import LoginPage from "./pages/loginpage.js";


function App() {

  return (
    <Routes>
      <Route path="/budget" element={<BudgetPage/>} />
      <Route path="/" element={<HomePage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
    </Routes>
  );
}

export default App;