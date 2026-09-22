/** Lightbox da galeria — <dialog> idêntico ao original (ativado pelo SiteFx). */
export function Lightbox() {
  return (
    <dialog className="lightbox">
      <button aria-label="Fechar imagem">×</button>
      {/* src é definido no clique da galeria (SiteFx), como no original */}
      <img alt="Foto ampliada do atendimento" />
    </dialog>
  )
}
