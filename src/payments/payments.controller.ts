import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Inject,
  Query,
} from '@nestjs/common'
import { Services } from 'src/config/services'
import { ClientProxy } from '@nestjs/microservices'
import { ValidateId } from 'src/common/pipes/validate-id.pipe'

import { CreatePaymentDto } from './dto/create-payment.dto'
import { PaymentsQueryDto } from './dto/payments-query.dto'

@Controller('payments')
export class PaymentsController {
  constructor(
    @Inject(Services.PAYMENTS_MS)
    private readonly paymentsService: ClientProxy,
  ) {}

  @Post('create-payment')
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.send('create-payment', createPaymentDto)
  }

  @Get('get-all-payments')
  findAll(@Query() paymentsQueryDto: PaymentsQueryDto) {
    return this.paymentsService.send('get-all-payments', paymentsQueryDto)
  }

  @Get(':id/get-payment-by-id')
  findOne(@Param('id', ValidateId) id: number) {
    return this.paymentsService.send('get-one-payment', id)
  }
}
