import busboy from 'busboy';
import S3 from 'aws-sdk/clients/s3';

const s3 = new S3();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const busboyInstance = new busboy({ headers: req.headers });
      busboyInstance.on(
        'file',
        (fieldname, file, filename, encoding, mimetype) => {
          const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: filename,
            Body: file,
          };
        }
      );
      const result = await s3.upload(params).promise();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
