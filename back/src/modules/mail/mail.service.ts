import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';

import { EMAIL_CONFIRMATION_TEMPLATE } from '../../constants/email';

@Injectable()
export class MailService {
  constructor(
    private readonly jwtService: JwtService,
    private mailService: MailerService,
  ) {}

  async sendUserConfirmation(minterMail: string): Promise<void> {
    const payload = { email: minterMail };
    const token = this.jwtService.sign(payload);
    const url = `${process.env.APP_URL}/confirm?token=${token}`;

    await this.mailService.sendMail({
      to: minterMail,
      from: process.env.USER_MAILER,
      subject: 'Instamint - please confirm your email',
      text: 'Instamint -  please confirm your email',
      html: EMAIL_CONFIRMATION_TEMPLATE(url),
    });
  }
}
