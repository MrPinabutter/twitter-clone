"use client";

import usePosts from "@/hooks/usePosts";
import PostItem from "../molecules/PostItem";
import CommentItem from "../molecules/CommentItem";

interface CommentFeedProps {
  posts: Record<string, any>;
}

const CommentFeed: React.FC<CommentFeedProps> = ({ posts }) => {
  return (
    <>
      {posts.map((post: Record<string, any>) => (
        <CommentItem userId={post.userId} data={post} key={post.id} />
      ))}
    </>
  );
};

export default CommentFeed;
