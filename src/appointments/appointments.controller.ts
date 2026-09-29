import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Inject,
} from '@nestjs/common'
import { ValidateId } from 'src/common/pipes/validate-id.pipe'
import { ValidateDate } from 'src/common/pipes/validate-date.pipe'
import { Services } from 'src/config/services'
import { ClientProxy } from '@nestjs/microservices'
import { PaginatedQueryDto } from 'src/common/dto/paginated-query.dto'

import { UpdateAppointmentDto } from './dto/update-appointment.dto'
import { CreateAppointmentDto } from './dto/create-appointment.dto'
import { AppointmentQueryDto } from './dto/appointment-query.dto'
import { CreateAppointmentByAdminDto } from './dto/create-appointment-by-admin.dto'

@Controller('appointments')
export class AppointmentsController {
  constructor(
    @Inject(Services.APPOINTMENTS_MS)
    private readonly appointmentsService: ClientProxy,
  ) {}

  @Post('create-appointment')
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.send(
      'create-appointment',
      createAppointmentDto,
    )
  }

  @Post('create-appointment-by-admin')
  createByAdmin(@Body() dto: CreateAppointmentByAdminDto) {
    return this.appointmentsService.send('create-appointment-by-admin', dto)
  }

  @Get('get-all-appointment')
  findAll(@Query() params: AppointmentQueryDto) {
    return this.appointmentsService.send('get-all-appointments', params)
  }

  @Get(':date/get-appointments-by-day')
  findAllAppointementByDate(@Param('date', ValidateDate) date: Date) {
    return this.appointmentsService.send('get-appointments-by-day', { date })
  }

  @Get('get-appointments-request')
  findAppointmentsRequest(@Query() query: PaginatedQueryDto) {
    return this.appointmentsService.send('get-appointments-request', query)
  }

  @Get('get-available-appointments')
  findAvailableAppointments() {
    return this.appointmentsService.send('get-available-appointments', {})
  }

  @Get('get-appointments-today')
  findAllAppointmentsToday() {
    return this.appointmentsService.send('get-appointments-today', {})
  }

  @Get(':barberId/get-appointments-by-barber')
  findAllAppointmentsByBarber(@Param('barberId', ValidateId) barberId: number) {
    return this.appointmentsService.send('get-appointments-by-barber', {
      barberId,
    })
  }

  @Get(':customerId/get-appointments-by-customer')
  findAllAppointmentsByUser(
    @Param('customerId', ValidateId) customerId: number,
  ) {
    return this.appointmentsService.send('get-appointments-by-customer', {
      customerId,
    })
  }

  @Get(':id/get-appointment-by-id')
  findOne(@Param('id', ValidateId) id: number) {
    return this.appointmentsService.send('get-appointment-by-id', { id })
  }

  @Patch(':id/update-appointment')
  update(
    @Param('id', ValidateId) id: number,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentsService.send('update-appointment', {
      id,
      ...updateAppointmentDto,
    })
  }

  @Delete(':id/remove-appointment')
  remove(@Param('id', ValidateId) id: number) {
    return this.appointmentsService.send('remove-appointment', { id })
  }

  @Patch(':id/confirm-appointment')
  confirmAppointment(@Param('id', ValidateId) id: number) {
    return this.appointmentsService.send('confirm-appointment', {
      id,
    })
  }

  @Patch(':id/start-appointment')
  startAppointment(@Param('id', ValidateId) id: number) {
    return this.appointmentsService.send('start-appointment', {
      id,
    })
  }

  @Patch(':id/cancel-appointment')
  cancelAppointment(@Param('id', ValidateId) id: number) {
    return this.appointmentsService.send('cancel-appointment', {
      id,
    })
  }

  @Patch(':id/complete-appointment')
  completeAppointment(@Param('id', ValidateId) id: number) {
    return this.appointmentsService.send('complete-appointment', {
      id,
    })
  }

  @Patch(':id/reject-appointment')
  rejectAppointment(@Param('id', ValidateId) id: number) {
    return this.appointmentsService.send('reject-appointment', {
      id,
    })
  }
}
