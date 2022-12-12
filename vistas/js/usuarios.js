// Subir fotos del usuario
$(".nuevaFoto").change(function(){
    var imagen = this.files[0];


    // Validar formato de imagen  (JPG O PNG)
    if(imagen["type"] != "image/jpeg" && imagen["type"] != "image/png"){
        $(".nuevaFoto").val("");

        Swal.fire({
            icon: 'error',
            title: "Error al subir la imagen",
            text: "La imagen debe estar en formato JPG o PNG",
            type: "error",
            confirmButtonText: "Cerrar"

        });


    }else if(imagen['size']>2000000){
        $(".nuevaFoto").val("");

        Swal.fire({
            icon: 'error',
            title: "Error al subir la imagen",
            text: "La imagen debe pesar menos de 2MB",
            type: "error",
            confirmButtonText: "Cerrar"

        });
    }else{
        var datosImagen = new FileReader;
        datosImagen.readAsDataURL(imagen);

        $(datosImagen).on("load",function(event){
            var rutaImagen = event.target.result;
            $(".previsualizar").attr("src",rutaImagen);
        }
        )
    }

})



// Editar usuarios

$(document).on("click", ".btnEditarUsuario", function(){

    var idUsuario = $(this).attr("idUsuario");


    var datos = new FormData();
    datos.append("idUsuario", idUsuario);

    $.ajax({

        url: "ajax/usuarios.ajax.php",
        method: "POST",
        data: datos,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function(respuesta){
            $("#editarNombre").val(respuesta["nombre"]);
            $("#editarUsuario").val(respuesta["usuario"]);
            $("#editarPerfil").html(respuesta["perfil"]);
            $("#editarPerfil").val(respuesta["perfil"]);
            $("#passwordActual").val(respuesta["password"]);
            $("#fotoActual").val(respuesta["foto"]);

            if(respuesta["foto"]!= ""){
                $(".previsualizar").attr("src",respuesta["foto"]);
            }
        }

    });

})




// Activar usuarios 
$(document).on("click", ".btnActivar", function(){



    var idUsuario = $(this).attr("idUsuario");
    var estadoUsuario = $(this).attr("estadoUsuario");

    var datos = new FormData();
    datos.append("activarId", idUsuario);
    datos.append("activarUsuario", estadoUsuario);


    $.ajax({
		url:"ajax/usuarios.ajax.php",
		type:"POST",
		data:datos,
		cache:false,
		contentType:false,
		processData:false,
		success:function(respuesta){
			if(window.matchMedia("(max-width:767px)").matches){
				swal.fire({
					type:"success",
					title:"¡Ok!",
					text:"¡La información fue actualizada con éxito!",
					showConfirmButton:true,
					confirmButtonText:"Cerrar"
				}).then((result)=>{
					if(result.value){
						window.location="usuarios";}
				});}}
	});

    if(estadoUsuario == 0){
        $(this).removeClass('btn-success');
        $(this).addClass('btn-danger');
        $(this).html('Desactivado');
        $(this).attr('estadoUsuario',1)
    }else{
        $(this).addClass('btn-success');
        $(this).removeClass('btn-danger');
        $(this).html('Activado');
        $(this).attr('estadoUsuario',0)
    }
})



// Revisa si el usuario ya está registrado 

$("#nuevoUsuario").change(function(){

    $(".alert").remove();

    var usuario = $(this).val();

    var datos = new FormData();

    datos.append("validarUsuario", usuario);


    $.ajax({
        url: "ajax/usuarios.ajax.php",
            method: "POST",
            data: datos,
            cache: false,
            contentType: false,
            processData: false,
            dataType: "json",
            success: function(respuesta){
                
                if(respuesta){
                    $("#nuevoUsuario").parent().after('<div class="alert alert-warning"> Este usuario ya existe en la base de datos!</div>');
                    $("#nuevoUsuario").val("");
                }

            }
    })
})


// Eliminar usuario 

$(document).on("click", ".btnEliminarUsuario", function(){

    var idUsuario = $(this).attr("idUsuario");
    var fotoUsuario = $(this).attr("fotoUsuario");
    var usuario = $(this).attr("usuario");
  
    swal.fire({
      title: '¿Está seguro de borrar el usuario?',
      text: "¡Si no lo está puede cancelar la accíón!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si, borrar usuario!'
    }).then(function(result){
  
      if(result.value){
  
        window.location = "index.php?ruta=usuarios&idUsuario="+idUsuario+"&usuario="+usuario+"&fotoUsuario="+fotoUsuario;
  
      }
  
    })
  
  })