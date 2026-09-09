import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { 
  Users, 
  BarChart3, 
  Settings, 
  Layers, 
  TrendingUp, 
  Mail, 
  Bell, 
  Search, 
  LogOut, 
  Plus, 
  MoreVertical, 
  CheckCircle2, 
  Clock, 
  Filter, 
  Download, 
  Edit3, 
  Trash2, 
  Briefcase, 
  FileText, 
  Sparkles,
  Volume2,
  ExternalLink,
  Info
} from "lucide-react";
import { playNotificationBell } from "@/lib/sound";
import {
  getDemoRequests,
  updateDemoRequest,
  deleteDemoRequest,
  getNotifications,
  markNotificationRead,
  getJobApplications,
  deleteJobApplication,
  getPageSections,
  createPageSection,
  updatePageSection,
  deletePageSection,
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  getOpenPositions,
  createOpenPosition,
  updateOpenPosition,
  deleteOpenPosition,
  DemoRequest,
  JobApplication,
  PageSectionContent,
  Testimonial,
  OpenPosition
} from "@/lib/api";

const title = "Admin Control Center — Zenelait Infotech";
const description = "Manage live demo requests, job submissions, page section copy, testimonials, and career listings.";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: AdminDashboardPage,
});

function parseResumeInfo(app: JobApplication): {
  portfolioUrl: string;
  dataUrl: string | null;
  filename: string;
  coverNote: string;
} {
  const portfolioRaw = app.portfolio_link || '';
  const noteRaw = app.resume_note || '';
  const combined = `${portfolioRaw}\n${noteRaw}`;

  // 1. Extract Portfolio URL (http/https link not starting with data:)
  let portfolioUrl = '';
  const httpMatch = combined.match(/https?:\/\/[^\s|#\]]+/);
  if (httpMatch && !httpMatch[0].startsWith("data:")) {
    portfolioUrl = httpMatch[0];
  }

  // 2. Extract Data URL cleanly (up to #filename=, ], |, or whitespace)
  let dataUrl: string | null = null;
  const dataIdx = combined.indexOf("data:");
  if (dataIdx !== -1) {
    let rawData = combined.substring(dataIdx);
    const cutoff = rawData.search(/[#\]|\s]/);
    if (cutoff !== -1) {
      rawData = rawData.substring(0, cutoff);
    }
    dataUrl = rawData.trim();
  }

  // 3. Extract Filename
  let filename = 'Candidate_Resume.pdf';
  const fnMatch = combined.match(/#filename=([^|\s\]\n]+)/);
  if (fnMatch && fnMatch[1]) {
    try {
      filename = decodeURIComponent(fnMatch[1]);
    } catch (e) {
      filename = fnMatch[1];
    }
  } else {
    const uploadedMatch = combined.match(/Uploaded file:\s*([^\n]+)/);
    if (uploadedMatch && uploadedMatch[1]) {
      filename = uploadedMatch[1].trim();
    }
  }

  // 4. Extract Cover Note
  let coverNote = noteRaw;
  if (coverNote.includes("Note:")) {
    coverNote = coverNote.split("Note:").slice(1).join("Note:").trim();
  } else if (coverNote.includes("[RESUME_DATA:")) {
    coverNote = coverNote.replace(/\[RESUME_DATA:[^\]]+\]/, '').trim();
  }

  return { portfolioUrl, dataUrl, filename, coverNote };
}

function handleOpenResume(app: JobApplication) {
  const info = parseResumeInfo(app);
  if (info.dataUrl && info.dataUrl.startsWith("data:")) {
    try {
      const commaIdx = info.dataUrl.indexOf(",");
      if (commaIdx === -1) throw new Error("Invalid Data URL format");

      const meta = info.dataUrl.substring(0, commaIdx);
      const base64Data = (info.dataUrl.substring(commaIdx + 1).split("#")[0] || "").trim();

      const mimeMatch = meta.match(/data:(.*?);/);
      const mime: string = mimeMatch && mimeMatch[1] ? mimeMatch[1] : "application/pdf";

      const binaryString = atob(base64Data);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const blob = new Blob([bytes], { type: mime });
      const blobUrl = URL.createObjectURL(blob);

      const newWin = window.open(blobUrl, "_blank");
      if (!newWin) {
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = info.filename || "Candidate_Resume.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (err) {
      console.error("Error opening PDF blob:", err);
      if (info.portfolioUrl) {
        window.open(info.portfolioUrl, "_blank", "noopener,noreferrer");
      } else {
        alert("Unable to render PDF preview directly. Base64 string may be partial or corrupted.");
      }
    }
  } else if (info.portfolioUrl) {
    window.open(info.portfolioUrl, "_blank", "noopener,noreferrer");
  } else {
    alert(`Candidate Resume: ${info.filename}\nNo binary resume file is attached to this application.`);
  }
}

function handleDownloadResume(app: JobApplication) {
  const info = parseResumeInfo(app);
  if (info.dataUrl && info.dataUrl.startsWith("data:")) {
    try {
      const commaIdx = info.dataUrl.indexOf(",");
      if (commaIdx === -1) throw new Error("Invalid Data URL format");

      const meta = info.dataUrl.substring(0, commaIdx);
      const base64Data = (info.dataUrl.substring(commaIdx + 1).split("#")[0] || "").trim();

      const mimeMatch = meta.match(/data:(.*?);/);
      const mime: string = mimeMatch && mimeMatch[1] ? mimeMatch[1] : "application/octet-stream";

      const binaryString = atob(base64Data);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const blob = new Blob([bytes], { type: mime });
      const blobUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = info.filename || "Candidate_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => URL.revokeObjectURL(blobUrl), 10000);
    } catch (err) {
      console.error("Error downloading file blob:", err);
      alert("Failed to download file: " + (err instanceof Error ? err.message : String(err)));
    }
  } else if (info.portfolioUrl) {
    const link = document.createElement("a");
    link.href = info.portfolioUrl;
    link.download = info.filename || "Candidate_Resume.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    alert(`Candidate Resume: ${info.filename}\nNo binary file data attached to download.`);
  }
}

function AdminDashboardPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"demos" | "applications" | "home_sections" | "about_sections" | "testimonials" | "careers">("demos");

  // Live Data States
  const [demos, setDemos] = useState<DemoRequest[]>([]);
  const [jobApps, setJobApps] = useState<JobApplication[]>([]);
  const [sections, setSections] = useState<PageSectionContent[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [openPositions, setOpenPositions] = useState<OpenPosition[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [notifications, setNotificationsList] = useState<DemoRequest[]>([]);
  const [showNotifMenu, setShowNotifMenu] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Modal / Form States
  const [viewAppModal, setViewAppModal] = useState<JobApplication | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<Partial<Testimonial> | null>(null);
  const [editingPosition, setEditingPosition] = useState<Partial<OpenPosition> | null>(null);
  const [reqInputText, setReqInputText] = useState<string>("");

  const openEditPositionModal = (pos: Partial<OpenPosition> | null) => {
    setEditingPosition(pos);
    if (pos) {
      const reqs = pos.requirements;
      setReqInputText(Array.isArray(reqs) ? reqs.join(', ') : (reqs || ''));
    } else {
      setReqInputText('');
    }
  };

  // Fetch initial dynamic content
  const loadData = async () => {
    try {
      setLoading(true);
      const [demoData, notifData, appData, sectionData, testimonialData, positionData] = await Promise.all([
        getDemoRequests().catch(() => []),
        getNotifications().catch(() => ({ count: 0, notifications: [] })),
        getJobApplications().catch(() => []),
        getPageSections().catch(() => []),
        getTestimonials().catch(() => []),
        getOpenPositions().catch(() => [])
      ]);

      setDemos(demoData);
      setUnreadCount(notifData.count);
      setNotificationsList(notifData.notifications);
      setJobApps(appData);
      setSections(sectionData);
      setTestimonials(testimonialData);
      setOpenPositions(positionData);
    } catch (e) {
      console.error("Failed to load admin data:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // Poll for new notifications every 15 seconds
    const interval = setInterval(async () => {
      try {
        const notifData = await getNotifications();
        if (notifData.count > unreadCount) {
          playNotificationBell();
        }
        setUnreadCount(notifData.count);
        setNotificationsList(notifData.notifications);
      } catch (e) {}
    }, 15000);
    return () => clearInterval(interval);
  }, [unreadCount]);

  const triggerBellSound = () => {
    playNotificationBell();
    setShowNotifMenu(!showNotifMenu);
  };

  const handleMarkRead = async (id: number) => {
    await markNotificationRead(id);
    setUnreadCount(prev => Math.max(0, prev - 1));
    setNotificationsList(prev => prev.filter(n => n.id !== id));
  };

  // Search terms
  const [demoSearch, setDemoSearch] = useState<string>("");
  const [appSearch, setAppSearch] = useState<string>("");

  const handleUpdateDemoStatus = async (id: number, status: string) => {
    try {
      await updateDemoRequest(id, { status });
      setDemos(prev => prev.map(d => d.id === id ? { ...d, status } : d));
    } catch (e) {
      alert("Failed to update status");
    }
  };

  const handleDeleteDemo = async (id: number) => {
    if (!confirm("Are you sure you want to delete this demo request?")) return;
    try {
      await deleteDemoRequest(id);
      setDemos(prev => prev.filter(d => d.id !== id));
      setNotificationsList(prev => prev.filter(n => n.id !== id));
    } catch (e) {
      alert("Failed to delete demo request");
    }
  };

  const handleDeleteApp = async (id: number) => {
    if (!confirm("Are you sure you want to delete this job application?")) return;
    try {
      await deleteJobApplication(id);
      setJobApps(prev => prev.filter(a => a.id !== id));
    } catch (e) {
      alert("Failed to delete job application");
    }
  };

  // Testimonial Save/Delete
  const handleSaveTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTestimonial) return;
    try {
      if (editingTestimonial.id) {
        await updateTestimonial(editingTestimonial.id, editingTestimonial);
      } else {
        await createTestimonial(editingTestimonial);
      }
      setEditingTestimonial(null);
      loadData();
      alert("Testimonial saved successfully!");
    } catch (err) {
      alert("Error saving testimonial");
    }
  };

  const handleDeleteTestimonial = async (id: number) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    await deleteTestimonial(id);
    loadData();
  };

  // Open Position Save/Delete
  const handleSavePosition = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPosition) return;
    try {
      const parsedReqs = reqInputText.split(',').map(s => s.trim()).filter(Boolean);
      const payload = { ...editingPosition, requirements: parsedReqs };
      if (payload.id) {
        await updateOpenPosition(payload.id, payload);
      } else {
        await createOpenPosition(payload);
      }
      setEditingPosition(null);
      setReqInputText('');
      loadData();
      alert("Career position saved successfully!");
    } catch (err) {
      alert("Error saving position");
    }
  };

  const handleDeletePosition = async (id: number) => {
    if (!confirm("Are you sure you want to delete this job listing?")) return;
    await deleteOpenPosition(id);
    loadData();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b090c] text-slate-900 dark:text-slate-100 font-['Outfit',sans-serif] flex flex-col">
      
      {/* Navbar Header */}
      <header className="sticky top-0 z-30 border-b border-slate-200 dark:border-slate-800/80 bg-white/90 dark:bg-[#120f14]/90 backdrop-blur-xl px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs">
        
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="size-9 shrink-0">
              <img src="/logo.png" alt="Zenelait Infotech" className="size-full object-contain" />
            </div>
            <div>
              <span className="text-base font-black tracking-tight text-slate-900 dark:text-white group-hover:text-[#ff2a38] transition-colors">
                Zenelait Admin
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#ff2a38] block -mt-1">
                Chennai, Tamil Nadu
              </span>
            </div>
          </Link>
        </div>

        {/* Search, Notifications & Profile */}
        <div className="flex items-center gap-3 sm:gap-5 relative">
          
          {/* Bell Notification Button */}
          <div className="relative">
            <button 
              onClick={triggerBellSound}
              title="Notifications"
              className="relative p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-rose-400 transition-colors cursor-pointer active:scale-95"
            >
              <Bell className="size-4 text-slate-700 dark:text-slate-200" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 size-2.5 rounded-full bg-[#ff2a38] animate-pulse" />
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifMenu && (
              <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-2xl z-50">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <Bell className="size-4 text-[#ff2a38]" />
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      Notifications ({unreadCount})
                    </span>
                  </div>
                  {notifications.length > 0 && (
                    <button 
                      onClick={async () => {
                        for (const n of notifications) {
                          if (n.id) await markNotificationRead(n.id);
                        }
                        setUnreadCount(0);
                        setNotificationsList([]);
                      }}
                      className="text-[11px] font-bold text-[#ff2a38] hover:underline"
                    >
                      Clear All / Mark Read
                    </button>
                  )}
                </div>

                <div className="max-h-72 overflow-y-auto space-y-2.5">
                  {notifications.length === 0 ? (
                    <p className="text-xs text-slate-400 text-center py-4">No unread notifications.</p>
                  ) : (
                    notifications.map(n => (
                      <div key={n.id} className="p-3 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-slate-900 dark:text-white">{n.name}</span>
                          <span className="text-[10px] text-slate-400">{n.phone}</span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 text-[11px]">{n.service}</p>
                        <button 
                          onClick={() => handleMarkRead(n.id!)}
                          className="text-[10px] font-bold text-[#ff2a38] hover:underline pt-1 block"
                        >
                          Mark as read
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800" />

          {/* User & Logout */}
          <div className="flex items-center gap-3">
            <div className="size-9 rounded-xl bg-gradient-to-tr from-[#ff2a38] to-rose-600 flex items-center justify-center font-bold text-white shadow-xs">
              A
            </div>
            <button 
              onClick={() => navigate({ to: "/login" })}
              title="Logout"
              className="p-2 rounded-xl text-slate-400 hover:text-[#ff2a38] hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
            >
              <LogOut className="size-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 border-r border-slate-200 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/40 p-4 space-y-6 shrink-0">
          <div className="space-y-1">
            <p className="px-3 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
              Data Management
            </p>

            <button 
              onClick={() => setActiveTab("demos")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "demos" ? "bg-[#ff2a38] text-white shadow-md" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
              }`}
            >
              <div className="flex items-center gap-3">
                <Mail className="size-4" />
                <span>Demo Requests</span>
              </div>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-100 dark:bg-rose-950 text-[#ff2a38] border border-rose-300">
                  {unreadCount}
                </span>
              )}
            </button>

            <button 
              onClick={() => setActiveTab("applications")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "applications" ? "bg-[#ff2a38] text-white shadow-md" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
              }`}
            >
              <FileText className="size-4" />
              <span>Open Position Applications</span>
            </button>

            <button 
              onClick={() => setActiveTab("home_sections")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "home_sections" ? "bg-[#ff2a38] text-white shadow-md" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
              }`}
            >
              <Edit3 className="size-4" />
              <span>Home Page Sections</span>
            </button>

            <button 
              onClick={() => setActiveTab("about_sections")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "about_sections" ? "bg-[#ff2a38] text-white shadow-md" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
              }`}
            >
              <Info className="size-4" />
              <span>About Us Page Sections</span>
            </button>

            <button 
              onClick={() => setActiveTab("testimonials")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "testimonials" ? "bg-[#ff2a38] text-white shadow-md" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
              }`}
            >
              <Sparkles className="size-4" />
              <span>Testimonials (CRUD)</span>
            </button>

            <button 
              onClick={() => setActiveTab("careers")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "careers" ? "bg-[#ff2a38] text-white shadow-md" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
              }`}
            >
              <Briefcase className="size-4" />
              <span>Open Positions (CRUD)</span>
            </button>
          </div>
        </aside>

        {/* Content Pane */}
        <main className="flex-1 p-4 sm:p-8 space-y-6 max-w-7xl">
          
          {/* TAB 1: Demo Requests */}
          {activeTab === "demos" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Demo Requests</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Live requests submitted through website forms</p>
                </div>
                
                {/* Search Bar */}
                <div className="relative w-full sm:w-72">
                  <Search className="absolute left-3 top-2.5 size-4 text-slate-400" />
                  <input 
                    type="text"
                    placeholder="Search by name, email, phone, service..."
                    value={demoSearch}
                    onChange={(e) => setDemoSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-[#ff2a38]"
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 overflow-x-auto shadow-2xs">
                {demos.length === 0 ? (
                  <div className="text-center py-12 px-4 space-y-2">
                    <Mail className="size-8 text-slate-300 dark:text-slate-600 mx-auto" />
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No Demo Requests Yet</p>
                    <p className="text-xs text-slate-400">When users submit a request on any service or product page, it will automatically appear here in real-time.</p>
                  </div>
                ) : (
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 uppercase font-black text-slate-400 text-[10px]">
                        <th className="py-3 px-4">Name</th>
                        <th className="py-3 px-4">Email</th>
                        <th className="py-3 px-4">Phone</th>
                        <th className="py-3 px-4">Requested Service</th>
                        <th className="py-3 px-4">Status (Editable)</th>
                        <th className="py-3 px-4">Submitted At</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                      {demos
                        .filter(d => {
                          if (!demoSearch) return true;
                          const q = demoSearch.toLowerCase();
                          return d.name?.toLowerCase().includes(q) ||
                            d.email?.toLowerCase().includes(q) ||
                            d.phone?.toLowerCase().includes(q) ||
                            d.service?.toLowerCase().includes(q) ||
                            d.company?.toLowerCase().includes(q);
                        })
                        .map(d => (
                          <tr key={d.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                            <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">
                              {d.name}
                              {d.company && <span className="block text-[10px] text-slate-400 font-normal">{d.company}</span>}
                            </td>
                            <td className="py-3.5 px-4">{d.email}</td>
                            <td className="py-3.5 px-4 font-semibold text-[#ff2a38]">{d.phone}</td>
                            <td className="py-3.5 px-4">{d.service}</td>
                            <td className="py-3.5 px-4">
                              <select
                                value={d.status || "Pending"}
                                onChange={(e) => handleUpdateDemoStatus(d.id!, e.target.value)}
                                className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#ff2a38]"
                              >
                                <option value="Pending">Pending</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Contacted">Contacted</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </td>
                            <td className="py-3.5 px-4 text-slate-400">{d.created_at ? new Date(d.created_at).toLocaleString() : 'Just now'}</td>
                            <td className="py-3.5 px-4 text-right">
                              <button
                                onClick={() => handleDeleteDemo(d.id!)}
                                title="Delete Demo Request"
                                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                              >
                                <Trash2 className="size-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: Open Positions Submitted Data */}
          {activeTab === "applications" && (
            <div className="space-y-4">
              <div className="flex flex-col gap-3">
                <div>
                  <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Submitted Job Applications</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Applications received for open career positions</p>
                </div>

                {/* Search Bar */}
                <div className="relative w-full max-w-md">
                  <Search className="absolute left-3 top-2.5 size-4 text-slate-400" />
                  <input 
                    type="text"
                    placeholder="Search by applicant, job title, email..."
                    value={appSearch}
                    onChange={(e) => setAppSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:border-[#ff2a38]"
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 overflow-x-auto shadow-2xs">
                {jobApps.length === 0 ? (
                  <div className="text-center py-12 px-4 space-y-2">
                    <FileText className="size-8 text-slate-300 dark:text-slate-600 mx-auto" />
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No Applications Submitted Yet</p>
                    <p className="text-xs text-slate-400">When candidates apply for open career positions, their submissions will appear here.</p>
                  </div>
                ) : (
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 uppercase font-black text-slate-400 text-[10px]">
                        <th className="py-3 px-4">Applicant</th>
                        <th className="py-3 px-4">Applied Position</th>
                        <th className="py-3 px-4">Email</th>
                        <th className="py-3 px-4">Phone</th>
                        <th className="py-3 px-4">Experience</th>
                        <th className="py-3 px-4">Resume / Portfolio</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                      {jobApps
                        .filter(a => {
                          if (!appSearch) return true;
                          const q = appSearch.toLowerCase();
                          return a.applicant_name?.toLowerCase().includes(q) ||
                            a.job_title?.toLowerCase().includes(q) ||
                            a.email?.toLowerCase().includes(q) ||
                            a.phone?.toLowerCase().includes(q);
                        })
                        .map(a => (
                          <tr key={a.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                            <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">{a.applicant_name}</td>
                            <td className="py-3.5 px-4 font-semibold text-[#ff2a38]">{a.job_title}</td>
                            <td className="py-3.5 px-4">{a.email}</td>
                            <td className="py-3.5 px-4">{a.phone}</td>
                            <td className="py-3.5 px-4">{a.experience}</td>
                            <td className="py-3.5 px-4">
                              {(() => {
                                const info = parseResumeInfo(a);
                                return (
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() => setViewAppModal(a)}
                                      className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-[#ff2a38] hover:text-white transition-colors cursor-pointer"
                                    >
                                      View Details
                                    </button>

                                    <button
                                      onClick={() => handleOpenResume(a)}
                                      className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/10 text-[#ff2a38] hover:bg-[#ff2a38] hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
                                      title="Preview Uploaded Resume"
                                    >
                                      <FileText className="size-3" />
                                      <span>Resume PDF</span>
                                    </button>

                                    {info.portfolioUrl ? (
                                      <a 
                                        href={info.portfolioUrl} 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="text-blue-500 font-bold hover:underline text-[11px]"
                                      >
                                        Portfolio ↗
                                      </a>
                                    ) : null}
                                  </div>
                                );
                              })()}
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => setViewAppModal(a)}
                                  title="View Full Application & Resume"
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                >
                                  <FileText className="size-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteApp(a.id!)}
                                  title="Delete Job Application"
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                                >
                                  <Trash2 className="size-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          )}



          {/* TAB 3: Home Page Sections Editor */}
          {activeTab === "home_sections" && (
            <HomePageSectionsAdminSubtab 
              sections={sections} 
              loadData={loadData}
            />
          )}

          {/* TAB 3.5: About Us Page Sections Editor */}
          {activeTab === "about_sections" && (
            <AboutUsPageSectionsAdminSubtab 
              sections={sections} 
              loadData={loadData}
            />
          )}

          {/* TAB 4: Testimonials CRUD */}
          {activeTab === "testimonials" && (
            <TestimonialsAdminSubtab 
              testimonials={testimonials} 
              setEditingTestimonial={setEditingTestimonial}
              handleDeleteTestimonial={handleDeleteTestimonial}
            />
          )}

          {/* TAB 5: Open Positions CRUD */}
          {activeTab === "careers" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Manage Open Positions</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Create, edit, or delete career listings synced directly to the Careers page</p>
                </div>
                <button 
                  onClick={() => openEditPositionModal({ title: '', department: 'Engineering & Systems', location: 'Chennai HQ', type: 'Full-time', experience: '2+ Years', description: '', requirements: [], is_active: true })}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#ff2a38] text-white text-xs font-bold shadow-xs hover:bg-rose-600 transition-colors"
                >
                  <Plus className="size-4" />
                  <span>New Open Position</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {openPositions.length === 0 ? (
                  <div className="col-span-full py-12 text-center text-slate-400 text-xs">
                    No open positions created yet. Click "New Open Position" to add one!
                  </div>
                ) : (
                  openPositions.map(p => (
                    <div key={p.id} className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 space-y-3 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md bg-rose-50 text-[#ff2a38] dark:bg-rose-950 border border-rose-200 dark:border-rose-900">
                          {p.department}
                        </span>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={async () => {
                              await updateOpenPosition(p.id!, { is_active: !p.is_active });
                              loadData();
                            }}
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              p.is_active ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400" : "bg-slate-100 text-slate-500 dark:bg-slate-800"
                            }`}
                          >
                            {p.is_active ? "Active" : "Inactive"}
                          </button>
                          <button onClick={() => openEditPositionModal(p)} className="text-[#94a3b8] hover:text-slate-900 dark:hover:text-white">
                            <Edit3 className="size-4" />
                          </button>
                          <button onClick={() => handleDeletePosition(p.id!)} className="text-slate-400 hover:text-rose-500">
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">{p.title}</h3>
                      <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500 font-semibold">
                        <span>📍 {p.location}</span>
                        <span>💼 {p.type}</span>
                        <span>⏱️ {p.experience}</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">{p.description}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

        </main>
      </div>



      {/* Edit Testimonial Modal */}
      {editingTestimonial && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{editingTestimonial.id ? 'Edit Testimonial' : 'Add Testimonial'}</h3>
            <form onSubmit={handleSaveTestimonial} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Page Placement</label>
                <select 
                  value={editingTestimonial.page || 'home'} 
                  onChange={e => setEditingTestimonial({...editingTestimonial, page: e.target.value as any})}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-slate-900 dark:text-white"
                >
                  <option value="home">Home Page</option>
                  <option value="it_products">IT Product Page</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Author Name</label>
                  <input 
                    type="text" 
                    required
                    value={editingTestimonial.author || ''} 
                    onChange={e => setEditingTestimonial({...editingTestimonial, author: e.target.value})}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-slate-900 dark:text-white"
                    placeholder="e.g. Anita Sundaram"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Role Title</label>
                  <input 
                    type="text" 
                    required
                    value={editingTestimonial.role || ''} 
                    onChange={e => setEditingTestimonial({...editingTestimonial, role: e.target.value})}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-slate-900 dark:text-white"
                    placeholder="e.g. Head of Marketing"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Company / Organization</label>
                  <input 
                    type="text" 
                    value={editingTestimonial.company || ''} 
                    onChange={e => setEditingTestimonial({...editingTestimonial, company: e.target.value})}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-slate-900 dark:text-white"
                    placeholder="e.g. Vanguard Retail Systems"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Rating (1 to 5 Stars)</label>
                  <input 
                    type="number" 
                    min={1}
                    max={5}
                    value={editingTestimonial.rating ?? 5} 
                    onChange={e => setEditingTestimonial({...editingTestimonial, rating: parseInt(e.target.value) || 5})}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-slate-900 dark:text-white font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Impact Badge / Metric Tag</label>
                  <input 
                    type="text" 
                    value={editingTestimonial.metric || ''} 
                    onChange={e => setEditingTestimonial({...editingTestimonial, metric: e.target.value})}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-slate-900 dark:text-white"
                    placeholder="e.g. Verified Client Impact"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Category / Practice Tag</label>
                  <input 
                    type="text" 
                    value={editingTestimonial.industry || ''} 
                    onChange={e => setEditingTestimonial({...editingTestimonial, industry: e.target.value})}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-slate-900 dark:text-white"
                    placeholder="e.g. Growth & Engineering"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Testimonial Quote Content</label>
                <textarea 
                  rows={3}
                  required
                  value={editingTestimonial.content || ''} 
                  onChange={e => setEditingTestimonial({...editingTestimonial, content: e.target.value})}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-slate-900 dark:text-white"
                  placeholder="Enter quote content..."
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setEditingTestimonial(null)} className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 font-bold">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-[#ff2a38] text-white font-bold">Save Testimonial</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Open Position Modal */}
      {editingPosition && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">{editingPosition.id ? 'Edit Open Position' : 'New Open Position'}</h3>
            <form onSubmit={handleSavePosition} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Job Title</label>
                <input 
                  type="text" 
                  required
                  value={editingPosition.title || ''} 
                  onChange={e => setEditingPosition({...editingPosition, title: e.target.value})}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-slate-900 dark:text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Department</label>
                  <select
                    value={editingPosition.department || 'Engineering & Systems'}
                    onChange={e => setEditingPosition({...editingPosition, department: e.target.value})}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-slate-900 dark:text-white"
                  >
                    <option value="Engineering & Systems">Engineering & Systems</option>
                    <option value="Product & AI">Product & AI</option>
                    <option value="Creative & Design">Creative & Design</option>
                    <option value="Growth & Marketing">Growth & Marketing</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Experience</label>
                  <input 
                    type="text" 
                    required
                    value={editingPosition.experience || ''} 
                    onChange={e => setEditingPosition({...editingPosition, experience: e.target.value})}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-slate-900 dark:text-white"
                    placeholder="e.g. 2+ Years"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Location</label>
                  <input 
                    type="text" 
                    required
                    value={editingPosition.location || ''} 
                    onChange={e => setEditingPosition({...editingPosition, location: e.target.value})}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-slate-900 dark:text-white"
                    placeholder="e.g. Chennai HQ / Remote"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Role Type</label>
                  <input 
                    type="text" 
                    required
                    value={editingPosition.type || ''} 
                    onChange={e => setEditingPosition({...editingPosition, type: e.target.value})}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-slate-900 dark:text-white"
                    placeholder="e.g. Full-time / Lead Role"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Description</label>
                <textarea 
                  rows={2}
                  required
                  value={editingPosition.description || ''} 
                  onChange={e => setEditingPosition({...editingPosition, description: e.target.value})}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Key Requirements (comma-separated)</label>
                <input 
                  type="text" 
                  value={reqInputText} 
                  onChange={e => setReqInputText(e.target.value)}
                  placeholder="React/TypeScript, Django REST API, Cloud Deployment"
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="is_active_check"
                  checked={editingPosition.is_active ?? true}
                  onChange={e => setEditingPosition({...editingPosition, is_active: e.target.checked})}
                  className="size-4 rounded accent-[#ff2a38]"
                />
                <label htmlFor="is_active_check" className="font-bold text-slate-700 dark:text-slate-300">
                  Active Listing (Visible on Careers Page)
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => { setEditingPosition(null); setReqInputText(''); }} className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-[#ff2a38] text-white font-bold">Save Position</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Job Application Modal */}
      {viewAppModal && (() => {
        const info = parseResumeInfo(viewAppModal);
        return (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="w-full max-w-xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#ff2a38]">Job Application Details</span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{viewAppModal.applicant_name}</h3>
                </div>
                <button 
                  onClick={() => setViewAppModal(null)} 
                  className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-900 dark:hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-100 dark:border-slate-800">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Applied Position</span>
                    <span className="font-bold text-[#ff2a38] text-sm">{viewAppModal.job_title}</span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Submitted At</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      {viewAppModal.submitted_at ? new Date(viewAppModal.submitted_at).toLocaleString() : 'Recent'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Email Address</span>
                    <a href={`mailto:${viewAppModal.email}`} className="font-semibold text-slate-900 dark:text-white hover:underline">{viewAppModal.email}</a>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Phone Number</span>
                    <a href={`tel:${viewAppModal.phone}`} className="font-semibold text-[#ff2a38] hover:underline">{viewAppModal.phone}</a>
                  </div>
                </div>

                {info.portfolioUrl && (
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Portfolio / GitHub / LinkedIn</span>
                    <a 
                      href={info.portfolioUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline mt-0.5"
                    >
                      <ExternalLink className="size-3.5" />
                      <span>{info.portfolioUrl}</span>
                    </a>
                  </div>
                )}

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Uploaded Resume / Document</span>
                  <div className="p-3.5 rounded-xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/50 mt-1 flex flex-col gap-2.5">
                    <div className="font-bold text-slate-800 dark:text-slate-200 text-xs break-all">
                      📄 {info.filename}
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => handleOpenResume(viewAppModal)}
                        className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[#ff2a38] text-white hover:bg-rose-600 transition-colors flex items-center gap-1.5 shadow-sm shadow-rose-500/20 cursor-pointer"
                      >
                        <ExternalLink className="size-3.5" />
                        View PDF / Resume
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDownloadResume(viewAppModal)}
                        className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-slate-900 text-white dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Download className="size-3.5 text-emerald-400" />
                        Download File
                      </button>
                    </div>
                  </div>
                </div>

                {info.coverNote && (
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Cover Note / Introduction</span>
                    <p className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-300 mt-1 whitespace-pre-wrap">
                      {info.coverNote}
                    </p>
                  </div>
                )}

                <div className="flex justify-end gap-2 pt-3">
                  <button 
                    type="button" 
                    onClick={() => handleDeleteApp(viewAppModal.id!)} 
                    className="px-4 py-2 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-[#ff2a38] border border-rose-200 dark:border-rose-900 font-bold hover:bg-rose-500 hover:text-white transition-colors"
                  >
                    Delete Application
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setViewAppModal(null)} 
                    className="px-5 py-2 rounded-xl bg-[#ff2a38] text-white font-bold"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

    </div>
  );
}

function TestimonialsAdminSubtab({
  testimonials,
  setEditingTestimonial,
  handleDeleteTestimonial
}: {
  testimonials: Testimonial[];
  setEditingTestimonial: (t: Partial<Testimonial> | null) => void;
  handleDeleteTestimonial: (id: number) => void;
}) {
  const [filterPage, setFilterPage] = useState<"all" | "home" | "it_products">("all");

  const filtered = testimonials.filter(t => {
    if (filterPage === "all") return true;
    return t.page === filterPage;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Manage Testimonials</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">CRUD client testimonials displayed strictly separated on Home and IT Product pages</p>
        </div>
        <button 
          onClick={() => setEditingTestimonial({ page: filterPage === 'it_products' ? 'it_products' : 'home', author: '', role: '', company: '', content: '', rating: 5 })}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#ff2a38] text-white text-xs font-bold shadow-xs hover:bg-rose-600 transition-colors self-start sm:self-auto"
        >
          <Plus className="size-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Page Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button 
          onClick={() => setFilterPage("all")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            filterPage === "all" ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900" : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          All Pages ({testimonials.length})
        </button>
        <button 
          onClick={() => setFilterPage("home")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            filterPage === "home" ? "bg-[#ff2a38] text-white" : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          Home Page Only ({testimonials.filter(t => t.page === 'home').length})
        </button>
        <button 
          onClick={() => setFilterPage("it_products")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            filterPage === "it_products" ? "bg-[#ff2a38] text-white" : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          IT Product Page Only ({testimonials.filter(t => t.page === 'it_products').length})
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.length === 0 ? (
          <p className="text-xs text-slate-400 py-6">No testimonials found for this page scope.</p>
        ) : (
          filtered.map(t => (
            <div key={t.id} className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 space-y-3 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-md ${
                  t.page === 'home' ? 'bg-rose-100 text-[#ff2a38] dark:bg-rose-950' : 'bg-indigo-100 text-indigo-600 dark:bg-indigo-950'
                }`}>
                  {t.page === 'home' ? 'Home Page' : 'IT Product Page'}
                </span>
                <div className="flex items-center gap-2">
                  <button onClick={() => setEditingTestimonial(t)} className="text-slate-400 hover:text-slate-900 dark:hover:text-white">
                    <Edit3 className="size-4" />
                  </button>
                  <button onClick={() => handleDeleteTestimonial(t.id!)} className="text-slate-400 hover:text-rose-500">
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
              <p className="text-xs italic text-slate-700 dark:text-slate-300">"{t.content}"</p>
              <div className="pt-1 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">{t.author}</p>
                  <p className="text-[10px] text-slate-500 font-semibold">{t.role} {t.company ? `• ${t.company}` : ''}</p>
                </div>
                {t.industry && (
                  <span className="text-[10px] font-bold text-rose-500 bg-rose-50 dark:bg-rose-950 px-2 py-0.5 rounded-full border border-rose-100 dark:border-rose-900">
                    {t.industry}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function HomePageSectionsAdminSubtab({
  sections,
  loadData
}: {
  sections: PageSectionContent[];
  loadData: () => void;
}) {
  const introSec = sections.find(s => s.section_key === 'home_intro');
  const statsSec = sections.find(s => s.section_key === 'home_stats');

  // Intro State
  const [introActive, setIntroActive] = useState<boolean>(introSec?.extra_json?.is_active ?? true);
  const [introBadge, setIntroBadge] = useState<string>(introSec?.subtitle || introSec?.extra_json?.badge || "WHO WE ARE");
  const [introTitle, setIntroTitle] = useState<string>(introSec?.title || "We Engineer Software & Scale Growth Under One Unified Umbrella");
  const [introBody, setIntroBody] = useState<string>(introSec?.body || "Zenelait Infotech bridges the gap between technology engineering and market acquisition. Where traditional agencies treat software build and marketing as separate silos, we integrate code, architecture, design, and growth strategy into one accountable delivery machine.");
  const [sub1Title, setSub1Title] = useState<string>(introSec?.extra_json?.subCard1Title || "In-House Engineering");
  const [sub1Desc, setSub1Desc] = useState<string>(introSec?.extra_json?.subCard1Desc || "Custom CRM, ERP, LMS & AI built directly by our core software team.");
  const [sub2Title, setSub2Title] = useState<string>(introSec?.extra_json?.subCard2Title || "Data-Driven Growth");
  const [sub2Desc, setSub2Desc] = useState<string>(introSec?.extra_json?.subCard2Desc || "SEO, paid ads, content & branding engineered for ROI.");

  // Stats State
  const initialStats = Array.isArray(statsSec?.extra_json?.stats) 
    ? statsSec!.extra_json.stats 
    : (Array.isArray(statsSec?.extra_json) ? statsSec!.extra_json : [
        { value: "16+", label: "Products & Services" },
        { value: "2", label: "Practices: IT & Growth" },
        { value: "100%", label: "In-house Delivery" },
        { value: "24/7", label: "Support Coverage" }
      ]);

  const [statsActive, setStatsActive] = useState<boolean>(statsSec?.extra_json?.is_active ?? true);
  const [statsTitle, setStatsTitle] = useState<string>(statsSec?.title || "Platform Growth Metrics");
  const [statsList, setStatsList] = useState<{ value: string; label: string }[]>(initialStats);

  // Sync state if API sections update
  useEffect(() => {
    if (introSec) {
      setIntroActive(introSec.extra_json?.is_active ?? true);
      setIntroBadge(introSec.subtitle || introSec.extra_json?.badge || "WHO WE ARE");
      setIntroTitle(introSec.title || "We Engineer Software & Scale Growth Under One Unified Umbrella");
      setIntroBody(introSec.body || "Zenelait Infotech bridges the gap between technology engineering and market acquisition. Where traditional agencies treat software build and marketing as separate silos, we integrate code, architecture, design, and growth strategy into one accountable delivery machine.");
      setSub1Title(introSec.extra_json?.subCard1Title || "In-House Engineering");
      setSub1Desc(introSec.extra_json?.subCard1Desc || "Custom CRM, ERP, LMS & AI built directly by our core software team.");
      setSub2Title(introSec.extra_json?.subCard2Title || "Data-Driven Growth");
      setSub2Desc(introSec.extra_json?.subCard2Desc || "SEO, paid ads, content & branding engineered for ROI.");
    }
    if (statsSec) {
      setStatsActive(statsSec.extra_json?.is_active ?? true);
      setStatsTitle(statsSec.title || "Platform Growth Metrics");
      const list = Array.isArray(statsSec.extra_json?.stats) ? statsSec.extra_json.stats : (Array.isArray(statsSec.extra_json) ? statsSec.extra_json : null);
      if (list) setStatsList(list);
    }
  }, [sections]);

  // Save Intro Handler
  const handleSaveIntro = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Partial<PageSectionContent> = {
      section_key: 'home_intro',
      title: introTitle,
      subtitle: introBadge,
      body: introBody,
      extra_json: {
        badge: introBadge,
        subCard1Title: sub1Title,
        subCard1Desc: sub1Desc,
        subCard2Title: sub2Title,
        subCard2Desc: sub2Desc,
        is_active: introActive,
      }
    };
    try {
      try {
        await updatePageSection('home_intro', payload);
      } catch {
        await createPageSection(payload);
      }
      loadData();
      alert("Creative Introduction Section updated & synced to Home page!");
    } catch (err) {
      alert("Error saving section content");
    }
  };

  // Delete / Clear Intro Handler
  const handleDeleteIntro = async () => {
    if (!confirm("Are you sure you want to delete the Creative Company Introduction Section from the Home page?")) return;
    try {
      try {
        await deletePageSection('home_intro');
      } catch {
        await updatePageSection('home_intro', {
          section_key: 'home_intro',
          title: '',
          body: '',
          extra_json: { is_active: false }
        });
      }
      setIntroActive(false);
      loadData();
      alert("Creative Introduction Section deleted!");
    } catch (err) {
      alert("Error deleting section");
    }
  };

  // Save Stats Handler
  const handleSaveStats = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Partial<PageSectionContent> = {
      section_key: 'home_stats',
      title: statsTitle,
      subtitle: 'Platform Growth Metrics',
      body: 'Metrics tracked across live client systems.',
      extra_json: {
        stats: statsList,
        is_active: statsActive,
      }
    };
    try {
      try {
        await updatePageSection('home_stats', payload);
      } catch {
        await createPageSection(payload);
      }
      loadData();
      alert("Animated Stats Section updated & synced to Home page!");
    } catch (err) {
      alert("Error saving stats content");
    }
  };

  // Delete Stats Handler
  const handleDeleteStats = async () => {
    if (!confirm("Are you sure you want to delete the Animated Stats Section from the Home page?")) return;
    try {
      try {
        await deletePageSection('home_stats');
      } catch {
        await updatePageSection('home_stats', {
          section_key: 'home_stats',
          title: '',
          body: '',
          extra_json: { stats: [], is_active: false }
        });
      }
      setStatsActive(false);
      loadData();
      alert("Animated Stats Section deleted!");
    } catch (err) {
      alert("Error deleting section");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Home Page Sections Editor</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">Edit content or delete/hide sections on the Home page in real-time</p>
      </div>

      {/* SECTION 1: Creative Company Introduction Section */}
      <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 space-y-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 gap-3">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#ff2a38] px-2.5 py-1 rounded-md bg-rose-50 dark:bg-rose-950 border border-rose-200 dark:border-rose-900">
              Creative Company Introduction Section
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">Section 1: Who We Are</h3>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="intro_active_check" 
                checked={introActive} 
                onChange={e => setIntroActive(e.target.checked)}
                className="size-4 accent-[#ff2a38] rounded cursor-pointer"
              />
              <label htmlFor="intro_active_check" className="text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                Section Visible on Home Page
              </label>
            </div>

            <button
              type="button"
              onClick={handleDeleteIntro}
              className="px-3 py-1.5 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/40 text-xs font-bold text-[#ff2a38] hover:bg-rose-500 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="size-3.5" />
              <span>Delete Section</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSaveIntro} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Badge / Tagline Pill Text</label>
              <input 
                type="text" 
                required
                value={introBadge} 
                onChange={e => setIntroBadge(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-slate-900 dark:text-white font-semibold"
                placeholder="e.g. WHO WE ARE"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Main Headline</label>
              <input 
                type="text" 
                required
                value={introTitle} 
                onChange={e => setIntroTitle(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-slate-900 dark:text-white font-bold"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Introduction Body Paragraph</label>
            <textarea 
              rows={3}
              required
              value={introBody} 
              onChange={e => setIntroBody(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 space-y-2">
              <span className="text-[10px] font-bold uppercase text-[#ff2a38]">Sub Card 1 (Engineering)</span>
              <div>
                <label className="font-semibold text-slate-600 dark:text-slate-400 block mb-1">Title</label>
                <input 
                  type="text" 
                  value={sub1Title} 
                  onChange={e => setSub1Title(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2.5 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-600 dark:text-slate-400 block mb-1">Description</label>
                <textarea 
                  rows={2}
                  value={sub1Desc} 
                  onChange={e => setSub1Desc(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2.5 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 space-y-2">
              <span className="text-[10px] font-bold uppercase text-[#ff2a38]">Sub Card 2 (Growth)</span>
              <div>
                <label className="font-semibold text-slate-600 dark:text-slate-400 block mb-1">Title</label>
                <input 
                  type="text" 
                  value={sub2Title} 
                  onChange={e => setSub2Title(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2.5 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="font-semibold text-slate-600 dark:text-slate-400 block mb-1">Description</label>
                <textarea 
                  rows={2}
                  value={sub2Desc} 
                  onChange={e => setSub2Desc(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2.5 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button type="submit" className="px-6 py-2.5 rounded-xl bg-[#ff2a38] text-white font-bold text-xs hover:bg-rose-600 transition-colors shadow-md">
              Save Creative Intro Section
            </button>
          </div>
        </form>
      </div>

      {/* SECTION 2: Animated Stats Section */}
      <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 space-y-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 gap-3">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-900">
              Animated Counter Metrics
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">Section 2: Animated Stats Bar</h3>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="stats_active_check" 
                checked={statsActive} 
                onChange={e => setStatsActive(e.target.checked)}
                className="size-4 accent-[#ff2a38] rounded cursor-pointer"
              />
              <label htmlFor="stats_active_check" className="text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                Section Visible on Home Page
              </label>
            </div>

            <button
              type="button"
              onClick={handleDeleteStats}
              className="px-3 py-1.5 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/40 text-xs font-bold text-[#ff2a38] hover:bg-rose-500 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="size-3.5" />
              <span>Delete Section</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSaveStats} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Section Internal Title</label>
            <input 
              type="text" 
              value={statsTitle} 
              onChange={e => setStatsTitle(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-slate-900 dark:text-white font-bold"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="font-bold text-slate-700 dark:text-slate-300">Animated Stat Items</label>
              <button 
                type="button"
                onClick={() => setStatsList([...statsList, { value: "100+", label: "New Metric" }])}
                className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-1 hover:bg-[#ff2a38] hover:text-white transition-colors"
              >
                <Plus className="size-3.5" />
                <span>Add Stat Metric</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {statsList.map((st, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 flex items-center gap-3">
                  <div className="w-28 shrink-0">
                    <label className="text-[10px] font-bold text-slate-400 block">Value / Counter</label>
                    <input 
                      type="text" 
                      value={st.value} 
                      onChange={e => {
                        const updated = [...statsList];
                        if (updated[idx]) {
                          updated[idx] = { ...updated[idx], value: e.target.value };
                          setStatsList(updated);
                        }
                      }}
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 text-slate-900 dark:text-white font-black text-center"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <label className="text-[10px] font-bold text-slate-400 block">Label Description</label>
                    <input 
                      type="text" 
                      value={st.label} 
                      onChange={e => {
                        const updated = [...statsList];
                        if (updated[idx]) {
                          updated[idx] = { ...updated[idx], label: e.target.value };
                          setStatsList(updated);
                        }
                      }}
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 text-slate-900 dark:text-white font-semibold"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => setStatsList(statsList.filter((_, i) => i !== idx))}
                    className="p-2 text-slate-400 hover:text-rose-500 self-end"
                    title="Delete Metric"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button type="submit" className="px-6 py-2.5 rounded-xl bg-[#ff2a38] text-white font-bold text-xs hover:bg-rose-600 transition-colors shadow-md">
              Save Animated Stats Section
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AboutUsPageSectionsAdminSubtab({
  sections,
  loadData
}: {
  sections: PageSectionContent[];
  loadData: () => void;
}) {
  const whoSec = sections.find(s => s.section_key === 'about_who_we_are');
  const misSec = sections.find(s => s.section_key === 'about_mission');
  const visSec = sections.find(s => s.section_key === 'about_vision');
  const valSec = sections.find(s => s.section_key === 'about_values');

  // Who We Are State
  const [whoActive, setWhoActive] = useState<boolean>(whoSec?.extra_json?.is_active ?? true);
  const [whoBadge, setWhoBadge] = useState<string>(whoSec?.subtitle || whoSec?.extra_json?.badge || "WHO WE ARE");
  const [whoHeaderTitle, setWhoHeaderTitle] = useState<string>(whoSec?.extra_json?.headerTitle || "Who We Are & What We Stand For");
  const [whoHeaderSub, setWhoHeaderSub] = useState<string>(whoSec?.extra_json?.headerSub || "Innovation-driven. People-focused. Built for a smarter tomorrow.");
  const [whoTitle, setWhoTitle] = useState<string>(whoSec?.title || "IT Products & Digital Growth");
  const [whoBody1, setWhoBody1] = useState<string>(whoSec?.body || "Zenelait Infotech is a leading technology and growth enterprise headquartered in India, bringing the gap between high-precision software engineering and data-driven marketing execution.");
  const [whoBody2, setWhoBody2] = useState<string>(whoSec?.extra_json?.body2 || "We empower companies with production-ready software systems — from custom ERP, ERP, and LMS platforms to performance advertising, technical search strategy, and 4K media production.");
  const [sub1Title, setSub1Title] = useState<string>(whoSec?.extra_json?.subCard1Title || "In-House IT Engineering");
  const [sub1Desc, setSub1Desc] = useState<string>(whoSec?.extra_json?.subCard1Desc || "Developing robust, scalable, and customized software solutions.");
  const [sub2Title, setSub2Title] = useState<string>(whoSec?.extra_json?.subCard2Title || "Data-Driven Campaigns");
  const [sub2Desc, setSub2Desc] = useState<string>(whoSec?.extra_json?.subCard2Desc || "Performance-led strategies for measurable business growth.");

  // Mission Vision Creed State
  const [mvActive, setMvActive] = useState<boolean>(misSec?.extra_json?.is_active ?? visSec?.extra_json?.is_active ?? valSec?.extra_json?.is_active ?? true);
  const [mvHeaderTitle, setMvHeaderTitle] = useState<string>(misSec?.extra_json?.mvHeaderTitle || "Mission, Vision & Engineering Creed");
  const [mvHeaderSub, setMvHeaderSub] = useState<string>(misSec?.extra_json?.mvHeaderSub || "The innovative architectural principles driving our software engineering and digital growth matrices.");

  const [missionTitle, setMissionTitle] = useState<string>(misSec?.title || "MISSION");
  const [missionBody, setMissionBody] = useState<string>(misSec?.body || "To architect scalable, high-performance digital matrices that empower global enterprises through precision software engineering and data-driven growth.");

  const [visionTitle, setVisionTitle] = useState<string>(visSec?.title || "VISION");
  const [visionBody, setVisionBody] = useState<string>(visSec?.body || "To set the absolute global standard for immersive, highly kinetic web applications, intelligent automation, and transformative digital experiences.");

  const [valuesTitle, setValuesTitle] = useState<string>(valSec?.title || "PRODUCT VALUES");
  const [valuesBody, setValuesBody] = useState<string>(valSec?.body || "Engineered with bulletproof safety, high concurrency, clean procedural pipelines, and high-fidelity aesthetics across every system.");

  // Sync state if API sections update
  useEffect(() => {
    if (whoSec) {
      setWhoActive(whoSec.extra_json?.is_active ?? true);
      setWhoBadge(whoSec.subtitle || whoSec.extra_json?.badge || "WHO WE ARE");
      setWhoHeaderTitle(whoSec.extra_json?.headerTitle || "Who We Are & What We Stand For");
      setWhoHeaderSub(whoSec.extra_json?.headerSub || "Innovation-driven. People-focused. Built for a smarter tomorrow.");
      setWhoTitle(whoSec.title || "IT Products & Digital Growth");
      setWhoBody1(whoSec.body || "Zenelait Infotech is a leading technology and growth enterprise headquartered in India, bringing the gap between high-precision software engineering and data-driven marketing execution.");
      setWhoBody2(whoSec.extra_json?.body2 || "We empower companies with production-ready software systems — from custom ERP, ERP, and LMS platforms to performance advertising, technical search strategy, and 4K media production.");
      setSub1Title(whoSec.extra_json?.subCard1Title || "In-House IT Engineering");
      setSub1Desc(whoSec.extra_json?.subCard1Desc || "Developing robust, scalable, and customized software solutions.");
      setSub2Title(whoSec.extra_json?.subCard2Title || "Data-Driven Campaigns");
      setSub2Desc(whoSec.extra_json?.subCard2Desc || "Performance-led strategies for measurable business growth.");
    }

    if (misSec || visSec || valSec) {
      setMvActive(misSec?.extra_json?.is_active ?? visSec?.extra_json?.is_active ?? valSec?.extra_json?.is_active ?? true);
      if (misSec) {
        setMvHeaderTitle(misSec.extra_json?.mvHeaderTitle || "Mission, Vision & Engineering Creed");
        setMvHeaderSub(misSec.extra_json?.mvHeaderSub || "The innovative architectural principles driving our software engineering and digital growth matrices.");
        setMissionTitle(misSec.title || "MISSION");
        setMissionBody(misSec.body || "To architect scalable, high-performance digital matrices that empower global enterprises through precision software engineering and data-driven growth.");
      }
      if (visSec) {
        setVisionTitle(visSec.title || "VISION");
        setVisionBody(visSec.body || "To set the absolute global standard for immersive, highly kinetic web applications, intelligent automation, and transformative digital experiences.");
      }
      if (valSec) {
        setValuesTitle(valSec.title || "PRODUCT VALUES");
        setValuesBody(valSec.body || "Engineered with bulletproof safety, high concurrency, clean procedural pipelines, and high-fidelity aesthetics across every system.");
      }
    }
  }, [sections]);

  // Save Who We Are Handler
  const handleSaveWhoWeAre = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Partial<PageSectionContent> = {
      section_key: 'about_who_we_are',
      title: whoTitle,
      subtitle: whoBadge,
      body: whoBody1,
      extra_json: {
        badge: whoBadge,
        headerTitle: whoHeaderTitle,
        headerSub: whoHeaderSub,
        body2: whoBody2,
        subCard1Title: sub1Title,
        subCard1Desc: sub1Desc,
        subCard2Title: sub2Title,
        subCard2Desc: sub2Desc,
        is_active: whoActive,
      }
    };
    try {
      try {
        await updatePageSection('about_who_we_are', payload);
      } catch {
        await createPageSection(payload);
      }
      loadData();
      alert("Who We Are & What We Stand For Section updated & synced to About Us page!");
    } catch (err) {
      alert("Error saving Who We Are section content");
    }
  };

  // Delete Who We Are Handler
  const handleDeleteWhoWeAre = async () => {
    if (!confirm("Are you sure you want to delete / hide the Who We Are Section from the About Us page?")) return;
    try {
      try {
        await deletePageSection('about_who_we_are');
      } catch {
        await updatePageSection('about_who_we_are', {
          section_key: 'about_who_we_are',
          title: '',
          body: '',
          extra_json: { is_active: false }
        });
      }
      setWhoActive(false);
      loadData();
      alert("Who We Are Section deleted!");
    } catch (err) {
      alert("Error deleting section");
    }
  };

  // Save Mission, Vision & Values Handler
  const handleSaveMissionVision = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const misPayload: Partial<PageSectionContent> = {
        section_key: 'about_mission',
        title: missionTitle,
        subtitle: 'Core Operational Pillars',
        body: missionBody,
        extra_json: {
          mvHeaderTitle,
          mvHeaderSub,
          is_active: mvActive,
        }
      };

      const visPayload: Partial<PageSectionContent> = {
        section_key: 'about_vision',
        title: visionTitle,
        subtitle: 'Core Operational Pillars',
        body: visionBody,
        extra_json: {
          is_active: mvActive,
        }
      };

      const valPayload: Partial<PageSectionContent> = {
        section_key: 'about_values',
        title: valuesTitle,
        subtitle: 'Core Operational Pillars',
        body: valuesBody,
        extra_json: {
          is_active: mvActive,
        }
      };

      try { await updatePageSection('about_mission', misPayload); } catch { await createPageSection(misPayload); }
      try { await updatePageSection('about_vision', visPayload); } catch { await createPageSection(visPayload); }
      try { await updatePageSection('about_values', valPayload); } catch { await createPageSection(valPayload); }

      loadData();
      alert("Mission, Vision & Product Values Section updated & synced to About Us page!");
    } catch (err) {
      alert("Error saving Mission, Vision & Values content");
    }
  };

  // Delete Mission, Vision & Values Handler
  const handleDeleteMissionVision = async () => {
    if (!confirm("Are you sure you want to delete / hide the Mission, Vision & Product Values Section from the About Us page?")) return;
    try {
      await Promise.all([
        deletePageSection('about_mission').catch(() => updatePageSection('about_mission', { section_key: 'about_mission', title: '', body: '', extra_json: { is_active: false } })),
        deletePageSection('about_vision').catch(() => updatePageSection('about_vision', { section_key: 'about_vision', title: '', body: '', extra_json: { is_active: false } })),
        deletePageSection('about_values').catch(() => updatePageSection('about_values', { section_key: 'about_values', title: '', body: '', extra_json: { is_active: false } })),
      ]);
      setMvActive(false);
      loadData();
      alert("Mission, Vision & Product Values Section deleted!");
    } catch (err) {
      alert("Error deleting section");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">About Us Page Sections Editor</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">Edit content or delete/hide sections on the About Us page in real-time</p>
      </div>

      {/* SECTION 1: Who We Are & What We Stand For Section */}
      <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 space-y-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 gap-3">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#ff2a38] px-2.5 py-1 rounded-md bg-rose-50 dark:bg-rose-950 border border-rose-200 dark:border-rose-900">
              Company Background & Sub-Cards
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">Section 1: Who We Are & What We Stand For</h3>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="who_active_check" 
                checked={whoActive} 
                onChange={e => setWhoActive(e.target.checked)}
                className="size-4 accent-[#ff2a38] rounded cursor-pointer"
              />
              <label htmlFor="who_active_check" className="text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                Section Visible on About Us Page
              </label>
            </div>

            <button
              type="button"
              onClick={handleDeleteWhoWeAre}
              className="px-3 py-1.5 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/40 text-xs font-bold text-[#ff2a38] hover:bg-rose-500 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="size-3.5" />
              <span>Delete Section</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSaveWhoWeAre} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Badge Tag</label>
              <input 
                type="text" 
                value={whoBadge} 
                onChange={e => setWhoBadge(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-slate-900 dark:text-white font-bold"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Main Header Title</label>
              <input 
                type="text" 
                value={whoHeaderTitle} 
                onChange={e => setWhoHeaderTitle(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-slate-900 dark:text-white font-bold"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Main Header Subtitle</label>
            <input 
              type="text" 
              value={whoHeaderSub} 
              onChange={e => setWhoHeaderSub(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-slate-900 dark:text-white font-medium"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Right Card Main Headline</label>
            <input 
              type="text" 
              value={whoTitle} 
              onChange={e => setWhoTitle(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-slate-900 dark:text-white font-black"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Primary Description Paragraph</label>
              <textarea 
                rows={3}
                value={whoBody1} 
                onChange={e => setWhoBody1(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-slate-900 dark:text-white font-medium"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Secondary Description Paragraph</label>
              <textarea 
                rows={3}
                value={whoBody2} 
                onChange={e => setWhoBody2(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-slate-900 dark:text-white font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
            {/* Sub-Card 1 */}
            <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-[10px] font-extrabold uppercase text-[#ff2a38]">Sub-Card 1 (Engineering)</span>
              <input 
                type="text" 
                value={sub1Title} 
                onChange={e => setSub1Title(e.target.value)}
                placeholder="Sub Card 1 Title"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2.5 text-slate-900 dark:text-white font-bold"
              />
              <textarea 
                rows={2}
                value={sub1Desc} 
                onChange={e => setSub1Desc(e.target.value)}
                placeholder="Sub Card 1 Description"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2.5 text-slate-900 dark:text-white font-normal"
              />
            </div>

            {/* Sub-Card 2 */}
            <div className="p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2">
              <span className="text-[10px] font-extrabold uppercase text-[#ff2a38]">Sub-Card 2 (Campaigns)</span>
              <input 
                type="text" 
                value={sub2Title} 
                onChange={e => setSub2Title(e.target.value)}
                placeholder="Sub Card 2 Title"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2.5 text-slate-900 dark:text-white font-bold"
              />
              <textarea 
                rows={2}
                value={sub2Desc} 
                onChange={e => setSub2Desc(e.target.value)}
                placeholder="Sub Card 2 Description"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2.5 text-slate-900 dark:text-white font-normal"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button type="submit" className="px-6 py-2.5 rounded-xl bg-[#ff2a38] text-white font-bold text-xs hover:bg-rose-600 transition-colors shadow-md">
              Save Who We Are Section
            </button>
          </div>
        </form>
      </div>

      {/* SECTION 2: Mission, Vision & Product Values Section */}
      <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 space-y-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 gap-3">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600 px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-900">
              3 Capsule Pillar Cards
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">Section 2: Mission, Vision & Product Values</h3>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <input 
                type="checkbox" 
                id="mv_active_check" 
                checked={mvActive} 
                onChange={e => setMvActive(e.target.checked)}
                className="size-4 accent-[#ff2a38] rounded cursor-pointer"
              />
              <label htmlFor="mv_active_check" className="text-xs font-bold text-slate-700 dark:text-slate-300 cursor-pointer">
                Section Visible on About Us Page
              </label>
            </div>

            <button
              type="button"
              onClick={handleDeleteMissionVision}
              className="px-3 py-1.5 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/40 text-xs font-bold text-[#ff2a38] hover:bg-rose-500 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="size-3.5" />
              <span>Delete Section</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSaveMissionVision} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Section Heading Title</label>
              <input 
                type="text" 
                value={mvHeaderTitle} 
                onChange={e => setMvHeaderTitle(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-slate-900 dark:text-white font-bold"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Section Subtitle Description</label>
              <input 
                type="text" 
                value={mvHeaderSub} 
                onChange={e => setMvHeaderSub(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-slate-900 dark:text-white font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
            {/* Card 1: MISSION */}
            <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 space-y-2">
              <span className="text-[10px] font-extrabold uppercase text-rose-600">Card 1: MISSION</span>
              <input 
                type="text" 
                value={missionTitle} 
                onChange={e => setMissionTitle(e.target.value)}
                placeholder="Mission Title"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2.5 text-slate-900 dark:text-white font-bold"
              />
              <textarea 
                rows={4}
                value={missionBody} 
                onChange={e => setMissionBody(e.target.value)}
                placeholder="Mission Description"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2.5 text-slate-900 dark:text-white font-normal"
              />
            </div>

            {/* Card 2: VISION */}
            <div className="p-4 rounded-2xl bg-sky-50/50 dark:bg-sky-950/20 border border-sky-200 dark:border-sky-900/40 space-y-2">
              <span className="text-[10px] font-extrabold uppercase text-sky-600">Card 2: VISION</span>
              <input 
                type="text" 
                value={visionTitle} 
                onChange={e => setVisionTitle(e.target.value)}
                placeholder="Vision Title"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2.5 text-slate-900 dark:text-white font-bold"
              />
              <textarea 
                rows={4}
                value={visionBody} 
                onChange={e => setVisionBody(e.target.value)}
                placeholder="Vision Description"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2.5 text-slate-900 dark:text-white font-normal"
              />
            </div>

            {/* Card 3: VALUES */}
            <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 space-y-2">
              <span className="text-[10px] font-extrabold uppercase text-emerald-600">Card 3: PRODUCT VALUES</span>
              <input 
                type="text" 
                value={valuesTitle} 
                onChange={e => setValuesTitle(e.target.value)}
                placeholder="Values Title"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2.5 text-slate-900 dark:text-white font-bold"
              />
              <textarea 
                rows={4}
                value={valuesBody} 
                onChange={e => setValuesBody(e.target.value)}
                placeholder="Values Description"
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2.5 text-slate-900 dark:text-white font-normal"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button type="submit" className="px-6 py-2.5 rounded-xl bg-[#ff2a38] text-white font-bold text-xs hover:bg-rose-600 transition-colors shadow-md">
              Save Mission, Vision & Product Values Section
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


