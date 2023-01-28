<div class="content-wrapper">

    <section class="content-header">
      <h1>
        Administrar Ventas
      </h1>
      <ol class="breadcrumb">
        <li><a href="inicio"><i class="fa fa-dashboard"></i> Inicio</a></li>
        <li class="active">Administrar ventas</li>
      </ol>
    </section>


    <section class="content">


      <div class="box">
        <div class="box-header with-border">
          
        <a href="crear-ventas">

          <button class="btn btn-primary"> 
            Agregar Venta 
          </button>

        </a>
          
        </div>
        <div class="box-body">
          
          <table class="table table-bordered table-striped dt-responsive tablas" width="100%">

            <thead>
              <tr>
                <th style="width:10px">#</th>
                <th>Código factura</th>
                <th>Cliente</th>
                <th>Vendedor</th>
                <th>Forma de pago</th>
                <th>Neto</th> 
                <th>Total</th>
                <th>Fecha transacción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody >

              
              <?php
              $item = null;
              $valor = null;
              $respuesta = ControladorVentas::ctrMostrarVentas($item, $valor);

              foreach ($respuesta as $key => $value) {
           

                echo '<tr>
     
                       <td>'.($key+1).'</td>
     
                       <td>'.$value["codigo"].'</td>';
     
                       $itemCliente = "id";
                       $valorCliente = $value["id_cliente"];
     
                       $respuestaCliente = ControladorClientes::ctrMostrarClientes($itemCliente, $valorCliente);
     
                       echo '<td>'.$respuestaCliente["nombre"].'</td>';
     
                       $itemUsuario = "id";
                       $valorUsuario = $value["id_vendedor"];
     
                       $respuestaUsuario = ControladorUsuarios::ctrMostrarUsuarios($itemUsuario, $valorUsuario);
     
                       echo '<td>'.$respuestaUsuario["nombre"].'</td>
     
                       <td>'.$value["metodo_pago"].'</td>
     
                       <td>$ '.number_format($value["neto"]).'</td>
     
                       <td>$ '.number_format($value["total"]).'</td>
     
                       <td>'.$value["fecha"].'</td>';
                
                if($value["anular"]!=1){

                  echo '
       
                         <td>
       
                           <div class="btn-group">
                               
                             <button class="btn btn-info btnImprimirFactura" codigoVenta="'.$value["codigo"].'"  anularVenta="'.$value["anular"].'" ><i class="fa fa-print"></i></button>
                            <!-- Se dejó la funcionalidad de editar la venta, sin embargo, esta no estará en la app final para evitar cosas que no queremos -->
                             <!--  <button class="btn btn-warning btnEditarVenta" idVenta="'.$value["id"].'"><i class="fa fa-pencil"></i></button> -->
       
                             <button class="btn btn-danger btnEliminarVenta" idVenta="'.$value["id"].'"><i class="fa fa-times"></i></button>
       
                           </div>  
       
                         </td>
       
                       </tr>';
                }else{
                  echo '
                  <td>
       
                           <div class="btn-group">
                               
                            <!-- <button class="btn btn-info"><i class="fa fa-print"></i></button>-->
                             <button class="btn btn-warning">Venta Anulada</button>
                          </div>
                  </td>
                  ';
                }
                 }

            ?>
              
              
            </tbody>

          </table>

          <?php
            $eliminarVenta = new ControladorVentas();
            $eliminarVenta->ctrEliminarVenta();

          ?>

        </div>

      </div>


    </section>

</div>





