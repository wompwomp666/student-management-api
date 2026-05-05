// BACKEND URL
const API_URL = "https://student-management-api-sxdc.onrender.com/students";

let editId = null;

/* ================= TOAST ================= */
function showToast(message, type) {
    const toast = document.getElementById("toast");

    toast.textContent = message;
    toast.className = type === "success" ? "toast-success" : "toast-error";

    toast.style.opacity = "1";

    setTimeout(() => {
        toast.style.opacity = "0";
    }, 2500);
}

/* ================= ADD / UPDATE ================= */
async function addStudent() {
    const student = {
        name: document.getElementById("name").value.trim(),
        rollNumber: document.getElementById("rollNumber").value.trim(),
        email: document.getElementById("email").value.trim(),
        phoneNumber: document.getElementById("phoneNumber").value.trim(),
        course: document.getElementById("course").value.trim()
    };

    // VALIDATION
    if (!student.name || !student.rollNumber || !student.email || !student.phoneNumber || !student.course) {
        showToast("Fill all fields properly", "error");
        return;
    }

    try {
        let res;

        if (editId === null) {
            // ADD
            res = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(student)
            });
        } else {
            // UPDATE
            res = await fetch(API_URL + "/" + editId, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(student)
            });
        }

        // 🔥 PROPER ERROR HANDLING
        if (!res.ok) {
            let errorMessage = "Operation failed";

            try {
                const errorData = await res.json();
                errorMessage = errorData.message || errorMessage;
            } catch (e) {
                // If backend doesn't return JSON
            }

            throw new Error(errorMessage);
        }

        // SUCCESS
        if (editId === null) {
            showToast("Student added successfully", "success");
        } else {
            showToast("Student updated successfully", "success");
            editId = null;
            document.querySelector(".primary-btn").innerText = "Add Student";
        }

        clearForm();
        loadStudents();

    } catch (err) {
        showToast(err.message, "error"); // 🔥 real backend message shown
        console.error(err);
    }
}

/* ================= LOAD ================= */
async function loadStudents() {
    try {
        const res = await fetch(API_URL);

        if (!res.ok) throw new Error("Failed to load students");

        const data = await res.json();

        const tableBody = document.getElementById("tableBody");
        tableBody.innerHTML = "";

        data.forEach(student => {
            const row = `
                <tr>
                    <td>${student.name}</td>
                    <td>${student.rollNumber}</td>
                    <td>${student.email}</td>
                    <td>${student.phoneNumber}</td>
                    <td>${student.course}</td>
                    <td>
                        <button class="edit-btn" onclick="editStudent(${student.id})">Edit</button>
                        <button class="delete-btn" onclick="deleteStudent(${student.id})">Delete</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });

    } catch (err) {
        showToast(err.message, "error");
        console.error(err);
    }
}

/* ================= DELETE ================= */
async function deleteStudent(id) {
    if (!confirm("Delete this student?")) return;

    try {
        const res = await fetch(API_URL + "/" + id, {
            method: "DELETE"
        });

        if (!res.ok) {
            throw new Error("Delete failed");
        }

        showToast("Student deleted", "success");
        loadStudents();

    } catch (err) {
        showToast(err.message, "error");
        console.error(err);
    }
}

/* ================= EDIT ================= */
function editStudent(id) {
    fetch(API_URL + "/" + id)
        .then(res => {
            if (!res.ok) throw new Error("Failed to fetch student");
            return res.json();
        })
        .then(student => {
            document.getElementById("name").value = student.name;
            document.getElementById("rollNumber").value = student.rollNumber;
            document.getElementById("email").value = student.email;
            document.getElementById("phoneNumber").value = student.phoneNumber;
            document.getElementById("course").value = student.course;

            editId = id;
            document.querySelector(".primary-btn").innerText = "Update Student";
        })
        .catch(err => {
            showToast(err.message, "error");
        });
}

/* ================= CLEAR FORM ================= */
function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("rollNumber").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phoneNumber").value = "";
    document.getElementById("course").value = "";
}

/* ================= INIT ================= */
loadStudents();