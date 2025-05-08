const compactFormat = new Intl.NumberFormat("en-US", {
  notation: "compact",
  style: "currency",
  currency: "USD",
  roundingMode: "floor",
  maximumFractionDigits: 1,
  trailingZeroDisplay: "stripIfInteger",
});

const fullValueFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  roundingMode: "floor",
  trailingZeroDisplay: "stripIfInteger",
});

export const usdFormatter = {
  compact: {
    ...compactFormat,
    format: (
      value: string | number = 0,
      options?: Intl.NumberFormatOptions
    ) => {
      try {
        const compact = new Intl.NumberFormat("en-US", {
          notation: "compact",
          style: "currency",
          currency: "USD",
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
        const full = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
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
