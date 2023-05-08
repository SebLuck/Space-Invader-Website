<?php
    include('linkpage.php');
    head("css/gamepage.css");
    menubar("Game");

?>
<!-- The game  -->
<div class="instruction"> 
    <p> Use left and right keys to move and S key to shoot</p>
    <p id="check_login"></p>
</div>

<div id="game_start">
    <p class="click_start">  Click to start  </p>
</div>

<div class="game_position">
    <div class="game_space"> 
        <p class="score_text">score:</p>
        <p id="score"> 0</p>

    </div>
    <div class="game_over">
        <h1 class="gameover_text">GAME OVER</h1>
        <p class="gameover_score">Score:</p>
        <p id="total_score">0</p>
        <button class="btn" onclick="restart()">Restart</button>
    </div>	
</div>


<script src="javacript/spaceshooter.js"> </script>

<br>
<br>
<br>
<br>

<?php
    footer_part();

?>