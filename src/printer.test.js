import { Item } from "./supermarket";

class Printer {
  print(item, weight) {
    return new Label(weight ? item.unitPrice * weight : item.unitPrice, weight);
  }
}

class Label {
  constructor(price, weight) {
    this.price = price;
    this.weight = weight;
  }
}
describe("Printer", () => {
  let apple;
  let tomato;
  let daikon;
  let printer;

  beforeEach(() => {
    printer = new Printer();
    apple = new Item("sku1", "apple", 0.5);
    tomato = new Item("sku2", "tomato", 3.3);
    daikon = new Item("sku3", "daikon", 1);
  });

  it("print apple", () => {
    let label = printer.print(apple, 0.1);

    expect(label.price).toBe(0.05);
    expect(label.weight).toBe(0.1);
  });

  it("print another tomato", () => {
    let label = printer.print(tomato, 0.2);

    expect(label.price).toBe(0.66);
    expect(label.weight).toBe(0.2);
  });

  it("print daikon", () => {
    let label = printer.print(daikon);

    expect(label.price).toBe(daikon.unitPrice);
    expect(label.weight).toBe(undefined);
  });
});
