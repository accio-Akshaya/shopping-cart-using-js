const loginButton = document.getElementById("login");
const signupButton = document.getElementById("signup");

loginButton.addEventListener("click",function(){
    window.location.href="/login.html";
});

signupButton.addEventListener("click",function(){
    window.location.href ="/signup.html";
});