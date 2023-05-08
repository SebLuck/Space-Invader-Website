<?php
    include('linkpage.php');
    head("css/signup.css");
    menubar("Sign up");

?>

<div class="logout">
	<p id="user_username"></p>
	<p id="user_score"></p>
	<button type="submit" value="Logout"  class="logout_button" onclick="logOut()">Logout</button>
</div>



<div class="register_part">
	<form onsubmit="return false">
		<div class="register">
		
			<h1>Sign up<h1>
			
			<hr>
        
			<input class="username" type="text" placeholder="Enter a username" name="username" id="username1" required>
			<input type="password" placeholder="Enter a password" name="password" id="password1" required>
			<input type="password" placeholder="Confirm Password" name="password_confirm" id="password_confirm" 
			required onkeyup="passwordCheck()">		
			<br>
			<button class="registerButton" type="submit" id="submit">  Register </Button> 
		
		</div>
				

		<!-- link to the login page  -->
		<div class="signin">
			<hr>
			<span id="info"> </span>
			<p> Already sign up? <a href="login.html"> Sign in. </a> </p>
		</div>
				
	</form>
</div>
<script src="javacript/signup.js"> </script> 

<?php
    footer_part();

?>