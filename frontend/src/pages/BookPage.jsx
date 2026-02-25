import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const BookPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`/api/books/${id}`);
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setBook(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const deleteBook = async (bookId) => {
    try {
      const res = await fetch(`/api/books/${bookId}`, {
        method: "DELETE"
      });
      if (!res.ok) {
        throw new Error("Failed to delete book");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }

    return navigate("/");
  };

  const onDeleteClick = (bookId) => {
    const confirm = window.confirm("Are you sure you want to delete this book?");
    if (!confirm) return;
    deleteBook(bookId);
  };

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {book && (
        <div>
          <h2>{book.title}</h2>
          <p>Author: {book.author}</p>
          <p>ISBN: {book.isbn}</p>
          <p>Publisher: {book.publisher}</p>
          <p>Genre: {book.genre}</p>
          <p>
            Available:{" "}
            {book.availability?.isAvailable ? "Yes" : "No"}
          </p>
          <p>
            Due Date:{" "}
            {book.availability?.dueDate
              ? new Date(book.availability.dueDate).toLocaleDateString()
              : "—"}
          </p>
          <p>
            Borrower:{" "}
            {book.availability?.borrower || "—"}
          </p>
        </div>
      )}

      <button onClick={() => navigate("/")}>
        Back
      </button>

      <button onClick={() => onDeleteClick(book._id)}>
        Delete
      </button>
    </div>
  );
};

export default BookPage;