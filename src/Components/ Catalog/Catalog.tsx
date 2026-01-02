import { useEffect, useMemo, useState } from "react"
import { fetchCatalog } from "./api";
import type { BookItem } from "./model";
import BookGroup from "./BookGroup";
import './Catalog.css';

export default function Catalog(){
    const [books,setBooks] = useState<BookItem[]>([]);
    const [toggleByYear, setToggleByYear] = useState<Boolean>(false);

    useEffect(()=> {
        async function loadData(){
            const results = await fetchCatalog('best books');
            setBooks(results);
            console.log(results);
        }
        loadData();
    },[])

    const onCheckBoxChange = (e: any) => {
        const {checked} = e.target;
        setToggleByYear(checked);
        console.log(checked);
    }

    const grouped = useMemo(()=> {
        const groupedRecords: Record<string, BookItem[]> = {}
    
        books.forEach((book)=> {
            const firstLetter = toggleByYear ? book?.year?.toString() || 'Unknown' : book.title[0].toUpperCase();
            if(!groupedRecords[firstLetter]) {
                groupedRecords[firstLetter] = [];
            }
            groupedRecords[firstLetter].push(book);
        })
        return groupedRecords;

    },[books, toggleByYear]);

    

     return (
        <div className="catalog-container">
            <div className="row">
                <h1>Books Catalog</h1>
                <form>
                    <label htmlFor="filter">Display by Year</label>
                    <input type="checkbox" onChange={onCheckBoxChange} id="filter" name="filter" value="newsletter"></input>
                </form>
            </div>
            

            {
                Object.keys(grouped)
                .sort()
                .map((key:string)=> (
                    <div key={key}>
                        <h3 className="header-text"> {key} </h3>
                        <BookGroup books={grouped[key]}></BookGroup>
                    </div>
                ))
            }
        </div>
     )
}