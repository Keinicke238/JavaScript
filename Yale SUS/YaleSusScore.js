document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('susForm');
    const resultDiv = document.getElementById('result');

    form.addEventListener('submit', function (evt) {
        evt.preventDefault();
        const formData = new FormData(form);
        const numQuestions = form.querySelectorAll('fieldset').length * 2; // 2 questions per fieldset
        let adjustedSum = 0;
        let answered = 0;

        // iterate through each radio group
        for (let [name, value] of formData.entries()) {
            const question = form.querySelector(`[name="${name}"]`);
            if (!question) continue;
            const radioContainer = question.closest('.radios');
            const type = radioContainer ? radioContainer.dataset.type : 'positive';
            const answer = parseInt(value, 10);
            if (isNaN(answer)) continue;
            answered++;

            if (type === 'positive') {
                // 1->0, 5->4
                adjustedSum += (answer - 1);
            } else {
                // negative: 1->4, 5->0
                adjustedSum += (5 - answer);
            }
        }

        if (answered === 0) {
            resultDiv.textContent = 'Vælg venligst en værdi for hver udsagn.';
            return;
        }

        // max score for this number of questions
        const maxRaw = answered * 4; // hver bruger har 4 point mulighed
        const susScore = (adjustedSum / maxRaw) * 100;
        resultDiv.textContent = `SUS-score: ${susScore.toFixed(1)} / 100`;
    });
});
