import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Link } from 'react-router-dom'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const COLORES = {
  CRAV: '#6773b6',
  VIPLA: '#2d6a4f',
  FANALOZA: '#c89a3f',
}

function crearIcono(color) {
  return L.divIcon({
    className: '',
    html: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="30" viewBox="0 0 32 30">
      <!-- Paredes -->
      <rect x="4" y="15" width="24" height="14" fill="${color}" stroke="white" stroke-width="1.2" stroke-linejoin="round"/>
    
      <line x1="6"  y1="21" x2="14" y2="21" stroke="${color}" stroke-width="0.8"/>
      <!-- Techo con vuelo -->
      <polygon points="0,16 16,5 32,16" fill="${color}" stroke="white" stroke-width="1.2" stroke-linejoin="round"/>
      <!-- Chimenea -->
      <rect x="7" y="1" width="4" height="11" fill="${color}"/>
    </svg>`,
    iconSize: [32, 30],
    iconAnchor: [16, 30],
    popupAnchor: [0, -32],
  })
}

// Pre-computados al nivel de módulo (no se recrean en cada render)
const ICONOS = Object.fromEntries(
  Object.entries(COLORES).map(([barrio, color]) => [barrio, crearIcono(color)])
)

// Coordenadas calculadas como centroides de los polígonos del KML
const PINES = [
  { nombre: 'Recinto CRAV',          barrio: 'CRAV',     to: '/barrios/crav#recinto-crav',       coords: [-36.7446, -72.9983] },
  { nombre: 'P. Desiderio Guzmán',   barrio: 'CRAV',     to: '/barrios/crav#desiderio-guzman',   coords: [-36.7502, -72.9994] },
  { nombre: 'Villa Los Radales',     barrio: 'CRAV',     to: '/barrios/crav#los-radales',        coords: [-36.7498, -72.9983] },
  { nombre: 'VIPLA',                 barrio: 'VIPLA',    to: '/barrios/vipla',                   coords: [-36.7219, -72.976] },
  { nombre: 'Población Juan Díaz',   barrio: 'FANALOZA', to: '/barrios/fanaloza#juan-diaz',      coords: [-36.7359, -72.9924] },
  { nombre: 'Población Facundo Díaz',barrio: 'FANALOZA', to: '/barrios/fanaloza#facundo-diaz',   coords: [-36.736, -72.9932] },
]

export default function Mapa() {
  return (
    <div className="min-h-screen bg-[var(--color-bone)]">

      {/* ── Encabezado ── */}
      <div className="max-w-[1480px] mx-auto px-6 md:px-10 lg:px-14 pt-32 md:pt-40 pb-10">
        <h1 className="font-display text-5xl md:text-7xl text-[var(--color-ink)] mb-4">
          Mapa<br /><em>Interactivo</em>
        </h1>
        <p className="text-[var(--color-mute)] text-lg max-w-xl mb-10">
          Barrios industriales de Penco · Región del Biobío
        </p>

        {/* Leyenda */}
        <div className="flex flex-wrap gap-6 mb-2">
          {Object.entries(COLORES).map(([barrio, color]) => (
            <Link
              key={barrio}
              to={`/barrios/${barrio.toLowerCase()}`}
              className="flex items-center gap-2 group"
            >
              <span
                className="w-3 h-3 rounded-full flex-shrink-0 transition-transform group-hover:scale-125"
                style={{ background: color }}
              />
              <span className="text-sm font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-penco-blue)] transition-colors">
                {barrio}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Mapa ── */}
      <div className="max-w-[1480px] mx-auto px-6 md:px-10 lg:px-14 pb-24">
        <div
          className="rounded-[var(--radius-xl)] overflow-hidden"
          style={{ height: '65vh', minHeight: '500px', boxShadow: 'var(--shadow-elevated)' }}
        >
          <MapContainer
            center={[-36.736, -72.988]}
            zoom={14}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom
          >
            <TileLayer
  url={`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png?key=${import.meta.env.VITE_CARTO_KEY}`}
  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
  subdomains="abcd"
  maxZoom={20}
/>

            {PINES.map((pin) => (
              <Marker key={pin.nombre} position={pin.coords} icon={ICONOS[pin.barrio]}>
                <Popup>
                  <div style={{ fontFamily: 'Open Sans, system-ui, sans-serif', minWidth: '150px', padding: '4px 0' }}>
                    <p style={{ fontWeight: 700, fontSize: '13px', color: '#15182a', marginBottom: '3px' }}>
                      {pin.nombre}
                    </p>
                    <p style={{ fontSize: '11px', color: '#6b6e7e', marginBottom: '8px', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 600 }}>
                      {pin.barrio}
                    </p>
                    <Link
                      to={pin.to}
                      style={{ fontSize: '12px', color: COLORES[pin.barrio], fontWeight: 700, textDecoration: 'none' }}
                    >
                      Ver sección →
                    </Link>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

    </div>
  )
}
