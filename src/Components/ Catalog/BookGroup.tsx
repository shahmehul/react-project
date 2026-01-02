import type { BookItem } from "./model";

interface BookGroupProps {
    books: BookItem[];
}

export default function BookGroup({ books }: BookGroupProps) {
    return (
        <div className="book-group">
            {
                books.map((book) => (
                    <div key={book.id} className="book-card"> 
                        <img className="book-img" src={book.coverUrl as string} alt="Flowers in Chania"></img>
                        <h3>{book.title}</h3>
                        <p>{book.authorNames.join(", ")}</p>
                        <p>{book.year}</p>
                    </div>
                ))
            }
        </div>
    )
}