import { useState } from 'react'
import ScrollReveal from './ScrollReveal'
import { SHEET_SCRIPT_URL } from '../config'

const FIELD_CLASSNAME =
  'w-full bg-transparent border-[3px] border-white font-roboto-condensed text-white text-[clamp(16px,1.56vw,30px)] placeholder-white/90 focus:outline-none focus:border-white/70'

function Field({ id, type = 'text', label, value, onChange }) {
  return (
    <input
      id={id}
      name={id}
      type={type}
      placeholder={label}
      required
      value={value}
      onChange={onChange}
      className={`${FIELD_CLASSNAME} h-[clamp(48px,3.07vw,59px)] rounded-full px-[clamp(20px,2.03vw,39px)]`}
    />
  )
}

export default function ContactForm() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    empresa: '',
    mensagem: '',
  })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!SHEET_SCRIPT_URL) {
      console.warn('SHEET_SCRIPT_URL não configurada em ContactForm.jsx')
      return
    }

    setStatus('sending')
    try {
      await fetch(SHEET_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: new URLSearchParams(form),
      })
      setStatus('sent')
      setForm({ nome: '', email: '', telefone: '', empresa: '', mensagem: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="fale-com-a-gente" className="bg-huminn-purple px-[clamp(24px,13.02vw,250px)] py-[clamp(48px,7.14vw,137px)]">
      <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row md:items-start md:justify-between gap-12 md:gap-0">
        <ScrollReveal
          as="span"
          lines={['FALE', 'COM A', 'GENTE']}
          className="font-space text-white uppercase text-[clamp(40px,5.94vw,114px)] leading-[clamp(48px,7.55vw,145px)]"
        />

        <ScrollReveal className="w-full md:w-[clamp(320px,24.84vw,477px)]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-[clamp(16px,0.99vw,19px)]">
            <Field id="nome" label="Nome" value={form.nome} onChange={handleChange} />
            <Field id="email" type="email" label="E-mail" value={form.email} onChange={handleChange} />
            <Field id="telefone" type="tel" label="Telefone" value={form.telefone} onChange={handleChange} />
            <Field id="empresa" label="Nome da empresa" value={form.empresa} onChange={handleChange} />
            <textarea
              id="mensagem"
              name="mensagem"
              placeholder="Como podemos ajudar?"
              required
              rows={4}
              value={form.mensagem}
              onChange={handleChange}
              className={`${FIELD_CLASSNAME} rounded-3xl px-[clamp(20px,2.03vw,39px)] py-[clamp(14px,1.35vw,26px)] resize-none`}
            />

            <button
              type="submit"
              disabled={status === 'sending'}
              className="self-center mt-[clamp(16px,2.19vw,42px)] h-[clamp(48px,2.97vw,57px)] w-[clamp(140px,9vw,173px)] rounded-full bg-white font-roboto-condensed text-huminn-purple text-[clamp(16px,1.56vw,30px)] hover:opacity-90 transition-opacity disabled:opacity-60"
            >
              {status === 'sending' ? 'Enviando...' : 'Enviar'}
            </button>

            {status === 'sent' && (
              <p className="text-center text-white font-roboto-condensed text-[clamp(14px,1.2vw,20px)]">
                Recebemos sua mensagem, obrigado!
              </p>
            )}
            {status === 'error' && (
              <p className="text-center text-white font-roboto-condensed text-[clamp(14px,1.2vw,20px)]">
                Não deu pra enviar agora, tenta de novo em instantes.
              </p>
            )}
          </form>
        </ScrollReveal>
      </div>
    </section>
  )
}
