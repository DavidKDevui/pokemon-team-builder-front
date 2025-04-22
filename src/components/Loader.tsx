'use client';

import Image from 'next/image';
interface LoaderProps {
  text?: string;
}

export default function Loader({ text = "Chargement..." }: LoaderProps) {
  return (
    <div className="flex justify-center items-center h-full flex-col gap-2 mx-auto py-12 absolute top-0 left-0 right-0 bottom-0 bg-black/50 z-999">
      <Image src="/images/loading-pokeball.gif" alt="Chargement" width={64} height={64} />
      <h2 className="text-white/75 text-sm font-press-start-2p">{text}</h2>
    </div>
  );
} 