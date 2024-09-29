import "./inventory.css";


import { useContext } from "react";
import { AuthContext } from "../../hooks/useAuth";
import Inventorytable from "../../components/Inventorytable";



export default function Inventory() {
    const {user} = useContext(AuthContext);
    return (
        <div className="inventoryWrapper">
            <h1>Inventory</h1>
            <Inventorytable user_id={ user.others.id } />
        </div>
    );
}