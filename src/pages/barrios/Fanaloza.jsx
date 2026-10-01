import { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useLocation, Link } from 'react-router-dom'
import { useScrollReveal } from '../../hooks/useScrollReveal'

/* ─────────────────────────────────────────────
   IMÁGENES
   ───────────────────────────────────────────── */
import fondoFanaloza   from '../../assets/FANALOZA/FONDO-FANALOZA.png'

// Facundo Díaz
import facundoD1   from '../../assets/FANALOZA/FACUNDO D/Fotos/FACUNDO_1WEB.png'
import facundoD2   from '../../assets/FANALOZA/FACUNDO D/Fotos/FACUNDO_2WEB.png'
import facundoD3   from '../../assets/FANALOZA/FACUNDO D/Fotos/FACUNDO_3WEB.png'
import facundoD4   from '../../assets/FANALOZA/FACUNDO D/Fotos/FACUNDO_4WEB.png'
import facundoD5   from '../../assets/FANALOZA/FACUNDO D/Fotos/FACUNDO_5WEB.png'
import facundoD6   from '../../assets/FANALOZA/FACUNDO D/Fotos/FACUNDO_6WEB.png'
import facundoD7   from '../../assets/FANALOZA/FACUNDO D/Fotos/FACUNDO_7WEB.png'
import facundoD8   from '../../assets/FANALOZA/FACUNDO D/Fotos/FACUNDO_8WEB.png'
import facundoD9   from '../../assets/FANALOZA/FACUNDO D/Fotos/FACUNDOWEB.png'

import facundoDIso1 from '../../assets/FANALOZA/FACUNDO D/Edificios Isométricos/Facundo.png'
import facundoDIso2 from '../../assets/FANALOZA/FACUNDO D/Edificios Isométricos/Facundo_Azul.png'

// Juan Díaz
import juanD1   from '../../assets/FANALOZA/JUAN D/Fotos/JUAN_1WEB.png'
import juanD2   from '../../assets/FANALOZA/JUAN D/Fotos/JUAN_2WEB.png'
import juanD3   from '../../assets/FANALOZA/JUAN D/Fotos/JUAN_3WEB.png'
import juanD4   from '../../assets/FANALOZA/JUAN D/Fotos/JUAN_4WEB.png'
import juanD5   from '../../assets/FANALOZA/JUAN D/Fotos/JUAN_5WEB.png'
import juanD6   from '../../assets/FANALOZA/JUAN D/Fotos/JUAN_6WEB.png'
import juanD7   from '../../assets/FANALOZA/JUAN D/Fotos/JUAN_7WEB.png'
import juanD8   from '../../assets/FANALOZA/JUAN D/Fotos/JUAN_8WEB.png'
import juanD9   from '../../assets/FANALOZA/JUAN D/Fotos/JUAN_9WEB.png'
import juanD10   from '../../assets/FANALOZA/JUAN D/Fotos/JUAN_10WEB.png'
import juanD11   from '../../assets/FANALOZA/JUAN D/Fotos/JUAN_11WEB.png'
import juanD12   from '../../assets/FANALOZA/JUAN D/Fotos/JUAN_12WEB.png'
import juanD13   from '../../assets/FANALOZA/JUAN D/Fotos/JUAN_13WEB.png'
import juanD14   from '../../assets/FANALOZA/JUAN D/Fotos/JUANWEB.png'

import juanDIso1 from '../../assets/FANALOZA/JUAN D/Edificios Isométricos/Juan1.png'
import juanDIso2 from '../../assets/FANALOZA/JUAN D/Edificios Isométricos/Juan1_Azul.png'
import juanDIso3 from '../../assets/FANALOZA/JUAN D/Edificios Isométricos/Juan2.png'
import juanDIso4 from '../../assets/FANALOZA/JUAN D/Edificios Isométricos/Juan2_Azul.png'

import juanDPlano from '../../assets/FANALOZA/JUAN D/Fotos/Plano_JuanDiaz.jpg'

/* ─────────────────────────────────────────────
   Agrupación de fotos por población
   ───────────────────────────────────────────── */
const juanFotos = [
  juanD1, juanD2, juanD3, juanD4, juanD5, juanD6, juanD7,
  juanD8, juanD9, juanD10, juanD11, juanD12, juanD13, juanD14,
]
// Maquetas isométricas amarillas por defecto (azules: juanDIso2, juanDIso4)
const juanIso = [juanDIso1, juanDIso3]

const facundoFotos = [
  facundoD1, facundoD2, facundoD3, facundoD4, facundoD5,
  facundoD6, facundoD7, facundoD8, facundoD9,
]
const facundoIso = [facundoDIso1]

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
   Componente: Visor
   ───────────────────────────────────────────── */
function Visor({ fotos, label, aspect = 'aspect-[4/3]' }) {
  const [idx, setIdx] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const thumbsRef = useRef(null)

  const prev = () => setIdx((i) => (i - 1 + fotos.length) % fotos.length)
  const next = () => setIdx((i) => (i + 1) % fotos.length)

  useEffect(() => {
    if (lightboxOpen) return
    const cont = thumbsRef.current
    if (!cont) return
    const activo = cont.children[idx]
    if (!activo) return
    cont.scrollTo({
      left: activo.offsetLeft - cont.offsetWidth / 2 + activo.offsetWidth / 2,
      behavior: 'smooth',
    })
  }, [idx, lightboxOpen])

  return (
    <div className="space-y-3">
      <div
        className={`relative overflow-hidden rounded-2xl bg-[var(--color-paper)] group ${aspect}`}
        style={{ boxShadow: 'var(--shadow-card)' }}
      >
        <img
          key={idx}
          src={fotos[idx]}
          alt={`${label} ${idx + 1}`}
          onClick={() => setLightboxOpen(true)}
          className="w-full h-full object-cover cursor-zoom-in"
          style={{ animation: 'fade-in 0.4s var(--ease-out-quart) both' }}
        />

        {fotos.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Anterior"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100"
            >
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={next}
              aria-label="Siguiente"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100"
            >
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </>
        )}

        <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/0 group-hover:bg-black/50 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 pointer-events-none">
          <svg className="w-4 h-4 text-white" viewBox="0 0 16 16" fill="none">
            <path d="M6 2H2v4M10 2h4v4M6 14H2v-4M10 14h4v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <div className="absolute bottom-3 right-4 text-xs font-medium text-white/90 bg-black/40 px-2 py-0.5 rounded-full pointer-events-none">
          {idx + 1} / {fotos.length}
        </div>
      </div>

      {fotos.length > 1 && (
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            aria-label="Anterior"
            className="flex-none w-8 h-8 rounded-full border border-[var(--color-ink)]/15 hover:border-[var(--color-penco-gold)] hover:bg-[var(--color-penco-gold)]/10 text-[var(--color-ink)] flex items-center justify-center transition-all duration-300"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
              <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div
            ref={thumbsRef}
            className="flex gap-2 overflow-x-auto py-1 scroll-smooth"
            style={{ scrollbarWidth: 'none' }}
          >
            {fotos.map((f, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className="flex-none w-16 h-12 rounded-lg overflow-hidden border-2 transition-all duration-200"
                style={{
                  borderColor: i === idx ? 'var(--color-penco-gold)' : 'transparent',
                  opacity: i === idx ? 1 : 0.55,
                }}
              >
                <img src={f} alt="" loading="lazy" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          <button
            onClick={next}
            aria-label="Siguiente"
            className="flex-none w-8 h-8 rounded-full border border-[var(--color-ink)]/15 hover:border-[var(--color-penco-gold)] hover:bg-[var(--color-penco-gold)]/10 text-[var(--color-ink)] flex items-center justify-center transition-all duration-300"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
              <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      )}

      {lightboxOpen && (
        <Lightbox
          fotos={fotos}
          indiceActual={idx}
          onClose={() => setLightboxOpen(false)}
          onNavigate={(delta) => setIdx((i) => (i + delta + fotos.length) % fotos.length)}
          label={label}
        />
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────
   Componentes auxiliares
   ───────────────────────────────────────────── */
function MetaTag({ label, value }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="section-number text-[var(--color-mute)]">{label}</span>
      <span className="font-medium text-[var(--color-ink)] text-sm leading-snug">{value}</span>
    </div>
  )
}

function Divider() {
  return <div className="border-t border-[var(--color-ink)]/10 my-20 md:my-28" />
}

function SectionHeader({ subtitulo, titulo }) {
  return (
    <div className="reveal mb-12 md:mb-16">
      <div className="eyebrow text-[var(--color-penco-blue-600)] mb-4">
        <span>{subtitulo}</span>
      </div>
      <div className="flex items-end gap-4 flex-wrap">
        <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[0.95] text-[var(--color-ink)]">
          {titulo}
        </h2>
        <Link
          to="/mapa"
          className="mb-1 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-penco-blue-600)] text-[var(--color-penco-blue-600)] text-sm font-semibold hover:bg-[var(--color-penco-blue-600)] hover:text-white transition-all duration-300 shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          Ver en mapa
        </Link>
      </div>
    </div>
  )
}

function BloqueMaqueta({ fotos, label }) {
  return (
    <div className="reveal">
      <div className="eyebrow text-[var(--color-penco-gold-deep)] mb-4">
        <span className="section-number">Maquetas</span>
      </div>
      <Visor fotos={fotos} label={`Maqueta · ${label}`} aspect="aspect-[16/9]" />
    </div>
  )
}

function BloquePlano({ plano, label }) {
  return (
    <div className="reveal">
      <div className="eyebrow text-[var(--color-penco-gold-deep)] mb-4">
        <span className="section-number">Plano</span>
      </div>
      <Visor fotos={[plano]} label={`Plano · ${label}`} aspect="aspect-[16/9]" />
    </div>
  )
}

/* ─────────────────────────────────────────────
   Página principal
   ───────────────────────────────────────────── */
export default function Fanaloza() {
  const containerRef = useScrollReveal()
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '')
      const elemento = document.getElementById(id)
      if (elemento) {
        setTimeout(() => elemento.scrollIntoView({ behavior: 'smooth' }), 100)
      }
    }
  }, [location])

  return (
    <div ref={containerRef}>

      {/* ══════════════════════════════════════ HERO ══════════════════════════════════════ */}
      <section className="relative min-h-[70vh] flex flex-col justify-end text-white overflow-hidden grain">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage: `url(${fondoFanaloza})`,
            animation: 'scale-in 1.6s var(--ease-out-expo) both',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/60 to-transparent" />

        <div className="relative z-10 max-w-[1480px] mx-auto px-6 md:px-10 lg:px-14 w-full pb-16 md:pb-24">
          <div className="animate-[fade-up_1s_var(--ease-out-expo)_0.2s_both]">
            <div className="eyebrow text-[var(--color-penco-gold)] mb-4">
              <span>Barrio industrial</span>
            </div>
            <h1 className="font-display text-[14vw] md:text-[10vw] lg:text-[8rem] leading-[0.9] mb-6">
              FANALOZA
            </h1>
            <p className="text-base md:text-lg text-white/80 max-w-xl leading-relaxed">
              Fábrica Nacional de Loza de Penco. Dos poblaciones obreras —Juan Díaz
              y Facundo Díaz— levantadas como parte de las políticas habitacionales
              de una industria que forjó la identidad cerámica de Penco.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════ CONTENIDO ══════════════════════════════════════ */}
      <div className="max-w-[1480px] mx-auto px-6 md:px-10 lg:px-14">

        {/* ───────────────────────── 01 · JUAN DÍAZ ───────────────────────── */}
        <section id="juan-diaz" className="pt-24 md:pt-36">

          <SectionHeader
            subtitulo="Población"
            titulo={<>Juan<br /><span className="font-display-italic text-[var(--color-penco-blue-600)]">Díaz</span></>}
          />

          {/* Meta datos */}
          <div className="reveal flex flex-wrap gap-8 mb-12 pb-8 border-b border-[var(--color-ink)]/10">
            <MetaTag label="AÑO" value="1948" />
            <MetaTag label="TIPOLOGÍAS" value="2 (viviendas continuas de uno y dos niveles)" />
            <MetaTag label="ARQUITECTOS" value="Guillermo Kaulen Ossa y Ramón Venegas Carrasco" />
          </div>

          {/* Texto + Visor */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-16 reveal items-start">
            <div className="space-y-5 text-[var(--color-mute)] text-base md:text-lg leading-relaxed">
              <p>
                En la manzana delimitada por las calles El Roble, Yerbas Buenas,
                Cochrane y Freire, se encuentra la Población Juan Díaz, construida
                como parte de las políticas habitacionales de la Fábrica Nacional de
                Loza de Penco (Fanaloza).
              </p>
              <p>
                El conjunto, obra de los arquitectos Guillermo Kaulen y Ramón Venegas
                Carrasco, está compuesto por grupos de viviendas de uno y dos pisos,
                además de una plaza interior.
              </p>
              <p>
                Como parte de una iniciativa municipal, el Museo de la Historia de
                Penco desarrolló una serie de murales en la población. Creados por los
                hermanos Francisco y Piero Maturana, destaca la obra que recuerda al
                plato Willow, uno de los íconos más reconocibles a nivel nacional de
                Fanaloza y Lozapenco y que se ha transformado en un sello de la
                identidad de Penco.
              </p>
            </div>

            <div className="lg:sticky lg:top-24">
              <Visor fotos={juanFotos} label="Población Juan Díaz" />
            </div>
          </div>

          {/* Maquetas 3D */}
          <div className="mb-16">
            <BloqueMaqueta fotos={juanIso} label="Juan Díaz" />
          </div>

          {/* Plano */}
          <BloquePlano plano={juanDPlano} label="Juan Díaz" />
        </section>

        <Divider />

        {/* ───────────────────────── 02 · FACUNDO DÍAZ ───────────────────────── */}
        <section id="facundo-diaz" className="pb-24 md:pb-36">

          <SectionHeader
            subtitulo="Población"
            titulo={<>Facundo<br /><span className="font-display-italic text-[var(--color-penco-blue-600)]">Díaz</span></>}
          />

          {/* Meta datos */}
          <div className="reveal flex flex-wrap gap-8 mb-12 pb-8 border-b border-[var(--color-ink)]/10">
            <MetaTag label="ETAPAS" value="1ª etapa 1959 · 2ª etapa 1963" />
            <MetaTag label="UNIDADES" value="50 unidades habitacionales" />
            <MetaTag label="TIPOLOGÍA" value="1 (viviendas continuas en pabellón)" />
            <MetaTag label="ARQUITECTO" value="Julio Ramos Lira" />
          </div>

          {/* Texto + Visor */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-16 reveal items-start">
            {/* Visor primero en desktop */}
            <div className="order-2 lg:order-1 lg:sticky lg:top-24">
              <Visor fotos={facundoFotos} label="Población Facundo Díaz" />
            </div>

            <div className="order-1 lg:order-2 space-y-5 text-[var(--color-mute)] text-base md:text-lg leading-relaxed">
              <p>
                Construida por la empresa Fanaloza y compuesta por 50 unidades
                habitacionales, la Población Facundo Díaz se encuentra emplazada en
                un extenso terreno ubicado en la esquina de las calles Cochrane con
                El Roble, y separados por los pasajes Facundo Díaz y Genaro Díaz.
              </p>
              <p>
                Obra del arquitecto Julio Ramos Lira, el conjunto se distingue por su
                lenguaje moderno, con una funcionalidad distinta a la de su
                predecesora, la población Juan Díaz.
              </p>
              <p>
                Estas modernas viviendas de albañilería reforzada fueron concebidas
                con amplios espacios y ventanales, además de patios, compensando así
                la ausencia de antejardín, ya que las casas se enfrentan directamente
                a la calle y los pasajes interiores.
              </p>
              <p>
                Julio Ramos Lira, profesional que arribó a la zona en la segunda mitad
                de la década de 1950, proyectó edificios de departamentos, viviendas
                particulares y otros trabajos como el Hotel Araucano.
              </p>
            </div>
          </div>

          {/* Maquetas 3D */}
          <BloqueMaqueta fotos={facundoIso} label="Facundo Díaz" />

        </section>
      </div>
    </div>
  )
}