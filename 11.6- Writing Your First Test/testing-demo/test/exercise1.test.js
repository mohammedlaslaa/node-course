const exercise1 = require("../exercise1");

describe("FizzBuzz", () => {
  it("should to throw an exception if input is not a number", () => {
    expect(() => {exercise1.fizzBuzz("Coucou")}).toThrow();
    expect(() => {exercise1.fizzBuzz(null)}).toThrow();
    expect(() => {exercise1.fizzBuzz(undefined)}).toThrow();
    expect(() => {exercise1.fizzBuzz({})}).toThrow()
});

  it("should to return FizzBuzz if input is divisible by 3 and 5", () => {
    const result = exercise1.fizzBuzz(15);
    expect(result).toBe("FizzBuzz");
  });

  it("should to return Fizz if input is only divisible by 3", () => {
    const result = exercise1.fizzBuzz(9);
    expect(result).toBe("Fizz");
  });

  it("should to return Buzz if input is only divisible by 5", () => {
    const result = exercise1.fizzBuzz(10);
    expect(result).toBe("Buzz");
  });

  it("should to return input if it is not divisible by 3 or 5", () => {
    const result = exercise1.fizzBuzz(8);
    expect(result).toBe(8);
  });

  //   it('should to throw', ()=>{})

  //   it('should to throw', ()=>{})

  //   it('should to throw', ()=>{})

  //   it('should to throw', ()=>{})

  //   it('should to throw', ()=>{})

  //   it('should to throw', ()=>{})
});
