export interface DecodedJwt {
    userId: string;
    name: string;
    email: string;
    role: string[];
    isAdmin: boolean;
    iat: number;
    exp: number;
  }


export const MAX_SIZE = 50 * 1024 * 1024;

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}