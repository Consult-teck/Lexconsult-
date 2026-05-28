// ============ LAWYERS ============
export const LAWYERS = [
  {
    id: "l1",
    name: "Adaeze Nwosu",
    specialization: "Corporate Law",
    experience: 14,
    rating: 4.9,
    reviews: 128,
    fee: 25000,
    location: "Lagos",
    available: true,
    avatar: "AN",
    bio: "Senior partner specializing in mergers, acquisitions, and corporate governance. Former counsel at AMCON.",
    languages: ["English", "Igbo"],
    education: "University of Lagos LLB, LSE LLM",
  },
  {
    id: "l2",
    name: "Babatunde Afolabi",
    specialization: "Criminal Defense",
    experience: 11,
    rating: 4.8,
    reviews: 94,
    fee: 20000,
    location: "Abuja",
    available: true,
    avatar: "BA",
    bio: "Renowned criminal defense attorney with experience in high-profile cases. Known for his meticulous approach.",
    languages: ["English", "Yoruba"],
    education: "Obafemi Awolowo University LLB, NLS",
  },
  {
    id: "l3",
    name: "Chisom Eze",
    specialization: "Family & Divorce Law",
    experience: 8,
    rating: 4.7,
    reviews: 77,
    fee: 15000,
    location: "Port Harcourt",
    available: true,
    avatar: "CE",
    bio: "Compassionate family law attorney focused on amicable resolutions, child custody, and estate matters.",
    languages: ["English", "Igbo"],
    education: "Rivers State University LLB, BL",
  },
  {
    id: "l4",
    name: "Emmanuel Okafor",
    specialization: "Real Estate & Property",
    experience: 16,
    rating: 4.9,
    reviews: 203,
    fee: 30000,
    location: "Lagos",
    available: false,
    avatar: "EO",
    bio: "Expert in property conveyancing, land disputes, and real estate transactions across Nigeria.",
    languages: ["English", "Igbo"],
    education: "UNILAG LLB, University of Nottingham LLM",
  },
  {
    id: "l5",
    name: "Fatima Al-Hassan",
    specialization: "Immigration Law",
    experience: 9,
    rating: 4.6,
    reviews: 55,
    fee: 18000,
    location: "Kano",
    available: true,
    avatar: "FA",
    bio: "Specialist in immigration, visa, and citizenship matters. Fluent in three languages.",
    languages: ["English", "Hausa", "Arabic"],
    education: "BUK LLB, UCL Immigration Law LLM",
  },
  {
    id: "l6",
    name: "Gbenga Olawale",
    specialization: "Intellectual Property",
    experience: 7,
    rating: 4.7,
    reviews: 41,
    fee: 22000,
    location: "Lagos",
    available: true,
    avatar: "GO",
    bio: "Protects creative assets, trademarks, patents, and copyrights for artists, startups, and corporations.",
    languages: ["English", "Yoruba"],
    education: "UNILAG LLB, WIPO Academy IP LLM",
  },
];

// ============ BOOKINGS ============
const BOOKING_KEY = "lc_bookings";

export function getBookings() {
  return JSON.parse(localStorage.getItem(BOOKING_KEY) || "[]");
}

export function saveBooking(booking) {
  const bookings = getBookings();
  const newBooking = { ...booking, id: "b_" + Date.now(), createdAt: new Date().toISOString(), status: "pending" };
  localStorage.setItem(BOOKING_KEY, JSON.stringify([...bookings, newBooking]));
  return newBooking;
}

export function updateBookingStatus(id, status) {
  const bookings = getBookings();
  const updated = bookings.map(b => b.id === id ? { ...b, status } : b);
  localStorage.setItem(BOOKING_KEY, JSON.stringify(updated));
}

export function getUserBookings(userId) {
  return getBookings().filter(b => b.userId === userId);
}

// ============ CASES ============
const CASE_KEY = "lc_cases";

export function getCases() {
  return JSON.parse(localStorage.getItem(CASE_KEY) || "[]");
}

export function saveCase(caseData) {
  const cases = getCases();
  const newCase = {
    ...caseData,
    id: "c_" + Date.now(),
    createdAt: new Date().toISOString(),
    status: "open",
    updates: [{ date: new Date().toISOString(), note: "Case opened.", by: "System" }],
  };
  localStorage.setItem(CASE_KEY, JSON.stringify([...cases, newCase]));
  return newCase;
}

export function updateCase(id, updates) {
  const cases = getCases();
  const updated = cases.map(c => c.id === id ? { ...c, ...updates } : c);
  localStorage.setItem(CASE_KEY, JSON.stringify(updated));
}

export function getUserCases(userId) {
  return getCases().filter(c => c.userId === userId);
}

export function addCaseUpdate(caseId, note, by) {
  const cases = getCases();
  const updated = cases.map(c =>
    c.id === caseId
      ? { ...c, updates: [...(c.updates || []), { date: new Date().toISOString(), note, by }] }
      : c
  );
  localStorage.setItem(CASE_KEY, JSON.stringify(updated));
}

// ============ HELPERS ============
export const SPECIALIZATIONS = [...new Set(LAWYERS.map(l => l.specialization))];

export function getLawyerById(id) {
  return LAWYERS.find(l => l.id === id);
}
