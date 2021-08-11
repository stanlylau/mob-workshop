export class Cart{
  constructor(inventory){
    this.inventory = inventory
    this.qtyOfScannedItems = new Map()
  }

  scan (sku) {
    let item = this.inventory.findItem(sku)
    let qty = this.qtyOfScannedItems.get(item)

    if (qty) {
      this.qtyOfScannedItems.set(item, qty + 1)
    } else {
      this.qtyOfScannedItems.set(item, 1)
    }
  }

  calculateSpecialPrice(item, quantity) {
    const numOfSpecialPriceItem = Math.trunc(quantity / item.specialPrice.qty)        
    return item.specialPrice.price * numOfSpecialPriceItem
  }

  calculateNormalPrice(item, quantity) {
    const numOfNormPricedItem = item.specialPrice? quantity % item.specialPrice.qty : quantity
    return item.unitPrice * numOfNormPricedItem
  }

  checkout() {
    let sum = 0
    
    this.qtyOfScannedItems.forEach((qty, item) => {
      if (item.specialPrice) {
        sum += this.calculateSpecialPrice(item, qty)

        sum += this.calculateNormalPrice(item, qty)
      } else {
        sum += this.calculateNormalPrice(item, qty)
      }
    })
    
    return parseFloat(sum.toFixed(2))
  }
}

export class Item{
  constructor(sku, name, unitPrice){
    this.sku = sku
    this.name = name
    this.unitPrice = unitPrice
    this.specialPrice = null
  }

  setSpecialPrice(specialPrice){
    this.specialPrice = specialPrice
  }
}

export class Inventory{
  constructor() {
    this.items = []
   }
   

  add(item){
    this.items.push(item)
  }

  findItem(sku) {
    return this.items.find(item => item.sku === sku)
  }
}

export class NForXPrice{
  constructor(qty, price){
    this.qty = qty
    this.price = price
  }

}
