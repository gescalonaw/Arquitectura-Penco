import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function Proyecto() {
  const location = useLocation()

  // Efecto para scrollear hacia el ID si viene en la URL
  useEffect(() => {
    if (location.hash) {
      // Extraemos el texto después del '#', en este caso "equipo"
      const id = location.hash.replace('#', '')
      const elemento = document.getElementById(id)
      
      if (elemento) {
        // Usamos un pequeño timeout para darle tiempo a React de renderizar la vista
        setTimeout(() => {
          elemento.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    }
  }, [location])

  const equipo = [
    {
      nombre: 'Erick Vásquez',
      rol: ' Coordinador de Proyecto',
      link: 'https://www.instagram.com/evasquezi/',
    },
    {
      nombre: 'Luis Darmendrail',
      rol: 'Investigación Arquitectónica',
      link: 'https://www.instagram.com/historiaarquitectonicaccp/',
    },
    {
      nombre: 'Tomás Chamorro',
      rol: 'Modelado e Impresión 3D',
      link: 'https://www.instagram.com/tomaceta/',
    },
    {
      nombre: 'Andrea Vásquez',
      rol: 'Diseño y Dirección de Arte',
      link: '',
    },
    {
      nombre: 'Marcelo Gotelli',
      rol: ' Creador Audiovisual',
      link: 'https://www.youtube.com/@marceloTV2007',
    },
  ]

  return (
    <main className="max-w-[1180px] mx-auto px-4 md:px-6 lg:px-8 py-20 md:py-28">
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-10">
          <div className="eyebrow text-[var(--color-penco-blue-600)] mb-6">
            <span>Sobre el proyecto</span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl lg:text-6xl leading-[0.95] text-[var(--color-ink)] mb-8">
            Arquitectura de Penco: Barrios Industriales
          </h1>
        </div>
      </div>

      <section className="mt-0 grid grid-cols-1 gap-12">
        <div className="bg-[var(--color-paper)] p-9 rounded-3xl border border-[var(--color-penco-blue-200)]/40">
          <div className="grid gap-7">
            {/* ... tus artículos de texto se mantienen igual ... */}
            <article>
              <p className="text-base leading-relaxed text-[var(--color-ink-soft)] text-justify">
                El desarrollo urbano de Penco y sus distintos sectores ha estado fuertemente vinculado a la presencia
                 industrial, iniciada a fines del siglo XIX y consolidada durante el siglo XX. Este proceso dio origen 
                 a una serie de inmuebles y estructuras urbanas que, con el paso del tiempo, debieron enfrentar tanto 
                 desastres naturales como transformaciones derivadas de la acción humana.
              </p>
            </article>
            <article>
              <p className="text-base leading-relaxed text-[var(--color-ink-soft)] text-justify">
                Muchos de estos inmuebles persisten como hitos territoriales y testimonios materiales de la historia
                local. Ejemplo de ello fueron las actividades asociadas a la fabricación de vidrio (VIPLA) en la
                localidad de Lirquén, así como el desarrollo industrial impulsado por la Fábrica Nacional de Loza
                de Penco (Fanaloza) y la Compañía Refinería de Azúcar de Viña del Mar (CRAV) en Penco Centro.
              </p>
            </article>
            <article>
              <p className="text-base leading-relaxed text-[var(--color-ink-soft)] text-justify">
                Como Centro Cultural y Cinematográfico de Penco, en esta primera investigación de la plataforma 
                "ArquitecturaPenco", hemos seleccionado tres conjuntos habitacionales asociados a las industrias de la loza 
                y cerámica, del azúcar y del vidrio plano, considerando especialmente sus valores históricos y estéticos. 
                Estos conjuntos constituyen bienes inmuebles que permiten comprender procesos productivos, formas de habitar 
                y configuraciones urbanas propias del desarrollo industrial local.
              </p>
            </article>
            <article>
              <p className="text-base leading-relaxed text-[var(--color-ink-soft)] text-justify">
                En un contexto donde este tipo de patrimonio se encuentra expuesto a procesos de deterioro,
                 transformación e incluso desaparición, este proyecto busca contribuir a su registro, documentación 
                 y difusión mediante diversos soportes que conformen un archivo para el futuro.
              </p>
            </article>
            <article>
              <p className="text-base leading-relaxed text-[var(--color-ink-soft)] text-justify">
                A partir de ello, se busca promover instancias de reflexión y diálogo en la comunidad, 
                fomentando la construcción de una identidad en torno a estos barrios industriales, donde las
                 memorias individuales y colectivas operen como vínculo entre pasado, presente y futuro.
              </p>
            </article>
          </div>
        </div>

        {/* SECCIÓN 2 — EQUIPO */}
        {/* AÑADIDO: id="equipo" y la clase scroll-mt-32 */}
        <div id="equipo" className="grid grid-cols-12 gap-8 mt-10 scroll-mt-32">
          <div className="col-span-12 md:col-span-10">
            <div className="eyebrow text-[var(--color-penco-blue-600)] mb-6">
              <span>Equipo</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl leading-[0.95] text-[var(--color-ink)] mb-1">
              Equipo detrás del proyecto
            </h2>
          </div>
        </div>

         {/*TARJETAS DE EQUIPO — 5 PERSONAS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5 mb-10">
          {equipo.map((persona, idx) => (
            <div
              key={idx}
              className={`bg-white rounded-xl p-5 border border-[var(--color-penco-blue-200)]/40 hover:border-[var(--color-penco-gold)]/60 transition-all duration-500 shadow-sm hover:shadow-[0_10px_20px_-8px_rgba(21,24,42,0.15)] lg:col-span-2 ${
                idx === 3 ? 'lg:col-start-2' : ''
              }`}
            >
              <div className="flex items-center gap-2">
                <h3 className="font-display text-xl text-[var(--color-ink)]">
                  {persona.nombre}
                </h3>
                {persona.link && (
                  <a
                    href={persona.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[var(--color-penco-blue-600)] text-white hover:bg-[var(--color-penco-gold-deep)] transition-all duration-300 shrink-0"
                    aria-label={persona.link.includes('youtube') ? 'YouTube' : 'Instagram'}
                  >
                    {persona.link.includes('youtube') ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23 7s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C16.6 2.8 12 2.8 12 2.8s-4.6 0-6.8.1c-.6.1-1.9.1-3 1.3C1.3 5 1 7 1 7S.7 9.1.7 11.3v2c0 2.1.3 4.3.3 4.3s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.3 1.2C7.4 21.8 12 21.8 12 21.8s4.6 0 6.8-.2c.6-.1 1.9-.1 3-1.3.9-.8 1.2-2.8 1.2-2.8s.3-2.1.3-4.3v-2C23.3 9.1 23 7 23 7zM9.7 15.5V8.4l8.1 3.6-8.1 3.5z"/>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                        <circle cx="12" cy="12" r="4"/>
                        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                      </svg>
                    )}
                  </a>
                )}
              </div>
              <p className="text-xs tracking-widest uppercase text-[var(--color-penco-gold-deep)] font-bold mt-1">
                {persona.rol}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}