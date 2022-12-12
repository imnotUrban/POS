<header class="main-header">

<!-- LOGO -->
    <a href="inicio" class="logo">
        <!-- Logo mini -->
        <span class="logo-mini">
            <img src="vistas/img/plantilla/logorepuestos.png" class="img-responsive" style="padding:10px" >
        </span>
        <!-- Logo normal -->
        <span class="logo-lg">
            <img src="vistas/img/plantilla/logorepuestos.png" class="img-responsive" style="padding:10px 0px" >
        </span>
    </a>


<!-- Barra de navegacion -->
    <nav class="navbar navbar-static-top" role="navigation">

        <!-- Boton de navegacion -->


        <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
            <span class="sr-only"> Toggle Navegation</span>
        </a>
        <!-- perfil de usuario -->
        <div class="navbar-custom-menu">
            <ul class="nav navbar-nav">

                <li class="drpdown user user-menu"> 
                    <a href=""class="dropdown-toggle" data-toggle="dropdown">
                    <img src=" <?php echo $_SESSION["foto"] != "" ? $_SESSION["foto"] : "vistas/img/usuarios/default/anonymous.png"; ?>  " class="user-image">
                        <span class="hidden-xs">
                            <?php 
                                echo $_SESSION["nombre"];
                            ?>
                        </span>
                    </a>
                    <!-- Dropdown-toggle -->
                    <ul class="dropdown-menu">
                        <li class="user-body">
                            <div class="pull-right">
                                <a href="salir" class="btn btn-default btn-flat">Salir</a>
                            </div>
                        </li>
            
                    </ul>
                </li>

            </ul>
        </div>


    </nav>
</header>