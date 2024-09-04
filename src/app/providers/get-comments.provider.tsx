import React from "react";
import { createContext, useState } from "react";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";

const GetCommentsContext = createContext<any>(null);

export function GetCommentProvider({ children }: any) {
  const [comments, setComments] = useState<any[]>([]);
  const [preference, setPreference] = useState("latest");
  const [totalComments, setTotalComments] = useState(0);

  const getComments = async function () {
    const docRef = await getDocs(collection(db, "comments"));
    const dataList: any = [];
    docRef.docs.forEach((doc) => {
      const data = JSON.parse(JSON.stringify(doc.data()));
      data["id"] = doc.id;
      dataList.push(data);
    });
    if (preference === "latest") {
      dataList.sort((a: any, b: any) => Number(b.id) - Number(a.id));
    } else {
      dataList.sort((a: any, b: any) => Number(a.id) - Number(b.id));
    }
    setTotalComments(() => dataList.length);
    setComments(() => dataList);
  };

  return (
    <GetCommentsContext.Provider
      value={{
        comments,
        getComments,
        totalComments,
        preference,
        setPreference,
      }}
    >
      {children}
    </GetCommentsContext.Provider>
  );
}

export default GetCommentsContext;
