export function TotalSummary({ units, itemPrices }) {
  //To display total price
  const handleTotalPrice = () => {
    const totalPrice = Object.keys(itemPrices).reduce((accumulator, itemId) => {
      const currentItem = units.find((item) => item.id === itemId);
      if (currentItem && currentItem.quantity > 0 && !currentItem.isSelected) {
        return accumulator + currentItem.quantity * itemPrices[itemId];
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

  return (
    <div className="total">
      <div className="items-no">Total Items: {handleTotalQuantity()}</div>
      <div className="total-price">Total Price: {handleTotalPrice()} Rs</div>
    </div>
  );
}
