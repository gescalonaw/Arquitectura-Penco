import { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useLocation, Link } from 'react-router-dom'
import { useScrollReveal } from '../../hooks/useScrollReveal'

/* ─────────────────────────────────────────────
   IMÁGENES  –  ajusta las rutas según tu repo
   ───────────────────────────────────────────── */

import fondoCrav   from '../../assets/CRAV/FONDO-CRAV.png'

// Recinto CRAV
import recintoCrav1   from '../../assets/CRAV/RECINTO CRAV/fotos/CRAV_1WEB.png'
import recintoCrav2   from '../../assets/CRAV/RECINTO CRAV/fotos/CRAV_2WEB.png'
import recintoCrav3   from '../../assets/CRAV/RECINTO CRAV/fotos/CRAV_3WEB.png'
import recintoCrav4   from '../../assets/CRAV/RECINTO CRAV/fotos/CRAV_4WEB.png'
import recintoCrav5   from '../../assets/CRAV/RECINTO CRAV/fotos/CRAV_5WEB.png'
import recintoCrav6   from '../../assets/CRAV/RECINTO CRAV/fotos/CRAV_6WEB.png'
import recintoCrav7   from '../../assets/CRAV/RECINTO CRAV/fotos/CRAV_7WEB.png'
import recintoCrav8   from '../../assets/CRAV/RECINTO CRAV/fotos/CRAV_8WEB.png'
import recintoCrav9   from '../../assets/CRAV/RECINTO CRAV/fotos/CRAV_9WEB.png'
import recintoCrav10  from '../../assets/CRAV/RECINTO CRAV/fotos/CRAV_10WEB.png'
import recintoCrav11  from '../../assets/CRAV/RECINTO CRAV/fotos/CRAV_11WEB.png'
import recintoCrav12  from '../../assets/CRAV/RECINTO CRAV/fotos/CRAV_12WEB.png'
import recintoCrav13  from '../../assets/CRAV/RECINTO CRAV/fotos/CRAV_13WEB.png'
import recintoCrav14  from '../../assets/CRAV/RECINTO CRAV/fotos/CRAV_14WEB.png'
import recintoCrav15  from '../../assets/CRAV/RECINTO CRAV/fotos/CRAV_15WEB.png'
import recintoCrav16  from '../../assets/CRAV/RECINTO CRAV/fotos/CRAV_16WEB.png'
import recintoCrav17  from '../../assets/CRAV/RECINTO CRAV/fotos/CRAV_17WEB.png'
import recintoCrav18  from '../../assets/CRAV/RECINTO CRAV/fotos/CRAV_18WEB.png'
import recintoCrav19  from '../../assets/CRAV/RECINTO CRAV/fotos/CRAV_19WEB.png'
import recintoCravIso1 from '../../assets/CRAV/RECINTO CRAV/Edificios Isométricos/CRAV1.png'
import recintoCravIso2 from '../../assets/CRAV/RECINTO CRAV/Edificios Isométricos/CRAV2.png'
import recintoCravIso3 from '../../assets/CRAV/RECINTO CRAV/Edificios Isométricos/CRAV1_Azul.png'
import recintoCravIso4 from '../../assets/CRAV/RECINTO CRAV/Edificios Isométricos/CRAV2_Azul.png'

// Desiderio Guzmán
import desiderio1      from '../../assets/CRAV/DESIDERIO GUZMÁN/fotos/DESIDERIO_1WEB.png'
import desiderio2      from '../../assets/CRAV/DESIDERIO GUZMÁN/fotos/DESIDERIO_2WEB.png'
import desiderio3      from '../../assets/CRAV/DESIDERIO GUZMÁN/fotos/DESIDERIO_3WEB.png'
import desiderio4      from '../../assets/CRAV/DESIDERIO GUZMÁN/fotos/DESIDERIO_4WEB.png'
import desiderio5      from '../../assets/CRAV/DESIDERIO GUZMÁN/fotos/DESIDERIO_5WEB.png'
import desiderio6      from '../../assets/CRAV/DESIDERIO GUZMÁN/fotos/DESIDERIO_6WEB.png'
import desiderio7      from '../../assets/CRAV/DESIDERIO GUZMÁN/fotos/DESIDERIOWEB.png'
import desiderioIso1 from '../../assets/CRAV/DESIDERIO GUZMÁN/Edificios Isométricos/Desiderio.png'
import desiderioIso2 from '../../assets/CRAV/DESIDERIO GUZMÁN/Edificios Isométricos/Desiderio_Azul.png'

// Los Radales
import radales1       from '../../assets/CRAV/LOS RADALES/fotos/RADALES_1WEB.png'
import radales2       from '../../assets/CRAV/LOS RADALES/fotos/RADALES_2WEB.png'
import radales3       from '../../assets/CRAV/LOS RADALES/fotos/RADALES_3WEB.png'
import radales4       from '../../assets/CRAV/LOS RADALES/fotos/RADALES_4WEB.png'
import radales5       from '../../assets/CRAV/LOS RADALES/fotos/RADALESWEB.png'
import radalesIso1 from '../../assets/CRAV/LOS RADALES/Edificios Isométricos/Radales.png'
import radalesIso2 from '../../assets/CRAV/LOS RADALES/Edificios Isométricos/Radales_Azul.png'

/* ─────────────────────────────────────────────
   Agrupación de fotos por recinto
   ───────────────────────────────────────────── */
const recintoCravFotos = [
  recintoCrav1, recintoCrav2, recintoCrav3, recintoCrav4, recintoCrav5,
  recintoCrav6, recintoCrav7, recintoCrav8, recintoCrav9, recintoCrav10,
  recintoCrav11, recintoCrav12, recintoCrav13, recintoCrav14, recintoCrav15,
  recintoCrav16, recintoCrav17, recintoCrav18, recintoCrav19,
]
// Maquetas isométricas: amarillas por defecto (cambiar a las _Azul si se quiere la versión azul)
const recintoCravIso = [recintoCravIso1, recintoCravIso2]

const desiderioFotos = [
  desiderio1, desiderio2, desiderio3, desiderio4,
  desiderio5, desiderio6, desiderio7,
]
const desiderioIso = [desiderioIso1]

const radalesFotos = [radales1, radales2, radales3, radales4, radales5]
const radalesIso = [radalesIso1]

/* ─────────────────────────────────────────────
   Componente: Lightbox (modal de imagen expandida)
   Scroll-lock corregido: guarda y restaura la posición.
   ───────────────────────────────────────────── */
function Lightbox({ fotos, indiceActual, onClose, onNavigate, label }) {
  const handleKey = useCallback((e) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowLeft') onNavigate(-1)
    if (e.key === 'ArrowRight') onNavigate(1)
  }, [onClose, onNavigate])

  useEffect(() => {
    document.addEventListener('keydown', handleKey)

    // Bloqueo de scroll simple y seguro
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKey)
      // Restaurar el scroll al cerrar
      document.body.style.overflow = originalOverflow
    }
  }, [handleKey])

  // Envolvemos el JSX en createPortal para que salte cualquier problema de z-index
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
      {/* Botón cerrar */}
      <button
        onClick={onClose}
        aria-label="Cerrar"
        className="absolute top-5 right-5 md:top-8 md:right-8 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-300 hover:rotate-90"
      >
        <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
          <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Contador y label */}
      <div className="absolute top-5 left-5 md:top-8 md:left-8 z-10 text-white/80 text-sm">
        <div className="section-number text-[var(--color-penco-gold)] mb-1">{label}</div>
        <div className="font-medium">
          {indiceActual + 1} <span className="text-white/40">/ {fotos.length}</span>
        </div>
      </div>

      {/* Flecha izquierda */}
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

      {/* Imagen */}
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

      {/* Flecha derecha */}
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

      {/* Hint inferior */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs text-white/40 tracking-wider hidden md:block">
        ESC para cerrar · ← → para navegar
      </div>
    </div>,
    document.body // Destino del portal
  )
}

/* ─────────────────────────────────────────────
   Componente: Visor (foto grande + thumbnails)
   - Click en thumbnail → cambia la foto principal (NO expande)
   - Click en foto principal → abre Lightbox a pantalla completa
   - Flechas para moverse por la galería de thumbnails
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
  }, [idx, lightboxOpen]) // <-- Añade lightboxOpen a las dependencias

  return (
    <div className="space-y-3">
      {/* FOTO PRINCIPAL — click para expandir a pantalla completa */}
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

        {/* Flechas sobre la foto principal */}
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

        {/* Icono de expandir (arriba derecha) */}
        <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/0 group-hover:bg-black/50 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 pointer-events-none">
          <svg className="w-4 h-4 text-white" viewBox="0 0 16 16" fill="none">
            <path d="M6 2H2v4M10 2h4v4M6 14H2v-4M10 14h4v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Contador */}
        <div className="absolute bottom-3 right-4 text-xs font-medium text-white/90 bg-black/40 px-2 py-0.5 rounded-full pointer-events-none">
          {idx + 1} / {fotos.length}
        </div>
      </div>

      {/* THUMBNAILS con flechas */}
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
   Componente: EtiquetaMeta  (año / dato / arquitecto)
   ───────────────────────────────────────────── */
function MetaTag({ label, value }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="section-number text-[var(--color-mute)]">{label}</span>
      <span className="font-medium text-[var(--color-ink)] text-sm leading-snug">{value}</span>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Componente: DividerLine
   ───────────────────────────────────────────── */
function Divider() {
  return <div className="border-t border-[var(--color-ink)]/10 my-20 md:my-28" />
}

/* ─────────────────────────────────────────────
   Componente: SectionHeader
   ───────────────────────────────────────────── */
function SectionHeader({ numero, titulo, subtitulo }) {
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

/* ─────────────────────────────────────────────
   Componente: BloqueMaqueta (header + visor isométrico)
   ───────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────
   Página principal
   ───────────────────────────────────────────── */
export default function CRAV() {
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

      {/* ══════════════════════════════════════
          HERO
          ══════════════════════════════════════ */}
      <section className="relative min-h-[70vh] flex flex-col justify-end text-white overflow-hidden grain">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage: `url(${fondoCrav})`,
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
              CRAV
            </h1>
            <p className="text-base md:text-lg text-white/80 max-w-xl leading-relaxed">
              Compañía Refinería de Azúcar de Viña del Mar. Tres conjuntos
              habitacionales construidos en distintas épocas como testimonio de
              una industria que organizó el territorio y la vida de Penco.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CONTENIDO PRINCIPAL
          ══════════════════════════════════════ */}
      <div className="max-w-[1480px] mx-auto px-6 md:px-10 lg:px-14">

        {/* ─────────────────────────────────────
            01 · RECINTO CRAV
            ───────────────────────────────────── */}
        <section id="recinto-crav" className="pt-24 md:pt-36">

          <SectionHeader
            numero="/ 01"
            subtitulo="Recinto CRAV"
            titulo={<>Recinto<br /><span className="font-display-italic text-[var(--color-penco-blue-600)]">CRAV</span></>}
          />

          {/* Meta datos */}
          <div className="reveal flex flex-wrap gap-8 mb-12 pb-8 border-b border-[var(--color-ink)]/10">
            <MetaTag label="ETAPAS" value="1900 · 1927 · 1937 · 1940 · 1941–1942" />
            <MetaTag label="ARQUITECTOS" value="Jorge y Alfredo Velasco Urzúa" />
            <MetaTag label="EDIFICIOS" value="2 principales" />
          </div>

          {/* Texto + Visor de fotos (lado a lado) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-16 reveal items-start">
            {/* Texto */}
            <div className="space-y-5 text-[var(--color-mute)] text-base md:text-lg leading-relaxed">
              <p>
                El llamado «Recinto CRAV» es el resultado de múltiples etapas de
                construcción llevadas a cabo por la Compañía Refinería de Azúcar de
                Viña del Mar en Penco. Es una suerte de enciclopedia edificada en la
                cual podemos encontrar testimonios arquitectónicos de las primeras
                décadas del siglo&nbsp;XX, estructurados en madera, que nos muestran
                una inicial voluntad de desarrollar un proyecto de vivienda colectiva.
              </p>
              <p>
                Entre los años 1920 y 1930 aparecieron múltiples tipologías que
                incorporaron elementos eclécticos y diseños propios de una era donde
                la mirada historicista se nutrió de formas nacidas del Art Nouveau y
                del Art Déco.
              </p>
              <p>
                Con ocasión del terremoto de 1939, el barrio CRAV se expandió y se
                formó una idea homogénea de conjunto gracias al trabajo de los
                arquitectos Jorge y Alfredo Velasco Urzúa. Propusieron nuevas
                tipologías de vivienda, mucho más modernas, comprendiendo el
                significado de una ciudad industrial: la «familia refinera»,
                con viviendas en coexistencia con espacios públicos, zonas de juegos,
                un centro comercial y una capilla.
              </p>
              <p>
                Destacan una serie de casas de un piso y medio proyectadas siguiendo
                las cotas de los cerros, formando senderos peatonales y vehiculares,
                complementados por viviendas pareadas de dos niveles.
              </p>
            </div>

            {/* Visor de fotos — sticky para acompañar la lectura */}
            <div className="lg:sticky lg:top-24">
              <Visor fotos={recintoCravFotos} label="Recinto CRAV" />
            </div>
          </div>

          {/* Maquetas 3D isométricas */}
          <BloqueMaqueta fotos={recintoCravIso} label="Recinto CRAV" />
        </section>

        <Divider />

        {/* ─────────────────────────────────────
            02 · POBLACIÓN DESIDERIO GUZMÁN
            ───────────────────────────────────── */}
        <section id="desiderio-guzman">

          <SectionHeader
            numero="/ 02"
            subtitulo="Población"
            titulo={<>Desiderio<br /><span className="font-display-italic text-[var(--color-penco-blue-600)]">Guzmán</span></>}
          />

          {/* Meta datos */}
          <div className="reveal flex flex-wrap gap-8 mb-12 pb-8 border-b border-[var(--color-ink)]/10">
            <MetaTag label="AÑO" value="1961" />
            <MetaTag label="VIVIENDAS" value="84 (80 pareadas + 4 aisladas)" />
            <MetaTag label="TIPOLOGÍAS" value="2" />
            <MetaTag label="ARQUITECTOS" value="Santiago Roi y Ricardo Hempel" />
          </div>

          {/* Texto + Visor (visor a la izquierda en desktop) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-16 reveal items-start">
            {/* Visor primero en desktop */}
            <div className="order-2 lg:order-1 lg:sticky lg:top-24">
              <Visor fotos={desiderioFotos} label="Población Desiderio Guzmán" />
            </div>

            {/* Texto */}
            <div className="order-1 lg:order-2 space-y-5 text-[var(--color-mute)] text-base md:text-lg leading-relaxed">
              <p>
                La población Desiderio Guzmán corresponde a la expansión habitacional
                de la CRAV llevada a cabo entre finales de la década de 1950 y
                principios de los años 60. Los diseños fueron vanguardistas,
                apelando a geometrías claras, priorizando ventanales y
                antepechos de colores con accesos tipo porche.
              </p>
              <p>
                Con un diseño similar a los bungalows suburbanos estadounidenses,
                obra de los arquitectos Santiago Roi y Ricardo Hempel, este
                moderno conjunto residencial es una exploración donde el habitar
                doméstico de cada unidad coexiste con el habitar colectivo,
                donde los antejardines se tocan y comparten.
              </p>
              <p>
                Las casas incorporaron amplios antejardines, patios traseros
                generosos y dimensión para guardar un automóvil. Cada familia
                imprimió su sello con flores y plantas, forjando una paleta
                cromática que coexiste entre viviendas, calles y plazas.
              </p>
            </div>
          </div>

          {/* Maquetas 3D isométricas */}
          <BloqueMaqueta fotos={desiderioIso} label="Población Desiderio Guzmán" />
        </section>

        <Divider />

        {/* ─────────────────────────────────────
            03 · VILLA LOS RADALES
            ───────────────────────────────────── */}
        <section id="los-radales" className="pb-24 md:pb-36">

          <SectionHeader
            numero="/ 03"
            subtitulo="Villa"
            titulo={<>Los<br /><span className="font-display-italic text-[var(--color-penco-blue-600)]">Radales</span></>}
          />

          {/* Meta datos */}
          <div className="reveal flex flex-wrap gap-8 mb-12 pb-8 border-b border-[var(--color-ink)]/10">
            <MetaTag label="AÑO" value="1974 (ocupadas en 1976)" />
            <MetaTag label="VIVIENDAS" value="72 casas pareadas de 2 niveles" />
            <MetaTag label="ARQUITECTOS" value="Roberto Goycoolea, Luis Soto y Ramón Jofré" />
          </div>

          {/* Texto + Visor (lado a lado) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-16 reveal items-start">
            {/* Texto */}
            <div className="space-y-5 text-[var(--color-mute)] text-base md:text-lg leading-relaxed">
              <p>
                Villa Los Radales, ubicada en un terreno próximo al Recinto CRAV,
                corresponde a la última iniciativa habitacional de esta industria.
                Creada gracias a la gestión de la Cooperativa de Vivienda y Servicio
                Habitacional (iniciativa nacida en 1972), las casas comenzaron a ser
                ocupadas en 1976.
              </p>
              <p>
                El trío de arquitectos Roberto Goycoolea Infante, Ramón Jofré y
                Luis Soto diseñó viviendas de estructura de pino en densas bases
                aterrazadas, solución al irregular terreno del cerro. Resulta
                llamativo que el acceso a las casas sea lateral y no de frente.
              </p>
              <p>
                Las unidades incluyen antejardín, patio y estacionamiento,
                siguiendo una solución similar a la Población Desiderio Guzmán,
                pero con unidades de dos pisos y diseños propios de los años 70.
              </p>
            </div>

            {/* Visor de fotos */}
            <div className="lg:sticky lg:top-24">
              <Visor fotos={radalesFotos} label="Villa Los Radales" />
            </div>
          </div>

          {/* Maquetas 3D isométricas */}
          <BloqueMaqueta fotos={radalesIso} label="Villa Los Radales" />

        </section>
      </div>
    </div>
  )
}