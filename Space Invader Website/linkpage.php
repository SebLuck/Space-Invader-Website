<?php

//Display the header 
//The variable "css_page" is the css text file for each webpage
function head($css_page){
    echo '<!DOCTYPE html>';
    echo '<html>';
    echo '<head>';
    echo '<title> Space Shooter </title>';
    echo '<link rel="stylesheet" type="text/css" href="css/header_footer.css">';
    echo '<link rel="stylesheet" type="text/css" href="' . $css_page . '">';
    echo '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">';
    echo '</head>';
    echo '<body>';
}

// Display the navigation bar
// The variable "pages" is the name of each webpage
function menubar($pages){

    echo '<div class="menubar">';

    $page_name = array("Home", "Game", "Leaderboard", "Sign up", "Login");
    $php_name = array("homepage.php", "gamepage.php", "scoreboard.php", "signup.php", "login.php");

    for ($a = 0; $a < count($page_name); $a++){
        echo '<a ';
        if($page_name[$a] == $pages){
            echo 'class="on" ';
        }
        echo 'href="' . $php_name[$a] . '">' . $page_name[$a] . '</a>';
    }
    echo '</div>';

    echo '<div class="image">';
        echo '<img class="icon" src="Images/alien2.png">';
        echo '<img src="Images/title.gif" >';
    echo '</div>';
}


// Display the footer
function footer_part(){
    echo '<div class="footer">';
			
        echo '<div>';
            echo '<img class="logo" src="Images/logo.png" >';
        echo '</div>';
        echo '<br>';
        echo '<br>';
        echo '<br>';
        echo '<div>';
            echo '<h3 class="follow"> Follow Us</h2>';
            echo '<a href="https://www.twitter.com/" class="fa fa-twitter"> </a>';
            echo '<a href="https://www.youtube.com/" class="fa fa-youtube"> </a>';
            echo '<a href="https://www.twitch.com/" class="fa fa-twitch"> </a>';
        echo '</div>';
        echo '<br>';
        echo '<div>';
            echo '<h4 class="copyright"> Copyright © 2021 Sebastien Luckhoo All Rights Reserved</h3>';
        echo '</div>';
    
    echo '</div>';    

    echo '</body>';
    echo '</html>';
}