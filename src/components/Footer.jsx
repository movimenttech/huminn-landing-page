export default function Footer() {
  return (
    <footer className="bg-huminn-gray px-[clamp(24px,11.61vw,223px)] py-[clamp(24px,3.23vw,62px)]">
      <div className="max-w-[1920px] mx-auto flex flex-col sm:flex-row flex-wrap items-center justify-center sm:justify-between gap-4 sm:gap-8 font-space text-black text-[clamp(16px,1.56vw,30px)]">
        <a href="mailto:comercial@huminn.com.br" className="hover:opacity-70 transition-opacity">
          comercial@huminn.com.br
        </a>
        <a href="tel:+5519981066042" className="hover:opacity-70 transition-opacity">
          (19) 98106-6042
        </a>
        <span>Piracicaba/SP</span>
      </div>
    </footer>
  )
}
