import { Post } from './post';

export interface Tag {
  name: string;
  postlist: Array<Post>;
}
