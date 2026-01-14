# cyl-polen-tracker serverless API with AWS Lambda

## Introduction

The goal was to create a very simple API with AWS Lambda and AWS API Gateway to serve data to [TRMNL devices](https://usetrmnl.com/). This is how it can be configured.

## What does the API do

This API extracts data from Castilla y León [open data API](https://analisis.datosabiertos.jcyl.es) of polen and transforms it. The goal of the transformation is to reduce the size of the request by only serving the useful data.

The API receives via a query param the station to get the data from, retrieves the data, formats it and returns it minified.

### Example

1. A GET request is made to the API: `https://my-example-api.com/api/pollen?station=SALAMANCA`
2. The Lambda function retrieves the data from Castilla y León open data API
3. Data gets transformed and minified
4. This new data is returned

**Original data retrieved from Castilla y León open data API**:

```JSON
{
  "total_count": 7,
  "results": [
    {
      "fecha": "2025-11-21",
      "ano": "2025",
      "semana": 46,
      "estaciones": "SALAMANCA",
      "tipos_polinicos": "Cedrus (CEDRO)",
      "precedentes_ultimos_dias": "BAJO",
      "prevision_proximos_dias": "BAJO"
    },
    {
      "fecha": "2025-11-21",
      "ano": "2025",
      "semana": 46,
      "estaciones": "SALAMANCA",
      "tipos_polinicos": "Plantago (LLANTEN)",
      "precedentes_ultimos_dias": "BAJO",
      "prevision_proximos_dias": "BAJO"
    },
    {
      "fecha": "2025-11-21",
      "ano": "2025",
      "semana": 46,
      "estaciones": "SALAMANCA",
      "tipos_polinicos": "Quercus (ENCINA, ROBLE)",
      "precedentes_ultimos_dias": "BAJO",
      "prevision_proximos_dias": "BAJO"
    },
    {
      "fecha": "2025-11-21",
      "ano": "2025",
      "semana": 46,
      "estaciones": "SALAMANCA",
      "tipos_polinicos": "Castanea (CASTAÑO)",
      "precedentes_ultimos_dias": "BAJO",
      "prevision_proximos_dias": "BAJO"
    },
    {
      "fecha": "2025-11-21",
      "ano": "2025",
      "semana": 46,
      "estaciones": "SALAMANCA",
      "tipos_polinicos": "Urticaceae (ORTIGA, PARIETARIA, PELOSILLA)",
      "precedentes_ultimos_dias": "BAJO",
      "prevision_proximos_dias": "BAJO"
    },
    {
      "fecha": "2025-11-21",
      "ano": "2025",
      "semana": 46,
      "estaciones": "SALAMANCA",
      "tipos_polinicos": "Cupressaceae (CIPRÉS, ENEBRO, SABINA)",
      "precedentes_ultimos_dias": "BAJO",
      "prevision_proximos_dias": "BAJO"
    },
    {
      "fecha": "2025-11-21",
      "ano": "2025",
      "semana": 46,
      "estaciones": "SALAMANCA",
      "tipos_polinicos": "Poaceae (GRAMINEAS)",
      "precedentes_ultimos_dias": "BAJO",
      "prevision_proximos_dias": "BAJO"
    }
  ]
}
```

**Transformed data returned by the Lambda function**:

```JSON
[
  {
    "pollen_type": "Castanea (CASTAÑO)",
    "level": "BAJO"
  },
  {
    "pollen_type": "Urticaceae (ORTIGA, PARIETARIA, PELOSILLA)",
    "level": "BAJO"
  },
  {
    "pollen_type": "Cedrus (CEDRO)",
    "level": "BAJO"
  },
  {
    "pollen_type": "Plantago (LLANTEN)",
    "level": "BAJO"
  },
  {
    "pollen_type": "Quercus (ENCINA, ROBLE)",
    "level": "BAJO"
  },
  {
    "pollen_type": "Cupressaceae (CIPRÉS, ENEBRO, SABINA)",
    "level": "BAJO"
  },
  {
    "pollen_type": "Poaceae (GRAMINEAS)",
    "level": "BAJO"
  }
]
```

## Building it

First, create a Lambda Function. Then attach API Gateway as a trigger.

### Lambda Function

1. On AWS Console, go to Lambda service
2. Create the Function
   1. Click "Create new Function"
   2. Select "Author from scratch"
   3. Function name: `pollen-data-api`
   4. Runtime: `Python 3.XX`
   5. Architecture: `x86_64`
   6. Click "Create function"
3. Deploy the Function code
   1. In the code tab, on the inline code editor, paste the content of `lambda_function.py` file (default code should be overwritten)
   2. Click "Deploy"
4. Create environment variable
   1. Go to "Configuration" tab
   2. Click "Environment variables" in the left sidebar
   3. Click "Edit" -> "Add environment variable"
   4. Add Key: `API_URL`, Value: `https://analisis.datosabiertos.jcyl.es`
   5. Click "Save"
5. Adjust Lambda timeout configuration
   1. Go to "Configuration" -> "General configuration", click "Edit"
   2. Set timeout to 20 seconds (or desired timeout)
   3. Click "Save"

### API Gateway

1. On the Lambda Function main page, click "Add trigger"
2. Select "API Gateway" -> "Create a new API"
   1. API Type: `REST API`
   2. Security: `Open`
3. After it is created, navigate to it either by clicking on its name or by going to API Gateway Dashboard
4. Create Resource and Method
   1. Click "Resources" in the left menu
   2. Click "Actions" -> "Create Resource"
      1. Resource Name: `pollen`
   3. Select the newly created `pollen` resource and click "Actions" -> "Create Method"
      1. `GET`
      2. Integration Type: `Lambda Function`
      3. Select the Lambda Function from the list
      4. Click "Save"
5. Enable CORS
   1. Select the `pollen` resource
   2. Click "Actions" -> "Enable CORS"
   3. Keep default settings and save
6. Deploy the API
   1. Click "Actions" -> "Deploy API"
   2. Deployment stage: New Stage
   3. Stage Name: `default` (or `prod` or anything you prefer)
   4. Click "Deploy"
7. After the deployment, the "Invoke URL" should appear. Try to make a GET request to this URL with `station` query param.

```bash
curl "https://YOUR-API-ID.execute-api.REGION.amazonaws.com/prod?station=SALAMANCA"
```

## Other considerations

### Costs

With AWS Free Tier:

- Lambda: 1M requests/month free, 400,000 GB-seconds compute time free
- API Gateway: 1M API calls/month free for 12 months

This API should stay within free tier for moderate usage.

See next section **API Rate Limits** to prevent reaching high numbers.

### API Rate Limits

To prevent too many requests and avoid possible costs, API Gateway Throttling should be enabled. This is built into API Gateway and requires no code changes.

1. Go to API Gateway Console
   1. Select the API
   2. Click on "Stages" in the left menu
   3. Click on the stage being used
2. Set Stage-Level Throttling
   1. Click on "Stage Details" -> "Edit"
   2. Scroll down to "Default Method Throttling"
   3. Set reasonable limits
      1. Rate 5 requests per second
      2. Burst: 10 requests per second
      3. These limits are very generous to be used with TRMNL
   4. Click "Save Changes"
3. Deploy changes
   1. Go back to "Resources"
   2. Click "Actions" -> "Deploy API"
   3. Select the stage and click "Deploy"

### Caching

For the use I'm going to give to this API, only 4 to 6 times calls will be handled each day. Thus, no caching makes sense here. But if the API starts getting more and more requests, it would be a good idea to implement caching with API Gateway. Keep in mind caching causes costs, so it only makes sense when there is heavy traffic.
