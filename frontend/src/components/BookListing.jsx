const BookListings = ({ books }) => {
   


  const BookListing = ({ book }) => {
  return (
    <div className="book-preview">
      <h2>{book.title}</h2>
      <p>Author: {book.author}</p>
      <p>ISBN: {book.isbn}</p>
      <p>Publisher: {book.publisher}</p>
      <p>Genre: {book.genre}</p>
      <p>Available: {book.availability.isAvailable ? "Yes" : "No"}</p>
    </div>
  );
};




  return (
    <div className="book-list">
      {books.map((book) => (
        <BookListing key={book.id} book={book} />
      ))}
    </div>
  );
};