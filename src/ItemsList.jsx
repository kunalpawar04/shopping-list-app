import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faCircle,
  faCheckCircle,
  faRupeeSign,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

export function ItemsList({ units, setUnits, itemPrices, setItemPrices }) {
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

  //To delete the item
  function handleDeleteItem(itemID) {
    setUnits((array) => {
      return array.filter((target) => target.id !== itemID);
    });
  }

  return (
    <div className="item-list">
      <div className="item-container">
        {units.map((unit) => {
          return (
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
                  id="custom-input-id"
                  type="text"
                  className="custom-input"
                  value={
                    itemPrices[unit.id] !== undefined ? itemPrices[unit.id] : 0
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
          );
        })}
      </div>
    </div>
  );
}
