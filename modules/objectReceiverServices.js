

  // const imageToUrl = async () => {
  //   // Generates a random fileId
  //   const fileId = uuid.v4()
  //   // Defines file to be uploaded
  //   let uri = photo.uri
  //   const file = {
  //     uri: uri,
  //     name: `${fileId}.png`,
  //     type: 'image/png'
  //   }
  //   // Configurations for S3 upload
  //   const options = {
  //     keyPrefix: "Image/",
  //     bucket: AWS_BUCKET,
  //     region: AWS_REGION,
  //     accessKey: AWS_KEY,
  //     secretKey: AWS_SECRET,
  //     successActionStatus: 201
  //   }
  //   // Uploads file and returns the url
  //   let url
  //   await RNS3.put(file, options).then(response => {
  //     if (response.status !== 201)
  //       throw new Error("Failed to upload image to S3");
  //     url = response.body.postResponse
  //   })
  //   return url
  // }