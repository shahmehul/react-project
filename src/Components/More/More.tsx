import { Link } from 'react-router-dom';
import './More.css'

export default function More(){
    return (

        <nav className="vertical-nav">
            <ul>
                <Link to="/paginationTest">Pagination</Link> {" "}
                <Link to="/autocomplete">Auto Complete</Link> {" "}
                <Link to="/customers">Customers</Link> {" "}
                <Link to="/books">Books</Link> {" "}
                <Link to="/catalog">Book Catalog</Link> {" "}
            </ul>
        </nav>
    )
}