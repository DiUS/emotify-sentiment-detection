## Emotify

Detect face's sentiment from given image uri or base64 image data

### Dev
Follow the steps below to setup the credential and GCP project

* Make sure you have install `node`, `npm` and `serverless`
* Make sure you have create a project on GCP with service account key
* Copy your service account's json file to `~/.gcloud/keyfile.json`
* Change `provider.project` in `serverless.yml` to match your `project-key` (you can get it from JSON file)

### Run function locally
TBD

### Deploy function
```bash
npm i
serverless deploy
```

You will get function endpoint in the console

### Execute function
```
# GET endpoint with image URI
  # Replace $FUNCTION_URI with actual function URI endpoint
  # Replace $URI with actual image URI
curl -G $FUNCTION_URI --data-urlencode "uri=$URI"

# POST endpoint with image URI
  # Replace $FUNCTION_URI with actual function URI endpoint
  # Replace $BASE64 with base64 encoded image data
curl -X POST \
  $FUNCTION_URI \
  -H 'Content-Type: application/json' \
  -H 'cache-control: no-cache' \
  -d '{
    "content": "$BASE64"
}'
```
