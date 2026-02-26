import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBookPage = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [ISBN, setISBN] = useState("");
  const [publisher, setPublisher] = useState("");
  const [genre, setGenre] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const [dueDate, setDueDate] = useState("");
  const [borrower, setBorrower] = useState("");

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = user ? user.token : null;
  

  const addBook = async (newBook) => {
    try {
      const res = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newBook),
      });
      if (!res.ok) {
        throw new Error("Failed to add book");
      }
    } catch (error) {
      console.error(error);
      return false;
    }
    return true;
  };

  const submitForm = (e) => {
    e.preventDefault();

    const newBook = {
      title: title,
      author: author,
      isbn: ISBN,
      publisher: publisher,
      genre: genre,
      availability: {
        isAvailable: isAvailable,
        dueDate: dueDate,
        borrower: borrower,
      },
    };

    addBook(newBook);
    console.log(newBook);

    return navigate("/");
  };

  return (
    <div className="create">
      <h2>Add a New Book</h2>
      <form onSubmit={submitForm}>
        <label>Book Title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label>Author:</label>
        <input
          type="text"
          required
          value={author}
          onChange={(e) => {
            setAuthor(e.target.value);
          }}
        />
        <label>ISBN:</label>
        <input
          type="text"
          required
          value={ISBN}
          onChange={(e) => {
            setISBN(e.target.value);
          }}
        />
        <label>Publisher:</label>
        <input
          type="text"
          required
          value={publisher}
          onChange={(e) => {
            setPublisher(e.target.value);
          }}
        />
        <label>Genre:</label>
        <input
          type="text"
          required
          value={genre}
          onChange={(e) => {
            setGenre(e.target.value);
          }}
        />
        <label>Available:</label>
        <select
          value={isAvailable}
          onChange={(e) => {
            setIsAvailable(e.target.value);
          }}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <label>Due Date:</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => {
            setDueDate(e.target.value);
          }}
        />
        <label>Borrower:</label>
        <input
          type="text"
          value={borrower}
          onChange={(e) => {
            setBorrower(e.target.value);
          }}
        />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBookPage;
