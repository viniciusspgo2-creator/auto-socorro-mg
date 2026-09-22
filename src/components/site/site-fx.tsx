'use client'

import { useEffect } from 'react'

/**
 * Replica 1:1 o assets/js/main.js do site original:
 * - classe .scrolled no header após 24px de rolagem
 * - menu mobile (menu-toggle)
 * - revelação por rolagem (.reveal via IntersectionObserver)
 * - FAQ exclusivo (apenas um <details> aberto)
 * - lightbox da galeria (<dialog>)
 */
export function SiteFx() {
  useEffect(() => {
    const header = document.querySelector('.site-header')
    const toggle = document.querySelector('.menu-toggle')
    const nav = document.querySelector('#main-nav')

    const onScroll = () => header?.classList.toggle('scrolled', window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    const onToggle = () => {
      if (!toggle || !nav) return
      const open = toggle.getAttribute('aria-expanded') === 'true'
      toggle.setAttribute('aria-expanded', String(!open))
      nav.classList.toggle('open', !open)
    }
    toggle?.addEventListener('click', onToggle)

    const closeNav = () => {
      nav?.classList.remove('open')
      toggle?.setAttribute('aria-expanded', 'false')
    }
    nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNav))

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        }),
      { threshold: 0.12 },
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))

    const details = document.querySelectorAll<HTMLDetailsElement>('.accordion details')
    const onItemToggle = (event: Event) => {
      const current = event.currentTarget as HTMLDetailsElement
      if (current.open) {
        details.forEach((other) => {
          if (other !== current) other.open = false
        })
      }
    }
    details.forEach((item) => item.addEventListener('toggle', onItemToggle))

    const lightbox = document.querySelector<HTMLDialogElement>('.lightbox')
    const galleryItems = document.querySelectorAll<HTMLElement>('.gallery-item')
    const onGalleryClick = (event: Event) => {
      const item = event.currentTarget as HTMLElement
      const img = lightbox?.querySelector('img')
      if (lightbox && img) {
        img.src = item.dataset.image ?? ''
        lightbox.showModal()
      }
    }
    galleryItems.forEach((item) => item.addEventListener('click', onGalleryClick))

    const onClose = () => lightbox?.close()
    lightbox?.querySelector('button')?.addEventListener('click', onClose)
    const onBackdrop = (event: MouseEvent) => {
      if (lightbox && event.target === lightbox) lightbox.close()
    }
    lightbox?.addEventListener('click', onBackdrop)

    return () => {
      window.removeEventListener('scroll', onScroll)
      toggle?.removeEventListener('click', onToggle)
      nav?.querySelectorAll('a').forEach((link) => link.removeEventListener('click', closeNav))
      observer.disconnect()
      details.forEach((item) => item.removeEventListener('toggle', onItemToggle))
      galleryItems.forEach((item) => item.removeEventListener('click', onGalleryClick))
      lightbox?.querySelector('button')?.removeEventListener('click', onClose)
      lightbox?.removeEventListener('click', onBackdrop)
    }
  }, [])

  return null
}
