// Lista de mensajes predefinidos
const mensajes = [
  "Te amo mucho ❤️",
  "¿Recordás cuando fuimos al puente juntos?",
  "🎵 <iframe src='https://open.spotify.com/embed/track/xyz' width='100%' height='80' frameborder='0' allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'></iframe>",
  "📸 <img src='https://via.placeholder.com/150' alt='Recuerdo' style='max-width:100%'>",
  "📹 <iframe width='100%' height='200' src='https://www.youtube.com/embed/dQw4w9WgXcQ' frameborder='0' allowfullscreen></iframe>"
];

// Referencias a los elementos del DOM
const frascoLleno = document.getElementById('frascoLleno');
const frascoVacio = document.getElementById('frascoVacio');
const album = document.getElementById('album');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');

// Cargar mensajes en el frasco lleno
mensajes.forEach(msg => {
  const div = document.createElement('div');
  div.className = 'mensaje';
  div.innerText = msg.replace(/<[^>]*>?/gm, '').slice(0, 30) + '...';
  div.onclick = () => mostrarMensaje(msg);
  frascoLleno.appendChild(div);
});

// Mostrar mensaje completo en modal y moverlo al frasco vacío y álbum
function mostrarMensaje(msg) {
  modal.style.display = 'flex';
  modalContent.innerHTML = msg;

  const divVacio = document.createElement('div');
  divVacio.className = 'mensaje';
  divVacio.innerText = msg.replace(/<[^>]*>?/gm, '').slice(0, 30) + '...';
  frascoVacio.appendChild(divVacio);

  const divAlbum = document.createElement('div');
  divAlbum.className = 'mensaje';
  divAlbum.innerHTML = msg;
  album.appendChild(divAlbum);
}

// Cerrar modal al hacer clic fuera
modal.onclick = () => {
  modal.style.display = 'none';
};

// Cambiar entre modo claro y oscuro
document.getElementById('toggle-modo').onclick = () => {
  document.body.classList.toggle('modo-oscuro');
};

// Generar estrellas al azar para el cielo nocturno
for (let i = 0; i < 50; i++) {
  const estrella = document.createElement('div');
  estrella.className = 'estrella';
  estrella.style.top = Math.random() * 100 + '%';
  estrella.style.left = Math.random() * 100 + '%';
  document.querySelector('.escena').appendChild(estrella);
}
