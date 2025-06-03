// === VARIABLES DEL DOM ===
const toggleBtn = document.getElementById('toggle-modo');
const body = document.body;
const astro = document.getElementById('astro');
const canvas = document.getElementById('fondoEstrellas');
const ctx = canvas.getContext('2d');
const frascoLleno = document.getElementById('contenidoLleno');
const frascoVacio = document.getElementById('contenidoVacio');
const album = document.getElementById('album');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
const contadorLleno = document.getElementById('contadorLleno');
const contadorVacio = document.getElementById('contadorVacio');

let estrellas = [];

// === FUNCIONALIDAD MODO CLARO / OSCURO ===
toggleBtn.addEventListener('click', () => {
  body.classList.toggle('modo-oscuro');
});

// === AJUSTAR TAMAÑO CANVAS ===
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = document.querySelector('.escena').offsetHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// === GENERAR ESTRELLAS PARA CANVAS ===
function generarEstrellas(cantidad = 100) {
  estrellas = [];
  for (let i = 0; i < cantidad; i++) {
    estrellas.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      o: Math.random()
    });
  }
}

function dibujarEstrellas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'white';
  estrellas.forEach(e => {
    ctx.globalAlpha = e.o;
    ctx.beginPath();
    ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;
}

// === ANIMACIÓN DE ESTRELLAS ===
function animar() {
  estrellas.forEach(e => {
    e.o += (Math.random() - 0.5) * 0.05;
    e.o = Math.max(0.2, Math.min(e.o, 1));
  });
  dibujarEstrellas();
  requestAnimationFrame(animar);
}

// === CARGAR MENSAJES DESDE JSON ===
async function cargarMensajes() {
  try {
    const res = await fetch('mensajes.json');
    const data = await res.json();
    actualizarFrascoLleno(data);
  } catch (e) {
    console.error('Error al cargar mensajes:', e);
  }
}

function actualizarFrascoLleno(mensajes) {
  frascoLleno.innerHTML = '';
  mensajes.forEach((msg, index) => {
    const estrella = document.createElement('div');
    estrella.className = 'estrella-item';
    estrella.title = 'Click para abrir';
    estrella.innerText = '★';
    estrella.dataset.index = index;
    estrella.addEventListener('click', () => mostrarMensaje(msg, estrella));
    frascoLleno.appendChild(estrella);
  });
  contadorLleno.innerText = `${mensajes.length} estrellas`;
}

function mostrarMensaje(msg, estrella) {
  modal.style.display = 'flex';
  modalContent.innerText = msg;

  const clon = estrella.cloneNode(true);
  frascoVacio.appendChild(clon);
  estrella.remove();

  contadorVacio.innerText = `${frascoVacio.children.length} recuerdos`;
  contadorLleno.innerText = `${frascoLleno.children.length} estrellas`;

  // También agregar al álbum
  const recordatorio = document.createElement('div');
  recordatorio.className = 'mensaje';
  recordatorio.innerText = msg;
  album.appendChild(recordatorio);

  // Sonido opcional
  const audio = new Audio('estrella.mp3');
  audio.play().catch(() => {});
}

modal.addEventListener('click', () => {
  modal.style.display = 'none';
});

// === INICIO ===
generarEstrellas();
animar();
cargarMensajes();
