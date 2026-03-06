import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BASE_TITLE = "Bingepedia";
const BASE_URL = "https://bingepedia.vercel.app";

function setMetaTag(name, content) {
  if (!content) return;
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function setCanonical(url) {
  if (!url) return;
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", url);
}

export function useSeo({ title, description }) {
  const location = useLocation();

  useEffect(() => {
    const fullTitle = title ? `${title} | ${BASE_TITLE}` : BASE_TITLE;
    document.title = fullTitle;

    if (description) {
      setMetaTag("description", description);
      setMetaTag("twitter:description", description);
      setMetaTag("og:description", description);
    }

    const canonicalUrl = `${BASE_URL}${location.pathname}${location.search}`;
    setCanonical(canonicalUrl);
  }, [title, description, location]);
}

