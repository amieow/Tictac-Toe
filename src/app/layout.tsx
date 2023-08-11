
import { Metadata } from 'next'
import './globals.css'
export const metadata : Metadata = {
  title: 'Tictac Toe',
  description: 'Tictac Toe made by amieow',
  keywords : ["tictac", "tictac toe sederhana","tictac toe with frame motion","tictac toe made by amieow","tictac toe with next js 13 app directory"],
  creator : "amieowqiqi123@gmail.com"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      
      <body className=' flex min-h-screen' >
        {children}
        </body>
    </html>
  )
}
