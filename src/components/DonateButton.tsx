interface DonateButtonProps {
  text?: string;
  variant?: "default" | "compact" | "inline";
}

export default function DonateButton({ text, variant = "default" }: DonateButtonProps) {
  if (variant === "compact") {
    return (
      <a
        href="https://ko-fi.com/thebazi"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-lg bg-[#FF5E5B] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#E04E4B]"
      >
        <span aria-hidden="true">☕</span>
        {text || "Buy us a coffee"}
      </a>
    );
  }

  return (
    <a
      href="https://ko-fi.com/thebazi"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-lg bg-[#FF5E5B] px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#E04E4B] shadow-sm hover:shadow-md"
    >
      <span aria-hidden="true" className="text-lg">☕</span>
      <span>{text || "Buy us a coffee"}</span>
    </a>
  );
}
