document.getElementById("courseForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the form data
    const name = document.getElementById("name").value;
    const emailId = localStorage.getItem("useremail");
    const courseName = document.getElementById("courseName").value;

    // Create a JSON object with the data
    const courseData = {
        name: name,
        emailId: emailId,
        courseName: courseName
    };
    
    // Get the JWT token from local storage
    const token = localStorage.getItem("jwtToken");


    // Make the POST request to register the course
    fetch("https://localhost:7777/course/apply", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            'Authorization': `Bearer ${token}`
        },
        body: new URLSearchParams(courseData) // Converts the object to query parameters
    })
    .then(response => response.text()) // Handle the response
    .then(data => {
        // Log the success message to the console or display an alert
        alert(data);
        
        // Redirect to home.html after successful registration
        window.location.href = "home.html";
    })
    .catch(error => {
        console.error("Error registering course:", error);
        alert("There was an error with the registration. Please try again.");
    });
});
