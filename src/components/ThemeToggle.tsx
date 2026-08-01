"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Palette } from "lucide-react"

import { Button } from "@/components/ui/button"

const themes = [
  { name: "light", color: "#f8fafc", label: "Light" },
  { name: "dark", color: "#0f172a", label: "Dark" },
  { name: "theme-midnight", color: "#0d1126", label: "Midnight" },
  { name: "theme-cyberpunk", color: "#170c17", label: "Cyberpunk" },
  { name: "theme-forest", color: "#0b150f", label: "Forest" },
  { name: "theme-sunset", color: "#faf5f0", label: "Sunset" },
]

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [isOpen, setIsOpen] = React.useState(false)

  // close on outside click
  const menuRef = React.useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleOutsideClick)
    return () => document.removeEventListener("mousedown", handleOutsideClick)
  }, [])

  return (
    <div className="relative" ref={menuRef}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full w-9 h-9 border border-border"
        title="Select Theme"
      >
        <Palette className="h-[1.2rem] w-[1.2rem] transition-all text-primary" />
        <span className="sr-only">Toggle theme</span>
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-40 rounded-md border border-border bg-popover p-2 shadow-md flex flex-col gap-1 z-50">
          <div className="text-xs font-semibold text-muted-foreground px-2 py-1 mb-1">Select Theme</div>
          {themes.map((t) => (
            <button
              key={t.name}
              onClick={() => {
                setTheme(t.name)
                setIsOpen(false)
              }}
              className={`flex items-center gap-3 px-2 py-1.5 rounded-sm text-sm hover:bg-muted transition-colors text-left ${
                theme === t.name ? "bg-muted font-medium text-primary" : "text-popover-foreground"
              }`}
            >
              <div 
                className="w-4 h-4 rounded-full border border-border shadow-sm flex-shrink-0" 
                style={{ backgroundColor: t.color }} 
              />
              {t.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
