import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "../analytics";

/**
 * Hook that tracks page views on every route change in a React Router SPA.
 * Place this once in a component that is always mounted (e.g. SiteLayout or App).
 */
export default function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    // Send a page_view event to GA4 whenever the path changes
    trackPageView(location.pathname + location.search);
  }, [location]);
}
