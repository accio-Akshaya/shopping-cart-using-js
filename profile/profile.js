document.addEventListener("DOMContentLoaded", function(){
    let user = JSON.parse(localStorage.getItem("userProfile")) || { firstName: "", lastName: "", password: ""};

    const firstNameInput = document.getElementById("firstName");
    const lastNameInput = document.getElementById("lastName");
    const saveInfoButton = document.getElementById("saveInfo");
    const oldPasswordInput = document.getElementById("oldPassword");
    const newPasswordInput = document.getElementById("newPassword");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const changePasswordButton = document.getElementById("changePassword");
    const logoutButton = document.getElementById("logout");
    const shoppingCart=document.getElementById("shop");

    firstNameInput.value = user.firstName;
    lastNameInput.value = user.lastName;

    document.getElementById("firstName").value="";
    document.getElementById("lastName").value="";

    saveInfoButton.addEventListener("click", function(){
        user.firstName = firstNameInput.value;
        user.lastName = lastNameInput.value;
        localStorage.setItem("userProfile", JSON.stringify(user));
        alert("Profile updated successfully!");
    });

    changePasswordButton.addEventListener("click", function(){
        if(oldPasswordInput.value !== user.password){
            alert("Old password is incorrect!");
            return;
        }
        if(newPasswordInput.value !== confirmPasswordInput.value){
            alert("New passwords do not match.");
            return;
        }
        user.password = newPasswordInput.value;
        localStorage.setItem("userProfile", JSON.stringify(user));
        alert("Password changed successfully!");
    });
    logoutButton.addEventListener("click", function(){
        localStorage.removeItem("userProfile");
        alert("Logged out successfully!");
        window.location.href = "/login.html";
    });
    shoppingCart.addEventListener("click",function(){
        window.location.href ="/shop.html";
    });
});
//let currUser = localStorage.getItem('currUser');
//if(currUser){

//}else{
    //take the user back to login!
//    window.location.href ="/login.html"
//}