## 📦 Price Formatter Utilities

Nova fornece utilitários para formatação de valores monetários em dólares americanos, com suporte tanto para valores inteiros quanto fracionários pequenos, além de um componente React pronto para uso.

---

## 📥 Installation

```bash
npm i nova
# ou
pnpm i nova
# ou
yarn add nova
```

Importando:

```ts
import Nova from "nova";
```

Ou via CDN:

```html
<script src="https://unpkg.com/nova@1.0.0/dist/nova.min.js"></script>
```

---

## 💵 Price Component

Renderiza um valor numérico formatado como USD, com lógica especial para valores muito pequenos (ex: `0.00000123`).

| Prop         | Tipo      | Padrão | Descrição                                      |
| ------------ | --------- | ------ | ---------------------------------------------- |
| `value`      | `number`  | —      | Valor numérico a ser formatado.                |
| `showSymbol` | `boolean` | `true` | Exibe ou não o símbolo `$`.                    |
| `decimal`    | `number`  | `2`    | Número mínimo de casas decimais na formatação. |

**Exemplos:**

```tsx
<Price value={1500} /> // $1,500.00
<Price value={0.00004567} /> // 0.0000<span class="text-xs font-bold">4</span>567
<Price value={123.456} showSymbol={false} /> // 123.46
```

---

## 📚 usdFormatter API

Utilitário para formatação de valores monetários em USD, com dois estilos:

### 🔹 `usdFormatter.fullValue.format`

Formata o valor como um número completo com símbolo monetário.

| Parâmetro               | Tipo                       | Padrão  | Descrição                                     |                        |
| ----------------------- | -------------------------- | ------- | --------------------------------------------- | ---------------------- |
| `value`                 | `string`                   | number` | `0`                                           | Valor a ser formatado. |
| `options`               | `Intl.NumberFormatOptions` | —       | Opções adicionais da API `Intl.NumberFormat`. |                        |
| `minimumFractionDigits` | `number`                   | `2`     | Mínimo de casas decimais a mostrar.           |                        |

**Exemplo:**

```ts
usdFormatter.fullValue.format(1234.567);
// "$1,234.57"
```

---

### 🔹 `usdFormatter.compact.format`

Formata o valor em estilo compacto (ex: mil → K, milhão → M).

| Parâmetro | Tipo                       | Padrão  | Descrição                  |                        |
| --------- | -------------------------- | ------- | -------------------------- | ---------------------- |
| `value`   | `string`                   | number` | `0`                        | Valor a ser formatado. |
| `options` | `Intl.NumberFormatOptions` | —       | Personalização com `Intl`. |                        |

**Exemplo:**

```ts
usdFormatter.compact.format(1500);
// "$1.5K"
```
