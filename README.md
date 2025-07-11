# ContinuedFraction.js

[![NPM Package](https://img.shields.io/npm/v/continuedfraction.js.svg?style=flat)](https://npmjs.org/package/continuedfraction.js "View this project on npm")
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)


A lightweight JavaScript library sitting on the shoulders of [Fraction.js](https://github.com/rawify/Fraction.js) for generating and evaluating **standard** and **generalized** continued fractions. It is built with generator-based sequences and convergent recurrences for fast execution.

## Features

- Generate the simple continued‑fraction expansion of √N
- Convert any real number or rational to its continued‑fraction
- Infinite generators for classic constants: φ (golden ratio), e, π, 4/π
- Evaluate (simple or generalized) continued fractions to a `Fraction`

## Example

```js
const frac = ContinuedFraction.eval(
  ContinuedFraction.fromFraction(3021, 203),
  10 // Max Steps
);
console.log(frac.toString()); // → "3021/203"
```

## Installation

You can install `ContinuedFraction.js` via npm:

```bash
npm install continuedfraction.js
```

Or with yarn:

```bash
yarn add continuedfraction.js
```

Alternatively, download or clone the repository:

```bash
git clone https://github.com/rawify/ContinuedFraction.js
```

## Usage

Include the `continuedfraction.min.js` file in your project:

```html
<script src="path/to/continuedfraction.min.js"></script>
<script>
  var x = ContinuedFraction.sqrt(2);
</script>
```

Or in a Node.js project:

```javascript
const ContinuedFraction = require('continuedfraction.js');
```

or

```javascript
import ContinuedFraction from 'continuedfraction.js';
```

## ContinuedFraction API

Import the static utility class and use its generators and evaluator:

```javascript
// 1) Continued‑fraction terms of √23
const sqrtGen = ContinuedFraction.sqrt(23);
console.log(sqrtGen.next().value); // 4
console.log(sqrtGen.next().value); // 1, 3, 1, 8, …
````

```javascript
// 2) Continued‑fraction of a decimal
let cnt = 0;
for (let piCf of ContinuedFraction.fromNumber(Math.PI)) {
  console.log(piCf);
  if (cnt++ >= 10) break;
}
````

```javascript
// 3) Golden ratio φ terms
const phiGen = ContinuedFraction.PHI();
console.log(phiGen.next().value); // 1, and forever 1…
````

```javascript
// 4) Evaluate the first 10 terms of e’s CF to a Fraction
const approxE = ContinuedFraction.eval(ContinuedFraction.E, 10);
console.log(approxE.toString()); // e ≈ “193/71”
````

```javascript
// 5) Generalized CF for π, 4/π
const genPi = ContinuedFraction.PI();
console.log(genPi.next().value);   // { a: 3, b: 0 }
console.log(genPi.next().value);   // { a: 6, b: 1 }
````

```javascript
// 6) Continued‑fraction from two integers
const halfCf = ContinuedFraction.fromFraction(1, 2);
console.log([...halfCf]); // [0, 2]
```

### Methods

| Method                   | Signature                                                         | Description                                                             |
| ------------------------ | ----------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `sqrt(N: number)`        | `Generator<number>`                                               | Simple CF terms of √N                                                   |
| `fromNumber(n)`          | `Generator<number>`                                               | CF terms of any real via Fraction.js                                    |
| `fromFraction(a, b)`     | `Generator<number>`                                               | CF terms of the rational a/b                                            |
| `PHI()`                  | `Generator<number>`                                               | Infinite 1’s for the golden ratio                                       |
| `FOUR_OVER_PI()`         | `Generator<CFTerm>`                                               | Generalized CF terms for 4/π                                            |
| `PI()`                   | `Generator<CFTerm>`                                               | Generalized CF terms for π                                              |
| `E()`                    | `Generator<number>`                                               | CF expansion of e                                                       |
| `eval(generator, steps)` | `Generator (() => Generator, steps?: number) ⇒ Fraction`          | Evaluate (generalized) continued fraction to a `Fraction` approximation |

## Coding Style

As every library I publish, ContinuedFraction is also built to be as small as possible after compressing it with Google Closure Compiler in advanced mode. Thus the coding style orientates a little on maxing-out the compression rate. Please make sure you keep this style if you plan to extend the library.

## Building the library

After cloning the Git repository run:

```
npm install
npm run build
```

## Copyright and Licensing

Copyright (c) 2025, [Robert Eisele](https://raw.org/)
Licensed under the MIT license.
