import { createContext, useState } from "react";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

import { auth, db } from "../../../firebase/firebaseConfig";

export const LoginWithGoogleContext = createContext<any>(null);

export default function LoginWithGoogleProvider({ children }: any) {
  const [user, setUser] = useState({});

  const handleGoogleSignIn = async function () {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then(async (result: any) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const userDetail = result.user;

        try {
          if (!!result["_tokenResponse"].isNewUser) {
            const docRef = await addDoc(collection(db, "users"), {
              id: userDetail.uid,
              name: userDetail.displayName,
              email: userDetail.email,
              imageUrl: userDetail.photoURL,
            });
          }
          setUser(() => ({
            id: userDetail.uid,
            name: userDetail.displayName,
            email: userDetail.email,
            imageUrl: userDetail.photoURL,
            token: token,
          }));
          setTimeout(() => {
            alert("You logged in Successfully");
          }, 1000);
        } catch (err) {
          console.error(err);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMsg = error.message;
        // const email = error.customData.email;
        // const credential = GoogleAuthProvider.credentialFromError(error);
        console.error(errorCode, errorMsg);
      });
  };

  return (
    <LoginWithGoogleContext.Provider value={{ user, handleGoogleSignIn }}>
      {children}
    </LoginWithGoogleContext.Provider>
  );
}
