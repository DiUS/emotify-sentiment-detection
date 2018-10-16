## Emotify

Detect face's sentiment from given image uri

### Dev
* Make sure you have install `node`, `npm` and `serverless`
* Make sure you have create a project on GCP with service account key
* Copy your service account's json file to `~/.gcloud/keyfile.json`
* Change `provider.project` in `serverless.yml` to match your `project-key` (you can get it from JSON file)

After you have completed all steps above

```bash
npm i
serverless deploy
```

You will get function endpoint in the console

### Execute function
```
# Replace $FUNCTION_URI with actual function URI endpoint
# Replace $URI with actual image URI

curl -G $FUNCTION_URI --data-urlencode "uri=$URI"
```
