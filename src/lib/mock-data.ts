import coverQuietMachines from "@/assets/covers/quiet-machines.jpg";
import coverBananaGroves from "@/assets/covers/banana-groves.jpg";
import coverDiscreteThought from "@/assets/covers/discrete-thought.jpg";
import coverCivicMemory from "@/assets/covers/civic-memory.jpg";
import coverIntelligenceIllustrated from "@/assets/covers/intelligence-illustrated.jpg";
import coverCoastalEcology from "@/assets/covers/coastal-ecology.jpg";

export const FINE_RATE_PER_DAY = 0.5;

export type AssetType = "Physical" | "Digital";

export type Book = {
  bookId: string;
  title: string;
  authors: string;
  category: string;
  isbn13: string;
  isbn10: string;
  type: AssetType;
  publisher: string;
  year: number;
  language: string;
  pages: number;
  callNumber: string;
  copiesAvailable: number;
  copiesTotal: number;
  summary: string;
  keywords: string[];
  cover: string;
  location?: string;
  fileFormat?: string;
  maxConcurrent?: number;
};



// TO EDIT
export const books: Book[] = [
  {
    bookId: "BK-1001",
    title: "The Art of Quiet Machines",
    authors: "Elena Marquez",
    category: "Computer Science",
    isbn13: "978-0132350884",
    isbn10: "0132350884",
    type: "Physical",
    publisher: "Northfield Press",
    year: 2019,
    language: "English",
    pages: 448,
    callNumber: "QA76.9 .M37 2019",
    copiesAvailable: 3,
    copiesTotal: 6,
    summary:
      "A practical study of intelligent systems and the craft of writing software that lasts.",
    keywords: ["algorithms", "software craft", "systems"],
    cover: coverQuietMachines,

    location: "Shelf A / Rack 3",
  },
  {
    bookId: "BK-1002",
    title: "Banana Groves of the Archipelago",
    authors: "Rodrigo Salazar, Mina Cruz",
    category: "Agriculture",
    isbn13: "978-0596809485",
    isbn10: "0596809484",
    type: "Physical",
    publisher: "Isla Verde Publishing",
    year: 2021,
    language: "English",
    pages: 312,
    callNumber: "SB379 .S24 2021",
    copiesAvailable: 0,
    copiesTotal: 4,
    summary: "A field survey of tropical cultivation practices across island provinces.",
    keywords: ["agriculture", "tropical crops", "field study"],
    cover: coverBananaGroves,

    location: "Shelf C / Rack 1",
  },
  {
    bookId: "BK-1003",
    title: "Foundations of Discrete Thought",
    authors: "Hilda Bautista",
    category: "Mathematics",
    isbn13: "978-1491950296",
    isbn10: "1491950293",
    type: "Digital",
    publisher: "Acacia Academic",
    year: 2020,
    language: "English",
    pages: 520,
    callNumber: "QA39.3 .B38 2020",
    copiesAvailable: 5,
    copiesTotal: 8,
    summary: "Set theory, logic and combinatorics for undergraduate programs.",
    keywords: ["logic", "combinatorics", "proofs"],
    cover: coverDiscreteThought,

    fileFormat: "PDF",
    maxConcurrent: 8,
  },
  {
    bookId: "BK-1004",
    title: "Municipal Records and Civic Memory",
    authors: "Joseph Alonzo",
    category: "History",
    isbn13: "978-0143127741",
    isbn10: "0143127748",
    type: "Physical",
    publisher: "Civic House",
    year: 2017,
    language: "Filipino",
    pages: 274,
    callNumber: "DS655 .A46 2017",
    copiesAvailable: 2,
    copiesTotal: 3,
    summary: "How local archives shape community identity in the provinces.",
    keywords: ["archives", "local history"],
    cover: coverCivicMemory,

    location: "Shelf B / Rack 2",
  },
  {
    bookId: "BK-1005",
    title: "Intelligence, Illustrated",
    authors: "Priya Raman",
    category: "Art",
    isbn13: "978-0262035613",
    isbn10: "0262035618",
    type: "Digital",
    publisher: "Lantern Editions",
    year: 2023,
    language: "English",
    pages: 198,
    callNumber: "N72 .R36 2023",
    copiesAvailable: 2,
    copiesTotal: 3,
    summary: "Visual essays on the intersection of drawing and machine cognition.",
    keywords: ["art", "visual essay", "AI"],
    cover: coverIntelligenceIllustrated,

    fileFormat: "EPUB",
    maxConcurrent: 3,
  },
  {
    bookId: "BK-1006",
    title: "Coastal Ecology Handbook",
    authors: "Teresa Uy",
    category: "Science",
    isbn13: "978-0393609394",
    isbn10: "0393609391",
    type: "Physical",
    publisher: "Northfield Press",
    year: 2018,
    language: "English",
    pages: 386,
    callNumber: "QH541.5 .U9 2018",
    copiesAvailable: 1,
    copiesTotal: 5,
    summary: "Reference guide for mangrove, reef and estuary field work.",
    keywords: ["ecology", "marine", "handbook"],
    cover: coverCoastalEcology,

    location: "Shelf D / Rack 4",
  },
];

export type Member = {
  studentId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  yearLevel: string;
  membershipType: "Standard" | "Faculty" | "Guest";
  maxBooks: number;
  joinDate: string;
  expiryDate: string;
  status: "Active" | "Suspended" | "Expired";
  booksOut: number;
  finesOwed: number;
};

export const members: Member[] = [
  {
    studentId: "2023-00145",
    firstName: "Andrea",
    lastName: "Villanueva",
    email: "andrea.v@bai.edu",
    phone: "+63 917 220 1145",
    department: "BS Computer Science",
    yearLevel: "3rd Year",
    membershipType: "Standard",
    maxBooks: 5,
    joinDate: "2023-08-14",
    expiryDate: "2027-06-30",
    status: "Active",
    booksOut: 2,
    finesOwed: 0,
  },
  {
    studentId: "2022-00871",
    firstName: "Miguel",
    lastName: "Santos",
    email: "miguel.s@bai.edu",
    phone: "+63 918 441 8871",
    department: "BS Agriculture",
    yearLevel: "4th Year",
    membershipType: "Standard",
    maxBooks: 5,
    joinDate: "2022-08-02",
    expiryDate: "2026-06-30",
    status: "Active",
    booksOut: 5,
    finesOwed: 0,
  },
  {
    studentId: "2021-00320",
    firstName: "Cheska",
    lastName: "Domingo",
    email: "cheska.d@bai.edu",
    phone: "+63 905 118 0320",
    department: "BA History",
    yearLevel: "4th Year",
    membershipType: "Standard",
    maxBooks: 5,
    joinDate: "2021-07-19",
    expiryDate: "2025-06-30",
    status: "Suspended",
    booksOut: 1,
    finesOwed: 12.5,
  },
  {
    studentId: "FAC-00042",
    firstName: "Dr. Rowena",
    lastName: "Lacsina",
    email: "r.lacsina@bai.edu",
    phone: "+63 920 774 0042",
    department: "College of Science",
    yearLevel: "Faculty",
    membershipType: "Faculty",
    maxBooks: 10,
    joinDate: "2016-01-11",
    expiryDate: "2030-12-31",
    status: "Active",
    booksOut: 3,
    finesOwed: 0,
  },
  {
    studentId: "2024-01099",
    firstName: "Paolo",
    lastName: "Reyes",
    email: "paolo.r@bai.edu",
    phone: "+63 926 330 1099",
    department: "BS Mathematics",
    yearLevel: "1st Year",
    membershipType: "Standard",
    maxBooks: 5,
    joinDate: "2024-08-05",
    expiryDate: "2028-06-30",
    status: "Active",
    booksOut: 1,
    finesOwed: 3.5,
  },
  {
    studentId: "GST-00007",
    firstName: "Liza",
    lastName: "Fontanilla",
    email: "liza.f@guest.bai.edu",
    phone: "+63 917 000 0007",
    department: "Community Guest",
    yearLevel: "—",
    membershipType: "Guest",
    maxBooks: 2,
    joinDate: "2026-02-01",
    expiryDate: "2026-08-01",
    status: "Active",
    booksOut: 0,
    finesOwed: 0,
  },
];

export type Loan = {
  issueId: string;
  studentId: string;
  studentName: string;
  bookTitle: string;
  assetType: AssetType;
  copyId: string;
  issueDate: string;
  dueDate: string;
  returnDate: string | null;
  status: "Issued" | "Overdue" | "Returned";
};

export const loans: Loan[] = [
  {
    issueId: "ISS-5001",
    studentId: "2023-00145",
    studentName: "Andrea Villanueva",
    bookTitle: "The Art of Quiet Machines",
    assetType: "Physical",
    copyId: "BC-1001-002",
    issueDate: "2026-08-20",
    dueDate: "2026-09-03",
    returnDate: null,
    status: "Issued",
  },
  {
    issueId: "ISS-5002",
    studentId: "2023-00145",
    studentName: "Andrea Villanueva",
    bookTitle: "Foundations of Discrete Thought",
    assetType: "Digital",
    copyId: "EB-1003",
    issueDate: "2026-08-25",
    dueDate: "2026-09-08",
    returnDate: null,
    status: "Issued",
  },
  {
    issueId: "ISS-5003",
    studentId: "2021-00320",
    studentName: "Cheska Domingo",
    bookTitle: "Municipal Records and Civic Memory",
    assetType: "Physical",
    copyId: "BC-1004-001",
    issueDate: "2026-07-28",
    dueDate: "2026-08-11",
    returnDate: null,
    status: "Overdue",
  },
  {
    issueId: "ISS-5004",
    studentId: "2022-00871",
    studentName: "Miguel Santos",
    bookTitle: "Banana Groves of the Archipelago",
    assetType: "Physical",
    copyId: "BC-1002-003",
    issueDate: "2026-08-12",
    dueDate: "2026-08-26",
    returnDate: null,
    status: "Overdue",
  },
  {
    issueId: "ISS-5005",
    studentId: "FAC-00042",
    studentName: "Dr. Rowena Lacsina",
    bookTitle: "Coastal Ecology Handbook",
    assetType: "Physical",
    copyId: "BC-1006-004",
    issueDate: "2026-08-24",
    dueDate: "2026-09-07",
    returnDate: null,
    status: "Issued",
  },
  {
    issueId: "ISS-4870",
    studentId: "2023-00145",
    studentName: "Andrea Villanueva",
    bookTitle: "Intelligence, Illustrated",
    assetType: "Digital",
    copyId: "EB-1005",
    issueDate: "2026-06-10",
    dueDate: "2026-06-24",
    returnDate: "2026-06-21",
    status: "Returned",
  },
  {
    issueId: "ISS-4712",
    studentId: "2023-00145",
    studentName: "Andrea Villanueva",
    bookTitle: "Coastal Ecology Handbook",
    assetType: "Physical",
    copyId: "BC-1006-002",
    issueDate: "2026-04-02",
    dueDate: "2026-04-16",
    returnDate: "2026-04-23",
    status: "Returned",
  },
];

export type Fine = {
  fineId: string;
  issueId: string;
  studentId: string;
  studentName: string;
  bookTitle: string;
  daysLate: number;
  ratePerDay: number;
  amount: number;
  paymentStatus: "Paid" | "Unpaid";
  paidDate: string | null;
};

export const fines: Fine[] = [
  {
    fineId: "FN-3001",
    issueId: "ISS-5003",
    studentId: "2021-00320",
    studentName: "Cheska Domingo",
    bookTitle: "Municipal Records and Civic Memory",
    daysLate: 25,
    ratePerDay: FINE_RATE_PER_DAY,
    amount: 12.5,
    paymentStatus: "Unpaid",
    paidDate: null,
  },
  {
    fineId: "FN-3002",
    issueId: "ISS-4712",
    studentId: "2023-00145",
    studentName: "Andrea Villanueva",
    bookTitle: "Coastal Ecology Handbook",
    daysLate: 7,
    ratePerDay: FINE_RATE_PER_DAY,
    amount: 3.5,
    paymentStatus: "Paid",
    paidDate: "2026-04-23",
  },
  {
    fineId: "FN-3003",
    issueId: "ISS-4655",
    studentId: "2024-01099",
    studentName: "Paolo Reyes",
    bookTitle: "Foundations of Discrete Thought",
    daysLate: 7,
    ratePerDay: FINE_RATE_PER_DAY,
    amount: 3.5,
    paymentStatus: "Unpaid",
    paidDate: null,
  },
];

export const categories = [
  "Computer Science",
  "Agriculture",
  "Mathematics",
  "History",
  "Art",
  "Science",
];

export const locations = [
  "Shelf A / Rack 1",
  "Shelf A / Rack 3",
  "Shelf B / Rack 2",
  "Shelf C / Rack 1",
  "Shelf D / Rack 4",
];

export const kpis = {
  totalBooks: 4820,
  activeIssues: 137,
  overdueBooks: 18,
  finesCollected: 264.5,
  totalMembers: 1942,
};

export const loansTrend = [
  { day: "Aug 02", loans: 18 },
  { day: "Aug 06", loans: 24 },
  { day: "Aug 10", loans: 31 },
  { day: "Aug 14", loans: 27 },
  { day: "Aug 18", loans: 38 },
  { day: "Aug 22", loans: 44 },
  { day: "Aug 26", loans: 36 },
  { day: "Aug 30", loans: 49 },
];

export const popularTitles = [
  { title: "Quiet Machines", loans: 62 },
  { title: "Banana Groves", loans: 54 },
  { title: "Discrete Thought", loans: 47 },
  { title: "Civic Memory", loans: 33 },
  { title: "Coastal Ecology", loans: 29 },
];

export const currentStudent = members[0]!;

export const notifications = [
  { id: 1, text: "Banana Groves of the Archipelago is overdue by 5 days.", tone: "danger" },
  { id: 2, text: "The Art of Quiet Machines is due in 3 days.", tone: "warning" },
  { id: 3, text: "Reserve request approved: Intelligence, Illustrated.", tone: "success" },
];
