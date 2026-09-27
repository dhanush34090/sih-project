import json
from urllib.request import Request, urlopen

payload = {
    "productId": 1,
    "likes": 2500,
    "comments": 210,
    "shares": 140,
    "mentions": 70,
    "sentimentScore": 0.91,
    "trendScore": 0.90,
    "price": 2299,
    "historicalSales": 310
}
req = Request(
    "http://127.0.0.1:8000/api/ml/predict",
    data=json.dumps(payload).encode(),
    headers={"Content-Type": "application/json"},
    method="POST"
)
with urlopen(req) as response:
    print(response.read().decode())
