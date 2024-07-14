import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/LandingPage";
import { BookSearchPage } from "./pages/BookSearchPage";
import { AdminSearchPage } from "./pages/AdminSearchPage";
import { LibStatsPage } from "./pages/LibStatsPage";

import Signin from "./pages/SignIn";
import Signup from "./pages/SignUp";
import { AdminPage } from "./pages/AdminPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search-books" element={<BookSearchPage/>} />
          <Route path="/admin-books" element={<AdminSearchPage/>} />
          <Route path="/lib-stats" element={<LibStatsPage/>} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/update-books" element={<AdminPage />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
