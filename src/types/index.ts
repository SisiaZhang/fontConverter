export interface User {
  id: string;
  username: string;
}

export interface ConversionHistory {
  id: string;
  userId: string;
  originalText: string;
  convertedText: string;
  fontFamily: string;
  timestamp: Date;
}

export interface Font {
  id: string;
  name: string;
  family: string;
} 