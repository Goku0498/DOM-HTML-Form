document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('app');

    const form = document.createElement('form');
    form.id = 'userForm';

    form.appendChild(createFormGroup('firstName', 'First Name', 'text'));
    form.appendChild(createFormGroup('lastName', 'Last Name', 'text'));

    form.appendChild(createFormGroup('email', 'Email', 'email', 'full-width'));

    form.appendChild(createFormGroup('address', 'Address', 'textarea', 'full-width'));

    form.appendChild(createFormGroup('pincode', 'Pincode', 'text'));
    form.appendChild(createFormGroup('state', 'State', 'text'));
    form.appendChild(createFormGroup('country', 'Country', 'text'));

    const genderGroup = document.createElement('div');
    genderGroup.className = 'mb-3';
    const genderLabel = document.createElement('label');
    genderLabel.className = 'form-label';
    genderLabel.htmlFor = 'gender';
    genderLabel.innerText = 'Gender';
    genderGroup.appendChild(genderLabel);
    const genderSelect = document.createElement('select');
    genderSelect.className = 'form-select';
    genderSelect.id = 'gender';
    genderSelect.required = true;
    ['Select', 'Male', 'Female', 'Not to specify'].forEach(gender => {
        const option = document.createElement('option');
        option.value = gender === 'Select' ? '' : gender;
        option.innerText = gender;
        genderSelect.appendChild(option);
    });
    genderGroup.appendChild(genderSelect);
    form.appendChild(genderGroup);
    const foodGroup = document.createElement('div');
    foodGroup.className = 'mb-3';
    const foodLabel = document.createElement('label');
    foodLabel.className = 'form-label';
    foodLabel.innerText = 'Choice of Food';
    foodGroup.appendChild(foodLabel);
    ['Pizza', 'Burger', 'Pasta', 'Salad', 'Sushi'].forEach((food, index) => {
        const foodCheckbox = document.createElement('input');
        foodCheckbox.type = 'checkbox';
        foodCheckbox.className = 'form-check-input';
        foodCheckbox.id = `food${index + 1}`;
        foodCheckbox.value = food;
        const foodCheckboxLabel = document.createElement('label');
        foodCheckboxLabel.className = 'form-check-label';
        foodCheckboxLabel.htmlFor = foodCheckbox.id;
        foodCheckboxLabel.innerText = food;
        const formCheck = document.createElement('div');
        formCheck.className = 'form-check form-check-inline';
        formCheck.appendChild(foodCheckbox);
        formCheck.appendChild(foodCheckboxLabel);
        foodGroup.appendChild(formCheck);
    });
    form.appendChild(foodGroup);

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.className = 'btn btn-primary full-width';
    submitButton.innerText = 'Submit';
    form.appendChild(submitButton);

    container.appendChild(form);
   
    const table = document.createElement('table');
    table.className = 'table table-bordered mt-5';
    table.id = 'infoTable';
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    ['First Name', 'Last Name', 'Email', 'Address', 'Pincode', 'State', 'Country', 'Gender', 'Choice of Food'].forEach(header => {
        const th = document.createElement('th');
        th.innerText = header;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);
    container.appendChild(table);
    
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;
        const pincode = document.getElementById('pincode').value;
        const state = document.getElementById('state').value;
        const country = document.getElementById('country').value;
        const gender = document.getElementById('gender').value;
        const selectedFoods = [];
        document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
            selectedFoods.push(checkbox.value);
        });
        if (selectedFoods.length < 2) {
            alert('Please select at least two food options.');
            return;
        }
        const newRow = tbody.insertRow();
        [firstName, lastName, email, address, pincode, state, country, gender, selectedFoods.join(', ')].forEach(data => {
            const cell = newRow.insertCell();
            cell.innerText = data;
        });
        form.reset();
    });

    function createFormGroup(id, label, type, additionalClass = '') {
        const formGroup = document.createElement('div');
        formGroup.className = `mb-3 ${additionalClass}`;
        const labelElement = document.createElement('label');
        labelElement.className = 'form-label';
        labelElement.htmlFor = id;
        labelElement.innerText = label;
        formGroup.appendChild(labelElement);
        let inputElement;
        if (type === 'textarea') {
            inputElement = document.createElement('textarea');
            inputElement.rows = 3;
        } else {
            inputElement = document.createElement('input');
            inputElement.type = type;
        }
        inputElement.className = 'form-control';
        inputElement.id = id;
        inputElement.required = true;
        formGroup.appendChild(inputElement);
        return formGroup;
    }
});