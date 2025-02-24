# Fraud Claim Prediction - GNN + XGBoost

## Project Structure

```
BinaryBotz-HackAiThon/
├── Complete Document Validation/                   
│   ├── Document Verfication/                 
│   │   ├── Aadhar Card/          
│   │   ├── Classification/           
│   │   ├── DrivingLicense/       
│   │   ├── Pan Card/ 
│   │   ├── Passport/    
│   │   ├── Voter Id/             
│   ├── Encryption/          
│   ├── Handwritten Extraction           
│   ├── Models/
|   |   └── Drive url for models
│   └── NLP/        
├── Ensemble Model/                   
│   ├── sample data/                  
│   │   ├── sample data workspace    
│   │   ├── Testing.ipynb   # GNN hyperparameters
├── requirements.txt          # Dependencies
└── README.md                 # Project documentation
```

## Overview
This project aims to predict fraudulent insurance claims using a hybrid model combining **Graph Neural Networks (GNN)** and **XGBoost**. The dataset includes policy, claim, and customer-related information represented as a graph.

## Key Features
- **GraphSAGE-based GNN** with optimizations (dropout, LayerNorm, attention heads)
- **XGBoost classifier** for final fraud prediction
- **Feature Engineering** including standardization and embeddings
- **Fraud Risk Scoring** using SHAP-based interpretability
- **GNNExplainer** for explainability
- **OCR & Handwriting Detection** with PaddleOCR integration
- **Complete Document Validation** including Aadhar, Passport, Voter ID, and more

## How to Use
1. **Document Verification:** Use the `Complete Document Validation/` folder for various document processing tasks.
2. **Ensemble Model Testing:** The `Ensemble Model/` directory contains sample data and models for fraud prediction.
3. **Train Model:** Execute `Testing.ipynb` in `sample data/` to experiment with GNN hyperparameters.
4. **Predict Fraud:** Load `fraud ensemble.pkl`, `gnn fraud model.pth`, and `xgb fraud model` for predictions.

## Dependencies
- Python 3.8+
- PyTorch, DGL (Deep Graph Library)
- XGBoost, Pandas, NumPy, Scikit-learn
- PaddleOCR (for document processing)

## License
This project is **Apache-licensed** to ensure open-source accessibility.

---
Updated based on the provided directory structure.

