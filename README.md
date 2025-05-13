## 📥 Installation

```bash
npm i nova
# or
pnpm i nova
# or
yarn add nova
```

This package requires Tailwind CSS as a peer dependency. If you don't have Tailwind CSS installed yet:

```bash
npm i tailwindcss
npx tailwindcss init
```

Then configure your Tailwind CSS in your project:

```js
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/nova/**/*.{js,jsx,ts,tsx}", // Add this line to include Nova components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Importing:

```ts
import { Price, usdFormatter } from "nova";
```

### 🫘 Bundle Size

This package is optimized for tree-shaking:

```js
// This only imports the Price component
import { Price } from "nova";

// This only imports the usdFormatter utility
import { usdFormatter } from "nova";
```

The entire package is very lightweight (~4KB) and has minimal dependencies.

---

## 💵 Price Component

Renders a numeric value formatted as USD, with special logic for very small values (e.g., `0.00000123`).

| Prop         | Type      | Default | Description                                     |
| ------------ | --------- | ------- | ----------------------------------------------- |
| `value`      | `number`  | —       | Numeric value to be formatted.                  |
| `showSymbol` | `boolean` | `true`  | Whether or not to display the `$` symbol.       |
| `decimal`    | `number`  | `2`     | Minimum number of decimal places in formatting. |

**Examples:**

```tsx
<Price value={1500} /> // $1,500.00
<Price value={0.000004567} /> // $0.0⁵4567
<Price value={0.00004567} showSymbol={false} /> // 0.00004567
<Price value={123.456} showSymbol={false} /> // 123.46
```

---

## 📚 usdFormatter API

Utility for formatting monetary values in USD, with two styles:

### 🔹 `usdFormatter.fullValue.format`

Formats the value as a complete number with a currency symbol.

| Parameter               | Type                       | Default  | Description                                          |                        |
| ----------------------- | -------------------------- | -------- | ---------------------------------------------------- | ---------------------- |
| `value`                 | `string`                   | `number` | `0`                                                  | Value to be formatted. |
| `options`               | `Intl.NumberFormatOptions` | —        | Additional options from the `Intl.NumberFormat` API. |                        |
| `minimumFractionDigits` | `number`                   | `2`      | Minimum decimal places to show.                      |                        |

**Example:**

```ts
usdFormatter.fullValue.format(1234.567);
// "$1,234.57"
```

---

### 🔹 `usdFormatter.compact.format`

Formats the value in a compact style (e.g., thousand → K, million → M).

| Parameter | Type                       | Default  | Description                |                        |
| --------- | -------------------------- | -------- | -------------------------- | ---------------------- |
| `value`   | `string`                   | `number` | `0`                        | Value to be formatted. |
| `options` | `Intl.NumberFormatOptions` | —        | Customization with `Intl`. |                        |

**Example:**

```ts
usdFormatter.compact.format(1500);
// "$1.5K"
```
