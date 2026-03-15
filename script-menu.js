const btnHambu = document.getElementById('btn-hamburguesa');
const menuLista = document.getElementById('menu-lista');
const overlay = document.getElementById('overlay');
const menuLinks = document.querySelectorAll('.menua a');

const toggleMenu = () => {
    btnHambu.classList.toggle('aktibatuta');
    menuLista.classList.toggle('irekita');
    overlay.classList.toggle('irekita');
};

btnHambu.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);
menuLinks.forEach(link => link.addEventListener('click', toggleMenu));