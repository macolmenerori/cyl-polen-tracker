# AWS Metrics and Alarms for TRML API

This guide explores how to retrieve the most relevant metrics about the API execution after it has been set up. Also, it sets up alarms to prevent misuse.

The easiest and more convenient way to access and visualize the API usage data is creating a custom dashboard in AWS CloudWatch. Dashboards have a cost of 3USD per month, so an alternative way to access the data is detailed too. Note that this guide only uses default metrics, which are free of charge. Custom metrics can be more convenient, but they increase costs in AWS so only default ones have been used here.

To be alerted when the API is being misused, which can lead to undesired costs, CloudWatch Alarms can be created to be notified ASAP. Note that the Alarms have a cost too.

Details on costs can be found at the end of the document.

## Metrics

### Create custom dashboard (billed)

Take into account that creating a dashboard has a cost of 3USD per month. See the last section about costs for more info.

1. Create dashboard
   1. Go to CloudWatch Console
   2. Click "Dashboards" on the left menu
   3. Click "Create Dashboard" and give it a name
2. Add metrics widgets
   1. Click "Add Widgets"
   2. Select the type of graph (most used will be the "Line" graph)
   3. Select the source (see below)
   4. Click "Create Widget"
   5. Rename it to make it more descriptive

#### Most relevant metrics to add to the dashboard

- Total Requests (line graph, _Api Gateway_ -> _By API Name_ -> _Count_)
- Error Rates (line graph, _API Gateway_ -> _4XXError_ & _5XXError_)
- Latency (line graph, _API Gateway_ -> _Latency_ and _IntegrationLatency_)
- Lambda Errors & Throttles (number, _Lambda_ -> _Errors_ & _Throttles_)
- Total Requests in 24h (number, _API Gateway_ -> _Count_)
- Average Lambda Execution Duration (number, _Lambda_ -> _Duration_)

### Access the metrics manually (free of charge)

The previously mentioned metrics added to the dashboard can be accessed free of change on the individual service insights.

1. Lambda Metrics
   1. Go to Lambda Console
   2. Click the Lambda Function to access it
   3. Click on "Monitor" tab
2. API Gateway Metrics
   1. Go to API Gateway Console
   2. Click the API to access it
   3. Click on "Dashboard" on the left menu

## Alarms (billed)

Take into account that alarms have a cost of 0.10USD per month. See the last section about costs for more info.

How to create an alarm: **CloudWatch → Alarms → Create alarm**

### Most relevant alarms

1. Alarm 1: Traffic Spike - Alert when requests spike unusually high
   1. Select metric: API Gateway → Count (Sum, 5 min)
   2. Conditions:
      - Static threshold
      - Greater than: `1000` (adjust based on your normal traffic)
      - Datapoints: 1 out of 1
   3. Configure actions:
      - Create SNS topic: `pollen-api-alerts`
      - Add your email
      - Confirm subscription via email
   4. Name: `Pollen-API-Traffic-Spike`
2. Alarm 2: High Error Rate (4XX)
   1. Metric: API Gateway → 4XXError (Sum, 5 min)
   2. Condition: Greater than `50`
   3. SNS Topic: Use existing `pollen-api-alerts`
   4. Name: `Pollen-API-High-4XX-Errors`
3. Alarm 3: Server Errors (5XX)
   1. Metric: API Gateway → 5XXError (Sum, 5 min)
   2. Condition: Greater than `10`
   3. SNS Topic: `pollen-api-alerts`
   4. Name: `Pollen-API-Server-Errors`
4. Alarm 4: Lambda Throttling
   1. Metric: Lambda → Throttles (Sum, 5 min)
   2. Condition: Greater than `0` (any throttling is bad)
   3. SNS Topic: `pollen-api-alerts`
   4. Name: `Pollen-API-Lambda-Throttled`
5. Alarm 5: High Latency
   1. Create alarm
   2. Metric: API Gateway → Latency (Average, 5 min)
   3. Condition: Greater than `3000` ms (3 seconds)
   4. SNS Topic: `pollen-api-alerts`
   5. Name: `Pollen-API-High-Latency`

### Billing alarm

In case there is no billing alarm set up at the account, it is very recommended to do so.

1. Go to Billing Console
   - Click account name → "Billing Dashboard"
   - Click "Billing preferences"
   - Check "Receive Billing Alerts"
   - Save preferences

2. Create Billing Alarm
   - Go to CloudWatch (us-east-1 region only!)
   - Alarms → Create alarm
   - Select metric: Billing → Total Estimated Charge
   - Condition: Greater than `$10` (or your budget)
   - Create SNS topic for billing alerts
   - Name: `AWS-Billing-Alert`

## Note on costs

Although most of the project falls within the AWS Free Tier, some services (specially insight ones in this case) can cause charges. Here is a breakdown of the possible costs

### Reminder: AWS Free Tier Limits

All free tier limits apply to the **entire AWS account** across **all projects and regions**.

| Service              | Free Tier Limit | Cost After Free Tier  | Notes                                |
| -------------------- | --------------- | --------------------- | ------------------------------------ |
| **Standard Metrics** | Unlimited       | FREE                  | API Gateway, Lambda built-in metrics |
| **Custom Metrics**   | First 10        | $0.30/metric/month    | Across ALL projects                  |
| **Alarms**           | First 10        | $0.10/alarm/month     | Across ALL projects                  |
| **Dashboards**       | First 3         | $3.00/dashboard/month | Across ALL projects                  |
| **Log Ingestion**    | First 5 GB      | $0.50/GB              | Across ALL projects                  |
| **Log Storage**      | First 5 GB      | $0.03/GB              | Across ALL projects                  |
| **API Requests**     | 1 million/month | $1.00/million         | After first million                  |

_As of January 2026_

### Possible costs of this project

These features of the project can cause costs, so avoid them if not wanted. The project remains fully functional.

- Custom metrics
- Dashboard
- Alarms
- Logs (make sure to enable auto-expiry for logs to auto-delete)
