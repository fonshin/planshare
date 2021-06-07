export interface UserMessage {
  text: string;
  time: string;
  nickname: string;
  uuid?: string;
}
export interface PlanComment extends UserMessage {
  resolved: boolean;
  replies: UserMessage[];
  planName: string;
  isRead?: boolean;
  positionLeft?: number;
  positionTop?: number;
}
