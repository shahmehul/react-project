function paginate(
    data: any[],
    pageNumber: number,
    pageSize: number,
    direction: string,
  ): any[] {
    if (!Array.isArray(data) || pageNumber < 1 || pageSize < 1) {
      return [];
    }
    

    const startIndex = direction === 'forward' ? (pageNumber - 1) * pageSize : (pageNumber - 1) * pageSize - 1 ;
    const endIndex = startIndex + pageSize;
  
    return data.slice(startIndex, endIndex);
  }
  
  
  type PaginationProps = {
    data: any[];
    pageNumber: number;
    pageSize: number;
    direction: string;
  };
  
  export default function Pagination({
    data,
    pageNumber,
    pageSize,
    direction,
  }: PaginationProps) {
    const items = paginate(data, pageNumber, pageSize, direction);
  
    return (
      <ul>
        {items.map((item, index) => (
          <li key={index}>{String(item)}</li>
        ))}
      </ul>
    );
  }