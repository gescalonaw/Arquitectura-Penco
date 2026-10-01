import { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useScrollReveal } from '../hooks/useScrollReveal'

/* ─────────────────────────────────────────────
   IMÁGENES — Isométricas y planos de cada barrio
   (rutas reutilizadas de las páginas de barrios)
   ───────────────────────────────────────────── */

// ── CRAV ──
import recintoCravIso1 from '../assets/CRAV/RECINTO CRAV/Edificios Isométricos/CRAV1.png'
import recintoCravIso2 from '../assets/CRAV/RECINTO CRAV/Edificios Isométricos/CRAV2.png'
import recintoCravIso3 from '../assets/CRAV/RECINTO CRAV/Edificios Isométricos/CRAV1_Azul.png'
import recintoCravIso4 from '../assets/CRAV/RECINTO CRAV/Edificios Isométricos/CRAV2_Azul.png'
import desiderioIso1 from '../assets/CRAV/DESIDERIO GUZMÁN/Edificios Isométricos/Desiderio.png'
import desiderioIso2 from '../assets/CRAV/DESIDERIO GUZMÁN/Edificios Isométricos/Desiderio_Azul.png'
import radalesIso1 from '../assets/CRAV/LOS RADALES/Edificios Isométricos/Radales.png'
import radalesIso2 from '../assets/CRAV/LOS RADALES/Edificios Isométricos/Radales_Azul.png'

// ── VIPLA ──
import viplaIso1 from '../assets/VIPLA/Edificios Isométricos/VIPLA2_1.png'
import viplaIso2 from '../assets/VIPLA/Edificios Isométricos/VIPLA2.png'
import viplaIso3 from '../assets/VIPLA/Edificios Isométricos/VIPLA3.png'
import viplaIso4 from '../assets/VIPLA/Edificios Isométricos/VIPLA2_Azul_1.png'
import viplaIso5 from '../assets/VIPLA/Edificios Isométricos/VIPLA2_Azul.png'
import viplaIso6 from '../assets/VIPLA/Edificios Isométricos/VIPLA3_Azul.png'
import viplaPlano from '../assets/VIPLA/fotos/Plano_Vipla.jpg'

// ── FANALOZA ──
import juanDIso1 from '../assets/FANALOZA/JUAN D/Edificios Isométricos/Juan1.png'
import juanDIso2 from '../assets/FANALOZA/JUAN D/Edificios Isométricos/Juan1_Azul.png'
import juanDIso3 from '../assets/FANALOZA/JUAN D/Edificios Isométricos/Juan2.png'
import juanDIso4 from '../assets/FANALOZA/JUAN D/Edificios Isométricos/Juan2_Azul.png'
import juanDPlano from '../assets/FANALOZA/JUAN D/Fotos/Plano_JuanDiaz.jpg'
import facundoDIso1 from '../assets/FANALOZA/FACUNDO D/Edificios Isométricos/Facundo.png'
import facundoDIso2 from '../assets/FANALOZA/FACUNDO D/Edificios Isométricos/Facundo_Azul.png'

/* ─────────────────────────────────────────────
   Estructura de datos: barrios → recintos
   Cada recinto tiene versión amarilla y azul de sus isométricas,
   y opcionalmente un plano.
   ───────────────────────────────────────────── */
const barrios = [
  {
    nombre: 'CRAV',
    subtitulo: 'Compañía Refinería de Azúcar',
    recintos: [
      {
        nombre: 'Recinto CRAV',
        amarillo: [recintoCravIso1, recintoCravIso2],
        azul: [recintoCravIso3, recintoCravIso4],
        plano: null,
      },
      {
        nombre: 'Desiderio Guzmán',
        amarillo: [desiderioIso1],
        azul: [desiderioIso2],
        plano: null,
      },
      {
        nombre: 'Villa Los Radales',
        amarillo: [radalesIso1],
        azul: [radalesIso2],
        plano: null,
      },
    ],
  },
  {
    nombre: 'VIPLA',
    subtitulo: 'Fábrica de Vidrios Planos',
    recintos: [
      {
        nombre: 'Población VIPLA',
        amarillo: [viplaIso1, viplaIso2, viplaIso3],
        azul: [viplaIso4, viplaIso5, viplaIso6],
        plano: viplaPlano,
      },
    ],
  },
  {
    nombre: 'FANALOZA',
    subtitulo: 'Fábrica Nacional de Loza',
    recintos: [
      {
        nombre: 'Juan Díaz',
        amarillo: [juanDIso1, juanDIso3],
        azul: [juanDIso2, juanDIso4],
        plano: juanDPlano,
      },
      {
        nombre: 'Facundo Díaz',
        amarillo: [facundoDIso1],
        azul: [facundoDIso2],
        plano: null,
      },
    ],
  },
]

/* ─────────────────────────────────────────────
   Componente: Lightbox
   ───────────────────────────────────────────── */
function Lightbox({ fotos, indiceActual, onClose, onNavigate, label }) {
  const handleKey = useCallback((e) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowLeft') onNavigate(-1)
    if (e.key === 'ArrowRight') onNavigate(1)
  }, [onClose, onNavigate])

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = originalOverflow
    }
  }, [handleKey])

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{
        background: 'rgba(15, 18, 30, 0.92)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        animation: 'fade-in 0.3s var(--ease-out-quart) both',
      }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Cerrar"
        className="absolute top-5 right-5 md:top-8 md:right-8 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-300 hover:rotate-90"
      >
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
          <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      </button>

      <div className="absolute top-5 left-5 md:top-8 md:left-8 z-10 text-white/80 text-sm">
        <div className="section-number text-[var(--color-penco-gold)] mb-1">{label}</div>
        <div className="font-medium">
          {indiceActual + 1} <span className="text-white/40">/ {fotos.length}</span>
        </div>
      </div>

      {fotos.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNavigate(-1) }}
          aria-label="Anterior"
          className="absolute left-3 md:left-8 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-300 hover:-translate-x-1"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none">
            <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      <div
        className="relative flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          key={indiceActual}
          src={fotos[indiceActual]}
          alt={`${label} ${indiceActual + 1}`}
          className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
          style={{
            animation: 'fade-in 0.4s var(--ease-out-expo) both',
            boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
          }}
        />
      </div>

      {fotos.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNavigate(1) }}
          aria-label="Siguiente"
          className="absolute right-3 md:right-8 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-300 hover:translate-x-1"
        >
          <svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="none">
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs text-white/40 tracking-wider hidden md:block">
        ESC para cerrar · ← → para navegar
      </div>
    </div>,
    document.body
  )
}

/* ─────────────────────────────────────────────
   Componente: TarjetaImagen (isométrica o plano)
   ───────────────────────────────────────────── */
function TarjetaImagen({ src, etiqueta, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group relative overflow-hidden rounded-2xl bg-[var(--color-paper)] cursor-zoom-in aspect-[4/3] w-full"
      style={{ boxShadow: 'var(--shadow-card)' }}
    >
      <img
        src={src}
        alt={etiqueta}
        loading="lazy"
        className="w-full h-full object-contain p-6 transition-transform duration-700 group-hover:scale-[1.04]"
        style={{ transitionTimingFunction: 'var(--ease-out-expo)' }}
      />
      <div className="absolute inset-0 bg-[var(--color-ink)]/0 group-hover:bg-[var(--color-ink)]/8 transition-colors duration-300" />
      <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/0 group-hover:bg-white/90 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
        <svg className="w-4 h-4 text-[var(--color-ink)]" viewBox="0 0 16 16" fill="none">
          <path d="M6 2H2v4M10 2h4v4M6 14H2v-4M10 14h4v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      {etiqueta && (
        <div className="absolute bottom-3 left-4 text-xs font-medium text-[var(--color-ink)]/70 bg-white/70 backdrop-blur-sm px-2.5 py-1 rounded-full">
          {etiqueta}
        </div>
      )}
    </button>
  )
}

/* ─────────────────────────────────────────────
   Página principal
   ───────────────────────────────────────────── */
export default function Maquetas() {
  const containerRef = useScrollReveal()
  const [color, setColor] = useState('amarillo') // 'amarillo' | 'azul'

  // Estado del lightbox: qué set de fotos y qué índice
  const [lightbox, setLightbox] = useState(null) // { fotos, idx, label }

  const abrir = (fotos, idx, label) => setLightbox({ fotos, idx, label })
  const cerrar = () => setLightbox(null)
  const navegar = (delta) => {
    setLightbox((lb) => {
      if (!lb) return lb
      const n = lb.fotos.length
      return { ...lb, idx: (lb.idx + delta + n) % n }
    })
  }

  return (
    <div ref={containerRef}>
      <div className="max-w-[1480px] mx-auto px-6 md:px-10 lg:px-14 py-20 md:py-28">

        {/* ───────── Header ───────── */}
        <div className="grid grid-cols-12 gap-8 mb-10 reveal">
          <div className="col-span-12 md:col-span-9">
            <div className="eyebrow text-[var(--color-penco-blue-600)] mb-6">
              <span className="section-number"></span>
              <span>Maquetas</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl leading-[0.95] text-[var(--color-ink)] mb-6">
              Reconstrucciones
              <br />
              <span className="font-display-italic text-[var(--color-penco-blue-600)]">isométricas</span>
            </h1>
            <p className="text-base md:text-lg leading-relaxed text-[var(--color-mute)] max-w-2xl">
              Vistas isométricas y planos de los conjuntos habitacionales de cada
              barrio industrial, reconstruidos a partir de registros históricos y
              observación directa.
            </p>
          </div>
        </div>

        {/* ───────── Toggle de color ───────── */}
        <div className="reveal flex items-center gap-3 mb-12 pb-6 border-b border-[var(--color-ink)]/10">
          <span className="text-sm text-[var(--color-mute)]">Color de las vistas:</span>
          <div className="flex items-center rounded-full bg-[var(--color-paper)] p-1 border border-[var(--color-ink)]/10">
            <button
              onClick={() => setColor('amarillo')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                color === 'amarillo' ? 'bg-[var(--color-penco-gold)] text-[var(--color-ink)] shadow-sm' : 'text-[var(--color-mute)]'
              }`}
            >
              Amarillo
            </button>
            <button
              onClick={() => setColor('azul')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                color === 'azul' ? 'bg-[var(--color-penco-blue-600)] text-white shadow-sm' : 'text-[var(--color-mute)]'
              }`}
            >
              Azul
            </button>
          </div>
        </div>

        {/* ───────── Barrios ───────── */}
        <div className="space-y-20 md:space-y-28">
          {barrios.map((barrio) => (
            <section key={barrio.nombre} className="reveal">
              {/* Encabezado del barrio */}
              <div className="mb-10">
                <div className="eyebrow text-[var(--color-penco-gold-deep)] mb-3">
                  <span>{barrio.subtitulo}</span>
                </div>
                <h2 className="font-display text-4xl md:text-6xl text-[var(--color-ink)]">
                  {barrio.nombre}
                </h2>
              </div>

              {/* Recintos del barrio */}
              <div className="space-y-12">
                {barrio.recintos.map((recinto) => {
                  const isos = recinto[color]
                  // Conjunto de fotos para el lightbox: isométricas + plano (si hay)
                  const todas = recinto.plano ? [...isos, recinto.plano] : isos

                  return (
                    <div key={recinto.nombre}>
                      {/* Nombre del recinto */}
                      <h3 className="font-display text-2xl md:text-3xl text-[var(--color-ink)] mb-5">
                        {recinto.nombre}
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {/* Isométricas */}
                        {isos.map((src, i) => (
                          <TarjetaImagen
                            key={i}
                            src={src}
                            onClick={() => abrir(todas, i, `${recinto.nombre} · Maqueta`)}
                          />
                        ))}

                        {/* Plano (si existe) */}
                        {recinto.plano && (
                          <TarjetaImagen
                            src={recinto.plano}
                            onClick={() => abrir(todas, isos.length, `${recinto.nombre} · Plano`)}
                          />
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* ───────── Lightbox ───────── */}
      {lightbox && (
        <Lightbox
          fotos={lightbox.fotos}
          indiceActual={lightbox.idx}
          onClose={cerrar}
          onNavigate={navegar}
          label={lightbox.label}
        />
      )}
    </div>
  )
}