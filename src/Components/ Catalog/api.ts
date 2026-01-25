import type { BookItem, OpenLibraryDoc } from "./model";

const BASE_URL = "https://openlibrary.org";

/**
 * Fetch raw books from Open Library search API
 */
async function fetchBooks(query: string): Promise<OpenLibraryDoc[]> {
  const url = `${BASE_URL}/search.json?q=${encodeURIComponent(
    query
  )}&fields=title,author_key,cover_i,first_publish_year&limit=10`;

  const res = await fetch(url);
  const data = await res.json();

  return data.docs.map((doc: OpenLibraryDoc) => ({
    title: doc.title,
    author_key: doc.author_key,
    cover_i: doc.cover_i,
    first_publish_year: doc.first_publish_year ?? undefined
  }));
}

/**
 * Fetch a single author name by ID
 */
async function getAuthorName(authorKey: string): Promise<string | null> {
  try {
    const res = await fetch(`${BASE_URL}/authors/${authorKey}.json`);
    if (!res.ok) return null;
    const data = await res.json();
    return data.name;
  } catch {
    return null;
  }
}

export async function fetchCatalog(query: string): Promise<BookItem[]> {
    const books = await fetchBooks(query);
    const bookItems: BookItem[] = [];
    const authorCache = new Map<string, string>();
  
    for (const book of books) {
      if (!book.author_key || book.author_key.length === 0) continue;
  
      const authorNames = await Promise.all(
        book.author_key.map(async (authorId) => {
          if (authorCache.has(authorId)) return authorCache.get(authorId)!;
  
          try {
            const authorName = await getAuthorName(authorId);
            authorCache.set(authorId, authorName as string);
            return authorName;
          } catch {
            return null;
          }
        })
      );
  
      if (authorNames.some(name => name === null)) continue;
  
      bookItems.push({
        id: `${book.title}-${authorNames.join(",")}`,
        title: book.title,
        authorKeys: book.author_key,
        authorNames: authorNames as string[],
        coverUrl: book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
          : null,
        year: book.first_publish_year ?? null
      });
    }
  
    return bookItems;
  }
  
