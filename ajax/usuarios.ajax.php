<?php

require_once "../controladores/usuarios.controlador.php";
require_once "../modelos/usuarios.modelo.php";

class AjaxUsuarios{

    //Editar usuarios

    public $idUsuario;

    public function ajaxEditarUsuario(){
        $item = "id";
        $valor = $this->idUsuario;
        $respuesta = ControladorUsuarios::ctrMostrarUsuarios($item, $valor);

        echo json_encode($respuesta);

    }


    // Activar Usuario 
    public $activarId;
    public $activarUsuario;




    public function ajaxActivarUsuario(){

        $tabla = "usuarios";

        $item1 = "estado";
        $valor1 = $this->activarUsuario;
        $item2 = "id";
        $valor2 = $this->activarId;

        $respuesta = ModeloUsuarios::mdlActualizarUsuario($tabla, $item1, $valor1, $item2, $valor2);

    }


    //Validar que el usuario no se repita

    public $validarUsuario;
    public function ajaxValidarUsuario(){
        $item = "usuario";
        $valor = $this->validarUsuario;
        $respuesta = ControladorUsuarios::ctrMostrarUsuarios($item, $valor);

        echo json_encode($respuesta);
    }



}
if(isset($_POST["idUsuario"])){
    $editar = new AjaxUsuarios();
    $editar -> idUsuario = $_POST["idUsuario"];
    $editar -> ajaxEditarUsuario();
}

if(isset($_POST["activarUsuario"])){
    $editar = new AjaxUsuarios();
    $editar -> activarUsuario = $_POST["activarUsuario"];
    $editar -> activarId = $_POST["activarId"];
    $editar -> ajaxActivarUsuario();
}

//objeto para validar usuario
if(isset($_POST["validarUsuario"])){
    $editar = new AjaxUsuarios();
    $editar -> validarUsuario = $_POST["validarUsuario"];
    $editar -> ajaxValidarUsuario();
}