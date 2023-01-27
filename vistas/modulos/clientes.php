<div class="content-wrapper">

    <section class="content-header">
      <h1>
        Administrar clientes
      </h1>
      <ol class="breadcrumb">
        <li><a href="inicio"><i class="fa fa-dashboard"></i> Inicio</a></li>
        <li class="active">Administrar categorias</li>
      </ol>
    </section>


    <section class="content">


      <div class="box">
        <div class="box-header with-border">
          
        <button class="btn btn-primary" data-toggle="modal" data-target ="#modalAgregarCliente"> 
          Agregar Cliente 
        </button>
          
        </div>
        <div class="box-body">
          
          <table class="table table-bordered table-striped dt-responsive tablas" width="100%">

            <thead>
              <tr>
                <th style="width:10px">#</th>
                <th>Nombre</th>
                <th>Rut</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Dirección</th>
                <th>Fecha nacimiento</th>
                <th>Total Compras</th>
                <th>Última Compra</th>
                <th>Ingreso al sistema</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody >

            <?php
            $item = null;
            $valor = null;
            $clientes = ControladorClientes::ctrMostrarClientes($item, $valor);

            foreach($clientes as $key => $value){

              echo '<tr>
              <td>'.($key+1).'</td>
              <td>'.$value["nombre"].'</td>
              <td>'.$value["documento"].'</td>
              <td>'.$value["email"].'</td>
              <td>'.$value["telefono"].'</td>
              <td>'.$value["direccion"].'</td>
              <td>'.$value["fecha_nacimiento"].'</td>
              <td>'.$value["compras"].'</td>
              <td>'.$value["ultima_compra"].'</td>
              <td>'.$value["fecha"].'</td>
              <td>
                <div class="btn-group">
                  <button class="btn btn-warning btnEditarCliente" data-toggle="modal" data-target="#modalEditarCliente" idCliente="'.$value["id"].'">
                    <i class="fa fa-pencil"></i>
                  </button>
                  <button class="btn btn-danger btnEliminarCliente" idCliente="'.$value["id"].'">
                    <i class="fa fa-times"></i>
                  </button>
                </div>
              </td>
            </tr>';

            }
              

            ?>


              
              
            </tbody>

          </table>

        </div>

      </div>


    </section>

</div>



<!-- MODAL Agregar Cliente -->
<div id="modalAgregarCliente" class="modal fade" role="dialog">
  <div class="modal-dialog">
    <div class="modal-content">
      <form role="form" method="post">
        <div class="modal-header" style="background:#3c8dbc; color:white;">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="model-tittle" > Agregar Cliente </h4>
        </div>
        <div class="modal-body">
          <div class="box-body">

              <!-- Nombre cliente  -->
            <div class="form-group">
              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-user"> </i></span>
                <input type="text" class="form-control input-lg" name="nuevoCliente" placeholder="Ingresar Nombre" required>
              </div>
            </div>
            <!-- rut  -->
            <div class="form-group">
              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-key"> </i></span>
                <input type="number" min="0" class="form-control input-lg" name="nuevoDocumentoId" placeholder="Ingresar Rut (202391534)" required>
              </div>
            </div>
            <!-- Email -->
            <div class="form-group">
              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-envelope"> </i></span>
                <input type="email" class="form-control input-lg" name="nuevoEmail" placeholder="Ingresar Correo" required>
              </div>
            </div>
            <!-- Telefono -->
            <div class="form-group">
              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-phone"> </i></span>
                <input type="text" class="form-control input-lg" name="nuevoTelefono" placeholder="Ingresar teléfono" data-inputmask="'mask':'(999) 99999999'" data-mask required>
              </div>
            </div>
            <!-- direccion -->
            <div class="form-group">
              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-map-marker"> </i></span>
                <input type="text" class="form-control input-lg" name="nuevaDireccion" placeholder="Ingresar dirección" required>
                
              </div>
            </div>
            <!-- fecha nacimiento -->
            <div class="form-group">
              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-calendar"> </i></span>
                <input type="text" class="form-control input-lg" name="nuevaFechaNacimiento" placeholder="Ingresar fecha nacimiento" data-inputmask="'alias':'yyyy/mm/dd'" data-mask required>
                
              </div>
            </div>

          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Salir</button>
          <button type="submit" class="btn btn-primary" >Guardar Cliente</button>
        </div>
      
      
      </form>

      <?php
      $crearCliente = new ControladorClientes();
      $crearCliente->ctrCrearCliente();
      ?>

    </div>
  </div>


</div>



<!-- MODAL Editar Cliente -->
<div id="modalEditarCliente" class="modal fade" role="dialog">
  <div class="modal-dialog">
    <div class="modal-content">
      <form role="form" method="post">
        <div class="modal-header" style="background:#3c8dbc; color:white;">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="model-tittle" > Editar Cliente </h4>
        </div>
        <div class="modal-body">
          <div class="box-body">

              <!-- Nombre cliente  -->
            <div class="form-group">
              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-user"> </i></span>
                <input type="text" class="form-control input-lg" name="editarCliente" id="editarCliente" required>
                <input type="hidden" id="idCliente" name="idCliente">
              </div>
            </div>
            <!-- rut  -->
            <div class="form-group">
              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-key"> </i></span>
                <input type="number" min="0" class="form-control input-lg" name="editarDocumentoId" id="editarDocumentoId" required>
              </div>
            </div>
            <!-- Email -->
            <div class="form-group">
              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-envelope"> </i></span>
                <input type="email" class="form-control input-lg" name="editarEmail" id="editarEmail" required>
              </div>
            </div>
            <!-- Telefono -->
            <div class="form-group">
              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-phone"> </i></span>
                <input type="text" class="form-control input-lg" name="editarTelefono" id="editarTelefono" data-inputmask="'mask':'(999) 99999999'" data-mask required>
              </div>
            </div>
            <!-- direccion -->
            <div class="form-group">
              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-map-marker"> </i></span>
                <input type="text" class="form-control input-lg" name="editarDireccion" id="editarDireccion" required>
                
              </div>
            </div>
            <!-- fecha nacimiento -->
            <div class="form-group">
              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-calendar"> </i></span>
                <input type="text" class="form-control input-lg" name="editarFechaNacimiento" id="editarFechaNacimiento" data-inputmask="'alias':'yyyy/mm/dd'" data-mask required>
                
              </div>
            </div>

          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Salir</button>
          <button type="submit" class="btn btn-primary" >Guardar cambios</button>
        </div>
      
      
      </form>

      <?php
      $editarCliente = new ControladorClientes();
      $editarCliente->ctrEditarCliente();
      ?>

    </div>
  </div>


</div>



<?php

$eliminarCliente = new ControladorClientes();
$eliminarCliente->ctrEliminarCliente();

?>