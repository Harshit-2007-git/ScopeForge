export default function Header() {
  return (
    <header className="relative py-8 px-6 text-center">
      {/* Decorative glow behind the header */}
      <div className="absolute inset-0 flex justify-center pointer-events-none">
        <div className="w-[600px] h-[200px] bg-accent-blue/10 rounded-full blur-[100px] -translate-y-1/2" />
      </div>

      <div className="relative z-10">
        {/* Logo / Icon */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-blue to-accent-purple flex items-center justify-center shadow-lg shadow-accent-blue/25">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold gradient-text tracking-tight">
            ScopeForge
          </h1>
        </div>

        <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Transform messy client notes into{" "}
          <span className="text-accent-cyan font-medium">
            structured scope documents
          </span>
        </p>
      </div>
    </header>
  );
}
