import { Link } from "react-router-dom";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleClick = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <h1>Book Library</h1>
      </Link>

      <div className="links">
        {isAuthenticated && (
          <>
            <Link to="/books/add-book">Add Book</Link>
            <span>{user?.email}</span>
            <button onClick={handleClick}>Logout</button>
          </>
        )}

        {!isAuthenticated && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
