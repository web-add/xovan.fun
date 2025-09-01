"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Server,
  Play,
  Square,
  UserCheck,
  Users,
  Clock,
  Zap,
} from "lucide-react"
import { useParams } from "next/navigation"

function ServerOverview({ serverStatus, serverStats, handleServerAction, actionLoading, handleUpdateServer }) {
  const isOnline = serverStatus === "online"

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Server Controls</CardTitle>
          <CardDescription>Manage your server's operational status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            {/* Start */}
            <Button
              type="button"
              disabled={actionLoading || isOnline}
              variant="default"
              className={`${
                isOnline ? "opacity-50 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
              } text-white`}
              onClick={() => handleServerAction("start")}
            >
              <Play className="h-4 w-4 mr-2" />
              {actionLoading && !isOnline ? "Starting..." : "Start"}
            </Button>

            {/* Stop */}
            <Button
              type="button"
              disabled={actionLoading || !isOnline}
              variant="destructive"
              className={`${!isOnline ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() => handleServerAction("stop")}
            >
              <Square className="h-4 w-4 mr-2" />
              {actionLoading && isOnline ? "Stopping..." : "Stop"}
            </Button>

            {/* Restart */}
            <Button
              type="button"
              disabled={actionLoading || !isOnline}
              variant="secondary"
              className={`${
                !isOnline ? "opacity-50 cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-600 text-black"
              }`}
              onClick={() => handleServerAction("restart")}
            >
              <Zap className="h-4 w-4 mr-2" />
              {actionLoading ? "Restarting..." : "Restart"}
            </Button>
            <Button
              type="button"
              disabled={actionLoading || isOnline} 
              variant="secondary"
              className={`${
                isOnline ? "opacity-50 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
              onClick={handleUpdateServer}
            >
              {actionLoading ? "Updating..." : "Update"}
            </Button>
          </div>
        </CardContent>
      </Card>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-600 dark:text-green-400">
                  Players Online
                </p>
                <p className="text-3xl font-bold text-green-500">
                  {serverStats.playersOnline}
                </p>
                <p className="text-xs text-muted-foreground">
                  of {serverStats.maxPlayers} max
                </p>
              </div>
              <Users className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  Server Uptime
                </p>
                <p className="text-3xl font-bold text-blue-500">
                  {serverStats.uptime}
                </p>
                <p className="text-xs text-muted-foreground">Last 30 days</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-600 dark:text-purple-400">
                  Server Ping
                </p>
                <p className="text-3xl font-bold text-purple-500">
                  {serverStats.ping}
                </p>
                <p className="text-xs text-muted-foreground">
                  Average response
                </p>
              </div>
              <Zap className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border-cyan-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-cyan-600 dark:text-cyan-400">
                  Server Status
                </p>
                <p className="text-2xl font-bold text-cyan-500 capitalize">
                  {serverStatus}
                </p>
                <p className="text-xs text-muted-foreground">Current state</p>
              </div>
              <Server className="h-8 w-8 text-cyan-500" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function ServerSettings({
  serverDescription,
  setServerDescription,
  serverLocation,
  setServerLocation,
  socialMedia,
  onSaveConfig,
  setSocialMedia,
  onSaveSocial
}) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Server Configuration</CardTitle>
          <CardDescription>Manage your server settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="server-description">Server Description</Label>
            <Textarea
              id="server-description"
              value={serverDescription}
              onChange={(e) => setServerDescription(e.target.value)}
              placeholder="Describe your server..."
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={serverLocation}
              onChange={(e) => setServerLocation(e.target.value)}
              placeholder="Indonesia"
            />
          </div>

          <Button type="button" onClick={onSaveConfig}>
            Save Changes
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Social Media Links</CardTitle>
          <CardDescription>Configure your community links</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="whatsapp">WhatsApp Group</Label>
            <Input
              id="whatsapp"
              value={socialMedia.whatsapp}
              onChange={(e) =>
                setSocialMedia({ ...socialMedia, whatsapp: e.target.value })
              }
              placeholder="https://wa.me/1234567890"
            />
          </div>

          <div>
            <Label htmlFor="discord">Discord Server</Label>
            <Input
              id="discord"
              value={socialMedia.discord}
              onChange={(e) =>
                setSocialMedia({ ...socialMedia, discord: e.target.value })
              }
              placeholder="https://discord.gg/yourserver"
            />
          </div>

          <div>
            <Label htmlFor="youtube">YouTube Channel</Label>
            <Input
              id="youtube"
              value={socialMedia.youtube}
              onChange={(e) =>
                setSocialMedia({ ...socialMedia, youtube: e.target.value })
              }
              placeholder="https://youtube.com/@yourchannel"
            />
          </div>

          <div>
            <Label htmlFor="tiktok">TikTok Profile</Label>
            <Input
              id="tiktok"
              value={socialMedia.tiktok}
              onChange={(e) =>
                setSocialMedia({ ...socialMedia, tiktok: e.target.value })
              }
              placeholder="https://tiktok.com/@yourprofile"
            />
          </div>

          <Button type="button" onClick={onSaveSocial}>
            Save Social Media Links
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Server Transfer</CardTitle>
          <CardDescription>
            Transfer server ownership to another user
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="transfer-username">Transfer to Username</Label>
            <Input
              id="transfer-username"
              placeholder="Enter username to transfer to"
            />
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <p className="text-sm text-yellow-600 dark:text-yellow-400">
              <strong>Warning:</strong> Server transfer is permanent and cannot
              be undone. Make sure you trust the recipient.
            </p>
          </div>

          <Button type="button" variant="destructive" className="flex items-center gap-2">
            <UserCheck className="h-4 w-4" />
            Transfer Server
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

function WebhookSettings({ webhooks, setWebhooks, onSaveWebhooks }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Webhook Configuration</CardTitle>
          <CardDescription>
            Configure webhook endpoints for server events
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
            <p className="text-sm text-yellow-600 dark:text-yellow-400">
              <strong>⚠️ Note:</strong> Webhook changes require a{" "}
              <span className="font-bold">server restart</span> to take effect.
            </p>
          </div>

          <div>
            <Label htmlFor="webhook-sb">Server Broadcast</Label>
            <Input
              id="webhook-sb"
              value={webhooks.webhook_sb}
              onChange={(e) =>
                setWebhooks({ ...webhooks, webhook_sb: e.target.value })
              }
              placeholder="https://discord.com/api/webhooks/..."
            />
          </div>

          <div>
            <Label htmlFor="webhook-ban">Ban Events</Label>
            <Input
              id="webhook-ban"
              value={webhooks.webhook_ban}
              onChange={(e) =>
                setWebhooks({ ...webhooks, webhook_ban: e.target.value })
              }
              placeholder="https://discord.com/api/webhooks/..."
            />
          </div>

          <div>
            <Label htmlFor="webhook-mute">Mute Events</Label>
            <Input
              id="webhook-mute"
              value={webhooks.webhook_mute}
              onChange={(e) =>
                setWebhooks({ ...webhooks, webhook_mute: e.target.value })
              }
              placeholder="https://discord.com/api/webhooks/..."
            />
          </div>

          <div>
            <Label htmlFor="webhook-curse">Curse Events</Label>
            <Input
              id="webhook-curse"
              value={webhooks.webhook_curse}
              onChange={(e) =>
                setWebhooks({ ...webhooks, webhook_curse: e.target.value })
              }
              placeholder="https://discord.com/api/webhooks/..."
            />
          </div>

          <div>
            <Label htmlFor="webhook-createacc">Account Creation</Label>
            <Input
              id="webhook-createacc"
              value={webhooks.webhook_createacc}
              onChange={(e) =>
                setWebhooks({ ...webhooks, webhook_createacc: e.target.value })
              }
              placeholder="https://discord.com/api/webhooks/..."
            />
          </div>

          <div>
            <Label htmlFor="webhook-giveaway">Giveaway Events</Label>
            <Input
              id="webhook-giveaway"
              value={webhooks.webhook_giveaway}
              onChange={(e) =>
                setWebhooks({ ...webhooks, webhook_giveaway: e.target.value })
              }
              placeholder="https://discord.com/api/webhooks/..."
            />
          </div>

          <div>
            <Label htmlFor="webhook-economyupdate">Economy Updates</Label>
            <Input
              id="webhook-economyupdate"
              value={webhooks.webhook_economyupdate}
              onChange={(e) =>
                setWebhooks({ ...webhooks, webhook_economyupdate: e.target.value })
              }
              placeholder="https://discord.com/api/webhooks/..."
            />
          </div>

          <Button type="button" onClick={onSaveWebhooks}>
            Save Webhook Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default function GrowtopiaManagePage() {
  const params = useParams()
  const name = (params.name as string)?.toLowerCase()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [serverData, setServerData] = useState<any>(null)
  const [serverStats, setServerStats] = useState({
    playersOnline: 0,
    maxPlayers: 0,
    uptime: "0%",
    ping: "0ms",
  })
  const [serverStatus, setServerStatus] = useState("offline")
  const [serverDescription, setServerDescription] = useState("")
  const [serverLocation, setServerLocation] = useState("")
  const [socialMedia, setSocialMedia] = useState({
    whatsapp: "",
    discord: "",
    youtube: "",
    tiktok: "",
  })
  const [webhooks, setWebhooks] = useState({})
  useEffect(() => {
    async function fetchServer() {
      try {
        setLoading(true)
        const res = await fetch(`https://api.xovan.fun/api/manage/${name}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        })
        if (!res.ok) throw new Error("Failed to fetch server")
        const data = await res.json()
        if (!data.success) throw new Error(data.error || "Unknown error")

        const currentEpoch = Math.floor(Date.now() / 1000);
        let status = "offline"
        if (data.server.last_updated && currentEpoch - data.server.last_updated <= 60)  status = "online";
        setServerStatus(status)
        setServerData(data.server)
        setServerDescription(data.server.desc || "")
        setServerLocation(data.server.location || "")
        setSocialMedia({
          whatsapp: data.server.whatsapp || "",
          discord: data.server.discord || "",
          youtube: data.server.youtube || "",
          tiktok: data.server.tiktok || "",
        })
        setServerStats({
          playersOnline: data.server.online ?? 0,
          maxPlayers: data.server.MaxPlayer ?? 0,
          uptime: "99.6%",
          ping: data.server.ping ?? "0ms",
        })
        setWebhooks({
          webhook_sb: data.server.webhook_sb || "",
          webhook_ban: data.server.webhook_ban || "",
          webhook_mute: data.server.webhook_mute || "",
          webhook_curse: data.server.webhook_curse || "",
          webhook_createacc: data.server.webhook_createacc || "",
          webhook_giveaway: data.server.webhook_giveaway || "",
          webhook_economyupdate: data.server.webhook_economyupdate || "",
        })
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchServer()
  }, [name])

  // di GrowtopiaManagePage
  async function saveServerConfig() {
    try {
      const res = await fetch(`https://api.xovan.fun/api/manage/${name}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          description: serverDescription,
          location: serverLocation,
        }),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error || "Failed to save")

      
      setServerDescription(data.server.desc)
      setServerLocation(data.server.location)
      setServerData(data.server)
      alert("✅ Server configuration saved")
    } catch (err: any) {
      alert("❌ " + err.message)
    }
  }

  async function saveSocialLinks() {
    try {
      const res = await fetch(`https://api.xovan.fun/api/manage/${name}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(socialMedia),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error || "Failed to save")

      setSocialMedia({
        whatsapp: data.server.whatsapp || "",
        discord: data.server.discord || "",
        youtube: data.server.youtube || "",
        tiktok: data.server.tiktok || "",
      })
      setServerData(data.server)
      alert("✅ Social media links saved")
    } catch (err: any) {
      alert("❌ " + err.message)
    }
  }
  async function saveWebhooks() {
    try {
      const res = await fetch(`https://api.xovan.fun/api/manage/${name}/webhooks`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(webhooks),
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error || "Failed to save")
      setWebhooks(data.server)
      alert("✅ Webhooks saved (restart required)")
    } catch (err: any) {
      alert("❌ " + err.message)
    }
  }
  const [actionLoading, setActionLoading] = useState(false)

  async function handleServerAction(action: "start" | "stop" | "restart") {
    try {
      setActionLoading(true)
      const res = await fetch(`https://api.xovan.fun/api/manage/${name}/${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error || "Failed to " + action)

      alert("✅ " + data.message)
      if (action === "start") setServerStatus("online")
      if (action === "stop") setServerStatus("offline")
      if (action === "restart") setServerStatus("online")
    } catch (err: any) {
      alert("❌ " + err.message)
    } finally {
      setActionLoading(false)
    }
  }
  async function handleUpdateServer() {
    try {
      setActionLoading(true)
      const res = await fetch(`https://api.xovan.fun/api/manage/${name}/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.error || "Failed to update")

      alert("✅ " + data.message)
    } catch (err: any) {
      alert("❌ " + err.message)
    } finally {
      setActionLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Loading server...
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Error: {error}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Growtopia Server Management
          </h1>
          <p className="text-gray-300">
            Manage your Growtopia server settings and configuration
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <ServerOverview
              serverStatus={serverStatus}
              serverStats={serverStats}
              handleServerAction={handleServerAction}
              actionLoading={actionLoading}
              handleUpdateServer={handleUpdateServer}
            />
          </TabsContent>

          <TabsContent value="settings">
            <ServerSettings
              serverDescription={serverDescription}
              setServerDescription={setServerDescription}
              serverLocation={serverLocation}
              setServerLocation={setServerLocation}
              socialMedia={socialMedia}
              setSocialMedia={setSocialMedia}
              onSaveConfig={saveServerConfig}
              onSaveSocial={saveSocialLinks}
            />
          </TabsContent>

          <TabsContent value="webhooks">
            <WebhookSettings
              webhooks={webhooks}
              setWebhooks={setWebhooks}
              onSaveWebhooks={saveWebhooks}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
