import express from "express";
const app = express();
import { imgRepoClient } from "./utils/imgS3Client.js";
//import { imgRepoClient } from "./utils/imgS3Client.js";

app.get('/getfilefroms3', async (req, res, next) => {
  let imageList = await imgRepoClient.listImages()
  let image = await imgRepoClient.getImage(imageList[0])
  res.attachment(imageList[0]); // Set Filename
  // Could try this, idk: https://github.com/aws/aws-sdk-js-v3/issues/1096#issuecomment-616743375
  res.type(image.ContentType); // Set FileType
  res.send(image.Body);        // Send File Buffer
})

const port = 3000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

//let imageList = await imgRepoClient.listImages()
//console.log('here')

//console.log(imageList)

//console.log('res 0 = ' + imageList[0])
//let image = await imgRepoClient.getImage(imageList[0])

//console.log('end')
//console.log(image)

