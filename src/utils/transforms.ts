export function formatAmount(amount, options = { maximumFractionDigits: 2 }) {
  if (amount == null || isNaN(amount)) {
    return '-';
  }

  return amount.toLocaleString('en', {
    minimumFractionDigits: 2,
    maximumFractionDigits: options.maximumFractionDigits
  });
}