"use client"
import { useModal } from '@/hooks/useModalStore';
import Image from 'next/image'

export default function Home() {
  const { onOpen } = useModal();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <button onClick={() => onOpen("kontrak")} className="">
          Modal
        </button>
      </div>
    </main>
  )
}
