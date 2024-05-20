function substractor(word: string) {
  const data = word.trim().toLowerCase();
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

  return code;
}
