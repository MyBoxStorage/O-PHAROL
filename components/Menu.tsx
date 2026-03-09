'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { menuTabs, type MenuTab } from '@/lib/menuData'

function MenuBanner({ title, info, price, bgColor }: { title: string; info: string; price: string; bgColor?: string }) {
  return (
    <div style={{ background: bgColor || 'var(--navy)', color: 'var(--white)', padding: '20px 32px', marginBottom: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
      <div>
        <div style={{ fontFamily: 'var(--font-great-vibes), cursive', color: 'var(--gold)', fontSize: '2rem' }}>{title}</div>
        <div style={{ fontSize: '0.7rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.7)' }}>{info}</div>
      </div>
      <div style={{ fontFamily: 'var(--font-playfair), serif', color: 'var(--gold)', fontSize: '1.3rem' }}>{price}</div>
    </div>
  )
}

export default function Menu() {
  const [activeTab, setActiveTab] = useState<string>('sugestoes')
  const active = menuTabs.find((tab) => tab.id === activeTab) as MenuTab

  return (
    <section id="menu" className="section" style={{ background: 'var(--cream)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">Nossa Gastronomia</span>
          <h2 className="section-title">Cardápio <em style={{ color: 'var(--red)' }}>O Pharol</em></h2>
          <p className="section-sub">Ingredientes selecionados, preparo com excelência. Não fazemos meio prato.</p>
        </div>

        <div style={{ display: 'flex', overflowX: 'auto', borderBottom: '1px solid var(--cream-dark)', marginBottom: 34, scrollbarWidth: 'none' }}>
          {menuTabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ border: 'none', background: 'transparent', padding: '14px 24px', color: tab.id === activeTab ? 'var(--navy)' : 'var(--text-light)', fontSize: '0.68rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', position: 'relative', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              {tab.label}
              {tab.id === activeTab && <motion.div layoutId="tab-indicator" style={{ position: 'absolute', left: 0, right: 0, bottom: -1, height: 2, background: 'var(--gold)' }} />}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} style={{ position: 'relative' }}>
            {active.warning && (
              <div style={{ display: 'inline-flex', background: 'var(--red)', color: 'var(--white)', padding: '8px 20px', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>
                ⚠ {active.warning}
              </div>
            )}

            {active.banners?.map((banner) => (
              <MenuBanner key={`${active.id}-${banner.title}-${banner.price}`} {...banner} />
            ))}

            {active.sections.map((section) => (
              <div key={`${active.id}-${section.title}`} style={{ marginBottom: 28 }}>
                <h3 style={{ margin: '0 0 14px', fontFamily: 'var(--font-great-vibes), cursive', fontSize: '2rem', color: 'var(--navy)' }}>
                  {section.title}
                  {section.subtitle && <span style={{ marginLeft: 12, fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-light)', fontFamily: 'var(--font-montserrat), sans-serif' }}>{section.subtitle}</span>}
                </h3>

                <div>
                  {section.items.map((item) => (
                    <div key={`${active.id}-${section.title}-${item.num}-${item.name}`} style={{ display: 'flex', alignItems: 'baseline', gap: 8, padding: '12px 0', borderBottom: '1px dashed rgba(27,43,107,0.1)', transition: 'background .2s' }}>
                      <span style={{ minWidth: 40, fontSize: '0.6rem', color: 'var(--text-light)' }}>{item.num}</span>
                      <span style={{ flex: 1, fontFamily: 'var(--font-playfair), serif', color: 'var(--navy)', fontSize: '1.05rem' }}>
                        {item.name}
                        {item.nameEn && <span style={{ display: 'block', fontFamily: 'var(--font-montserrat), sans-serif', fontSize: '0.6rem', color: 'var(--text-light)', fontStyle: 'italic', marginTop: 1 }}>{item.nameEn}</span>}
                        {item.desc && <span style={{ display: 'block', fontFamily: 'var(--font-cormorant), serif', fontSize: '0.85rem', color: 'var(--text-mid)', marginTop: 2 }}>{item.desc}</span>}
                      </span>
                      <span style={{ flex: 1, borderBottom: '1px dotted rgba(27,43,107,0.15)', margin: '0 8px', position: 'relative', top: -4 }} />
                      <span style={{ whiteSpace: 'nowrap', color: 'var(--red-dark)', fontFamily: 'var(--font-playfair), serif', fontWeight: 600 }}>{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {active.note && <div style={{ background: 'var(--gold-pale)', borderLeft: '3px solid var(--gold)', padding: '12px 20px', marginTop: 24, fontSize: '0.68rem' }}>{active.note}</div>}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
