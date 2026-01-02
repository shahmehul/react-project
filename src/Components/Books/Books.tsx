import { useEffect, useMemo, useState } from "react";
import { searchBooks } from "./api";
import type { BookItem } from "./types";
import BookGroup from "./BookGroup";
import './Books.css';
import Toggle from "./Toggle";

export default function Books() {
  const [books, setBooks] = useState<BookItem[]>([]);
  const [groupByYear, setGroupByYear] = useState(false);

  useEffect(() => {
    async function load() {
      const items = await searchBooks("best books"); // initial query
      setBooks(items);
    }
    load();
  }, []);

  const grouped = useMemo(() => {
    const result: Record<string, BookItem[]> = {};
  
    for (const book of books) {
      const key = groupByYear
        ? book.year?.toString() || "Unknown"
        : book.title[0].toUpperCase();
  
      if (!result[key]) result[key] = [];
      result[key].push(book);
    }
  
    return result;
  }, [books, groupByYear]);

  console.log(grouped);

  return (
    <div className="catalog-container">
      <h1>Book Catalog</h1>
      
      <Toggle enabled={groupByYear} onToggle={setGroupByYear} />

      {Object.keys(grouped)
        .sort()
        .map(letter => (
          <BookGroup key={letter} letter={letter} books={grouped[letter]} />
        ))}
    </div>
  );
}
