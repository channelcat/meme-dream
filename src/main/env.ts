
const nodeEnv = process.env.NODE_ENV
export const isProd = nodeEnv == 'production'
export const isTest = nodeEnv == 'testing'
export const isDev = nodeEnv == 'development'