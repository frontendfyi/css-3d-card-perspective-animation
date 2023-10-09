import { BrowserCompanyLogo } from "./browser-company-logo";
import { useRef } from "react";

type Props = {
  name: string;
  title: string;
  since: string;
};

export const ArcCard = ({ name, title, since }: Props) => {
  const boundingRef = useRef<DOMRect | null>(null);

  return (
    <div className="flex flex-col [perspective:800px]">
      <div
        onMouseLeave={() => (boundingRef.current = null)}
        onMouseEnter={(ev) => {
          boundingRef.current = ev.currentTarget.getBoundingClientRect();
        }}
        onMouseMove={(ev) => {
          if (!boundingRef.current) return;
          const x = ev.clientX - boundingRef.current.left;
          const y = ev.clientY - boundingRef.current.top;
          const xPercentage = x / boundingRef.current.width;
          const yPercentage = y / boundingRef.current.height;
          const xRotation = (xPercentage - 0.5) * 20;
          const yRotation = (0.5 - yPercentage) * 20;

          ev.currentTarget.style.setProperty("--x-rotation", `${yRotation}deg`);
          ev.currentTarget.style.setProperty("--y-rotation", `${xRotation}deg`);
          ev.currentTarget.style.setProperty("--x", `${xPercentage * 100}%`);
          ev.currentTarget.style.setProperty("--y", `${yPercentage * 100}%`);
        }}
        className="group relative grid w-[260px] grid-rows-[200px_120px_40px] rounded-md bg-[#FFFEEC] p-4 text-[#01A977] transition-transform ease-out hover:[transform:rotateX(var(--x-rotation))_rotateY(var(--y-rotation))_scale(1.1)]"
      >
        <figure className="rounded-md mix-blend-multiply [background-image:radial-gradient(at_70%_40%,transparent_30%,currentColor_80%),url(/noise.svg)]" />
        <div className="pt-4">
          <p className="text-3xl font-bold">{name}</p>
          <p className="text-xl">{title}</p>
        </div>
        <footer className="flex items-end">
          <p className="flex rounded-sm border border-current px-1 py-px text-[9px] uppercase">
            Arc{" "}
            <span className="-my-px mx-1 inline-block w-4 border-l border-r border-current bg-[repeating-linear-gradient(-45deg,currentColor,currentColor_1px,transparent_1px,transparent_2px)]" />{" "}
            {since}
          </p>
          <div className="ml-auto w-12">
            <BrowserCompanyLogo />
          </div>
        </footer>
        <div className="pointer-events-none absolute inset-0 group-hover:bg-[radial-gradient(at_var(--x)_var(--y),rgba(255,255,255,0.3)_20%,transparent_80%)]" />
      </div>
    </div>
  );
};
