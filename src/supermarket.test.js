import { Cart, Inventory, Item, NForXPrice } from "./supermarket";

/** Upcoming requirements
 * 1. [done] Price by weight e.g. $5.99/kg
 * 2. [done] Print product item signs for items - price & weight
 * 3. [done] Print product items signs for items - unit price e.g. $1 for 1 daikon
 * 4. Introduce display and command line input
 * 5. Buy two, get one free
 * 6. Remove an item from cart
 */

describe("Supermarket", () => {
  let inventory;
  let cart;
  let apple;
  let orange;

  beforeEach(() => {
    inventory = new Inventory();
    cart = new Cart(inventory);
    apple = new Item("sku1", "apple", 0.5);
    orange = new Item("sku2", "orange", 0.3);

    inventory.add(apple);
    inventory.add(orange);
  });

  it("scan 1 product 3 times", () => {
    scan(apple, times(3));

    expect(cart.checkout()).toBe(apple.unitPrice * 3);
  });

  it("scan 2 different products", () => {
    scan(apple, times(1));
    scan(orange, times(2));

    expect(cart.checkout()).toBe(apple.unitPrice + orange.unitPrice * 2);
  });

  it("scan special price for 1 bundle of apple and orange each", () => {
    apple.setSpecialPrice(new NForXPrice(5, 1.6));
    orange.setSpecialPrice(new NForXPrice(5, 1.0));

    scan(orange, times(5));
    scan(apple, times(5));

    expect(cart.checkout()).toBe(2.6);
  });

  it("scan special price for bundles of apples plus 2 oranges", () => {
    apple.setSpecialPrice(new NForXPrice(5, 1.6));

    scan(apple, times(5));
    scan(orange, times(2));
    scan(apple, times(7));

    expect(cart.checkout()).toBe(4.8);
  });

  it("scan with weight", () => {
    let durian;
    durian = new Item("sku3", "durian", 6); //price for 1 kg
    inventory.add(durian);
    cart.scan(durian.sku, 0.3);
    cart.scan(durian.sku, 1);

    expect(cart.checkout()).toBe(7.8);
  });

  function scan(item, quantity) {
    for (let i = 0; i < quantity; i++) {
      cart.scan(item.sku);
    }
  }

  function times(number) {
    return number;
  }
});
