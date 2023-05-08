let absoluteTime = Date.now();
let spaceshipX = 0;
let spaceshipY = 0;
let scores = 0;
// This is the global variable which will contain all the elements of the game like the array of aliens and the lasers
const gameObject = {
  spaceshipStartCooldown: 0,  
  lasers: [],
  aliens: [],
  alienLasers: [],
  leftKey: false,
  rightKey: false,
  sKey: false,
  gameOver: false
};


// This will position all the element like the spaceship and the aliens in the game.
// The variable entity will represent an element for example it can represent the spaceship, aliens and lasers.
function position($entity, posX, posY) {
  $entity.style.transform = `translate(${posX}px, ${posY}px)`;
}


// This function will make sure that the spaceship do not move off-screen
function minimum_maximum(input_spaceshipX, minimum, maximum) {
  if (input_spaceshipX < minimum) {
    return minimum;
  } else if (input_spaceshipX > maximum) {
    return maximum;
  } else {
    return input_spaceshipX;
  }
}
// This will make the alien laser cooldown shoot randomly to the spaceship
function rand(minimum, maximum) {
  return (minimum + Math.random()) * maximum;
}

// rect1 represent the lasers.
// rect2 represent the aliens and spaceship.
// If the spaceship laser intersect with the aliens, rect2 will represent the alien and rect1 the laser of the spaceship. 
// If the alien laser intersect with the spaceship, rect2 will represent the spaceship and rect1 the laser of the alien.
function hitbox(rect1, rect2) { 
  // if these conditions is not met that means that the 2 element must be intersecting.
  return !(rect2.left > rect1.right ||
          rect2.right < rect1.left ||
          rect2.top > rect1.bottom ||  
          rect2.bottom < rect1.top 
           );
}

// This will create the spaceship and put it into the game
function spaceshipUser($gameSpace) {
  spaceshipX = 400;
  spaceshipY = 550;
  const $user = document.createElement("img");
  $user.src = "Images/spaceship.png";
  $user.className = "spaceship";
  $gameSpace.appendChild($user);
  position($user, spaceshipX, spaceshipY);
}
// This will remove the spaceship from the game and a box will pop-up to display game over and the restart button
function spaceshipKilled($gameSpace, spaceship) {
  gameObject.gameOver = true;
  $gameSpace.removeChild(spaceship);
  const audio = new Audio("sound/invaderkilled.wav");
  audio.play();
  
}

// This function is the laser of the spaceship.
function spaceshipLaser($gameSpace, x, y) {
  const $entity = document.createElement("img");
  $entity.src = "Images/laserspaceship.png";
  $entity.className = "spaceship_laser";
  $gameSpace.appendChild($entity);
  const laserObject = {
    x, 
    y, 
    $entity
  };
  gameObject.lasers.push(laserObject);
  const audio = new Audio("sound/shoot.wav");
  audio.play();
  position($entity, x, y);
}


// This will remove the laser from the game
function erasedLaser($gameSpace, laserObject) {
  $gameSpace.removeChild(laserObject.$entity);
  laserObject.isDead = true;
}

// This function is for the aliens

function alienEnemy($gameSpace, x, y) {
  const $entity = document.createElement("img");
  $entity.src = "Images/alien3.png";
  $entity.className = "alien";
  $gameSpace.appendChild($entity);
  const alienObject = {
    x,
    y,
    cooldown: rand(1, 6),
    $entity
  };
  gameObject.aliens.push(alienObject);
  position($entity, x, y);
  
}

// This function will be called when an alien die.

function alienKilled($gameSpace, alienObject) {
  $gameSpace.removeChild(alienObject.$entity);
  alienObject.isDead = true;
  const audio = new Audio("sound/alienKilled.wav");
  audio.play();
  // This will allow the player to score.
  if (alienObject.isDead){
    scores = scores + 10;
    document.getElementById("score").innerHTML = scores;
    document.getElementById("total_score").innerHTML = scores;
  }

}

// This the function is the laser of the aliens.

function alienLaser($gameSpace, x, y) {
  const $entity = document.createElement("img");
  $entity.src = "Images/laseralien.png";
  $entity.className = "alien_laser";
  $gameSpace.appendChild($entity);
  const laserObject = { 
    x, 
    y, 
    $entity 
  };
  gameObject.alienLasers.push(laserObject);
  position($entity, x, y);
}


// this will put all the aliens and the spaceship into the game when the user will click on the start game button.

function startGame() {
      // This will update all the individual entities
  function entityUpdate() {
    
    const currentTime = Date.now();
    // Divide it by 1000 to get the value in second
    // This will allow the spaceship and laser to move in pixel/second
    const timeDelta = (currentTime - absoluteTime) / 1000.0;
    
    // This will display game over when the the spaceship is destroyed.
    if (gameObject.gameOver) {
      document.querySelector(".game_over").style.display = "block";
      return;
    }
    // This will check if the user is login and put their score in the session and local storage if they beat their score.
    if (sessionStorage.UserLogin !== undefined){  
      let userSession = JSON.parse(sessionStorage.UserLogin);
      let userLocal = JSON.parse(localStorage.user);
      // If the user has got a better score it will update his score in the session storage.
      if (scores> userSession.score){
        userSession.score = scores;
        sessionStorage.setItem("UserLogin", JSON.stringify(userSession));
      }
      for (let c = 0; c < userLocal.length; c++){
        // If the user has got a better score it will update his score in the local storage.
        if(userSession.username === userLocal[c].username && scores > userLocal[c].score){
          userLocal[c].score = scores;
          localStorage.setItem("user", JSON.stringify(userLocal));
        }
      }
    }

    const $gameSpace = document.querySelector(".game_space");
    // This will add all the entities into the game
    spaceshipEntity(timeDelta, $gameSpace);
    laserEntity(timeDelta, $gameSpace);
    alienEntity(timeDelta, $gameSpace);
    alienLaserEntity(timeDelta, $gameSpace);
    absoluteTime = currentTime;

    // This will position all the aliens in the game and it will also made all the aliens respawn if the are all killed.
    if (gameObject.aliens.length === 0){
    //since there are 12 aliens per row, there will be 11 space between the aliens.
    // 640 is the padding between the aliens.
      const alienSpacing = 640 / 11;
      // There will be 3 rows of aliens.
      for (let j = 0; j < 4; j++) {
        // 70 is the horizontal padding and 80 is the vertical padding
        const y = 70 + j * 60;
        // This will put 12 aliens per row.
        for (let i = 0; i < 12; i++) {
          const x = i * alienSpacing + 60;
          alienEnemy($gameSpace, x, y);
        }
      }
    }

    // This will make the game animated.
    window.requestAnimationFrame(entityUpdate);
    
  }

  // It will show the game and hide the start button.
  document.querySelector(".game_position").style.display = "flex";
  document.querySelector(".game_space").style.display = "flex";
  document.querySelector("#game_start").style.display = "none";
  
  const $gameSpace = document.querySelector(".game_space");
  spaceshipUser($gameSpace);
  // This function is called to add all the aliens and spaceship into the game and also make them animated.
  entityUpdate();

}


// This function will make the spaceship move and shoot
function spaceshipEntity(timeDelta, $gameSpace) {
  // This will be the speed of the spaceship.
  // This will move the spaceship from left and right at a speed of 400 pixel/second
  if (gameObject.leftKey) {
    spaceshipX -= timeDelta * 500;
  }
  if (gameObject.rightKey) {
    spaceshipX += timeDelta * 500;
  }
  spaceshipX = minimum_maximum(spaceshipX, -45, 805);
  // Whenever the spaceship is about to shoot, it will check if the cooldown is set to 0 to be able to shoot.
  if (gameObject.sKey && gameObject.spaceshipStartCooldown <= 0) {
    spaceshipLaser($gameSpace, spaceshipX, spaceshipY);
    gameObject.spaceshipStartCooldown = 0.5;
  }
  // Check if the player cooldown is greater than 0 and if it is, it will substract the delta time
  if (gameObject.spaceshipStartCooldown > 0) {
    gameObject.spaceshipStartCooldown -= timeDelta;
  }

  const spaceship = document.querySelector(".spaceship");
  position(spaceship, spaceshipX, spaceshipY);
}


// This will make the lasers move
function laserEntity(timeDelta, $gameSpace) {
  const lasers = gameObject.lasers;
  for (let c = 0; c < lasers.length; c++) {
    const laserObject = lasers[c];
    laserObject.y -= timeDelta * 200;
    // If the spaceship laser missed, the laser will get out of the game space.
    // This if statement will prevent this from happening by erasing the laser when it reach a certain point.
    if (laserObject.y < -100) {
      erasedLaser($gameSpace, laserObject);
    }
    // This will update the laser position on screen.
    position(laserObject.$entity, laserObject.x, laserObject.y);
    // The getBoundingClientRect function will return a rectangle object.
    const rect1 = laserObject.$entity.getBoundingClientRect();
    const aliens = gameObject.aliens;
    for (let i = 0; i < aliens.length; i++) {
      const alienObject = aliens[i];
      const rect2 = alienObject.$entity.getBoundingClientRect();
      // If the spaceship laser hit the alien, both the alien and the laser will be erased.
      if (hitbox(rect1, rect2)) {
        alienKilled($gameSpace, alienObject);
        erasedLaser($gameSpace, laserObject);
        break;
      }
    }
  }
  // This will remove the laser of the spaceship in the array lasers.
  gameObject.lasers = gameObject.lasers.filter(event => !event.isDead);
}
// This will make the aliens shoot and it will also set their laser cooldown.
function alienEntity(timeDelta, $gameSpace) {

  const aliens = gameObject.aliens;
  for (let j = 0; j < aliens.length; j++) {
    const alienObject = aliens[j];
    const x = alienObject.x ;
    const y = alienObject.y ;
    position(alienObject.$entity, x, y);
    alienObject.cooldown -= timeDelta;
    if (alienObject.cooldown <= 0) {
      alienLaser($gameSpace, x, y);
      alienObject.cooldown = 6;
    }
  }
  // This will remove the aliens in the array aliens.
  gameObject.aliens = gameObject.aliens.filter(event => !event.isDead);
}

//The movement of the alien laser and his position
function alienLaserEntity(timeDelta, $gameSpace) {
  const lasers = gameObject.alienLasers;
  for (let i = 0; i < lasers.length; i++) {
    const laserObject = lasers[i];
    laserObject.y += timeDelta * 200;
    if (laserObject.y > 700) {
      erasedLaser($gameSpace, laserObject);
    }
    position(laserObject.$entity, laserObject.x, laserObject.y);
    const rect1 = laserObject.$entity.getBoundingClientRect();
    const spaceship = document.querySelector(".spaceship");
    const rect2 = spaceship.getBoundingClientRect();
    if (hitbox(rect1, rect2)) {
        spaceshipKilled($gameSpace, spaceship);
        break;
      }
  }
  // This will remove the lasers of the aliens in the array alienLasers.
  gameObject.alienLasers = gameObject.alienLasers.filter(event => !event.isDead);
}


// when the key is pressed 
function keyUp(event) {
  if (event.keyCode === 37) {
    gameObject.leftKey = false;
  } else if (event.keyCode === 39) {
    gameObject.rightKey = false;
  } else if (event.keyCode === 83) {
    gameObject.sKey = false;
  }
}

// when the key is no longer pressed 
function keyDown(event) {
  if (event.keyCode === 37) {
    gameObject.leftKey = true;
  } else if (event.keyCode === 39) {
    gameObject.rightKey = true;
  } else if (event.keyCode === 83) {
    gameObject.sKey = true;
  }
}


// This function will be called when the user click on the restart button.
function restart(){
  window.location.reload();
}

// Check if the user is login or not.
if (sessionStorage.UserLogin === undefined){
  document.getElementById("check_login").innerHTML =
  ("You are not login. If you want your high score to be saved do not forget to login");
}



document.querySelector("#game_start").addEventListener('click', startGame);
window.addEventListener("keyup", keyUp);
window.addEventListener("keydown", keyDown);

