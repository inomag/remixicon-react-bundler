# remixicon-react-bundler

[![npm version](https://img.shields.io/npm/v/remixicon-react-bundler.svg)](https://www.npmjs.com/package/remixicon-react-bundler)

A lightweight, performance-optimized React bundler for [Remix Icon](https://remixicon.com) SVGs. Instead of importing the entire Remix Icon package or relying on CDN, this library dynamically loads only the icons you use, dramatically reducing bundle size and improving offline availability.

## 🚀 Features

- ✅ **All Remix Icon SVGs Included** – Latest SVGs are bundled as string constants.
- 🧠 **Type-Safe Icon Names** – Intellisense support with `IconName` union types for better DX.
- 🎯 **Optimized React Component** – Only load what you need, when you need it.
- 🎨 **Customizable Colors** – Supports an array of colors for multi-path SVGs.
- 📏 **Resizable Icons** – Control icon size via a simple `size` prop.
- 📦 **Minimal Bundle Size** – Uses dynamic imports and manual path rendering.

---

## 📦 Installation

```bash
npm install remixicon-react-bundler
# or
yarn add remixicon-react-bundler
```


## 🧩 Usage

```tsx
import React from "react";
import { SvgIcon } from "remixicon-react-bundler";

function App() {
  return (
    <div>
      <SvgIcon icon="arrow-right-line" size={32} color={["#ff0000"]} />
    </div>
  );
}
```

## 🧪 Props

| Prop  | Type                | Default            | Description                                                                 |
|-------|---------------------|--------------------|-----------------------------------------------------------------------------|
| icon  | `IconName`          | **Required**       | Icon name string with full intellisense support.                           |
| size  | `number \| string`  | `24`               | Size of the icon in pixels (used for both height and width).               |
| color | `string[]`          | `["currentColor"]` | Array of color strings applied to each `<path>` in the SVG.                |


## ⚙️ How It Works
1. Type-Safe Icon Tokens
All available icon names are exported as a TypeScript union type, ensuring type safety and editor support.

2. SVG Constants as Modules
All SVG files are converted to string constants and saved as .ts files in the icons directory during build time.

3. Dynamic Import
The SvgIcon component uses dynamic import() to fetch the string for the given icon on-demand.

4. Path Extraction
SVG strings are parsed using RegExp to extract <path> d attributes manually.

5. Color Injection
Custom colors provided through the color prop are mapped to individual paths in order.


## 🧑‍💻 Contributing
Clone the repo

Run npm install

Build and test your changes

Submit a PR
