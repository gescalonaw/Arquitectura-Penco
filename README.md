# Arquitectura de Penco

Sitio web de documentación patrimonial de los barrios industriales de Penco, Chile — **CRAV**, **VIPLA** y **FANALOZA** — desarrollado para el Cineclub Penco con financiamiento de **FONDART**.

 **Sitio en vivo:** [arquitecturapenco.cl](https://arquitecturapenco.cl)

<!--
  Sugerencia: agregá acá un screenshot o GIF del sitio.
  Ejemplo:
  ![Vista previa del sitio](./docs/preview.png)
-->

---

## Sobre el proyecto

Arquitectura de Penco es un archivo digital que documenta el patrimonio industrial de la comuna: fotografías históricas y actuales, planos arquitectónicos, reconstrucciones isométricas, registros audiovisuales y una publicación completa en PDF, organizados por barrio.

El sitio fue construido priorizando:

- Una **identidad visual editorial** propia (tipografía Fraunces + Inter, sistema de tokens de diseño)
- **Rendimiento**: carga diferida de imágenes y videos, animaciones basadas en `IntersectionObserver`
- **Accesibilidad**: navegación por teclado en galerías y visor de PDF, estados de foco visibles
- **Responsive real**: desde el visor de doble página del libro hasta las galerías, adaptados a móvil

## Stack técnico

| Categoría | Tecnología |
|---|---|
| Framework | [React 18](https://react.dev/) |
| Build tool | [Vite](https://vitejs.dev/) |
| Enrutamiento | [React Router](https://reactrouter.com/) |
| Estilos | [Tailwind CSS v4](https://tailwindcss.com/) con design tokens personalizados |
| Mapa interactivo | [Leaflet](https://leafletjs.com/) + [React-Leaflet](https://react-leaflet.js.org/) + tiles de CARTO |
| Visor de PDF | [react-pdf](https://github.com/wojtekmaj/react-pdf) sobre `pdfjs-dist` |
| Gestor de paquetes | [pnpm](https://pnpm.io/) |
| Hosting | Hostinger (hosting compartido) |

## Funcionalidades destacadas

- **Galerías con lightbox propio** — navegación por teclado, sin librerías externas, implementado con `createPortal`
- **Visor de libro en PDF** — renderizado de doble página (modo "libro abierto") en escritorio, página simple en móvil, con salto directo a página y modo pantalla completa
- **Mapa interactivo** — geolocalización de los tres barrios documentados con capas por color
- **Videos embebidos con carga diferida** — patrón *facade*: se muestra la miniatura y el iframe de YouTube solo se monta al hacer clic, para no penalizar el tiempo de carga inicial
- **Sistema de diseño reutilizable** — tokens de color, tipografía y sombras definidos como variables CSS (`@theme` de Tailwind v4), compartidos entre todas las páginas

## Estructura del proyecto

```
src/
├── assets/            # Imágenes, planos y PDF del proyecto
├── components/
│   ├── layout/        # Header, Footer, Layout
│   ├── ui/            # Componentes de interfaz reutilizables
│   └── home/          # Componentes específicos del Home
├── pages/
│   ├── barrios/       # Páginas de CRAV, VIPLA, Fanaloza
│   └── ...             # Proyecto, Mapa, Videos, Publicaciones, Contacto
├── data/               # Datos centralizados (contenido de barrios, navegación)
├── hooks/              # Hooks personalizados (scroll reveal, scroll state)
├── App.jsx             # Definición de rutas
├── main.jsx            # Entry point
└── index.css           # Design tokens + Tailwind
```

## Cómo correrlo localmente

### Requisitos

- Node.js 18+
- [pnpm](https://pnpm.io/installation)

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/arquitecturapenco.git
cd arquitecturapenco

# Instalar dependencias
pnpm install
```

### Variables de entorno

Creá un archivo `.env` en la raíz a partir de `.env.example`:

```bash
cp .env.example .env
```

Y completá tu propia API key gratuita de CARTO (necesaria para el mapa) en [carto.com/basemaps/apikey](https://carto.com/basemaps/apikey):

```
VITE_CARTO_KEY=tu_api_key_aqui
```

### Desarrollo

```bash
pnpm run dev
```

El sitio queda disponible en `http://localhost:5173`.

### Build de producción

```bash
pnpm run build
```

Genera la carpeta `dist/` lista para desplegar.

##  Licencia

El código de este sitio está disponible como parte de mi portafolio personal. El material fotográfico, los planos y el contenido de la publicación son propiedad del Cineclub Penco y no están cubiertos por esta licencia.

---

### Desarrollado por

**Gabriela Escalona** — [LinkedIn](https://linkedin.com/in/gabriela-escalona-weldt-b32855243) · [Portafolio](https://github.com/gescalonaw)

**Miko Peñailillo** — [LinkedIn](https://www.linkedin.com/in/mirko-peñailillo-vásquez-70094339b) · [Portafolio](https://github.com/MirkoVP)
