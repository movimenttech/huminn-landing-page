import ScrollReveal from './ScrollReveal'

const DESIGN_ITEMS = ['BRANDING', 'DESIGN DE EMBALAGENS', 'IDENTIDADE VISUAL']
const MARKETING_ITEMS = ['CRM & AUTOMAÇÃO COM IA', 'GOOGLE BUSINESS PROFILE', 'TRÁFEGO PAGO']

const HOVER_TRANSITION = 'transition-all duration-200 ease-out hover:scale-105'

function ServiceGroup({ label, items }) {
  return (
    <div className="flex flex-col items-end text-right">
      <div className="flex items-center gap-3 mb-[clamp(8px,0.83vw,16px)]">
        <span
          aria-hidden="true"
          className="w-[3px] h-[clamp(18px,2.08vw,40px)] bg-huminn-purple"
        />
        <ScrollReveal
          as="span"
          className={`inline-block font-space text-huminn-purple text-[clamp(18px,2.08vw,40px)] hover:text-white ${HOVER_TRANSITION}`}
        >
          {label}
        </ScrollReveal>
      </div>
      <ScrollReveal
        lines={items}
        className="font-space text-white uppercase text-[clamp(28px,4.69vw,90px)] leading-[clamp(34px,6.98vw,134px)]"
        lineClassName={`hover:text-huminn-purple ${HOVER_TRANSITION}`}
      />
    </div>
  )
}

export default function Services() {
  return (
    <section className="bg-black px-[clamp(24px,12.66vw,243px)] py-[clamp(48px,6.09vw,117px)]">
      <div className="max-w-[1920px] mx-auto">
        <ScrollReveal
          as="span"
          lines={['NOSSOS', 'SERVIÇOS']}
          className="font-space text-white uppercase text-[clamp(40px,5.94vw,114px)] leading-[clamp(48px,7.55vw,145px)] mb-[clamp(40px,6.25vw,120px)]"
        />

        <div className="flex flex-col gap-[clamp(48px,8.33vw,160px)]">
          <ServiceGroup label="DESIGN" items={DESIGN_ITEMS} />
          <ServiceGroup label="MARKETING" items={MARKETING_ITEMS} />
        </div>
      </div>
    </section>
  )
}
