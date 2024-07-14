import { Routes, Route, BrowserRouter } from "react-router-dom";

import { Home } from "./pages/LandingPage";
import { BookSearchPage } from "./pages/BookSearchPage";



function App() {
  return (
    <>
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search-books" element={<BookSearchPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
