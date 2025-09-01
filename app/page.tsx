"use client"

import { ArrowRight, Shield, Zap, Star, Server, Gamepad2, Headphones, HardDrive } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function HomePage() {
  const services = [
    {
      title: "Growtopia Hosting",
      description: "Premium Growtopia server hosting with custom features and 24/7 support",
      icon: Server,
      features: ["Custom Items", "Server Console", "Discord Community"],
      price: "Rp. 120,000/month",
      note: "(also accept Real Growtopia DL payment)",
      popular: true,
    },
    {
      title: "Coming soon...",
      description: "",
      icon: Gamepad2,
      features: ["Closed"],
      price: "Rp. ?",
      note: "roblox / minecraft",
      popular: false,
    },
  ]

  const stats = [
    { label: "Customizable Services", value: "100%", icon: Server },
    { label: "24/7 Support", value: "Always", icon: Headphones },
    { label: "Anti DDoS Protection", value: "Premium", icon: Shield },
    { label: "High End Infrastructure", value: "Enterprise", icon: HardDrive },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">Premium Gaming Services</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Welcome to Xovan Store
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Your one-stop destination for premium gaming services, high-performance servers, and professional gaming
              support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
              >
                Browse Services
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="cursor-pointer"
                onClick={() => document.getElementById("servers")?.scrollIntoView({ behavior: "smooth" })}
              >
                View All Servers
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-border/50">
                <CardContent className="p-4 md:p-6">
                  <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-primary mx-auto mb-2 md:mb-3" />
                  <div className="text-lg md:text-2xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-xs md:text-sm text-muted-foreground leading-tight">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Comprehensive gaming solutions designed to enhance your gaming experience with professional quality and
              reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className={`relative hover:shadow-lg transition-all duration-300 ${
                  service.popular ? "border-primary/50 bg-gradient-to-br from-primary/5 to-secondary/5" : ""
                }`}
              >
                {service.popular && (
                  <Badge className="absolute -top-2 left-4 bg-primary text-primary-foreground">Most Popular</Badge>
                )}
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <service.icon className="w-8 h-8 text-primary" />
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </div>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature, featureIndex) => (
                        <Badge key={featureIndex} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-lg font-semibold text-primary">{service.price}</span>
                      <span className="text-xs text-muted-foreground">{service.note}</span>
                      <Link href={service.title.includes("Growtopia") ? "/services/growtopia" : "/services/minecraft"}>
                        <Button variant="outline" size="sm" className="w-full mt-2 bg-transparent cursor-pointer">
                          Learn More
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="servers" className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Browse Servers</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Explore our active game servers with real-time player counts and server information.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <Link href="/servers?game=growtopia">
              <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-primary/30 hover:border-primary/50">
                <CardContent className="p-6 text-center">
                  <Server className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Growtopia Servers</h3>
                  <p className="text-muted-foreground mb-4">Browse active Growtopia servers with custom features</p>
                  <Button variant="outline" className="w-full bg-transparent cursor-pointer">
                    View Servers
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link href="/servers?game=minecraft">
              <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border-secondary/30 hover:border-secondary/50">
                <CardContent className="p-6 text-center">
                  <Gamepad2 className="w-12 h-12 text-secondary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Coming soon...</h3>
                  <p className="text-muted-foreground mb-4"></p>
                  <Button variant="outline" className="w-full bg-transparent cursor-pointer">
                    View Servers
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Xovan Store?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              We provide industry-leading gaming services with unmatched reliability and professional support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-border/50">
              <CardContent className="p-8">
                <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Secure & Protected</h3>
                <p className="text-muted-foreground">
                  Advanced DDoS protection and security measures to keep your gaming experience safe and uninterrupted.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-border/50">
              <CardContent className="p-8">
                <Zap className="w-12 h-12 text-secondary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Lightning Fast</h3>
                <p className="text-muted-foreground">
                  High-performance infrastructure with low latency connections for the best gaming experience possible.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-border/50">
              <CardContent className="p-8">
                <Star className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">Premium Quality</h3>
                <p className="text-muted-foreground">
                  Professional-grade services with 24/7 support and guaranteed uptime for your peace of mind.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers and experience the difference with Xovan Store's premium gaming
            services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services/growtopia">
              <Button size="lg" className="flex items-center gap-2 cursor-pointer">
                View Growtopia Services
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="cursor-pointer">
              Contact Support
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
