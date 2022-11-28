import { ListObjectsCommand, GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
// Set the AWS Region.
const REGION = "us-east-2";
// Create an Amazon S3 service client object.
const s3Client = new S3Client({ region: REGION });

// Docs: https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/clients/client-s3/index.html

const imgRepoClient = {
  client: s3Client,
  //bucket_arn: "arn:aws:s3:::file-store-1",
  bucketname: "file-store-1",

  async getImage(key) {
    console.log('type' + typeof(key))
    const cmd = new GetObjectCommand({ Bucket: this.bucketname, Key: key })
    let results
try{
    results = await s3Client.send(cmd)
}catch(err){
console.log('500')
console.log(err)
return
}
    console.log('meme')
    console.log(results)
    return results
  },

  async listImages() {
    const cmd = new ListObjectsCommand({ Bucket: this.bucketname })
    const results = await s3Client.send(cmd)
    console.log(results)

      let filenames = []
      console.log('cont')
console.log(results['Contents'])
      console.log('cont')
console.log(results['Contents'])
results['Contents'].forEach(record => {
  console.log('record')
  console.log(record)
  filenames.push(record['Key'])
})
      for (const fn in results['Contents']){
        console.log('record')
        console.log(fn)
        filenames.push(fn['Key'])
      }
      return filenames
  }

};

export { imgRepoClient };
