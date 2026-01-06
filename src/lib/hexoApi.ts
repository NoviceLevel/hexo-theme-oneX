import { Site } from '../interfaces/site';
import { Posts } from '../interfaces/posts';
import { Post } from '../interfaces/post';
import { Tag } from '../interfaces/tag';
import { Category } from '../interfaces/category';

export const API_BASE = '/api';

export async function getSite(href = API_BASE): Promise<Site> {
  const response = await fetch(`${href}/site.json`);
  if (!response.ok) {
    throw new Error(`Failed to fetch site: ${response.statusText}`);
  }
  return response.json();
}

export async function getPosts(index?: number, href = API_BASE): Promise<Posts> {
  const url = typeof index === 'undefined' 
    ? `${href}/posts.json`
    : `${href}/posts/${index}.json`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch posts: ${response.statusText}`);
  }
  
  const data = await response.json();
  data.pageIndex = index || 1;
  return data;
}

export async function getPost(slug: string, href = API_BASE): Promise<Post> {
  const response = await fetch(`${href}/articles/${slug}.json`);
  if (!response.ok) {
    throw new Error(`Failed to fetch post: ${response.statusText}`);
  }
  return response.json();
}

export async function getTags(href = API_BASE): Promise<Tag[]> {
  const response = await fetch(`${href}/tags.json`);
  if (!response.ok) {
    throw new Error(`Failed to fetch tags: ${response.statusText}`);
  }
  return response.json();
}

export async function getTagPosts(name: string, href = API_BASE): Promise<Post[]> {
  const response = await fetch(`${href}/tags/${encodeURIComponent(name)}.json`);
  if (!response.ok) {
    throw new Error(`Failed to fetch tag posts: ${response.statusText}`);
  }
  const data = await response.json();
  return data.postlist || data.posts || [];
}

export async function getCategories(href = API_BASE): Promise<Category[]> {
  const response = await fetch(`${href}/categories.json`);
  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.statusText}`);
  }
  return response.json();
}

export async function getCategoryPosts(name: string, href = API_BASE): Promise<Post[]> {
  const response = await fetch(`${href}/categories/${encodeURIComponent(name)}.json`);
  if (!response.ok) {
    throw new Error(`Failed to fetch category posts: ${response.statusText}`);
  }
  const data = await response.json();
  return data.postlist || data.posts || [];
}
