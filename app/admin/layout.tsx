import { ModalProvider } from '@/app/admin/providers/modal-provider'
import { ToastProvider } from '@/app/admin/providers/toast-provider'
import { Toaster } from '../(legacy)/components/ui/toaster'
import { Inter } from 'next/font/google'
import '@/app/globals.css'

const font = Inter({ subsets: ['cyrillic'] })

export const metadata = {
  title: 'Admin Dashboard',
  description: 'All Admin Dashboard',
}

export default async function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${font.className || ''} min-h-fit h-screen overflow-x-hidden bg-background backdrop-brightness-75`}>
    {/* <> */}
      <div className='min-h-full'>
      <ToastProvider />
      <ModalProvider />
      {children}
      </div>
      <Toaster />
    {/* </> */}
       </body>
     </html>
  )
}
