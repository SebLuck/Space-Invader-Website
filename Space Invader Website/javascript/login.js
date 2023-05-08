let button_login;

window.onload = init;
// This function will call the login function when the page has been loaded
function init(){
    button_login = document.getElementById("submit1");
    button_login.onclick = login;


}

function login(){
    let username = document.getElementById("username2").value;
    let userPassword = document.getElementById("password2").value;
    success = false;

    let users = JSON.parse(localStorage.user);

   // This will iterate through the local storage to find the correct user and set their information to the session storage.
    for(let c = 0; c < users.length; c++){
    
        if((username === users[c].username) && (userPassword === users[c].userPassword)){
            success = true;
            sessionStorage.setItem("UserLogin", JSON.stringify(users[c]));
            break;
        }
    }
    // If the user has been able to login, the page will reload.
    // If not it will show an error message.
    if (success){
        window.location.reload();
    }else{
        document.getElementById("wrong_data").innerHTML = "Wrong username or password";
    }
}


// It will check if the user is login or not. 
// If the user is login, it will show them his information.
if (sessionStorage.length !== 0){
    let userSession = JSON.parse(sessionStorage.UserLogin);
    document.querySelector(".user_login").style.display = "none";
    document.querySelector(".logout").style.display = "block";
    document.getElementById("user_username").innerHTML = `Username: ${userSession.username}`;
    document.getElementById("user_score").innerHTML = `Highest Score: ${userSession.score}`;
}

//This will allow the user to logout
function logOut(){
    sessionStorage.clear();
    document.querySelector(".user_login").style.display = "block";
    document.querySelector(".logout").style.display = "none";
}