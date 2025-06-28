const form = document.getElementById('registrationForm');
const table = document.getElementById('studentTable');
let students = JSON.parse(localStorage.getItem('students')) || [];

function displayStudents() {
  table.innerHTML = "";
  students.forEach((student, index) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.id}</td>
      <td>${student.className}</td>
      <td>${student.roll}</td>
      <td>
        <button class="action reset" onclick="editStudent(${index})">Reset</button>
        <button class="action delete" onclick="deleteStudent(${index})">Delete</button>
      </td>
    `;
    table.appendChild(row);
  });
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('studentName').value.trim();
  const id = document.getElementById('id').value.trim();
  const className = document.getElementById('class').value.trim();
  const roll = document.getElementById('roll').value.trim();

  if (!name || !id || !className || !roll) {
    alert("Please fill in all fields.");
    return;
  }

  if (!/^[A-Za-z ]+$/.test(name)) {
    alert("Name must contain only letters.");
    return;
  }

  if (!/^[0-9]+$/.test(id) || !/^[0-9]+$/.test(roll)) {
    alert("ID and Roll No must contain only numbers.");
    return;
  }

  students.push({ name, id, className, roll });
  localStorage.setItem('students', JSON.stringify(students));
  displayStudents();
  form.reset();
});

function deleteStudent(index) {
  if (confirm("Delete this student?")) {
    students.splice(index, 1);
    localStorage.setItem('students', JSON.stringify(students));
    displayStudents();
  }
}

function editStudent(index) {
  const student = students[index];
  document.getElementById('studentName').value = student.name;
  document.getElementById('id').value = student.id;
  document.getElementById('class').value = student.className;
  document.getElementById('roll').value = student.roll;
  students.splice(index, 1);
  localStorage.setItem('students', JSON.stringify(students));
  displayStudents();
}

// Load saved students on page load
displayStudents();
