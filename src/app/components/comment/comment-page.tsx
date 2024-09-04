import { useState } from "react";

import CommentHeader from "./comment-header";
import CommentBox from "./comment-box";
import CommentList from "./comment-list";
import { GetCommentProvider } from "../../providers/get-comments.provider";

export default function CommentPage() {
  return (
    <section className="border-2 rounded p-4">
      <GetCommentProvider>
        <CommentHeader></CommentHeader>
        <CommentBox></CommentBox>
        <CommentList></CommentList>
      </GetCommentProvider>
    </section>
  );
}
