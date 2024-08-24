const calc = (left, right) => {
    console.log('calc() called');
    console.log(left, right);

    const allSteps = [];

    const simplified = new Equation(left, right); // step 1
    const transposedSteps = transposition(left, right);

    allSteps.push({
        "equation": simplified,
        "transposing": false
    });

    for (const step of transposedSteps) {
        allSteps.push(step);
    }

    allSteps.push({
        "equation": algebra.parse(`x = ${simplified.solveFor('x')}`),
        "transposing": false
    })

    return allSteps;
};

const transposition = (left, right) => {
    console.log(right);
    const steps = [];

    // xを含む項を右辺から左辺へ移項
    for (const xTerm of right.terms) {
        left = left.subtract(xTerm);
        steps.push({
            "equation": new Equation(left, right),
            "transposing": true,
            "transposedTerm": xTerm,
            "big": "right"
        });
        
        right = right.subtract(xTerm);
        steps.push({
            "equation": new Equation(left, right),
            "transposing": false
        });
    }

    // 定数項を左辺から右辺へ移項
    for (const constTerm of left.constants) {
        right = right.subtract(constTerm);
        steps.push({
            "equation": new Equation(left, right),
            "transposing": true,
            "transposedTerm": constTerm,
            "big": "left"
        });

        left = left.subtract(constTerm);
        steps.push({
            "equation": new Equation(left, right),
            "transposing": false
        });
    }

    return steps;
};