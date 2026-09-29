# BarberShop · API Gateway

Única puerta de entrada al sistema de gestión de la barbería. El navegador habla
solo con este servicio por HTTPS; él autentica, valida y reenvía cada petición
por TCP al microservicio dueño del dominio.

No tiene base de datos ni lógica de negocio propia: su trabajo es resolver la
sesión, validar la entrada, enrutar y componer la respuesta.

## Cómo está armado

```
Navegador ──HTTPS──▶ API Gateway ──TCP──▶ ms-users
                          │     ├────────▶ ms-appointments
                          │     ├────────▶ ms-services
                          │     ├────────▶ ms-payments
                          │     └────────▶ ms-analytics
                          └──▶ Cloudinary (imágenes)
```

Cada módulo registra su cliente con `ClientsModule` y `Transport.TCP`, apuntando
al host y puerto que le corresponde. Los nombres viven en un enum (`Services`),
así que ningún módulo conoce la dirección de otro.

| Módulo | Qué expone |
|---|---|
| `auth` | Login, registro y refresco de token |
| `users` | Usuarios y clientes |
| `appointments` | Citas y disponibilidad |
| `services` | Catálogo de servicios y productos |
| `payments` | Pagos |
| `analytics` | Métricas del negocio |
| `providers/cloudinary` | Subida de imágenes |

## Stack

NestJS · TypeScript · `@nestjs/microservices` (TCP) · JWT con refresh ·
Swagger · class-validator y class-transformer · Joi para validar el entorno ·
Cloudinary · bcryptjs

## Decisiones que vale la pena mirar

- **`src/main.ts`** — prefijo global `api/v1`, CORS, `ValidationPipe` con
  `whitelist` para descartar campos no declarados, y un filtro propio
  (`RpcExceptionFilter`) que traduce los errores que llegan de los
  microservicios a respuestas HTTP con sentido.
- **`src/config/envs.ts`** — el entorno se valida con Joi **al arrancar**. Si
  falta la dirección de un microservicio o un secreto, el proceso no levanta en
  vez de fallar en la primera petición.
- **`src/*/[modulo].module.ts`** — el patrón se repite en los seis: registrar el
  cliente TCP, exponer el controlador, y nada más.

## Cómo levantarlo

```bash
npm install
npm run start:dev
```

Necesita un `.env` con el puerto propio, el host y puerto de los cinco
microservicios, los dos secretos de JWT y las credenciales de Cloudinary. La
lista exacta está en `src/config/envs.ts`.

La documentación de la API queda en `http://localhost:<PORT>/doc`.

Otros comandos: `npm run build`, `npm run start:prod`, `npm run lint`,
`npm run format`, `npm test`.

## El resto del sistema

| Repositorio | Qué hace |
|---|---|
| [barbershop-frontend](https://github.com/Edd2604/barbershop-frontend) | Interfaz web en Next.js |
| [barbershop-ms-users](https://github.com/Edd2604/barbershop-ms-users) | Usuarios y clientes |
| [barbershop-ms-appointments](https://github.com/Edd2604/barbershop-ms-appointments) | Citas y disponibilidad |
| [barbershop-ms-services](https://github.com/Edd2604/barbershop-ms-services) | Catálogo de servicios y productos |
| [barbershop-ms-payments](https://github.com/Edd2604/barbershop-ms-payments) | Pagos |
| [barbershop-ms-analytics](https://github.com/Edd2604/barbershop-ms-analytics) | Métricas del negocio |

---
