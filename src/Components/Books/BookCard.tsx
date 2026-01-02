import type { BookItem } from "./types";

interface BookCardProps {
  book: BookItem;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <div
      style={{
        width: "200px",
        padding: "12px",
        background: "white",
        border: "1px solid #ddd",
        borderRadius: "6px",
        textAlign: "center",
      }}
    >
      {book.coverUrl ? (
        <img
          src={book.coverUrl}
          alt={book.title}
          style={{
            width: "140px",
            height: "210px",
            objectFit: "cover",
            marginBottom: "8px",
          }}
        />
      ) : (
        <div style={{ height: "210px", marginBottom: "8px", background: "#eee" }} />
      )}
      <div style={{ fontWeight: "600" }}>{book.title}</div>
      <div style={{ fontSize: "12px", color: "#666" }}>
        {book.authors.join(", ")}
      </div>
      {book.year && (
        <div style={{ fontSize: "12px", color: "#444" }}>{book.year}</div>
      )}
    </div>
  );
}
