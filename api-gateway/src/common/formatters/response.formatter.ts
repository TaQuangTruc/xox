export class ResponseFormatter {
  static success<T>(message: string, data: T): ApiResponse<T> {
    return {
      status: 'success',
      message,
      data,
    };
  }

  static error(message: string, errors: string[] = []): ApiResponse<null> {
    return {
      status: 'error',
      message,
      errors,
    };
  }
}
