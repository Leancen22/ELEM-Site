import {
  Globe,
  Code2,
  Cpu,
  Braces,
  Server,
  Network,
  Plug,
  RefreshCw,
  Cloud,
  Layers,
  ShieldCheck,
  Rocket,
  Gauge,
  Workflow,
  Database,
  GitMerge,
  Boxes,
  Smartphone,
  type LucideIcon,
} from 'lucide-react';

const map: Record<string, LucideIcon> = {
  Globe,
  Code2,
  Cpu,
  Braces,
  Server,
  Network,
  Plug,
  RefreshCw,
  Cloud,
  Layers,
  ShieldCheck,
  Rocket,
  Gauge,
  Workflow,
  Database,
  GitMerge,
  Boxes,
  Smartphone,
};

export function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Cmp = map[name] ?? Boxes;
  return <Cmp className={className} />;
}
