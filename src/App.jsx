import "./style.css";
import { useEffect, useState } from "react";
import { Heading } from "./Heading";
import { ItemToAdd } from "./ItemToAdd";
import { TotalSummary } from "./TotalSummary";
import { ItemsList } from "./ItemsList";

export default function App() {
  //Adding the input in our final array
  const [units, setUnits] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) {
      return [
        {
          id: crypto.randomUUID(),
          name: "item 1",
          quantity: 1,
          isSelected: false,
        },
      ];
    }
    return JSON.parse(localValue);
  });

  //To store prices of items
  const [itemPrices, setItemPrices] = useState({});

  //To add the items
  function addItems(name) {
    if (name.trim() !== "") {
      // Check if itemName is not empty
      setUnits((currentUnit) => {
        const newItemId = crypto.randomUUID();
        setItemPrices({ ...itemPrices, [newItemId]: 0 }); // Initialize price for the new item

        return [
          ...currentUnit,
          { id: newItemId, name, quantity: 1, isSelected: false },
        ];
      });
    }
  }

  //To store the values locally
  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(units));
  }, [units]);

  return (
    <>
      <div className="main-container">
        <Heading />
        <ItemToAdd onClick={addItems} />
        <ItemsList
          setUnits={setUnits}
          units={units}
          itemPrices={itemPrices}
          setItemPrices={setItemPrices}
        />
        <TotalSummary units={units} itemPrices={itemPrices} />
      </div>
    </>
  );
}
