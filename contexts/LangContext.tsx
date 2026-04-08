'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { type Lang, type T, translations } from '@/lib/i18n'

const STORAGE_KEY = 'opharol_lang'

interface LangCtx {
  lang: Lang
  setLang: (l: Lang) => void
  t: T
}

const LangContext = createContext<LangCtx>({
  lang: 'pt',
  setLang: () => {},
  t: translations.pt,
})

/** Detecta idioma do browser e mapeia para pt | en | es */
function detectLang(): Lang {
  if (typeof navigator === 'undefined') return 'pt'
  const code = navigator.language.toLowerCase()
  if (code.startsWith('pt')) return 'pt'
  if (code.startsWith('es')) return 'es'
  return 'en'
}

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('pt')

  /* Detecta idioma na montagem (client-side) */
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Lang | null
    const resolved: Lang =
      saved && ['pt', 'en', 'es'].includes(saved) ? saved : detectLang()
    setLangState(resolved)
  }, [])

  /* Atualiza atributo lang do <html> */
  useEffect(() => {
    const htmlLang = lang === 'pt' ? 'pt-BR' : lang === 'es' ? 'es' : 'en'
    document.documentElement.lang = htmlLang
  }, [lang])

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    localStorage.setItem(STORAGE_KEY, l)
  }, [])

  return (
    <LangContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
