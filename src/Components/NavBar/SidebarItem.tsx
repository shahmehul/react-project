import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface MenuNode {
    id: string;
    label: string;
    link: string;
    children?: MenuNode[];
}

interface SideBarItemParam {
    menu: MenuNode
}

const styles: Record<string, React.CSSProperties> = {
    layout: {
        display: "flex",
        height: "100vh",
        fontFamily: "Arial, sans-serif"
    },
    sidebar: {
        width: 260,
        borderRight: "1px solid #ddd",
        padding: 16,
        overflowY: "auto"
    },
    content: {
        flex: 1,
        padding: 24
    },
    item: {
        cursor: "pointer",
        padding: "6px 8px",
        borderRadius: 4
    },
    activeItem: {
        background: "#2563eb",
        color: "#fff"
    },
    children: {
        marginLeft: 16,
        marginTop: 4
    },
    toggle: {
        marginRight: 6,
        fontWeight: 700
    }
};

export default function SidebarItem({
    node,
    activeId,
    setActiveId }: {
        node: MenuNode;
        activeId: string | null;
        setActiveId: (id: string) => void;
    }) {

    const [open, setOpen] = useState(true);
    const hasChildren = !!node.children && node.children.length > 0;
    const navigate = useNavigate();

    function handleClick() {
        setActiveId(node.id);
        if (hasChildren) {
            setOpen((prev) => !prev);
        } else {
            navigate(node.link)
        }
    }

    return (
        <div>
            <div
                style={{
                    ...styles.item,
                    ...(activeId === node.id ? styles.activeItem : {})
                }}
                onClick={handleClick}
            >
                {hasChildren && (
                    <span style={styles.toggle}>{open ? "−" : "+"}</span>
                )}
                {node.label}
            </div>


            {hasChildren && open && (
                <div style={styles.children}>
                    {node.children!.map((child) => (
                        <SidebarItem
                            key={child.id}
                            node={child}
                            activeId={activeId}
                            setActiveId={setActiveId}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}