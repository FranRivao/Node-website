let sume = 0;
    for (let i = 0; i < $(".cart-amount").length; i++) {
        sume += parseInt($(".cart-amount")[i].textContent);
    }
sume = 20 - sume;

$("#cart-space").html(sume + '/20');
$(".space").val(sume);

$(".add_form").submit((e) => {
    const amount = e.currentTarget[1].value;
    let cartSpace = $("#cart-space").html();

    cartSpace = cartSpace.substr(0, 2);
    cartSpace = parseInt(cartSpace);
    cartSpace -= amount;

    cartSpace < 0 ? e.preventDefault() : null;
});
