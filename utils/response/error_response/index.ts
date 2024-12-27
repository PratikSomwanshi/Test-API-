import { ErrorCode } from 'utils/enums/error_code';

export function errorResponse(explanation: string, errorCode: ErrorCode) {
  return {
    status: false,
    error: {
      explanation,
      code: errorCode,
    },
    data: [],
    timestamp: new Date().toISOString(),
  };
}
