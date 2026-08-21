import ScrollTextReveal from './ScrollTextReveal'

const PARAGRAPHS = [
  'Há mais de 13 anos colocamos os nossos projetos no mundo.',
  'Com processos simples, captamos a essência de cada negócio e a transformamos em um design que comunica de forma estratégica.',
  'Do branding ao design de embalagem, cada decisão é pensada para que a sua marca conquiste espaço na gôndola e na memória do consumidor.',
  'Nossa trajetória passa por empresas dos mais diversos segmentos, o que nos permite enxergar cada desafio com um olhar amplo.',
  'Essa experiência nos ensinou que, independentemente do mercado, grandes marcas começam com uma boa ideia e ganham força quando são embaladas pela estratégia certa.',
]

export default function About() {
  return (
    <section id="a-huminn" className="bg-huminn-purple">
      <div className="max-w-[1920px] mx-auto px-[clamp(24px,12.9vw,248px)] py-[clamp(48px,7.14vw,137px)]">
        <ScrollTextReveal
          paragraphs={PARAGRAPHS}
          className="font-space text-white text-[clamp(18px,2.08vw,40px)] leading-[clamp(24px,2.66vw,51px)] max-w-5xl space-y-[clamp(16px,2.08vw,32px)]"
        />
      </div>
    </section>
  )
}
