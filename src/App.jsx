import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import "./scss/global.scss";
import Login from "./pages/login/Login";
import Layout from "./pages/layout/Layout";
import Home from "./pages/home/Home";
import CategoryList from "./pages/category/CategoryList";
import AddNewCategory from "./pages/category/AddNewCategory";
import UpdateCategory from "./pages/category/UpdateCategory";
import { useFirebase } from "./context/firebase";
import { Toaster } from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import ProductList from "./pages/product/ProductList";
import AddNewProduct from "./pages/product/AddNewProduct";
import UpdateProduct from "./pages/product/UpdateProduct";
import ViewProduct from "./pages/product/ViewProduct";

const App = () => {
  const firebase = useFirebase();
  if (firebase.loading) {
    return (
      <div className="loader">
        <FaSpinner className="loader-icon" />
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div>
      <Routes>
        {/* GUEST ROUTES */}
        <Route path="/login" element={<GuestRoutes />}>
          <Route index element={<Login />} />
        </Route>
        {/* PROTECTED ROUTES */}
        <Route path="/" element={<ProtectedRoutes />}>
          <Route path="dashboard" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="categories" element={<CategoryList />} />
            <Route path="add-new-category" element={<AddNewCategory />} />
            <Route path="update-category/:id" element={<UpdateCategory />} />

            <Route path="products" element={<ProductList />} />
            <Route path="add-new-product" element={<AddNewProduct />} />
            <Route path="update-product/:id" element={<UpdateProduct />} />
            <Route path="view-product/:id" element={<ViewProduct />} />
          </Route>
        </Route>
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;

const ProtectedRoutes = () => {
  const firebase = useFirebase();
  return firebase.isAuth ? <Outlet /> : <Navigate to="/login" />;
};

const GuestRoutes = () => {
  const firebase = useFirebase();
  return firebase.isAuth ? <Navigate to="/dashboard" /> : <Outlet />;
};
