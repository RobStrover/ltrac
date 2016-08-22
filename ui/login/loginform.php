<div class="container animated bounceInDown">
	<div class="row">
		<div class="col-sm-6 col-md-4 col-sm-offset-3 col-md-offset-4">
			<h1 class="text-center">LTRAC Login</h1>
			<form class="form-signin" action="index.php" method="post" enctype="application/x-www-form-urlencoded">
				<div class="form-group">
				  <label for="loginUsername">Username</label>
				  <input id="loginUsername" name="loginUsername" <?=!empty($_POST['loginUsername']) ? "value='".$_POST['loginUsername']."'":'' ?> type="text" class="form-control">
				</div>
				<div class="form-group">
				  <label for="loginPassword">Password</label>
				  <input id="loginPassword" name="loginPassword" type="password" class="form-control">
				</div>
				<button type="submit" name="login-btn" class="btn btn-primary btn-block">Login</button>
				</form>
		</div>
	</div>
</div>