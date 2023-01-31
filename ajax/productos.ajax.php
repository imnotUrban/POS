<?php

require_once "../controladores/productos.controlador.php";
require_once "../modelos/productos.modelo.php";


class AjaxProductos{

    public $idCategoria;
    // GENERA CODIGO A PARTIR DE CATEGORIA
    public function ajaxCrearCodigoProducto(){

        $item = "id_categoria";
        $valor = $this->idCategoria;
        $orden = "id";
    
        $respuesta = ControladorProductos::ctrMostrarProductos($item, $valor, $orden);
    
        echo json_encode($respuesta);
    
      }


    // Editar producto 

    public $idProducto;
    public $traerProductos;
    public $nombreProducto;
    public function ajaxEditarProducto(){

        if($this -> traerProductos =="ok"){
            $item = null;
            $valor = null;
            $orden = "id";
    
            $respuesta = ControladorProductos::ctrMostrarProductos($item, $valor, $orden);

            echo json_encode($respuesta);
        }else if($this -> nombreProducto !=""){
            $item = "descripcion";
            $valor = $this->nombreProducto;
            $orden = "id";
    
            $respuesta = ControladorProductos::ctrMostrarProductos($item, $valor, $orden);

            echo json_encode($respuesta);
            
        }else{
            $item = "id";
            $valor = $this->idProducto;
            $orden = "id";
    
            $respuesta = ControladorProductos::ctrMostrarProductos($item, $valor, $orden);

            echo json_encode($respuesta);
        }

        
    }

    public $validarProducto;
    public function ajaxValidarProducto(){
        $item = "codigo";
        $valor = $this->validarProducto;
        $orden = "id";
    
        $respuesta = ControladorProductos::ctrMostrarProductos($item, $valor, $orden);

        echo json_encode($respuesta);
    }
}


if(isset($_POST["idCategoria"])){

    $codigoProducto = new AjaxProductos();
    $codigoProducto -> idCategoria = $_POST["idCategoria"];
    $codigoProducto->ajaxCrearCodigoProducto();

}


if(isset($_POST["idProducto"])){

    $editarProducto = new AjaxProductos();
    $editarProducto -> idProducto = $_POST["idProducto"];
    $editarProducto->ajaxEditarProducto();

}
if(isset($_POST["validarProducto"])){

    $valProducto = new AjaxProductos();
    $valProducto -> validarProducto = $_POST["validarProducto"];
    $valProducto->ajaxValidarProducto();

}


// Traer productos 

if(isset($_POST["traerProductos"])){

    $traerProductos = new AjaxProductos();
    $traerProductos -> traerProductos = $_POST["traerProductos"];
    $traerProductos->ajaxEditarProducto();

}


if(isset($_POST["nombreProducto"])){

    $traerProducto = new AjaxProductos();
    $traerProducto -> nombreProducto = $_POST["nombreProducto"];
    $traerProducto->ajaxEditarProducto();

}