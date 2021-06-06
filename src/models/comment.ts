export interface UserMessage {
  text: string;
  time: string;
  nickname: string;
}
export interface PlanComment extends UserMessage {
  resolved: boolean;
  replies: UserMessage[];
  planName: string;
  isRead?: boolean;
}
