# Behaviour Analysis

This folder contains the behaviour analysis component for the BinaryBotz-Hack-AI-Thon project, developed for SBI Life to detect fraud in life insurance claims. The behaviour analysis uses an ensemble model combining a Graph Neural Network (GNN) and an XGBoost model to predict fraudulent claims based on patterns in insurance claim data. It provides explainability using Integrated Gradients and LLaMA 3.1 (via Ollama), ensuring transparency for SBI Life’s claim processing team. This component integrates with the `Document Validation` pipeline to enhance fraud detection accuracy.

## Purpose
The `Behaviour Analysis` folder focuses on identifying fraudulent behaviour in insurance claims by analyzing structured claim data (e.g., `ASSURED_AGE`, `POLICY SUMASSURED`, `Premium`, `Annual Income`). It supports SBI Life’s fraud detection pipeline by:
- Using a GNN to capture relationships between claims (e.g., claims sharing the same policy number).
- Using XGBoost to identify key risk factors based on feature importance.
- Combining predictions from both models to make a final fraud prediction.
- Providing a detailed explanation, including a risk score and contributing factors, to assist SBI Life in prioritizing claims for manual review.
- Integrating with the `Document Validation` pipeline to cross-validate claim data against ID and non-ID documents.

## Folder Structure
- **Training.ipynb**: Preprocesses the dataset, performs feature selection, trains the GNN and XGBoost models, and saves them as `fraud_ensemble.pkl`, `gnn_fraud_model.pth`, and `xgb_fraud_model.json`.
- **Testing.ipynb**: Uses the trained ensemble model to predict fraud on new claims and provides an explanation using LLaMA 3.1.
- **requirements.txt**: Lists all Python dependencies required to run the notebooks.
- **Sample Data**: Contains the dataset, sample input data, and trained model files:
  - `Fraud data FY 2023-24 for B&CC.xlsx - Fraud data.csv`: Dataset used in `Training.ipynb`.
  - `userdata.json`: Sample input for testing in `Testing.ipynb`.
  - `fraud_ensemble.pkl`: The trained ensemble model (contains GNN state dictionary, XGBoost model, scaler, and label encoder).
  - `gnn_fraud_model.pth`: The GNN model weights.
  - `xgb_fraud_model.json`: The XGBoost model in JSON format.

## Setup Instructions
1. **Install Python**:
   - Ensure Python 3.8+ is installed on your system.

2. **Set Up a Virtual Environment** (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install Dependencies**:
   - Install the required packages listed in `requirements.txt`:
     ```bash
     pip install -r requirements.txt
     ```

4. **Install Ollama for LLaMA 3.1**:
   - Download and install Ollama from [ollama.ai](https://ollama.ai).
   - Pull the LLaMA 3.1 model:
     ```bash
     ollama pull llama3.1
     ```
   - Verify the model is installed:
     ```bash
     ollama list
     ```

5. **Verify the Dataset and Models**:
   - Ensure the `Sample Data/` folder contains:
     - `Fraud data FY 2023-24 for B&CC.xlsx - Fraud data.csv`
     - `userdata.json`
     - `fraud_ensemble.pkl`
     - `gnn_fraud_model.pth`
     - `xgb_fraud_model.json`
   - If the model files are missing, run the `Training.ipynb` notebook to generate them (see below).

## Usage
### 1. Train the Ensemble Model (`Training.ipynb`)
- **Purpose**: Preprocesses the dataset, performs feature selection, trains the GNN and XGBoost models, and saves them.
- **Steps**:
  - Open the notebook:
    ```bash
    jupyter notebook Training.ipynb
    ```
  - Update the `file_path` in the first cell to point to `Sample Data/Fraud data FY 2023-24 for B&CC.xlsx - Fraud data.csv`.
  - Update the save paths for the model files:
    - `fraud_ensemble.pkl` to `Sample Data/fraud_ensemble.pkl`
    - `gnn_fraud_model.pth` to `Sample Data/gnn_fraud_model.pth`
    - `xgb_fraud_model.json` to `Sample Data/xgb_fraud_model.json`
  - Run all cells to preprocess the data, train the models, and save them.
- **Output**:
  - `fraud_ensemble.pkl`: Contains the GNN state dictionary, XGBoost model, scaler, and label encoder.
  - `gnn_fraud_model.pth`: Contains the GNN model weights.
  - `xgb_fraud_model.json`: Contains the XGBoost model in JSON format.

### 2. Test the Ensemble Model (`Testing.ipynb`)
- **Purpose**: Uses the trained ensemble model to predict fraud on new claims and provides an explanation.
- **Steps**:
  - Open the notebook:
    ```bash
    jupyter notebook Testing.ipynb
    ```
  - Update the paths to the model files:
    - `fraud_ensemble.pkl` to `Sample Data/fraud_ensemble.pkl`
    - `gnn_fraud_model.pth` to `Sample Data/gnn_fraud_model.pth`
    - `xgb_fraud_model.json` to `Sample Data/xgb_fraud_model.json`
  - When prompted, input a JSON string (e.g., the contents of `Sample Data/userdata.json`):
    ```json
    {
      "Dummy Policy No": 2,
      "ASSURED_AGE": 45,
      "NOMINEE_RELATION": "Friend",
      "OCCUPATION": "Unemployed",
      "POLICY SUMASSURED": "50,00,000",
      "Premium": "5,00,000",
      "PREMIUMPAYMENTMODE": "Monthly",
      "Annual Income": "2,00,000",
      "HOLDERMARITALSTATUS": "Divorced",
      "INDIV_REQUIREMENTFLAG": "Medical",
      "Policy Term": 5,
      "Policy Payment Term": 5,
      "CORRESPONDENCECITY": "Mumbai",
      "CORRESPONDENCESTATE": "Maharashtra",
      "CORRESPONDENCEPOSTCODE": 400001,
      "Product Type": "Term",
      "CHANNEL": "Online",
      "Bank code": 2,
      "POLICYRISKCOMMENCEMENTDATE": "01-01-2023",
      "Date of Death": "-",
      "INTIMATIONDATE": "-",
      "STATUS": "Active",
      "SUB_STATUS": "High Risk",
      "Fraud Category": "Identity Theft"
    }
    ```
- **Output**:
  ```
  Claim Result: Potential Risk
  Risk Score: 62%
  Fraud Category: Identity Theft
  Explanation: The high premium of ₹5,00,000 and policy sum assured of ₹50,00,000 in combination with an unemployed assured (ASSURED_AGE = 45) suggests that the claim may be fraudulent. Furthermore, the policy term and payment term being the same at 5 years implies that the assured might not have a regular income, making it difficult to pay premiums. The "Identity Theft" fraud category also supports this conclusion.
  Final verdict: Alert insurance agent to cross check before approving the claim.
  ```

## Integration with Document Validation Pipeline
The behaviour analysis integrates with the `Document Validation` pipeline to enhance fraud detection for SBI Life:
- **Inputs from `Document Validation`**:
  - `Document_Information_Extraction.json`: Extracted fields from non-ID documents (e.g., medical reports, income statements).
  - `Extracted_ID.json`: Extracted fields from ID documents (e.g., name, date of birth).
  - `Similarity_Scores.json`: Similarity scores between ID and non-ID documents.
- **Cross-Validation**:
  - Use `Extracted_ID.json` to verify the `ASSURED_AGE` and other personal details in the claim data.
  - Use `Document_Information_Extraction.json` to validate `Annual Income` and `OCCUPATION` against supporting documents.
  - Use `Similarity_Scores.json` to flag discrepancies (e.g., low similarity scores may indicate document tampering or identity theft, which aligns with the `Fraud Category` in the dataset).
- **Output for `Document Validation`**:
  - The behaviour analysis generates a `Fraud_Risk_Summary.json` file containing the risk score, fraud category, and explanation, which can be used by the `Document Validation` pipeline to prioritize claims for further review.

## Integration with FastAPI Backend
To integrate the behaviour analysis with a FastAPI backend for real-time fraud detection:
1. **Convert `Testing.ipynb` to a Python Script**:
   - Extract the prediction and explainability logic from `Testing.ipynb` into a Python script (e.g., `predict_fraud.py`).
   - Ensure the script loads the model files (`fraud_ensemble.pkl`, `gnn_fraud_model.pth`, `xgb_fraud_model.json`) and processes input JSON data.
2. **Create a FastAPI Endpoint**:
   - Set up a FastAPI endpoint to accept claim data as JSON (similar to `userdata.json`).
   - Example endpoint:
     ```python
     from fastapi import FastAPI
     import json
     # Import your prediction logic from predict_fraud.py

     app = FastAPI()

     @app.post("/predict_fraud")
     async def predict_fraud(claim_data: dict):
         result = run_fraud_prediction(claim_data)  # Call your prediction function
         return result
     ```
3. **Run the FastAPI Server**:
   - Install FastAPI and Uvicorn:
     ```bash
     pip install fastapi uvicorn
     ```
   - Run the server:
     ```bash
     uvicorn main:app --host 0.0.0.0 --port 8000
     ```
4. **Send Requests to the Endpoint**:
   - Use a tool like `curl` or Postman to send claim data to the `/predict_fraud` endpoint and receive the fraud prediction and explanation.

## Contact
For issues or questions, please contact the BinaryBotz-Hack-AI-Thon team:
- GitHub: [BinaryBotz-Hack-AI-Thon](https://github.com/binarybotz/hack-ai-thon)