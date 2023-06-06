import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url = '/' } = req.query;
  res.writeHead(301, {
    Location: `https://animevariant.org${url}`,
  });
  res.end();
}
