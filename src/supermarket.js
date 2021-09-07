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

  checkout() {
    let sum = 0;

    this.scannedItems.forEach((unit, item) => {
      if (item.specialPrice) {
        sum += item.specialPrice.calculateSpecialPrice(unit);

        sum += item.calculateNormalPrice(unit);
      } else {
        sum += item.calculateNormalPrice(unit);
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

  calculateNormalPrice(unit) {
    const numOfNormPricedItem = this.specialPrice
      ? unit % this.specialPrice.qty
      : unit;
    return this.unitPrice * numOfNormPricedItem;
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

  calculateSpecialPrice(unit) {
    const numOfSpecialPriceItem = Math.trunc(unit / this.qty);
    return this.price * numOfSpecialPriceItem;
  }
}

export class Buy2Get1Free {
  constructor(item) {
    this.qty = 3;
    this.item = item;
  }
  calculateSpecialPrice(unit) {
    return Math.trunc(unit / this.qty) * this.item.unitPrice * 2;
  }
}
