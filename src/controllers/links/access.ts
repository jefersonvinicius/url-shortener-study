import { Request, Response } from 'express';
import { Controller } from '../base';
import { URL } from 'url';
import { prismaClient } from '@app/database';

export class AccessLinkController extends Controller.BaseController {
  handle = async (request: Request, response: Response): Promise<any> => {
    const shortUrl = new URL(this.getComingBaseUrl(request));
    shortUrl.pathname = `s/${request.params.code}`;
    const link = await prismaClient.link.findFirst({
      where: { shortUrl: shortUrl.href },
    });
    if (!link) return response.status(404);
    await prismaClient.click.create({
      data: {
        clickedAt: new Date(),
        userAgent: request.headers['user-agent'],
        linkId: link.id,
      },
    });
    return response.redirect(link.originalUrl);
  };
}
