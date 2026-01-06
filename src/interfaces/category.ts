import { Post } from './post';

export interface Category {
  name: string;
  postlist: Array<Post>;
}
