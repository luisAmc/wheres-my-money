export function formatAmount(amount, options = { maximumFractionDigits: 2 }) {
  if (amount == null || isNaN(amount)) {
    return '-';
  }

  return amount.toLocaleString('en', {
    minimumFractionDigits: 2,
    maximumFractionDigits: options.maximumFractionDigits
  });
}

export function formatDate(givenDate) {
  if (givenDate == null || isNaN(Date.parse(givenDate))) {
    return '-';
  }

  const date = new Date(givenDate);

  const options: Intl.DateTimeFormatOptions = {
    dateStyle: 'short'
  };

  const intlDate = new Intl.DateTimeFormat('es-HN', options).format(date);

  return intlDate;
}
