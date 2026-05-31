export default function DonateButton({ text = "☕ Buy us a coffee" }: { text?: string }) {
  return (
    <a
      href="https://ko-fi.com/thebazi"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-lg bg-[#FF5E5B] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#E04E4B]"
    >
      <span aria-hidden="true">☕</span>
      {text}
    </a>
  );
}
