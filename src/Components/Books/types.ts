export interface OpenLibraryDoc {
    title: string;
    author_name?: string[];
    author_key?: string[];
    cover_i?: number;
    first_publish_year?: number;
  }
  
  export interface BookItem {
    id: string;
    title: string;
    authors: string[];
    coverUrl: string | null;
    year: number | null;
  }
  