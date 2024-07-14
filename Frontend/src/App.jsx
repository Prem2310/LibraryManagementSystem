import { Routes, Route, BrowserRouter } from "react-router-dom";

import { Home } from "./pages/LandingPage";
import { BookSearchPage } from "./pages/BookSearchPage";
import { AdminSearchPage } from "./pages/AdminSearchPage";
import { LibStatsPage } from "./pages/LibStatsPage";



function App() {
  return (
    <>
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search-books" element={<BookSearchPage/>} />
          <Route path="/admin-books" element={<AdminSearchPage/>} />
          <Route path="/lib-stats" element={<LibStatsPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
