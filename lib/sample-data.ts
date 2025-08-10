export type EventItem = {
  id: string
  title: string
  imageUrl: string
  date: string
  location: string
  city: string
  category: "Music" | "College" | "Tech" | "Conference"
  tier?: "VIP" | "General"
  price: string
  verified?: boolean
  tiers: { name: string; price: number; supply: number }[]
}

export const sampleEvents: EventItem[] = [
  {
    id: "evt-1",
    title: "Campus Fest 2025",
    imageUrl: "/images/event-campus-fest.png",
    date: "Sep 21, 7:00 PM",
    location: "IIT Campus Arena",
    city: "Mumbai",
    category: "College",
    tier: "General",
    price: "$25",
    verified: true,
    tiers: [
      { name: "General", price: 25, supply: 180 },
      { name: "VIP", price: 60, supply: 40 },
    ],
  },
  {
    id: "evt-2",
    title: "Tech Conference Night",
    imageUrl: "/images/event-tech-night.png",
    date: "Oct 03, 9:00 AM",
    location: "City Expo Center",
    city: "Bengaluru",
    category: "Conference",
    tier: "VIP",
    price: "$120",
    verified: true,
    tiers: [
      { name: "General", price: 99, supply: 220 },
      { name: "VIP", price: 199, supply: 60 },
    ],
  },
  {
    id: "evt-3",
    title: "Indie Beats Live",
    imageUrl: "/images/event-indie-beats.png",
    date: "Nov 11, 8:30 PM",
    location: "Bluebird Hall",
    city: "Delhi",
    category: "Music",
    tier: "General",
    price: "$35",
    verified: true,
    tiers: [
      { name: "General", price: 35, supply: 120 },
      { name: "VIP", price: 75, supply: 30 },
    ],
  },
]
