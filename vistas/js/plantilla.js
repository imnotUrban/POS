// sidemenu bar 
$('.sidebar-menu').tree()



// DataTable

$(".tablas").DataTable({
    "language":{

        "sProcessing":      "Procesando...",
        "sLengthMenu":      "Motrar  _MENU_  registros",
        "sZeroRecords":     "No se encontraron resultados",
        "sEmptyTable":      "Ningún dato disponible en esta tabla",
        "sInfo":            "Mostrando registros del _START_ al _END_ de un total de _TOTAL_",
        "sInfoEmpty":       "Mostrando registros del 0 al 0 de un total de 0",
        "sInfoFiltered":    "(Filtrando de un total de _MAX_ registros",
        "sInfoPostFix":     "",
        "sSearch":          "Buscar:",
        "sUrl":             "",
        "sInfoThousands":   ",",
        "sLoadingRecords":  "Cargando...",
        "oPaginate":   {
        "sFirst":           "Primero",
        "sLast":            "Ultimo",
        "sNext":            "Siguiente",
        "sPrevious":        "Anterior"
        },
        "oAria":{

            "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
            "sSortDescending": ": Activar para ordenar la columna de manera descendente"
        }


    }

});




// i check 
$('input[type="checkbox"].minimal, input[type="radio"].minimal').iCheck({
    checkboxClass: 'icheckbox_minimal-blue',
    radioClass   : 'iradio_minimal-blue'
  })



// InputMASK

//Datemask dd/mm/yyyy
$('#datemask').inputmask('dd/mm/yyyy', { 'placeholder': 'dd/mm/yyyy' })
//Datemask2 mm/dd/yyyy
$('#datemask2').inputmask('mm/dd/yyyy', { 'placeholder': 'mm/dd/yyyy' })
//Money Euro
$('[data-mask]').inputmask()
