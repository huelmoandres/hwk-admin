export const isVideoUrl = (url: string): boolean => {
  const videoExtensions = ['.mp4', '.mov', '.avi', '.mkv', '.webm', '.flv', '.wmv', '.mpeg'];
  const lowerUrl = url.toLowerCase();

  return videoExtensions.some(ext => lowerUrl.endsWith(ext));
}