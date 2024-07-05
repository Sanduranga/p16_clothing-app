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

  return code as string;
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
