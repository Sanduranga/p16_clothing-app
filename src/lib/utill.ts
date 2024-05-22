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
  console.log(code1);

  return code;
}

export function SalePriceCal(buyingPrice: number, profitPercentage: number) {
  const total = buyingPrice - (buyingPrice * profitPercentage) / 100;
  return total;
}

// export function SalePriceCal(
//   sellingPrice: number,
//   buyingPrice: number,
//   salePercentage: number,
//   profitPercentage: number,
//   sellingType: string,
//   itemIs: string
// ) {
//   if (itemIs === "ourProduct" && sellingType === "sale") {
//     console.log("1");

//     return sellingPrice - (sellingPrice * salePercentage) / 100;
//   }

//   if (itemIs === "anotherSellerProduct") {
//     console.log("2");
//     return buyingPrice - (buyingPrice * profitPercentage) / 100;
//   }

//   if (itemIs === "anotherSellerProduct" && sellingType === "sale") {
//     console.log("3");
//     return buyingPrice - (buyingPrice * salePercentage) / 100;
//   }
// }
