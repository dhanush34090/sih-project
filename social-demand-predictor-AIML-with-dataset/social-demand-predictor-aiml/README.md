# Social Demand Predictor - AI/ML Service

This folder is the **AI/ML-only** part of the Social Media -> Product Demand Predictor project. It runs separately in VS Code and exposes a FastAPI REST service on port 8000.

## Included dataset
`data/training_data.csv` contains **synthetic demonstration training data** based on the six products in the current UI: Wireless Earbuds, Smart Watch, Phone Case, Portable Speaker, Alagon, and Travel Charger. It contains 120 weekly observations (20 per product). The values are generated for project/demo use; they are not real customer or sales data.

Columns: product_name, category, price, week, likes, comments, shares, mentions, sentiment_score, trend_score, historical_sales, demand.

The Random Forest model currently uses these eight numeric features: likes, comments, shares, mentions, sentiment_score, trend_score, price, historical_sales. Product name/category/week are retained in the dataset for context and are not used as model features.

## Run in VS Code

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python model/train_model.py
python -m uvicorn app:app --reload --port 8000
```

Open `http://localhost:8000/docs` to test the API.

## Prediction endpoint
`POST /api/ml/predict`

Example JSON:

```json
{
  "productId": 1,
  "likes": 5000,
  "comments": 320,
  "shares": 180,
  "mentions": 80,
  "sentimentScore": 0.82,
  "trendScore": 0.76,
  "price": 1999,
  "historicalSales": 120
}
```

The response contains `predictedDemand`, `confidence`, and `recommendation`.

## Connecting to your existing Spring Boot project
Your STS backend should send the eight numeric features to `http://localhost:8000/api/ml/predict`. The AI/ML project does not replace your existing backend or frontend.
