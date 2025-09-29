export type Movie = {
  id: string | number;
  imageUrl: string;
  name: string;
  releaseYear: number;
  genres: string[];
  rating: number;
  duration: string;
  description: string;
};