"use client";

import { getDocs, collection } from "firebase/firestore";

import { db } from "../../firebase/firebaseConfig";
import LoginPage from "./components/login/login-page";
import CommentPage from "./components/comment/comment-page";
import LoginWithGoogleProvider from "./providers/login-with-google.provider";

export default function Home() {
  return (
    <main className="min-h-screen p-24 bg-white">
      <LoginWithGoogleProvider>
        <LoginPage></LoginPage>
        <CommentPage></CommentPage>
      </LoginWithGoogleProvider>
    </main>
  );
}
