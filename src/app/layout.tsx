
import './globals.css'
export const metadata = {
  title: 'Tictac Toe',
  description: 'Tictac Toe made by <a href="https://github.com/amieow">Amieow</a>',
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
