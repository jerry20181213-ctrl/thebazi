const BOOKS = [
  {
    title: "Ba Zi: The Destiny Code Revealed",
    subtitle: "Four Pillars of Destiny for Beginners",
    asin: "9833332382",
    price: "$29.95",
    image: "/books/destiny-code.jpg",
  },
  {
    title: "The Chinese Zodiac",
    subtitle: "Paths to Luck, Riches & Prosperity",
    asin: "0762480440",
    price: "$19.99",
    image: "/books/chinese-zodiac.jpg",
  },
  {
    title: "Ba Zi – The Four Pillars of Destiny",
    subtitle: "Understanding Character & Relationships",
    asin: "1848192908",
    price: "$24.95",
    image: "/books/four-pillars.jpg",
  },
  {
    title: "Calculating the BaZi",
    subtitle: "The GanZhi/Chinese Astrology Workbook",
    asin: "1848193122",
    price: "$22.95",
    image: "/books/calculating-bazi.jpg",
  },
];

export default function BookAffiliates({ className = "" }: { className?: string }) {
  const tag = "thebazi-20";
  const baseUrl = "https://www.amazon.com/dp";

  return (
    <div className={`rounded-xl border border-zinc-200 bg-white p-5 ${className}`}>
      <p className="text-xs text-zinc-400 mb-3">
        As an Amazon Associate we earn from qualifying purchases.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {BOOKS.map((book) => (
          <a
            key={book.asin}
            href={`${baseUrl}/${book.asin}?tag=${tag}`}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="flex items-start gap-3 rounded-lg border border-zinc-100 p-3 transition-colors hover:border-zinc-300"
          >
            <div className="flex h-16 w-12 shrink-0 items-center justify-center rounded bg-zinc-100 text-2xl">
              📖
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-zinc-900 truncate">{book.title}</p>
              <p className="text-xs text-zinc-500">{book.subtitle}</p>
              <p className="text-xs text-red-600 mt-1">{book.price}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
