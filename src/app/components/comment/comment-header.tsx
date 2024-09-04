import { SyntheticEvent, useContext } from "react";

import GetCommentsContext from "@/app/providers/get-comments.provider";

export default function CommentHeader() {
  const { totalComments, preference, setPreference } =
    useContext(GetCommentsContext);
  const changePreference = function (e: SyntheticEvent) {
    const target = e.target as HTMLElement;
    if (preference !== target.id) {
      setPreference(() => target.id);
    }
  };

  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-bold">Comments ({totalComments})</h2>
      <div onClick={changePreference} className="border-2 rounded text-sm">
        <label
          id="popular"
          className={`m-2 ${
            preference === "popular" ? "font-bold" : "font-normal"
          }`}
        >
          Popular
        </label>
        |
        <label
          id="latest"
          className={`m-2 ${
            preference === "latest" ? "font-bold" : "font-normal"
          }`}
        >
          Latest
        </label>
      </div>
    </div>
  );
}
