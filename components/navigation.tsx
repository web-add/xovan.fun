"use client"
import Link from "next/link"
import { ChevronDown, MessageCircle, DoorOpen, Menu, Terminal, LayoutDashboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export function Navigation() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLogged, setIsLogged] = useState(false)
  useEffect(() => {
    async function Load() {
      const res = await fetch("https://api.xovan.fun/api/account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify( {
          "type": "check"
        } ),
        credentials: "include" // penting untuk cookie
      });
      if (res.ok) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    };
    Load(); // cek login status pas halaman load
  }, [pathname]);
  return (
    <nav className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 text-xl md:text-2xl font-bold text-primary hover:text-primary/80 transition-colors"
          >
            <Terminal className="w-6 h-6 md:w-7 md:h-7 text-primary mx-auto mb-4" />
            Xovan Store
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 md:gap-6">
            <Link
              href="/"
              className="text-foreground hover:text-primary transition-colors font-medium text-sm md:text-base"
            >
              Home
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1 text-sm md:text-base cursor-pointer">
                  Servers
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/servers?game=growtopia" className="w-full cursor-pointer">
                    Growtopia Servers
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/servers?game=minecraft" className="w-full cursor-pointer">
                    Minecraft Servers
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="cursor-pointer flex items-center gap-1 text-sm md:text-base">
                  Services
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/services/growtopia" className="w-full cursor-pointer">
                    Growtopia
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/services/minecraft" className="w-full cursor-pointer">
                    Minecraft
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex items-center gap-2">
              <Button
                asChild
                variant="outline"
                size="sm"
                className="flex items-center gap-2 bg-[#5865F2] hover:bg-[#4752C4] text-white border-[#5865F2] hover:border-[#4752C4] text-xs md:text-sm"
              >
                <a href="https://dsc.gg/xovan" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4" />
                  <span className="hidden sm:inline">Discord</span>
                </a>
              </Button>
              {isLogged ? (
                
                <Link href="/dashboard" className="w-full">
                  <Button
                    variant="outline"
                    size="sm"
                    className="cursor-pointer flex items-center gap-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0 text-xs md:text-sm"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span className="hidden lg:inline">Dashboard</span>
                  </Button>
                </Link>
              ) : (
                <Link href="/login" className="w-full">
                  <Button
                    variant="outline"
                    size="sm"
                    className="cursor-pointer flex items-center gap-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0 text-xs md:text-sm"
                  >
                    <DoorOpen className="w-4 h-4" />
                    <span className="hidden lg:inline">Login</span>
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <DropdownMenu open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Menu className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/" className="w-full">
                    Home
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/servers?game=growtopia" className="w-full">
                    Growtopia Servers
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/servers?game=minecraft" className="w-full">
                    Minecraft Servers
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/services/growtopia" className="w-full">
                    Growtopia Services
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/services/minecraft" className="w-full">
                    Minecraft Services
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="https://dsc.gg/xovan" target="_blank" rel="noopener noreferrer" className="w-full">
                    Discord
                  </a>
                </DropdownMenuItem>
                {isLogged ? (
                  <Link href="/dashboard" className="w-full">
                    <Button variant="ghost" className="cursor-pointer w-full justify-start p-0 h-auto">
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                ) : (
                  <Link href="/login" className="w-full">
                    <Button variant="ghost" className="cursor-pointer w-full justify-start p-0 h-auto">
                      <DoorOpen className="w-4 h-4 mr-2" />
                      Login
                    </Button>
                  </Link>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}
