export type Movie = {
  id: string | number;
  poster_path: string;
  title: string;
  release_date: string | Date;
  genres: string[];
  vote_average: number;
  runtime: string;
  overview: string;
};