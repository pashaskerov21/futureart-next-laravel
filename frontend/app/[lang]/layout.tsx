import { LocaleType } from "@/src/types/general/type";

export default function Root({ children, params }: { children: React.ReactNode; params: { lang: LocaleType }; }) {
  return (
    <>
      {children}
    </>
  );
}

