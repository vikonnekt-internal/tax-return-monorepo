// eslint-disable-next-line import/no-unresolved
import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import {
  gql,
  GraphQLClient,
  request,
  ResponseMiddleware,
  Variables,
} from 'graphql-request';
import {
  GraphQLClientResponse,
  RequestMiddleware,
} from 'graphql-request/build/esm/types';

type ExtractVariables<Type> =
  Type extends TypedDocumentNode<unknown, infer V> ? V : never;

type ExtractResult<Type> =
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Type extends TypedDocumentNode<infer R, infer V> ? R : never;

export function createRequest(client: GraphQLClient) {
  return <D>(DOCUMENT: D, requestHeaders?: Headers | undefined) => {
    return (
      variables: ExtractVariables<D>,
      _client?: GraphQLClient,
    ): Promise<ExtractResult<D>> => {
      if (_client) {
        return _client.request<ExtractResult<D>>(
          DOCUMENT as TypedDocumentNode<ExtractResult<D>, ExtractVariables<D>>,
          variables as Variables,
          requestHeaders,
        );
      }
      return client.request<ExtractResult<D>>(
        DOCUMENT as TypedDocumentNode<ExtractResult<D>, ExtractVariables<D>>,
        variables as Variables,
        requestHeaders,
      );
    };
  };
}

function createErrorMiddleware(
  action?: (error: GraphQLClientResponse<unknown>) => void,
) {
  const responseMiddleware: ResponseMiddleware = (response) => {
    if (action) {
      action(response as GraphQLClientResponse<unknown>);
    }
  };

  return responseMiddleware;
}

const defaultRequestMiddleware: RequestMiddleware = async (request) => request;

export function createGraphqlClient({
  endpoint,
  token,
  errorAction,
  requestMiddleware,
}: {
  endpoint: string;
  token?: string;
  errorAction?: (error: GraphQLClientResponse<unknown>) => void;
  requestMiddleware?: RequestMiddleware;
}) {
  const responseMiddleware = createErrorMiddleware(errorAction);

  const abortController = new AbortController();
  const client = new GraphQLClient(endpoint, {
    errorPolicy: 'all',
    headers: {
      authorization: `Bearer ${token}`,
    },
    signal: abortController.signal,
    responseMiddleware,
    requestMiddleware: requestMiddleware || defaultRequestMiddleware,
  });
  return { client, abortController };
}

export { request, gql, GraphQLClient };
export type { RequestMiddleware, Variables, ExtractVariables, ExtractResult };
