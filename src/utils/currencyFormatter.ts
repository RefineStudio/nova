const getLocaleForCurrency = (currency: string = "USD") => {
  if (currency === "EUR") return "de-DE";
  return "en-US"; // Default to en-US for USD and any other currency
};

const createCompactFormat = (currency = "USD") => {
  return new Intl.NumberFormat(getLocaleForCurrency(currency), {
    notation: "compact",
    style: "currency",
    currency,
    roundingMode: "floor",
    maximumFractionDigits: 1,
    trailingZeroDisplay: "stripIfInteger",
  });
};

const compactFormat = createCompactFormat();

const createFullValueFormat = (currency = "USD") => {
  return new Intl.NumberFormat(getLocaleForCurrency(currency), {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    roundingMode: "floor",
    trailingZeroDisplay: "stripIfInteger",
  });
};

const fullValueFormat = createFullValueFormat();

export const currencyFormatter = {
  compact: {
    ...compactFormat,
    format: (
      value: string | number = 0,
      options?: Intl.NumberFormatOptions
    ) => {
      try {
        const currency = options?.currency || "USD";
        const compact = new Intl.NumberFormat(getLocaleForCurrency(currency), {
          notation: "compact",
          style: "currency",
          currency,
          roundingMode: "floor",
          maximumFractionDigits: 1,
          trailingZeroDisplay: "stripIfInteger",
          ...options,
        });
        return compact.format(isNaN(Number(value)) ? 0 : Number(value));
      } catch {
        return "$0";
      }
    },
  },
  fullValue: {
    ...fullValueFormat,
    format: (
      value: string | number = 0,
      options?: Intl.NumberFormatOptions,
      minimumFractionDigits = 2
    ) => {
      try {
        const currency = options?.currency || "USD";
        const full = new Intl.NumberFormat(getLocaleForCurrency(currency), {
          style: "currency",
          currency,
          minimumFractionDigits,
          ...options,
        });
        return full.format(isNaN(Number(value)) ? 0 : Number(value));
      } catch {
        return "$0.00";
      }
    },
  },
};