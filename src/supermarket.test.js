import { Cart, Inventory, Item, NForXPrice } from "./supermarket";

/** Upcoming requirements
 * 1. Price by weight e.g. $5.99/kg
 * 2. Buy two, get one free
 * 3. Remove an item from cart
 */

describe("Supermarket", () => {
  let inventory;
  let cart;
  let apple;
  let orange;

  beforeEach(() => {
    inventory = new Inventory();
    cart = new Cart(inventory);
    apple = new Item("1", "apple", 0.5);
    orange = new Item("2", "orange", 0.3);
  });

  it("scan one product 1 time", () => {
    inventory.add(apple);

    cart.scan(apple.sku);

    expect(cart.checkout()).toBe(apple.unitPrice);
  });

  it("scan 1 product 3 times", () => {
    inventory.add(apple);

    cart.scan(apple.sku);
    cart.scan(apple.sku);
    cart.scan(apple.sku);

    expect(cart.checkout()).toBe(apple.unitPrice * 3);
  });

  it("2 products scan 2", () => {
    inventory.add(apple);
    inventory.add(orange);

    cart.scan(apple.sku);
    cart.scan(orange.sku);

    expect(cart.checkout()).toBe(apple.unitPrice + orange.unitPrice);
  });

  it("2 products scan 3", () => {
    inventory.add(apple);
    inventory.add(orange);

    cart.scan(apple.sku);
    cart.scan(orange.sku);
    cart.scan(orange.sku);

    expect(cart.checkout()).toBe(apple.unitPrice + orange.unitPrice * 2);
  });

  it("special price", () => {
    apple.setSpecialPrice(new NForXPrice(5, 2.0));
    inventory.add(apple);

    cart.scan(apple.sku);
    cart.scan(apple.sku);
    cart.scan(apple.sku);
    cart.scan(apple.sku);
    cart.scan(apple.sku);

    expect(cart.checkout()).toBe(2.0);
  });

  it("special price for apple", () => {
    apple.setSpecialPrice(new NForXPrice(5, 1.6));
    orange.setSpecialPrice(new NForXPrice(5, 1.0));

    inventory.add(orange);
    inventory.add(apple);

    cart.scan(apple.sku);
    cart.scan(apple.sku);
    cart.scan(apple.sku);
    cart.scan(apple.sku);
    cart.scan(apple.sku);

    expect(cart.checkout()).toBe(1.6);
  });

  it("special price for orange", () => {
    apple.setSpecialPrice(new NForXPrice(5, 1.6));
    orange.setSpecialPrice(new NForXPrice(5, 1.0));

    inventory.add(orange);
    inventory.add(apple);

    cart.scan(orange.sku);
    cart.scan(orange.sku);
    cart.scan(orange.sku);
    cart.scan(orange.sku);
    cart.scan(orange.sku);

    expect(cart.checkout()).toBe(1.0);
  });

  it("special price for apple and orange", () => {
    apple.setSpecialPrice(new NForXPrice(5, 1.6));
    orange.setSpecialPrice(new NForXPrice(5, 1.0));

    inventory.add(orange);
    inventory.add(apple);

    cart.scan(orange.sku);
    cart.scan(orange.sku);
    cart.scan(orange.sku);
    cart.scan(orange.sku);
    cart.scan(orange.sku);
    cart.scan(apple.sku);
    cart.scan(apple.sku);
    cart.scan(apple.sku);
    cart.scan(apple.sku);
    cart.scan(apple.sku);

    expect(cart.checkout()).toBe(2.6);
  });

  it("special price for 10 apple", () => {
    apple.setSpecialPrice(new NForXPrice(5, 1.6));
    orange.setSpecialPrice(new NForXPrice(5, 1.0));

    inventory.add(orange);
    inventory.add(apple);

    cart.scan(apple.sku);
    cart.scan(apple.sku);
    cart.scan(apple.sku);
    cart.scan(apple.sku);
    cart.scan(apple.sku);
    cart.scan(apple.sku);
    cart.scan(apple.sku);
    cart.scan(apple.sku);
    cart.scan(apple.sku);
    cart.scan(apple.sku);

    expect(cart.checkout()).toBe(3.2);
  });

  it("special price for 12 apple", () => {
    apple.setSpecialPrice(new NForXPrice(5, 1.6));

    inventory.add(apple);

    cart.scan(apple.sku);
    cart.scan(apple.sku);
    cart.scan(apple.sku);
    cart.scan(apple.sku);
    cart.scan(apple.sku);
    cart.scan(apple.sku);
    cart.scan(apple.sku);
    cart.scan(apple.sku);
    cart.scan(apple.sku);
    cart.scan(apple.sku);
    cart.scan(apple.sku);
    cart.scan(apple.sku);

    expect(cart.checkout()).toBe(4.2);
  });

  it("special price for 10 apple plus 1 orange", () => {
    apple.setSpecialPrice(new NForXPrice(5, 1.6));
    orange.setSpecialPrice(new NForXPrice(5, 1.0));

    inventory.add(orange);
    inventory.add(apple);

    cart.scan(apple.sku);
    cart.scan(apple.sku);
    cart.scan(apple.sku);
    cart.scan(apple.sku);
    cart.scan(orange.sku);
    cart.scan(apple.sku);
    cart.scan(apple.sku);
    cart.scan(apple.sku);
    cart.scan(apple.sku);
    cart.scan(apple.sku);
    cart.scan(apple.sku);

    expect(cart.checkout()).toBe(3.5);
  });

  it("special price for 10 apple plus 5 orange", () => {
    apple.setSpecialPrice(new NForXPrice(5, 1.6));
    // orange.setSpecialPrice(new NForXPrice(5, 1.0))

    inventory.add(orange);
    inventory.add(apple);

    cart.scan(apple.sku);
    cart.scan(apple.sku);
    cart.scan(apple.sku);
    cart.scan(apple.sku);
    cart.scan(apple.sku);
    cart.scan(orange.sku);
    cart.scan(orange.sku);
    cart.scan(apple.sku);
    cart.scan(apple.sku);
    cart.scan(apple.sku);
    cart.scan(apple.sku);
    cart.scan(apple.sku);

    expect(cart.checkout()).toBe(3.8);
  });
});
