import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const BookPage = ({ isAuthenticated }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  //  localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user ? user.token : null;

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // book detail fetching
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`/api/books/${id}`);
        if (!res.ok) throw new Error("Failed to fetch book");
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

  // delete book
  const deleteBook = async (bookId) => {
    try {
      const res = await fetch(`/api/books/${bookId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`, // 🔥 مهم
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete book");
      }

      navigate("/");
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const onDeleteClick = (bookId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (!confirmDelete) return;
    deleteBook(bookId);
  };

  return (
    <div className="book-details">
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      {book && (
        <div>
          <h2>{book.title}</h2>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>ISBN:</strong> {book.isbn}</p>
          <p><strong>Publisher:</strong> {book.publisher}</p>
          <p><strong>Genre:</strong> {book.genre}</p>
          <p>
            <strong>Available:</strong>{" "}
            {book.availability?.isAvailable ? "Yes" : "No"}
          </p>
          <p>
            <strong>Due Date:</strong>{" "}
            {book.availability?.dueDate
              ? new Date(book.availability.dueDate).toLocaleDateString()
              : "—"}
          </p>
          <p>
            <strong>Borrower:</strong>{" "}
            {book.availability?.borrower || "—"}
          </p>
        </div>
      )}

     
      <button onClick={() => navigate("/")}>Back</button>

   
      {book && isAuthenticated && (
        <>
          <button onClick={() => navigate(`/edit-book/${book._id}`)}>
            Edit
          </button>

          <button onClick={() => onDeleteClick(book._id)}>
            Delete
          </button>
        </>
      )}
    </div>
  );
};

export default BookPage;