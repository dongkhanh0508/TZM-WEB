$(document).ready(function () {
    $('#res-config').DataTable({
        responsive: true
    });
    var newcs = $('#new-cons').DataTable(
        {
            "columnDefs": [{
                "searchable": false,
                "orderable": false,
                "targets": 0
            }],           
            "order": [[1, 'asc']]
        }
    );
    newcs.on('order.dt search.dt', function () {
        newcs.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
            cell.innerHTML = i + 1;
        });
    }).draw();

    new $.fn.dataTable.Responsive(newcs);

    $('#show-hide-res').DataTable({
        responsive: {
            details: {
                display: $.fn.dataTable.Responsive.display.childRowImmediate,
                type: ''
            }
        }
    });
});