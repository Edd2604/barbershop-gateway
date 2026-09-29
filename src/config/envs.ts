import 'dotenv/config'
import * as joi from 'joi'

interface EnvVariables {
  PORT: number
  USERS_MS_HOST: string
  USERS_MS_PORT: number
  APPOINTMENTS_MS_HOST: string
  APPOINTMENTS_MS_PORT: number
  SERVICES_MS_HOST: string
  SERVICES_MS_PORT: number
  PAYMENTS_MS_HOST: string
  PAYMENTS_MS_PORT: number
  ANALYTICS_MS_HOST: string
  ANALYTICS_MS_PORT: number
  JWT_SECRET: string
  JWT_REFRESH_SECRET: string
  CLOUDINARY_NAME: string
  CLOUDINARY_API_KEY: string
  CLOUDINARY_API_SECRET: string
}

const envSchema = joi
  .object({
    PORT: joi.number().required(),
    USERS_MS_HOST: joi.string().required(),
    USERS_MS_PORT: joi.string().required(),
    JWT_SECRET: joi.string().required(),
    JWT_REFRESH_SECRET: joi.string().required(),
    APPOINTMENTS_MS_HOST: joi.string().required(),
    APPOINTMENTS_MS_PORT: joi.string().required(),
    SERVICES_MS_HOST: joi.string().required(),
    SERVICES_MS_PORT: joi.string().required(),
    PAYMENTS_MS_HOST: joi.string().required(),
    PAYMENTS_MS_PORT: joi.string().required(),
    ANALYTICS_MS_HOST: joi.string().required(),
    ANALYTICS_MS_PORT: joi.number().required(),
    CLOUDINARY_NAME: joi.string().required(),
    CLOUDINARY_API_KEY: joi.string().required(),
    CLOUDINARY_API_SECRET: joi.string().required(),
  })
  .unknown(true)

const { error, value } = envSchema.validate(process.env)

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}
const envVariables: EnvVariables = value

export const envs = {
  port: envVariables.PORT,
  usersMsHost: envVariables.USERS_MS_HOST,
  usersMsPort: envVariables.USERS_MS_PORT,
  servicesMsHost: envVariables.SERVICES_MS_HOST,
  servicesMsPort: envVariables.SERVICES_MS_PORT,
  appointmentsMsHost: envVariables.APPOINTMENTS_MS_HOST,
  appointmentsMsPort: envVariables.APPOINTMENTS_MS_PORT,
  paymentsMsHost: envVariables.PAYMENTS_MS_HOST,
  paymentsMsPort: envVariables.PAYMENTS_MS_PORT,
  analyticsMsHost: envVariables.ANALYTICS_MS_HOST,
  analyticsMsPort: envVariables.ANALYTICS_MS_PORT,
  jwtSecret: envVariables.JWT_SECRET,
  jwtRefreshSecret: envVariables.JWT_REFRESH_SECRET,
  cloudinaryName: envVariables.CLOUDINARY_NAME,
  cloudinaryApiKey: envVariables.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: envVariables.CLOUDINARY_API_SECRET,
}
