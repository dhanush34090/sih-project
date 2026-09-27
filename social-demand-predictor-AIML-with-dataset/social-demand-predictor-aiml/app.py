from typing import Optional
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field
from services.model_service import predict

app = FastAPI(
    title="Social Demand Predictor AI/ML API",
    version="1.0.0",
    description="AI/ML service for predicting product demand from sales and social-media signals."
)

class PredictionRequest(BaseModel):
    likes: float = Field(default=0, ge=0)
    comments: float = Field(default=0, ge=0)
    shares: float = Field(default=0, ge=0)
    mentions: float = Field(default=0, ge=0)
    sentimentScore: float = Field(default=0, ge=-1, le=1)
    trendScore: float = Field(default=0, ge=0)
    price: float = Field(default=0, ge=0)
    historicalSales: float = Field(default=0, ge=0)
    productId: Optional[int] = None

@app.get("/")
def root():
    return {"service": "Social Demand Predictor AI/ML", "status": "running"}

@app.get("/health")
def health():
    return {"status": "UP"}

@app.post("/api/ml/predict")
def predict_demand(request: PredictionRequest):
    try:
        result = predict({
            "likes": request.likes,
            "comments": request.comments,
            "shares": request.shares,
            "mentions": request.mentions,
            "sentiment_score": request.sentimentScore,
            "trend_score": request.trendScore,
            "price": request.price,
            "historical_sales": request.historicalSales,
        })
        result["productId"] = request.productId
        return result
    except FileNotFoundError as exc:
        raise HTTPException(status_code=500, detail=str(exc))
