import { useState } from "react";
import "./login.scss";
import { useFirebase } from "../../context/firebase";

const Login = () => {
  const firebase = useFirebase();
    const [formData,setFormData] = useState({
        email : "",
        password : "",
    });

    const handleInputChange = (e) => {
        const {name,value} = e.target;
        setFormData({...formData,[name]:value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await firebase.login(formData.email,formData.password);
        console.log(formData);
    }
  return (
    <div className="login__wrapper">
      <div className="login__container">
        <h1>LOGIN</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" placeholder="Enter email..." value={formData.email} onChange={handleInputChange} required />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="Enter password..." value={formData.password} onChange={handleInputChange} required />
          </div>
          <div className="btn__box">
            <button type="submit" className="btn btn__primary">LOGIN</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
