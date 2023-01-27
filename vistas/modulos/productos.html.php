<div class="content-wrapper">

    <section class="content-header">
      <h1>
        Administrar Productos
      </h1>
      <ol class="breadcrumb">
        <li><a href="inicio"><i class="fa fa-dashboard"></i> Inicio</a></li>
        <li class="active">Administrar Productos</li>
      </ol>
    </section>


    <section class="content">


      <div class="box">
        <div class="box-header with-border">
          
        <button class="btn btn-primary" data-toggle="modal" data-target ="#modalAgregarProducto"> 
          Agregar Producto 
        </button>
          
        </div>
        <div class="box-body">
          
          <table class="table table-bordered table-striped dt-responsive tablas" width="100%">

            <thead>
              <tr>
                <th style="width:10px">#</th>
                <th>Imagen</th>
                <th>Código</th>
                <th>Descripción</th>
                <th>Categoria</th>
                <th>Stock</th>
                <th>Precio Compra</th>
                <th>Precio Venta</th>
                <th>Agregado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody >
              <tr>
                <td>1</td>
                <td><img src="vistas/img/productos/default/anonymous.png" class="img-thumbnail" width="40px"></td>
                <td>0004</td>
                <td>Lorem ipsun Dolor sit amet</td>
                <td>Lorem ipsun</td>
                <td>20</td>
                <td>5000</td>
                <td>10000</td>
                <td>2022-11-26 16:48:01</td>
                <td>
                  <div class="btn-group">
                    <button class="btn btn-warning">
                      <i class="fa fa-pencil"></i>
                    </button>
                    <button class="btn btn-danger">
                      <i class="fa fa-times"></i>
                    </button>
                  </div>
                </td>
              </tr>

            </tbody>

          </table>

        </div>

      </div>


    </section>

</div>



<!-- MODAL CON BOOTSTRAP -->
<div id="modalAgregarProducto" class="modal fade" role="dialog">
  <div class="modal-dialog">
    <div class="modal-content">
      <form role="form" method="post" enctype="multipart/form-data">
        <div class="modal-header" style="background:#3c8dbc; color:white;">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="model-tittle" > Agregar Producto </h4>
        </div>
        <div class="modal-body">
          <div class="box-body">


            <div class="form-group">
              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-code"> </i></span>
                <input type="text" class="form-control input-lg" name="nuevoCodigo" placeholder="Ingresar Codigo" required>
              </div>
            </div>
            <!-- Descripción -->
            <div class="form-group">
              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-product-hunt"> </i></span>
                <input type="text" class="form-control input-lg" name="nuevaDescripcion" placeholder="Ingresar Descripción" required>
              </div>
            </div>
            
<!-- Seleccionar categoria  -->
            
            <div class="form-group">
              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-th"> </i></span>
                <select class=" form-control input-lg" name="nuevaCategoria" >
                  <option value=""> Seleccionar categoria</option>
                  <option value="Taladros"> Taladros </option>
                  <option value="Andamios"> Andamios</option>
                  <option value="XD"> XD</option>

                </select>
              </div>
            </div>

            <!-- stock -->
            <div class="form-group">
              <div class="input-group">
                <span class="input-group-addon"><i class="fa fa-check"> </i></span>
                <input type="number" class="form-control input-lg" name="nuevoStock" min="0" placeholder="Ingresar cantidad disponible" required>
              </div>
            </div>


            <!-- precio compra -->
            <div class="form-group row">

              <div class="col-xs-6">
                <div class="input-group">
                  <span class="input-group-addon"><i class="fa fa-arrow-up"> </i></span>
                  <input type="number" class="form-control input-lg" name="nuevoPrecioCompra" min="0" placeholder="Precio de compra" required>
                </div>
                
              </div>

               <!-- precio de venta  -->
              <div class="col-xs-6">
                <div class="input-group">
                  <span class="input-group-addon"><i class="fa fa-arrow-down"> </i></span>
                  <input type="number" class="form-control input-lg" name="nuevoPrecioVenta" min="0" placeholder="Precio de venta" required>
                </div>
                <br>
                <!-- Checkbox para porcentaje  -->
                <div class="col-xs-6" style="padding:0">
                  <div class="form-group">
                    <label>
                      <input type="checkbox" class="minimal porcentaje" checked>
                        Utilizar porcentaje
                    </label>
                  </div>
                </div>
                <!-- Entrada para porcentaje  -->
                <div class="col-xs-6">
                  <div class="input-group">
                    <input type="number" class="form-control input-lg nuevoPorcentaje min="0" value="25" required>
                    <span class="input-group-addon"><i class="fa fa-percent"></i></span>
                  </div>
                </div>
              </div>
               
            </div>

           
            
              <!-- Subir foto  -->


            <div class="form-group">
              <div class="panel">SUBIR IMAGEN</div>
              <input type="file" id="nuevaImagen" name="nuevaImagen">
              <p class="help-block">Peso maximo de la imagen 2MB.</p>
              <img src="vistas/img/productos/default/anonymous.png" class="img-thumbnail" width="100px">
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Salir</button>
          <button type="submit" class="btn btn-primary" data-dismiss="modal">Agregar Producto</button>
        </div>
      
      
      </form>
    </div>
  </div>


</div>