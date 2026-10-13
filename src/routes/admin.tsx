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
  Info,
  Calculator,
  BookOpen,
  Upload,
  FileUp,
  HelpCircle
} from "lucide-react";
import { 
  DEFAULT_ESTIMATOR_CONFIG, 
  EstimatorConfig, 
  OptionItem, 
  FeatureItem, 
  TimelineItem 
} from "@/components/ProjectCostEstimator";
import {
  ResourceGuide,
  RESOURCE_GUIDES
} from "@/components/KnowledgeHubDownloadCenter";
import {
  FAQItem,
  DEFAULT_FAQS
} from "@/components/FAQSection";
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
  const [activeTab, setActiveTab] = useState<"demos" | "applications" | "home_sections" | "about_sections" | "testimonials" | "careers" | "estimator" | "knowledge_hub" | "faqs">("demos");

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

            <button 
              onClick={() => setActiveTab("estimator")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "estimator" ? "bg-[#ff2a38] text-white shadow-md" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
              }`}
            >
              <Calculator className="size-4" />
              <span>Project Estimator (CRUD)</span>
            </button>

            <button 
              onClick={() => setActiveTab("knowledge_hub")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "knowledge_hub" ? "bg-[#ff2a38] text-white shadow-md" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
              }`}
            >
              <BookOpen className="size-4" />
              <span>Knowledge Hub (CRUD)</span>
            </button>

            <button 
              onClick={() => setActiveTab("faqs")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === "faqs" ? "bg-[#ff2a38] text-white shadow-md" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
              }`}
            >
              <HelpCircle className="size-4" />
              <span>FAQs (CRUD)</span>
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

          {/* TAB 6: Project Estimator Calculator CRUD */}
          {activeTab === "estimator" && (
            <ProjectEstimatorAdminSubtab 
              sections={sections} 
              loadData={loadData}
            />
          )}

          {/* TAB 7: Knowledge Hub & Downloadable Guides CRUD */}
          {activeTab === "knowledge_hub" && (
            <KnowledgeHubAdminSubtab 
              sections={sections} 
              loadData={loadData}
            />
          )}

          {/* TAB 8: Frequently Asked Questions (FAQs) CRUD */}
          {activeTab === "faqs" && (
            <FAQAdminSubtab 
              sections={sections} 
              loadData={loadData}
            />
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

function ProjectEstimatorAdminSubtab({
  sections,
  loadData,
}: {
  sections: PageSectionContent[];
  loadData: () => void;
}) {
  const calcSec = sections.find((s) => s.section_key === "home_calculator");

  // Load existing configuration or defaults
  const initialConfig: EstimatorConfig = calcSec?.extra_json
    ? {
        badge: calcSec.subtitle || calcSec.extra_json.badge || DEFAULT_ESTIMATOR_CONFIG.badge,
        title: calcSec.title || DEFAULT_ESTIMATOR_CONFIG.title,
        subtitle: calcSec.body || calcSec.extra_json.subtitle || DEFAULT_ESTIMATOR_CONFIG.subtitle,
        ctaText: calcSec.extra_json.ctaText || DEFAULT_ESTIMATOR_CONFIG.ctaText,
        warrantyText: calcSec.extra_json.warrantyText || DEFAULT_ESTIMATOR_CONFIG.warrantyText,
        currency: calcSec.extra_json.currency || DEFAULT_ESTIMATOR_CONFIG.currency,
        is_active: calcSec.extra_json.is_active !== false,
        categories: Array.isArray(calcSec.extra_json.categories) && calcSec.extra_json.categories.length > 0 
          ? calcSec.extra_json.categories 
          : DEFAULT_ESTIMATOR_CONFIG.categories,
        featuresMap: calcSec.extra_json.featuresMap && Object.keys(calcSec.extra_json.featuresMap).length > 0 
          ? calcSec.extra_json.featuresMap 
          : DEFAULT_ESTIMATOR_CONFIG.featuresMap,
        timelines: Array.isArray(calcSec.extra_json.timelines) && calcSec.extra_json.timelines.length > 0 
          ? calcSec.extra_json.timelines 
          : DEFAULT_ESTIMATOR_CONFIG.timelines,
      }
    : DEFAULT_ESTIMATOR_CONFIG;

  const [isActive, setIsActive] = useState<boolean>(initialConfig.is_active);
  const [badge, setBadge] = useState<string>(initialConfig.badge);
  const [title, setTitle] = useState<string>(initialConfig.title);
  const [subtitle, setSubtitle] = useState<string>(initialConfig.subtitle);
  const [ctaText, setCtaText] = useState<string>(initialConfig.ctaText);
  const [warrantyText, setWarrantyText] = useState<string>(initialConfig.warrantyText);
  const [currency, setCurrency] = useState<string>(initialConfig.currency || "INR");
  const [categories, setCategories] = useState<OptionItem[]>(initialConfig.categories);
  const [featuresMap, setFeaturesMap] = useState<Record<string, FeatureItem[]>>(initialConfig.featuresMap);
  const [timelines, setTimelines] = useState<TimelineItem[]>(initialConfig.timelines);

  // Selected category for editing features
  const [activeCategoryTab, setActiveCategoryTab] = useState<string>(
    initialConfig.categories[0]?.id || "web-saas"
  );

  // Sync state if server updates
  useEffect(() => {
    if (calcSec?.extra_json) {
      const ej = calcSec.extra_json;
      setIsActive(ej.is_active !== false);
      setBadge(calcSec.subtitle || ej.badge || DEFAULT_ESTIMATOR_CONFIG.badge);
      setTitle(calcSec.title || DEFAULT_ESTIMATOR_CONFIG.title);
      setSubtitle(calcSec.body || ej.subtitle || DEFAULT_ESTIMATOR_CONFIG.subtitle);
      setCtaText(ej.ctaText || DEFAULT_ESTIMATOR_CONFIG.ctaText);
      setWarrantyText(ej.warrantyText || DEFAULT_ESTIMATOR_CONFIG.warrantyText);
      setCurrency(ej.currency || DEFAULT_ESTIMATOR_CONFIG.currency || "INR");
      if (Array.isArray(ej.categories) && ej.categories.length > 0) setCategories(ej.categories);
      if (ej.featuresMap && Object.keys(ej.featuresMap).length > 0) setFeaturesMap(ej.featuresMap);
      if (Array.isArray(ej.timelines) && ej.timelines.length > 0) setTimelines(ej.timelines);
    }
  }, [sections]);

  // Save all calculator configuration
  const handleSaveCalculator = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: Partial<PageSectionContent> = {
      section_key: "home_calculator",
      title: title,
      subtitle: badge,
      body: subtitle,
      extra_json: {
        is_active: isActive,
        badge,
        subtitle,
        ctaText,
        warrantyText,
        currency,
        categories,
        featuresMap,
        timelines,
      },
    };

    try {
      try {
        await updatePageSection("home_calculator", payload);
      } catch {
        await createPageSection(payload);
      }
      loadData();
      alert("Project Cost Estimator & Scope Calculator updated successfully!");
    } catch (err) {
      console.error("Error saving calculator:", err);
      alert("Failed to save calculator configuration.");
    }
  };

  // Reset to initial factory defaults
  const handleResetToDefaults = () => {
    if (confirm("Reset all project estimator categories, pricing, and features to factory defaults?")) {
      setIsActive(DEFAULT_ESTIMATOR_CONFIG.is_active);
      setBadge(DEFAULT_ESTIMATOR_CONFIG.badge);
      setTitle(DEFAULT_ESTIMATOR_CONFIG.title);
      setSubtitle(DEFAULT_ESTIMATOR_CONFIG.subtitle);
      setCtaText(DEFAULT_ESTIMATOR_CONFIG.ctaText);
      setWarrantyText(DEFAULT_ESTIMATOR_CONFIG.warrantyText);
      setCurrency(DEFAULT_ESTIMATOR_CONFIG.currency || "INR");
      setCategories(DEFAULT_ESTIMATOR_CONFIG.categories);
      setFeaturesMap(DEFAULT_ESTIMATOR_CONFIG.featuresMap);
      setTimelines(DEFAULT_ESTIMATOR_CONFIG.timelines);
      if (DEFAULT_ESTIMATOR_CONFIG.categories[0]) {
        setActiveCategoryTab(DEFAULT_ESTIMATOR_CONFIG.categories[0].id);
      }
    }
  };

  // Category CRUD
  const handleAddCategory = () => {
    const newId = `service-${Date.now()}`;
    const newCat: OptionItem = {
      id: newId,
      name: "New Service / Architecture",
      desc: "Comprehensive custom engineering solution and architecture build.",
      iconName: "Globe",
      baseDays: 14,
    };
    setCategories([...categories, newCat]);
    setFeaturesMap({
      ...featuresMap,
      [newId]: [
        { id: `feat-${Date.now()}-1`, name: "Core Architecture Setup", days: 5 },
        { id: `feat-${Date.now()}-2`, name: "Testing & QA Automation", days: 3 },
      ],
    });
    setActiveCategoryTab(newId);
  };

  const handleDeleteCategory = (catId: string) => {
    if (categories.length <= 1) {
      alert("You must keep at least 1 category.");
      return;
    }
    if (confirm("Delete this category and its associated add-on modules?")) {
      const remaining = categories.filter((c) => c.id !== catId);
      setCategories(remaining);
      const updatedMap = { ...featuresMap };
      delete updatedMap[catId];
      setFeaturesMap(updatedMap);
      if (activeCategoryTab === catId && remaining[0]) {
        setActiveCategoryTab(remaining[0].id);
      }
    }
  };

  // Feature Add / Delete for active category
  const handleAddFeature = () => {
    const newFeat: FeatureItem = {
      id: `feat-${Date.now()}`,
      name: "New Deliverable Module",
      days: 4,
    };
    const currentFeats = featuresMap[activeCategoryTab] || [];
    setFeaturesMap({
      ...featuresMap,
      [activeCategoryTab]: [...currentFeats, newFeat],
    });
  };

  const handleDeleteFeature = (featId: string) => {
    const currentFeats = featuresMap[activeCategoryTab] || [];
    setFeaturesMap({
      ...featuresMap,
      [activeCategoryTab]: currentFeats.filter((f) => f.id !== featId),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Project Delivery & Timeline Blueprint (CRUD)
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-rose-100 text-[#ff2a38] dark:bg-rose-950 border border-rose-300">
              Live Interactive Tool
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage engineering sprint durations, delivery timelines, architecture categories, and modular deliverables for the live calculator
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleResetToDefaults}
            className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Reset Defaults
          </button>
        </div>
      </div>

      <form onSubmit={handleSaveCalculator} className="space-y-6 text-xs">
        {/* Section Visibility & General Content */}
        <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Calculator className="size-4 text-[#ff2a38]" />
              <span>General Settings & Copy</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Badge Tagline</label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2.5 font-semibold text-slate-900 dark:text-white"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Section Headline</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2.5 font-bold text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Subtitle / Subtext</label>
            <textarea
              rows={2}
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2.5 text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">CTA Button Text</label>
              <input
                type="text"
                value={ctaText}
                onChange={(e) => setCtaText(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2.5 font-bold text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Warranty Badge / SLA Text</label>
              <input
                type="text"
                value={warrantyText}
                onChange={(e) => setWarrantyText(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2.5 font-semibold text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Categories (Step 1) CRUD */}
        <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <span className="size-5 rounded-full bg-[#ff2a38] text-white flex items-center justify-center text-[10px] font-black">1</span>
                <span>Product & Service Categories ({categories.length})</span>
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Each category defines the baseline development timeline in working days
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddCategory}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#ff2a38] text-white font-bold hover:bg-rose-600 transition-colors cursor-pointer"
            >
              <Plus className="size-3.5" />
              <span>Add Category</span>
            </button>
          </div>

          <div className="space-y-4">
            {categories.map((cat, idx) => (
              <div
                key={cat.id}
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#ff2a38] bg-rose-50 dark:bg-rose-950 px-2 py-0.5 rounded border border-rose-200 dark:border-rose-900">
                    Category #{idx + 1}: {cat.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDeleteCategory(cat.id)}
                    className="p-1 text-slate-400 hover:text-rose-500 transition-colors"
                    title="Delete Category"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="text-[10px] font-bold text-slate-500 block mb-1">Category Name</label>
                    <input
                      type="text"
                      value={cat.name}
                      onChange={(e) => {
                        const updated = [...categories];
                        const item = updated[idx];
                        if (item) {
                          updated[idx] = { ...item, name: e.target.value };
                          setCategories(updated);
                        }
                      }}
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 font-bold text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 block mb-1">Base Timeline (Working Days)</label>
                    <input
                      type="number"
                      value={cat.baseDays}
                      onChange={(e) => {
                        const updated = [...categories];
                        const item = updated[idx];
                        if (item) {
                          updated[idx] = { ...item, baseDays: Number(e.target.value) };
                          setCategories(updated);
                        }
                      }}
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 font-bold text-slate-900 dark:text-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 block mb-1">Short Description</label>
                  <input
                    type="text"
                    value={cat.desc}
                    onChange={(e) => {
                      const updated = [...categories];
                      const item = updated[idx];
                      if (item) {
                        updated[idx] = { ...item, desc: e.target.value };
                        setCategories(updated);
                      }
                    }}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features & Deliverables (Step 2) CRUD */}
        <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <span className="size-5 rounded-full bg-[#ff2a38] text-white flex items-center justify-center text-[10px] font-black">2</span>
                <span>Deliverables & Modules for Selected Category</span>
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Add-on deliverables user can check to add incremental development effort (working days)
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddFeature}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#ff2a38] text-white font-bold hover:bg-rose-600 transition-colors self-start sm:self-auto cursor-pointer"
            >
              <Plus className="size-3.5" />
              <span>Add Module</span>
            </button>
          </div>

          {/* Select Category to edit its features */}
          <div className="flex flex-wrap gap-2 pb-2">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveCategoryTab(c.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategoryTab === c.id
                    ? "bg-[#ff2a38] text-white shadow-sm"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
                }`}
              >
                <span>{c.name}</span>
                <span className="ml-1.5 opacity-75 font-mono text-[10px]">
                  ({(featuresMap[c.id] || []).length})
                </span>
              </button>
            ))}
          </div>

          {/* Feature rows */}
          <div className="space-y-3">
            {(featuresMap[activeCategoryTab] || []).length === 0 ? (
              <div className="text-center py-6 text-slate-400 text-xs italic">
                No deliverable modules added yet for this category. Click "+ Add Module" to create one.
              </div>
            ) : (
              (featuresMap[activeCategoryTab] || []).map((feat, fIdx) => (
                <div
                  key={feat.id}
                  className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 flex flex-col sm:flex-row items-center gap-3"
                >
                  <div className="w-full sm:flex-1">
                    <label className="text-[10px] font-bold text-slate-500 block mb-1">Module / Deliverable Name</label>
                    <input
                      type="text"
                      value={feat.name}
                      onChange={(e) => {
                        const current = [...(featuresMap[activeCategoryTab] || [])];
                        const item = current[fIdx];
                        if (item) {
                          current[fIdx] = { ...item, name: e.target.value };
                          setFeaturesMap({ ...featuresMap, [activeCategoryTab]: current });
                        }
                      }}
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 font-semibold text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="w-full sm:w-36">
                    <label className="text-[10px] font-bold text-slate-500 block mb-1">Effort (+ Days)</label>
                    <input
                      type="number"
                      value={feat.days}
                      onChange={(e) => {
                        const current = [...(featuresMap[activeCategoryTab] || [])];
                        const item = current[fIdx];
                        if (item) {
                          current[fIdx] = { ...item, days: Number(e.target.value) };
                          setFeaturesMap({ ...featuresMap, [activeCategoryTab]: current });
                        }
                      }}
                      className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 font-bold text-slate-900 dark:text-white font-mono"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDeleteFeature(feat.id)}
                    className="p-2 text-slate-400 hover:text-rose-500 self-end sm:self-center transition-colors"
                    title="Delete Module"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Timelines & Sprint Cadence (Step 3) */}
        <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-4">
          <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <span className="size-5 rounded-full bg-[#ff2a38] text-white flex items-center justify-center text-[10px] font-black">3</span>
              <span>Delivery Speed & Sprint Cadence</span>
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Control the delivery speed labels and sprint velocity options available to prospective clients
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {timelines.map((tl, tIdx) => (
              <div
                key={tl.id}
                className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 space-y-3"
              >
                <div>
                  <label className="text-[10px] font-bold text-slate-500 block mb-1">Cadence Title</label>
                  <input
                    type="text"
                    value={tl.name}
                    onChange={(e) => {
                      const updated = [...timelines];
                      const item = updated[tIdx];
                      if (item) {
                        updated[tIdx] = { ...item, name: e.target.value };
                        setTimelines(updated);
                      }
                    }}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 font-bold text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 block mb-1">Description / Subtitle</label>
                  <input
                    type="text"
                    value={tl.label}
                    onChange={(e) => {
                      const updated = [...timelines];
                      const item = updated[tIdx];
                      if (item) {
                        updated[tIdx] = { ...item, label: e.target.value };
                        setTimelines(updated);
                      }
                    }}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-2 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Save Submission Button */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <button
            type="submit"
            className="px-8 py-3.5 rounded-xl bg-[#ff2a38] text-white font-bold text-xs hover:bg-rose-600 transition-all shadow-lg shadow-rose-500/25 cursor-pointer flex items-center gap-2"
          >
            <CheckCircle2 className="size-4" />
            <span>Save & Publish Project Estimator</span>
          </button>
        </div>
      </form>
    </div>
  );
}

function KnowledgeHubAdminSubtab({
  sections,
  loadData,
}: {
  sections: PageSectionContent[];
  loadData: () => void;
}) {
  const hubSec = sections.find((s) => s.section_key === "home_knowledge_hub");

  const parseGuides = (sec?: PageSectionContent): ResourceGuide[] => {
    if (!sec?.extra_json) return RESOURCE_GUIDES;
    try {
      const parsed =
        typeof sec.extra_json === "string"
          ? JSON.parse(sec.extra_json)
          : sec.extra_json;
      if (Array.isArray(parsed?.guides) && parsed.guides.length > 0) {
        return parsed.guides;
      }
    } catch {
      // fallback
    }
    return RESOURCE_GUIDES;
  };

  const [title, setTitle] = useState<string>(
    hubSec?.title || "Interactive Knowledge Hub & Free Executive Guides"
  );
  const [subtitle, setSubtitle] = useState<string>(
    hubSec?.body || "Actionable frameworks, financial formulas, and technical blueprints written by our senior architects to help forward-thinking teams make smarter digital decisions."
  );
  const [guides, setGuides] = useState<ResourceGuide[]>(parseGuides(hubSec));

  // Sync state if server updates
  useEffect(() => {
    if (hubSec) {
      if (hubSec.title) setTitle(hubSec.title);
      if (hubSec.body) setSubtitle(hubSec.body);
      const parsed = parseGuides(hubSec);
      if (parsed.length > 0) {
        setGuides(parsed);
      }
    }
  }, [sections]);

  const persistHubToBackend = async (
    updatedGuides: ResourceGuide[],
    customTitle?: string,
    customSubtitle?: string
  ) => {
    const payload: Partial<PageSectionContent> = {
      section_key: "home_knowledge_hub",
      title: customTitle || title,
      subtitle: "Knowledge Hub & Executive Guides",
      body: customSubtitle || subtitle,
      extra_json: {
        guides: updatedGuides,
      },
    };

    try {
      try {
        await updatePageSection("home_knowledge_hub", payload);
      } catch {
        await createPageSection(payload);
      }
      loadData();
      return true;
    } catch (err) {
      console.error("Error persisting knowledge hub to backend:", err);
      return false;
    }
  };

  const handleAddGuide = () => {
    const newGuide: ResourceGuide = {
      id: `guide-${Date.now()}`,
      title: "New Executive Development Guide",
      fileFormat: "PDF Guide",
      badge: "Architecture & Deployment",
      pages: "",
      downloadsCount: "1,500+ Downloads",
      description: "Comprehensive step-by-step technical blueprint and production checklist.",
      takeaways: [
        "Core architectural patterns and baseline requirements",
        "Step-by-step checklist for production deployment",
        "Security, testing, and continuous monitoring procedures",
      ],
      coverColor: "from-rose-600 via-primary to-orange-500",
      downloadFileName: "Zenelait_Executive_Guide.pdf",
    };
    setGuides([...guides, newGuide]);
  };

  const handleDeleteGuide = async (id: string) => {
    if (guides.length <= 1) {
      alert("You must keep at least 1 guide.");
      return;
    }
    if (confirm("Are you sure you want to delete this guide?")) {
      const updated = guides.filter((g) => g.id !== id);
      setGuides(updated);
      await persistHubToBackend(updated);
    }
  };

  const handleFileUpload = (guideIndex: number, file: File) => {
    if (file.type !== "application/pdf") {
      alert("Please upload a valid PDF file.");
      return;
    }

    if (file.size > 8 * 1024 * 1024) {
      alert("File size exceeds 8MB limit. Please upload an optimized PDF.");
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUri = e.target?.result as string;
      const updated = [...guides];
      const item = updated[guideIndex];
      if (item) {
        updated[guideIndex] = {
          ...item,
          pdfBase64: dataUri,
          downloadFileName: file.name,
        };
        setGuides(updated);

        // Auto-persist immediately to backend database
        const ok = await persistHubToBackend(updated);
        if (ok) {
          alert(`PDF "${file.name}" uploaded & published live for "${item.title}"! Users downloading this section will now receive this PDF.`);
        } else {
          alert(`PDF "${file.name}" loaded in preview. Please click "Save & Publish Knowledge Hub" below to save.`);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleClearPdf = async (idx: number) => {
    const updated = [...guides];
    const item = updated[idx];
    if (item) {
      const { pdfBase64, ...rest } = item;
      updated[idx] = rest;
      setGuides(updated);
      await persistHubToBackend(updated);
      alert(`Custom PDF cleared for "${item.title}". Users will now download the default generated guide.`);
    }
  };

  const handleSaveHub = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await persistHubToBackend(guides, title, subtitle);
    if (ok) {
      alert("Knowledge Hub & Downloadable Guides saved and published successfully!");
    } else {
      alert("Failed to save knowledge hub configuration.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Knowledge Hub & Executive Guides (CRUD)
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-rose-100 text-[#ff2a38] dark:bg-rose-950 border border-rose-300">
              Live Download Center
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Manage the downloadable guides, key takeaways, cover colors, and optionally upload custom PDF files for each card
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleAddGuide}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#ff2a38] text-white text-xs font-bold hover:bg-rose-600 transition-colors shadow-sm cursor-pointer"
          >
            <Plus className="size-3.5" />
            <span>Add Guide Card</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSaveHub} className="space-y-6 text-xs">
        {/* Header Settings */}
        <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-4">
          <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <BookOpen className="size-4 text-[#ff2a38]" />
            <span>Section Header & Copy</span>
          </h3>

          <div className="space-y-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Section Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2.5 font-bold text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Section Subtitle / Description</label>
              <textarea
                rows={2}
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2.5 text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </div>

        {/* Guides Cards List */}
        <div className="space-y-6">
          {guides.map((guide, idx) => (
            <div
              key={guide.id}
              className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#ff2a38] bg-rose-50 dark:bg-rose-950 px-2.5 py-1 rounded-md border border-rose-200 dark:border-rose-900">
                  Card #{idx + 1}: {guide.title}
                </span>

                <button
                  type="button"
                  onClick={() => handleDeleteGuide(guide.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                  title="Delete Guide"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-[10px] font-bold text-slate-500 block mb-1">Guide Title</label>
                  <input
                    type="text"
                    value={guide.title}
                    onChange={(e) => {
                      const updated = [...guides];
                      const item = updated[idx];
                      if (item) {
                        updated[idx] = { ...item, title: e.target.value };
                        setGuides(updated);
                      }
                    }}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2.5 font-bold text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 block mb-1">Badge Tagline</label>
                  <input
                    type="text"
                    value={guide.badge}
                    onChange={(e) => {
                      const updated = [...guides];
                      const item = updated[idx];
                      if (item) {
                        updated[idx] = { ...item, badge: e.target.value };
                        setGuides(updated);
                      }
                    }}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2.5 font-semibold text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 block mb-1">Document Type / Format</label>
                  <input
                    type="text"
                    value={guide.fileFormat}
                    onChange={(e) => {
                      const updated = [...guides];
                      const item = updated[idx];
                      if (item) {
                        updated[idx] = { ...item, fileFormat: e.target.value, pages: "" };
                        setGuides(updated);
                      }
                    }}
                    placeholder="e.g. PDF Guide, Technical Manual"
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2 font-mono text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 block mb-1">Download File Name</label>
                  <input
                    type="text"
                    value={guide.downloadFileName}
                    onChange={(e) => {
                      const updated = [...guides];
                      const item = updated[idx];
                      if (item) {
                        updated[idx] = { ...item, downloadFileName: e.target.value };
                        setGuides(updated);
                      }
                    }}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2 font-mono text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 block mb-1">Cover Gradient Classes</label>
                  <input
                    type="text"
                    value={guide.coverColor}
                    onChange={(e) => {
                      const updated = [...guides];
                      const item = updated[idx];
                      if (item) {
                        updated[idx] = { ...item, coverColor: e.target.value };
                        setGuides(updated);
                      }
                    }}
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2 font-mono text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 block mb-1">Guide Summary / Description</label>
                <textarea
                  rows={2}
                  value={guide.description}
                  onChange={(e) => {
                    const updated = [...guides];
                    const item = updated[idx];
                    if (item) {
                      updated[idx] = { ...item, description: e.target.value };
                      setGuides(updated);
                    }
                  }}
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2 text-slate-900 dark:text-white"
                />
              </div>

              {/* Takeaways list */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[10px] font-bold text-slate-500">Key Takeaway Bullet Points (One per line)</label>
                </div>
                <textarea
                  rows={3}
                  value={guide.takeaways.join("\n")}
                  onChange={(e) => {
                    const updated = [...guides];
                    const item = updated[idx];
                    if (item) {
                      updated[idx] = {
                        ...item,
                        takeaways: e.target.value.split("\n").filter((l) => l.trim().length > 0),
                      };
                      setGuides(updated);
                    }
                  }}
                  placeholder="Enter each takeaway on a new line"
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2 text-slate-900 dark:text-white font-mono text-xs"
                />
              </div>

              {/* Custom PDF Upload Option */}
              <div className="p-4 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <FileUp className="size-4 text-[#ff2a38]" />
                    <span className="font-bold text-slate-900 dark:text-white text-xs">
                      Custom PDF File Upload (Optional)
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">
                    {guide.pdfBase64 ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                        ✓ Custom PDF loaded ({guide.downloadFileName}). Users will download this exact uploaded file.
                      </span>
                    ) : (
                      "No custom PDF uploaded. The system automatically creates a high-res, multi-page branded PDF with full diagrams and takeaways."
                    )}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <label className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 cursor-pointer flex items-center gap-1.5 shadow-xs">
                    <Upload className="size-3.5 text-[#ff2a38]" />
                    <span>Upload Custom PDF</span>
                    <input
                      type="file"
                      accept="application/pdf"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(idx, file);
                      }}
                    />
                  </label>

                  {guide.pdfBase64 && (
                    <button
                      type="button"
                      onClick={() => handleClearPdf(idx)}
                      className="px-2.5 py-2 rounded-xl border border-rose-200 text-xs font-semibold text-rose-600 hover:bg-rose-100 transition-colors cursor-pointer"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Save Submission Button */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <button
            type="submit"
            className="px-8 py-3.5 rounded-xl bg-[#ff2a38] text-white font-bold text-xs hover:bg-rose-600 transition-all shadow-lg shadow-rose-500/25 cursor-pointer flex items-center gap-2"
          >
            <CheckCircle2 className="size-4" />
            <span>Save & Publish Knowledge Hub</span>
          </button>
        </div>
      </form>
    </div>
  );
}

function FAQAdminSubtab({
  sections,
  loadData,
}: {
  sections: PageSectionContent[];
  loadData: () => void;
}) {
  const faqSec = sections.find((s) => s.section_key === "home_faqs");

  const parseFaqs = (sec?: PageSectionContent): FAQItem[] => {
    if (!sec?.extra_json) return DEFAULT_FAQS;
    try {
      const raw =
        typeof sec.extra_json === "string"
          ? JSON.parse(sec.extra_json)
          : sec.extra_json;
      return Array.isArray(raw?.faqs) && raw.faqs.length > 0 ? raw.faqs : DEFAULT_FAQS;
    } catch {
      return DEFAULT_FAQS;
    }
  };

  const [title, setTitle] = useState<string>(
    faqSec?.title || "Frequently Asked Questions"
  );
  const [badgeText, setBadgeText] = useState<string>(
    faqSec?.subtitle || "Transparent Answers & Advisory"
  );
  const [subtitle, setSubtitle] = useState<string>(
    faqSec?.body || "Find immediate answers about pricing transparency, security benchmarks, delivery timelines, code IP ownership, and post-launch SLAs."
  );
  const [faqs, setFaqs] = useState<FAQItem[]>(parseFaqs(faqSec));

  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");

  // Sync state if server updates
  useEffect(() => {
    if (faqSec) {
      if (faqSec.title) setTitle(faqSec.title);
      if (faqSec.subtitle) setBadgeText(faqSec.subtitle);
      if (faqSec.body) setSubtitle(faqSec.body);
      const parsed = parseFaqs(faqSec);
      if (parsed.length > 0) {
        setFaqs(parsed);
      }
    }
  }, [sections]);

  const persistToBackend = async (
    targetFaqs: FAQItem[],
    t = title,
    b = badgeText,
    s = subtitle
  ) => {
    const payload: Partial<PageSectionContent> = {
      section_key: "home_faqs",
      title: t,
      subtitle: b,
      body: s,
      extra_json: {
        faqs: targetFaqs,
      },
    };

    try {
      try {
        await updatePageSection("home_faqs", payload);
      } catch {
        await createPageSection(payload);
      }
      loadData();
    } catch (err) {
      console.error("Error saving FAQs:", err);
    }
  };

  const handleCreateNewFaq = () => {
    const newFaq: FAQItem = {
      id: `faq-${Date.now()}`,
      category: "Pricing",
      question: "New Frequently Asked Question?",
      answer: "Provide a detailed, transparent answer explaining your engineering or engagement policies.",
      highlight: "Key takeaway summary",
      popular: false,
    };
    setEditingFaq(newFaq);
  };

  const handleSaveModalFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingFaq) return;

    let updatedList: FAQItem[];
    const exists = faqs.some((f) => f.id === editingFaq.id);
    if (exists) {
      updatedList = faqs.map((f) => (f.id === editingFaq.id ? editingFaq : f));
    } else {
      updatedList = [editingFaq, ...faqs];
    }
    setFaqs(updatedList);
    setEditingFaq(null);
    await persistToBackend(updatedList);
  };

  const handleDeleteFaq = async (id: string) => {
    if (faqs.length <= 1) {
      alert("You must keep at least 1 FAQ item.");
      return;
    }
    if (confirm("Are you sure you want to delete this FAQ item?")) {
      const updatedList = faqs.filter((f) => f.id !== id);
      setFaqs(updatedList);
      await persistToBackend(updatedList);
    }
  };

  const handleSaveAllFaqs = async (e: React.FormEvent) => {
    e.preventDefault();
    await persistToBackend(faqs, title, badgeText, subtitle);
    alert("Frequently Asked Questions (FAQs) updated and published successfully!");
  };

  const categories = ["All", "Pricing", "Security", "Timeline", "Code Ownership", "Support"];

  const filtered = faqs.filter((f) => {
    const matchesCat = categoryFilter === "All" || f.category === categoryFilter;
    if (!matchesCat) return false;
    if (!searchFilter.trim()) return true;
    const q = searchFilter.toLowerCase();
    return (
      f.question.toLowerCase().includes(q) ||
      f.answer.toLowerCase().includes(q) ||
      f.category.toLowerCase().includes(q) ||
      (f.highlight && f.highlight.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Frequently Asked Questions (CRUD)
            </h2>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-rose-100 text-[#ff2a38] dark:bg-rose-950 border border-rose-300">
              Live Website FAQs
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Create, edit, delete, categorize, and prioritize customer questions shown across the website.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreateNewFaq}
          className="px-4 py-2.5 rounded-xl bg-[#ff2a38] hover:bg-rose-600 text-white text-xs font-bold transition-all shadow-md shadow-rose-500/20 cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="size-4" />
          <span>Add New FAQ</span>
        </button>
      </div>

      {/* Main Save Form */}
      <form onSubmit={handleSaveAllFaqs} className="space-y-6">
        {/* Section Header Controls */}
        <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4 shadow-xs">
          <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="size-4 text-[#ff2a38]" />
            <span>FAQ Section Header & Advisory Info</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Badge Pill Text
              </label>
              <input
                type="text"
                value={badgeText}
                onChange={(e) => setBadgeText(e.target.value)}
                className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-slate-900 dark:text-white focus:outline-none focus:border-[#ff2a38]"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Section Main Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-slate-900 dark:text-white focus:outline-none focus:border-[#ff2a38]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Section Description / Advisory Subtitle
            </label>
            <textarea
              rows={2}
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              className="w-full text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-3 text-slate-900 dark:text-white focus:outline-none focus:border-[#ff2a38]"
            />
          </div>
        </div>

        {/* Filter and Search Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  categoryFilter === cat
                    ? "bg-[#ff2a38] text-white shadow-xs"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {cat} ({cat === "All" ? faqs.length : faqs.filter((f) => f.category === cat).length})
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 size-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white focus:outline-none focus:border-[#ff2a38]"
            />
          </div>
        </div>

        {/* List of FAQs */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-12 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 space-y-2">
              <HelpCircle className="size-8 text-slate-300 dark:text-slate-600 mx-auto" />
              <p className="text-xs font-bold text-slate-700 dark:text-slate-300">No FAQs found matching filter.</p>
              <button
                type="button"
                onClick={handleCreateNewFaq}
                className="text-xs text-[#ff2a38] font-bold hover:underline"
              >
                Create a new FAQ
              </button>
            </div>
          ) : (
            filtered.map((item, idx) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-start justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {item.category}
                    </span>
                    {item.popular && (
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60">
                        ★ Popular Highlight
                      </span>
                    )}
                    <span className="text-[10px] font-mono text-slate-400">
                      ID: {item.id}
                    </span>
                  </div>

                  <h4 className="text-sm font-black text-slate-900 dark:text-white leading-snug">
                    {item.question}
                  </h4>

                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.answer}
                  </p>

                  {item.highlight && (
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#ff2a38] bg-rose-50 dark:bg-rose-950/30 px-2.5 py-1 rounded-lg border border-rose-200/60 dark:border-rose-900/40">
                      <Sparkles className="size-3 shrink-0" />
                      <span>{item.highlight}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end md:self-start pt-2 md:pt-0">
                  <button
                    type="button"
                    onClick={() => setEditingFaq({ ...item })}
                    className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 hover:text-[#ff2a38] hover:border-rose-300 transition-all cursor-pointer flex items-center gap-1 text-xs font-bold"
                    title="Edit FAQ"
                  >
                    <Edit3 className="size-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteFaq(item.id)}
                    className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-400 hover:text-rose-600 hover:border-rose-300 transition-all cursor-pointer"
                    title="Delete FAQ"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Save Submission Button */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
          <button
            type="submit"
            className="px-8 py-3.5 rounded-xl bg-[#ff2a38] text-white font-bold text-xs hover:bg-rose-600 transition-all shadow-lg shadow-rose-500/25 cursor-pointer flex items-center gap-2"
          >
            <CheckCircle2 className="size-4" />
            <span>Save & Publish FAQs</span>
          </button>
        </div>
      </form>

      {/* Edit / Create FAQ Modal */}
      {editingFaq && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="size-4 text-[#ff2a38]" />
                <span>{faqs.some((f) => f.id === editingFaq.id) ? "Edit Question" : "Add New Question"}</span>
              </h3>
              <button
                type="button"
                onClick={() => setEditingFaq(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveModalFaq} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Category *
                  </label>
                  <select
                    value={editingFaq.category}
                    onChange={(e) =>
                      setEditingFaq({
                        ...editingFaq,
                        category: e.target.value as FAQItem["category"],
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2.5 text-slate-900 dark:text-white"
                  >
                    <option value="Pricing">Pricing</option>
                    <option value="Security">Security</option>
                    <option value="Timeline">Timeline</option>
                    <option value="Code Ownership">Code Ownership</option>
                    <option value="Support">Support</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    Popular Flag
                  </label>
                  <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(editingFaq.popular)}
                      onChange={(e) =>
                        setEditingFaq({ ...editingFaq, popular: e.target.checked })
                      }
                      className="rounded accent-[#ff2a38]"
                    />
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Highlight as Popular
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Question *
                </label>
                <input
                  type="text"
                  required
                  value={editingFaq.question}
                  onChange={(e) =>
                    setEditingFaq({ ...editingFaq, question: e.target.value })
                  }
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-[#ff2a38]"
                  placeholder="e.g. Do you sign Non-Disclosure Agreements (NDA)?"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Answer *
                </label>
                <textarea
                  rows={4}
                  required
                  value={editingFaq.answer}
                  onChange={(e) =>
                    setEditingFaq({ ...editingFaq, answer: e.target.value })
                  }
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-[#ff2a38]"
                  placeholder="Provide a comprehensive and clear answer..."
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Key Takeaway / Highlight Pill (Optional)
                </label>
                <input
                  type="text"
                  value={editingFaq.highlight || ""}
                  onChange={(e) =>
                    setEditingFaq({ ...editingFaq, highlight: e.target.value })
                  }
                  className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-[#ff2a38]"
                  placeholder="e.g. Strict mutual NDA signed before initial discovery calls."
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingFaq(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#ff2a38] text-white text-xs font-bold hover:bg-rose-600 shadow-md shadow-rose-500/20"
                >
                  Apply Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
