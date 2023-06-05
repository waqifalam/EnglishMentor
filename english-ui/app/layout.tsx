import './globals.css'

export const metadata = {
  title: 'EnglishMentor',
  description: 'Practice speaking English with an AI!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
