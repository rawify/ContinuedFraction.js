
import type Fraction from 'fraction.js';

/**
 * A term of a generalized continued fraction.
 */
export interface CFTerm {
    /** The aₙ coefficient */
    a: number;
    /** The bₙ coefficient */
    b: number;
}

/**
 * Utility class for generating continued-fraction expansions of various constants.
 * All methods are static.
 */
export default class ContinuedFraction {
    /**
     * Infinite generator for the continued‐fraction terms of √N.
     * @param N Integer whose square‐root CF expansion is desired (N ≥ 0)
     * @yields Next continued‐fraction term of √N
     */
    static sqrt(N: number): Generator<number, void, unknown>;

    /**
     * Generator for continued‐fraction terms of any real number via Fraction.js.
     * @param n The real number to convert (as number, string, or bigint)
     * @yields Next continued‐fraction term of n
     */
    static fromNumber(n: number | string | bigint): Generator<number, void, unknown>;

    /**
     * Generator for continued‐fraction terms of a rational a/b via Fraction.js.
     * @param a Numerator (number, string, bigint, or Fraction)
     * @param b Denominator (number, string, or bigint)
     * @yields Next continued‐fraction term of a/b
     */
    static fromFraction(
        a: number | string | bigint | Fraction,
        b: number | string | bigint
    ): Generator<number, void, unknown>;

    /**
     * Infinite generator of the golden ratio φ = [1; 1, 1, 1, …].
     * @yields Always 1
     */
    static PHI(): Generator<number, void, unknown>;

    /**
     * Infinite generator for the generalized continued‐fraction terms of 4/π.
     * @yields Term pairs { a, b } for the continued‐fraction
     */
    static FOUR_OVER_PI(): Generator<CFTerm, void, unknown>;

    /**
     * Infinite generator for the generalized continued‐fraction terms of π.
     * @yields Term pairs { a, b } for the continued‐fraction
     */
    static PI(): Generator<CFTerm, void, unknown>;

    /**
     * Infinite generator of e = [2; 1, 2, 1, 1, 4, 1, …].
     * @yields Next continued‐fraction term of e
     */
    static E(): Generator<number, void, unknown>;

    /**
     * Evaluate a (simple or generalized) continued fraction generator.
     * @param generator A CF term generator or a function returning one
     * @param steps Number of terms to include (default 10)
     * @returns Rational approximation as a Fraction
     */
    static eval(
        generator:
            | Generator<number | CFTerm, any, any>
            | (() => Generator<number | CFTerm, any, any>),
        steps?: number
    ): Fraction;
}
