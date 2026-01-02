export interface BookItem {
    id: string;
    title: string;
    authorKeys: string[];
    authorNames: string[];
    coverUrl: string | null;
    year: number | null;
}

export interface OpenLibraryDoc {
    title: string;
    author_key?: string[];
    cover_i?: number;
    first_publish_year?: number;
}

