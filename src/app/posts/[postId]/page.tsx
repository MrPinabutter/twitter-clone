"use client";

import Form from "@/components/molecules/Form";
import Header from "@/components/molecules/Header";
import PostItem from "@/components/molecules/PostItem";
import CommentFeed from "@/components/organisms/CommentFeed";
import usePost from "@/hooks/usePost";
import { MoonLoader } from "react-spinners";

export default function PostView({ params }: { params: { postId: string } }) {
  const { data: post, isPending } = usePost(params.postId);

  if (isPending || !post) {
    return (
      <div className="flex justify-center items-center h-full">
        <MoonLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <>
      <Header showBackArrow label={"Tweet"} />
      <PostItem data={post} />
      <Form placeholder="Tweet your reply" postId={params.postId} isComment />
      <CommentFeed posts={post.comments} />
    </>
  );
}
