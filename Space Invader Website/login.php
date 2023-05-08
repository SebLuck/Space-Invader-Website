<?php
    include('linkpage.php');
    head("css/login.css");
    menubar("Login");

?>

<div class="logout">
	<p id="user_username"></p>
	<p id="user_score"></p>
	<button type="submit" value="Logout"  class="logout_button" onclick="logOut()">Logout</button>
</div>
		
<div class="user_login">
	<form  onsubmit="return false">
		<div class="login">
				
			<h1>Log in<h1>
					
			<hr>
				
			<input class="username" type="text" placeholder="Enter a username" name="username" id="username2" required>

			
			<input type="password" placeholder="Enter a password" name="password" id="password2" required>
				
		
			<br>
			<button type="submit" value="Login" id="submit1" >Login</button>
				
		</div>
				
		
		<!-- Link to the sign up page  -->
		<div class="signup">
			<hr>
			<span id="wrong_data"> </span>
			<p> Don't have an account? <a href="signup.html"> Sign up here. </a> </p>
		</div>
				
	</form>
</div>

<script src="javacript/login.js"> </script> 
		

<?php
    footer_part();

?>