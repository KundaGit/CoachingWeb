export interface Question {

  id: number;

  section: string;

  question: string;

  options: string[];

  answer: string;

  selected?: string;

  visited?: boolean;

  markedForReview?: boolean;
}