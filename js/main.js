window.onload = () => {
    const leftExpr = algebra.parse($('#left-side-input').val());
    const rightExpr = algebra.parse($('#right-side-input').val());

    let allSteps = undefined;
    let currentPicture = -1;

    $('#calc-btn').on('click', event => {
        document.getElementById('steps').innerHTML = '';
        allSteps = calc(leftExpr, rightExpr); // 移項のすべてのステップを取得
        
        console.log(allSteps[0].equation.toString());
        let index = 0;
        for (const step of allSteps) {
            const el = document.createElement('li'); // リセット
            el.id = `step_${index}`;

            document.getElementById('steps').appendChild(el);

            drawEquation(step, el); // 描画

            index++;
        }
        currentPicture = 0;
    });

    $('#next-btn').on('click', event => {
        console.log(currentPicture);
        drawPicture(allSteps, currentPicture);
        currentPicture++;
    });
};