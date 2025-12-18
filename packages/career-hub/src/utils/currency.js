import { CURRENCY_FORMATTER, INDIA, US } from './constants';

/**
 * @module Utils/currency
 * @category Job Tracker
 */

/**
 * Adds symbol or unit according to the country
 * @param {number|string} amount - Amount to be formatted
 * @param {string} country - One of the countries which has a config
 * @param {bool} showSymbol - Whether or not to show currency symbol
 * @returns A formatted string
 * @example formatSymbolToAmount(20, INDIA) => 20
 * @example formatSymbolToAmount(20, US) => $20
 * @example formatSymbolToAmount(20, INDIA, true) => ₹20
 * @example formatSymbolToAmount(20, US, false) => 20k
 */
export function formatSymbolToAmount(amount, country, showSymbol) {
  const config = CURRENCY_FORMATTER[country];
  const show = showSymbol ?? config.showSymbolDefault;
  const symbol = show ? config?.symbol : '';
  const unit = config?.unit || '';
  return `${symbol}${amount} ${unit}`;
}

/**
 * Formats amount(s) provided according to the respective country's style
 * @param {number} lowAmount - Lower amount of the range
 * @param {number} highAmount - Higher amount of the range.
 * Give null if there is only one amount to be formatted.
 * @param {string} country - Either INDIA or US, default INDIA
 * @param {bool} showSymbol - Whether or not to show currency symbol.
 * Give null if you wish to go with the respective default value for the
 * country as set in config.
 * @example changeAmountStyle(10, 20, INDIA) => "₹10 - ₹20LPA"
 * @example changeAmountStyle(10, 20, US) => "$10k - $20k per annum"
 * @example changeAmountStyle(10, null) => "₹10LPA"
 * @example changeAmountStyle(10, null, US, false) => "10k per annum"
 * @example changeAmountStyle(10, 20, INDIA, false) => "10 - 20LPA"
 */
export function changeAmountStyle(
  lowAmount,
  highAmount = null,
  country = INDIA,
  showSymbol = null
) {
  const config = CURRENCY_FORMATTER[country];
  let prefix = '';
  const suffix = config?.suffix;
  prefix = formatSymbolToAmount(lowAmount, country, showSymbol);
  if (highAmount) {
    prefix += ` - ${formatSymbolToAmount(highAmount, country, showSymbol)}`;
  }
  return prefix + suffix;
}

export function fullAmountValue(amount, country = INDIA) {
  const multiplier = CURRENCY_FORMATTER[country]?.multiplier;
  return multiplier * amount;
}

export const getCurrencyLabel = (prefix, country = INDIA) => {
  switch (country) {
    case INDIA:
      return `${prefix} CTC (in Lakhs) `;
    case US:
      return `${prefix} Annual Salary (in $ '000')`;
    default:
      return prefix;
  }
};

/**
 * Returns the name of the currency, like "USD" or "INR"
 * for respective ctcCurrency constant
 * null or 0 correspond to INDIA
 * 1 or 2 correspond to USA
 * @param {number} ctcCurrency - null, 0, 1, 2
 * @returns {string} - Currency name
 */
export function getCurrencyName(ctcCurrency = 0) {
  if (ctcCurrency === 0 || ctcCurrency === null) {
    return CURRENCY_FORMATTER[INDIA].name;
  }
  return CURRENCY_FORMATTER[US].name;
}
