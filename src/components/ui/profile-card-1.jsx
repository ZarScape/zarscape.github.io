export default function GlassmorphismProfileCard({
  avatarUrl,
  name,
  title,
  bio
}) {
  return (
    <div className="relative w-full max-w-sm">
      <div
        className="relative flex flex-col items-center rounded-[2rem] border border-white/10 bg-[#07131a]/45 p-8 backdrop-blur-xl transition-all duration-500 ease-out"
        style={{
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.18)'
        }}
      >
        <div className="mb-4 h-24 w-24 rounded-full border-2 border-cyan-200/20 p-1">
          <img
            src={avatarUrl}
            alt={`${name}'s avatar`}
            className="h-full w-full rounded-full object-cover"
            loading="lazy"
            decoding="async"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = `https://placehold.co/96x96/0891b2/ffffff?text=${name.charAt(0)}`;
            }}
          />
        </div>

        <h2 className="text-center text-2xl font-bold text-white">{name}</h2>
        <p className="mt-1 text-sm font-medium text-cyan-300">{title}</p>
        <p className="mt-4 text-center text-sm leading-relaxed text-white/62">{bio}</p>

        <div className="my-6 h-px w-1/2 rounded-full bg-white/10" />
      </div>

      <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-r from-cyan-500/30 to-sky-500/20 opacity-40 blur-2xl transition-all duration-500 ease-out" />
    </div>
  );
}
