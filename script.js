/*data mhs*/
let students = [
    {
        nrp: "231001",
        nama: "Andi Pratama",
        jurusan: "Informatika",
        email: "andi@gmail.com"
    },

    {
        nrp: "231002",
        nama: "Siti Aisyah",
        jurusan: "Sistem Informasi",
        email: "siti@gmail.com"
    },

    {
        nrp: "231003",
        nama: "Budi Santoso",
        jurusan: "Teknik Komputer",
        email: "budi@gmail.com"
    },

    {
        nrp: "231004",
        nama: "Nina Marina",
        jurusan: "Manajemen",
        email: "nina@gmail.com"
    },

    {
        nrp: "231005",
        nama: "Rizky Pratama",
        jurusan: "Informatika",
        email: "rizky@gmail.com"
    },

    {
        nrp: "231006",
        nama: "Dina Putri",
        jurusan: "Sistem Informasi",
        email: "dina@gmail.com"
    },

    {
        nrp: "231007",
        nama: "Fajar Ramadhan",
        jurusan: "Informatika",
        email: "fajar@gmail.com"
    },

    {
        nrp: "231008",
        nama: "Alya Safitri",
        jurusan: "Manajemen",
        email: "alya@gmail.com"
    },

    {
        nrp: "231009",
        nama: "Gerry Hubner",
        jurusan: "Teknik Komputer",
        email: "gerry@gmail.com"
    },

    {
        nrp: "231010",
        nama: "Batiste Lion",
        jurusan: "Manajemen",
        email: "batiste@gmail.com"
    },

    {
        nrp: "231011",
        nama: "Logi Tech",
        jurusan: "Teknik Informatika",
        email: "logi@gmail.com"
    }, 

    {
        nrp: "231012",
        nama: "Jisu Life",
        jurusan: "Sistem Informasi",
        email: "jisu@gmail.com"
    }

];

/*variabel*/
let editIndex = -1;
let currentPage = 1;
const rowsPerPage = 5;
let filteredStudents = students;

/*tampilkan data*/
function displayStudents() {
    const table = document.getElementById("studentTable");
    table.innerHTML = "";
    //menentukan data awal dan akhir
    const start =
        (currentPage - 1) * rowsPerPage;
    const end =
        start + rowsPerPage;
    const pageData =
        filteredStudents.slice(start, end);
    //jika tidak ada data
    if (pageData.length === 0) {
        table.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center;">
                    Data mahasiswa tidak ditemukan
                </td>
            </tr>
        `;
        updatePagination();
        return;
    }

    //tampilkan data
    pageData.forEach((student, index) => {
        const actualIndex =
            students.indexOf(student);
        const row = `
            <tr>
                <td>
                    ${start + index + 1}
                </td>
                <td>
                    ${student.nrp}
                </td>
                <td>
                    ${student.nama}
                </td>
                <td>
                    ${student.jurusan}
                </td>
                <td>
                    ${student.email}
                </td>
                <td>
                    <button
                        class="edit-btn"
                        onclick="editStudent(${actualIndex})"
                        title="Edit"
                    >

                        <i class="fa-solid fa-pencil"></i>

                    </button>
                    <button
                        class="delete-btn"
                        onclick="deleteStudent(${actualIndex})"
                        title="Hapus"
                    >

                        <i class="fa-solid fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
        table.innerHTML += row;
    });
    updatePagination();
}

//tambah atau edit data
document
    .getElementById("studentForm")
    .addEventListener("submit", function(event) {
        event.preventDefault();
        //ambil nilai form
        const nrp =
            document.getElementById("nrp").value.trim();
        const nama =
            document.getElementById("nama").value.trim();
        const jurusan =
            document.getElementById("jurusan").value;
        const email =
            document.getElementById("email").value.trim();
        //membuat object mahasiswa
        const student = {
            nrp: nrp,
            nama: nama,
            jurusan: jurusan,
            email: email
        };

//edit data
        if (editIndex !== -1) {
            students[editIndex] = student;
            editIndex = -1;
            alert("Data mahasiswa berhasil diperbarui!");
        }
        //tambah data
        else {
            students.push(student);
            alert("Data mahasiswa berhasil ditambahkan!");
        }
        //update data
        filteredStudents = students;
        currentPage =
            Math.ceil(filteredStudents.length / rowsPerPage);
        displayStudents();
        resetForm();
    });

//edit mahasiswa
function editStudent(index) {
    const student = students[index];
    document.getElementById("nrp").value =
        student.nrp;
    document.getElementById("nama").value =
        student.nama;
    document.getElementById("jurusan").value =
        student.jurusan;
    document.getElementById("email").value =
        student.email;
    editIndex = index;
    // Scroll ke form
    document
        .querySelector(".form-card")
        .scrollIntoView({
            behavior: "smooth"
        });
}

//delete mahasiswa
function deleteStudent(index) {
    const student =
        students[index];

    const confirmation =
        confirm(
            "Apakah kamu yakin ingin menghapus " +
            student.nama +
            "?"
        );

    if (confirmation) {
        students.splice(index, 1);
        // Update filtered data
        filteredStudents =
            students;
        // Kalau halaman kosong
        const totalPages =
            Math.ceil(
                filteredStudents.length /
                rowsPerPage
            );
        if (
            currentPage > totalPages &&
            totalPages > 0
        ) {
            currentPage =
                totalPages;

        }
        displayStudents();
    }
}

//reset form
function resetForm() {
    document
        .getElementById("studentForm")
        .reset();
    editIndex = -1;
}

//batal
function cancelEdit() {
    resetForm();
}

//search
function searchStudent() {
    const keyword =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase()
            .trim();

    filteredStudents =
        students.filter(function(student) {
            return (
                student.nrp
                    .toLowerCase()
                    .includes(keyword)

                ||
                student.nama
                    .toLowerCase()
                    .includes(keyword)

                ||
                student.jurusan
                    .toLowerCase()
                    .includes(keyword)

                ||
                student.email
                    .toLowerCase()
                    .includes(keyword)
            );
        });
    currentPage = 1;
    displayStudents();
}

//pagination
function updatePagination() {
    const pageNumbers =
        document.getElementById("pageNumbers");
    pageNumbers.innerHTML = "";

    const totalPages =
        Math.ceil(
            filteredStudents.length /
            rowsPerPage
        );
    /* NOMOR HALAMAN */
    for (
        let i = 1;
        i <= totalPages;
        i++
    ) {
        const button =
            document.createElement("button");
        button.className =
            "page-number";
        button.textContent = i;

        if (i === currentPage) {
            button.classList.add("active");
        }
        button.onclick = function() {
            currentPage = i;
            displayStudents();
        };
        pageNumbers.appendChild(button);
    }
    /* PREVIOUS */
    document.getElementById("prevBtn").disabled =
        currentPage === 1;
    /* NEXT */
    document.getElementById("nextBtn").disabled =
        currentPage === totalPages ||
        totalPages === 0;
}

//previous page
function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        displayStudents();
    }
}

//next page
function nextPage() {
    const totalPages =
        Math.ceil(
            filteredStudents.length /
            rowsPerPage
        );
    if (currentPage < totalPages) {
        currentPage++;
        displayStudents();
    }
}

//load pertama
displayStudents();