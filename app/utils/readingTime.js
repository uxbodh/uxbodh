export function getReadingTime(text) {
    const wordsPerMinute = 200;
    const words = text
        .replace(/<[^>]*>/g, "") // remove HTML tags (important for TinyMCE)
        .trim()
        .split(/\s+/).length;

    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
}
