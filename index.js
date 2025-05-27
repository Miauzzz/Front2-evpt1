const students=[]
const tableBody=document.querySelector("#studentsTable tbody");
const averageDiv=document.getElementById("average");

let editingIndex = null;

document.getElementById("studentForm").addEventListener("submit",function (e){
 e.preventDefault();

 const name=document.getElementById("name").value.trim();
 const lastName=document.getElementById("lastName").value.trim();
 const grade=parseFloat(document.getElementById("grade").value);

 if(!name || !lastName || isNaN(grade) || grade<1 || grade>7){
    alert("Error al ingresar Datos")
     return
 }  
 
 const student={name,lastName,grade};

 if (editingIndex !== null) {
        students[editingIndex] = student;
        editingIndex = null;
    } else {
        students.push(student);
    }

    renderTable();
    calcularPromedio();
    this.reset();
});

function renderTable() {
    tableBody.innerHTML = "";
    students.forEach((student, idx) => {
        const row = document.createElement("tr");
        row.innerHTML = `
           <td>${student.name}</td>
           <td>${student.lastName}</td>
           <td>${student.grade}</td>
           <td>
             <button id="eliminar-btn" class="eliminar-btn">Eliminar</button>
             <button id="modificar-btn" class="modificar-btn">Modificar</button>
           </td>`;
        tableBody.appendChild(row);

        row.querySelector(".eliminar-btn").addEventListener("click", function() {
            students.splice(idx, 1);
            renderTable();
            calcularPromedio();
        });

        row.querySelector(".modificar-btn").addEventListener("click", function() {
            document.getElementById("name").value = student.name;
            document.getElementById("lastName").value = student.lastName;
            document.getElementById("grade").value = student.grade;
            editingIndex = idx;
        });
    });
}

function addStudentToTable(student){
    renderTable();
}

function calcularPromedio(){
    if(students.length===0){
        averageDiv.textContent="Promedio General del Curso : N/A"
        return
    }
    const total=students.reduce((sum,student)=>sum+student.grade,0);
    const prom=total/students.length;
    averageDiv.textContent="Promedio General del Curso : "+prom.toFixed(2);
}

