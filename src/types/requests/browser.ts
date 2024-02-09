import { FastifySchema } from 'fastify';
import { engineList } from '../../handlers/main';
import { FromSchema } from 'json-schema-to-ts';

export interface IGetSchema {
  Querystring: IGetQuerySchema;
}

export interface IProxySchema {
  Querystring: IProxyQuerySchema;
}

export interface ISearchSchema {
  Querystring: ISearchQuerySchema;
}

export const searchQuerySchema = {
  type: 'object',
  required: ['q'],
  properties: {
    q: {
      type: 'string',
      description: 'Search query',
    },
  },
} as const;
export type ISearchQuerySchema = FromSchema<typeof searchQuerySchema>;

export const getQuerySchema = {
  type: 'object',
  required: ['url'],
  properties: {
    url: {
      type: 'string',
      description: 'URL',
    },
    format: {
      type: 'string',
      enum: ['text', 'html', ''],
      default: 'html',
    },
    engine: {
      type: 'string',
      enum: [...engineList, ''],
    },
  },
} as const;
export type IGetQuerySchema = FromSchema<typeof getQuerySchema>;

export const proxyQuerySchema = {
  type: 'object',
  required: ['url'],
  properties: {
    url: {
      type: 'string',
      description: 'URL',
    },
  },
} as const;
export type IProxyQuerySchema = FromSchema<typeof proxyQuerySchema>;

export const indexSchema = {
  hide: true,
  produces: ['text/html'],
};

export const searchSchema: FastifySchema = {
  description: 'Search redirection page',
  hide: true,
  querystring: searchQuerySchema,
};

export const GetSchema: FastifySchema = {
  description: 'Get page',
  hide: true,
  querystring: getQuerySchema,
  produces: ['text/html', 'text/plain'],
};

export const ProxySchema: FastifySchema = {
  description: 'Proxy resource',
  hide: true,
  querystring: proxyQuerySchema,
};
