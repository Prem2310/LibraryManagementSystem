import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/LandingPage";
import { BookSearchPage } from "./pages/BookSearchPage";
import { AdminSearchPage } from "./pages/AdminSearchPage";
import { LibStatsPage } from "./pages/LibStatsPage";

import Signin from "./pages/SignIn";
import Signup from "./pages/SignUp";
import { AdminPage } from "./pages/AdminPage";
import { UserBooksPage } from "./pages/UserBooksPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search-books" element={<BookSearchPage />} />
        <Route path="/admin-books" element={<AdminSearchPage />} />
        <Route path="/lib-stats" element={<LibStatsPage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/update-books" element={<AdminPage />} />
        <Route path="/user-books" element={<UserBooksPage />} />
      </Routes>
    </Router>
  );
}

export default App;
