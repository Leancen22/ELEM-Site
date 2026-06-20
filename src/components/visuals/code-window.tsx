import { cn } from '@/lib/utils';

type Line = { t: string; c?: 'key' | 'str' | 'fn' | 'com' | 'punc' };

const palette: Record<string, string> = {
  key: 'text-fuchsia-400',
  str: 'text-rose-300',
  fn: 'text-cyan-300',
  com: 'text-slate-500',
  punc: 'text-slate-400',
};

export function CodeWindow({
  title = 'elem.service.ts',
  lines,
  className,
}: {
  title?: string;
  lines: Line[][];
  className?: string;
}) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border border-white/10 bg-[#160712]/95 shadow-glow-lg backdrop-blur',
        className
      )}
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="size-3 rounded-full bg-rose-400" />
        <span className="size-3 rounded-full bg-amber-300" />
        <span className="size-3 rounded-full bg-emerald-400" />
        <span className="ml-3 font-mono text-xs text-slate-400">{title}</span>
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed">
        <code>
          {lines.map((line, i) => (
            <div key={i} className="flex gap-4">
              <span className="select-none text-right text-slate-600 w-5">
                {i + 1}
              </span>
              <span>
                {line.map((tok, j) => (
                  <span key={j} className={tok.c ? palette[tok.c] : 'text-slate-200'}>
                    {tok.t}
                  </span>
                ))}
              </span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
}
