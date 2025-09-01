"use client"

import { useState, useEffect, useRef } from "react"
import {
  ArrowLeft,
  Users,
  Star,
  Wifi,
  Download,
  Grid2x2,
  Smartphone,
  Monitor,
  MessageSquare,
  Rocket,
  Send,
  Radio,
  Apple,
  MessageCircle,
  Youtube,
  Music,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ToastContainer, showToast } from "@/components/toast";
export const runtime = "edge";
function formatDate(utcString: string) {
  // tambahkan "Z" agar dianggap UTC
  const d = new Date(utcString + "Z");
  return d.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}


export default function ServerDetail() {
  const params = useParams()
  const serverName = (params.name as string)?.toLowerCase()
  const [server, setServer] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [comments, setComments] = useState<any[]>([])
  const [userRating, setUserRating] = useState(0)
  const [userComment, setUserComment] = useState("")
  const [reviewLoading, setReviewLoading] = useState(false)
  const [reviewError, setReviewError] = useState("")
  const [avgRating, setAvgRating] = useState<string>("0.0");
  const fetched = useRef(false);

  useEffect(() => {
    const fetchServer = async () => {
      if (fetched.current) return; // cegah eksekusi kedua
      fetched.current = true;
      try {
        const res = await fetch(`https://api.xovan.fun/api/server/${serverName}`, {
          method: "POST", 
          headers: { "Content-Type": "application/json" },
          credentials: "include"
        })
        const data = await res.json()
        setServer(data.server)
        setComments(data.reviews)
        if (data.reviews && data.reviews.length > 0) {
          const total = data.reviews.reduce((sum: number, r: any) => sum + Number(r.rating), 0);
          setAvgRating((total / data.reviews.length).toFixed(1));
        } else {
          setAvgRating("0.0");
        }
      } catch (err) {
        console.error(err)
        setServer(null)
      } finally {
        setLoading(false)
      }
    }
    if (serverName) fetchServer()
  }, [serverName])

  if (loading) return <p className="text-center">Loading server data...</p>
  if (!server) return <p className="text-center text-red-500">Server not found</p>

  const renderStars = (rating: number, interactive = false, onRate?: (rating: number) => void) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 cursor-pointer transition-colors ${
          i < Math.floor(rating)
            ? "fill-secondary text-secondary"
            : i < rating
              ? "fill-secondary/50 text-secondary"
              : interactive
                ? "text-muted-foreground hover:text-secondary"
                : "text-muted-foreground"
        }`}
        onClick={() => interactive && onRate && onRate(i + 1)}
      />
    ))
  }

  const handleSubmitReview = async () => {
    if (!userRating || !userComment) {
      setReviewError("Please provide a rating and a comment.");
      return
    }
    try {
      setReviewLoading(true);
      setReviewError("");
      const res = await fetch("https://api.xovan.fun/api/server/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // supaya cookie/token kebawa
        body: JSON.stringify({
          serverId: server.id,
          rating: userRating,
          comment: userComment,
        }),
      })
      const data = await res.json();
      if (!res.ok) throw setReviewError(data.error || "Failed to submit review");
      if (data.success) {
        const newComments = [...comments, data.review];
        setComments(newComments);
        const total = data.reviews.reduce((sum: number, r: any) => sum + Number(r.rating), 0);
        setAvgRating((total / newComments.length).toFixed(1));
        setUserRating(0)
        setUserComment("")
      }
    } catch (err: unknown) {
    } finally {
      setReviewLoading(false);
    }
  }

  const getPingColor = (ping: number) => {
    if (ping < 50) return "text-green-400"
    if (ping < 70) return "text-yellow-400"
    return "text-red-400"
  }
  const downloadHostFile = () => {
    const hostContent = `5.175.246.31 growtopia1.com
5.175.246.31 growtopia2.com
5.175.246.31 www.growtopia1.com
5.175.246.31 www.growtopia2.com`;

    const blob = new Blob([hostContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "XovanHost.txt"; // nama file
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast("Host file downloaded", "success");
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    showToast(`Copied ${type}`, "success");
  }
  const currentEpoch = Math.floor(Date.now() / 1000);

  const checkServerOnline = (server: any) => {
    return server.last_updated && currentEpoch - server.last_updated <= 60;
  };
  const connectionMethods = [
    {
      name: "Download Host",
      icon: Download,
      action: downloadHostFile
    },
    {
      name: "Copy Powertunnel",
      icon: Rocket,
      action: () => copyToClipboard(`https://xovan.fun/gtps/ptunnel.txt`, "Powertunnel link"),
    },
    {
      name: "Copy Surge5",
      icon: Apple,
      action: () => copyToClipboard(`https://xovan.fun/gtps/iOS`, "Surge5 link"),
    },
    {
      name: "Copy IP (Windows)",
      icon: Grid2x2,
      action: () => copyToClipboard(`5.175.246.31 growtopia1.com
5.175.246.31 growtopia2.com
5.175.246.31 www.growtopia1.com
5.175.246.31 www.growtopia2.com`, "Server IP"),
    },
  ]

  const socialMediaMethods = [
    {
      name: "WhatsApp",
      icon: MessageCircle,
      color: "bg-green-600 hover:bg-green-700",
      action: () => window.open(server.whatsapp, "_blank"),
    },
    {
      name: "Discord",
      icon: MessageCircle,
      color: "bg-indigo-600 hover:bg-indigo-700",
      action: () => window.open(server.discord, "_blank"),
    },
    {
      name: "YouTube",
      icon: Youtube,
      color: "bg-red-600 hover:bg-red-700",
      action: () => window.open(server.youtube, "_blank"),
    },
    {
      name: "TikTok",
      icon: Music,
      color: "bg-black hover:bg-gray-800",
      action: () => window.open(server.tiktok, "_blank"),
    },
  ]

  return (
    <div className="min-h-screen">
      <ToastContainer />
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/servers">
              <Button variant="ghost" size="sm" className="cursor-pointer">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Servers
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-primary">Server Details</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Server Header */}
        <div className="mb-8">
          <Card className="border-border bg-card">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-2xl text-card-foreground">{server.name}</CardTitle>
                    <Badge variant="outline" className="text-xs">
                      UDP: {server.port}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-4">{server.desc}</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">{server.location}</Badge>
                    <Badge variant="outline">{server.game}</Badge>
                    <Badge variant="outline">{checkServerOnline(server) ? "Online" : "Offline"}</Badge>
                  </div>
                </div>
                <div className="text-right md:text-right">
                  <div className="flex flex-col md:items-end items-start gap-1">
                    {/* Ping */}
                    <div className="flex items-center gap-1">
                      <Wifi
                        className={`w-6 h-6 ${checkServerOnline(server) ? getPingColor(server.ping) : "text-red-500"}`}
                      />
                      <span
                        className={`text-lg font-semibold ${
                          checkServerOnline(server) ? getPingColor(server.ping) : "text-red-500"
                        }`}
                      >
                        {checkServerOnline(server) ? `${server.ping}ms` : "? ms"}
                      </span>
                    </div>

                    {/* Status Badge */}
                    <div
                      className={`px-3 py-1 rounded-full text-sm font-semibold text-white ${
                        checkServerOnline(server) ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {checkServerOnline(server) ? "Online" : "Offline"}
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4 border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <Radio className="w-5 h-5 text-primary animate-pulse" />
                  <h3 className="font-semibold text-primary">Live Server Broadcast</h3>
                </div>
                <p className="text-sm text-muted-foreground">Coming Soon..</p>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Players Online</p>
                    <p className="text-xl font-semibold">
                      <span className="text-primary">{server.online}</span>
                      <span className="text-muted-foreground">/{server.MaxPlayer}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">{renderStars(Number(avgRating))}</div>
                  <div>
                    <p className="text-sm text-muted-foreground">Rating</p>
                    <p className="text-xl font-semibold">{avgRating}/5.0</p>
                  </div>
                </div>
              </div>

              {/* Connection Methods */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Connection Methods</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {connectionMethods.map((method, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-auto p-4 flex flex-col items-center gap-2 bg-transparent cursor-pointer"
                      onClick={method.action}
                    >
                      <method.icon className="w-5 h-5" />
                      <span className="text-sm">{method.name}</span>
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Join Our Community</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {socialMediaMethods.map((social, index) => (
                    <Button
                      key={index}
                      className={`h-auto p-4 flex flex-col items-center gap-2 text-white cursor-pointer ${social.color}`}
                      onClick={social.action}
                    >
                      <social.icon className="w-5 h-5" />
                      <span className="text-sm">{social.name}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tutorials Section */}
        <Card className="border-border bg-card mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-card-foreground">How to Play</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="windows" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="windows" className="flex items-center gap-2 cursor-pointer">
                  <Monitor className="w-4 h-4" />
                  Windows
                </TabsTrigger>
                <TabsTrigger value="android" className="flex items-center gap-2 cursor-pointer">
                  <Smartphone className="w-4 h-4" />
                  Android
                </TabsTrigger>
                <TabsTrigger value="ios" className="flex items-center gap-2 cursor-pointer">
                  <Apple className="w-4 h-4" />
                  iOS
                </TabsTrigger>
              </TabsList>

              <TabsContent value="windows" className="mt-6">
                <div className="prose prose-invert max-w-none">
                  <h4 className="text-lg font-semibold mb-3">Windows Tutorial</h4>
                  <div className="bg-muted/20 p-4 rounded-lg">
                    <p className="text-muted-foreground">
                      Tutorial content for Windows will be added here. You can include step-by-step instructions,
                      screenshots, and any specific requirements for connecting to the server on Windows.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="android" className="mt-6">
                <div className="prose prose-invert max-w-none">
                  <h4 className="text-lg font-semibold mb-3">Android Tutorial</h4>
                  <div className="bg-muted/20 p-4 rounded-lg">
                    <p className="text-muted-foreground">
                      Tutorial content for Android will be added here. Include information about required apps,
                      configuration steps, and any Android-specific connection methods.
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="ios" className="mt-6">
                <div className="prose prose-invert max-w-none">
                  <h4 className="text-lg font-semibold mb-3">iOS Tutorial</h4>
                  <div className="bg-muted/20 p-4 rounded-lg">
                    <p className="text-muted-foreground">
                      Tutorial content for iOS will be added here. Provide instructions for iOS devices, including any
                      required apps from the App Store and configuration steps.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Rating and Comments Section */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-xl text-card-foreground flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Reviews & Comments
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Write Review Section */}
            <div className="border border-border rounded-lg p-4 bg-muted/10">
              <h4 className="text-lg font-semibold mb-4">Write a Review</h4>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Your Rating</label>
                  <div className="flex items-center gap-1">{renderStars(userRating, true, setUserRating)}</div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Your Comment</label>
                  <Textarea
                    placeholder="Share your experience with this server..."
                    value={userComment}
                    onChange={(e) => setUserComment(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>

                {reviewError && <p className="text-red-500 text-sm">{reviewError}</p>}
                <Button onClick={handleSubmitReview} disabled={reviewLoading} className="flex items-center gap-2 cursor-pointer">
                  <Send className="w-4 h-4" />
                  {reviewLoading ? "Submitting..." : "Submit Review"}
                </Button>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Player Reviews ({comments.length})</h4>

              {comments.map((comment) => (
                <div key={comment.id} className="border border-border rounded-lg p-4 bg-card/50">
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold`}
                      style={{ backgroundColor: comment.ProfileColor }}
                    >
                      {comment.username.charAt(0).toUpperCase()}{comment.username.charAt(1).toUpperCase()}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold">{comment.username}</span>
                        <div className="flex items-center gap-1">{renderStars(comment.rating)}</div>
                        <span className="text-sm text-muted-foreground">• {formatDate(comment.created_at)}</span>
                      </div>

                      <p className="text-muted-foreground mb-3">{comment.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
