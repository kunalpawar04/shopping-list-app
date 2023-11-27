import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faCircle,
  faCheckCircle,
  faPlus,
  faBars,
  faRupeeSign,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import { useState } from "react";

export default function App() {
  //Takes input which adjacent to + icon
  const [newItem, setNewItem] = useState("");

  //Adding the input in our final array
  const [units, setUnits] = useState([
    { id: crypto.randomUUID(), name: "item 1", quantity: 1, isSelected: false },
  ]);

  //To store prices of items
  const [itemPrices, setItemPrices] = useState({});

  // Storing the item names separately to avoid any issues
  const [itemName, setItemName] = useState(""); 

  //To add a new item to units array
  function handleAdd(e) {
    e.preventDefault();

    if (itemName.trim() !== "") {
      // Check if itemName is not empty
      setUnits((currentUnit) => {
        const newItemId = crypto.randomUUID();
        setItemPrices({ ...itemPrices, [newItemId]: 0 }); // Initialize price for the new item
        return [
          ...currentUnit,
          { id: newItemId, name: itemName, quantity: 1, isSelected: false },
        ];
      });

      setItemName(""); // Reset itemName after adding
    }
  }

  //To increase quantity of any item
  function handleQuantityIncrease(itemID) {
    setUnits((currentItemsArray) =>
      currentItemsArray.map((target) =>
        target.id === itemID
          ? { ...target, quantity: target.quantity + 1 }
          : target
      )
    );
  }

  //To decrease quantity of any item
  function handleQuantityDecrease(itemID) {
    setUnits((currentItemsArray) =>
      currentItemsArray.map((target) =>
        target.id === itemID
          ? {
              ...target,
              quantity: target.quantity > 0 ? target.quantity - 1 : 0,
            }
          : target
      )
    );
  }

  //To tick or untick
  function handleCheck(itemID) {
    setUnits((currentItemsArray) =>
      currentItemsArray.map((target) =>
        target.id === itemID
          ? { ...target, isSelected: !target.isSelected }
          : target
      )
    );
  }

  //To display total price
  const handleTotalPrice = () => {
    const totalPrice = Object.keys(itemPrices).reduce((accumulator, itemId) => {
      const currentItem = units.find(item => item.id === itemId);
      if (currentItem && currentItem.quantity > 0 && !currentItem.isSelected) {
        return accumulator + (currentItem.quantity * itemPrices[itemId]);
      }
      return accumulator;
    }, 0);
  
    return totalPrice;
  };
  
  //To display total quantity
  const handleTotalQuantity = () => {
    const totalQuantity = units.reduce((accumulator, currentItem) => {
      if (!currentItem.isSelected) {
        return accumulator + currentItem.quantity;
      }
      return accumulator;
    }, 0);
    return totalQuantity;
  };  

  //To delete the item
  function handleDeleteItem(itemID) {
    setUnits((array) => {
      return array.filter(target => target.id !== itemID) 
    })
  }

  return (
    <>
      <div className="main-container">
        <div className="heading">
          <h1>Shopping List</h1>
        </div>
        <div className="add-item-box">
          <div className="item-box">
            <input
              value={itemName}
              onChange={(e) => setItemName(e.target.value)} // Update itemName directly
              className="add-item-input"
              placeholder={itemName ? "" : "Add an item..."}
            />
            <button>
              <FontAwesomeIcon
                onClick={handleAdd}
                id="plus-icon"
                icon={faPlus}
              />
            </button>
            <button>
              <FontAwesomeIcon id="bars-icon" icon={faBars} />
            </button>


          </div>
        </div>
        <div className="item-list">
          <div className="item-container">
            {units.map((unit) => {
              return (
                // <li  className="list-of-items">
                <div key={unit.id} className="list-item-container">
                  <div className="item-name">
                    {/* HINT: replace false with a boolean indicating the item has been completed or not */}
                    {unit.isSelected ? (
                      <>
                        <button onClick={() => handleCheck(unit.id)}>
                          <FontAwesomeIcon icon={faCheckCircle} />
                        </button>
                        <span className="completed">{unit.name}</span>
                      </>
                    ) : (
                      <>
                        <button onClick={() => handleCheck(unit.id)}>
                          <FontAwesomeIcon icon={faCircle} />
                        </button>
                        <span>{unit.name}</span>
                      </>
                    )}
                  </div>
                  <div className="price">
                    <input
                      type="text"
                      className="custom-input"
                      value={
                        itemPrices[unit.id] !== undefined
                          ? itemPrices[unit.id]
                          : 0
                      } // Use the price from itemPrices state
                      onChange={(e) =>
                        setItemPrices({
                          ...itemPrices,
                          [unit.id]: !isNaN(e.target.value)
                            ? parseFloat(e.target.value)
                            : 0,
                        })
                      }
                      placeholder="---"
                    />
                    <button>
                      <FontAwesomeIcon icon={faRupeeSign} />
                    </button>
                  </div>
                  <div className="quantity">
                    <button onClick={() => handleQuantityDecrease(unit.id)}>
                      <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <span> {unit.quantity} </span>
                    <button onClick={() => handleQuantityIncrease(unit.id)}>
                      <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                  </div>
                  <div className="delete-item">
                    <button onClick={() => handleDeleteItem(unit.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </div>
                // </li>
              );
            })}
          </div>
        </div>
        <div className="total">
          <div className="items-no">Total Items: {handleTotalQuantity()}</div>
          <div className="total-price">Total Price: {handleTotalPrice()} Rs</div>
        </div>
      </div>
    </>
  );
}
