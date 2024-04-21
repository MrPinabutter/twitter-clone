import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Sidebar from '@/components/organisms/Sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Twitter Clone',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt">
      <body className={inter.className}>
        <main className='h-screen bg-black'>
          <div className="container h-full mx-auto lx:px-30 max-w-6xl">
            <div className="grid grid-cols-4 h-full">
              <Sidebar />
              <div className="
                col-span-3 
                lg:col-span-2 
                h-full 
                border-x 
                border-neutral-800
              ">
                {children}
              </div>
            </div>
          </div>
        </main>

      </body>
    </html>
  )
}
