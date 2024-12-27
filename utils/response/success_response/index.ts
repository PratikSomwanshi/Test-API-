import { SuccessCode } from 'utils/enums/success_code';

export function successResponse(
  explanation: string,
  data: any,
  successCode: SuccessCode,
) {
  return {
    status: true,
    success: {
      explanation,
      code: successCode,
    },
    error: {
      code: null,
      explanation: null,
    },
    data: data,
  };
}
