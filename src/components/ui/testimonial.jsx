function StarRow() {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }, (_, index) => (
        <svg key={index} width="16" height="15" viewBox="0 0 16 15" fill="none" aria-hidden="true">
          <path
            d="M7.049.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 0 0 .95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 0 0-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 0 0-1.176 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 0 0-.363-1.118L.98 6.72c-.784-.57-.382-1.81.587-1.81h3.461a1 1 0 0 0 .951-.69z"
            fill="#67e8f9"
          />
        </svg>
      ))}
    </div>
  );
}

function TestimonialItem({ content, name }) {
  return (
    <article className="w-full max-w-[500px] space-y-4 rounded-[1.5rem] border border-cyan-400/15 bg-[#081018]/80 p-5 text-sm text-white/62 shadow-[0_24px_60px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <StarRow />
      <p className="text-base leading-relaxed text-white/78">{content}</p>
      <div className="border-t border-white/10 pt-3">
        <p className="font-semibold text-white">{name}</p>
      </div>
    </article>
  );
}

export default function Testimonial({ cards }) {
  return (
    <div className="flex flex-wrap items-stretch justify-center gap-6">
      {cards.map((card) => (
        <TestimonialItem key={card.name} {...card} />
      ))}
    </div>
  );
}
