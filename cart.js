document.addEventListener('DOMContentLoaded', () => {
    console.log("Archivo cart.js cargado correctamente");

    let saskia = [];
    const korgatuaZenbat = document.getElementById('korgatua-zenbat');
    const modala = document.getElementById('korgatua-modala');
    const irekiBtn = document.getElementById('ireki-korgatua');
    const itxiBtn = document.querySelector('.itxi');

   // 1. Añadir productos
    document.querySelectorAll('.erosi-button').forEach((botoia) => {
        botoia.addEventListener('click', (e) => {
            const kutxa = botoia.closest('.produktu-kutxa');
            if (!kutxa) return;

            const izena = kutxa.querySelector('.goiburua').innerText;
            const prezioaStr = kutxa.querySelector('.kokapena').innerText;
            const prezioa = parseFloat(prezioaStr.replace('€', '').replace(',', '.'));
            
            // NUEVO: Atrapamos la ruta de la imagen
            const irudia = kutxa.querySelector('.produktu-irudia img').src;

            saskia.push({ izena, prezioa, irudia }); // Añadimos la imagen al objeto
            eguneratuSaskia();
        });
    });

    function eguneratuSaskia() {
    if (korgatuaZenbat) korgatuaZenbat.innerText = saskia.length;
    
    const zerrenda = document.getElementById('korgatua-zerrenda');
    const totalaTxt = document.getElementById('prezio-totala');
    
    if (zerrenda) {
        zerrenda.innerHTML = "";
        let totala = 0;

        saskia.forEach((item, index) => {
            // "data-index" erabiltzen dugu jakiteko zein den
            zerrenda.innerHTML += `
                <div class="korgatua-item">
                    <img src="${item.irudia}" class="mini-irudia">
                    <div class="item-info">
                        <span class="item-izena">${item.izena}</span>
                        <span class="item-prezioa">${item.prezioa.toFixed(2)}€</span>
                    </div>
                    <button class="kendu-btn" onclick="kenduProduktua(${index})">&times;</button>
                </div>
            `;
            totala += item.prezioa;
        });
        totalaTxt.innerText = totala.toFixed(2);
    }
}

// Funtzio berri hau fitxategiaren amaieran jarri (DOMContentLoaded-en BARRUAN)
window.kenduProduktua = function(index) {
    saskia.splice(index, 1); // Zerrendako elementu hori kentzen du
    eguneratuSaskia();      // Saskia berriro marrazten du
};
    // 2. Abrir el carrito
    if (irekiBtn && modala) {
        irekiBtn.onclick = (e) => {
            e.preventDefault();
            console.log("Intentando abrir el modal...");
            modala.style.display = "block";
        };
    }

    // 3. Cerrar el carrito
    if (itxiBtn) {
        itxiBtn.onclick = () => { modala.style.display = "none"; };
    }

    window.onclick = (event) => {
        if (event.target == modala) modala.style.display = "none";
    };
});
// Botón de finalizar compra
    const erosiFinala = document.querySelector('.modala-edukia .erosi-button');
    if (erosiFinala) {
        erosiFinala.onclick = () => {
            if (saskia.length > 0) {
                alert("Eskerrik asko! Zure eskaera jaso dugu.");
                saskia = []; // Vaciamos el array
                eguneratuSaskia();
                modala.style.display = "none";
            } else {
                alert("Saskia hutsik dago!");
            }
        };
    }