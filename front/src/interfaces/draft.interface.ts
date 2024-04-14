import { ContentInterface } from './content.interface';
import { MinterInterface } from './minter.interface';

export interface DraftInterface {
  id: number;
  description?: string;
  author: string;
  hashtag?: string;
  location: string;
  minter: MinterInterface;
  content: ContentInterface;
  createdAt: Date;
  updatedAt: Date;
}
