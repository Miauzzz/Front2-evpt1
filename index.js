const students=[]
const tableBody=document.querySelector("#studentsTable tbody");
const averageDiv=document.getElementById("average");
const totalSpan = document.getElementById("total");
const aprobadosSpan = document.getElementById("aprobados");
const reprobadosSpan = document.getElementById("reprobados");

let editingIndex = null;

document.getElementById("studentForm").addEventListener("submit",function (e){
 e.preventDefault();

 const name=document.getElementById("name").value.trim();
 const lastName=document.getElementById("lastName").value.trim();
 const grade=parseFloat(document.getElementById("grade").value);
 const date=document.getElementById("date").value;

 if(!name || !lastName || isNaN(grade) || grade<1 || grade>7 || !date){
    alert("Error al ingresar Datos")
     return
 }  
 
 const student={name,lastName,grade,date};

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

// esta función se encarga de renderizar la tabla de estudiantes
function renderTable() {
    tableBody.innerHTML = "";
    students.forEach((student, idx) => {
        const row = document.createElement("tr");
        row.innerHTML = `
           <td style="padding:0px 5px;">${student.name}</td>
           <td style="padding:0px 5px;">${student.lastName}</td>
           <td style="padding:0px 5px;">${student.grade}</td>
           <td style="padding:0px 5px;">${student.date}</td>
           <td id="actions">
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
            document.getElementById("date").value = student.date;
            editingIndex = idx;
        });
    });
    calcularEstadisticas();
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

function calcularEstadisticas() {
    const total = students.length;
    let aprobados = 0;
    let reprobados = 0;
    if (total > 0) {
        aprobados = students.filter(s => s.grade >= 4).length;
        reprobados = total - aprobados;
    }
    totalSpan.textContent = total;
    aprobadosSpan.textContent = total === 0 ? "0%" : ((aprobados / total) * 100).toFixed(1) + "%";
    reprobadosSpan.textContent = total === 0 ? "0%" : ((reprobados / total) * 100).toFixed(1) + "%";
}

