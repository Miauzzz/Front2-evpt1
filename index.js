const students = []

document.getElementById('student-form').addEventListener('submit', function(e){
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const lastName = document.getElementById('last-name').value.trim();
    const grade = document.getElementById('grade').value;

    if(grade < 1 || grade > 7 || isNaN(grade) || !name || !lastName){
        alert("Error al ingresar los datos")
        return
    }

    const student = {name,lastName,grade}
    students.push(student);
    console.log(students);

    addStudentToTable(student);    
    this.reset();
});

function addStudentToTable(student) {
    const tablebody = document.querySelector('#StudentsTable tbody');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.lastName}</td>
        <td>${student.grade}</td>
        <td>${student.date}</td>`;
    tablebody.appendChild(row);
}