"use client";

import usePosts from "@/hooks/usePosts";
import PostItem from "../molecules/PostItem";

interface PostFeedProps {
  userId?: string;
}

const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
  const { data: posts = [] } = usePosts(userId);

  return (
    <div className="flex flex-col">
      {posts.map((post: Record<string, any>) => (
        <PostItem userId={post.userId} data={post} key={post.id} />
      ))}
    </div>
  );
};

export default PostFeed;
