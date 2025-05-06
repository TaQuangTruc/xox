interface ApiResponse<T> {
  status: string;       // 'success' | 'error'
  message: string;
  data?: T | null;
  errors?: string[];
}