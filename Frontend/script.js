document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculateBtn');
    const weightInput = document.getElementById('weight');
    const heightInput = document.getElementById('height');
    const resultContainer = document.getElementById('result');
    calculateBtn.addEventListener('click', () => {
        const weight = parseFloat(weightInput.value);
        const height = parseFloat(heightInput.value);
        if (!isNaN(weight) && !isNaN(height) && weight > 0 && height > 0) {
            calculateBMI(weight, height);
        } else {
            resultContainer.innerText = 'Please enter valid weight and height.';
        }
    });
    function calculateBMI(weight, height) {
        fetch('http://localhost:3000/calculateBMI', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ weight, height })
        })
        .then(response => response.json())
        .then(data => {
            if(data && data.bmi !== undefined && data.interpretation) {
                const bmi = data.bmi;
                const interpretation = data.interpretation;     
                const table = document.createElement('table');
                table.innerHTML = `
                    <thead>
                        <tr>
                            <th>BMI</th>
                            <th>Interpretation</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${bmi}</td>
                            <td>${interpretation}</td>
                        </tr>
                    </tbody>
                `;  
                resultContainer.innerHTML = '';
                resultContainer.appendChild(table);
            } else {
                resultContainer.innerText = 'Error calculating BMI.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultContainer.innerText = 'An error occurred. Please try again later.';
        });
    }
});
