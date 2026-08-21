import ScrollReveal from './ScrollReveal'
import { brands } from '../data/brands'

export default function Brands() {
  return (
    <section className="bg-huminn-gray px-[clamp(24px,13.02vw,250px)] py-[clamp(40px,6.77vw,130px)]">
      <div className="max-w-[1920px] mx-auto">
        <ScrollReveal
          as="span"
          className="block font-space text-huminn-purple text-[clamp(18px,2.08vw,40px)] mb-[clamp(24px,3.33vw,64px)]"
        >
          MARCAS QUE JÁ TRABALHAMOS
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-[clamp(20px,2.5vw,48px)] gap-y-[clamp(24px,3.33vw,64px)]">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="flex items-center justify-center h-[clamp(64px,7.4vw,142px)]"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
