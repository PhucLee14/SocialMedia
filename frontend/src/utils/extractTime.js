export function extractTime(dateString) {
    const now = new Date();
    const createdAt = new Date(dateString);
    const diffInMs = now - createdAt;
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInYears = now.getFullYear() - createdAt.getFullYear();

    if (diffInMinutes < 60) {
        return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
    } else if (diffInHours < 24) {
        return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    } else if (diffInDays < 365) {
        return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    } else {
        return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
    }
}
