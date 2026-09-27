from pathlib import Path
import joblib
import pandas as pd

MODEL_PATH = Path(__file__).resolve().parent.parent / "model" / "demand_model.joblib"
FEATURES = [
    "likes", "comments", "shares", "mentions", "sentiment_score",
    "trend_score", "price", "historical_sales"
]

_model_bundle = None

def load_model():
    global _model_bundle
    if _model_bundle is None:
        if not MODEL_PATH.exists():
            raise FileNotFoundError("ML model not found. Run: python model/train_model.py")
        _model_bundle = joblib.load(MODEL_PATH)
    return _model_bundle

def predict(values: dict):
    bundle = load_model()
    model = bundle["model"]
    row = {f: float(values.get(f, 0) or 0) for f in FEATURES}
    X = pd.DataFrame([row], columns=FEATURES)
    prediction = max(0.0, float(model.predict(X)[0]))

    # A practical confidence indicator based on forest prediction spread.
    trees = [float(tree.predict(X)[0]) for tree in model.estimators_]
    spread = float(pd.Series(trees).std()) if len(trees) > 1 else 0.0
    confidence = max(55.0, min(98.0, 100.0 - (spread / max(prediction, 1.0) * 100.0)))

    if prediction >= row["historical_sales"] * 1.20:
        recommendation = "Increase stock"
    elif prediction <= row["historical_sales"] * 0.85:
        recommendation = "Reduce stock"
    else:
        recommendation = "Maintain stock"

    return {
        "predictedDemand": round(prediction, 2),
        "confidence": round(confidence, 2),
        "recommendation": recommendation,
    }
