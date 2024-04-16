export interface FollowInterface {
  id: number;
  type: 'follower' | 'followed';
  accepted: boolean;
  minterId: number;
  createdAt: Date;
  updatedAt: Date;
}
