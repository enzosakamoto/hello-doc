import type { Metadata } from 'next'
import { GeistSans as FontSans } from 'geist/font/sans'
import '@/styles/globals.css'

import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/contexts/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { Navbar } from '@/components/navbar'

export const metadata: Metadata = {
  title: 'Hello Doc',
  description: 'A Youtube video downloader'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          FontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main>{children}</main>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  )
}
