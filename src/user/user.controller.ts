import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { JwtGuard } from '../auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
@ApiBearerAuth('access_token')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }
  // if you want one item ( it is posible because of [data] in custom decorator)
  /*getMe(@GetUser('email') user: string) {
    return user;
  }*/

  getUsers() {
    return this.userService.getUsers();
  }

  @Patch('update/:id')
  editUser(
    @Param('id', ParseIntPipe) userId: number,
    @Body() dto: EditUserDto,
  ) {
    return this.userService.editUser(userId, dto);
  }

  @Get(':id/profile-img')
  getUserProfilePicture(@GetUser('id') userId: number) {
    return this.userService.getUserProfilePicture(userId);
  }
}
