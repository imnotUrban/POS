<?php
require_once "../../../controladores/ventas.controlador.php";
require_once "../../../modelos/ventas.modelo.php";

require_once "../../../controladores/clientes.controlador.php";
require_once "../../../modelos/clientes.modelo.php";

require_once "../../../controladores/usuarios.controlador.php";
require_once "../../../modelos/usuarios.modelo.php";

require_once "../../../controladores/productos.controlador.php";
require_once "../../../modelos/productos.modelo.php";

class imprimirFactura{

    public $codigo;
    public function traerImpresionFactura(){

        // Traer información de la venta 

        $itemVenta = "codigo";
        $valorVenta = $this->codigo;

        $respuestaVenta = ControladorVentas::ctrMostrarVentas($itemVenta, $valorVenta);

        $fecha = substr($respuestaVenta["fecha"],0,-8);
        $productos = json_decode($respuestaVenta["productos"], true);
        $neto = number_format($respuestaVenta["neto"],2);
        $impuesto = number_format($respuestaVenta["impuesto"],2);
        $total = number_format($respuestaVenta["total"],2);
        

        //TRAEMOS LA INFORMACIÓN DEL CLIENTE

        $itemCliente = "id";
        $valorCliente = $respuestaVenta["id_cliente"];

        $respuestaCliente = ControladorClientes::ctrMostrarClientes($itemCliente, $valorCliente);

        //TRAEMOS LA INFORMACIÓN DEL VENDEDOR

        $itemVendedor = "id";
        $valorVendedor = $respuestaVenta["id_vendedor"];

        $respuestaVendedor = ControladorUsuarios::ctrMostrarUsuarios($itemVendedor, $valorVendedor);




require_once('tcpdf_include.php');

$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

$pdf->startPageGroup();

$pdf->AddPage();



$bloque1 = <<<EOF

    <table>
    
        <tr>
        
            <td style="width:150px"><img src="images/porMientras.png"></td>
        
            <td style="background-color:white; width:140px" >

                <div style="font-size:8.5px; text-align:right; line-height:15px;"> 
                    <br>
                    RUT: XX.XXX.XXX-X
                    <br>
                    Direccion: Calle Pedro Montt 215
                </div>
            </td>

            <td style="background-color:white; width:140px" >
            
                <div style="font-size:8.5px; text-align:right; line-height:15px;"> 
                    <br>
                    Teléfono: 945 2847 1092
                    <br>
                    repuestosyaccesoriosmeza@gmail.com
                </div>
            </td>
            <td style="background-color:white; width:140px; text-align:center; color:red">
            
                <br><br>
                BOLETA N°<br>
                $valorVenta
            
            </td>
        

        </tr>
    
    </table>



EOF;

$pdf->writeHTML($bloque1, false, false, false, false, '');
ob_end_clean();

$pdf->Output('facturas.pdf');

}}

$factura = new imprimirFactura();
$factura->codigo = $_GET["codigo"];
$factura->traerImpresionFactura();
?>
 

