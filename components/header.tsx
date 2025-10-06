import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white backdrop-blur supports-[backdrop-filter]:bg-white/95">
      <div className="container mx-auto max-w-7xl flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-lg font-bold tracking-tight">Unternehmenswert.io</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-foreground hover:text-foreground/80 transition-colors">
            Bewertung
          </Link>
          <Link
            href="/unternehmen-kaufen"
            className="text-sm font-medium text-foreground hover:text-foreground/80 transition-colors"
          >
            Unternehmen kaufen
          </Link>
          <Link
            href="/ueber-uns"
            className="text-sm font-medium text-foreground hover:text-foreground/80 transition-colors"
          >
            Über uns
          </Link>
          <Link href="/faq" className="text-sm font-medium text-foreground hover:text-foreground/80 transition-colors">
            FAQ
          </Link>
        </nav>

        <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
          <Link href="/#bewertung">Bewertung starten</Link>
        </Button>
      </div>
    </header>
  )
}
