const API_BASE = import.meta.env.VITE_API_BASE || 'https://zenelait-website-9-9-26.onrender.com/api';

export async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });
  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${res.statusText}`);
  }
  if (res.status === 204) {
    return {} as T;
  }
  return res.json();
}

// 1. Demo Requests & Notifications
export interface DemoRequest {
  id?: number;
  name: string;
  email: string;
  phone: string;
  service: string;
  company?: string;
  message?: string;
  status?: string;
  is_read?: boolean;
  created_at?: string;
}

export async function getDemoRequests() {
  return fetchApi<DemoRequest[]>('/demo-requests/');
}

export async function submitDemoRequest(data: Partial<DemoRequest>) {
  return fetchApi<DemoRequest>('/demo-requests/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function getNotifications() {
  return fetchApi<{ count: number; notifications: DemoRequest[] }>('/demo-requests/notifications/');
}

export async function markNotificationRead(id: number) {
  return fetchApi<{ status: string }>(`/demo-requests/${id}/mark_read/`, {
    method: 'POST',
  });
}

export async function updateDemoRequest(id: number, data: Partial<DemoRequest>) {
  return fetchApi<DemoRequest>(`/demo-requests/${id}/`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function deleteDemoRequest(id: number) {
  return fetchApi<{ status: string }>(`/demo-requests/${id}/`, {
    method: 'DELETE',
  });
}

export async function deleteJobApplication(id: number) {
  return fetchApi<{ status: string }>(`/job-applications/${id}/`, {
    method: 'DELETE',
  });
}

// 2. Job Applications & Open Positions
export interface JobApplication {
  id?: number;
  job_title: string;
  applicant_name: string;
  email: string;
  phone: string;
  experience: string;
  portfolio_link?: string;
  resume_note?: string;
  status?: string;
  submitted_at?: string;
}

export async function getJobApplications() {
  return fetchApi<JobApplication[]>('/job-applications/');
}

export async function submitJobApplication(data: Partial<JobApplication>) {
  return fetchApi<JobApplication>('/job-applications/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export interface OpenPosition {
  id?: number;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements: string[];
  is_active: boolean;
  created_at?: string;
}

export async function getOpenPositions() {
  return fetchApi<OpenPosition[]>('/open-positions/');
}

export async function createOpenPosition(data: Partial<OpenPosition>) {
  return fetchApi<OpenPosition>('/open-positions/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateOpenPosition(id: number, data: Partial<OpenPosition>) {
  return fetchApi<OpenPosition>(`/open-positions/${id}/`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteOpenPosition(id: number) {
  return fetchApi<void>(`/open-positions/${id}/`, {
    method: 'DELETE',
  });
}

// 3. Page Section Content (Home intro/stats, About who we are/mission/vision/values)
export interface PageSectionContent {
  id?: number;
  section_key: string;
  title: string;
  subtitle?: string;
  body: string;
  extra_json?: any;
  updated_at?: string;
}

export async function getPageSections() {
  return fetchApi<PageSectionContent[]>('/page-sections/');
}

export async function createPageSection(data: Partial<PageSectionContent>) {
  return fetchApi<PageSectionContent>('/page-sections/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updatePageSection(section_key: string, data: Partial<PageSectionContent>) {
  return fetchApi<PageSectionContent>(`/page-sections/${section_key}/`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deletePageSection(section_key: string) {
  return fetchApi<void>(`/page-sections/${section_key}/`, {
    method: 'DELETE',
  });
}

// 4. Testimonials (CRUD)
export interface Testimonial {
  id?: number;
  page: 'home' | 'it_products';
  author: string;
  role: string;
  company?: string;
  content: string;
  rating: number;
  metric?: string;
  industry?: string;
  avatar_url?: string;
  created_at?: string;
}

export async function getTestimonials(page?: 'home' | 'it_products') {
  const query = page ? `?page=${page}` : '';
  return fetchApi<Testimonial[]>(`/testimonials/${query}`);
}

export async function createTestimonial(data: Partial<Testimonial>) {
  return fetchApi<Testimonial>('/testimonials/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function updateTestimonial(id: number, data: Partial<Testimonial>) {
  return fetchApi<Testimonial>(`/testimonials/${id}/`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

export async function deleteTestimonial(id: number) {
  return fetchApi<void>(`/testimonials/${id}/`, {
    method: 'DELETE',
  });
}
