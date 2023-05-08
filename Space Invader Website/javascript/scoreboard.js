let userLocal = JSON.parse(localStorage.user);


let temp_score = 0;
let temp_username = " ";
let temp_password = " ";
//This nested for loop will put the object userLocal in descending order base on the score.
//This will allow the user with the highest score to be rank 1 on the leaderboard.
for(i=0; i < userLocal.length; i++){

    for(c = i + 1; c < userLocal.length; c++){
        if(userLocal[i].score < userLocal[c].score){
            temp_score = userLocal[i].score;
            userLocal[i].score = userLocal[c].score;
            userLocal[c].score = temp_score;

            temp_username = userLocal[i].username;
            userLocal[i].username = userLocal[c].username;
            userLocal[c].username = temp_username;

            temp_password = userLocal[i].userPassword;
            userLocal[i].userPassword = userLocal[c].userPassword;
            userLocal[c].userPassword = temp_password;
        }
    }
}

let counter = 1;
let counter_score = " ";
let counter_username = " ";
// This for loop will add all the score and username in the table.
// User with a score of 0 will not be placed on the scoreboard.
for (j=0; j < userLocal.length; j++){
    if (userLocal[j].score > 0){
        counter_score = `s${counter}`;
        counter_username = `u${counter}`;
        document.getElementById(counter_score).innerHTML = userLocal[j].score;
        document.getElementById(counter_username).innerHTML = userLocal[j].username; 
        counter = counter + 1;
    }
}










