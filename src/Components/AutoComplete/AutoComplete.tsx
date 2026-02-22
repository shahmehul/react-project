import { useState } from "react";

const options = ["Apple", "Banana", "Orange", "Mango", "Grapes"];

export default function Autocomplete() {
  const [query, setQuery] = useState("");
  const [show, setShow] = useState(false);

  const filtered = options.filter(item =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ width: 250, position: "relative" }}>
      <input
        value={query}
        onChange={e => {
          setQuery(e.target.value);
          setShow(true);
        }}
        onFocus={()=> setShow(true)}
        onBlur={() => setTimeout(() => {
          setShow(false);
        },150)}
        style={{ width: 250, margin:0 }}
        placeholder="Search fruit..."
      />

      <span
        style={{
          position: "relative",
          top:"-33px",
          left:"55%",
          transform: "translateY(-50%)",
          pointerEvents: "none", // lets clicks go to input
          fontSize: 28
        }}
      >
        {show === true ? "˄" : "˅"}
      </span>
      {show && (
        <ul
          style={{
            width: 270,
            position: "absolute",
            top:"49%",
            marginLeft:'25px',
            border: "1px solid #ccc",
            background: "#fff",
            listStyle: "none",
            padding: 0,
            margin: 0,
            maxHeight: 150,
            overflowY: "auto"
          }}
        >
          {filtered.map(item => (
            <li
              key={item}
              onClick={() => {
                setQuery(item);
                setShow(false);
              }}
              style={{ padding: 8, cursor: "pointer" }}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}