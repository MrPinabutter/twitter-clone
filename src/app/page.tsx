import Form from "@/components/molecules/Form";
import Header from "@/components/molecules/Header";
import PostFeed from "@/components/organisms/PostFeed";

export default function Home() {
  return (
    <>
      <Header label="Home" />
      <Form placeholder="What's happening?" />
      <PostFeed />
    </>
  );
}
