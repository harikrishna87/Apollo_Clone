import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Apollo Healthcare',
  description: 'Book appointments with doctors online',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
          integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <footer style={{ textAlign: 'center', backgroundColor: "#ff9800", color: "white", fontFamily: "TimesNewRoman", fontSize: "20px", padding: "20px" }}>
          Apollo ©2025 All rights reserved
        </footer>
      </body>
    </html>
  )
}