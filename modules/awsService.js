import { S3Client, AbortMultipartUploadCommand } from "@aws-sdk/client-s3";

const client = new S3Client({ region: "eu-central-1" });
const awsService = {
  upload(image) {

  }
}

export default awsService