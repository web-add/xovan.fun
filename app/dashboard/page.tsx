"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { ToastContainer, showToast } from "@/components/toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Code, Server, KeyRound, Hand, Delete, Shield, Eraser, XCircle, DoorOpen, ShieldUser, ChevronDown, ChevronUp, RefreshCw } from "lucide-react"
import LoadData from "@/components/login/load";
import Failed from "@/components/login/failed";
import Link from "next/link"
export default function AccountPage() {
  const [activeSection, setActiveSection] = useState("user")
  const [username, setUsername] = useState('undefined')
  const [Auth, setAuth] = useState(true)
  const [failed, setFailed] = useState(false)
  const [loggedOut, setLoggedOut] = useState(false)
  const [accDeleted, setAccDeleted] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [profileColor, setProfileColor] = useState("#3b82f6");
  const checkAdmin = async () => {
    const res = await fetch("https://api.xovan.fun/api/account", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ type: "isadmin" }),
    });
    const data = await res.json();
    console.log(data)
    setIsAdmin(data.isAdmin)
  };
  const logout = async() => {
    const res = await fetch("https://api.xovan.fun/api/account", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify( {
        "type": "logout"
      } ),
      credentials: "include" // penting untuk cookie
    });
    if (res.ok) {
      setLoggedOut(true);
      setTimeout(() => {
        window.location.href = "/";
      }, 4000)
    } 
  }
  const deleteacc = async() => {
    const res = await fetch("https://api.xovan.fun/api/account", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify( {
        "type": "delete"
      } ),
      credentials: "include"
    });
    if (res.ok) {
      setAccDeleted(true);
      setTimeout(() => {
        window.location.href = "/";
      }, 4000)
    } 
  }
  const LoadProfileColor = async () => {
      try {
        const res = await fetch("https://api.xovan.fun/api/account", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "profilecolor", param1: "get" }),
          credentials: "include",
        });
        const data = await res.json();
        setProfileColor(data.msg);
      } catch (e) {}
    };
  const Load = async () => {
    try {
      const res = await fetch("https://api.xovan.fun/api/account", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ type: "username" }),
          credentials: "include"
        })

      const data = await res.json();

      if (res.ok) {
        setUsername(data.msg)
        setTimeout(() => {
          setAuth(false);
        }, 2000)
      }
      else {
        setTimeout(() => {
          setAuth(false);
          setFailed(true);
        }, 2000)
      }
    } catch (err) {
      console.error("Load failed:", err);
      setTimeout(() => {
          setAuth(false);
          setFailed(true);
        }, 2000)
    }
  };
  useEffect(() => {
    Load(); // cek login status pas halaman load
    checkAdmin();
    LoadProfileColor();
  }, []);
  const userServices = {
    growtopia: [
      { id: 1, name: "GT World 1", status: "active", players: 45 },
      { id: 2, name: "GT PVP Arena", status: "active", players: 23 },
    ]
  }

  const profileColors = [
    "#3b82f6",
    "#ef4444",
    "#10b981",
    "#f59e0b",
    "#8b5cf6",
    "#ec4899",
    "#06b6d4",
    "#84cc16",
    "#f97316",
    "#6366f1",
  ]

  const SidebarContent = () => {
    return(
      <div className="space-y-2">
        <Button
          variant={activeSection === "user" ? "default" : "ghost"}
          className="w-full justify-start cursor-pointer"
          onClick={() => setActiveSection("user")}
        >
          <User className="mr-2 h-4 w-4" />
          User Settings
        </Button>
        <Button
          variant={activeSection === "services" ? "default" : "ghost"}
          className="w-full justify-start cursor-pointer"
          onClick={() => setActiveSection("services")}
        >
          <Server className="mr-2 h-4 w-4" />
          My Services
        </Button>
        <Button
          variant={activeSection === "api" ? "default" : "ghost"}
          className="w-full justify-start cursor-pointer"
          onClick={() => setActiveSection("api")}
        >
          <Code className="mr-2 h-4 w-4" />
          API Access
        </Button>
        <Button
          variant={activeSection === "admin" ? "default" : "ghost"}
          className={`w-full justify-start cursor-pointer 
            ${!isAdmin ? "pointer-events-none hover:bg-red-500 text-red-500" : ""}`}
          disabled={!isAdmin}
          onClick={() => isAdmin && setActiveSection("admin")}
        >
          <ShieldUser className="mr-2 h-4 w-4" />
          Admin Console
        </Button>
      </div>
    )
  }

  const UserSection = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newConfirmPassword, setNewConfirmPassword] = useState("");

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setOldPassword(e.target.value);
    };

    const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewPassword(e.target.value);
    };

    const handleNewPasswordConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewConfirmPassword(e.target.value);
    };

    const ChangePassword = async () => {
      if (oldPassword.length < 8) {
        showToast("Your OLD password must be at least 8 characters", "error");
      } else if (newPassword === "" || newConfirmPassword === "") {
        showToast("New Password cannot be empty", "warning");
      } else if (newPassword.length < 8 || newConfirmPassword.length < 8) {
        showToast("Your NEW password must be at least 8 characters", "warning");
      } else if (newPassword === oldPassword) {
        showToast("The new password is the same as the old one", "warning");
      } else if (newPassword != newConfirmPassword) {
        showToast("Passwords do not match!", "warning");
      } else {
        const res = await fetch("https://api.xovan.fun/api/account", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "changepass",
            param1: oldPassword,
            param2: newPassword,
          }),
          credentials: "include",
        });
        if (res.ok) {
          showToast("Password changed successfully!", "success");
        } else {
          showToast("Failed to change password!", "error");
        }
      }
    };

    const setProfileColor2 = async (e: string) => {
      const res = await fetch("https://api.xovan.fun/api/account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "profilecolor",
          param1: "set",
          param2: e,
        }),
        credentials: "include",
      });
      if (res.ok) {
        setProfileColor(e);
      }
    };

    return (
      <div className="space-y-6">
        {/* Profile Settings */}
        <Card className="shadow-lg rounded-2xl border border-border">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Profile Settings</CardTitle>
            <CardDescription className="text-muted-foreground">
              Manage your account information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar + Profile Color */}
            <div className="flex flex-col sm:flex-row items-center sm:space-x-6 space-y-4 sm:space-y-0">
              <div
                className="h-20 w-20 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md"
                style={{ backgroundColor: profileColor }}
              >
                {username.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Profile Color</p>
                <div className="flex gap-2 flex-wrap">
                  {profileColors.map((color) => (
                    <button
                      key={color}
                      className={`cursor-pointer w-8 h-8 rounded-full border-2 transition ${
                        profileColor === color ? "border-primary scale-110" : "border-muted"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setProfileColor2(color)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Username */}
            <div className="pt-4 border-t">
              <Label htmlFor="username" className="text-sm text-muted-foreground">
                Username
              </Label>
              <p className="mt-1 font-medium text-lg">{username}</p>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="shadow-lg rounded-2xl border border-border">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Security Settings</CardTitle>
            <CardDescription className="text-muted-foreground">
              Keep your account secure
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" onChange={handlePasswordChange} />
              </div>
              <div>
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" onChange={handleNewPasswordChange} />
              </div>
              <div>
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" onChange={handleNewPasswordConfirmChange} />
              </div>
            </div>

            <Button className="w-full cursor-pointer" onClick={ChangePassword}>
              Update Security Settings
            </Button>
            <Button
              className="w-full bg-gray-600 hover:bg-gray-700 cursor-pointer"
              onClick={logout}
            >
              Log Out
            </Button>

            {/* Danger Zone */}
            <div className="mt-6 border-t border-red-500 pt-4 space-y-2">
              <Button
                className="w-full bg-red-500 hover:bg-red-600 cursor-pointer"
                onClick={() => setShowConfirm(true)}
              >
                DELETE ACCOUNT
              </Button>
              <p className="text-xs text-red-400 text-center">
                This action is irreversible.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Confirm Delete Modal */}
        {showConfirm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-gray-900 p-6 rounded-lg w-80 text-center space-y-4 shadow-xl">
              <h2 className="text-lg font-bold text-red-400">Confirm Deletion</h2>
              <p className="text-sm text-muted-foreground">
                Are you sure you want to delete your account? This action cannot be undone.
              </p>
              <div className="flex justify-between gap-4 pt-2">
                <Button
                  className="bg-gray-700 hover:bg-gray-600 flex-1"
                  onClick={() => setShowConfirm(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="bg-red-500 hover:bg-red-600 flex-1"
                  onClick={() => {
                    deleteacc();
                    setShowConfirm(false);
                  }}
                >
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };


  const ServicesSection = () => {
    const [servers, setServers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchServers = async () => {
      try {
        const res = await fetch("https://api.xovan.fun/api/server/imowner", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // supaya cookie/token kebawa;
        })
        const data = await res.json();

        if (data.success) {
          const now = Math.floor(Date.now() / 1000); // epoch (detik)

          const serversWithStatus = data.servers.map((s) => {
            const diff = now - s.last_updated;
            return {
              ...s,
              status: diff <= 60 ? "active" : "inactive",
            };
          });

          setServers(serversWithStatus);
        }
      } catch (err) {
        console.error("Failed to fetch servers", err);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchServers();

      const interval = setInterval(fetchServers, 30000);
      return () => clearInterval(interval);
    }, []);

    if (loading) return <p>Loading servers...</p>;

    return (
      <div className="space-y-6">
        <Card className="shadow-lg hover:shadow-xl transition">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <div className="w-6 h-6 rounded bg-gradient-to-r from-green-400 to-green-600"></div>
              Growtopia Services
            </CardTitle>
          </CardHeader>
          <CardContent>
            {servers.length === 0 ? (
              <p className="text-muted-foreground">No servers found.</p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {servers.map((service) => (
                  <div
                    key={service.id}
                    className="p-4 border rounded-xl shadow-sm bg-card hover:bg-accent/40 transition flex flex-col justify-between"
                  >
                    <div>
                      <h4 className="font-semibold text-base">{service.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {service.online} players online
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <Badge
                        className={`${
                          service.status === "active"
                            ? "bg-green-500 hover:bg-green-600"
                            : "bg-gray-400 hover:bg-gray-500"
                        } text-white capitalize`}
                      >
                        {service.status}
                      </Badge>
                      <Link href={`/manage/growtopia/${service.name}`}>
                        <Button
                          size="sm"
                          className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg cursor-pointer"
                        >
                          Manage
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <div className="w-6 h-6 rounded bg-gradient-to-r from-blue-400 to-blue-600"></div>
              Coming Soon..
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
    );

  };

  const APISection = () => (
    <Card>
      <CardHeader>
        <CardTitle>API Access</CardTitle>
        <CardDescription>API functionality coming soon</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">API access and documentation will be available here in the future.</p>
      </CardContent>
    </Card>
  )
  const AdminSection = () => {
    const fetchedAdminRef = useRef(false);
    interface Server {
      id: number;
      owner: string;
      name: string;
      port: number;
      game: string;
      MaxPlayer: number;
      location: string;
    }
    // --- Run Command ---
    const [command, setCommand] = useState<string>("");
    const [output, setOutput] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const runCommand = async () => {
      if (!command.trim()) return;
      setLoading(true);
      setOutput("Running...");

      try {
        const res = await fetch("https://api.xovan.fun/api/Admin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ type: "exec", param1: command }),
        });
        const data = await res.json();
        if ("error" in data) setOutput(`Error: ${data.error}`);
        else setOutput(data.output || "No output");
      } catch (err: unknown) {
        if (err instanceof Error) setOutput(`Request failed: ${err.message}`);
        else setOutput("Unknown error");
      } finally {
        setLoading(false);
      }
    };

    // --- Add Server ---
    const [server, setServer] = useState({ name: "", port: "", location: "", game: "", MaxPlayer: "", mode: "db" });
    const [serverMsg, setServerMsg] = useState<string>("");

    const addServer = async () => {
      setServerMsg("Submitting...");
      try {
        const res = await fetch("https://api.xovan.fun/api/Admin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ type: "addserver", ...server }),
        });
        const data = await res.json();
        if ("error" in data) setServerMsg(`Error: ${data.error}`);
        else {
          setServerMsg("Server added successfully!");
          setServer({ name: "", port: "", location: "", game: "", MaxPlayer: "", mode: "db" });
        }
      } catch (err: unknown) {
        if (err instanceof Error) setServerMsg(`Request failed: ${err.message}`);
        else setServerMsg("Unknown error");
      }
    };

    // --- Server Data ---
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const [servers, setServers] = useState<Server[]>([]);
    const [loadingServers, setLoadingServers] = useState<boolean>(false);

    const handleServerChange = (id: number, field: keyof Server, value: string | number) => {
      setServers(prev =>
        prev.map(s => (s.id === id ? { ...s, [field]: value } : s))
      );
    };

    const fetchServers = async () => {
      setLoadingServers(true);
      try {
        const res = await fetch("https://api.xovan.fun/api/Admin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ type: "serverdata" }),
        });
        const data = await res.json();
        if (!("error" in data)) setServers(data.servers || []);
      } catch (err: unknown) {
        console.error(err);
      } finally {
        setLoadingServers(false);
      }
    };

    useEffect(() => {
      if (fetchedAdminRef.current) return; // jangan fetch lagi
      fetchedAdminRef.current = true;
      fetchServers();
    }, []);

    const updateServer = async (srv: Server) => {
      try {
        const res = await fetch("https://api.xovan.fun/api/Admin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ type: "updateserver", param1: srv }),
        });
        const data = await res.json();
        if ("error" in data) alert(`Update failed: ${data.error}`);
        else fetchServers();
      } catch (err: unknown) {
        console.error(err);
      }
    };
    // --- Delete Server ---
    const deleteServer = async (id: number, mode : string) => {
      try {
        const res = await fetch("https://api.xovan.fun/api/Admin", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ type: "deleteserver", id, mode })
        });
        const data = await res.json();
        if (data.success) {
          setServers(servers.filter(s => s.id !== id));
        } else {
          alert(data.error || "Failed to delete");
        }
      } catch (err) {
        console.error("Delete error:", err);
      }
    };
    // --- Search Query ---
    const [searchQuery, setSearchQuery] = useState("");

    const filteredServers = servers.filter(
      (srv) =>
        srv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(srv.id).includes(searchQuery)
    );

    return (
      <Card>
        <CardHeader>
          <CardTitle>Admin Panel</CardTitle>
          <CardDescription>Restricted access (admins only)</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="exec" className="w-full">
            <TabsList>
              <TabsTrigger value="exec">Run Command</TabsTrigger>
              <TabsTrigger value="addserver">Add Server</TabsTrigger>
              <TabsTrigger value="serverdata">Server Data</TabsTrigger>
            </TabsList>

            {/* --- Run Command --- */}
            <TabsContent value="exec" className="space-y-3 mt-3">
              <Input
                placeholder="Enter command..."
                value={command}
                onChange={e => setCommand(e.target.value)}
                disabled={loading}
                className="bg-gray-900 text-white placeholder-gray-500 border-gray-700 focus:border-purple-500 focus:ring-purple-500 rounded-md"
              />

              <Button
                onClick={runCommand}
                disabled={loading || !command.trim()}
                className="bg-purple-600 hover:bg-purple-500 text-white w-full rounded-md px-4 py-2 transition-all"
              >
                {loading ? "Running..." : "Execute"}
              </Button>

              <Textarea
                value={output}
                readOnly
                className="h-48 w-full resize-none bg-gray-900 text-green-400 font-mono border border-gray-700 rounded-md p-2 overflow-y-auto"
                placeholder="Output will appear here..."
              />
            </TabsContent>

            {/* --- Add Server --- */}
            <TabsContent value="addserver" className="bg-gray-900 p-5 rounded-xl space-y-4 shadow-md">
              <h3 className="text-lg font-semibold text-white">Add New Server</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Server Name"
                  value={server.name}
                  onChange={e => setServer({ ...server, name: e.target.value })}
                  className="bg-gray-800 text-white placeholder-purple-400 border-purple-600 rounded-lg"
                />
                <Input
                  placeholder="Port"
                  value={server.port}
                  onChange={e => setServer({ ...server, port: e.target.value })}
                  className="bg-gray-800 text-white placeholder-purple-400 border-purple-600 rounded-lg"
                />
                <Input
                  placeholder="Game"
                  value={server.game}
                  onChange={e => setServer({ ...server, game: e.target.value })}
                  className="bg-gray-800 text-white placeholder-purple-400 border-purple-600 rounded-lg"
                />
                <Input
                  placeholder="MaxPlayer"
                  value={server.MaxPlayer}
                  onChange={e => setServer({ ...server, MaxPlayer: e.target.value })}
                  className="bg-gray-800 text-white placeholder-purple-400 border-purple-600 rounded-lg"
                />
                <Input
                  placeholder="Location"
                  value={server.location}
                  onChange={e => setServer({ ...server, location: e.target.value })}
                  className="bg-gray-800 text-white placeholder-purple-400 border-purple-600 rounded-lg md:col-span-2"
                />
              </div>

              {/* Mode Selector as Toggle Buttons */}
              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => setServer({ ...server, mode: "db" })}
                  className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                    server.mode === "db" ? "bg-purple-600 text-white" : "bg-gray-800 text-purple-400 hover:bg-purple-700"
                  }`}
                >
                  DB Only
                </button>
                <button
                  onClick={() => setServer({ ...server, mode: "full" })}
                  className={`flex-1 py-2 rounded-lg font-medium transition-colors ${
                    server.mode === "full" ? "bg-purple-600 text-white" : "bg-gray-800 text-purple-400 hover:bg-purple-700"
                  }`}
                >
                  Include Folder
                </button>
              </div>

              <Button
                onClick={addServer}
                className="bg-green-600 hover:bg-purple-500 text-white rounded-lg w-full px-6 py-2 mt-2"
              >
                Submit
              </Button>

              {serverMsg && <p className="text-sm text-purple-300 mt-1">{serverMsg}</p>}
            </TabsContent>
            {/* --- Server Data --- */}
            <TabsContent value="serverdata" className="space-y-3 mt-3">
              <div className="flex items-center justify-between gap-3">
                <Input
                  type="text"
                  placeholder="Search servers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-800 text-white placeholder-purple-300 border-purple-600 rounded-lg"
                />
                <Button
                  onClick={fetchServers}
                  disabled={loadingServers}
                  className="bg-purple-700 hover:bg-purple-600 text-white rounded-full p-2"
                >
                  {loadingServers ? (
                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                  ) : (
                    <RefreshCw className="w-5 h-5" />
                  )}
                </Button>
              </div>

              <div className="space-y-3 p-4 bg-gray-900 rounded-xl">
                {servers
                  .filter(
                    (srv) =>
                      srv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      String(srv.id).includes(searchQuery)
                  )
                  .map((srv) => {
                    const isOpen = expandedId === srv.id;
                    return (
                      <div
                        key={srv.id}
                        className="bg-gray-800 rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
                      >
                        {/* Header */}
                        <div
                          className={`flex items-center justify-between p-4 cursor-pointer ${
                            isOpen ? "bg-purple-700" : "bg-purple-800 hover:bg-purple-700"
                          } transition-colors`}
                          onClick={() => setExpandedId(isOpen ? null : srv.id)}
                        >
                          <div className="flex items-center gap-4 text-white">
                            <span className="font-bold">{srv.id}</span>
                            <span className="font-semibold truncate max-w-xs">
                              {srv.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            {isOpen ? (
                              <ChevronUp className="text-white w-5 h-5" />
                            ) : (
                              <ChevronDown className="text-white w-5 h-5" />
                            )}
                          </div>
                        </div>

                        {/* Dropdown Content */}
                        <div
                          className={`overflow-hidden transition-all duration-500 ${
                            isOpen ? "max-h-[1000px] p-4 space-y-3" : "max-h-0 p-0"
                          }`}
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <Input
                              value={srv.owner || ""}
                              onChange={(e) =>
                                handleServerChange(srv.id, "owner", e.target.value)
                              }
                              placeholder="Owner"
                              className="bg-gray-700 text-white placeholder-purple-300 border-purple-600 rounded-lg"
                            />
                            <Input
                              value={srv.port || ""}
                              onChange={(e) =>
                                handleServerChange(srv.id, "port", Number(e.target.value))
                              }
                              placeholder="Port"
                              className="bg-gray-700 text-white placeholder-purple-300 border-purple-600 rounded-lg"
                            />
                            <Input
                              value={srv.game || ""}
                              onChange={(e) =>
                                handleServerChange(srv.id, "game", e.target.value)
                              }
                              placeholder="Game"
                              className="bg-gray-700 text-white placeholder-purple-300 border-purple-600 rounded-lg"
                            />
                            <Input
                              value={srv.MaxPlayer || ""}
                              onChange={(e) =>
                                handleServerChange(srv.id, "MaxPlayer", e.target.value)
                              }
                              placeholder="Max Player"
                              className="bg-gray-700 text-white placeholder-purple-300 border-purple-600 rounded-lg"
                            />
                            <Input
                              value={srv.location || ""}
                              onChange={(e) =>
                                handleServerChange(srv.id, "location", e.target.value)
                              }
                              placeholder="Location"
                              className="bg-gray-700 text-white placeholder-purple-300 border-purple-600 rounded-lg"
                            />
                          </div>

                          <div className="flex flex-wrap gap-3 mt-3">
                            <Button
                              onClick={() => updateServer(srv)}
                              className="bg-green-600 hover:bg-purple-500 text-white rounded-lg"
                            >
                              Save
                            </Button>
                            <Button
                              onClick={() => deleteServer(srv.id, "db")}
                              className="bg-red-600 hover:bg-red-500 text-white rounded-lg"
                            >
                              Delete DB
                            </Button>
                            <Button
                              onClick={() => deleteServer(srv.id, "full")}
                              className="bg-red-800 hover:bg-red-500 text-white rounded-lg"
                            >
                              Delete Full
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>

              {filteredServers.length === 0 && !loadingServers && (
                <p className="text-gray-500 mt-3">No servers found</p>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
    {Auth ? 
      <LoadData />
      : failed ? 
      <Failed 
        title="Unauthorized!"
        subtitle="Please login first..."
        highlights={[
          { icon: Shield, text: "User only page", color: "text-yellow-400" },
          { icon: Shield, text: "Abuse prevent", color: "text-blue-400" }
        ]}
        MainIcon={XCircle}
      />
      : loggedOut ?
      <Failed 
          title="Logged Out"
          subtitle="Redirecting to main page...."
          highlights={[
            { icon: KeyRound, text: "Remember your password", color: "text-yellow-400" },
            { icon: Hand, text: "See you next time!", color: "text-green-400" }
          ]}
          MainIcon={DoorOpen}
        />
      : accDeleted ?
      <Failed 
          title="Account Deleted."
          subtitle="Redirecting to main page...."
          highlights={[
            { icon: Hand, text: "Bye bye.", color: "text-yellow-400" },
            { icon: Delete, text: "Action irreversible.", color: "text-red-400" }
          ]}
          MainIcon={Eraser}
        />
      :
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-gray-300">Manage your account and services</p>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:flex gap-8">
            <div className="w-64 flex-shrink-0">
              <Card>
                <CardContent className="p-4">
                  <SidebarContent />
                </CardContent>
              </Card>
            </div>
            <div className="flex-1">
              {activeSection === "user" && <UserSection />}
              {activeSection === "services" && <ServicesSection />}
              {activeSection === "api" && <APISection />}
              {activeSection === "admin" && <AdminSection />}
              <ToastContainer />
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden">
            <Tabs value={activeSection} onValueChange={setActiveSection}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="user" className="cursor-pointer">User</TabsTrigger>
                <TabsTrigger value="services" className="cursor-pointer">Services</TabsTrigger>
                <TabsTrigger value="api" className="cursor-pointer">API</TabsTrigger>
                <TabsTrigger value="admin" 
                  className={isAdmin ? "cursor-pointer" : "text-red-600"}
                  disabled={!isAdmin}
                >Admin</TabsTrigger>
              </TabsList>
              <TabsContent value="user" className="mt-6">
                <UserSection />
              </TabsContent>
              <TabsContent value="services" className="mt-6">
                <ServicesSection />
              </TabsContent>
              <TabsContent value="api" className="mt-6">
                <APISection />
              </TabsContent>
              <TabsContent value="admin" className="mt-6">
                <AdminSection />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    }
    </>
  )
}
