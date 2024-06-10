export default function formatCurrency(
  amount: number,
  currency: string,
): string {
  const isInteger = Number.isInteger(amount);

  const options: Intl.NumberFormatOptions = {
    style: "currency",
    currency: currency,
    minimumFractionDigits: isInteger ? 0 : 2,
    maximumFractionDigits: isInteger ? 0 : 2,
  };

  return new Intl.NumberFormat("en-US", options).format(amount);
}
