import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import { TransactionHistoryService } from './transaction-history.service';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { Roles } from 'src/utility/common/user-roles.enum';
import { AuthorizeRoles } from 'src/utility/decorators/authorize-roles.decorator';
import { AuthorizeGuard } from 'src/utility/guards/authorization.guard';

@Controller('transaction-history')
export class TransactionHistoryController {
  constructor(
    private readonly transactionHistoryService: TransactionHistoryService,
  ) {}

  @UseGuards(AuthenticationGuard)
  @Get()
  async getUserTransactionHistory(@CurrentUser() currentUser) {
    const userEmail = currentUser.email;
    return this.transactionHistoryService.getUserTransactionHistory(userEmail);
  }

  @AuthorizeRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @Get('all')
  async getAllTransactionHistory() {
    return this.transactionHistoryService.getAllTransactionHistory();
  }

  @AuthorizeRoles(Roles.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizeGuard)
  @Post('search')
  async searchTransactionHistory(@Body() { email }: { email: string }) {
    return this.transactionHistoryService.searchTransactionHistory(email);
  }
}
