$(".button-none").click((e) => {
    if(e.target.id.slice(2) != $("#" + e.target.id).html() || e.target.id != "id" + e.target.id.slice(2)){
        $("#id").val(e.target.id.slice(1));
        $("#fieldSelect").val(e.target.id.charAt(0)).removeAttr("disabled");
        $("#content").val($("#" + e.target.id).html()).removeAttr("disabled");
    }
});

$("#edit-button").click(() => $("#id").removeAttr("disabled"));
