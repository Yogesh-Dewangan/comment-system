import { SyntheticEvent, useContext, useRef, useState } from "react";

import { doc, setDoc } from "firebase/firestore";
import { TiAttachment } from "react-icons/ti";

import { db } from "../../../../firebase/firebaseConfig";
import { LoginWithGoogleContext } from "@/app/providers/login-with-google.provider";
import GetCommentsContext from "@/app/providers/get-comments.provider";

export default function CommentBox() {
  const { user, handleGoogleSignIn } = useContext(LoginWithGoogleContext);
  const { comments, getComments } = useContext(GetCommentsContext);

  const inputRef: any = useRef(null);
  const textareaRef: any = useRef(null);

  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  // const [image, setImage] = useState<any>("");
  const [imageName, setImageName] = useState("");
  const [canSend, setCanSend] = useState(false);

  const handleTextSetting = function (e: SyntheticEvent) {
    const elem = e.target as HTMLElement;

    switch (elem.id) {
      case "bold":
        setIsBold((val) => !val);
        break;
      case "italic":
        setIsItalic((val) => !val);
        break;
      case "underline":
        setIsUnderline((val) => !val);
        break;
    }
  };

  const handleAttachment = function () {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleImageFile = async function (e: SyntheticEvent) {
    const target = e.target as HTMLInputElement;
    const fileList = target.files as FileList;

    setImageName(() => fileList[0].name);
  };

  const handleTextareaInput = function (e: SyntheticEvent) {
    const target = e.target as HTMLTextAreaElement;
    if (target.value.length === 0) {
      setCanSend(() => false);
    } else if (!!target.value.length) {
      setCanSend(() => true);
    }
  };

  const handleSendComment = async function () {
    if (!!user?.name) {
      let comment = "";
      if (textareaRef.current) {
        comment = textareaRef.current.value;
      }

      const userData = user;
      delete userData.token;

      await setDoc(doc(db, "comments", comments.length.toString()), {
        userId: userData.id,
        user: userData,
        comment: comment,
        imageUrl: "",
        reply: [],
        reactions: [
          { commentId: comments.length, name: "like", count: 0, userIds: [] },
          {
            commentId: comments.length,
            name: "dislike",
            count: 0,
            userIds: [],
          },
        ],
        postedOn: new Date(),
      });

      textareaRef.current.value = "";
      getComments();
    } else {
      handleGoogleSignIn();
    }
  };

  return (
    <div className="border-2 rounded p-2">
      <textarea
        rows={2}
        placeholder="Enter your comment"
        onInput={handleTextareaInput}
        ref={textareaRef}
        className={`border-b-2 border-black w-full px-2 py-1 text-sm ${
          isBold ? "font-bold" : ""
        } ${isItalic ? "italic" : ""} ${isUnderline ? "underline" : ""}`}
      ></textarea>
      <div
        onClick={handleTextSetting}
        className="flex justify-between items-center"
      >
        <div className="text-sm">
          <label id="bold" className={`mr-4 ${isBold ? "font-bold" : ""}`}>
            B
          </label>
          <label id="italic" className={`mr-4 ${isItalic ? "font-bold" : ""}`}>
            I
          </label>
          <label
            id="underline"
            className={`mr-4 underline ${isUnderline ? "font-bold" : ""}`}
          >
            U
          </label>
          <span className="inline-flex align-middle items-end">
            <input
              type="file"
              className="hidden"
              ref={inputRef}
              accept="image/*"
              onChange={handleImageFile}
            />
            <TiAttachment onClick={handleAttachment} className="text-xl mr-4" />
            {/* <Image
              src="/attachment-logo.png"
              alt="attachment-logo"
              width={15}
              height={15}
              onClick={handleAttachment}
              className="inline-block mr-4"
            /> */}
            <label className="text-xs text-blue-500">{imageName}</label>
          </span>
        </div>
        <button
          className={`float-right bg-black text-white px-3 py-1 rounded text-sm ${
            !canSend ? "opacity-30" : ""
          }`}
          onClick={handleSendComment}
          disabled={!canSend}
        >
          Send
        </button>
      </div>
    </div>
  );
}
