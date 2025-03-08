import { Route, Routes } from "react-router";
import BudgetPage from "./pages/budgetpage.js"
import LoginPage from "./pages/loginpage.js";


function App() {

  return (
    <Routes>
      <Route path="/" element={<BudgetPage/>} />
      <Route path="/login" element={<LoginPage/>}/>
    </Routes>
  );
}

export default App;