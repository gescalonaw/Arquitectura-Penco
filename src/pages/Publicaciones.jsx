import { useState, useEffect, useCallback, useRef } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import { useScrollReveal } from '../hooks/useScrollReveal'

// Worker de pdf.js servido LOCALMENTE (misma versión que react-pdf).
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url'
pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker

// El PDF del libro. Ajusta la ruta si tu estructura es distinta.
import libro from '../assets/LIBRO/BarriosIndustriales.pdf'

// Recursos de pdf.js servidos desde /public/pdfjs (necesarios para imágenes
// JPEG2000 y fuentes embebidas). Ver instrucciones de copiado en el chat.
const PDF_OPTIONS = {
  standardFontDataUrl: '/pdfjs/standard_fonts/',
  wasmUrl: '/pdfjs/wasm/',
}

export default function Publicaciones() {
  const containerRef = useScrollReveal()

  const [numPages, setNumPages] = useState(null)
  const [pagina, setPagina] = useState(1)      // página izquierda del spread actual
  const [fullscreen, setFullscreen] = useState(false)
  const [anchoPagina, setAnchoPagina] = useState(500)
  const [inputPagina, setInputPagina] = useState('')
  const inlineRef = useRef(null)
  const fullscreenRef = useRef(null)

  // Saltar a una página específica (la normaliza al inicio de spread impar)
  function saltarAPagina(e) {
    e.preventDefault()
    const n = parseInt(inputPagina, 10)
    if (!n || !numPages) return
    const destino = Math.min(Math.max(1, n), numPages)
    // Llevar siempre al inicio del spread (página izquierda impar): 1,3,5...
    const izquierda = destino % 2 === 0 ? destino - 1 : destino
    setPagina(izquierda)
    setInputPagina('')
  }

  // Cálculo del ancho de cada página según el contenedor (siempre doble página)
  const calcularAncho = useCallback(() => {
    // Seleccionamos la "cinta métrica" correcta según el modo
    const cont = fullscreen ? fullscreenRef.current : inlineRef.current
    if (!cont) return
    
    const disponible = cont.clientWidth
    // Evitamos cálculos si el contenedor está oculto
    if (disponible === 0) return 

    const ancho = Math.min((disponible - 24) / 2, fullscreen ? 700 : 560)
    setAnchoPagina(Math.max(ancho, 240))
  }, [fullscreen])

  function onLoad({ numPages }) {
    setNumPages(numPages)
    // Recalcular cuando el documento ya está montado (evita el tamaño chico inicial)
    requestAnimationFrame(() => requestAnimationFrame(calcularAncho))
  }

  // Recalcular al montar, al cambiar de modo y al redimensionar
  useEffect(() => {
    // Doble requestAnimationFrame: garantiza que el contenedor ya tiene su ancho real
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(calcularAncho)
    )
    window.addEventListener('resize', calcularAncho)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', calcularAncho)
    }
  }, [calcularAncho])

  // Avance de a 2 páginas (modo libro)
  const irAnterior = useCallback(() => {
    setPagina((p) => Math.max(1, p - 2))
  }, [])

  const irSiguiente = useCallback(() => {
    setPagina((p) => {
      if (!numPages) return p
      return Math.min(numPages, p + 2)
    })
  }, [numPages])

  // Navegación con teclado
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowLeft') irAnterior()
      if (e.key === 'ArrowRight') irSiguiente()
      if (e.key === 'Escape' && fullscreen) setFullscreen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [irAnterior, irSiguiente, fullscreen])

  // Bloqueo de scroll en fullscreen
  useEffect(() => {
    if (fullscreen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = prev }
    }
  }, [fullscreen])

  // ¿Hay página derecha visible en este spread?
  const paginaDerecha = pagina + 1 <= (numPages || 0)

/* ───────── Función generadora del visor ───────── */
  const renderVisor = (isFull) => (
    <div
      ref={isFull ? fullscreenRef : inlineRef}
      className={`w-full flex justify-center ${isFull ? 'h-full items-center' : ''}`}
    >
      <div className="relative flex items-center justify-center select-none w-max">
        <Document
          file={libro}
          options={PDF_OPTIONS}
          onLoadSuccess={onLoad}
          loading={
            <div className={`flex items-center justify-center text-[var(--color-mute)] ${isFull ? 'h-screen w-screen' : 'h-[60vh] w-[50vw]'}`}>
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-[var(--color-penco-blue-200)] border-t-[var(--color-penco-blue-600)] rounded-full animate-spin" />
                <span className="text-sm">Cargando libro…</span>
              </div>
            </div>
          }
          error={
            <div className="text-center py-20 text-[var(--color-mute)]">
              <p>No se pudo cargar el PDF.</p>
            </div>
          }
        >
          <div className="flex gap-1 shadow-[0_20px_60px_-20px_rgba(21,24,42,0.4)] rounded-lg overflow-hidden bg-white transition-all duration-300">
            {/* Página izquierda */}
            <Page
              pageNumber={pagina}
              width={anchoPagina}
              renderTextLayer={false}
              renderAnnotationLayer={false}
            />
            {/* Página derecha */}
            {paginaDerecha && (
              <Page
                pageNumber={pagina + 1}
                width={anchoPagina}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            )}
          </div>
        </Document>

        {/* Flechas laterales */}
        {numPages && (
          <>
            <button
              onClick={irAnterior}
              disabled={pagina <= 1}
              aria-label="Página anterior"
              className="absolute -left-5 md:-left-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-md hover:bg-[var(--color-penco-gold)] disabled:opacity-30 disabled:cursor-not-allowed text-[var(--color-ink)] flex items-center justify-center transition-all duration-300"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              onClick={irSiguiente}
              disabled={pagina + 1 >= numPages}
              aria-label="Página siguiente"
              className="absolute -right-5 md:-right-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white shadow-md hover:bg-[var(--color-penco-gold)] disabled:opacity-30 disabled:cursor-not-allowed text-[var(--color-ink)] flex items-center justify-center transition-all duration-300"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </>
        )}
      </div>
    </div>
  )

  return (
    <div ref={containerRef}>
      <div className="max-w-[1480px] mx-auto px-6 md:px-10 lg:px-14 py-20 md:py-28">

        {/* ───────── Header ───────── */}
        <div className="grid grid-cols-12 gap-8 mb-12 reveal">
          <div className="col-span-12 md:col-span-9">
            <div className="eyebrow text-[var(--color-penco-blue-600)] mb-6">
              <span>Publicación</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl leading-[0.95] text-[var(--color-ink)] mb-6">
              Barrios
              <br />
              <span className="font-display-italic text-[var(--color-penco-blue-600)]">Industriales</span>
            </h1>
            <p className="text-base md:text-lg leading-relaxed text-[var(--color-mute)] max-w-2xl">
              Publicación que recoge la investigación arquitectónica y patrimonial
              de los barrios industriales de Penco. Recorre sus páginas como un
              libro o descarga el documento completo.
            </p>
          </div>
        </div>

        {/* ───────── Barra de controles ───────── */}
        <div className="reveal flex flex-wrap items-center justify-between gap-3 mb-8 pb-6 border-b border-[var(--color-ink)]/10">
          {/* Salto a página */}
          {numPages && (
            <form onSubmit={saltarAPagina} className="flex items-center gap-2">
              <label className="text-sm text-[var(--color-mute)]">Ir a página</label>
              <input
                type="number"
                min="1"
                max={numPages}
                value={inputPagina}
                onChange={(e) => setInputPagina(e.target.value)}
                placeholder={String(pagina)}
                className="w-20 px-3 py-2 rounded-full border border-[var(--color-ink)]/15 text-sm text-[var(--color-ink)] text-center focus:border-[var(--color-penco-gold)] focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-full bg-[var(--color-ink)] text-white text-sm font-medium hover:bg-[var(--color-penco-blue-600)] transition-colors duration-300"
              >
                Ir
              </button>
              <span className="text-sm text-[var(--color-mute)] hidden sm:inline">de {numPages}</span>
            </form>
          )}

          <div className="flex items-center gap-3">
          {/* Pantalla completa */}
          <button
            onClick={() => setFullscreen(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-ink)]/15 hover:border-[var(--color-penco-gold)] hover:bg-[var(--color-penco-gold)]/10 text-sm font-medium text-[var(--color-ink)] transition-all duration-300"
          >
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path d="M6 2H2v4M10 2h4v4M6 14H2v-4M10 14h4v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="hidden sm:inline">Pantalla completa</span>
          </button>

          {/* Descargar */}
          <a
            href={libro}
            download
            className="btn-primary"
            style={{ background: 'var(--color-penco-blue-600)', borderColor: 'var(--color-penco-blue-600)' }}
          >
            <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
              <path d="M8 2v8m0 0L5 7m3 3l3-3M3 13h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="hidden sm:inline">Descargar PDF</span>
          </a>
          </div>
        </div>

        {/* ───────── Visor inline ───────── */}
        <div className="reveal bg-[var(--color-paper)] rounded-2xl p-6 md:p-12 flex flex-col items-center">
          {renderVisor(false)}

          {/* Indicador de página (sin barra de progreso) */}
          {numPages && (
            <div className="mt-8 text-sm text-[var(--color-mute)]">
              <span className="font-medium text-[var(--color-ink)]">
                {paginaDerecha ? `Páginas ${pagina}–${pagina + 1}` : `Página ${pagina}`}
              </span>
              <span className="mx-2">·</span>
              <span>{numPages} en total</span>
            </div>
          )}
        </div>
      </div>

      {/* ───────── Modo pantalla completa ───────── */}
      {fullscreen && (
        <div
          className="fixed inset-0 z-[9999] flex flex-col"
          style={{
            background: 'rgba(15, 18, 30, 0.96)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            animation: 'fade-in 0.3s var(--ease-out-quart) both',
          }}
        >
          {/* Barra superior */}
          <div className="flex items-center justify-between px-5 md:px-8 py-4 text-white">
            <div className="text-sm">
              <div className="section-number text-[var(--color-penco-gold)] mb-1">Barrios Industriales</div>
              <div className="font-medium">
                {paginaDerecha ? `Páginas ${pagina}–${pagina + 1}` : `Página ${pagina}`}
                <span className="text-white/40"> / {numPages}</span>
              </div>
            </div>

            <button
              onClick={() => setFullscreen(false)}
              aria-label="Cerrar"
              className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all duration-300 hover:rotate-90"
            >
              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
                <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Visor centrado */}
          <div className="flex-1 flex items-center justify-center px-4 md:px-16 overflow-hidden">
            {renderVisor(true)}
          </div>

          <div className="text-center text-xs text-white/40 tracking-wider pb-4 hidden md:block">
            ESC para salir · ← → para navegar
          </div>
        </div>
      )}
    </div>
  )
}