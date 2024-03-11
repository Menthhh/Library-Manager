import Dropdown from "../../components/Dropdown";
import EnhancedTable from "../../components/EnhancedTable";
import "./dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard">
      <div className="search">
        <input type="text" placeholder="search" className="searchBar" />
        <Dropdown />
      </div>
      <div className="display">
        <div className="numOfmenBooks">
          <p>Muslimeen</p>
          <p>Total books: 100 books</p>
          <p>Book availabale 50 book</p>
        </div>
        <div className="numOfwomenBooks">
          <p>Muslimah</p>
          <p>Total books: 50 books</p>
          <p>Book availabale 25 book</p>
        </div>
      </div>
      <div className="graph"></div>
      <div className="table">
        <EnhancedTable />
      </div>
    </div>
  );
}
