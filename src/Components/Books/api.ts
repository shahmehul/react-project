import type { OpenLibraryDoc, BookItem } from "./types";

const BASE_URL = "https://openlibrary.org";

export async function searchBooks(query: string): Promise<BookItem[]> {
  const url = `${BASE_URL}/search.json?q=${encodeURIComponent(query)}&fields=title,author_name,author_key,cover_i,first_publish_year&limit=50`;
  const res = await fetch(url);
  const data = await res.json();

  const docs: OpenLibraryDoc[] = data.docs;

  return docs.map(doc => ({
    id: doc.cover_i ? doc.cover_i.toString() : doc.title,
    title: doc.title,
    authors: doc.author_name || ["Unknown"],
    coverUrl: doc.cover_i
      ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
      : null,
    year: doc.first_publish_year || null,
  }));
}
