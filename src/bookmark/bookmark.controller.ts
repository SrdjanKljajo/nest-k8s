import {
  Body,
  CacheKey,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { JwtGuard } from '../auth/guard';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@UseGuards(JwtGuard)
@Controller('bookmarks')
@ApiBearerAuth('access_token')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}
  @Get()
  @CacheKey('bookmarks')
  getBookmarks(@GetUser('id') userId: number) {
    return this.bookmarkService.getBookmarks(userId);
  }

  @Get(':id')
  getBookmark(@Param('id', ParseIntPipe) bookmarkId: number) {
    return this.bookmarkService.getBookmark(bookmarkId);
  }

  @Post()
  createBookmark(
    @GetUser('id') userId: number,
    @Body() dto: CreateBookmarkDto,
  ) {
    return this.bookmarkService.createBookmark(userId, dto);
  }

  @Patch(':id')
  editBookmark(
    @Param('id', ParseIntPipe) bookmarkId: number,
    @Body() dto: EditBookmarkDto,
  ) {
    return this.bookmarkService.editBookmark(bookmarkId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteBookmark(@Param('id', ParseIntPipe) bookmarkId: number) {
    return this.bookmarkService.deleteBookmark(bookmarkId);
  }
}
