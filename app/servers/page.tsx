"use client"

import { useState, useEffect, useRef } from "react"
import { Search, Users, Star, Wifi, Shield, Clock, Zap, Server, Globe, AlertTriangle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function ServerList() {
  const [servers, setServers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const fetched = useRef(false);
  useEffect(() => {
    if (fetched.current) return; // cegah eksekusi kedua
      fetched.current = true;
    const fetchServers = async () => {
      try {
        const res = await fetch("https://api.xovan.fun/api/server", {
          method: "POST", // or "GET" if you just want to fetch
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const data = await res.json();
        setServers(data.servers);
      } catch (err) {
        console.error(err);
      }
    };

    fetchServers();
  }, []);

  const filteredServers = servers.filter(
    (server) =>
      server.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      server.game.toLowerCase().includes(searchTerm.toLowerCase()) ||
      server.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPlayers = servers.reduce((sum, server) => sum + server.online, 0);

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? "fill-secondary text-secondary"
            : i < rating
            ? "fill-secondary/50 text-secondary"
            : "text-muted-foreground"
        }`}
      />
    ));

  const getPingColor = (ping: number) => {
    if (ping < 50) return "text-green-400";
    if (ping < 70) return "text-yellow-400";
    return "text-red-400";
  };

  const currentEpoch = Math.floor(Date.now() / 1000);
  const checkServerOnline = (server : any) => {
    return server.last_updated && currentEpoch - server.last_updated <= 60;
  };

  return (
    <div className="min-h-screen">
      {/* Header with Search */}
      <div className="bg-card/50 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-primary mb-2">Growtopia Servers</h1>
              <p className="text-sm md:text-base text-muted-foreground">Premium gaming servers with high performance</p>
            </div>
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search servers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full md:w-64"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-6">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-red-500" />
              <span className="text-sm font-medium text-red-500">Anti DDoS</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-secondary" />
              <span className="text-sm font-medium text-secondary">High Uptime</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-green-400" />
              <span className="text-sm font-medium text-green-400">Stable Ping</span>
            </div>
          </div>

          {/* Stats boxes - only these two */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
            <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
              <CardContent className="p-4 flex items-center gap-3">
                <Server className="w-8 h-8 text-primary" />
                <div>
                  <p className="font-semibold text-primary">Total Servers</p>
                  <p className="text-sm text-muted-foreground">{servers.length}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-secondary/10 to-primary/10 border-secondary/20">
              <CardContent className="p-4 flex items-center gap-3">
                <Globe className="w-8 h-8 text-secondary" />
                <div>
                  <p className="font-semibold text-secondary">Players Online</p>
                  <p className="text-sm text-muted-foreground">{totalPlayers}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg md:text-xl font-semibold mb-2">Available Servers</h2>
          <p className="text-sm md:text-base text-muted-foreground">
            Found {filteredServers.length} server{filteredServers.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Server Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredServers.map((server) => (
            <Card
              key={server.id}
              className="hover:shadow-lg transition-all duration-200 border-border bg-card hover:border-primary/30"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-base md:text-lg text-card-foreground">
                    {server.name}
                    <Badge variant="outline" className="text-xs">
                      {server.port}
                    </Badge></CardTitle>
                  <div className="flex items-center gap-1">
                    {checkServerOnline(server) ? (
                      <>
                        <Wifi className={`w-4 h-4 ${getPingColor(server.ping)}`} />
                        <span className={`text-sm ${getPingColor(server.ping)}`}>{server.ping}ms</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                        <span className="text-sm text-red-500">Offline</span>
                      </>
                    )}

                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="secondary" className="text-xs">
                    {server.location}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {server.game}
                  </Badge>
                  <Badge variant={checkServerOnline(server) ? "secondary" : "destructive"} className="text-xs">
                    {checkServerOnline(server) ? "Online" : "Offline"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {server.desc}
                </p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Player Count */}
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-sm">
                    <span className="font-semibold text-primary">{server.online}</span>
                    <span className="text-muted-foreground">/{server.MaxPlayer} players</span>
                  </span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">{renderStars(server.avgRating)}</div>
                  <span className="text-sm font-medium">{server.avgRating}</span>
                </div>

                {/* Progress Bar for Player Count */}
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      checkServerOnline(server) ? "bg-primary" : "bg-red-500"
                    }`}
                    style={{ width: `${checkServerOnline(server) ? (server.online / server.MaxPlayer) * 100 : 0}%` }}
                  />
                </div>

                {/* Open Button */}
                <Link href={`/server/${server.name}`}>
                  <Button
                    className="w-full mt-4 cursor-pointer"
                    size="sm"
                    variant={checkServerOnline(server) ? "default" : "secondary"}
                  >
                    {checkServerOnline(server) ? "Open Server" : "Server Offline"}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredServers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No servers found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  )
}
