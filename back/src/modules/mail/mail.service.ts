import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';

import {
  EMAIL_CONFIRMATION_TEMPLATE,
  PASSWORD_RESET_TEMPLATE,
} from '../../constants/email';

@Injectable()
export class MailService {
  constructor(
    private readonly jwtService: JwtService,
    private mailService: MailerService,
  ) {}

  async sendUserConfirmation(minterMail: string): Promise<void> {
    const payload = { email: minterMail };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_EMAIL_KEY,
    });
    const url = `${process.env.APP_URL}/confirm?token=${token}`;

    await this.mailService.sendMail({
      to: minterMail,
      from: process.env.SMTP,
      subject: 'Instamint - please confirm your email',
      text: 'Instamint -  please confirm your email',
      html: EMAIL_CONFIRMATION_TEMPLATE(url),
    });
  }

  async sendPasswordReset(minterMail: string, minterId: number): Promise<void> {
    const payload = { email: minterMail, minterId: minterId };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_KEY,
    });
    const url = `${process.env.APP_URL}/reset?token=${token}`;

    await this.mailService.sendMail({
      to: minterMail,
      from: process.env.SMTP,
      subject: 'Instamint - reset your password',
      text: 'Instamint -  reset your password',
      html: PASSWORD_RESET_TEMPLATE(url),
    });
  }
}
