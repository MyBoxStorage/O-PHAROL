'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { menuTabs, type MenuTab } from '@/lib/menuData'

/* ─── Banner de destaque (sábado, domingo, rodízio) ─── */
function MenuBanner({ title, info, price, bgColor }: { title: string; info: string; price: string; bgColor?: string }) {
  return (
    <div style={{ background: bgColor || 'var(--navy)', color: 'var(--white)', padding: '18px 24px', marginBottom: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
      <div>
        <div style={{ fontFamily: 'var(--font-great-vibes), cursive', color: 'var(--gold)', fontSize: '1.9rem' }}>{title}</div>
        <div style={{ fontSize: '0.68rem', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.7)', marginTop: 3 }}>{info}</div>
      </div>
      <div style={{ fontFamily: 'var(--font-playfair), serif', color: 'var(--gold)', fontSize: '1.2rem', whiteSpace: 'nowrap' }}>{price}</div>
    </div>
  )
}

/* ─── Item de menu individual ─── */
function MenuItem({ num, name, nameEn, desc, price }: { num: string; name: string; nameEn?: string; desc?: string; price: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, padding: '11px 0', borderBottom: '1px dashed rgba(27,43,107,0.1)' }}>
      {num && <span style={{ minWidth: 36, fontSize: '0.58rem', color: 'var(--text-light)', flexShrink: 0 }}>{num}</span>}
      <span style={{ flex: 1, fontFamily: 'var(--font-playfair), serif', color: 'var(--navy)', fontSize: '1rem', lineHeight: 1.3 }}>
        {name}
        {nameEn && <span style={{ display: 'block', fontFamily: 'var(--font-montserrat), sans-serif', fontSize: '0.58rem', color: 'var(--text-light)', fontStyle: 'italic', marginTop: 1 }}>{nameEn}</span>}
        {desc && <span style={{ display: 'block', fontFamily: 'var(--font-cormorant), serif', fontSize: '0.88rem', color: 'var(--text-mid)', marginTop: 2, lineHeight: 1.4 }}>{desc}</span>}
      </span>
      <span style={{ flexShrink: 0, color: 'var(--red-dark)', fontFamily: 'var(--font-playfair), serif', fontWeight: 600, fontSize: '0.95rem' }}>{price}</span>
    </div>
  )
}

/* ─── Seção accordion mobile ─── */
function AccordionSection({ section, activeId, tabId, onToggle }: {
  section: { title: string; subtitle?: string; items: { num: string; name: string; nameEn?: string; desc?: string; price: string }[] }
  activeId: string
  tabId: string
  onToggle: (id: string) => void
}) {
  const id = `${tabId}-${section.title}`
  const isOpen = activeId === id
  return (
    <div style={{ borderBottom: '1px solid rgba(27,43,107,0.08)' }}>
      <button
        onClick={() => onToggle(isOpen ? '' : id)}
        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
      >
        <span style={{ fontFamily: 'var(--font-great-vibes), cursive', fontSize: '1.6rem', color: 'var(--navy)' }}>{section.title}</span>
        <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }} style={{ color: 'var(--gold)', fontSize: '0.8rem', flexShrink: 0, marginLeft: 8 }}>▼</motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div key={id} initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} style={{ overflow: 'hidden' }}>
            <div style={{ paddingBottom: 8 }}>
              {section.items.map((item) => (
                <MenuItem key={`${id}-${item.num}-${item.name}`} {...item} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Menu() {
  const [activeTab, setActiveTab] = useState<string>('sugestoes')
  const [openSection, setOpenSection] = useState<string>('')
  const active = menuTabs.find((tab) => tab.id === activeTab) as MenuTab

  const handleTabChange = (id: string) => {
    setActiveTab(id)
    setOpenSection('')
  }

  return (
    <section id="menu" className="section" style={{ background: 'var(--cream)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">Nossa Gastronomia</span>
          <h2 className="section-title">Cardápio <em style={{ color: 'var(--red)' }}>O Pharol</em></h2>
          <p className="section-sub">Ingredientes selecionados, preparo com excelência. Não fazemos meio prato.</p>
        </div>

        {/* ── TABS: Grid 3×3 no mobile, scroll no desktop ── */}
        <div className="menu-tabs-wrapper">
          {/* Desktop: scroll horizontal */}
          <div className="menu-tabs-desktop" style={{ display: 'flex', overflowX: 'auto', borderBottom: '1px solid var(--cream-dark)', marginBottom: 28, scrollbarWidth: 'none' as const }}>
            {menuTabs.map((tab) => (
              <button key={tab.id} onClick={() => handleTabChange(tab.id)}
                style={{ border: 'none', background: 'transparent', padding: '13px 22px', color: tab.id === activeTab ? 'var(--navy)' : 'var(--text-light)', fontSize: '0.64rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.14em', position: 'relative', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'color 0.25s' }}>
                {tab.label}
                {tab.id === activeTab && <motion.div layoutId="tab-indicator" style={{ position: 'absolute', left: 0, right: 0, bottom: -1, height: 2, background: 'var(--gold)' }} />}
              </button>
            ))}
          </div>

          {/* Mobile: grade 3×3 */}
          <div className="menu-tabs-mobile" style={{ display: 'none', gridTemplateColumns: 'repeat(3,1fr)', gap: 6, marginBottom: 22 }}>
            {menuTabs.map((tab) => {
              const active_ = tab.id === activeTab
              return (
                <button key={tab.id} onClick={() => handleTabChange(tab.id)}
                  style={{
                    border: `1px solid ${active_ ? 'var(--gold)' : 'rgba(27,43,107,0.15)'}`,
                    background: active_ ? 'var(--navy)' : 'transparent',
                    color: active_ ? 'var(--gold)' : 'var(--text-mid)',
                    fontSize: '0.58rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em',
                    padding: '9px 4px', cursor: 'pointer', lineHeight: 1.3, textAlign: 'center', transition: 'all 0.2s',
                  }}>
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* ── CONTEÚDO ── */}
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}>
            {active.warning && (
              <div style={{ display: 'inline-flex', background: 'var(--red)', color: 'var(--white)', padding: '7px 18px', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 18 }}>
                ⚠ {active.warning}
              </div>
            )}

            {active.banners?.map((banner) => (
              <MenuBanner key={`${active.id}-${banner.title}-${banner.price}`} {...banner} />
            ))}

            {/* Desktop: lista contínua / Mobile: accordion por seção */}
            <div className="menu-list-desktop">
              {active.sections.map((section) => (
                <div key={`${active.id}-${section.title}`} style={{ marginBottom: 28 }}>
                  <h3 style={{ margin: '0 0 12px', fontFamily: 'var(--font-great-vibes), cursive', fontSize: '1.9rem', color: 'var(--navy)' }}>
                    {section.title}
                    {section.subtitle && <span style={{ marginLeft: 12, fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-light)', fontFamily: 'var(--font-montserrat), sans-serif' }}>{section.subtitle}</span>}
                  </h3>
                  {section.items.map((item) => (
                    <MenuItem key={`${active.id}-${section.title}-${item.num}-${item.name}`} {...item} />
                  ))}
                </div>
              ))}
            </div>

            <div className="menu-list-mobile" style={{ display: 'none' }}>
              {active.sections.map((section) => (
                <AccordionSection
                  key={`${active.id}-${section.title}`}
                  section={section}
                  tabId={active.id}
                  activeId={openSection}
                  onToggle={setOpenSection}
                />
              ))}
            </div>

            {active.note && <div style={{ background: 'var(--gold-pale)', borderLeft: '3px solid var(--gold)', padding: '11px 18px', marginTop: 22, fontSize: '0.68rem' }}>{active.note}</div>}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
