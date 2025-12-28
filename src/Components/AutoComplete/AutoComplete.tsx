import { useState, useEffect } from "react";
import "./AutoComplete.css";

const list = [
  { id: 1, firstName: "Jon", lastName: "Doe" },
  { id: 2, firstName: "Laa", lastName: "Abcd" },
  { id: 3, firstName: "Mary", lastName: "Penny" },
  { id: 4, firstName: "Marry2", lastName: "Doe2" },
  { id: 5, firstName: "Alice", lastName: "Wonderful" },
  { id: 6, firstName: "Jon", lastName: "Doe" },
  { id: 7, firstName: "Laa", lastName: "Abcd" },
  { id: 8, firstName: "Mary", lastName: "Penny" },
  { id: 9, firstName: "Marry2", lastName: "Doe2" },
  { id: 10, firstName: "Alice", lastName: "Wonderful" }
];

export default function AutoComplete() {
  const [input, setInput] = useState("");
  const [listItems, setListItems] = useState(list);
  const [activeIndex, setActiveIndex] = useState(-1);

  /* ---------------- Debounce filtering ---------------- */
  useEffect(() => {
    const timer = setTimeout(() => {
      const value = input.toLowerCase();

      setListItems(
        list.filter(
          item =>
            item.firstName.toLowerCase().includes(value) ||
            item.lastName.toLowerCase().includes(value)
        )
      );

      setActiveIndex(-1);
    }, 300);

    return () => clearTimeout(timer);
  }, [input]);

  /* ---------------- Keyboard navigation ---------------- */
  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!listItems.length) return;

    switch (e.key) {
      case "ArrowDown":
        setActiveIndex(prev =>
          prev < listItems.length - 1 ? prev + 1 : 0
        );
        break;

      case "ArrowUp":
        setActiveIndex(prev =>
          prev > 0 ? prev - 1 : listItems.length - 1
        );
        break;

      case "Enter":
        if (activeIndex >= 0) {
          const selected = listItems[activeIndex];
          setInput(`${selected.firstName} ${selected.lastName}`);
          setListItems([]);
        }
        break;
    }
  };

  /* ---------------- Highlight matched text ---------------- */
  const highlightText = (text: string) => {
    if (!input) return text;

    const regex = new RegExp(`(${input})`, "ig");
    return text.split(regex).map((part, i) =>
      part.toLowerCase() === input.toLowerCase() ? (
        <span key={i} className="highlight">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="auto-complete-container">
      <input
        className="input-field"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Enter Text Here"
      />

      {listItems.length > 0 && (
        <ul className="list-item">
          {listItems.map((item, index) => (
            <li
              key={item.id}
              className={index === activeIndex ? "active" : ""}
            >
              {highlightText(item.firstName)}{" "}
              {highlightText(item.lastName)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
