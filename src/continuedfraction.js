/**
 * @license ContinuedFraction.js v0.0.2 8/16/2025
 * https://github.com/rawify/ContinuedFraction.js
 *
 * Copyright (c) 2025, Robert Eisele (https://raw.org/)
 * Licensed under the MIT license.
 **/

import Fraction from 'fraction.js';

/**
 * Utility class for generating continued-fraction expansions of various constants.
 */
const ContinuedFraction = {

    /**
     * Infinite generator for the continued-fraction terms of sqrt(N).
     *   √N = [a0; (a1, a2, ..., a_p)], where the period ends when ak = 2*a0.
     * For perfect squares, yields only a0 = floor(sqrt(N)) and then returns.
     *
     * @param {number} N - Integer whose square root CF expansion is desired (N ≥ 0).
     * @yields {number} - Next continued-fraction term of √N.
     */
    "sqrt": function* (N) {

        const a0 = Math.floor(Math.sqrt(N));
        yield a0;
        if (a0 * a0 === N) return; // perfect square: single-term CF

        //while (true) {
        let nk = 0;
        let dk = 1;
        let ak = a0;

        do {
            nk = ak * dk - nk;
            dk = (N - nk * nk) / dk; // remains integer by construction
            ak = Math.floor((a0 + nk) / dk);
            yield ak;
        } while (/* 2 * a0 !== ak */ true);
        //}
    },

    /**
     * Generator for continued-fraction terms of any real number via Fraction.js.
     *
     * @exports
     * @param {number|string|BigInt} n - The real number to convert (as number or string).
     * @yields {number} - Next continued-fraction term of n.
     */
    "fromNumber": function* (n) {

        yield* Fraction(n)['toContinued']();
    },

    /**
     * Generator for continued-fraction terms of a rational a/b via Fraction.js.
     *
     * @param {number|string|BigInt|Fraction} a - Numerator.
     * @param {number|string|BigInt} b - Denominator.
     * @yields {number} - Next continued-fraction term of a/b.
     */
    "fromFraction": function* (a, b) {

        yield* Fraction(a, b)['toContinued']();
    },

    /**
     * Infinite generator of the golden ratio φ = [1; 1, 1, 1, …].
     *
     * @yields {number} - Always 1.
     */
    "PHI": function* () {

        while (true) {
            yield 1;
        }
    },

    /**
     * Infinite generator for Continued‐fraction terms of 4/π:
     *   4/π = 1 + 1²/(3 + 2²/(5 + 3²/(7 + …)))
     * @yields {{a:number,b:number}} - Term pair (aₙ, bₙ) of the generalized continued fraction.
     *   - first: a₀ = 1
     *   - then: aₙ = 2n+1, bₙ = n²  (n ≥ 1)
     */
    "FOUR_OVER_PI": function* () {

        yield { "a": 1, "b": 0 }; // a₀ = 1

        for (let n = 0; true; n++) {
            yield { "a": 2, "b": (n * 2 + 1) ** 2 };
        }
    },

    /**
     * Infinite generator for Continued‐fraction terms of π:
     *   π = 3 + 1²/(6 + 3²/(6 + 5²/(6 + …)))
     * @yields {{a:number,b:number}} - Term pair (aₙ, bₙ) of the generalized continued fraction.
     *   - first: a₀ = 3
     *   - then: aₙ = 6, bₙ = (2n-1)²  (n ≥ 1)
     */
    "PI": function* () {

        yield { "a": 3, "b": 0 }; // a₀ = 3

        for (let n = 1; true; n++) {
            yield { "a": 6, "b": (n * 2 - 1) ** 2 };
        }
    },

    /**
     * Infinite generator of e = [2; 1, 2, 1, 1, 4, 1, …].
     * Terms follow the pattern [2; (1,2m,1) for m = 1,2,3,…].
     *
     * @yields {number} - Next continued-fraction term of e.
     */
    "E": function* () {

        yield 2; // a₀ = 2

        for (let m = 1; ; m++) {
            yield 1;
            yield 2 * m;
            yield 1;
        }

        /* Alternative:
        yield { a: 2, b: 0 }; // a₀ = 2
        yield { a: 1, b: 1 }; // a₁ = 1

        for (let m = 2; ; m++) {
            yield { a: n, b: m - 1 };
        }
        */
    },

    /**
     * Evaluate a (simple or generalized) continued fraction generator.
     * For generalized: terms are objects { a, b }, else regular numbers.
     * 
     * @param {Generator|Function} generator - Continued fraction term generator.
     * @param {number} steps - Number of terms to evaluate.
     * @returns {Fraction} - Rational approximation as Fraction.
     */
    "eval": function (generator, steps = 10) {

        if (typeof generator === "function") {
            generator = generator();
        }

        // pull off a₀ (with its b₀)
        const first = generator['next']();
        if (first['done']) return Fraction(0);

        const a0 = Fraction(first['value']['a'] ?? first['value']);

        // initialize convergents p₋₁/q₋₁ = 1/0, p₀/q₀ = a₀/1
        let pCurr = a0, qCurr = Fraction(1);
        let pPrev = Fraction(1), qPrev = Fraction(0);

        // run through a₁… up to `steps-1` more
        for (let k = 1; k < steps; k++) {
            const { value, done } = generator['next']();
            if (done) break;

            const ak = Fraction(value['a'] ?? value),
                bk = Fraction(value['b'] ?? 1);

            // pₖ = aₖ·pₖ₋₁ + bₖ·pₖ₋₂
            // qₖ = aₖ·qₖ₋₁ + bₖ·qₖ₋₂
            [pPrev, pCurr] = [pCurr, ak['mul'](pCurr)['add'](bk['mul'](pPrev))];
            [qPrev, qCurr] = [qCurr, ak['mul'](qCurr)['add'](bk['mul'](qPrev))];
        }

        // final convergent = pCurr/qCurr
        return pCurr['div'](qCurr);
    }
}
