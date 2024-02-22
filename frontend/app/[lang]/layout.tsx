import { LocaleType } from "../../src/types";


export default function Root({ children, params }: { children: React.ReactNode; params: { lang: LocaleType }; }) {
  return (
    <>
      {children}
    </>
  );
}

