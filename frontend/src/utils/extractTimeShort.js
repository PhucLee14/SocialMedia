export function extractTimeShort(dateString) {
    const now = new Date();
    const createdAt = new Date(dateString);
    const diffInMs = now - createdAt;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInYears = now.getFullYear() - createdAt.getFullYear();

    if (diffInMinutes < 60) {
        return `${diffInMinutes}m`;
    } else if (diffInHours < 24) {
        return `${diffInHours}h`;
    } else if (diffInDays < 365) {
        return `${diffInDays}d`;
    } else {
        return `${diffInYears}y`;
    }
}
