import BookCard from "./BookCard";
import type { BookItem } from "./types";

interface BookGroupProps {
  letter: string;
  books: BookItem[];
}

export default function BookGroup({ letter, books }: BookGroupProps) {
  return (
    <section style={{ margin: "32px 0" }}>
      <h2 style={{textAlign:'left'}}>{letter}</h2>
      <div
        style={{
          display: "flex",
          gap: "24px",
          flexWrap: "wrap",
        }}
      >
        {books.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}
