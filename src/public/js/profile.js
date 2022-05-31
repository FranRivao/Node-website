const infoPanel = $("#info-panel"),
    passwordPanel = $("#password-panel"),
    usernamePanel = $("#username-panel")

$("#info-panel-btn").click(() => {
    hideAll();
    infoPanel.is(":hidden") ? showMenu(infoPanel) : closeMenu(infoPanel);
});

$("#password-panel-btn").click(() => {
    if(passwordPanel.is(":hidden")){
        hideAll();
        showMenu(passwordPanel);
    } else {
        closeMenu(passwordPanel)
    }
});

$("#username-panel-btn").click(() => {
    if(usernamePanel.is(":hidden")){
        hideAll();
        showMenu(usernamePanel);
    } else {
        closeMenu(usernamePanel)
    }
});

// $("#info-account-btn").click(() => {
//     hideAll();
//     usernamePanel.is(":hidden") ? showMenu(usernamePanel) : closeMenu(usernamePanel);
// });

function showMenu(obj){
    obj.fadeIn(250)
}

function closeMenu(obj){
    obj.fadeOut(250)
}

function hideAll(){
    infoPanel.hide();
    passwordPanel.hide();
    usernamePanel.hide();
}