window.onload = function(){
    Details();
    showMyCourses();
}

function Details() {
    const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
    if (!token) {
        alert("No token found, please log in first.");
        window.location.href = "index.html";  // Redirect to login page
        return;
    }

    fetch("https://localhost:7777/mydetails", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Failed to fetch user details');
        }
        return response.json();
    })
    .then((data) => {
        document.getElementById('username').textContent = `Name: ${data.username}`;
        document.getElementById('email').textContent = `Email: ${data.emailId}`;
        localStorage.setItem("useremail", data.emailId);
    })
    .catch((error) => {
        console.error("Error fetching user details:", error);
        alert("Failed to load user details.");
    });
}

function showMyCourses() {
    const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
    const email = localStorage.getItem("useremail");

    if (!email) {
        alert('Email ID is not available.');
        return;
    }

    if (!token) {
        alert("No token found, please log in first.");
        window.location.href = "index.html";  // Redirect to login page if no token
        return;
    }

    fetch(`https://localhost:7777/mycourses?emailId=${email}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }}
    )
    .then((response) => response.json())
    .then((courses) => {
        const dataTable = document.getElementById("coursetable");
        if (courses.length === 0) {
            dataTable.innerHTML = "<tr><td colspan='4'>No courses available</td></tr>";
            return;
        }
        courses.forEach(course => {
            var row = `<tr>
                <td>${course.courseId}</td>
                <td>${course.courseName}</td>
                <td>${course.trainer}</td>
                <td>${course.durationInWeeks}</td>
            </tr>`;
            dataTable.innerHTML += row;
        });
    });
}

// Logout function that sends a request to the backend
document.getElementById('logoutButton').addEventListener('click', function() {
    // Get token from localStorage or cookie
    const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');

    if (!token) {
        alert("No token found, please log in first.");
        return;
    }

    // Send logout request to backend
    fetch('https://localhost:7777/api/v1/auth/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ "token": token }) // Send token in the request body
    })
    .then(response => response.json())
    .then(data => {
            // Clear the token from local storage or session storage
            localStorage.removeItem('jwtToken');
            alert(data.message);
            // Redirect to index.html or login page
            window.location.href = 'index.html';
    })
    .catch(error => {
        console.error('Error logging out:', error);
        alert('An error occurred while logging out.');
    });
});