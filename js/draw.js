const displayBuffer = [];
const transposingSteps = [];

const drawEquation = (step, element) => {
    displayBuffer.push(step.equation);
    element.innerHTML = katex.renderToString(algebra.toTex(step.equation));
};

const drawPicture = (steps, index) => {
    console.log(index);
    const step = steps[index];

    document.getElementById('visualize-equations').innerHTML = '';

    if (!step.transposing) {
        // 左辺と右辺が等しい
        $('#scale-mid').removeClass('invisible');
        $('#scale-left').addClass('invisible');
        $('#scale-right').addClass('invisible');

        const leftEl = document.createElement('span');
        leftEl.id = 'left-eq';
        leftEl.className = 'normal';
        leftEl.innerHTML = katex.renderToString(algebra.toTex(step.equation.lhs));

        const rightEl = document.createElement('span');
        rightEl.id = 'right-eq';
        rightEl.className = 'normal';
        rightEl.innerHTML = katex.renderToString(algebra.toTex(step.equation.rhs));

        document.querySelector('#visualize-equations').appendChild(leftEl);
        document.querySelector('#visualize-equations').appendChild(rightEl);

    } else if (step.transposing) {
        // 左辺と右辺が等しくない（移項中）
        $('#scale-mid').addClass('invisible');

        const leftEl = document.createElement('span');
        leftEl.id = 'left-eq';
        leftEl.className = 'normal';
        leftEl.innerHTML = katex.renderToString(algebra.toTex(step.equation.lhs));

        const rightEl = document.createElement('span');
        rightEl.id = 'right-eq';
        rightEl.className = 'normal';
        rightEl.innerHTML = katex.renderToString(algebra.toTex(step.equation.rhs));


        if (step.big === "left") {
            // 左辺が大きい
            $('#scale-left').removeClass('invisible');

            leftEl.className = 'big';
        } else {
            // 右辺が大きい
            $('#scale-right').removeClass('invisible');

            rightEl.className = 'big';
        }

        document.querySelector('#visualize-equations').appendChild(leftEl);
        document.querySelector('#visualize-equations').appendChild(rightEl);
    }
}