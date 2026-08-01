"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider 
      themes={['light', 'dark', 'theme-midnight', 'theme-cyberpunk', 'theme-forest', 'theme-sunset']} 
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
