import React from "react";
import { currencyFormatter } from "../utils/currencyFormatter";

export function Price({
  value,
  showSymbol = true,
  decimal = 2,
  options = {},
  compact = false,
  currency = "USD",
  token,
}: {
  value: number | string;
  showSymbol?: boolean;
  decimal?: number;
  options?: Intl.NumberFormatOptions;
  compact?: boolean;
  currency?: string;
  token?: string;
}) {
  const isToken = Boolean(token);
  const effectiveCurrency = isToken ? "USD" : currency;
  const formattingOptions = { ...options, currency: effectiveCurrency };

  const num = Number(value);
  if (isNaN(num)) return <span>Invalid</span>;

  const formatValue = (formatted: string) => {
    const clean = formatted.replace(/[^\d.,\s-]/g, "");
    if (isToken) {
      return <span>{`${clean} ${token}`}</span>;
    }
    return <span>{showSymbol ? formatted : clean}</span>;
  };

  if (compact && Math.abs(num) >= 1_000_000) {
    const formatted = currencyFormatter.compact.format(num, formattingOptions);
    return formatValue(formatted);
  }

  if (num >= 0.1) {
    const formatted = currencyFormatter.fullValue.format(
      num,
      formattingOptions,
      decimal
    );
    return formatValue(formatted);
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
    return formatValue(formatted);
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
    return formatValue(formatted);
  }

  const getCurrencySymbol = () => {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: effectiveCurrency,
    })
      .format(0)
      .replace(/[0-9.,]/g, "");
  };

  return (
    <span>
      {isToken ? "" : showSymbol ? getCurrencySymbol() : ""}
      0.0
      <span className="align-bottom text-xs font-bold">{z}</span>
      {significant}
      {isToken ? ` ${token}` : ""}
    </span>
  );
}
