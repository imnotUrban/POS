$.ajax({

    url: "ajax/datatable-ventas.ajax.php",
    success:function(respuesta){
        
    }
})

$('.tablaVentas').DataTable({
    "ajax": "ajax/datatable-ventas.ajax.php",
    "deferRender":true,
    "retrieve": true,
    "processing": true,
    "language": {

        "sProcessing":     "Procesando...",
        "sLengthMenu":     "Mostrar _MENU_ registros",
        "sZeroRecords":    "No se encontraron resultados",
        "sEmptyTable":     "Ningún dato disponible en esta tabla",
        "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_",
        "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0",
        "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
        "sInfoPostFix":    "",
        "sSearch":         "Buscar:",
        "sUrl":            "",
        "sInfoThousands":  ",",
        "sLoadingRecords": "Cargando...",
        "oPaginate": {
        "sFirst":    "Primero",
        "sLast":     "Último",
        "sNext":     "Siguiente",
        "sPrevious": "Anterior"
        },
        "oAria": {
            "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
            "sSortDescending": ": Activar para ordenar la columna de manera descendente"
        }

}
})

$(".tablaVentas tbody").on("click", "button.agregarProducto", function(){

    var idProducto = $(this).attr("idProducto");
    console.log(idProducto);

    $(this).removeClass("btn-primary agregarProducto");
    $(this).addClass("btn-default");

    var datos = new FormData();
    datos.append("idProducto", idProducto);

    $.ajax({
        url:"ajax/productos.ajax.php",
        method: "POST",
        data: datos,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function(respuesta){

            var descripcion = respuesta["descripcion"];
            var stock = respuesta["stock"];
            var precio = respuesta["precio_venta"];

            // Evitar agregar producto con stock = 0

            if(stock==0){
              Swal.fire({
                title: "No hay stock disponible del producto",
                icon: "error",
                type: "error",
                confirmButtonText: "¡Cerrar!"
              });

              $("button[idProducto='"+idProducto+"']").addClass("btn-primary agregarProducto");

              return;


            }

            $(".nuevoProducto").append(

              '<div class="row" style="padding:5px 15px">'+
  
          '<!-- Descripción del producto -->'+
              
              '<div class="col-xs-6" style="padding-right:0px">'+
              
                '<div class="input-group">'+
                  
                  '<span class="input-group-addon"><button type="button" class="btn btn-danger btn-xs quitarProducto" idProducto="'+idProducto+'"><i class="fa fa-times"></i></button></span>'+
  
                  '<input type="text" class="form-control nuevaDescripcionProducto" idProducto="'+idProducto+'" name="agregarProducto" value="'+descripcion+'" readonly required>'+
  
                '</div>'+
  
              '</div>'+
  
              '<!-- Cantidad del producto -->'+
  
              '<div class="col-xs-3">'+
                
                 '<input type="number" class="form-control nuevaCantidadProducto nuevaCantidadProducto" min="1" value="1" stock="'+stock+'" nuevoStock="'+Number(stock-1)+'" required>'+
  
              '</div>' +
  
              '<!-- Precio del producto -->'+
  
              '<div class="col-xs-3 ingresoPrecio" style="padding-left:0px">'+
  
                '<div class="input-group">'+
  
                  '<span class="input-group-addon"><i class="ion ion-social-usd"></i></span>'+
                  
                     
                  '<input type="text" class="form-control nuevoPrecioProducto" precioReal="'+precio+'" name="nuevoPrecioProducto" value="'+precio+'"  required>'+
     
                '</div>'+
                 
              '</div>'+
  
            '</div>') 
            sumarTotalPrecios();
            agregarDescuento();
            listarProductos();
            $(".nuevoPrecioProducto").number(true);
        }
    })
});

// Cuando cargue la tabla cada vez que navegue en ella

$(".tablaVentas").on("draw.dt",function(){

  if(localStorage.getItem("quitarProducto") !=null){
    var listaIdProductos = JSON.parse(localStorage.getItem("quitarProducto"));
    for(var i=0; i<listaIdProductos.length; i++){
      $("button.recuperarBoton[idProducto='"+listaIdProductos[i]["idProducto"]+"']").removeClass('btn-default');
      $("button.recuperarBoton[idProducto='"+listaIdProductos[i]["idProducto"]+"']").addClass('btn-primary agregarProducto');
    }
  }
});


//Quitar productos de la venta y recuperar botón
var idQuitarProducto = [];

localStorage.removeItem("quitarProducto");

$(".formularioVenta").on("click", "button.quitarProducto", function(){
  $(this).parent().parent().parent().parent().remove();
  var idProducto = $(this).attr("idProducto");


  // Almacenar en el local storage el id el producto a quitar 
  if(localStorage.getItem("quitarProducto")==null){
    idQuitarProducto = [];

  }else{
    idQuitarProducto.concat(localStorage.getItem("quitarProducto"));
  }
  idQuitarProducto.push({"idProducto":idProducto});
  localStorage.setItem("quitarProducto", JSON.stringify(idQuitarProducto));

  $("button.recuperarBoton[idProducto='"+idProducto+"']").remove('btn-default');
  $("button.recuperarBoton[idProducto='"+idProducto+"']").addClass('btn-primary agregarProducto');

  if($(".nuevoProducto").children().length==0){
    $("#nuevoDescuentoVenta").val(0);
    $("#nuevoTotalVenta").val(0);
    $("#totalVenta").val(0);
    $("#nuevoTotalVenta").attr("total",0);
  }else{

    sumarTotalPrecios();
    agregarDescuento();
    listarProductos();
  }


});



// Agregar producto desde dispositivos 

var numProducto = 0;




$(".btnAgregarProducto").click(function(){

  numProducto++;

  var datos = new FormData();

  datos.append("traerProductos","ok");

  $.ajax({

    url:"ajax/productos.ajax.php",
    method: "POST",
    data: datos,
    cache: false,
    contentType: false,
    processData: false,
    dataType: "json",
    success: function(respuesta){
      $(".nuevoProducto").append(

        '<div class="row" style="padding:5px 15px">'+

        '<!-- Descripción del producto -->'+
            
            '<div class="col-xs-6" style="padding-right:0px">'+
            
              '<div class="input-group">'+
                
                '<span class="input-group-addon"><button type="button" class="btn btn-danger btn-xs quitarProducto" idProducto><i class="fa fa-times"></i></button></span>'+

                '<select class="form-control nuevaDescripcionProducto" id="producto'+numProducto+'" idProducto name="nuevaDescripcionProducto" required>'+
                '<option> Seleccione el producto </option>'+
                '</select>'+
              '</div>'+

            '</div>'+

            '<!-- Cantidad del producto -->'+

            '<div class="col-xs-3 ingresoCantidad">'+
              
              '<input type="number" class="form-control nuevaCantidadProducto" name="nuevaCantidadProducto" min="1" value="0" stock nuevoStock required>'+

            '</div>' +

            '<!-- Precio del producto -->'+

            '<div class="col-xs-3 ingresoPrecio" style="padding-left:0px">'+

              '<div class="input-group">'+

                '<span class="input-group-addon"><i class="ion ion-social-usd"></i></span>'+
                  
                '<input type="text" class="form-control nuevoPrecioProducto" precioReal=""   required>'+

              '</div>'+
              
            '</div>'+

          '</div>');

          // Agregar los productos al select

          respuesta.forEach(funcionForEach);
          function funcionForEach(item, index){

            //Si no hay stock entonces no sale en la lista  
            if(item.stock != 0){

              $("#producto"+numProducto).append(

                '<option idProducto="'+item.id+'" value="'+item.descripcion+'">'+item.descripcion+'</option>'

            )
                
              
            }
          }
          sumarTotalPrecios();
          agregarDescuento();

          // Poner formato al precio de los productos 

          $(".nuevoPrecioProducto").number(true);


    }
    

  })

})



// Seleccionar producto ()
$(".formularioVenta").on("change", "select.nuevaDescripcionProducto", function(){

  var nombreProducto = $(this).val();
  var nuevaDescripcionProducto = $(this).parent().parent().parent().children().children().children(".nuevaDescripcionProducto");
  var nuevoPrecioProducto = $(this).parent().parent().parent().children(".ingresoPrecio").children().children(".nuevoPrecioProducto");
  var nuevaCantidadProducto = $(this).parent().parent().parent().children(".ingresoCantidad").children(".nuevaCantidadProducto");
  var datos = new FormData();
  datos.append("nombreProducto",nombreProducto);

  $.ajax({

    url:"ajax/productos.ajax.php",
    method: "POST",
    data: datos,
    cache: false,
    contentType: false,
    processData: false,
    dataType: "json",
    success: function(respuesta){
        $(nuevaDescripcionProducto).attr("idProducto", respuesta["id"]);
        $(nuevaCantidadProducto).attr("stock", respuesta["stock"]);
        $(nuevaCantidadProducto).attr("nuevoStock", Number(respuesta["stock"])-1);
        $(nuevoPrecioProducto).val(respuesta["precio_venta"]);
        $(nuevoPrecioProducto).attr("precioReal",respuesta["precio_venta"]);
        listarProductos();
    }})

    
    // 

})







// Modificar la cantidad 


$(".formularioVenta").on("change", "input.nuevaCantidadProducto", function(){

  var precio = $(this).parent().parent().children(".ingresoPrecio").children().children(".nuevoPrecioProducto");
  var precioFinal = $(this).val() * precio.attr("precioReal");
  precio.val(precioFinal);

  var nuevoStock = Number($(this).attr("stock")) - $(this).val();
  $(this).attr("nuevoStock",nuevoStock);
  if($(this).val() > Number($(this).attr("stock"))){
    $(this).val(0); 

    // Si la cantidad es uperior al stock regresa todo a los valores iniciales 
    var precioFinal = $(this).val() * precio.attr("precioReal");
    precio.val(precioFinal);
    sumarTotalPrecios();
    Swal.fire({
      title: "La cantidad supera el stock",
      text: "Solo hay "+$(this).attr("stock")+" unidades",
      icon: "error",
      type: "error",
      confirmButtonText: "¡Cerrar!"
    });
  }
  sumarTotalPrecios();
  agregarDescuento();
  listarProductos();


})


// Suma total de precios 

function sumarTotalPrecios(){

  var precioItem = $(".nuevoPrecioProducto");
  var arraySumaPrecio = [];
  for(var i=0; i<precioItem.length; i++){

    arraySumaPrecio.push(Number($(precioItem[i]).val()));
    
  }
  function sumarArrayPrecios(total, numero){

    return total + numero;
  }
  var sumaTotalPrecio = arraySumaPrecio.reduce(sumarArrayPrecios);
  $("#nuevoTotalVenta").val(sumaTotalPrecio);
  $("#totalVenta").val(sumaTotalPrecio);
  $("#nuevoTotalVenta").attr("total",sumaTotalPrecio);

}


// Funcion Agregar Descuento 
function agregarDescuento(){
  var descuento = $("#nuevoDescuentoVenta").val();
  var precioTotal = $("#nuevoTotalVenta").attr("total");

  precioDescuento = Number(precioTotal * (descuento/100));

  totalConDescuento = Number(precioTotal) - Number(precioDescuento);

  $("#nuevoTotalVenta").val(totalConDescuento);
  $("#totalVenta").val(totalConDescuento);
  $("#nuevoPrecioDescuento").val(precioDescuento);
  $("#precioSinDescuento").val(precioTotal);

}



// Cuando Cambie el impuesto 


$("#nuevoDescuentoVenta").change(function(){


  agregarDescuento();

})

// Formato al p recio final 
$("#nuevoTotalVenta").number(true);



// Seleccionar metodo de pago

$("#nuevoMetodoPago").change(function(){

  var metodo = $(this).val()

  if(metodo == "Efectivo"){
    $(this).parent().parent().removeClass("col-xs-6");
    $(this).parent().parent().addClass("col-xs-4");
    $(this).parent().parent().parent().children(".cajasMetodoPago").html('<div class="col-xs-4" >'
    + '<div class="input-group">'+
    '<span class="input-group-addon"><i class="ion ion-social-usd"></i></span>'+
    '<input type="text" class="form-control" id="nuevoValorEfectivo" placeholder="00000000" required>'+
    '</div>'+
    '</div>'+

    '<div class="col-xs-4" id="capturarCambioEfectivo" style="padding-left:0px">'+
    '<div class="input-group">'+

    '<span class="input-group-addon"><i class="ion ion-social-usd"></i></span>'+
    '<input type="text" class="form-control" id="nuevoCambioEfectivo" name="nuevoCambioEfectivo" placeholder="00000" readonly required>'+

    '</div>'+
    '</div>'
    )
    // Agregar formato al precio 
    $("#nuevoValorEfectivo").number(true);
    $("#nuevoCambioEfectivo").number(true);
    listarMetodos();
  }else{
    $(this).parent().parent().removeClass("col-xs-4");
    $(this).parent().parent().addClass("col-xs-6");
    $(this).parent().parent().parent().children(".cajasMetodoPago").html('<div class="col-xs-6" style="padding-left: 0px;">'+ 
    '<div class="input-group">'+
      '<input type="text" class="form-control" id="nuevoCodigoTransaccion" name="nuevoCodigoTransaccion" placeholder="Codigo Transaccion"  required>'+
              '<span class="input-group-addon"><i class="fa fa-lock"></i></span>'+
    '</div>'+
  '</div>')
  }


})



// Cambio en efectivo 

$(".formularioVenta").on("change", "input#nuevoValorEfectivo", function(){

  var efectivo = $(this).val();
  var cambio = Number(efectivo) - Number($("#nuevoTotalVenta").val());
  var nuevoCambioEfectivo = $(this).parent().parent().parent().children('#capturarCambioEfectivo').children().children('#nuevoCambioEfectivo');
  nuevoCambioEfectivo.val(cambio);
})
// Cambio en transaccion 

$(".formularioVenta").on("change", "input#nuevoCodigoTransaccion", function(){

  listarMetodos();
})


// Agrupar todos los productos 


function listarProductos(){

  var listarProductos = [];



  var descripcion = $(".nuevaDescripcionProducto");
  var cantidad = $(".nuevaCantidadProducto");
  var precio = $(".nuevoPrecioProducto");
  // var total = 
  // var id = 


  for(var i=0; i<descripcion.length; i++){

    listarProductos.push({"id":$(descripcion[i]).attr("idProducto"),
                          "descripcion": $(descripcion[i]).val(),
                          "cantidad": $(cantidad[i]).val(),
                          "stock": $(cantidad[i]).attr("nuevoStock"),
                          "precio": $(precio[i]).attr("precioReal"),
                          "total": $(precio[i]).val(),
  
  } )

  }

 

  $("#listaProductos").val(JSON.stringify(listarProductos));

}




function listarMetodos(){

  var listaMetodos = "";
  if($("#nuevoMetodoPago").val()=="Efectivo"){
    $("#listaMetodoPago").val("Efectivo");
  }else{
    $("#listaMetodoPago").val($("#nuevoMetodoPago").val()+"-"+$("#nuevoCodigoTransaccion").val());
  }

}

// Boton editar ventas 

$(".tablas tbody").on("click", "button.btnEditarVenta", function(){



  var idVenta = $(this).attr("idVenta");

  window.location = "index.php?ruta=editar-venta&idVenta="+idVenta;

})




function quitarAgregarProducto(){

	//Capturamos todos los id de productos que fueron elegidos en la venta
	var idProductos = $(".quitarProducto");

	//Capturamos todos los botones de agregar que aparecen en la tabla
	var botonesTabla = $(".tablaVentas tbody button.agregarProducto");

	//Recorremos en un ciclo para obtener los diferentes idProductos que fueron agregados a la venta
	for(var i = 0; i < idProductos.length; i++){

		//Capturamos los Id de los productos agregados a la venta
		var boton = $(idProductos[i]).attr("idProducto");
		
		//Hacemos un recorrido por la tabla que aparece para desactivar los botones de agregar
		for(var j = 0; j < botonesTabla.length; j ++){

			if($(botonesTabla[j]).attr("idProducto") == boton){

				$(botonesTabla[j]).removeClass("btn-primary agregarProducto");
				$(botonesTabla[j]).addClass("btn-default");

			}
		}

	}
	
}

/*=============================================
CADA VEZ QUE CARGUE LA TABLA CUANDO NAVEGAMOS EN ELLA EJECUTAR LA FUNCIÓN:
=============================================*/

$('.tablaVentas').on( 'draw.dt', function(){

	quitarAgregarProducto();

})



// Borrar Venta 


$(".tablas tbody").on("click", "button.btnEliminarVenta", function(){


  var idVenta = $(this).attr("idVenta");

  Swal.fire({
    title: '¿Está seguro de anular la venta?',
    text: "¡Si no lo está puede cancelar la acción!",
    type: 'warning',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Si, anular venta!'
  }).then(function(result){
    if (result.value) {
      
      window.location = "index.php?ruta=ventas&idVenta="+idVenta;
    }

})

  

})



/* Imprimir Factura */

$(".tablas").on("click", ".btnImprimirFactura", function(){

  var codigoVenta = $(this).attr("codigoVenta");

  window.open("extensiones/tcpdf/pdf/factura.php?codigo="+codigoVenta, "_blank");

})

/*

Local storage
*/ 

if(localStorage.getItem("capturarRango")!=null){
  $("#daterange-btn span").html(localStorage.getItem("capturarRango"));
}else{
  $("#daterange-btn span").html('<i class="fa fa-calendar"></i> Rango de fecha');

}


/* 
Rango de fechas
*/

$('#daterange-btn').daterangepicker(
  {
    ranges   : {
      'Hoy'       : [moment(), moment()],
      'Ayer'   : [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      'Últimos 7 días' : [moment().subtract(6, 'days'), moment()],
      'Últimos 30 días': [moment().subtract(29, 'days'), moment()],
      'Este mes'  : [moment().startOf('month'), moment().endOf('month')],
      'Último mes'  : [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    },
    startDate: moment(),
    endDate  : moment()
  },
  function (start, end) {
    $('#daterange-btn span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));

    var fechaInicial = start.format('YYYY-MM-DD');

    var fechaFinal = end.format('YYYY-MM-DD');

    var capturarRango = $("#daterange-btn span").html();
   
   	localStorage.setItem("capturarRango", capturarRango);

   	window.location = "index.php?ruta=ventas&fechaInicial="+fechaInicial+"&fechaFinal="+fechaFinal;

  }

)


/**Cancelar rango de fechas */
$(".daterangepicker .range_inputs .cancelBtn").on("click", function(){
  localStorage.removeItem("capturarRango");
  localStorage.clear();
  window.location = "ventas";

})

/**Capturar hoy */

$(".daterangepicker.opensright .ranges li").on("click", function () {
  var textoHoy = $(this).attr("data-range-key");
  if (textoHoy == "Hoy") {
    var d = new Date();
    var dia = ("0" + d.getDate()).slice(-2)
    var mes = ("0" + (d.getMonth() + 1)).slice(-2);
    var año = d.getFullYear();
    var fechaInicial = año + "-" + mes + "-" + dia;
    var fechaFinal = año + "-" + mes + "-" + dia;
    localStorage.setItem("capturarRango2", "Hoy");
    window.location = "index.php?ruta=reportes&fechaInicial=" + fechaInicial + "&fechaFinal=" + fechaFinal;
  }
})







