import { Link } from 'react-router-dom'
import { barrios } from '../data/barrios'
import { useScrollReveal } from '../hooks/useScrollReveal'

// ✅ Imports de imágenes — Vite las procesa y optimiza automáticamente
import fondoHome from '../assets/fondohome.png'
import imagenCRAV from '../assets/CRAV01.png'

export default function Home() {
  const containerRef = useScrollReveal()

  return (
    <div ref={containerRef}>
      {/* ===================================================================
          HERO — composición editorial asimétrica
          =================================================================== */}
      <section className="relative min-h-screen flex flex-col text-white overflow-hidden grain">
        {/* Fondo: imagen + gradiente sofisticado (no overlay sólido) */}
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{
           backgroundImage: `url('${fondoHome}')`,
            animation: 'scale-in 1.6s var(--ease-out-expo) both',
          }}
        />

        {/* Contenido */}
        <div className="relative z-10 flex-1 flex flex-col max-w-[1480px] mx-auto px-6 md:px-10 lg:px-14 w-full pt-32 md:pt-40 pb-16">
          {/* Header meta del hero */}
          <div className="flex justify-between items-start mb-auto">
            <div className="space-y-1 animate-[fade-in_0.8s_var(--ease-out-quart)_0.2s_both]">
              <div className="eyebrow text-[var(--color-penco-gold)]">
                Patrimonio industrial · Penco
              </div>
            </div>
            <div className="hidden md:block text-right space-y-1 animate-[fade-in_0.8s_var(--ease-out-quart)_0.4s_both]">
              <div className="section-number text-[var(--color-penco-gold)]">UN PROYECTO DE</div>
              <div className="text-sm font-medium">Cineclub Penco</div>
            </div>
          </div>

          {/* Título principal — composición editorial */}
          <div className="grid grid-cols-12 gap-6 md:gap-8 items-end mt-auto">
            <div className="col-span-12 lg:col-span-8 animate-[fade-up_1s_var(--ease-out-expo)_0.3s_both]">
              <h1 className="font-display text-[13vw] md:text-[10vw] lg:text-[7rem] xl:text-[9rem] leading-[0.9]">
                Barrios
                <br />
                <span className="text-[var(--color-penco-gold)]">Industriales</span>
              </h1>
            </div>

            <div className="col-span-12 lg:col-span-4 lg:pb-6 animate-[fade-up_1s_var(--ease-out-expo)_0.6s_both]">
              <p className="text-base md:text-lg leading-relaxed text-white max-w-md">
                Sitio dedicado al rescate y documentación del patrimonio
                arquitectónico industrial de Penco. Recorre las poblaciones
                obreras de <span className="text-[var(--color-penco-gold)]">CRAV</span>,{' '}
                <span className="text-[var(--color-penco-gold)]">VIPLA</span> y{' '}
                <span className="text-[var(--color-penco-gold)]">FANALOZA</span> a
                través de fotografías, maquetas y archivos históricos.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <Link to="/proyecto" className="btn-primary" style={{ background: 'white', color: 'var(--color-ink)', borderColor: 'white' }}>
                  Sobre el proyecto
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
                <Link to="/mapa" className="btn-ghost text-white">
                  <span>Ver mapa</span>
                  <span className="arrow">→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Footer del hero — barra de metadatos 
          <div className="mt-16 pt-6 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-6 animate-[fade-in_1s_var(--ease-out-quart)_0.9s_both]">
            {[
              { label: 'Barrios', value: '3' },
              { label: 'Poblaciones', value: '5' },
              { label: 'Maquetas 3D', value: '5' },
              { label: 'Publicación', value: 'Libro + PDF' },
            ].map((stat) => (
              <div key={stat.label} className="space-y-1">
                <div className="section-number text-white/60">{stat.label}</div>
                <div className="font-display text-2xl md:text-3xl">{stat.value}</div>
              </div>
            ))}
          </div>  */}
        </div> 


      </section>

      {/* ===================================================================
          GRILLA DE BARRIOS — la sección protagonista
          =================================================================== */}
      <section className="max-w-[1480px] mx-auto px-6 md:px-10 lg:px-14 py-24 md:py-36">
        {/* Header de sección */}
        <div className="grid grid-cols-12 gap-8 mb-16 md:mb-24 reveal">
          <div className="col-span-12 md:col-span-7">
            <div className="eyebrow text-[var(--color-penco-blue-600)] mb-5">
              <span>Los barrios</span>
            </div>
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-[var(--color-ink)]">
              Tres fábricas,
              <br />
              <span className="font-display-italic text-[var(--color-penco-blue-600)]">cinco poblaciones,</span>
              <br />
              una memoria.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5 md:pt-8 flex flex-col justify-end">
            <p className="text-base md:text-lg leading-relaxed text-[var(--color-mute)] max-w-md">
              Cada barrio fue construido alrededor de una industria que dio
              forma al modo de habitar de generaciones de pencones. Hoy
              quedan vestigios, planos, memoria oral y arquitectura. Esto
              es lo que documentamos.
            </p>
            <Link to="/mapa" className="btn-ghost mt-8 text-[var(--color-ink)] self-start">
              <span>Explorar en el mapa</span>
              <span className="arrow">→</span>
            </Link>
          </div>
        </div>

        {/* Cards de barrios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-8 stagger">
          {barrios.map((barrio, idx) => (
            <Link
              key={barrio.slug}
              to={`/barrios/${barrio.slug}`}
              className="group reveal block relative overflow-hidden bg-[var(--color-paper)] aspect-[3/4] rounded-2xl"
              style={{
                boxShadow: 'var(--shadow-card)',
                transition: 'box-shadow 0.6s var(--ease-out-expo), transform 0.6s var(--ease-out-expo)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)'
                e.currentTarget.style.transform = 'translateY(-4px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'var(--shadow-card)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              {/* Imagen con zoom suave al hover */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.2s] group-hover:scale-110"
                style={{
                  backgroundImage: barrio.imagen
                    ? `url('${barrio.imagen}')`
                    : "url('https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1000&q=80')",
                  transitionTimingFunction: 'var(--ease-out-expo)',
                }}
              />
              {/* Gradiente de lectura */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-[var(--color-ink)]/60 to-transparent" />
              {/* Borde dorado sutil al hover */}
              <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-[var(--color-penco-gold)]/40 transition-colors duration-500" />

              {/* Contenido */}
              <div className="relative h-full flex flex-col p-6 lg:p-8 text-white">
                <div className="flex items-start justify-between">
                  <span className="section-number text-white/70">
                    / {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center group-hover:border-[var(--color-penco-gold)] group-hover:bg-[var(--color-penco-gold)] transition-all duration-500">
                    <svg
                      className="w-3.5 h-3.5 text-white group-hover:text-[var(--color-ink)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-500"
                      viewBox="0 0 16 16" fill="none"
                    >
                      <path d="M5 11L11 5M11 5H6M11 5V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>

                {/* Descripción y tags crecen para llenar el espacio */}
                <div className="flex-1 flex flex-col justify-end py-5">
                  <p className="text-sm text-white/85 leading-relaxed max-w-xs">
                    {barrio.descripcion}
                  </p>
                  {barrio.recintos && barrio.recintos.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {barrio.recintos.map((r) => (
                        <span
                          key={r.id}
                          className="text-[10px] tracking-wider uppercase px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm"
                        >
                          {r.nombre}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Título siempre al mismo nivel (abajo fijo) */}
                <div className="pt-4 border-t border-white/15">
                  <h3 className="font-display text-5xl lg:text-6xl mb-1 tracking-tight">
                    {barrio.nombre}
                  </h3>
                  <p className="text-xs lg:text-sm text-white/70 font-mono tracking-wider uppercase">
                    {barrio.nombreCompleto}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===================================================================
          BLOQUE EDITORIAL — cita destacada
          =================================================================== */}
      <section className="bg-[var(--color-penco-blue-600)]/80 py-24 md:py-36 reveal">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-14">
          <div className="grid grid-cols-12 gap-8 items-center">
            <div className="col-span-12 md:col-span-2 flex md:flex-col items-center md:items-start gap-3">
              <svg className="w-12 h-12 text-[var(--color-penco-gold-deep)]" viewBox="0 0 48 48" fill="none">
                <path d="M14 30c0-6 4-10 10-12v4c-4 1.5-6 4.5-6 8h6v10H14V30zm14 0c0-6 4-10 10-12v4c-4 1.5-6 4.5-6 8h6v10H28V30z" fill="currentColor"/>
              </svg>
            
            </div>
            <div className="col-span-12 md:col-span-10">
              <p className="font-display-italic text-3xl md:text-5xl lg:text-6xl leading-[1.1] text-[var(--color-ink)]">
                «La creación de barrios obreros determinó la conformación de paisajes urbanos (...) Barrios complejos donde no 
                solamente la vivienda estaba contemplada, sino que numerosos otros aspectos como la actividad social, deportiva
                 o cultural estaban insertos en el diario vivir.».
              </p>
              <div className="mt-8 flex items-center gap-3">
                <div className="w-12 h-px bg-[var(--color-penco-gold-deep)]" />
                <div className="text-sm tracking-wider uppercase font-medium text-[var(--color-black)]">
                  Luis Darmendrail Salvo (Arquitecto e Investigador)
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          RECURSOS DEL ARCHIVO — grilla refinada
          =================================================================== */}
      <section className="max-w-[1480px] mx-auto px-6 md:px-10 lg:px-14 py-24 md:py-36">
        <div className="grid grid-cols-12 gap-8 mb-16 md:mb-20 reveal">
          <div className="col-span-12 md:col-span-8">
            <div className="eyebrow text-[var(--color-penco-blue-600)] mb-5">
              <span>Recursos del archivo</span>
            </div>
            <h2 className="font-display text-5xl md:text-7xl leading-[0.95] text-[var(--color-ink)]">
              Material para
              <br />
              <span className="font-display-italic">investigar y explorar.</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 stagger">
          {[
            {
              to: '/videos',
              label: 'Videos',
              desc: 'Registros audiovisuales de los recintos industriales y testimonios de quienes habitaron sus poblaciones obreras.',
              icon: (
                <svg viewBox="0 0 32 32" fill="none">
                  <rect x="2" y="6" width="28" height="20" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M13 12l7 4-7 4z" fill="currentColor"/>
                </svg>
              ),
            },
            {
              to: '/publicaciones',
            
              label: 'Libro',
              desc: '«Barrios Industriales» — publicación que recoge la investigación arquitectónica y patrimonial completa.',
              icon: (
                <svg viewBox="0 0 32 32" fill="none">
                  <path d="M5 6v20c0 0 3-2 11-2s11 2 11 2V6c0 0-3-2-11-2S5 6 5 6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                  <path d="M16 4v22" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              ),
            },
            {
              to: '/maquetas-3d',
              
              label: 'Maquetas',
              desc: 'Reconstrucciones tridimensionales navegables de los recintos, basadas en planos históricos y observación directa.',
              icon: (
                <svg viewBox="0 0 32 32" fill="none">
                  <path d="M16 4l11 6v12l-11 6-11-6V10z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                  <path d="M5 10l11 6 11-6M16 16v12" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              ),
            },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="reveal group relative bg-white rounded-2xl p-8 lg:p-10 overflow-hidden card"
            >
              <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-[var(--color-penco-gold)]/0 group-hover:bg-[var(--color-penco-gold)]/15 transition-all duration-700 blur-2xl" />

              <div className="relative">
                <div className="flex items-start justify-end mb-12">
                  <div className="w-12 h-12 text-[var(--color-penco-blue-600)] group-hover:text-[var(--color-penco-gold-deep)] transition-colors duration-500">
                    {item.icon}
                  </div>
                </div>

                <h3 className="font-display-italic text-4xl mb-3 text-[var(--color-ink)]">
                  {item.label}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--color-mute)] mb-8">
                  {item.desc}
                </p>

                <div className="flex items-center gap-2 text-sm font-medium text-[var(--color-ink)] group-hover:text-[var(--color-penco-gold-deep)] transition-colors">
                  <span>Acceder</span>
                  <svg
                    className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1"
                    viewBox="0 0 16 16" fill="none"
                  >
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===================================================================
          CTA FINAL — visita el mapa
          =================================================================== */}
      <section className="bg-[var(--color-ink)] text-white relative overflow-hidden grain">
        <div className="absolute inset-0 opacity-100">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
           backgroundImage: `url('${imagenCRAV}')`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-ink)] via-[var(--color-ink)]/80 to-transparent" />
        </div>

        <div className="relative max-w-[1480px] mx-auto px-6 md:px-10 lg:px-14 py-24 md:py-32 grid grid-cols-12 gap-8 items-center reveal">
          <div className="col-span-12 md:col-span-8">
            <div className="eyebrow text-[var(--color-penco-gold)] mb-6">
              
              <span>Cartografía</span>
            </div>
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-8">
              Explora los barrios
              <br />
              <span className="font-display-italic text-[var(--color-penco-gold)]">en el territorio.</span>
            </h2>
            <p className="text-lg text-white/75 max-w-xl leading-relaxed mb-10">
              Un mapa interactivo con capas para cada barrio industrial,
              edificios destacados y rutas sugeridas.
            </p>
            <Link to="/mapa" className="btn-primary" style={{ background: 'var(--color-penco-gold)', color: 'var(--color-ink)', borderColor: 'var(--color-penco-gold)' }}>
              Abrir el mapa
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}