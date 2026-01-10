import './globals.css'

export const metadata = {
  title: "Vivek Tiwari | MERN Stack Developer",
  description: "Portfolio of Vivek Tiwari – MERN Stack Developer",
  openGraph: {
    title: "Vivek Tiwari",
    description: "MERN Stack Developer Portfolio",
    type: "website",
  },
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="h-full"
      suppressHydrationWarning
    >
      <body
        className="h-full min-h-screen overflow-x-hidden"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  )
}
