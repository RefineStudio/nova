import React from "react";
import { currencyFormatter } from "../utils/currencyFormatter";

export function Price({
  value,
  showSymbol = true,
  decimal = 2,
  options = {},
  compact = false,
  currency = "USD",
}: {
  value: number | string;
  showSymbol?: boolean;
  decimal?: number;
  options?: Intl.NumberFormatOptions;
  compact?: boolean;
  currency?: string;
}) {
  const formattingOptions = { ...options, currency };
  const num = Number(value);
  if (isNaN(num)) return <span>Invalid</span>;

  if (compact && Math.abs(num) >= 1_000_000) {
    const formatted = currencyFormatter.compact.format(num, formattingOptions);
    return (
      <span>
        {showSymbol ? formatted : formatted.replace(/[^\d.,\s-]/g, "")}
      </span>
    );
  }

  if (num >= 0.1) {
    const formatted = currencyFormatter.fullValue.format(
      num,
      formattingOptions,
      decimal
    );
    return (
      <span>
        {showSymbol ? formatted : formatted.replace(/[^\d.,\s-]/g, "")}
      </span>
    );
  }

  const numStr = num.toString();
  const [, decimalPart = ""] = numStr.split(".");
  const match = decimalPart.match(/^(0*)(\d+)/);

  if (!match) {
    const formatted = currencyFormatter.fullValue.format(
      num,
      formattingOptions,
      decimal
    );
    return (
      <span>
        {showSymbol ? formatted : formatted.replace(/[^\d.,\s-]/g, "")}
      </span>
    );
  }

  const [, zeros, digits] = match;
  const z = zeros.length;
  const significant = digits.slice(0, 4);

  if (z <= 4) {
    const decimalBigNumber = z + significant.length;
    const sign = num < 0 ? -1 : 1;
    const bigNumber = sign * Number(`0.${"0".repeat(z)}${significant}`);
    const formatted = currencyFormatter.fullValue.format(
      bigNumber,
      formattingOptions,
      decimalBigNumber
    );
    return (
      <span>
        {showSymbol ? formatted : formatted.replace(/[^\d.,\s-]/g, "")}
      </span>
    );
  }

  // Get the currency symbol
  const getCurrencySymbol = () => {
    return new Intl.NumberFormat(undefined, { style: "currency", currency })
      .format(0)
      .replace(/[0-9.,]/g, "");
  };

  return (
    <span>
      {showSymbol ? getCurrencySymbol() : ""}
      0.0
      <span className="align-bottom text-xs font-bold">{z}</span>
      {significant}
    </span>
  );
}