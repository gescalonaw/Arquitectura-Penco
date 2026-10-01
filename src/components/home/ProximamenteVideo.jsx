import { useState } from 'react'

/**
 * Sección "Próximamente" con video de YouTube embebido.
 *
 * CÓMO USAR:
 * 1. Reemplazá YOUTUBE_ID con el ID de tu video.
 *    Si tu URL es https://www.youtube.com/watch?v=ABC123  →  el ID es "ABC123"
 *    Si tu URL es https://youtu.be/ABC123                 →  el ID es "ABC123"
 * 2. Importalo en Home.jsx y colocalo donde quieras (sugerencia: después del hero).
 *
 * Usa "facade pattern": muestra la miniatura del video y solo carga el
 * reproductor de YouTube cuando el usuario hace click. Esto hace que la
 * página cargue rápido (no descarga el pesado iframe de YouTube de entrada).
 */

const YOUTUBE_ID = 'BgDdxaeZVLM' // ← REEMPLAZAR

export default function ProximamenteVideo() {
  const [playing, setPlaying] = useState(false)

  // Miniatura de máxima calidad de YouTube
  const thumbnail = `https://img.youtube.com/vi/${YOUTUBE_ID}/maxresdefault.jpg`

  return (
    <section className="bg-[var(--color-ink)] text-white relative overflow-hidden grain">
      {/* Acento dorado difuso de fondo */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] rounded-full bg-[var(--color-penco-gold)]/10 blur-[120px] pointer-events-none" />

      <div className="relative max-w-[1480px] mx-auto px-6 md:px-10 lg:px-14 py-24 md:py-36">
        {/* Header de sección */}
        <div className="grid grid-cols-12 gap-8 mb-12 md:mb-16 reveal">
          <div className="col-span-12 md:col-span-8">
            <div className="eyebrow text-[var(--color-penco-gold)] mb-5">
              <span className="section-number">/ Avance</span>
              <span>Próximamente</span>
            </div>
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95]">
              Un adelanto de
              <br />
              <span className="font-display-italic text-[var(--color-penco-gold)]">lo que viene.</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-4 md:pt-8 flex flex-col justify-end">
            <p className="text-base md:text-lg leading-relaxed text-white/70 max-w-md">
              Estamos trabajando en el archivo completo de los barrios
              industriales. Mientras tanto, te dejamos este primer registro
              audiovisual del proyecto.
            </p>
          </div>
        </div>

        {/* Reproductor de video */}
        <div className="reveal">
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] group">
            {playing ? (
              // Una vez que el usuario hace click, cargamos el iframe real
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0`}
                title="Video del proyecto Arquitectura de Penco"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              // Fachada: miniatura + botón de play (carga instantánea)
              <button
                onClick={() => setPlaying(true)}
                className="absolute inset-0 w-full h-full cursor-pointer"
                aria-label="Reproducir video"
              >
                {/* Miniatura */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.2s] group-hover:scale-105"
                  style={{
                    backgroundImage: `url('${thumbnail}')`,
                    transitionTimingFunction: 'var(--ease-out-expo)',
                  }}
                />
                {/* Overlay oscuro para legibilidad */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30 group-hover:from-black/50 transition-colors duration-500" />

                {/* Botón de play central */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Anillo pulsante */}
                    <div className="absolute inset-0 rounded-full bg-[var(--color-penco-gold)]/40 animate-ping" style={{ animationDuration: '2.5s' }} />
                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-[var(--color-penco-gold)] flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shadow-lg">
                      <svg className="w-8 h-8 md:w-10 md:h-10 text-[var(--color-ink)] ml-1" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Etiqueta inferior */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 flex items-end justify-between">
                  <div className="text-left">
                    <div className="section-number text-white/70 mb-1">VIDEO · PROYECTO</div>
                    <div className="font-display text-2xl md:text-3xl">Arquitectura de Penco</div>
                  </div>
                  <div className="hidden md:flex items-center gap-2 text-sm text-white/80">
                    <span>Ver ahora</span>
                    <span className="text-[var(--color-penco-gold)]">→</span>
                  </div>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
