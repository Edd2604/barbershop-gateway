import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Logger,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import { SearchStatusQueryDto } from 'src/common/dto/search-status-query.dto'
import { ValidateId } from 'src/common/pipes/validate-id.pipe'
import { Services } from 'src/config/services'
import { ClientProxy, RpcException } from '@nestjs/microservices'
import { catchError } from 'rxjs'
import { UseFileInterceptor } from 'src/common/decorators/file-interceptor.decorator'
import { ApiBody, ApiConsumes } from '@nestjs/swagger'
import { UploadFile } from 'src/common/decorators/upload-files.decorator'
import { CloudinaryService } from 'src/providers/cloudinary/cloudinary.service'

import { CreateAdminDto } from './dto/create-admin.dto'
import { CreateBarberDto } from './dto/create-barber.dto'
import { CreateCustomerDto } from './dto/create-customer.dto'
import { UpdateBarberDto } from './dto/update-barber.dto'
import { UpdateCustomerDto } from './dto/update-customer.dto'
import { UpdateAdminDto } from './dto/update-admin.dto'
import { BarbersQueryDto } from './dto/barbers-query.dto'

@Controller('users')
export class UsersController {
  private readonly logger = new Logger()
  constructor(
    @Inject(Services.USERS_MS) private readonly usersService: ClientProxy,
    private readonly cloud: CloudinaryService,
  ) {}

  @UseFileInterceptor()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        dni: {
          type: 'string',
          minLength: 8,
          maxLength: 8,
          description: 'dni del usuario',
        },
        name: {
          type: 'string',
          minLength: 3,
          maxLength: 100,
          description: 'Nombre del usuario',
        },
        lastName: {
          type: 'string',
          minLength: 3,
          maxLength: 100,
          description: 'apellidos del usuaurio',
        },
        number: {
          type: 'string',
          minLength: 9,
          maxLength: 9,
          description: 'número del usuaurio',
        },
        email: {
          type: 'string',
          description: 'Email del usuario',
        },
        password: {
          type: 'string',
          description: 'contraseña del usuario',
        },

        isActive: {
          type: 'boolean',
          description: 'Estado habilitado del producto',
        },
      },
    },
  })
  @Post('create-customer')
  async createCustomer(
    @Body() createCustomerDto: CreateCustomerDto,
    @UploadFile() file?: Express.Multer.File,
  ) {
    const img = await this.cloud.uploadFileToCloudinary(file)
    createCustomerDto.img = img
    return this.usersService.send('create-customer', createCustomerDto).pipe(
      catchError((e) => {
        throw new RpcException(e)
      }),
    )
  }

  @UseFileInterceptor()
  @ApiConsumes('multipart/form-data')
  @Post('create-barber')
  async createBarber(
    @Body() createBarberDto: CreateBarberDto,
    @UploadFile() file?: Express.Multer.File,
  ) {
    const img = await this.cloud.uploadFileToCloudinary(file)
    createBarberDto.img = img
    return this.usersService.send('create-barber', createBarberDto).pipe(
      catchError((e) => {
        throw new RpcException(e)
      }),
    )
  }

  @Post('create-admin')
  async createAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.usersService.send('create-admin', createAdminDto).pipe(
      catchError((e) => {
        throw new RpcException(e)
      }),
    )
  }

  @Get('get-all-customers')
  findAllCustomers(@Query() params: SearchStatusQueryDto) {
    return this.usersService.send('get-all-customers', params).pipe(
      catchError((e) => {
        throw new RpcException(e)
      }),
    )
  }

  @Get('get-all-admins')
  findAllAdmins(@Query() params: SearchStatusQueryDto) {
    return this.usersService.send('get-all-admins', params).pipe(
      catchError((e) => {
        throw new RpcException(e)
      }),
    )
  }

  @Get('get-all-barbers')
  findAllBarbers(@Query() params: BarbersQueryDto) {
    return this.usersService.send('get-all-barbers', params)
  }

  @Get('get-available-barbers')
  findAvailableBarbers() {
    return this.usersService.send('get-available-barbers', {})
  }

  @Get(':id/get-customer-by-id')
  findOneCustomer(@Param('id', ValidateId) id: number) {
    return this.usersService.send('get-customer-by-id', { id }).pipe(
      catchError((e) => {
        throw new RpcException(e)
      }),
    )
  }

  @Get(':id/get-barber-by-id')
  findOneBarber(@Param('id', ValidateId) id: number) {
    return this.usersService.send('get-barber-by-id', { id }).pipe(
      catchError((e) => {
        throw new RpcException(e)
      }),
    )
  }

  @Get(':id/get-admin-by-id')
  async findOneAdmin(@Param('id', ValidateId) id: number) {
    return await this.usersService.send('get-admin-by-id', { id }).pipe(
      catchError((e) => {
        this.logger.log(e)
        throw new RpcException(e)
      }),
    )
  }

  @Get(':id/get-user-by-id')
  findOne(@Param('id', ValidateId) id: number) {
    return this.usersService.send('get-user-by-id', { id }).pipe(
      catchError((e) => {
        throw new RpcException(e)
      }),
    )
  }

  @Get(':id/get-customer-profile')
  getCustomerProfile(@Param('id', ValidateId) id: number) {
    return this.usersService.send('get-customer-profile', { id }).pipe(
      catchError((e) => {
        throw new RpcException(e)
      }),
    )
  }

  @UseFileInterceptor()
  @ApiConsumes('multipart/form-data')
  @Patch(':id/update-customer')
  async updateCustomer(
    @Param('id', ValidateId) id: number,
    @Body() updateCustomerDto: UpdateCustomerDto,
    @UploadFile() file?: Express.Multer.File,
  ) {
    const img = await this.cloud.uploadFileToCloudinary(file)
    updateCustomerDto.img = img
    return this.usersService
      .send('update-customer', { id, ...updateCustomerDto })
      .pipe(
        catchError((e) => {
          throw new RpcException(e)
        }),
      )
  }

  @UseFileInterceptor()
  @ApiConsumes('multipart/form-data')
  @Patch(':id/update-barber')
  async updateBarber(
    @Param('id', ValidateId) id: number,
    @Body() updateBarberDto: UpdateBarberDto,
    @UploadFile() file?: Express.Multer.File,
  ) {
    const img = await this.cloud.uploadFileToCloudinary(file)
    updateBarberDto.img = img
    return this.usersService
      .send('update-barber', { id, ...updateBarberDto })
      .pipe(
        catchError((e) => {
          throw new RpcException(e)
        }),
      )
  }

  @Patch(':id/update-admin')
  updateAdmin(
    @Param('id', ValidateId) id: number,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    return this.usersService
      .send('update-admin', { id, ...updateAdminDto })
      .pipe(
        catchError((e) => {
          throw new RpcException(e)
        }),
      )
  }

  @Delete(':id/remove-user')
  remove(@Param('id', ValidateId) id: number) {
    return this.usersService.send('remove-user', { id }).pipe(
      catchError((e) => {
        throw new RpcException(e)
      }),
    )
  }
}
