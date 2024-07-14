import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/LandingPage";
import { BookSearchPage } from "./pages/BookSearchPage";
import { AdminSearchPage } from "./pages/AdminSearchPage";

import Signin from "./pages/SignIn";
import Signup from "./pages/SignUp";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />

          <Route path="/signup" element={<Signup />} />
          <Route path="/search-books" element={<BookSearchPage />} />
          <Route path="/admin-books" element={<AdminSearchPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
