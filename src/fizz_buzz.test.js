import say from './fizz_buzz'

class Cart{
  constructor(inventory){
    this.inventory = inventory
    this.scannedSkus = []
    this.hash = {}
  }
   
  scan(sku){
    this.scannedSkus.push(sku)
    if(this.hash[sku]) {
      this.hash[sku] += 1
    } else {
      this.hash[sku] = 1
    }
  }

  checkout() {
    if (this.inventory.items[0].specialPrice && this.hash[this.inventory.items[0].sku] 
      === this.inventory.items[0].specialPrice.qty)

      return this.inventory.items[0].specialPrice.price

    let sum = 0
    this.scannedSkus.forEach(sku => { 
      const item = this.inventory.items.find(item => item.sku === sku)
      sum += item.unitPrice
    })
    return sum  
  }
}

class Item{
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

class Inventory{
  constructor() {
    this.items = []
   }
   

  add(item){
    this.items.push(item)
  }
}

class NForXPrice{
  constructor(qty, price){
    this.qty = qty
    this.price = price
  }

}



describe("Fizz Buzz", () => {
  let inventory
  let cart
  let apple
  let orange

  beforeEach(() => {  
    inventory = new Inventory()
    cart = new Cart(inventory)
    apple = new Item('1', 'apple', 0.5)
    orange = new Item('2', 'orange', 0.3)
  })

  it('scan one product 1 time', () => {
    inventory.add(apple)

    cart.scan(apple.sku)
    
    expect(cart.checkout()).toBe(0.50)
  })

  it('scan 1 product 3 times', () => {
    inventory.add(apple)

    cart.scan(apple.sku)
    cart.scan(apple.sku)
    cart.scan(apple.sku)

    expect(cart.checkout()).toBe(1.5)
  })

  it('2 products scan 2', () => {
    inventory.add(apple)
    inventory.add(orange)
    
    cart.scan(apple.sku)
    cart.scan(orange.sku)

    expect(cart.checkout()).toBe(0.8)
  })

  it('2 products scan 3', () => {
    inventory.add(apple)
    inventory.add(orange)
    
    cart.scan(apple.sku)
    cart.scan(orange.sku)
    cart.scan(orange.sku)

    expect(cart.checkout()).toBe(1.1)
  })

  it('special price', () => {
    apple.setSpecialPrice(new NForXPrice(5, 2.0))
    inventory.add(apple)

    cart.scan(apple.sku)
    cart.scan(apple.sku)
    cart.scan(apple.sku)
    cart.scan(apple.sku)
    cart.scan(apple.sku)

    expect(cart.checkout()).toBe(2.0)
  })

  it('special price', () => {
    apple.setSpecialPrice(new NForXPrice(5, 1.6))
    orange.setSpecialPrice(new NForXPrice(5, 1.0))

    inventory.add(orange)
    inventory.add(apple)

    cart.scan(apple.sku)
    cart.scan(apple.sku)
    cart.scan(apple.sku)
    cart.scan(apple.sku)
    cart.scan(apple.sku)

    expect(cart.checkout()).toBe(1.6)
  })

})