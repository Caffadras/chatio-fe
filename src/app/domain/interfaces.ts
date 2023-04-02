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
}

export interface SendChatMessageDto{
  contents: string;
  sender: number;
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
