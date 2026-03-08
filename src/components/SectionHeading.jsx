function SectionHeading({ kicker, title, description, align = 'left' }) {
  const alignment = align === 'center' ? 'text-center items-center' : 'text-left items-start'

  return (
    <div className={`flex flex-col gap-3 ${alignment}`}>
      {kicker ? <span className="kicker">{kicker}</span> : null}
      <h2 className="section-title">{title}</h2>
      {description ? <p className="max-w-2xl text-base leading-relaxed text-slate-600">{description}</p> : null}
    </div>
  )
}

export default SectionHeading
