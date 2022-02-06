import busboy from 'busboy';
import S3 from 'aws-sdk/clients/s3';

const s3 = new S3();

export default function handler(req, res) {
  if (req.method === 'POST') {
    try {
      console.log('Headers', req.body);
      const bb = busboy({ headers: req.headers });
      
      bb.on('file', async (name, file, info) => {

        const { filename, encoding, mimeType } = info;
        console.log(
          `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
          filename,
          encoding,
          mimeType
        );
        const params = {
          Bucket: process.env.BUCKET_NAME,
          Key: filename,
          Body: file,
        };
        // res.json({ ok: true });

        // const result = await s3.upload(params).promise();
        // console.log({ result });
        // res.status(200).json(result);
      });
      bb.end(req.rawBody);

      // req.pipe(bb);
      return res.json({ hello: true });
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
}
