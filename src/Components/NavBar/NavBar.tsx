import { useEffect, useState } from "react";
import SidebarItem from "./SidebarItem";
import './NavBar.css';
import data from "./Menu.json";
import { useNavigate } from "react-router-dom";

interface MenuNode {
    id: string;
    label: string;
    link: string;
    children?: MenuNode[];
}

interface ApiResponse {
    record: {
        menu: MenuNode[];
    };
}

export default function NavBar(){
    const [menu, setMenu] = useState<MenuNode[]>(data.menu);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [activeId, setActiveId] = useState<string | null>(null);

    // useEffect(() => {
    //     const fetchData = async ()=> {
    //         const response = await fetch("https://api.jsonbin.io/v3/qs/6975abe1d0ea881f40838951");
    //         if(!response.ok) {
    //             setError('There was some error.');
    //             throw('there was error fetching data');
    //         }
    //         const data: ApiResponse = await response.json();
    //         setMenu(data.record.menu);
    //         setLoading(false);
    //     }
    //     fetchData();
    // },[])
    return (
        <div className="nav-container">
            <aside>
                {loading && <p> Loading ... </p>}
                {error && <p> Error: {error} </p>}
                {
                    menu.map((node)=>(
                        <div style={{textAlign:'left'}}>
                            <SidebarItem 
                                key={node.id} 
                                node={node}
                                activeId={activeId}
                                setActiveId={setActiveId}
                            ></SidebarItem>
                        </div>
                    ))
                }
            </aside>
        </div>
    )
}