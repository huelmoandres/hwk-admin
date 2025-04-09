export interface MLPicture {
  id: number;
  pictureId: string;
  url: string;
  secureUrl: string;
  size: string;
  maxSize: string;
  quality: string;
  productId: number;
}

export interface MLOriginalPicture {
  id: string;
  url: string;
  secure_url: string;
  size: string;
  max_size: string;
  quality: string;
}