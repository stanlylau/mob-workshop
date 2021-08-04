export class Cart{
  constructor(inventory){
    this.inventory = inventory
    this.scannedSkuQty = {}
  }
   
  scan(sku){
    if(this.scannedSkuQty[sku]) {
      this.scannedSkuQty[sku] += 1
    } else {
      this.scannedSkuQty[sku] = 1
    }
  }

  checkout() {
    let item
    let sum = 0

    for (let sku in this.scannedSkuQty) {
      item = this.inventory.items.find(item => item.sku === sku)  
      
      if (item.specialPrice) {
        const specialPriceQty= Math.trunc(this.scannedSkuQty[item.sku] / item.specialPrice.qty )
        const normalPriceQty= this.scannedSkuQty[item.sku] % item.specialPrice.qty
 
        if (specialPriceQty > 0){
          sum += item.specialPrice.price * specialPriceQty
        }
        sum += item.unitPrice * normalPriceQty
      } else {
        sum += item.unitPrice * this.scannedSkuQty[sku]
      }
    }

    return sum
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
}

export class NForXPrice{
  constructor(qty, price){
    this.qty = qty
    this.price = price
  }

}
