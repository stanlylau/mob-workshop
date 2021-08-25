export class Cart {
  constructor(inventory) {
    this.inventory = inventory;
    this.scannedItems = new Map();
  }

  scan(sku, weight) {
    let item = this.inventory.findItem(sku);
    let currentUnits = this.scannedItems.get(item);
    //let incrementUnit = weight || 1; // could be weight or physical qty of item

    if (currentUnits) {
      this.scannedItems.set(item, currentUnits + (weight || 1));
    } else {
      this.scannedItems.set(item, weight || 1);
    }
  }

  calculateSpecialPrice(item, unit) {
    const numOfSpecialPriceItem = Math.trunc(unit / item.specialPrice.qty);
    return item.specialPrice.price * numOfSpecialPriceItem;
  }

  calculateNormalPrice(item, unit) {
    const numOfNormPricedItem = item.specialPrice
      ? unit % item.specialPrice.qty
      : unit;
    return item.unitPrice * numOfNormPricedItem;
  }

  checkout() {
    let sum = 0;

    this.scannedItems.forEach((unit, item) => {
      if (item.specialPrice) {
        sum += this.calculateSpecialPrice(item, unit);

        sum += this.calculateNormalPrice(item, unit);
      } else {
        sum += this.calculateNormalPrice(item, unit);
      }
    });

    return parseFloat(sum.toFixed(2));
  }
}

export class Item {
  constructor(sku, name, unitPrice) {
    this.sku = sku;
    this.name = name;
    this.unitPrice = unitPrice;
    this.specialPrice = null;
  }

  setSpecialPrice(specialPrice) {
    this.specialPrice = specialPrice;
  }
}

export class Inventory {
  constructor() {
    this.items = [];
  }

  add(item) {
    this.items.push(item);
  }

  findItem(sku) {
    return this.items.find((item) => item.sku === sku);
  }
}

export class NForXPrice {
  constructor(qty, price) {
    this.qty = qty;
    this.price = price;
  }
}
