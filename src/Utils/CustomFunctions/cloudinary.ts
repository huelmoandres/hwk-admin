export const getCloudinaryVideoThumbnail = (url: string): string => {
  return url
    .replace('/video/upload/', '/video/upload/so_1/')
    .replace(/\.(mp4|mov|avi|mkv|webm|flv|wmv|mpeg)$/i, '.jpg');
}