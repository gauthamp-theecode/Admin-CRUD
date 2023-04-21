const form = document.querySelector('form');
const outputTable = document.querySelector('#output-table');
const editForm = document.querySelector('#edit-card');


function saveData() {
    const name = document.querySelector('#name').value;
    const email = document.querySelector('#email').value;
    const phone = document.querySelector('#phone').value;
    const company = document.querySelector('#company').value;
    const salary = document.querySelector('#salary').value;
    const city = document.querySelector('#city').value;

    // Create a new object with the input data
    const data = {
        name,
        email,
        phone,
        company,
        salary,
        city
    };
    console.log(data);
    // Check if data already exists in local storage
    let savedData = localStorage.getItem('savedData');
    let editIndex = localStorage.getItem('editIndex');


    if (!savedData) {
        savedData = [];
    } else {
        savedData = JSON.parse(savedData);
    }
    if (editIndex !== null) {
        savedData[editIndex] = data;
        localStorage.removeItem('editIndex');
    } else {
        // Otherwise, add the new data to the array
        savedData.push(data);
    }

    // Save the updated array to local storage
    localStorage.setItem('savedData', JSON.stringify(savedData));

    // Clear the form inputs
    form.reset();
    window.location.href = 'output.html';
    // Refresh the output table to show the updated data
    outputTable.innerHTML = '';
    showData();
}

function showData() {
    // Retrieve saved data from local storage
    const savedData = JSON.parse(localStorage.getItem('savedData'));

    // If there is saved data, display it in the output table
    if (savedData) {
        savedData.forEach((data, index) => {
            const tr = document.createElement('tr');
            const tdName = document.createElement('td');
            const tdEmail = document.createElement('td');
            const tdPhone = document.createElement('td');
            const tdCompany = document.createElement('td');
            const tdSalary = document.createElement('td');
            const tdCity = document.createElement('td');
            const tdAction = document.createElement('td');
            const editButton = document.createElement('button');
            const deleteButton = document.createElement('button');

            tdName.textContent = data.name;
            tdEmail.textContent = data.email;
            tdPhone.textContent = data.phone;
            tdCompany.textContent = data.company;
            tdSalary.textContent = data.salary;
            tdCity.textContent = data.city;
            editButton.textContent = 'Edit';
            editButton.addEventListener('click', () => {
                editData(index);
            });
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                deleteData(index);
            });

            tdAction.appendChild(editButton);
            tdAction.appendChild(deleteButton);
            tr.appendChild(tdName);
            tr.appendChild(tdEmail);
            tr.appendChild(tdPhone);
            tr.appendChild(tdCompany);
            tr.appendChild(tdSalary);
            tr.appendChild(tdCity);
            tr.appendChild(tdAction);
            outputTable.appendChild(tr);
        });
    }
}

function editData(index) {
    localStorage.setItem('editIndex', index);
    window.location.href = 'edit.html';
}

function deleteData(index) {
    // Retrieve saved data from local storage
    const savedData = JSON.parse(localStorage.getItem('savedData'));

    // Remove the data at the specified index and save to local storage
    savedData.splice(index, 1);
    localStorage.setItem('savedData', JSON.stringify(savedData));

    // Refresh the output table
    outputTable.innerHTML = '';
    showData();
}

// Check if the current page is output.html and display the saved data
if (window.location.pathname === '/output.html') {
    showData();
}

if (window.location.pathname === '/edit.html') {
    const savedData = JSON.parse(localStorage.getItem('savedData'));
    const index = localStorage.getItem('editIndex');

    // Set the form inputs to the values of the data we're editing
    document.querySelector('#name').value = savedData[index].name;
    document.querySelector('#email').value = savedData[index].email;
    document.querySelector('#phone').value = savedData[index].phone;
    document.querySelector('#company').value = savedData[index].company;
    document.querySelector('#salary').value = savedData[index].salary;
    document.querySelector('#city').value = savedData[index].city;
}

function switchToHome() {
    window.location.href = 'index.html';
}

