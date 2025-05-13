import React from "react";
import { usdFormatter } from "../utils/usdFormatter";

export function Price({
  value,
  showSymbol = true,
  decimal = 2,
  options = {},
  compact = false,
}: {
  value: number | string;
  showSymbol?: boolean;
  decimal?: number;
  options?: Intl.NumberFormatOptions;
  compact?: boolean;
}) {
  const num = Number(value);
  if (isNaN(num)) return <span>Invalid</span>;

  if (compact && Math.abs(num) >= 1_000_000) {
    const formatted = usdFormatter.compact.format(num, options);
    return <span>{showSymbol ? formatted : formatted.replace("$", "")}</span>;
  }

  if (num >= 0.1) {
    const formatted = usdFormatter.fullValue.format(num, options, decimal);
    return <span>{showSymbol ? formatted : formatted.replace("$", "")}</span>;
  }

  const numStr = num.toString();
  const [, decimalPart = ""] = numStr.split(".");
  const match = decimalPart.match(/^(0*)(\d+)/);

  if (!match) {
    const formatted = usdFormatter.fullValue.format(num, options, decimal);
    return <span>{showSymbol ? formatted : formatted.replace("$", "")}</span>;
  }

  const [, zeros, digits] = match;
  const z = zeros.length;
  const significant = digits.slice(0, 4);

  if (z <= 4) {
    const decimalBigNumber = z + significant.length;
    const sign = num < 0 ? -1 : 1;
    const bigNumber = sign * Number(`0.${"0".repeat(z)}${significant}`);
    const formatted = usdFormatter.fullValue.format(
      bigNumber,
      options,
      decimalBigNumber
    );
    return <span>{showSymbol ? formatted : formatted.replace("$", "")}</span>;
  }

  return (
    <span>
      {showSymbol ? "$" : ""}
      0.0
      <span className="align-bottom text-xs font-bold">{z}</span>
      {significant}
    </span>
  );
}
