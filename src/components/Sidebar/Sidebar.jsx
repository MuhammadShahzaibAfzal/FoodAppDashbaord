import "./sidebar.scss";
import logo from "../../assets/MFC.png";
import { Link } from "react-router-dom";
import { AiFillHome, AiFillSetting, AiOutlineLogout } from "react-icons/ai";
import { FaPizzaSlice } from "react-icons/fa";
import { MdOutlineCategory } from "react-icons/md";
import { useFirebase } from "../../context/firebase";

const Sidebar = ({ isSideBarOpen }) => {
  const firebase = useFirebase();
  return (
    <div className={`sidebar__wrapper ${isSideBarOpen && "sidebar__active"}`}>
      <div className="sidebar__container">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="list">
          <Link className="list-item" to="/dashboard/">
            <AiFillHome className="icon" />
            <span>Home</span>
          </Link>
          <Link className="list-item" to="/dashboard/products">
            <FaPizzaSlice className="icon" />
            <span>Products</span>
          </Link>
          <Link className="list-item" to="/dashboard/categories/">
            <MdOutlineCategory className="icon" />
            <span>Categories</span>
          </Link>
          <Link className="list-item" to="/dashboard/">
            <AiFillSetting className="icon" />
            <span>Settings</span>
          </Link>
          <Link className="list-item" onClick={firebase.logout}>
            <AiOutlineLogout className="icon" />
            <span>Logout</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
