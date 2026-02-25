import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditBookPage = () => {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [ISBN, setISBN] = useState("");
  const [publisher, setPublisher] = useState("");
  const [genre, setGenre] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const [dueDate, setDueDate] = useState("");
  const [borrower, setBorrower] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBook = async () => {
      const res = await fetch(`/api/books/${id}`);
      const data = await res.json();
      setTitle(data.title);
      setAuthor(data.author);
      setISBN(data.isbn);
      setPublisher(data.publisher);
      setGenre(data.genre);
      setIsAvailable(data.availability.isAvailable ? "true" : "false");
      setDueDate(
        data.availability.dueDate
          ? data.availability.dueDate.split("T")[0]
          : ""
      );
      setBorrower(data.availability.borrower || "");
    };
    fetchBook();
  }, [id]);

  const updateBook = async (newBook) => {
    try {
      const res = await fetch(`/api/books/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newBook)
      });
      if (!res.ok) {
        throw new Error("Failed to update book");
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
      "title": title,
      "author": author,
      "isbn": ISBN,
      "publisher": publisher,
      "genre": genre,
      "availability": {
        "isAvailable": isAvailable,
        "dueDate": dueDate,
        "borrower": borrower
      }
    };

    updateBook(newBook);

    return navigate(`/books/${id}`);
  };

  return (
    <div className="create">
      <h2>Update Book</h2>
      <form onSubmit={submitForm}>
        <label>Book Title:</label>
        <input type="text" required value={title} onChange={(e) => {setTitle(e.target.value)}} />
        <label>Author:</label>
        <input type="text" required value={author} onChange={(e) => {setAuthor(e.target.value)}} />
        <label>ISBN:</label>
        <input type="text" required value={ISBN} onChange={(e) => {setISBN(e.target.value)}} />
        <label>Publisher:</label>
        <input type="text" required value={publisher} onChange={(e) => {setPublisher(e.target.value)}} />
        <label>Genre:</label>
        <input type="text" required value={genre} onChange={(e) => {setGenre(e.target.value)}} />
        <label>Available:</label>
        <select value={isAvailable} onChange={(e) => {setIsAvailable(e.target.value)}}>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <label>Due Date:</label>
        <input type="date" value={dueDate} onChange={(e) => {setDueDate(e.target.value)}} />
        <label>Borrower:</label>
        <input type="text" value={borrower} onChange={(e) => {setBorrower(e.target.value)}} />
        <button type='submit'>Update Book</button>
      </form>
    </div>
  );
};

export default EditBookPage;
