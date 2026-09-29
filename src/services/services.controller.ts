import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  Query,
} from '@nestjs/common'
import { Services } from 'src/config/services'
import { ClientProxy, RpcException } from '@nestjs/microservices'
import { catchError } from 'rxjs'
import { SearchStatusQueryDto } from 'src/common/dto/search-status-query.dto'
import { ValidateId } from 'src/common/pipes/validate-id.pipe'
import { UseFileInterceptor } from 'src/common/decorators/file-interceptor.decorator'
import { UploadFile } from 'src/common/decorators/upload-files.decorator'
import { CloudinaryService } from 'src/providers/cloudinary/cloudinary.service'
import { ApiConsumes } from '@nestjs/swagger'

import { CreateServiceDto } from './dto/create-service.dto'
import { UpdateServiceDto } from './dto/update-service.dto'

@Controller('services')
export class ServicesController {
  constructor(
    @Inject(Services.SERVICES_MS) private readonly serviceService: ClientProxy,
    private readonly cloud: CloudinaryService,
  ) {}

  @UseFileInterceptor()
  @ApiConsumes('multipart/form-data')
  @Post('create-service')
  async create(
    @Body() createServiceDto: CreateServiceDto,
    @UploadFile() file?: Express.Multer.File,
  ) {
    const img = await this.cloud.uploadFileToCloudinary(file)
    createServiceDto.img = img
    return this.serviceService.send('create-service', createServiceDto).pipe(
      catchError((e) => {
        throw new RpcException(e)
      }),
    )
  }

  @Get('get-all-services')
  findAll(@Query() params: SearchStatusQueryDto) {
    return this.serviceService.send('get-all-services', params).pipe(
      catchError((e) => {
        throw new RpcException(e)
      }),
    )
  }

  @Get('get-available-services')
  findAvailableBarbers() {
    return this.serviceService.send('get-available-services', {})
  }

  @Get(':id/get-service-by-id')
  findOne(@Param('id') id: number) {
    return this.serviceService.send('get-service-by-id', { id })
  }

  @UseFileInterceptor()
  @ApiConsumes('multipart/form-data')
  @Patch(':id/update-service')
  async update(
    @Param('id', ValidateId) id: number,
    @Body() updateServiceDto: UpdateServiceDto,
    @UploadFile() file?: Express.Multer.File,
  ) {
    const img = await this.cloud.uploadFileToCloudinary(file)
    updateServiceDto.img = img
    return this.serviceService.send('update-service', {
      id,
      ...updateServiceDto,
    })
  }

  @Delete(':id/remove-service')
  remove(@Param('id', ValidateId) id: number) {
    return this.serviceService.send('remove-service', { id })
  }
}
