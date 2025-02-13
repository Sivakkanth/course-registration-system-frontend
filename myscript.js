function showCourses(){
    // fetch("https://course-registration-system-backe-production.up.railway.app/courses")
    fetch("https://localhost:7777/courses")
    .then((response) => response.json())
    .then((courses) => {
        const dataTable = document.getElementById("coursetable")
        courses.forEach(course => {
            var row = `<tr>
                <td>${course.courseId}</td>
                <td>${course.courseName}</td>
                <td>${course.trainer}</td>
                <td>${course.durationInWeeks}</td>
            </tr>`
            dataTable.innerHTML+=row;
        });
    });
}

function showStudents(){
    // fetch("https://course-registration-system-backe-production.up.railway.app/courses/enrolled") //API End point
    fetch("https://localhost:7777/courses/registered")
    .then((response) => response.json()) //Http response into json object
    .then((students) => {
        const dataTable = document.getElementById("enrolledtable")

        students.forEach(student => {
            var row = `<tr>
            <td>${student.name}</td>
            <td>${student.emailId}</td>
            <td>${student.courseName}</td>
            </tr>`

            dataTable.innerHTML+=row;
        });
    });
}

document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent form from reloading the page

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const loginData = {
        username: username,
        password: password
    };

    try {
        const response = await fetch("https://localhost:7777/api/v1/auth/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(loginData)
        });

        if (!response.ok) {
            throw new Error("Login failed");
        }

        const result = await response.json();
        localStorage.setItem("jwtToken", result.token); // Store token for future authenticated requests
        localStorage.setItem("userEmail", result.emailId);

        // Redirect to dashboard
        window.location.href = "home.html";
    } catch (error) {
        document.getElementById("error-message").style.display = "block";
    }
});