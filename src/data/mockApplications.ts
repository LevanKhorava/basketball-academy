import type { Application } from "../lib/applicationsApi";

// ---------------------------------------------------------------------------
// დეველოპერული (mock) მონაცემები — ჩანს მხოლოდ მაშინ, როცა Supabase არ არის
// კონფიგურირებული და src/config.ts-ში USE_DEV_MOCKS = true. არსად არ ინახება.
// Clearly fake: example.com emails, "mock-" ids. Admin dashboard preview only;
// the public registration form never touches this data.
// ---------------------------------------------------------------------------

export const mockApplications: Application[] = [
  {
    id: "mock-0001",
    firstName: "გიორგი",
    lastName: "ბერიძე",
    email: "giorgi.beridze@example.com",
    phone: "+995555123456",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    youtubeVideoId: "dQw4w9WgXcQ",
    status: "pending",
    createdAt: "2026-10-26T15:40:00.000Z",
    updatedAt: "2026-10-26T15:40:00.000Z",
  },
  {
    id: "mock-0002",
    firstName: "ლუკა",
    lastName: "მაისურაძე",
    email: "luka.maisuradze@example.com",
    phone: "+995577654321",
    youtubeUrl: "https://youtu.be/jNQXAC9IVRw",
    youtubeVideoId: "jNQXAC9IVRw",
    status: "reviewing",
    createdAt: "2026-10-25T11:05:00.000Z",
    updatedAt: "2026-10-26T09:12:00.000Z",
  },
  {
    id: "mock-0003",
    firstName: "ნიკა",
    lastName: "კაპანაძე",
    email: "nika.kapanadze@example.com",
    phone: "+995591112233",
    youtubeUrl: "https://www.youtube.com/shorts/9bZkp7q19f0",
    youtubeVideoId: "9bZkp7q19f0",
    status: "reviewed",
    createdAt: "2026-10-23T18:25:00.000Z",
    updatedAt: "2026-10-24T10:00:00.000Z",
  },
  {
    id: "mock-0004",
    firstName: "საბა",
    lastName: "გელაშვილი",
    email: "saba.gelashvili@example.com",
    phone: "+995599887766",
    youtubeUrl: "https://m.youtube.com/watch?v=M7lc1UVf-VE",
    youtubeVideoId: "M7lc1UVf-VE",
    status: "pending",
    createdAt: "2026-10-22T08:50:00.000Z",
    updatedAt: "2026-10-22T08:50:00.000Z",
  },
  {
    id: "mock-0005",
    firstName: "დათო",
    lastName: "წიკლაური",
    email: "dato.tsiklauri@example.com",
    phone: "+995514445566",
    youtubeUrl: "https://www.youtube.com/watch?v=kJQP7kiw5Fk&t=42s",
    youtubeVideoId: "kJQP7kiw5Fk",
    status: "pending",
    createdAt: "2026-10-20T13:15:00.000Z",
    updatedAt: "2026-10-20T13:15:00.000Z",
  },
];
