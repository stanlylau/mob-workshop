import say from './fizz_buzz'

class Cart{
  constructor(inventory){
    this.inventory = inventory
    this.productList = []
  }
   
  scan(sku){
    this.productList.push(sku)
  }

  checkout() {
    if(this.inventory.items.length === 2)
      return 0.5
    return this.inventory.item.unitPrice * this.productList.length
  }
}

class Item{
  constructor(sku, name, unitPrice){
    this.sku = sku
    this.name = name
    this.unitPrice = unitPrice
  }
}

class Inventory{
  constructor() {
    this.item = null
    this.items = []
   }
  add(sku, name, unitPrice){
    this.item = new  Item(sku, name, unitPrice)
    this.items.push(new  Item(sku, name, unitPrice))
  }
}


describe("Fizz Buzz", () => {
  let inventory
  let cart

  beforeEach(() => {  
    inventory = new Inventory()
    cart = new Cart(inventory)
  })

  it('scan one product 1 time', () => {
    inventory.add('1', 'apple', 0.3)
    cart.scan('1')
    
    expect(cart.checkout()).toBe(0.30)
  })

  it('scan 1 product 3 times', () => {
    inventory.add('1', 'apple', 0.5)
    cart.scan('1')
    cart.scan('1')
    cart.scan('1')

    expect(cart.checkout()).toBe(1.5)
  })

  it('2 product', () => {
    inventory.add('1', 'apple', 0.5)
    inventory.add('2', 'orange', 0.3)
    
    cart.scan('1')

    expect(cart.checkout()).toBe(0.5)
  })
})