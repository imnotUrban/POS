// Evitar repetir categorias


$("#nuevaCategoria").change(function(){

    $(".alert").remove();

    var categoria = $(this).val();

    var datos = new FormData();

    datos.append("validarCategoria", categoria);


    $.ajax({
            url:"ajax/categorias.ajax.php",
            method: "POST",
            data: datos,
            cache: false,
            contentType: false,
            processData: false,
            dataType: "json",
            success: function(respuesta){

                // console.log("respuesta ", respuesta);
                
                if(respuesta){
                    $("#nuevaCategoria").parent().after('<div class="alert alert-warning"> Esta categoría ya existe en la base de datos!</div>');
                    $("#nuevaCategoria").val("");
                }

            }
    })
})




$(".tablas").on("click", ".btnEditarCategoria", function(){

	var idCategoria = $(this).attr("idCategoria");

	var datos = new FormData();
	datos.append("idCategoria", idCategoria);


	$.ajax({
		url: "ajax/categorias.ajax.php",
		method: "POST",
      	data: datos,
      	cache: false,
     	contentType: false,
     	processData: false,
     	dataType:"json",
     	success: function(respuesta){

            console.log(respuesta["categoria"]);
            $("#idCategoria").val(respuesta["id"]);
     		$("#editarCategoria").val(respuesta["categoria"]);

     	}

	})


})


$(".tablas").on("click", ".btnEliminarCategoria", function(){

    var idCategoria = $(this).attr("idCategoria");

    swal.fire({
        title: '¿Está seguro de borrar la categoría?',
        text: "¡Si no lo está puede cancelar la accíón!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: 'Cancelar',
          confirmButtonText: 'Si, borrar categoría!'
      }).then(function(result){
    
        if(result.value){
    
          window.location = "index.php?ruta=categorias&idCategoria="+idCategoria;
    
        }
    
      })



})