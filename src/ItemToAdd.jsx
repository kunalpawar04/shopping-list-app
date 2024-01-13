import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export function ItemToAdd({ onClick }) {
  // Storing the item names separately to avoid any issues
  const [itemName, setItemName] = useState("");

  //To add a new item to units array
  function handleAdd(e) {
    e.preventDefault();

    if (itemName.trim() === "") return;

    onClick(itemName);

    setItemName(""); // Reset itemName after adding
  }

  return (
    <div className="add-item-box">
      <div className="item-box">
        <input
          value={itemName}
          onChange={(e) => setItemName(e.target.value)} // Update itemName directly
          className="add-item-input"
          placeholder={itemName ? "" : "Add an item..."}
          id="item-id"
        />
        <button>
          <FontAwesomeIcon onClick={handleAdd} id="plus-icon" icon={faPlus} />
        </button>
      </div>
    </div>
  );
}
