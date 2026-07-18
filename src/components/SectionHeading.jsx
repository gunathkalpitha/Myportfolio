function SectionHeading({ kicker, title, description, align = 'left' }) {
  const center = align === 'center'
  return (
    <div className={`flex flex-col ${center ? 'items-center text-center' : 'items-start text-left'}`}>
      {kicker && <p className={`kicker mb-2 ${center ? 'justify-center' : ''}`}>{kicker}</p>}
      <h2 className="font-display text-3xl font-bold text-gray-900 md:text-4xl">{title}</h2>
      {description && (
        <p className="mt-3 text-gray-500 text-base max-w-2xl">{description}</p>
      )}
    </div>
  )
}

export default SectionHeading
