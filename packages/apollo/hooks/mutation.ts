import {
  QueryClient,
  UseMutationOptions,
  useMutation as useMutationRQ,
} from '@tanstack/react-query';

export interface CustomError {
  message: string;
  response: {
    errors: {
      message: string;
      code: string;
      statusCode: number;
    }[];
  };
}

export function useMutation<
  TData = unknown,
  TError = CustomError,
  TVariables = void,
  TContext = unknown,
>(
  options: UseMutationOptions<TData, TError, TVariables, TContext>,
  queryClient?: QueryClient,
) {
  return useMutationRQ(options, queryClient);
}

export type { UseMutationResult, DefaultError } from '@tanstack/react-query';
