export interface SignInDto {
  username: string;
  password: string;
}

export interface SignUpDto{
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

export interface ChatMessage{
  messageId: number;
  contents: string;
  sender: UserProfile;
  timestamp: string;
  messageType: MessageType;
}

export enum MessageType{
  CHAT = "CHAT", JOIN = "JOIN"
}
export interface SendChatMessageDto{
  contents: string;
}

export interface UserProfile{
  id: number,
  username: string,
  firstName: string,
  lastName: string,
}

export interface Token{
  token: string;
}

export interface Chat{
  chatId: number,
  chatName: string;
  membersCount: number;
}
