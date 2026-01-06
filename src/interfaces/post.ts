import { CategoriesItem } from './categories';
import { TagsItem } from './tags';

export interface Post {
  title?: string;
  slug?: string;
  date?: string;
  updated?: string;
  comments?: boolean;
  path?: string;
  excerpt?: string;
  content?: string;
  categories?: Array<CategoriesItem>;
  tags?: Array<TagsItem>;
}
