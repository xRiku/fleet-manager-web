export function Logo({ className, size = 42 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background circle with subtle gradient effect */}
      <circle cx="50" cy="50" r="45" fill="#0f172a" />
      
      {/* Outer ring */}
      <circle cx="50" cy="50" r="42" stroke="#14b8a6" strokeWidth="3" fill="none" />
      
      {/* Vehicle body - stylized geometric shape */}
      <path
        d="M25 55 L30 45 L70 45 L75 55 L75 65 L25 65 Z"
        fill="#14b8a6"
      />
      
      {/* Vehicle cabin/windows */}
      <path
        d="M35 45 L40 35 L60 35 L65 45 Z"
        fill="#0f172a"
      />
      
      {/* Wheels */}
      <circle cx="32" cy="68" r="7" fill="#334155" stroke="#14b8a6" strokeWidth="2" />
      <circle cx="68" cy="68" r="7" fill="#334155" stroke="#14b8a6" strokeWidth="2" />
      
      {/* Wheel centers */}
      <circle cx="32" cy="68" r="3" fill="#14b8a6" />
      <circle cx="68" cy="68" r="3" fill="#14b8a6" />
      
      {/* Motion lines suggesting movement */}
      <path
        d="M15 55 L20 55"
        stroke="#14b8a6"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M12 60 L18 60"
        stroke="#14b8a6"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.4"
      />
      <path
        d="M80 55 L85 55"
        stroke="#14b8a6"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M82 60 L88 60"
        stroke="#14b8a6"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );
}

export function LogoWithText({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Logo size={40} />
      <div className="flex flex-col">
        <span className="text-xl font-bold text-slate-900 leading-tight">Fleet</span>
        <span className="text-xl font-bold text-teal-600 leading-tight -mt-1">Manager</span>
      </div>
    </div>
  );
}

export default Logo;
