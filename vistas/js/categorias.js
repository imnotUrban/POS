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


//Editar categorias
$(document).on("click", ".btnEditarCategoria", function(){


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
        dataType: "json",
        success: function(respuesta){
           $("#editarCategoria").val(respuesta["categoria"])
           $("#idCategoria").val(respuesta["id"])
           
        }

    });

})

