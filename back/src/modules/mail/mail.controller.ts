import { Controller, Post, Body } from '@nestjs/common';

import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  async sendVerificationMail(@Body('email') email: string): Promise<void> {
    await this.mailService.sendUserConfirmation(email);
  }
}
