import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url = '/' } = req.query;
  res.writeHead(301, {
    Location: `https://your-netlify-app-url${url}`,
  });
  res.end();
}
