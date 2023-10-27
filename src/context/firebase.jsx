import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyBeOVkHKKzFuBkm9TmaV6yVXjqort8wKNY",
  authDomain: "dummy-2b22e.firebaseapp.com",
  projectId: "dummy-2b22e",
  storageBucket: "dummy-2b22e.appspot.com",
  messagingSenderId: "22306223421",
  appId: "1:22306223421:web:0148bebe72e5ee4b030154",
};

const FirebaseContext = createContext(null);

/* CUSTOM HOOK  */
export const useFirebase = () => {
  return useContext(FirebaseContext);
};

/* GET INSTANCE */
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

/* CONTEXT PROVIDER  */
export const FirebaseProvider = (props) => {
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  /*  LOGIN  */
  const login = async (email, password) => {
    const promise = signInWithEmailAndPassword(auth, email, password);
    toast.promise(promise, {
      loading: "Login...",
      success: (userCredentials) => {
        /* CHECK USER ROLE ? IsAdmin true or false */
        const docRef = doc(db, "USERS", userCredentials.user.uid);
        getDoc(docRef).then((docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            setIsAuth(data?.isAdmin);
          }
        });
        return "Admin is Login successfully!";
      },
      error: (err) => {
        console.log(err);
        return "Invalid credentials";
      },
    });
  };

  /* LOGOUT */
  const logout = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout Successfully !");
        setIsAuth(false);
        navigate("/login");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  /* ADD NEW CATEGORY */
  const addNewCategory = async (name, icon, index) => {
    /* IMAGE UPLOAD */
    const imageRef = ref(storage, `uploads/icons/${Date.now()}-${icon.name}`);
    const uploadResult = await uploadBytes(imageRef, icon);
    // Get the download URL for the uploaded file
    const downloadPath = await getDownloadURL(uploadResult.ref);

    return await addDoc(collection(db, "CATEGORIES"), {
      name,
      index,
      iconURL: downloadPath,
    });
  };

  /* GET DOCUMENTS..... */
  const getDocuments = async (collectionName) => {
    return await getDocs(collection(db, collectionName));
  };

  /* DELETE DOCUMENT */
  const deleteDocument = async (collectionName, documentId) => {
    const documentRef = doc(db, collectionName, documentId);
    return await deleteDoc(documentRef);
  };

  const getSingleDocument = async (collectionName, documentId) => {
    try {
      const documentRef = doc(db, collectionName, documentId);
      const documentSnapshot = await getDoc(documentRef);

      if (documentSnapshot.exists()) {
        const documentData = documentSnapshot.data();
        return documentData; // Return the document data
      } else {
        console.log("Document does not exist.");
        return null; // Return null when the document doesn't exist
      }
    } catch (error) {
      console.error("Error fetching document:", error);
      throw error; // Rethrow the error for handling higher up the call stack
    }
  };

  const updateCategory = async (documentId, data) => {
    let downloadPath;
    const updateFields = {
      name: data.name,
      index: data.index,
    };
    console.log(data.icon);
    if (data.icon) {
      /* IMAGE UPLOAD */
      const imageRef = ref(
        storage,
        `uploads/icons/${Date.now()}-${data.icon.name}`
      );
      const uploadResult = await uploadBytes(imageRef, data.icon);
      // Get the download URL for the uploaded file
      downloadPath = await getDownloadURL(uploadResult.ref);
      updateFields.iconURL = downloadPath;
    }
    console.log(updateFields);
    const docRef = doc(db, "CATEGORIES", documentId);
    await updateDoc(docRef, updateFields);
  };

  /* ADD NEW CATEGORY */
  const addNewProduct = async (
    product_title,
    product_price,
    stock_quantity,
    use_tab_layout,
    prouduct_description,
    product_image_1,
    product_image_2,
    product_image_3
  ) => {
    /* IMAGE UPLOADS */
    const imageRef1 = ref(
      storage,
      `uploads/products/${Date.now()}-${product_image_1.name}`
    );
    const uploadResult1 = await uploadBytes(imageRef1, product_image_1);
    const downloadPath1 = await getDownloadURL(uploadResult1.ref);

    const imageRef2 = ref(
      storage,
      `uploads/products/${Date.now()}-${product_image_2.name}`
    );
    const uploadResult2 = await uploadBytes(imageRef2, product_image_2);
    const downloadPath2 = await getDownloadURL(uploadResult2.ref);

    const imageRef3 = ref(
      storage,
      `uploads/products/${Date.now()}-${product_image_3.name}`
    );
    const uploadResult3 = await uploadBytes(imageRef3, product_image_3);
    const downloadPath3 = await getDownloadURL(uploadResult3.ref);

    return await addDoc(collection(db, "PRODUCTS"), {
      product_title,
      product_price: parseFloat(product_price),
      stock_quantity: parseInt(stock_quantity),
      use_tab_layout,
      prouduct_description,
      product_image_1: downloadPath1,
      product_image_2: downloadPath2,
      product_image_3: downloadPath3,
    });
  };

  const updateProduct = async (documentId, data) => {
    let downloadPath;
    const updateFields = {
      product_title: data.product_title,
      product_price: data.product_price,
      stock_quantity: data.stock_quantity,
      use_tab_layout: data.use_tab_layout,
      prouduct_description: data.prouduct_description,
    };
    if (data.image_1) {
      /* IMAGE UPLOAD */
      const imageRef = ref(
        storage,
        `uploads/products/${Date.now()}-${data.image_1.name}`
      );
      const uploadResult = await uploadBytes(imageRef, data.image_1);
      // Get the download URL for the uploaded file
      downloadPath = await getDownloadURL(uploadResult.ref);
      updateFields.product_image_1 = downloadPath;
    }

    if (data.image_2) {
      /* IMAGE UPLOAD */
      const imageRef = ref(
        storage,
        `uploads/products/${Date.now()}-${data.image_2.name}`
      );
      const uploadResult = await uploadBytes(imageRef, data.image_2);
      // Get the download URL for the uploaded file
      downloadPath = await getDownloadURL(uploadResult.ref);
      updateFields.product_image_2 = downloadPath;
    }

    if (data.image_3) {
      /* IMAGE UPLOAD */
      const imageRef = ref(
        storage,
        `uploads/products/${Date.now()}-${data.image_3.name}`
      );
      const uploadResult = await uploadBytes(imageRef, data.image_3);
      // Get the download URL for the uploaded file
      downloadPath = await getDownloadURL(uploadResult.ref);
      updateFields.product_image_3 = downloadPath;
    }
    const docRef = doc(db, "PRODUCTS", documentId);
    await updateDoc(docRef, updateFields);
  };

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        /* CHECK USER ROLE ? IsAdmin true or false */
        const docRef = doc(db, "USERS", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setIsAuth(data?.isAdmin);
        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
      } else {
        console.log("User is not login....");
      }
      setLoading(false);
    });
  }, []);

  return (
    <FirebaseContext.Provider
      value={{
        login,
        isAuth,
        logout,
        loading,
        addNewCategory,
        getDocuments,
        deleteDocument,
        getSingleDocument,
        updateCategory,

        addNewProduct,
        updateProduct,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
