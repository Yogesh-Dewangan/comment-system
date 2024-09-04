import { useContext, useEffect } from "react";

import CommentLayout from "./comment-layout";
import GetCommentsContext from "@/app/providers/get-comments.provider";

export default function CommentList() {
  const { comments, getComments, preference } = useContext(GetCommentsContext);

  useEffect(() => {
    getComments();
  }, [comments.length, preference]);

  return (
    <section>
      {!!comments.length &&
        comments.map((comment: any) => (
          <CommentLayout
            key={comment.id}
            commentDetail={comment}
          ></CommentLayout>
        ))}
    </section>
  );
}
