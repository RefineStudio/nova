import { usdFormatter } from "../utils/usdFormatter";

export function Price({
  value,
  showSymbol = true,
  decimal = 2,
}: {
  value: number;
  showSymbol?: boolean;
  decimal?: number;
}) {
  const num = Number(value);
  if (isNaN(num)) return <span>Invalid</span>;

  if (num >= 0.1) {
    const formatted = usdFormatter.fullValue.format(
      num,
      { signDisplay: "exceptZero" },
      decimal
    );
    return <span>{showSymbol ? formatted : formatted.replace("$", "")}</span>;
  }

  const numStr = num.toString();
  const [, decimalPart = ""] = numStr.split(".");
  const match = decimalPart.match(/^(0*)(\d+)/);

  if (!match) {
    const formatted = usdFormatter.fullValue.format(
      num,
      { signDisplay: "exceptZero" },
      decimal
    );
    return <span>{showSymbol ? formatted : formatted.replace("$", "")}</span>;
  }

  const [, zeros, digits] = match;
  const z = zeros.length;
  const significant = digits.slice(0, 4);

  if (z <= 4) {
    return (
      <span>
        {showSymbol ? "$" : ""}
        {`0.${"0".repeat(z)}${significant}`}
      </span>
    );
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
