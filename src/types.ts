export interface Option {
  text: string;
  correct: boolean;
}

export interface QuestionFeedback {
  correct: string;
  wrong: string;
}

export interface Question {
  id: number;
  question: string;
  options: Option[];
  feedback: QuestionFeedback;
  graphicType: 'reflex' | 'spinal' | 'alcohol' | 'pathway' | 'sleep' | 'stroke';
}

export interface PeerReview {
  id: string;
  reviewerName: string;
  reviewerRole: string;
  ratingEngagement: number;
  ratingEnhancement: number;
  ratingExtension: number;
  comments: string;
  timestamp: string;
}
