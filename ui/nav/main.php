<nav class="navbar navbar-default navbar-fixed-top <?= !empty($_POST['loginUsername']) ? 'animated slideInDown' : '' ?>">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand">
        <img class="hide" id="loading-spinner" src="ui/img/spinner.gif">LTRAC</a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <div class="navbar-left navbar-form">
        <div id="ltrac-search" class="form-group">
          <input type="text" data-placeholder="Job Search" id="nav-job-search" class="form-control typeahead" placeholder="Job Search">
        </div>
      </div>
      <ul class="nav navbar-nav">

        <li class="dropdown">
          <a href="#" id="jobs-tab-button" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span class="glyphicon glyphicon-road"  aria-hidden="true"></span> Jobs <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="#" id="jobs-tab-btn" class="main-navigation-button" data-target="jobs-layout-parent"><span class="glyphicon glyphicon-th-list" aria-hidden="true"></span> Jobs Tab</a></li>
            <li><a href="#" id="add-job-btn"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Add Job</a></li>
          </ul>
        </li>
        <li><a href="#" id="reporting-tab-btn" class="main-navigation-button" data-target="reporting-layout-parent"><span class="glyphicon glyphicon-file" aria-hidden="true"></span> Reporting</a></li>
        <li class="dropdown">
        <a href="#" id="jobs-tab-button" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span class="glyphicon glyphicon-user"  aria-hidden="true"></span> Clients <span class="caret"></span></a>
        <ul class="dropdown-menu">
          <li><a href="#" id="client-tab-btn" class="main-navigation-button" data-target="client-layout-parent"><span class="glyphicon glyphicon-user" aria-hidden="true"></span> Clients</a></li>
          <li><a href="#" id="add-client-btn"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span> Add Client</a></li>
        </ul>
        </li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Logged in as <?= !empty($_SESSION['user']['user_username']) ? $_SESSION['user']['user_username'] : 'Administrator' ?> <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li class="hide"><a href="#">Action</a></li>
            <form method="post" id="logoutForm" class="navbar-form" enctype="application/x-www-form-urlencoded">
            <button type="submit" name="logout-btn">Logout</button>
            </form>
          </ul>
        </li>
      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>