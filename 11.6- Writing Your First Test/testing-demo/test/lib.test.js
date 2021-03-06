const lib = require("../lib");
const db = require("../db");
const mail = require("../mail");

describe("absolute", () => {
  it("should return positive", () => {
    const result = lib.absolute(1);
    expect(result).toBe(1);
  });

  it("should return negative", () => {
    const result = lib.absolute(-1);
    expect(result).toBe(1);
  });

  it("should return 0", () => {
    const result = lib.absolute(0);
    expect(result).toBe(0);
  });
});

describe("greet", () => {
  it("should return the greeting message", () => {
    const result = lib.greet("Mohammed");
    expect(result).toMatch(/Mohammed/);
    // or without regexp expect(result).toContain("Mohammed");
  });
});

describe("getCurrencies", () => {
  it("should return supported currencies", () => {
    const result = lib.getCurrencies();

    // Too general
    expect(result).toBeDefined();
    expect(result).not.toBeNull();

    // Too specific //Le problème est que nous testons l'emplacement exact de ces éléments dans le tableau.
    expect(result[0]).toBe("USD");
    expect(result[1]).toBe("AUD");
    expect(result[2]).toBe("EUR");
    expect(result.length).toBe(3);

    //Proper way
    expect(result).toContain("USD");
    expect(result).toContain("AUD");
    expect(result).toContain("EUR");

    // Ideal way

    expect(result).toEqual(expect.arrayContaining(["EUR", "USD", "AUD"]));
  });
});
describe("getProduct", () => {
  it("should return the product with the given ID", () => {
    const result = lib.getProduct(1);
    //   expect(result).toEqual({ id: 1, price: 10 }); // with tobe or toequal in object the test is too specific ! it's better to test toMatchObject or toHaveProperties
    expect(result).toMatchObject({ id: 1, price: 10 }); // Test if the object Contain those properties no matter if not all of this properties are not specified

    expect(result).toHaveProperty("id", 1);
  });
});

describe("registerUser", () => {
  it("should throw if username is falsy", () => {
    // Falsy : Null or Undefined, Nan, '', 0, false
    const args = [null, undefined, NaN, "", 0, false];
    args.forEach(a => {
      expect(() => {
        lib.registerUser(a);
      }).toThrow();
    });
  });

  it("should return a user object if valid username is passed", () => {
    const result = lib.registerUser("Mohammed");

    expect(result).toMatchObject({ username: "Mohammed" });
    expect(result.id).toBeGreaterThan(0);
  });
});

describe("applyDiscount", () => {
  it("should apply discount if customer has more than 10 points", () => {
    db.getCustomerSync = function(customerId) {
      console.log("Fake reading customer...");
      return { id: customerId, points: 20 };
    };

    const order = { curstomerId: 1, totalPrice: 10 };

    lib.applyDiscount(order);

    expect(order.totalPrice).toBe(9);
  });
});

describe("notifyCustomer", () => {
  it("should send an email to the customer", () => {
    // Better way to create mock function with jest

    // demo of mockfunction
    // const mockFunction  = jest.fn();
    // // mockFunction.mockReturnValue(1);
    // // mockFunction.mockResolvedValue(1);
    // mockFunction.mockRejectedValue(new Error('...'));
    // const result = await mockFunction();

    // ancienne version
    // db.getCustomerSync = function(customerId) {
    //   return { email: "a" };
    // };

    // The lines 110-113 are the same of the 116
    db.getCustomerSync = jest.fn().mockReturnValue({ email: "a" });

    // let mailSent = false;
    // mail.send = function(email, message) {
    //   return mailSent = true;
    // };

    mail.send = jest.fn();

    lib.notifyCustomer({ curstomerId: 1 });

    expect(mail.send).toHaveBeenCalled();
    expect(mail.send.mock.calls[0][0]).toBe('a')
    expect(mail.send.mock.calls[0][1]).toMatch(/order/)
  });
});
