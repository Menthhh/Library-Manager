import { useContext, useState } from "react";
import axios from "axios";
import "./borrow.css";
import { AuthContext } from "../../hooks/useAuth";

export default function Borrow() {
  const { user } = useContext(AuthContext);
  const [borrowData, setBorrowData] = useState({
    book_id: "",
    user_id: user.others.id,
    start_date: "",
    end_date: "",
  });

  const [returnData, setReturnData] = useState({
    book_id: "",
    user_id: user.others.id,
    return_date: "",
  });

  const handleBorrowChange = (e) => {
    const { name, value } = e.target;
    setBorrowData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleReturnChange = (e) => {
    const { name, value } = e.target;
    setReturnData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBorrow = async () => {
    if (!borrowData.book_id || !borrowData.start_date || !borrowData.end_date) {
      window.alert("Please fill in all fields.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/borrow/borrow", borrowData);
      console.log(response.data); // Log response from the server
      // Reset borrowData state after successful borrow
      setBorrowData({
        book_id: "",
        start_date: "",
        end_date: "",
      });
      window.alert("Book borrowed successfully!");
    } catch (error) {
      console.error("Error borrowing book:", error);
      window.alert("Error borrowing book: " + error.message);
    }
  };

  const handleReturn = async () => {
    if (!returnData.book_id || !returnData.return_date) {
      window.alert("Please fill in all fields.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/borrow/return", returnData);
      console.log(response.data); // Log response from the server
      // Reset returnData state after successful return
      setReturnData({
        book_id: "",
        return_date: "",
      });
      window.alert("Book returned successfully!");
    } catch (error) {
      console.error("Error returning book:", error);
      window.alert("Error returning book: " + error.message);
    }
  };

  return (
    <div className="borrow">
      <div className="borrowForm">
        <h1>Borrow</h1>
        <p>Book ID</p>
        <input
          type="text"
          className="inputForm bookIdI"
          name="book_id"
          value={borrowData.book_id}
          onChange={handleBorrowChange}
          placeholder="Book ID"
        />
        <p>Start Date</p>
        <input
          type="date"
          className="inputDateForm startDate"
          name="start_date"
          value={borrowData.start_date}
          onChange={handleBorrowChange}
        />
        <p>End Date</p>
        <input
          type="date"
          className="inputDateForm endDate"
          name="end_date"
          value={borrowData.end_date}
          onChange={handleBorrowChange}
        />
        <button className="btnSubmit" onClick={handleBorrow}>
          Borrow
        </button>
      </div>
      <div className="returnForm">
        <h1>Return</h1>
        <div>
          <p>Book ID</p>
          <input
            type="text"
            className="inputForm bookIdI"
            name="book_id"
            value={returnData.book_id}
            onChange={handleReturnChange}
            placeholder="Book ID"
          />
        </div>
        <p>Return Date</p>
        <input
          type="date"
          className="inputDateForm returnDate"
          name="return_date"
          value={returnData.return_date}
          onChange={handleReturnChange}
          placeholder="Date"
        />
        <div>
        <button className="btnSubmit" onClick={handleReturn}>
            Return
        </button>
        </div>
      </div>
    </div>
  );
}
