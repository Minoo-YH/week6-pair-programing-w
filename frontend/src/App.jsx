import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookPage from "./pages/BookPage";

// pages & components
import Home from "./pages/HomePage";
import AddBookPage from "./pages/AddBookPage";
import Navbar from "./components/Navbar";
import NotFoundPage from "./pages/NotFoundPage";
import EditBookPage from "./pages/EditBookPage";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-book" element={<AddBookPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/books/:id" element={<BookPage />} />
            <Route path="/edit-book/:id" element={<EditBookPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
