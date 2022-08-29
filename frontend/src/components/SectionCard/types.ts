export interface SectionProps {
  suggestions: Suggestion[];
  sectionIndex: number;
}

export interface Suggestion {
  content: string;
  likes: number;
  dislikes: number;
  comments: string[];
  isSelected: boolean;
}
