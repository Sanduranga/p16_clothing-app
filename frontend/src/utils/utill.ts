// If we have to solve logic also without JSX element and React hook and that logic is possible to reuse, we can make utility function. Here I am making utility fuction withing purpose reuse in future.

function substractor(word: string) {
  const data = word.replace(/\s/g, "").toLowerCase();

  const secondLetter = data.substring(1, 2);
  const lastTwoLetters = data.substring(data.length - 2);
  return secondLetter + lastTwoLetters;
}

export function CodeGenerater(
  name: string,
  type: string,
  color: string,
  size: string,
  material: string
) {
  const code1 = substractor(name);
  const code2 = substractor(type);
  const code3 = substractor(color);
  const code4 = substractor(size);
  const code5 = substractor(material);
  const code = code1 + code2 + code3 + code4 + code5;

  const charMap = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5,
    f: 6,
    g: 7,
    h: 8,
    i: 9,
    j: 10,
    k: 11,
    l: 12,
    m: 13,
    n: 14,
    o: 15,
    p: 16,
    q: 17,
    r: 18,
    s: 19,
    t: 20,
    u: 21,
    v: 22,
    w: 23,
    x: 24,
    y: 25,
    z: 26,
  } as any;

  let finalCode = 0;

  for (let char of code) {
    // here return a number code according to string code letters
    finalCode = finalCode * 2 + charMap[char];
  }

  return finalCode;
}

export function normalStorePriceCal(
  buyingPrice: number,
  profitPercentage: number
) {
  const total = buyingPrice + (buyingPrice * profitPercentage) / 100;
  return total as number;
}

export function saleStorePriceCal(
  salePercentage: number,
  sellingPrice: number
) {
  const total = sellingPrice - (sellingPrice * salePercentage) / 100;
  return total;
}
