from pathlib import Path
import pandas as pd
import joblib
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score

BASE = Path(__file__).resolve().parent.parent
DATA = BASE / "data" / "training_data.csv"
MODEL = BASE / "model" / "demand_model.joblib"

FEATURES = [
    "likes", "comments", "shares", "mentions", "sentiment_score",
    "trend_score", "price", "historical_sales"
]

def main():
    df = pd.read_csv(DATA)
    X = df[FEATURES].fillna(0)
    y = df["demand"]
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    model = RandomForestRegressor(
        n_estimators=300, max_depth=8, min_samples_leaf=1,
        random_state=42
    )
    model.fit(X_train, y_train)
    pred = model.predict(X_test)
    print(f"MAE: {mean_absolute_error(y_test, pred):.2f}")
    print(f"R2 : {r2_score(y_test, pred):.3f}")
    joblib.dump({"model": model, "features": FEATURES}, MODEL)
    print(f"Saved model: {MODEL}")

if __name__ == "__main__":
    main()
