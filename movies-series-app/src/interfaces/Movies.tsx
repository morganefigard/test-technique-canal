interface Movie {
  id: number,
  title: string,
  vote_average: number,
  poster_path: string,
  release_date?: string
}

interface MoviePageData {
  page: number,
  total_pages: number,
  results: Movie[]
}

export type {
  Movie,
  MoviePageData,
}
