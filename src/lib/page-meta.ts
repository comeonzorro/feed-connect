import { useEffect } from "react";

const SITE_URL = "https://www.feedme.social";

type PageMeta = {
  title: string;
  description: string;
  path?: string;
  noindex?: boolean;
};

function upsertMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let tag = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.content = content;
}

function upsertCanonical(href: string) {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = href;
}

export function usePageMeta({ title, description, path = "", noindex = false }: PageMeta) {
  useEffect(() => {
    document.title = title;
    upsertMeta("description", description);
    upsertMeta("robots", noindex ? "noindex, nofollow" : "index, follow");
    upsertMeta("og:title", title, "property");
    upsertMeta("og:description", description, "property");
    upsertMeta("og:url", `${SITE_URL}${path}`, "property");
    upsertCanonical(`${SITE_URL}${path || "/"}`);
  }, [title, description, path, noindex]);
}
