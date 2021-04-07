import { S3Client, AbortMultipartUploadCommand } from "@aws-sdk/client-s3";

const credentials = {
  accessKeyId: "AKIAIKNDI6ICZXWA675Q",
  secretAccessKey: "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",
  // any other options are passed to new AWS.S3()
  // See: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/Config.html#constructor-property
}
const client = new S3Client({ region: "eu-central-1" });
const awsService = {
  upload(image) {

  }
}

export default awsService