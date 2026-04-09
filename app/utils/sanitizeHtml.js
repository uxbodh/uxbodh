export function sanitizeHtml(html) {
    if (typeof window === "undefined") {
        return html; // SSR fallback
    }

    const DOMPurify = require("dompurify")(window);
    return DOMPurify.sanitize(html);
}
