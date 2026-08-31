import coverQuietMachines from "@/assets/covers/quiet-machines.jpg";
import coverBananaGroves from "@/assets/covers/banana-groves.jpg";
import coverDiscreteThought from "@/assets/covers/discrete-thought.jpg";
import coverCivicMemory from "@/assets/covers/civic-memory.jpg";
import coverIntelligenceIllustrated from "@/assets/covers/intelligence-illustrated.jpg";
import coverCoastalEcology from "@/assets/covers/coastal-ecology.jpg";

import coverItEndsWithUs from "@/assets/covers/it_ends_with_us_cover.jpg";
import coverModernOperatingSystems from "@/assets/covers/modern_operating_systems_5th_cover.jpg";
import coverSapiens from "@/assets/covers/sapiens_a_brief_history_of_humankind_cover.jpg";
import coverIntroductionToLinearAlgebra from "@/assets/covers/introduction_to_linear_algebra_5th_cover.jpg";
import coverTheStoryOfArt from "@/assets/covers/the_story_of_art_16th_cover.jpg";

import coverCalculusStewart from "@/assets/covers/calculus_book.jpg";
import coverBananasStover from "@/assets/covers/bananas.jpg";
import coverHarryPotter1 from "@/assets/covers/Harry-Potter-and-the-Sorcerers-Stone-Book-Cover.jpg"

import coverBriefHistoryTime from "@/assets/covers/History_of_time.jpg";
import coverDesigningDataIntensive from "@/assets/covers/Dasigning Data-intensive applications.jpg";



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
    title: "Modern Operating Systems",
    authors: "Andrew S. Tanenbaum, Herbert Bos",
    category: "Technology",
    isbn13: "978-0138221874",
    isbn10: "0138221870",
    type: "Physical",
    publisher: "Pearson",
    year: 2023,
    language: "English",
    pages: 1136,
    callNumber: "QA76.76.O63 T36 2023",
    copiesAvailable: 3,
    copiesTotal: 3,
    summary: "A comprehensive guide covering the fundamental concepts, design, and implementation of modern operating systems, including process management, virtualization, security, and storage architecture.",
    keywords: ["Operating Systems", "Process Management", "Memory Management", "File Systems", "Virtualization", "System Security"],
    cover: coverModernOperatingSystems,
    location: "Shelf A / Rack 1",
  },
  {
    bookId: "BK-1002",
    title: "It Ends with Us",
    authors: "Colleen Hoover",
    category: "Fiction",
    isbn13: "978-1501110368",
    isbn10: "1501110365",
    type: "Physical",
    publisher: "Atria Books",
    year: 2016,
    language: "English",
    pages: 384,
    callNumber: "PS3608.O623 I84 2016",
    copiesAvailable: 5,
    copiesTotal: 5,
    summary: "A deeply personal story following Lily Bloom as she navigates a complex romantic relationship while confronting childhood trauma and difficult choices regarding cycle-breaking and emotional boundaries.",
    keywords: ["Contemporary Fiction", "Romance", "Drama", "Relationships", "Domestic Violence", "Resilience"],
    cover: coverItEndsWithUs,
    location: "Shelf B / Rack 2",
  },
  {
    bookId: "BK-1003",
    title: "Introduction to Linear Algebra",
    authors: "Gilbert Strang",
    category: "Mathematics",
    isbn13: "978-0980232776",
    isbn10: "0980232775",
    type: "Physical",
    publisher: "Wellesley-Cambridge Press",
    year: 2016,
    language: "English",
    pages: 600,
    callNumber: "QA184 .S8 2016",
    copiesAvailable: 5,
    copiesTotal: 5,
    summary: "An authoritative and accessible introduction to linear algebra, emphasizing matrix theory, vector space fundamentals, and practical applications across computational science and engineering.",
    keywords: ["Linear Algebra", "Matrices", "Determinants", "Vector Spaces", "Eigenvalues", "Eigenvectors", "Singular Value Decomposition"],
    cover: coverIntroductionToLinearAlgebra,
    location: "Shelf C / Rack 1",
  },
  {
    bookId: "BK-1004",
    title: "Sapiens: A Brief History of Humankind",
    authors: "Yuval Noah Harari",
    category: "History",
    isbn13: "978-0062316097",
    isbn10: "0062316095",
    type: "Physical",
    publisher: "Harper",
    year: 2015,
    language: "English",
    pages: 464,
    callNumber: "CB25 .H37 2015",
    copiesAvailable: 4,
    copiesTotal: 4,
    summary: "A groundbreaking survey of human history exploring how Homo sapiens evolved from an insignificant ape species into the dominant force on Earth through shared myths, commerce, and scientific innovation.",
    keywords: ["Human History", "Cognitive Revolution", "Agricultural Revolution", "Scientific Revolution", "Homo Sapiens", "Anthropology"],
    cover: coverSapiens,
    location: "Shelf D / Rack 3",
  },
  {
    bookId: "BK-1005",
    title: "The Story of Art",
    authors: "E. H. Gombrich",
    category: "Art",
    isbn13: "978-0714872025",
    isbn10: "071487202X",
    type: "Physical",
    publisher: "Phaidon Press",
    year: 2016,
    language: "English",
    pages: 1048,
    callNumber: "N5300 .G64 2016",
    copiesAvailable: 3,
    copiesTotal: 3,
    summary: "A masterwork of art history introducing readers to the evolution of visual arts, from ancient cave paintings to modern movements, with detailed analysis of technique, style, and cultural influence.",
    keywords: ["Art History", "World Art", "Visual Arts", "Art Movements", "Renaissance", "Painting", "Sculpture", "Architecture"],
    cover: coverTheStoryOfArt,
    location: "Shelf E / Rack 1",
  },
  {
    bookId: "BK-1006",
    title: "Calculus: Early Transcendentals",
    authors: "James Stewart",
    category: "Mathematics",
    isbn13: "978-1285741550",
    isbn10: "1285741552",
    type: "Physical",
    publisher: "Cengage Learning",
    year: 2016,
    language: "English",
    pages: 1368,
    callNumber: "QA303.2 .S74 2016",
    copiesAvailable: 3,
    copiesTotal: 6,
    summary: "Comprehensive guide covering limits, derivatives, integrals, and vector calculus applications.",
    keywords: ["calculus", "mathematics", "functions"],
    cover: coverCalculusStewart,
    location: "Shelf C / Rack 2",
  },
  {
    bookId: "BK-1007",
    title: "Bananas",
    authors: "R.H. Stover and N.W. Simmonds",
    category: "Agriculture",
    isbn13: "978-0470206843",
    isbn10: "0470206845",
    type: "Physical",
    publisher: "Wiley",
    year: 1987,
    language: "English",
    pages: 500,
    callNumber: "SB379.B2 S76 1987",
    copiesAvailable: 1,
    copiesTotal: 2,
    summary: "Authoritative reference covering banana botany, cultivation systems, crop diseases, and plantation management.",
    keywords: ["agriculture", "botany", "crops", "bananas"],
    cover: coverBananasStover,
    location: "Shelf A / Rack 3",
  },
  {
    bookId: "BK-1008",
    title: "Harry Potter and the Sorcerer's Stone",
    authors: "J.K. Rowling",
    category: "Fiction",
    isbn13: "978-0590353403",
    isbn10: "0590353403",
    type: "Physical",
    publisher: "Arthur A. Levine Books",
    year: 1998,
    language: "English",
    pages: 320,
    callNumber: "PZ7.R7983 Ha 1998",
    copiesAvailable: 5,
    copiesTotal: 10,
    summary: "An orphaned boy discovers he is a wizard and begins his education at Hogwarts School of Witchcraft and Wizardry.",
    keywords: ["fantasy", "magic", "fiction", "wizardry"],
    cover: coverHarryPotter1,
    location: "Shelf B / Rack 4",
  },
  {
    bookId: "BK-2001",
    title: "A Brief History of Time",
    authors: "Stephen Hawking",
    category: "Science",
    isbn13: "978-0553109535",
    isbn10: "0553109537",
    type: "Digital",
    publisher: "Bantam",
    year: 1988,
    language: "English",
    pages: 212,
    callNumber: "QB981 .H377 1988 EB",
    copiesAvailable: 7,
    copiesTotal: 10,
    summary: "Landmark exploration of cosmology, black holes, the big bang, and the fundamental laws governing the universe.",
    keywords: ["cosmology", "physics", "astronomy"],
    cover: coverBriefHistoryTime,
    fileFormat: "EPUB",
    maxConcurrent: 10,
  },
  {
    bookId: "BK-2002",
    title: "Designing Data-Intensive Applications",
    authors: "Martin Kleppmann",
    category: "Technology",
    isbn13: "978-1449373320",
    isbn10: "1449373321",
    type: "Digital",
    publisher: "O'Reilly Media",
    year: 2017,
    language: "English",
    pages: 614,
    callNumber: "QA76.9.D3 K54 2017 EB",
    copiesAvailable: 10,
    copiesTotal: 10,
    summary: "Comprehensive guide to the core ideas and trade-offs behind reliable, scalable, and maintainable distributed data systems.",
    keywords: ["databases", "distributed-systems", "architecture"],
    cover: coverDesigningDataIntensive,
    fileFormat: "PDF",
    maxConcurrent: 10,
  }
];

export type Member = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  yearLevel: string;
  membershipType: "User" | "Admin";
  maxBooks: number;
  joinDate: string;
  expiryDate: string;
  status: "Active" | "Suspended" | "Expired";
  booksOut: number;
  finesOwed: number;
};

export const members: Member[] = [
  {
    userId: "2023-00145",
    firstName: "Andrea",
    lastName: "Villanueva",
    email: "andrea.v@bai.edu",
    phone: "+63 917 220 1145",
    department: "BS Computer Science",
    yearLevel: "3rd Year",
    membershipType: "User",
    maxBooks: 5,
    joinDate: "2023-08-14",
    expiryDate: "2027-06-30",
    status: "Active",
    booksOut: 2,
    finesOwed: 0,
  },
  {
    userId: "2022-00871",
    firstName: "Miguel",
    lastName: "Santos",
    email: "miguel.s@bai.edu",
    phone: "+63 918 441 8871",
    department: "BS Agriculture",
    yearLevel: "4th Year",
    membershipType: "User",
    maxBooks: 5,
    joinDate: "2022-08-02",
    expiryDate: "2026-06-30",
    status: "Active",
    booksOut: 5,
    finesOwed: 0,
  },
  {
    userId: "2021-00320",
    firstName: "Cheska",
    lastName: "Domingo",
    email: "cheska.d@bai.edu",
    phone: "+63 905 118 0320",
    department: "BA History",
    yearLevel: "4th Year",
    membershipType: "User",
    maxBooks: 5,
    joinDate: "2021-07-19",
    expiryDate: "2025-06-30",
    status: "Suspended",
    booksOut: 1,
    finesOwed: 12.5,
  },
  {
    userId: "FAC-00042",
    firstName: "Dr. Rowena",
    lastName: "Lacsina",
    email: "r.lacsina@bai.edu",
    phone: "+63 920 774 0042",
    department: "College of Science",
    yearLevel: "Faculty",
    membershipType: "Admin",
    maxBooks: 10,
    joinDate: "2016-01-11",
    expiryDate: "2030-12-31",
    status: "Active",
    booksOut: 3,
    finesOwed: 0,
  },
  {
    userId: "2024-01099",
    firstName: "Paolo",
    lastName: "Reyes",
    email: "paolo.r@bai.edu",
    phone: "+63 926 330 1099",
    department: "BS Mathematics",
    yearLevel: "1st Year",
    membershipType: "User",
    maxBooks: 5,
    joinDate: "2024-08-05",
    expiryDate: "2028-06-30",
    status: "Active",
    booksOut: 1,
    finesOwed: 3.5,
  }
];

export type Loan = {
  issueId: string;
  userId: string;
  studentName: string;
  bookTitle: string;
  assetType: AssetType;
  copyId: string;
  issueDate: string;
  dueDate: string;
  returnDate: string | null;
  status: "Issued" | "Overdue" | "Returned";
};


// TO EDIT
export const loans: Loan[] = [
  {
    issueId: "ISS-5001",
    userId: "2023-00145",
    studentName: "Andrea Villanueva",
    bookTitle: "Modern Operating Systems",
    assetType: "Physical",
    copyId: "BK-1001-002",
    issueDate: "2026-08-20",
    dueDate: "2026-09-03",
    returnDate: null,
    status: "Issued",
  },
  {
    issueId: "ISS-5002",
    userId: "2023-00145",
    studentName: "Andrea Villanueva",
    bookTitle: "A Brief History of Time",
    assetType: "Digital",
    copyId: "BK-2001",
    issueDate: "2026-08-25",
    dueDate: "2026-09-08",
    returnDate: null,
    status: "Issued",
  },
  {
    issueId: "ISS-5003",
    userId: "2021-00320",
    studentName: "Cheska Domingo",
    bookTitle: "Introduction to Linear Algebra",
    assetType: "Physical",
    copyId: "BK-1003-001",
    issueDate: "2026-07-28",
    dueDate: "2026-08-11",
    returnDate: null,
    status: "Overdue",
  },
  {
    issueId: "ISS-5004",
    userId: "2022-00871",
    studentName: "Miguel Santos",
    bookTitle: "Bananas",
    assetType: "Physical",
    copyId: "BK-1007-003",
    issueDate: "2026-08-12",
    dueDate: "2026-08-26",
    returnDate: null,
    status: "Overdue",
  },
  {
    issueId: "ISS-5005",
    userId: "FAC-00042",
    studentName: "Dr. Rowena Lacsina",
    bookTitle: "Calculus: Early Transcendentals",
    assetType: "Physical",
    copyId: "BK-1006-004",
    issueDate: "2026-08-24",
    dueDate: "2026-09-07",
    returnDate: null,
    status: "Issued",
  },
  {
    issueId: "ISS-4870",
    userId: "2023-00145",
    studentName: "Andrea Villanueva",
    bookTitle: "Designing Data-Intensive Applications",
    assetType: "Digital",
    copyId: "BK-2002",
    issueDate: "2026-06-10",
    dueDate: "2026-06-24",
    returnDate: "2026-06-21",
    status: "Returned",
  },
  {
    issueId: "ISS-4712",
    userId: "2023-00145",
    studentName: "Andrea Villanueva",
    bookTitle: "It Ends with Us",
    assetType: "Physical",
    copyId: "BK-1002-002",
    issueDate: "2026-04-02",
    dueDate: "2026-04-16",
    returnDate: "2026-04-23",
    status: "Returned",
  },
];

export type Fine = {
  fineId: string;
  issueId: string;
  userId: string;
  studentName: string;
  bookTitle: string;
  daysLate: number;
  ratePerDay: number;
  amount: number;
  paymentStatus: "Paid" | "Unpaid";
  paidDate: string | null;
};


// TO EDIT
export const fines: Fine[] = [
  {
    fineId: "FN-3001",
    issueId: "ISS-5003",
    userId: "2021-00320",
    studentName: "Cheska Domingo",
    bookTitle: "Introduction to Linear Algebra",
    daysLate: 25,
    ratePerDay: FINE_RATE_PER_DAY,
    amount: 12.5,
    paymentStatus: "Unpaid",
    paidDate: null,
  },
  {
    fineId: "FN-3002",
    issueId: "ISS-4712",
    userId: "2023-00145",
    studentName: "Andrea Villanueva",
    bookTitle: "It Ends with Us",
    daysLate: 7,
    ratePerDay: FINE_RATE_PER_DAY,
    amount: 3.5,
    paymentStatus: "Paid",
    paidDate: "2026-04-23",
  },
  {
    fineId: "FN-3003",
    issueId: "ISS-4655",
    userId: "2024-01099",
    studentName: "Paolo Reyes",
    bookTitle: "Calculus: Early Transcendentals",
    daysLate: 7,
    ratePerDay: FINE_RATE_PER_DAY,
    amount: 3.5,
    paymentStatus: "Unpaid",
    paidDate: null,
  },
];

export const categories = [
  "Agriculture",
  "Art",
  "Fiction",
  "History",
  "Mathematics",
  "Science",
  "Technology",
];

export const locations = [
  "Shelf A / Rack 1",
  "Shelf A / Rack 2",
  "Shelf A / Rack 3",
  "Shelf A / Rack 4",
  "Shelf A / Rack 5",
  "Shelf B / Rack 1",
  "Shelf B / Rack 2",
  "Shelf B / Rack 3",
  "Shelf B / Rack 4",
  "Shelf B / Rack 5",
  "Shelf C / Rack 1",
  "Shelf C / Rack 2",
  "Shelf C / Rack 3",
  "Shelf C / Rack 4",
  "Shelf C / Rack 5",
  "Shelf D / Rack 1",
  "Shelf D / Rack 2",
  "Shelf D / Rack 3",
  "Shelf D / Rack 4",
  "Shelf D / Rack 5"
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
  { title: "Modern Operating Systems", loans: 62 },
  { title: "Calculus: Early Transcendentals", loans: 54 },
  { title: "Sapiens: A Brief History of Humankind", loans: 47 },
  { title: "It Ends with Us", loans: 33 },
  { title: "Bananas", loans: 29 },
];

export const currentStudent = members[0]!;

export const notifications = [
  { id: 1, text: "Bananas is overdue by 5 days.", tone: "danger" },
  { id: 2, text: "Modern Operating Systems is due in 3 days.", tone: "warning" },
  { id: 3, text: "Reserve request approved: Calculus: Early Transcendentals.", tone: "success" },
];