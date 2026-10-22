# Cher's Wardrobe · Clueless Outfit Generator

Recreación interactiva de la computadora que usa Cher Horowitz en *Clueless* (1995) para elegir su ropa, hecha con **HTML + CSS + JavaScript** puro, sin dependencias, lista para publicarse en GitHub Pages.

Parte de la plantilla [`anattolia/base-bestiario`](https://github.com/anattolia/base-bestiario) (misma estructura: `index.html`, `estilo.css`, `script.js`, `assets/img/`) y cumple los requisitos del bot:

| Requisito | Cómo se cumple |
| --- | --- |
| Partir del repositorio forkeado | Misma estructura y lógica base (listas de imágenes + índice aleatorio por grupo + botón que mezcla). |
| 4 grupos de imágenes de por lo menos 3 imágenes | **TOP** (12), **BOTTOM** (11), **SHOES** (10) y **ACCESSORY** (12). |
| Cuando coincida un grupo en particular detona algo nuevo | Cuando las cuatro prendas pertenecen al mismo outfit real, al pulsar **DRESS ME** se detona el **MATCH**: aparece la foto de Cher con ese outfit, chispas y un sonido. Si no coinciden: **MIS-MATCH!** con la banda morada de la película. |
| Bonus: detonación de audio | Sonidos sintetizados en el navegador (Web Audio API): clic, arpegio de MATCH y zumbido de MIS-MATCH. Además, botón **♪ MUSIC** con la canción del material (YouTube). |

## Cómo funciona

- **◀◀ / ▶ / ▶▶** debajo de cada ranura: prenda anterior, prenda al azar, prenda siguiente. Cambian solo esa categoría.
- **BROWSE**: mezcla las cuatro categorías al azar (nunca repite la prenda que ya estaba).
- **AUTO DRESS**: arma uno de los 8 outfits completos y lo evalúa (siempre es MATCH, como cuando la computadora viste a Cher).
- **DRESS ME**: evalúa la combinación actual. Si las 4 prendas son del mismo outfit → `✓ MATCH!` + foto; si no → `MIS-MATCH!` con pista de cuántas piezas sí van juntas.
- Un clic sobre el resultado vuelve a las prendas.
- **SFX ON/OFF** y **♪ MUSIC** en el bisel del monitor.

## Estructura del proyecto

```
clueless-closet/
├── index.html          # Estructura de la pantalla (monitor, paneles, botones)
├── estilo.css          # Estética Clueless: leopardo, lavanda, pixel, CRT
├── script.js           # Listas de prendas, aleatoriedad, MATCH/MIS-MATCH, audio
├── README.md
├── .gitignore
└── assets/img/
    ├── tops/           # Grupo 1: partes de arriba   (PNG con fondo transparente)
    ├── faldas/         # Grupo 2: partes de abajo
    ├── zapatos/        # Grupo 3: zapatos
    ├── accesorios/     # Grupo 4: accesorios
    ├── fotos/          # Foto del outfit completo que se revela con el MATCH
    └── fondo/          # leopardo.jpg (pantalla) y ganchos.jpg (fondo de la página)
```

Las prendas se recortaron de los collages de referencia. Cada archivo lleva el nombre del outfit al que pertenece (`argyle`, `naranja`, `tartan`, `colegio`, `amarillo`, `otono`, `rosa`, `plisada`); el resto son prendas sueltas que nunca forman MATCH.

### Agregar o cambiar prendas

1. Guarda la imagen (idealmente PNG con fondo transparente) en la carpeta de su grupo.
2. En `script.js`, agrega una línea en la lista correspondiente de `PRENDAS`:
   ```js
   { src: "assets/img/tops/nueva.png", outfit: null },
   ```
   Si la prenda pertenece a un outfit completo, pon su nombre en `outfit` y asegúrate de que exista en `OUTFITS` con su foto. Para que un outfit pueda hacer MATCH debe tener una prenda en los cuatro grupos.

## Ejecutar localmente

No necesita instalación. Opción simple: abrir `index.html` con doble clic.

Opción recomendada (algunos navegadores limitan el audio o las fuentes con `file://`): servir la carpeta.

```bash
# con Python
cd clueless-closet
python3 -m http.server 8000
# luego abre http://localhost:8000
```

O con la extensión **Live Server** de VS Code (clic derecho en `index.html` → *Open with Live Server*).

## Publicar en GitHub Pages

### Opción A — desde el repositorio forkeado (lo que pide la clase)

1. En GitHub, haz **Fork** de `anattolia/base-bestiario` a tu cuenta.
2. Clona tu fork:
   ```bash
   git clone https://github.com/TU-USUARIO/base-bestiario.git
   cd base-bestiario
   ```
3. Borra el contenido de la plantilla y copia **todo** el contenido de esta carpeta (`index.html`, `estilo.css`, `script.js`, `README.md`, `.gitignore`, `assets/`) dentro del repositorio.
4. Sube los cambios:
   ```bash
   git add .
   git commit -m "Cher's Wardrobe: bot de outfits con 4 grupos y detonación de MATCH"
   git push
   ```
5. En GitHub: **Settings → Pages → Build and deployment → Source: *Deploy from a branch* → Branch: `main` / carpeta `/ (root)` → Save**.
6. En uno o dos minutos la página queda en `https://TU-USUARIO.github.io/base-bestiario/`.

Si prefieres renombrar el repositorio (por ejemplo a `clueless-closet`), hazlo en **Settings → General → Repository name**; la URL pasa a ser `https://TU-USUARIO.github.io/clueless-closet/`.

### Opción B — repositorio nuevo

1. En GitHub, **New repository** → nombre `clueless-closet`, público, sin README.
2. En tu computador:
   ```bash
   cd clueless-closet
   git init
   git add .
   git commit -m "Cher's Wardrobe"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/clueless-closet.git
   git push -u origin main
   ```
3. Activa Pages igual que en el paso 5 de la opción A.

Todas las rutas del proyecto son relativas (`assets/img/...`, sin `/` inicial), así que funciona igual en `usuario.github.io/repositorio/` que en la raíz de un dominio.

## Tecnologías y decisiones

- **HTML5 / CSS3 / JavaScript (ES6)** sin frameworks ni build. Un solo archivo por capa.
- **Tipografía pixel** `Silkscreen` desde Google Fonts (única dependencia externa; si no carga, el CSS cae a `Courier New`/monospace).
- **Web Audio API** para los sonidos: no hay archivos de audio que pesen ni problemas de licencia.
- **YouTube embed** (dominio `youtube-nocookie.com`) para la canción del material; se inserta solo al pulsar el botón, porque los navegadores bloquean el autoplay sin interacción.
- Fondos: `leopardo.jpg` (pantalla, como en la película) y `ganchos.jpg` (habitación) tomados del material entregado.
- Diseño de escritorio prioritario (es un monitor de 1995); en pantallas angostas los paneles se apilan y los botones pasan a columna.

## Pruebas realizadas

Con Chromium (Playwright), sirviendo el proyecto **desde un subdirectorio** para simular GitHub Pages:

- La página abre, el fondo y las 53 imágenes (45 prendas + 8 fotos de outfit) cargan sin errores 404.
- `▶▶` cambia solo la categoría pulsada; las demás quedan intactas.
- 5 pulsaciones de **BROWSE**: 0 repeticiones inmediatas en 20 cambios de prenda.
- **DRESS ME** con combinación mixta → `MIS-MATCH!`; **AUTO DRESS** → `✓ MATCH!` con la foto correspondiente cargada.
- Clic en el resultado lo cierra.
- Sin errores de JavaScript en consola. Sin scroll horizontal a 390 px de ancho.

## Limitaciones

- El video de la escena (`youtu.be/XNDubWJU0aU`) no se pudo reproducir desde el entorno de desarrollo: solo se leyó su título y descripción. La interfaz se construyó a partir de las capturas de la película incluidas en el material y del conocimiento de la escena (leopardo, panel lavanda, flechas ◀◀ ▶ ▶▶, botones BROWSE / AUTO DRESS / DRESS ME, banda MIS-MATCH!).
- Las prendas se recortaron de collages de Pinterest, así que algunas tienen poca resolución (por ejemplo las del outfit "colegio") y se ven pixeladas al ampliarse; encaja con la estética CRT pero se nota. Reemplazarlas por fotos más grandes mejora el resultado sin tocar el código.
- El audio y la fuente externa no se pudieron verificar visual/auditivamente desde el entorno (el audio sí se ejecuta sin errores en la consola).
- La música depende de YouTube: si el video deja de existir, el botón ♪ mostrará un reproductor vacío. Cambia el ID en `VIDEO_MUSICA` dentro de `script.js`.
