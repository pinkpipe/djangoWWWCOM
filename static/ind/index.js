var modal = document.getElementById('myModal')
var modalMenu = document.getElementById('ModalMenu')

function openMenu () {
    modalMenu.style.left = '0';
}


function closeMenu() {
    modal.style.left = '-288px'; // Запускаем плавный переход скрытия
}

window.onclick = function (event) {
    if (event.target != modalMenu) {
        closeMenu();
    }
}

