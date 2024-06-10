import currency from "currency.js";

export default function formatCurrency(
  amount: number,
  currencyCode: string = "USD",
): string {
  let options = {};

  switch (currencyCode) {
    case "CZK":
      options = { symbol: "CZK ", decimal: ",", separator: " ", precision: 0 };
      break;
    case "EUR":
      options = { symbol: "€ ", decimal: ",", separator: ".", precision: 2 };
      break;
    case "USD":
      options = { symbol: "$ ", decimal: ".", separator: ",", precision: 2 };
      break;
    default:
      options = { symbol: " ", decimal: ",", separator: " ", precision: 2 };
      break;
  }

  return currency(amount, options).format();
}
