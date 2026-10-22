// =====================================================================
//  Cher's Wardrobe · computadora de outfits de Clueless (1995)
//  Basado en la plantilla base-bestiario: listas de imágenes por grupo,
//  un número aleatorio por grupo y un botón que mezcla.
//  Aquí hay CUATRO grupos (top, falda, zapatos, accesorio) y, cuando las
//  cuatro prendas pertenecen al mismo outfit real, se detona el MATCH:
//  aparece la foto del outfit completo, chispas y un sonido.
// =====================================================================

// ---------- 1. Los outfits completos (sirven para detectar el MATCH) ----------
const OUTFITS = {
  argyle:   { nombre: "Argyle azul · shopping day",      foto: "assets/img/fotos/argyle.jpg" },
  naranja:  { nombre: "Cuadros naranja · Tai",            foto: "assets/img/fotos/naranja.jpg" },
  tartan:   { nombre: "Tartán rojo · cuello alto",        foto: "assets/img/fotos/tartan.jpg" },
  colegio:  { nombre: "Chaleco rojo · día de clase",      foto: "assets/img/fotos/colegio.jpg" },
  amarillo: { nombre: "Cuadros amarillos · el icónico",   foto: "assets/img/fotos/amarillo.jpg" },
  otono:    { nombre: "Abrigo a cuadros · otoño",         foto: "assets/img/fotos/otono.jpg" },
  rosa:     { nombre: "Rosa y negro · Mean Girls",        foto: "assets/img/fotos/rosa.jpg" },
  plisada:  { nombre: "Falda plisada · cardigan crema",   foto: "assets/img/fotos/plisada.jpg" },
};

// ---------- 2. Listas de prendas por grupo (mínimo 3 por grupo) ----------
// Cada prenda tiene su imagen y el outfit al que pertenece (null = prenda suelta).
const PRENDAS = {
  top: [
    { src: "assets/img/tops/argyle.png",   outfit: "argyle" },
    { src: "assets/img/tops/naranja.png",  outfit: "naranja" },
    { src: "assets/img/tops/tartan.png",   outfit: "tartan" },
    { src: "assets/img/tops/colegio.png",  outfit: "colegio" },
    { src: "assets/img/tops/amarillo.png", outfit: "amarillo" },
    { src: "assets/img/tops/otono.png",    outfit: "otono" },
    { src: "assets/img/tops/rosa.png",     outfit: "rosa" },
    { src: "assets/img/tops/plisada.png",  outfit: "plisada" },
    { src: "assets/img/tops/karen.png",    outfit: null },
    { src: "assets/img/tops/celeste.png",  outfit: null },
    { src: "assets/img/tops/rojo.png",     outfit: null },
    { src: "assets/img/tops/cardigan.png", outfit: null },
  ],
  falda: [
    { src: "assets/img/faldas/argyle.png",   outfit: "argyle" },
    { src: "assets/img/faldas/naranja.png",  outfit: "naranja" },
    { src: "assets/img/faldas/tartan.png",   outfit: "tartan" },
    { src: "assets/img/faldas/colegio.png",  outfit: "colegio" },
    { src: "assets/img/faldas/amarillo.png", outfit: "amarillo" },
    { src: "assets/img/faldas/otono.png",    outfit: "otono" },
    { src: "assets/img/faldas/rosa.png",     outfit: "rosa" },
    { src: "assets/img/faldas/plisada.png",  outfit: "plisada" },
    { src: "assets/img/faldas/karen.png",    outfit: null },
    { src: "assets/img/faldas/negra.png",    outfit: null },
    { src: "assets/img/faldas/marino.png",   outfit: null },
  ],
  zapatos: [
    { src: "assets/img/zapatos/argyle.png",   outfit: "argyle" },
    { src: "assets/img/zapatos/naranja.png",  outfit: "naranja" },
    { src: "assets/img/zapatos/tartan.png",   outfit: "tartan" },
    { src: "assets/img/zapatos/colegio.png",  outfit: "colegio" },
    { src: "assets/img/zapatos/amarillo.png", outfit: "amarillo" },
    { src: "assets/img/zapatos/otono.png",    outfit: "otono" },
    { src: "assets/img/zapatos/rosa.png",     outfit: "rosa" },
    { src: "assets/img/zapatos/plisada.png",  outfit: "plisada" },
    { src: "assets/img/zapatos/karen.png",    outfit: null },
    { src: "assets/img/zapatos/botas.png",    outfit: null },
  ],
  acc: [
    { src: "assets/img/accesorios/argyle.png",   outfit: "argyle" },
    { src: "assets/img/accesorios/naranja.png",  outfit: "naranja" },
    { src: "assets/img/accesorios/tartan.png",   outfit: "tartan" },
    { src: "assets/img/accesorios/colegio.png",  outfit: "colegio" },
    { src: "assets/img/accesorios/amarillo.png", outfit: "amarillo" },
    { src: "assets/img/accesorios/otono.png",    outfit: "otono" },
    { src: "assets/img/accesorios/rosa.png",     outfit: "rosa" },
    { src: "assets/img/accesorios/plisada.png",  outfit: "plisada" },
    { src: "assets/img/accesorios/boina.png",    outfit: null },
    { src: "assets/img/accesorios/bolso.png",    outfit: null },
    { src: "assets/img/accesorios/medias.png",   outfit: null },
    { src: "assets/img/accesorios/aretes.png",   outfit: null },
  ],
};

const CATEGORIAS = ["top", "falda", "zapatos", "acc"];

// ---------- 3. Elementos del HTML ----------
const imagenes = {
  top: document.getElementById("imgTop"),
  falda: document.getElementById("imgFalda"),
  zapatos: document.getElementById("imgZapatos"),
  acc: document.getElementById("imgAcc"),
};
const botonBrowse = document.getElementById("botonBrowse");
const botonAuto = document.getElementById("botonAuto");
const botonDressMe = document.getElementById("botonDressMe");
const botonSonido = document.getElementById("botonSonido");
const botonMusica = document.getElementById("botonMusica");
const estado = document.getElementById("estado");
const resultado = document.getElementById("resultado");
const bandaResultado = document.getElementById("bandaResultado");
const fotoResultado = document.getElementById("fotoResultado");
const textoResultado = document.getElementById("textoResultado");
const panelPrincipal = document.getElementById("panelPrincipal");
const contenedorMusica = document.getElementById("musica");

// ---------- 4. Estado: índice elegido en cada grupo ----------
const indice = { top: 0, falda: 0, zapatos: 0, acc: 0 };
let sonidoActivo = true;
let musicaActiva = false;

// ---------- 5. Utilidades ----------
function numeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// Número aleatorio distinto al actual (si la lista tiene más de una opción)
function aleatorioDistinto(categoria) {
  const total = PRENDAS[categoria].length;
  if (total < 2) return 0;
  let nuevo = indice[categoria];
  while (nuevo === indice[categoria]) nuevo = numeroAleatorio(0, total);
  return nuevo;
}

function escribirEstado(texto) {
  estado.textContent = texto;
}

// ---------- 6. Mostrar una prenda en su ranura ----------
function mostrarPrenda(categoria) {
  const prenda = PRENDAS[categoria][indice[categoria]];
  const img = imagenes[categoria];
  const ranura = img.closest(".ranura");
  ranura.classList.remove("sinImagen");
  img.classList.remove("cambiando");
  void img.offsetWidth; // reinicia la animación
  img.classList.add("cambiando");
  img.src = prenda.src;
}

function mostrarTodo() {
  CATEGORIAS.forEach(mostrarPrenda);
}

// Si una imagen no carga, la ranura lo indica en lugar de quedar vacía
Object.values(imagenes).forEach((img) => {
  img.addEventListener("error", () => img.closest(".ranura").classList.add("sinImagen"));
});

// ---------- 7. Acciones de las flechas ◀◀ ▶ ▶▶ ----------
function cambiarPrenda(categoria, accion) {
  const total = PRENDAS[categoria].length;
  if (accion === "prev") indice[categoria] = (indice[categoria] - 1 + total) % total;
  if (accion === "next") indice[categoria] = (indice[categoria] + 1) % total;
  if (accion === "rand") indice[categoria] = aleatorioDistinto(categoria);
  ocultarResultado();
  mostrarPrenda(categoria);
  sonarClick();
  escribirEstado(`BROWSING ${nombreCategoria(categoria)}... ${indice[categoria] + 1}/${total}`);
}

function nombreCategoria(categoria) {
  return { top: "TOPS", falda: "BOTTOMS", zapatos: "SHOES", acc: "ACCESSORIES" }[categoria];
}

document.querySelectorAll(".controles").forEach((grupo) => {
  const categoria = grupo.dataset.categoria;
  grupo.querySelectorAll(".flecha").forEach((boton) => {
    boton.addEventListener("click", () => cambiarPrenda(categoria, boton.dataset.accion));
  });
});

// ---------- 8. BROWSE: mezcla las cuatro prendas al azar ----------
function browse() {
  ocultarResultado();
  CATEGORIAS.forEach((c) => (indice[c] = aleatorioDistinto(c)));
  mostrarTodo();
  sonarClick();
  escribirEstado("BROWSING... CLICK DRESS ME TO CHECK THE LOOK");
}

// ---------- 9. AUTO DRESS: arma un outfit completo real ----------
function autoDress() {
  ocultarResultado();
  const nombres = Object.keys(OUTFITS);
  const actual = outfitActual();
  let elegido = nombres[numeroAleatorio(0, nombres.length)];
  while (nombres.length > 1 && elegido === actual) elegido = nombres[numeroAleatorio(0, nombres.length)];
  CATEGORIAS.forEach((c) => {
    indice[c] = PRENDAS[c].findIndex((p) => p.outfit === elegido);
  });
  mostrarTodo();
  escribirEstado("AUTO DRESS... COMPUTING OUTFIT");
  // Pequeña pausa para que se vean las prendas antes de la detonación
  setTimeout(evaluar, 650);
}

// Devuelve el nombre del outfit si las cuatro prendas coinciden, o null
function outfitActual() {
  const grupos = CATEGORIAS.map((c) => PRENDAS[c][indice[c]].outfit);
  if (grupos[0] && grupos.every((g) => g === grupos[0])) return grupos[0];
  return null;
}

// ---------- 10. DRESS ME: evalúa la combinación ----------
function evaluar() {
  const match = outfitActual();
  if (match) {
    detonarMatch(match);
    return;
  }
  // ¿Cuántas prendas comparten outfit? (para dar pistas)
  const conteo = {};
  CATEGORIAS.forEach((c) => {
    const o = PRENDAS[c][indice[c]].outfit;
    if (o) conteo[o] = (conteo[o] || 0) + 1;
  });
  const mejor = Math.max(0, ...Object.values(conteo));
  detonarMismatch(mejor);
}

function detonarMatch(nombreOutfit) {
  const outfit = OUTFITS[nombreOutfit];
  resultado.hidden = false;
  resultado.className = "match";
  bandaResultado.textContent = "✓ MATCH!";
  fotoResultado.hidden = false;
  fotoResultado.src = outfit.foto;
  fotoResultado.alt = `Outfit completo: ${outfit.nombre}`;
  textoResultado.textContent = `${outfit.nombre} · AS IF!`;
  escribirEstado("TOTALLY MATCHING! YOU LOOK FABULOUS");
  lanzarChispas(24);
  sonarMatch();
}

function detonarMismatch(coincidencias) {
  resultado.hidden = false;
  resultado.className = "mismatch";
  bandaResultado.textContent = "MIS-MATCH!";
  fotoResultado.hidden = true;
  fotoResultado.removeAttribute("src");
  const pistas = ["AS IF! TRY AGAIN", "2 OF 4 PIECES BELONG TOGETHER", "SO CLOSE! 3 OF 4 PIECES MATCH"];
  textoResultado.textContent = coincidencias >= 2 ? pistas[coincidencias - 1] || pistas[2] : pistas[0];
  escribirEstado("MIS-MATCH! KEEP BROWSING");
  sonarMismatch();
}

function ocultarResultado() {
  resultado.hidden = true;
  resultado.className = "";
  panelPrincipal.querySelectorAll(".chispa").forEach((c) => c.remove());
}

// Al hacer clic sobre el resultado se vuelve a las prendas
resultado.addEventListener("click", () => {
  ocultarResultado();
  escribirEstado("BROWSING...");
});

function lanzarChispas(cantidad) {
  for (let i = 0; i < cantidad; i++) {
    const chispa = document.createElement("span");
    chispa.className = "chispa";
    chispa.style.left = `${numeroAleatorio(5, 95)}%`;
    chispa.style.top = `${numeroAleatorio(30, 95)}%`;
    chispa.style.animationDelay = `${numeroAleatorio(0, 600)}ms`;
    chispa.style.background = ["#fff", "#ffe36e", "#ff5fb0", "#9bf6ff"][i % 4];
    panelPrincipal.appendChild(chispa);
    setTimeout(() => chispa.remove(), 2000);
  }
}

botonBrowse.addEventListener("click", browse);
botonAuto.addEventListener("click", autoDress);
botonDressMe.addEventListener("click", () => {
  sonarClick();
  evaluar();
});

// ---------- 11. BONUS: sonidos sintetizados con Web Audio ----------
// No se usan archivos de audio: los tonos se generan en el navegador.
let contextoAudio = null;

function audio() {
  if (!sonidoActivo) return null;
  if (!contextoAudio) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    contextoAudio = new Ctx();
  }
  if (contextoAudio.state === "suspended") contextoAudio.resume();
  return contextoAudio;
}

function tono(frecuencia, inicio, duracion, tipo = "square", volumen = 0.08) {
  const ctx = audio();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = tipo;
  osc.frequency.setValueAtTime(frecuencia, ctx.currentTime + inicio);
  gain.gain.setValueAtTime(0.0001, ctx.currentTime + inicio);
  gain.gain.exponentialRampToValueAtTime(volumen, ctx.currentTime + inicio + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + inicio + duracion);
  osc.connect(gain).connect(ctx.destination);
  osc.start(ctx.currentTime + inicio);
  osc.stop(ctx.currentTime + inicio + duracion + 0.05);
}

function sonarClick() {
  tono(880, 0, 0.06, "square", 0.04);
}

function sonarMatch() {
  // Arpegio ascendente de computadora de los 90
  [523, 659, 784, 1047, 1319].forEach((f, i) => tono(f, i * 0.09, 0.25, "square", 0.07));
  tono(1568, 0.5, 0.6, "triangle", 0.06);
}

function sonarMismatch() {
  // Zumbido descendente de error
  tono(220, 0, 0.18, "sawtooth", 0.08);
  tono(160, 0.2, 0.35, "sawtooth", 0.08);
}

botonSonido.addEventListener("click", () => {
  sonidoActivo = !sonidoActivo;
  botonSonido.setAttribute("aria-pressed", String(sonidoActivo));
  botonSonido.textContent = sonidoActivo ? "SFX ON" : "SFX OFF";
  if (sonidoActivo) sonarClick();
});

// ---------- 12. Música de la página (YouTube, se carga al pulsar) ----------
const VIDEO_MUSICA = "XherTMC_FgA"; // Luscious Jackson - Here (enlace del material)

botonMusica.addEventListener("click", () => {
  musicaActiva = !musicaActiva;
  botonMusica.setAttribute("aria-pressed", String(musicaActiva));
  if (musicaActiva) {
    contenedorMusica.innerHTML = `<iframe title="Música de la página"
      src="https://www.youtube-nocookie.com/embed/${VIDEO_MUSICA}?autoplay=1&loop=1&playlist=${VIDEO_MUSICA}"
      allow="autoplay; encrypted-media" referrerpolicy="strict-origin-when-cross-origin"></iframe>`;
    contenedorMusica.hidden = false;
  } else {
    contenedorMusica.innerHTML = "";
    contenedorMusica.hidden = true;
  }
});

// ---------- 13. Estado inicial: la página nunca aparece vacía ----------
function iniciar() {
  // Arranca con un outfit real (sin revelar el match) para que la primera
  // pantalla se vea coherente, igual que la de Cher en la película.
  const nombres = Object.keys(OUTFITS);
  const inicial = nombres[numeroAleatorio(0, nombres.length)];
  CATEGORIAS.forEach((c) => (indice[c] = PRENDAS[c].findIndex((p) => p.outfit === inicial)));
  // Pero desordena dos prendas para que haya algo que resolver
  indice.zapatos = aleatorioDistinto("zapatos");
  indice.acc = aleatorioDistinto("acc");
  mostrarTodo();
  escribirEstado("WELCOME. BROWSE OR AUTO DRESS");
}

iniciar();
