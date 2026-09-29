import { NestFactory } from '@nestjs/core'
import { Logger, ValidationPipe } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'
import { envs } from './config/envs'
import { RpcExceptionFilter } from './common/exceptions/rpc-exception.filter'

async function bootstrap() {
  const logger = new Logger()
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.setGlobalPrefix('api/v1')

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  )
  app.useGlobalFilters(new RpcExceptionFilter())
  const config = new DocumentBuilder()
    .setTitle('BarberShop API Microservices')
    .setDescription('Proyecto para Arquitectura Orientada a Servicios')
    .setVersion('1.0')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('doc', app, document, {
    customSiteTitle: 'BarberShop API Microservices',
    customfavIcon:
      'https://static1.smartbear.co/swagger/media/assets/swagger_fav.png',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.js',
    ],
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.min.css',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.css',
    ],
  })
  await app.listen(envs.port)
  logger.log(`Gateway is running on: ${envs.port}`)
}

bootstrap()
