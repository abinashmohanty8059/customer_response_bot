/**
 * Formats a ISO date string into a relative time representation.
 * Handles "Just now", "X min ago", "X hours ago", "Yesterday", and full date fallbacks.
 */
export function formatRelativeTime(dateStr) {
  if (!dateStr) return '';
  
  try {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    
    // Safety check for future dates
    if (diffMs < 0) return 'Just now';
    
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    
    if (diffSecs < 60) {
      return 'Just now';
    }
    
    if (diffMins < 60) {
      return `${diffMins} min ago`;
    }
    
    if (diffHours < 24) {
      return diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`;
    }
    
    // Check if it was yesterday
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    
    if (
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear()
    ) {
      return 'Yesterday';
    }
    
    // Fallback to absolute date
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (error) {
    console.error('Error formatting relative time:', error);
    return dateStr;
  }
}
