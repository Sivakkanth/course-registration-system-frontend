document.getElementById("signupForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const emailId = document.getElementById("emailId").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    const signupData = { 
        "username": username, 
        "password": password,
        "emailId": emailId 
    };

    try {
        const response = await fetch("https://course-registration-system-backe-production.up.railway.app/api/v1/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(signupData)
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        const data = await response.json();

        // Store the email for OTP verification
        localStorage.setItem("userEmail", data.email);

        alert(data.message);
        window.location.href = "verifyotp.html";
    } catch (error) {
        alert("Signup Error: " + error.message);
    }
});