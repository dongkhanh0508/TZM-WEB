function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        var extension = input.files[0].name.split('.').pop();
        if (extension != "jpg" && extension != "png") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Only accept png and jpg file',
            })
            return;
        }
        reader.onload = function (e) {
            $('#imageResult')
                .attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}
$(function () {
    $('#upload').on('change', function () {
        var extension = input.files[0].name.split('.').pop();
        if (extension != "jpg" && extension != "png") {
            return;
        }
        readURL(input);
    });
});
var input = document.getElementById('upload');
input.addEventListener('change', showFileName);
function showFileName(event) {
    var input = event.srcElement;
    var extension = input.files[0].name.split('.').pop();
    if (extension != "jpg" && extension != "png") {
        return;
    }
    $('#btn-update').attr('disabled', false);
    var fileName = input.files[0].name;
    $('#file_input').val('File name: ' + fileName);
}
function readURL1(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        var extension = input.files[0].name.split('.').pop();
        if (extension != "jpg" && extension != "png") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Only accept png and jpg file',
            })
            return;
        }
        reader.onload = function (e) {
            $('#imageResult-add')
                .attr('src', e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}
$(function () {
    $('#upload-add').on('change', function () {
        var extension = input1.files[0].name.split('.').pop();
        if (extension != "jpg" && extension != "png") {
            return;
        }
        readURL(input1);
    });
});
var input1 = document.getElementById('upload-add');
input1.addEventListener('change', showFileName1);
function showFileName1(event) {
    var input1 = event.srcElement;
    var extension = input1.files[0].name.split('.').pop();
    if (extension != "jpg" && extension != "png") {
        return;
    }

    var fileName = input1.files[0].name;
    $('#file_input_add').val('File name: ' + fileName);
}
function parseTimeSlot(data, id) {
    if (data == null) return "";
    //if (data.length < 4) return "";
    var results = "";
    var res = data.toString().split("");
    if (res[0] == "1") {
        results = results + '<label class="label label-success">0-6h</label>';
    }
    if (res[1] == "1") {
        results = results + '<label class="label label-success">0-12h</label>';
    }
    if (res[2] == "1") {
        results = results + '<label class="label label-success">12-18h</label>';
    }
    if (res[3] == "1") {
        results = results + '<label class="label label-success">18-0h</label>';
    }
    $('.' + id).append(results);
    return results;
}