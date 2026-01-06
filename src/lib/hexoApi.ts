import { Posts } from '../interfaces/posts';

const API_BASE = '/api';

export async function getPosts(index = 0, href?: string): Promise<Posts> {
  const url = href || `${API_BASE}/posts/${index}.json`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch posts: ${response.statusText}`);
  }
  return response.json();
}

export async function getPost(slug: string): Promise<Posts> {
  const response = await fetch(`${API_BASE}/post/${slug}.json`);
  if (!response.ok) {
    throw new Error(`Failed to fetch post: ${response.statusText}`);
  }
  return response.json();
}
