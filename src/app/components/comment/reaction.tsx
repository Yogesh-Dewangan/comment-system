import { LoginWithGoogleContext } from "@/app/providers/login-with-google.provider";
import { doc, runTransaction } from "firebase/firestore";
import { useContext } from "react";
import { IoThumbsUp, IoThumbsDown } from "react-icons/io5";
import { db } from "../../../../firebase/firebaseConfig";
import GetCommentsContext from "@/app/providers/get-comments.provider";

export default function Reaction({ reaction, createdBy }: any) {
  const { commentId, name, count, userIds } = reaction;

  const { user, handleGoogleSignIn } = useContext(LoginWithGoogleContext);
  const { getComments } = useContext(GetCommentsContext);

  const handleReaction = async function (ev: string) {
    if (!!user.name) {
      if (ev === "like") {
        if (user.id !== createdBy && !userIds.includes(user.id)) {
          const docRef = doc(db, "comments", commentId.toString());
          try {
            await runTransaction(db, async (transaction) => {
              const commentDoc: any = await transaction.get(docRef);

              const updateReactions = commentDoc
                ?.data()
                .reactions.map((reaction: any) => {
                  if (
                    reaction.name === "like" &&
                    reaction.commentId === commentId
                  ) {
                    return {
                      ...reaction,
                      count: reaction.count + 1,
                      userIds: [...reaction.userIds, user.id],
                    };
                  } else if (
                    reaction.name === "dislike" &&
                    reaction.userIds.includes(user.id)
                  ) {
                    return {
                      ...reaction,
                      count: reaction.count - 1,
                      userIds: reaction.userIds.splice(
                        reaction.userIds.indexOf(user.id),
                        1
                      ),
                    };
                  } else {
                    return reaction;
                  }
                });

              transaction.update(docRef, { reactions: updateReactions });
              getComments();
            });
          } catch (err) {
            console.error(err);
          }
        }
      } else {
        if (user.id !== createdBy && !userIds.includes(user.id)) {
          const docRef = doc(db, "comments", commentId.toString());

          try {
            await runTransaction(db, async (transaction) => {
              const commentDoc: any = await transaction.get(docRef);

              const updateReactions = commentDoc
                ?.data()
                .reactions.map((reaction: any) => {
                  if (
                    reaction.name === "dislike" &&
                    reaction.commentId === commentId
                  ) {
                    return {
                      ...reaction,
                      count: reaction.count + 1,
                      userIds: [...reaction.userIds, user.id],
                    };
                  } else if (
                    reaction.name === "like" &&
                    reaction.userIds.includes(user.id)
                  ) {
                    return {
                      ...reaction,
                      count: reaction.count - 1,
                      userIds: reaction.userIds.splice(
                        reaction.userIds.indexOf(user.id),
                        1
                      ),
                    };
                  } else {
                    return reaction;
                  }
                });

              transaction.update(docRef, { reactions: updateReactions });
              getComments();
            });
          } catch (err) {
            console.error(err);
          }
        }
      }
    } else {
      handleGoogleSignIn();
    }
  };

  return (
    <div className="flex border-1 rounded-full items-center mr-4">
      {name === "like" ? (
        <IoThumbsUp
          id="like"
          className="mr-2 cursor-pointer"
          onClick={() => {
            handleReaction("like");
          }}
        />
      ) : (
        <IoThumbsDown
          id="dislike"
          className="mr-2 cursor-pointer"
          onClick={() => {
            handleReaction("dislike");
          }}
        />
      )}
      <label>{count}</label>
    </div>
  );
}
