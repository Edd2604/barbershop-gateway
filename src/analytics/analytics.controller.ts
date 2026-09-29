import { Controller, Get, Inject } from '@nestjs/common'
import { ClientProxy, RpcException } from '@nestjs/microservices'
import { catchError } from 'rxjs'
import { Services } from 'src/config/services'

@Controller('analytics')
export class AnalyticsController {
  constructor(
    @Inject(Services.ANALYTICS_MS) private readonly analytics: ClientProxy,
  ) {}

  @Get('get-top-customers')
  getTopCustomers() {
    return this.analytics.send('get-top-customers', {}).pipe(
      catchError((e) => {
        throw new RpcException(e)
      }),
    )
  }
  @Get('get-customers-per-month')
  getCustomersPerMonth() {
    return this.analytics.send('get-customers-per-month', {}).pipe(
      catchError((e) => {
        throw new RpcException(e)
      }),
    )
  }

  @Get('get-top-services')
  getTopServices() {
    return this.analytics.send('get-top-services', {}).pipe(
      catchError((e) => {
        throw new RpcException(e)
      }),
    )
  }

  @Get('get-top-barbers')
  getTopBarbers() {
    return this.analytics.send('get-top-barbers', {}).pipe(
      catchError((e) => {
        throw new RpcException(e)
      }),
    )
  }

  @Get('get-payments-analytics')
  getPaymentAnalytics() {
    return this.analytics.send('get-payments-analytics', {}).pipe(
      catchError((e) => {
        throw new RpcException(e)
      }),
    )
  }

  @Get('get-payments-analytics-summary')
  getPaymentAnalyticsSummary() {
    return this.analytics.send('get-payments-analytics-summary', {}).pipe(
      catchError((e) => {
        throw new RpcException(e)
      }),
    )
  }
  @Get('get-barbers-percentage')
  getBarbersPercentage() {
    return this.analytics.send('get-barbers-percentage', {}).pipe(
      catchError((e) => {
        throw new RpcException(e)
      }),
    )
  }
  @Get('get-services-percentage')
  getServicesPercentage() {
    return this.analytics.send('get-services-percentage', {}).pipe(
      catchError((e) => {
        throw new RpcException(e)
      }),
    )
  }
  @Get('get-customers-registered')
  getCustomersRegistered() {
    return this.analytics.send('get-customers-registered', {}).pipe(
      catchError((e) => {
        throw new RpcException(e)
      }),
    )
  }
}
