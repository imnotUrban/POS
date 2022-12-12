<?php

require_once "../controladores/categorias.controlador.php";
require_once "../modelos/categorias.modelo.php";

class AjaxCategorias{


    //Validar que el categoria no se repita

    public $validarCategoria;
    public function ajaxValidarCategoria(){
        $item = "categoria";
        $valor = $this->validarCategoria;
        $respuesta = ControladorCategorias::ctrMostrarCategorias($item, $valor);

        echo json_encode($respuesta);
    }



    public $idCategoria;
    public function ajaxEditarCategoria(){
        $item = "id";   //Buscar coincidencia con el id
        $valor = $this->idCategoria;
        $respuesta = ControladorCategorias::ctrMostrarCategorias($item, $valor);
        echo json_encode($respuesta);

    }



}



//objeto para validar usuario
if(isset($_POST["validarCategoria"])){
    $editar = new AjaxCategorias();
    $editar -> validarCategoria = $_POST["validarCategoria"];
    $editar -> ajaxValidarCategoria();
}


/*=============================================
EDITAR CATEGORÍA
=============================================*/	
if(isset($_POST["idCategoria"])){

	$categoria = new AjaxCategorias();
	$categoria -> idCategoria = $_POST["idCategoria"];
	$categoria -> ajaxEditarCategoria();
}