// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import '@tensorflow/tfjs-backend-cpu';
import type { NextApiRequest, NextApiResponse } from 'next';
// Import @tensorflow/tfjs-core

interface Data {
  prediction: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
): void {
  // const model = await tflite.loadTFLiteModel('../../ public/model/model.tflite');

  // const upload = multer().array('file');
  // upload(req, res, (error: any) => {
  //   if (error != null) {
  //     res.status(500).send(error);
  //   }
  // });

  // const prediction = await model.predict(tensor(req.file.buffer));
  // res.send({ prediction });
  res.status(200).json({ name: 'John Doe' });
}
