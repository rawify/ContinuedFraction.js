
const ContinuedFraction = require("continuedfraction.js");
const assert = require('assert');

function get(gen, num = 10) {

    const res = [];
    for (let i = 0; i < num; i++) {
        let x = gen.next();
        if (x.done) break;
        res.push(x.value);
    }
    return res;
}

const tests = [

    { label: "sqrt(2)", generator: ContinuedFraction.sqrt(2), expect: [1, 2, 2, 2, 2, 2, 2, 2, 2, 2] },
    { label: "sqrt(3)", generator: ContinuedFraction.sqrt(3), expect: [1, 1, 2, 1, 2, 1, 2, 1, 2, 1] },
    { label: "sqrt(5)", generator: ContinuedFraction.sqrt(5), expect: [2, 4, 4, 4, 4, 4, 4, 4, 4, 4] },
    { label: "sqrt(7)", generator: ContinuedFraction.sqrt(7), expect: [2, 1, 1, 1, 4, 1, 1, 1, 4, 1] },

    { label: "fromNumber(23.43)", generator: ContinuedFraction.fromNumber(23.43), expect: [23, 2, 3, 14] },
    { label: "fromNumber(77)", generator: ContinuedFraction.fromNumber(77), expect: [77] },

    { label: "PHI", generator: ContinuedFraction.PHI(), expect: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1] },
    { label: "PI", generator: ContinuedFraction.PI(), expect: [{ a: 3, b: 0 }, { a: 6, b: 1 }, { a: 6, b: 9 }, { a: 6, b: 25 }, { a: 6, b: 49 }, { a: 6, b: 81 }, { a: 6, b: 121 },{ a: 6, b: 169 },{ a: 6, b: 225 },{ a: 6, b: 289 }] },
    { label: "FOUR_OVER_PI", generator: ContinuedFraction.FOUR_OVER_PI(), expect: [{ a: 1, b: 0 }, { a: 2, b: 1 }, { a: 2, b: 9 }, { a: 2, b: 25 }, { a: 2, b: 49 }, { a: 2, b: 81 }, { a: 2, b: 121 },{ a: 2, b: 169 },{ a: 2, b: 225 },{ a: 2, b: 289 }] },
    { label: "E", generator: ContinuedFraction.E(), expect: [2, 1, 2, 1, 1, 4, 1, 1, 6, 1] },

    { label: "eval(Fraction(271/13))", input: ContinuedFraction.eval(ContinuedFraction.fromFraction("271/13"), 10).toFraction(), expect: "271/13" },
    { label: "eval(PHI)", input: ContinuedFraction.eval(ContinuedFraction.PHI, 21).toFraction(), expect: "17711/10946" }
];

describe('Continued Fraction', function () {

    for (var i = 0; i < tests.length; i++) {

        (function (test) {

            it(test.label, function () {
                if (test.generator)
                    assert.deepEqual(get(test.generator, 10), test.expect);
                else
                    assert.deepEqual(test.input, test.expect);
            });

        })(tests[i]);
    }
});