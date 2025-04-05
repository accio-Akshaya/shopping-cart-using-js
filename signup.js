let fname = document.getElementById('fname');
let lname = document.getElementById('lname');
let email = document.getElementById('email');
let password = document.getElementById('password');
let confirmpassword = document.getElementById('confirmpassword');

let error = document.getElementById("error");
error.style.color ="red";


document.getElementById("signup").addEventListener("click",(e)=>{
    e.preventDefault();
      if(fname.value=="" || lname.value=="" || email.value=="" || password.value=="" || confirmpassword.value=="" ){
        error.textContent ="Please enter all required fields!"
      }else if(password.value == confirmpassword.value){

        let users = JSON.parse(localStorage.getItem('users') ?? "[]");
        let filteredUsers = users.filter((user) => user.email == email.value)

        if(filteredUsers.length>0){
            error.textContent="user already exists!!"
        }else{
            users.push({
                email: email.value,
                password:password.value,
                fname:fname.value,
                lname:lname.value,
                createdAt: new Date(),
            });

            localStorage.setItem("users",JSON.stringify(users));
            error.textContent = "";
            fname.value="" ;
            lname.value="" ;
            email.value="" ;
            password.value="" ; 
            confirmpassword.value="" ;

            alert("successfully signedup!");
            window.location.href ="/profile/profile.html";
        }
      } else{
        error.textContent ="Please make sure password and confirm password are equal!!"
      }
})