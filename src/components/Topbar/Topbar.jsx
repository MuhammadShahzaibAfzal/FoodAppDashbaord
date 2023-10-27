import { AiOutlineMenu } from "react-icons/ai";
import "./topbar.scss";
import { useFirebase } from "../../context/firebase";

const Topbar = ({toggleSideBar}) => {
  const firebase = useFirebase();
  return (
    <div className="topbar__wrapper">
        <AiOutlineMenu className="icon" onClick={toggleSideBar}/>
        <div>
            <button className="btn btn__primary" onClick={firebase.logout}>Logout</button>
        </div>
    </div>
  )
}

export default Topbar