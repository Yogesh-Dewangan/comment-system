import Image from "next/image";
import Reaction from "./reaction";

export default function CommentLayout({ commentDetail }: any) {
  const { imageUrl, user, comment, reactions, postedOn } = commentDetail;
  const formattedDate = new Date(
    postedOn.seconds * 1000 + postedOn.nanoseconds / 1000000
  ).toLocaleDateString();

  return (
    <div className="my-4">
      <div className="flex mb-4 items-center">
        <Image
          src=""
          alt="user-image"
          width={35}
          height={35}
          className="rounded-full overflow-hidden mr-4"
        />
        <h3 className="text-base">{user.name}</h3>
      </div>
      <p className="mb-2 text-sm">{comment}</p>
      {!!imageUrl && (
        <Image
          src=""
          alt="attached-image"
          width={100}
          height={100}
          className="rounded-lg"
        />
      )}
      <div className="flex mt-4 text-xs">
        {reactions.map(
          (reaction: {
            commentId: number;
            name: string;
            count: number;
            userIds: [];
          }) => (
            <Reaction
              key={reaction.name}
              reaction={reaction}
              createdBy={user.id}
            ></Reaction>
          )
        )}
        |<button className="mx-4">Reply</button>|
        <label className="ml-4">{formattedDate}</label>
      </div>
    </div>
  );
}
