async function resendOTP() {
    const email = localStorage.getItem("userEmail");

    if (!email) {
        alert("Session expired. Please sign up again.");
        window.location.href = "signup.html";
        return;
    }

    try {
        const response = await fetch("https://course-registration-system-backe-production.up.railway.app/api/v1/otp/resendotp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "otpSendEmail": email })
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        alert("A new OTP has been sent to your email.");
    } catch (error) {
        alert("Resend OTP Error: " + error.message);
    }
}

document.getElementById("otpForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const otp = document.getElementById("otp").value;
    const email = localStorage.getItem("userEmail");

    if (!email) {
        alert("Session expired. Please sign up again.");
        window.location.href = "signup.html";
        return;
    }

    try {
        const response = await fetch("https://course-registration-system-backe-production.up.railway.app/api/v1/otp/otpverification", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ "mail": email, "otp": otp })
        });

        // const data = await response.json();

        // if (!response.ok) {
            // throw new Error(data.message || "Invalid OTP");
        // }

        alert("OTP verified successfully! Login to the System.");
        // localStorage.removeItem("userEmail");
        window.location.href = "index.html";
    } catch (error) {
        alert("lkuyfdcgdvhbjsg " + error.message);
    }
});
