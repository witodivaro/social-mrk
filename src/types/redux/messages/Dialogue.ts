export interface Message {
  from: number;
  text: string;
  date: Date;
}

export interface Dialogue {
  image: null | string;
  username: string;
  messages: Message[];
}

export interface DialogueList {
  [key: string]: Dialogue;
}
