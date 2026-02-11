export type Post = {
  id: number;
  pseudo: string;
  content: string;
  user_id: number;
  created_at: string;
  is_liked: boolean;
};
export type PostLike = {
  id: number;
  post_id: number;
  user_id: number;
};
