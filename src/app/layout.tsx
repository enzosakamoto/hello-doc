import type { Metadata } from 'next'
import { Fira_Code } from 'next/font/google'
import './globals.css'

import { Container, Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'

const inter = Fira_Code({ subsets: ['latin'] })

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
    <html lang="en">
      <body className={inter.className}>
        <Theme>
          <Container size="3" py="7">
            {children}
          </Container>
        </Theme>
      </body>
    </html>
  )
}
