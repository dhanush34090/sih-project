@echo off
cd /d "%~dp0"
python -m pip install -r requirements.txt
python model\train_model.py
python -m uvicorn app:app --host 0.0.0.0 --port 8000 --reload
