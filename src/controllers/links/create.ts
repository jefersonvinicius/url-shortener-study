import { Request, Response, Send } from 'express';
import { Controller } from '../base';
import { z } from 'zod';
import { prismaClient } from '@app/database';
import { randomUUID } from 'crypto';

const bodySchema = z.object({
  url: z.string().url(),
});

export class CreateLinkController extends Controller.BaseController {
  handle = async (request: Request, response: Response): Promise<any> => {
    const { url } = bodySchema.parse(request.body);
    const data = {
      originalUrl: url,
      shortUrl: `${this.getComingBaseUrl(request)}/s/${randomUUID()}`,
    };
    const link = await prismaClient.link.create({ data });
    return response.json({ link });
  };
}
