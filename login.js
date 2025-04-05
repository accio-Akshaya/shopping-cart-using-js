let email = document.getElementById('email');
let password = document.getElementById('password');


function generateToken() {
    return Math.random().toString(36).substr(2); // More secure-like token
}

document.getElementById("login").addEventListener("click", (event) => {
    event.preventDefault();
    if (email.value === "" || password.value === "") {
        alert("Please fill all the fields.");
    } else {
        let users = JSON.parse(localStorage.getItem("users") ?? "[]");
        if (users.length > 0) {
            // Check if user exists
            let user = users.filter((user) => user.email === email.value);
            if (user.length > 0) {
                let obj = user[0];
                if (obj.password === password.value) {
                    // Successful login
                    localStorage.setItem("currUser", JSON.stringify({
                        email: email.value,
                        password: password.value,
                        token: generateToken()
                    }));
                    alert("Login Successful!");
                    window.location.href = "/profile/profile.html"; // Or your shop page
                } else {
                    alert("Incorrect password.");
                }
            } else {
                alert("User not found. Please sign up.");
            }
        } else {
            alert("No users found. Please sign up first.");
        }
    }
});
