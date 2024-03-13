import EnhancedTable from "../../components/EnhancedTable";
import "./borrow.css";

export default function Borrow() {
  return (
    <div className="borrow">
          <div className="formInput">
              <input type="text" className="bookIdInout" />
              <input type="date" className="startDate" />
              <input type="date" className="endDate" />
          </div>
          <div className="inventory">
              <EnhancedTable />
          </div>
    </div>
  );
}
