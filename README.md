## Installation

```bash
npm i @refinestudio/nova
# or
pnpm i @refinestudio/nova
# or
yarn add @refinestudio/nova
```

This package requires Tailwind CSS as a peer dependency. If you don't have Tailwind CSS installed yet:

```bash
npm i tailwindcss
npx tailwindcss init
```

Importing:

```ts
import { Price, currencyFormatter, dateFormatter } from "nova";
```

### Bundle Size

This package is optimized for tree-shaking:

```js
// This only imports the Price component
import { Price } from "nova";

// This only imports the currencyFormatter utility
import { currencyFormatter } from "nova";

// This only imports the dateFormatter utility
import { dateFormatter } from "nova";
```

The entire package is very lightweight (~4KB) and has minimal dependencies.

---

## Price Component

Renders a numeric value formatted as currency, with special logic for very small values (e.g., `0.00000123`).

| Prop         | Type                       | Default | Description                                      |
| ------------ | -------------------------- | ------- | ------------------------------------------------ |
| `value`      | `number \| string`         | —       | Numeric value to be formatted.                   |
| `showSymbol` | `boolean`                  | `true`  | Whether or not to display the currency symbol.   |
| `decimal`    | `number`                   | `2`     | Minimum number of decimal places in formatting.  |
| `options`    | `Intl.NumberFormatOptions` | `{}`    | Additional options for number formatting.        |
| `compact`    | `boolean`                  | `false` | Use compact notation for values over 1 million.  |
| `currency`   | `string`                   | `"USD"` | Currency code (USD, EUR, etc).                   |
| `token`      | `string`                   | —       | Token symbol for displaying tokens (e.g., "BTC"). |

**Examples:**

```tsx
<Price value={1500} /> // $1,500.00
<Price value={1500} currency="EUR" /> // €1.500,00
<Price value={0.000004567} /> // $0.0⁵4567
<Price value={0.00004567} showSymbol={false} /> // 0.00004567
<Price value={123.456} showSymbol={false} /> // 123.46
<Price value={1500000} compact={true} /> // $1.5M
<Price value={2.5} token="BTC" /> // 2.50 BTC
```

| Params            | Value         | Formatted Price  |
|-------------------|---------------|-------------------|
| DEFAULT           | 15320.2       | $15,320.20        |
| DEFAULT           | 1532000.2     | $1,532,000        |
| DEFAULT           | 0.00004567    | $0.00004567       |
| DEFAULT           | 0.000004567   | $0.0<sub>5</sub>4567|
| SHOWSYMBOL=false  | 0.006         | 0.006             |
| CURRENCY=EUR      | 15320.2       | €15.320,20        |
| COMPACT           | 1532000.2     | $1.53M            |
| COMPACT           | 1532000000.2  | $1.53B            |


---

## currencyFormatter API

Utility for formatting monetary values in various currencies, with two styles:

### `currencyFormatter.fullValue.format`

Formats the value as a complete number with a currency symbol.

| Parameter               | Type                       | Default  | Description                                          |
| ----------------------- | -------------------------- | -------- | ---------------------------------------------------- |
| `value`                 | `string \| number`         | `0`      | Value to be formatted.                               |
| `options`               | `Intl.NumberFormatOptions` | —        | Additional options from the `Intl.NumberFormat` API. |
| `minimumFractionDigits` | `number`                   | `2`      | Minimum decimal places to show.                      |

**Example:**

```ts
currencyFormatter.fullValue.format(1234.567);
// "$1,234.57"

currencyFormatter.fullValue.format(1234.567, { currency: "EUR" });
// "€1.234,57"
```

---

### `currencyFormatter.compact.format`

Formats the value in a compact style (e.g., thousand → K, million → M).

| Parameter | Type                       | Default | Description                                         |
| --------- | -------------------------- | ------- | --------------------------------------------------- |
| `value`   | `string \| number`         | `0`     | Value to be formatted.                              |
| `options` | `Intl.NumberFormatOptions` | —       | Additional options from the `Intl.NumberFormat` API.|

**Example:**

```ts
currencyFormatter.compact.format(1500000);
// "$1.5M"

currencyFormatter.compact.format(1500000, { currency: "EUR" });
// "€1,5 Mio."
```

### Supported Currencies

By default, the formatter handles two currencies with appropriate regional formatting:

| Currency | Format   | Example    |
| -------- | -------- | ---------- |
| USD      | en-US    | $1,234.56  |
| EUR      | de-DE    | 1.234,56 € |

For other currencies, formatting will default to en-US style with the appropriate currency symbol.

---

## dateFormatter API

Utility for formatting dates into a consistent, readable format with automatic time detection.

| Parameter | Type               | Default | Description                           |
| --------- | ------------------ | ------- | ------------------------------------- |
| `date`    | `Date \| string`   | —       | Date object or date string to format. |

The formatter automatically detects whether the input contains time information and formats accordingly:

- **Date only**: Returns format like "Jan 15, 2025"
- **Date with time**: Returns format like "Jan 15, 2025 at 3:30PM"

**Examples:**

```ts
dateFormatter("2025-01-15");
// "Jan 15, 2025"

dateFormatter("2025-01-15T15:30:00");
// "Jan 15, 2025 at 3:30PM"

dateFormatter(new Date("2025-01-15T09:00:00"));
// "Jan 15, 2025 at 9:00AM"

dateFormatter(new Date("2025-01-15"));
// "Jan 15, 2025"
```