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
  ExternalLink
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
  updatePageSection,
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
  const [activeTab, setActiveTab] = useState<"demos" | "applications" | "page_content" | "testimonials" | "careers">("demos");

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
  const [editingSection, setEditingSection] = useState<PageSectionContent | null>(null);
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

  // Section Save Handler
  const handleSaveSection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSection) return;
    try {
      await updatePageSection(editingSection.section_key, editingSection);
      setEditingSection(null);
      loadData();
      alert("Page section updated successfully!");
    } catch (err) {
      alert("Error saving section content");
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
                Django & MySQL Backend
              </span>
            </div>
          </Link>
        </div>

        {/* Search, Notifications & Profile */}
        <div className="flex items-center gap-3 sm:gap-5 relative">
          
          {/* Bell Notification Button */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifMenu(!showNotifMenu)}
              title="Notifications"
              className="relative p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <Bell className="size-4" />
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
              onClick={() => setActiveTab("page_content")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "page_content" ? "bg-[#ff2a38] text-white shadow-md" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
              }`}
            >
              <Edit3 className="size-4" />
              <span>Page Sections (Home & About)</span>
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

          {/* TAB 3: Edit Page Sections */}
          {activeTab === "page_content" && (
            <PageSectionsAdminSubtab 
              sections={sections} 
              setEditingSection={setEditingSection} 
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

      {/* Edit Section Modal */}
      {editingSection && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Edit {editingSection.section_key}</h3>
            <form onSubmit={handleSaveSection} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Title</label>
                <input 
                  type="text" 
                  value={editingSection.title} 
                  onChange={e => setEditingSection({...editingSection, title: e.target.value})}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Subtitle</label>
                <input 
                  type="text" 
                  value={editingSection.subtitle || ''} 
                  onChange={e => setEditingSection({...editingSection, subtitle: e.target.value})}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Body Content</label>
                <textarea 
                  rows={4}
                  value={editingSection.body} 
                  onChange={e => setEditingSection({...editingSection, body: e.target.value})}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-slate-900 dark:text-white"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setEditingSection(null)} className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300">Cancel</button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-[#ff2a38] text-white font-bold">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

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
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Role & Company</label>
                  <input 
                    type="text" 
                    required
                    value={editingTestimonial.role || ''} 
                    onChange={e => setEditingTestimonial({...editingTestimonial, role: e.target.value})}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Testimonial Content</label>
                <textarea 
                  rows={3}
                  required
                  value={editingTestimonial.content || ''} 
                  onChange={e => setEditingTestimonial({...editingTestimonial, content: e.target.value})}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-slate-900 dark:text-white"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setEditingTestimonial(null)} className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300">Cancel</button>
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
              <div className="pt-1">
                <p className="text-xs font-bold text-slate-900 dark:text-white">{t.author}</p>
                <p className="text-[10px] text-slate-500">{t.role} • {t.company}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function PageSectionsAdminSubtab({
  sections,
  setEditingSection
}: {
  sections: PageSectionContent[];
  setEditingSection: (s: PageSectionContent) => void;
}) {
  const [selectedPage, setSelectedPage] = useState<"home" | "about">("home");

  const homeKeys = ["home_intro", "home_stats"];
  const aboutKeys = ["about_who_we_are", "about_mission", "about_vision", "about_values"];

  const filteredSections = sections.filter(s => {
    if (selectedPage === "home") return homeKeys.includes(s.section_key);
    return aboutKeys.includes(s.section_key);
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Page Sections Copy Editor</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Edit titles, subtitles, and body text strictly separated by page</p>
        </div>
      </div>

      {/* Page Selector Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button 
          onClick={() => setSelectedPage("home")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            selectedPage === "home" ? "bg-[#ff2a38] text-white shadow-sm" : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          Home Page Sections ({sections.filter(s => homeKeys.includes(s.section_key)).length})
        </button>
        <button 
          onClick={() => setSelectedPage("about")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            selectedPage === "about" ? "bg-[#ff2a38] text-white shadow-sm" : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          About Us Page Sections ({sections.filter(s => aboutKeys.includes(s.section_key)).length})
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSections.length === 0 ? (
          <p className="text-xs text-slate-400 py-6">No page sections found for this page.</p>
        ) : (
          filteredSections.map(s => (
            <div key={s.id} className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 space-y-3 shadow-2xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-[#ff2a38] tracking-widest px-2.5 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950 border border-rose-200 dark:border-rose-900">
                  {s.section_key}
                </span>
                <button 
                  onClick={() => setEditingSection(s)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-[#ff2a38] hover:text-white transition-colors"
                >
                  <Edit3 className="size-3.5" />
                  <span>Edit Content</span>
                </button>
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{s.title}</h3>
              {s.subtitle && <p className="text-xs font-semibold text-[#ff2a38]">{s.subtitle}</p>}
              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3">{s.body}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
