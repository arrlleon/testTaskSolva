import { logout } from "../../features/userSlice";
import { useAppDispatch} from "../../hook/hook";
import { useNavigate } from "react-router-dom";

export default function ItemsList() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();



    const handleLogout = () => {
        dispatch(logout());
    };

  

    return (
        <div className="container">
            <h1>Main</h1>
            <div className="categories">
            <button onClick={() => navigate("/characters")}>Characters</button>
            <button onClick={() => navigate("/planets")}>Planets</button>
            <button onClick={() => navigate("/starships")}>Starships</button>
            </div>
            <div className="logout-container">
            <button onClick={handleLogout} className="logout">Logout</button>
            </div>
        </div>
    );
}
