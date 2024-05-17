import { getPosts } from "@/services/posts.services";
import { useQuery } from "@tanstack/react-query";

const usePosts = (userId?: string) => {
  const { data, isPending } = useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(userId),
  });

  return { data, isPending };
};

export default usePosts;
