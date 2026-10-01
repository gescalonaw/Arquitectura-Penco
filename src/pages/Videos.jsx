import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

/* ─────────────────────────────────────────────
   VIDEOS — reemplazá cada "id" por el ID real del video de YouTube.
   Si la URL es https://www.youtube.com/watch?v=ABC123  → el id es "ABC123"
   Si la URL es https://youtu.be/ABC123                 → el id es "ABC123"
   ───────────────────────────────────────────── */
const videos = [
  {
    barrio: 'CRAV',
    subtitulo: 'Compañía Refinería de Azúcar',
    id: 'Hj7DEwrCNac',
    descripcion: 'Registro audiovisual del Recinto CRAV y sus poblaciones obreras.',
    lenguaDeSenas: 'https://youtu.be/kNjZjbcSEUQ',
  },
  {
    barrio: 'VIPLA',
    subtitulo: 'Fábrica de Vidrios Planos',
    id: 'J9u1cl6metU',
    descripcion: 'Recorrido por la población obrera de la fábrica de vidrio de Lirquén.',
    lenguaDeSenas: 'https://youtu.be/BIxIJHuRrAs',
  },
  {
    barrio: 'FANALOZA',
    subtitulo: 'Fábrica Nacional de Loza',
    id: '0my9FEPCZ5A',
    descripcion: 'Documentación de las poblaciones Juan Díaz y Facundo Díaz.',
    lenguaDeSenas: 'https://youtu.be/hPkycBG7uB4',
  },
]

/* ─────────────────────────────────────────────
   Componente: reproductor con carga diferida (facade)
   Muestra la miniatura hasta que el usuario hace clic;
   recién ahí carga el iframe de YouTube (mejor rendimiento).
   ───────────────────────────────────────────── */
function VideoPlayer({ id, barrio }) {
  const [playing, setPlaying] = useState(false)
  const thumbnail = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`

  return (
    <div className="relative aspect-video rounded-2xl overflow-hidden bg-[var(--color-ink)] group"
      style={{ boxShadow: 'var(--shadow-card)' }}
    >
      {playing ? (
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
          title={`Video ${barrio}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          onClick={() => setPlaying(true)}
          className="absolute inset-0 w-full h-full cursor-pointer"
          aria-label={`Reproducir video de ${barrio}`}
        >
          {/* Miniatura */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.2s] group-hover:scale-105"
            style={{
              backgroundImage: `url('${thumbnail}')`,
              transitionTimingFunction: 'var(--ease-out-expo)',
            }}
          />
          {/* Overlay para legibilidad */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/20 group-hover:from-black/50 transition-colors duration-500" />

          {/* Botón de play */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-[var(--color-penco-gold)]/40 animate-ping" style={{ animationDuration: '2.5s' }} />
              <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-[var(--color-penco-gold)] flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shadow-lg">
                <svg className="w-7 h-7 md:w-9 md:h-9 text-[var(--color-ink)] ml-1" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        </button>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────
   Página principal
   ───────────────────────────────────────────── */
export default function Videos() {
  const containerRef = useScrollReveal()

  return (
    <div ref={containerRef}>
      <div className="max-w-[1480px] mx-auto px-6 md:px-10 lg:px-14 py-20 md:py-28">

        {/* ───────── Header ───────── */}
        <div className="grid grid-cols-12 gap-8 mb-16 reveal">
          <div className="col-span-12 md:col-span-9">
            <div className="eyebrow text-[var(--color-penco-blue-600)] mb-6">
              <span>Registros audiovisuales</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl leading-[0.95] text-[var(--color-ink)] mb-6">
              Videos
            </h1>
            <p className="text-base md:text-lg leading-relaxed text-[var(--color-mute)] max-w-2xl">
              Registros audiovisuales de los tres barrios industriales de Penco.
              Cada video recorre la arquitectura, la memoria y la vida cotidiana
              de las poblaciones obreras de CRAV, VIPLA y FANALOZA.
            </p>
          </div>
        </div>

        {/* ───────── Lista de videos ───────── */}
        <div className="space-y-16 md:space-y-24">
          {videos.map((video, idx) => (
            <section key={video.barrio} className="reveal grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Info del video */}
              <div className={`lg:col-span-4 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="section-number text-[var(--color-mute)] mb-3">
                  / {String(idx + 1).padStart(2, '0')}
                </div>
                <div className="eyebrow text-[var(--color-penco-gold-deep)] mb-3">
                  <span>{video.subtitulo}</span>
                </div>
                <h2 className="font-display text-4xl md:text-5xl text-[var(--color-ink)] mb-4">
                  {video.barrio}
                </h2>
                <p className="text-base leading-relaxed text-[var(--color-mute)]">
                  {video.descripcion}
                </p>
                {video.lenguaDeSenas && (
                  <a
                    href={video.lenguaDeSenas}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-5 text-sm font-medium text-[var(--color-penco-blue-600)] hover:text-[var(--color-penco-gold-deep)] transition-colors duration-300"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.55-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.45.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Ver video en Lengua de Señas
                  </a>
                )}
              </div>

              {/* Reproductor */}
              <div className={`lg:col-span-8 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                <VideoPlayer id={video.id} barrio={video.barrio} />
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}