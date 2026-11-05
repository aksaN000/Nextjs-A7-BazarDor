import Link from "next/link";
import { FiInfo } from "react-icons/fi";

type Props = {
  title: string;
  message: string;
  link?: { href: string; label: string };
};

export default function FormHint({ title, message, link }: Props) {
  return (
    <div role="alert" className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
      <FiInfo className="mt-0.5 size-4 shrink-0" />
      <div>
        <p className="font-semibold">{title}</p>
        <p className="mt-0.5">{message}</p>
        {link && (
          <Link href={link.href} className="mt-1 inline-block font-semibold text-brand hover:underline">
            {link.label}
          </Link>
        )}
      </div>
    </div>
  );
}
