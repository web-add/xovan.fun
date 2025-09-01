"use client"

import { useState } from "react"
import { ArrowRight, Shield, Users, MessageCircle, Palette, Terminal, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function GrowtopiaServices() {
  const [selectedPlan, setSelectedPlan] = useState("basic")

  const plans = [
    {
      id: "basic",
      name: "Basic Server",
      price: "Rp. 120,000",
      period: "/month",
      description: "Perfect for small communities",
      features: [
        "Up to 300 players",
        "Advanced custom items",
        "Full server console",
        "Discord support",
        "Daily backups",
        "Include ready world design",
        "99.5% uptime guarantee",
      ],
      popular: false,
    },
    {
      id: "premium",
      name: "Premium Server",
      price: "Rp. 160,000",
      period: "/month",
      description: "Best for growing communities",
      features: [
        "Up to 600 players",
        "Advanced custom items",
        "Full server console",
        "Priority Discord support",
        "2Hour backups",
        "Include ready world design",
        "99.9% uptime guarantee",
      ],
      popular: true,
    },
    {
      id: "enterprise",
      name: "Enterprise Server",
      price: "Rp. 200,000",
      period: "/month",
      description: "For large communities",
      features: [
        "Unlimited players",
        "Premium custom items",
        "Advanced server console",
        "24/7 dedicated support",
        "30Min backups",
        "Include ready world design",
        "99.99% uptime guarantee",
        "Custom features development",
      ],
      popular: false,
    },
  ]

  const features = [
    {
      icon: Shield,
      title: "Anti-DDoS Protection",
      description: "Advanced protection against DDoS attacks to keep your server online 24/7",
    },
    {
      icon: Users,
      title: "Discord Community",
      description: "Join our active Discord community for support, feature requests, and updates",
    },
    {
      icon: Palette,
      title: "Custom Items & Design",
      description: "Get custom items and world designs tailored to your server's theme",
    },
    {
      icon: Terminal,
      title: "Server Console",
      description: "Full access to server console for complete control over your Growtopia server",
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4 py-12 md:py-16 lg:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-4 bg-primary/20 text-primary border-primary/30">Most Popular Service</Badge>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Growtopia Server Hosting
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Premium Growtopia server hosting on powerful VPS infrastructure with custom features, 24/7 support, and
              Discord community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
              >
                View Pricing
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="outline" className="cursor-pointer" size="lg" asChild>
                <a href="https://dsc.gg/xovan" target="_blank" rel="noopener noreferrer">
                  Join Discord
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Why Choose Our Growtopia Hosting?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              All Growtopia servers are hosted on one powerful VPS with premium features and dedicated support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-border/50 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <feature.icon className="w-10 h-10 md:w-12 md:h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-12 md:py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Choose Your Plan</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Flexible pricing options to suit communities of all sizes. (Also accept Real Growtopia DL payment - price
              depends on RGT Economy).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative hover:shadow-lg transition-all duration-300 ${
                  plan.popular ? "border-primary/50 bg-gradient-to-br from-primary/5 to-secondary/5 scale-105" : ""
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl md:text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-2xl md:text-3xl font-bold text-primary">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full cursor-pointer"
                    variant={plan.popular ? "default" : "outline"}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    Choose Plan
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Additional Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Enhance your server with our premium add-on services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Palette className="w-8 h-8 text-primary" />
                  <CardTitle>Custom Items & Design</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Get custom items and world designs created specifically for your server's theme and community.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-primary">Starting at Rp. 20,000</span>
                  <Button variant="outline" size="sm" className="cursor-pointer">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-8 h-8 text-secondary" />
                  <CardTitle>Discord Community Access</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Join our exclusive Discord community where you can request features, report bugs, and get priority
                  support.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-secondary">Free with hosting</span>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://dsc.gg/xovan" target="_blank" rel="noopener noreferrer">
                      Join Now
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Your Growtopia Server?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied server owners and create the ultimate Growtopia experience for your community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="flex items-center gap-2 cursor-pointer">
              Get Started Now
              <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="https://dsc.gg/xovan" target="_blank" rel="noopener noreferrer">
                Contact Support
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
