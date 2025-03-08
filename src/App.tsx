import { Route, Routes } from "react-router";
import Homepage from "./pages/homepage.js"
import LoginPage from "./pages/loginpage.js";


function App() {

  return (
    <Routes>
      <Route path="/" element={<Homepage/>} />
      <Route path="/login" element={<LoginPage/>}/>
    </Routes>
  );
}

export default App;