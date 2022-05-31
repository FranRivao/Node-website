$(".button-none").click((e) => {
    if(e.target.id.slice(-1) != $("#" + e.target.id).html()){
        $("#id").val(e.target.id.slice(3));
        $("#roleSelect").removeAttr("disabled");
    }
});

$("#addrol-button").click(() => {
    $("#id").removeAttr("disabled");
});