import { Post } from './post';

export interface Posts {
  total?: number;
  pageSize?: number;
  pageCount?: number;
  pageIndex?: number;
  data?: Array<Post>;
}
