import { useEffect, useRef, useState } from 'react'

/**
 * Hook: aplica clase 'is-visible' a elementos con clase 'reveal' cuando entran al viewport.
 * Útil para animaciones de scroll editoriales (sin librerías externas).
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const elements = root.querySelectorAll('.reveal')
    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -60px 0px',
        ...options,
      }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return ref
}

/**
 * Hook: detecta si la página fue scrolleada más allá de un threshold.
 * Útil para cambiar el estado del header (transparente → glass).
 */
export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return scrolled
}
