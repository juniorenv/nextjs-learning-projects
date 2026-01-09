import Link from "next/link";

export default async function NewsArticle({
  params,
  searchParams,
}: {
  params: Promise<{ articleId: string }>;
  searchParams: Promise<{ lang?: string }>;
}) {
  const { articleId } = await params;
  const { lang } = await searchParams;

  const validLang = lang === "pt" || lang === "fr" ? lang : "en";
  return (
    <div>
      <h1>News article {articleId}</h1>
      <p>Reading in {validLang}</p>

      <div>
        <Link href={`/articles/${articleId}?lang=en`}>English</Link>
        <Link href={`/articles/${articleId}?lang=pt`}>Portuguese</Link>
        <Link href={`/articles/${articleId}?lang=fr`}>French</Link>
      </div>
    </div>
  );
}
