import { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { useScrollReveal } from '../../hooks/useScrollReveal'

/* ─────────────────────────────────────────────
   IMÁGENES
   ───────────────────────────────────────────── */
import fondoVipla   from '../../assets/VIPLA/FONDO-VIPLA.png'

import vipla1   from '../../assets/VIPLA/fotos/VIPLA_1WEB.png'
import vipla2   from '../../assets/VIPLA/fotos/VIPLA_2WEB.png'
import vipla3   from '../../assets/VIPLA/fotos/VIPLA_3WEB.png'
import vipla4   from '../../assets/VIPLA/fotos/VIPLA_4WEB.png'
import vipla5   from '../../assets/VIPLA/fotos/VIPLA_5WEB.png'
import vipla6   from '../../assets/VIPLA/fotos/VIPLA_6WEB.png'
import vipla7   from '../../assets/VIPLA/fotos/VIPLA_7WEB.png'
import vipla8   from '../../assets/VIPLA/fotos/VIPLA_8WEB.png'
import vipla9   from '../../assets/VIPLA/fotos/VIPLA_9WEB.png'
import vipla10  from '../../assets/VIPLA/fotos/VIPLA_10WEB.png'
import vipla11  from '../../assets/VIPLA/fotos/VIPLA_11WEB.png'
import vipla12  from '../../assets/VIPLA/fotos/VIPLA_12WEB.png'
import vipla13  from '../../assets/VIPLA/fotos/VIPLA_13WEB.png'
import vipla14  from '../../assets/VIPLA/fotos/VIPLA_14WEB.png'
import vipla15  from '../../assets/VIPLA/fotos/VIPLA_15WEB.png'
import vipla16  from '../../assets/VIPLA/fotos/VIPLA_16WEB.png'
import vipla17  from '../../assets/VIPLA/fotos/VIPLA_17WEB.png'
import vipla18  from '../../assets/VIPLA/fotos/VIPLA_18WEB.png'
import vipla19  from '../../assets/VIPLA/fotos/VIPLA_19WEB.png'
import vipla20  from '../../assets/VIPLA/fotos/VIPLAWEB.png'

import viplaPlano from '../../assets/VIPLA/fotos/Plano_Vipla.jpg'

import viplaIso1 from '../../assets/VIPLA/Edificios Isométricos/VIPLA2_1.png'
import viplaIso2 from '../../assets/VIPLA/Edificios Isométricos/VIPLA2.png'
import viplaIso3 from '../../assets/VIPLA/Edificios Isométricos/VIPLA3.png'
import viplaIso4 from '../../assets/VIPLA/Edificios Isométricos/VIPLA2_Azul_1.png'
import viplaIso5 from '../../assets/VIPLA/Edificios Isométricos/VIPLA2_Azul.png'
import viplaIso6 from '../../assets/VIPLA/Edificios Isométricos/VIPLA3_Azul.png'

/* ─────────────────────────────────────────────
   Agrupación de fotos
   ───────────────────────────────────────────── */
const viplaFotos = [
  vipla1, vipla2, vipla3, vipla4, vipla5, vipla6, vipla7, vipla8, vipla9, vipla10,
  vipla11, vipla12, vipla13, vipla14, vipla15, vipla16, vipla17, vipla18, vipla19, vipla20,
]
// Maquetas isométricas: amarillas por defecto (cambiar a viplaIso4/5/6 para la versión azul)
const viplaIso = [viplaIso1, viplaIso2, viplaIso3]

/* ─────────────────────────────────────────────
   Componente: Lightbox (modal de imagen expandida)
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
   Componente: Visor (foto grande + thumbnails)
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
   Componente: MetaTag
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
   Componente: BloqueMaqueta
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
   Componente: BloquePlano
   ───────────────────────────────────────────── */
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
export default function VIPLA() {
  const containerRef = useScrollReveal()

  return (
    <div ref={containerRef}>

      {/* ══════════════════════════════════════ HERO ══════════════════════════════════════ */}
      <section className="relative min-h-[70vh] flex flex-col justify-end text-white overflow-hidden grain">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
            backgroundImage: `url(${fondoVipla})`,
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
              VIPLA
            </h1>
            <p className="text-base md:text-lg text-white/80 max-w-xl leading-relaxed">
              Fábrica de Vidrios Planos de Lirquén. Una población obrera levantada
              bajo el modelo paternalista industrial, testimonio de la producción
              de vidrio que marcó al territorio.
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════ CONTENIDO ══════════════════════════════════════ */}
      <div className="max-w-[1480px] mx-auto px-6 md:px-10 lg:px-14">

        <section className="pt-24 md:pt-36 pb-24 md:pb-36">

          {/* Header */}
          <div className="reveal mb-12 md:mb-16">
            <div className="eyebrow text-[var(--color-penco-blue-600)] mb-4">
              <span>Población</span>
            </div>
            <div className="flex items-end gap-4 flex-wrap">
              <h2 className="font-display text-4xl md:text-6xl lg:text-7xl leading-[0.95] text-[var(--color-ink)]">
                Población<br />
                <span className="font-display-italic text-[var(--color-penco-blue-600)]">VIPLA</span>
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

          {/* Meta datos */}
          <div className="reveal flex flex-wrap gap-8 mb-12 pb-8 border-b border-[var(--color-ink)]/10">
            <MetaTag label="AÑO" value="Finalizada en 1952" />
            <MetaTag label="UNIDADES" value="107 unidades en 8 tipologías" />
            <MetaTag label="INICIO FÁBRICA" value="1933" />
          </div>

          {/* Texto + Visor */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-16 reveal items-start">
            <div className="space-y-5 text-[var(--color-mute)] text-base md:text-lg leading-relaxed">
              <p>
                La Fábrica de Vidrios Planos de Lirquén inició sus operaciones en
                1933 y rápidamente se transformó en una de las más relevantes dentro
                de la producción de vidrio nacional.
              </p>
              <p>
                La idea de contar con una población para sus trabajadores, siguiendo
                el modelo paternalista, tomó fuerza luego del terremoto de 1939 con
                la construcción de pabellones de emergencia ubicados al interior de
                la fábrica.
              </p>
              <p>
                Años más tarde, en 1947, se inició la construcción de las primeras
                viviendas para obreros. En 1951, el presidente Gabriel González
                Videla colocó la primera piedra de la nueva etapa de la población,
                la que se terminó de construir en 1952. Consistió en un conjunto de
                viviendas continuas de 2 pisos, en las que el segundo nivel era de
                tipo mansarda. Las viviendas eran cómodas y con todos los servicios
                básicos para su habitabilidad.
              </p>
              <p>
                El sistema paternalista implementado por VIPLA se manifestó en
                múltiples aspectos, desde establecer códigos de conducta relacionados
                con la vida en comunidad hasta el establecimiento de normas de cuidado
                de jardines e, incluso, de especies de árboles presentes en la población.
              </p>
            </div>

            <div className="lg:sticky lg:top-24">
              <Visor fotos={viplaFotos} label="Población VIPLA" />
            </div>
          </div>

          {/* Maquetas 3D */}
          <div className="mb-16">
            <BloqueMaqueta fotos={viplaIso} label="VIPLA" />
          </div>

          {/* Plano */}
          <BloquePlano plano={viplaPlano} label="VIPLA" />

        </section>
      </div>
    </div>
  )
}