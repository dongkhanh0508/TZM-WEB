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