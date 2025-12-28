import Pagination from "./Pagination";

export function PaginationTest(){
    const data = ['a','b','c','d','e','f','g','i','j','k','l'];
    return (
        <Pagination data={data} pageNumber={3} pageSize={3} direction={'backward'}></Pagination>
    )
}