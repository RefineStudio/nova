## 📥 Installation

```bash
npm i nova
# or
pnpm i nova
# or
yarn add nova
```

Importing:

```ts
import Nova from "nova";
```

Or via CDN:

```html
<script src="https://unpkg.com/nova@1.0.0/dist/nova.min.js"></script>
```

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
<Price value={0.00004567} /> // 0.0000<span class="text-xs font-bold">4</span>567
<Price value={123.456} showSymbol={false} /> // 123.46
```

---

## 📚 usdFormatter API

Utility for formatting monetary values in USD, with two styles:

### 🔹 `usdFormatter.fullValue.format`

Formats the value as a complete number with a currency symbol.

| Parameter               | Type                       | Default | Description                                          |                        |
| ----------------------- | -------------------------- | ------- | ---------------------------------------------------- | ---------------------- |
| `value`                 | `string                    | number` | `0`                                                  | Value to be formatted. |
| `options`               | `Intl.NumberFormatOptions` | —       | Additional options from the `Intl.NumberFormat` API. |                        |
| `minimumFractionDigits` | `number`                   | `2`     | Minimum decimal places to show.                      |                        |

**Example:**

```ts
usdFormatter.fullValue.format(1234.567);
// "$1,234.57"
```

---

### 🔹 `usdFormatter.compact.format`

Formats the value in a compact style (e.g., thousand → K, million → M).

| Parameter | Type                       | Default | Description                |                        |
| --------- | -------------------------- | ------- | -------------------------- | ---------------------- |
| `value`   | `string                    | number` | `0`                        | Value to be formatted. |
| `options` | `Intl.NumberFormatOptions` | —       | Customization with `Intl`. |                        |

**Example:**

```ts
usdFormatter.compact.format(1500);
// "$1.5K"
```
