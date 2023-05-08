//This is the password requirement
let passwordRequire = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})");

let button_register;
let password;
let passwordConfirm;

window.onload = init;
// this function will call the function passwordCheck and register
function init(){
    button_register = document.getElementById("submit");
    button_register.onclick = register;
    submit.disabled = true;
    password = document.getElementById("password1");
    passwordConfirm = document.getElementById("password_confirm");
    password.onkeydown = passwordCheck;
    passwordConfirm.onkeydown = passwordCheck;

// It will check if the local storage is undefined
    if (localStorage.user === undefined){
        localStorage.user = "[]";
    }


}
// This function will check if the password is valid or not.
function passwordCheck(){
    let userPassword = document.getElementById("password1").value;
    let userConfirmPassword = document.getElementById("password_confirm").value;
    let checkPassword = passwordRequire.test(userPassword);
    let checkConfirmPassword = passwordRequire.test(userConfirmPassword);
    if ((userPassword == userConfirmPassword) && (checkPassword) && (checkConfirmPassword)){
        submit.disabled = false;
        document.getElementById("info").innerHTML = "Password Valid.";
    }
    else{
        document.getElementById("info").innerHTML = "Password Invalid. Please use at least 1 uppercase and 6 characters";
        submit.disabled = true;
    }
}

//This function will add all the user data in the local storage

function register(){
    let username = document.getElementById("username1").value;
    let userPassword = document.getElementById("password1").value;

    let userObject = {
        username: username,
        userPassword: userPassword,
        score: 0
    };
    
    
    let users = JSON.parse(localStorage.user);
    
    // This will make sure that the first user that register is added to the local storage
    if (localStorage.user === "[]"){
        users.push(userObject);
        localStorage.user = JSON.stringify(users);
        window.location.href = "login.html";
    }else{
        // This for loop will iterate through the local storage and check if the username entered by the user is already taken or not
        for (let c = 0; c < users.length; c++){
            if (users[c].username === username){
                document.getElementById("info").innerHTML = "Username already taken.";
                break;
            }else if((c === users.length - 1)){
               
                users.push(userObject);
                localStorage.user = JSON.stringify(users);
                window.location.href = "login.html";
            }
    
        }
    }  
    
}
// It will check if the user is login or not. 
// If the user is login, it will show them his information.
if (sessionStorage.length !== 0){
    let userSession = JSON.parse(sessionStorage.UserLogin);
    document.querySelector(".register_part").style.display = "none";
    document.querySelector(".logout").style.display = "block";
    document.getElementById("user_username").innerHTML = `Username: ${userSession.username}`;
    document.getElementById("user_score").innerHTML = `Highest Score: ${userSession.score}`;
}
//This will allow the user to logout
function logOut(){
    sessionStorage.clear();
    document.querySelector(".register_part").style.display = "block";
    document.querySelector(".logout").style.display = "none";
}

