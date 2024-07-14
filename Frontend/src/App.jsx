import { Routes, Route, BrowserRouter } from "react-router-dom";

import { Home } from "./pages/LandingPage";
import { AdminPage } from "./pages/AdminPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
