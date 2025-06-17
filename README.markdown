# BinaryBotz-Hack-AI-Thon: SBI Life Fraud Detection Pipeline

This repository contains the solution developed by the BinaryBotz team for the Hack-AI-Thon challenge, aimed at enhancing fraud detection in life insurance claims for SBI Life. The project delivers an end-to-end pipeline that leverages AI to validate claims, detect fraudulent behavior, and provide a user-friendly interface for stakeholders. The solution was developed as of June 17, 2025, and is designed to streamline SBI Life’s claim processing while ensuring transparency and accuracy.

## Problem Statement
SBI Life, a leading life insurance provider in India, faces significant challenges in detecting fraudulent claims, which result in financial losses and delays in legitimate claim processing. Common fraud types include identity theft, falsified medical reports, and discrepancies in claim data. Manual review processes are time-consuming and prone to human error, necessitating an automated, AI-driven solution to:
- Validate ID and non-ID documents (e.g., medical reports, income statements) for authenticity.
- Identify suspicious patterns in claim data that indicate potential fraud.
- Provide actionable insights (e.g., risk scores, explanations) to assist agents in decision-making.
- Offer a secure, role-based portal for claimants, hospitals, and admins to interact with the system.

## Solution Overview
The BinaryBotz-Hack-AI-Thon project provides a comprehensive fraud detection pipeline for SBI Life, integrating advanced AI techniques with a user-friendly web portal. The solution consists of three main components:
1. **Document Validation**: Validates ID and non-ID documents by extracting information and checking for discrepancies that may indicate fraud.
2. **Behaviour Analysis**: Uses an ensemble model (Graph Neural Network + XGBoost) to analyze claim data, detect fraudulent patterns, and provide explainability using Integrated Gradients and LLaMA 3.1.
3. **Web Portal**: A Next.js-based portal with role-based access for claimants, hospitals, and admins, enabling claim submission, document upload, and real-time fraud detection results.

The pipeline integrates these components via a FastAPI backend, ensuring seamless communication and real-time processing. Firebase is used for authentication and data storage in the web portal, while YOLO V11 powers ID validation.

### Key Features
- **AI-Driven Validation**: Uses YOLO V11 for ID validation, ensuring high accuracy in authenticity checks.
- **Fraud Detection**: Combines GNN and XGBoost to identify suspicious patterns in claim data, with explainability for transparency.
- **Role-Based Access**: Separate dashboards for claimants, hospitals, and admins to submit claims, upload documents, and review results.
- **Real-Time Processing**: FastAPI backend enables real-time fraud detection and validation, minimizing delays in claim processing.
- **Scalability**: Modular design allows for easy integration of additional models or features in the future.

## Repository Structure
The repository is organized into three main folders, each with its own README for detailed instructions:

- **Behaviour Analysis/**:
  - **Purpose**: Detects fraudulent behavior in claim data using an ensemble model (GNN + XGBoost).
  - **Contents**:
    - `Training.ipynb`: Preprocesses the dataset, trains the models, and saves them.
    - `Testing.ipynb`: Uses trained models to predict fraud on new claims and provides explanations.
    - `Sample Data/`: Includes the dataset (`Fraud data FY 2023-24 for B&CC.xlsx - Fraud data.csv`), sample input (`userdata.json`), and model files (`fraud_ensemble.pkl`, `gnn_fraud_model.pth`, `xgb_fraud_model.json`).
    - `requirements.txt`: Lists dependencies for running the notebooks.
  - **Usage**: Train the model using `Training.ipynb` and test new claims with `Testing.ipynb`. Results include a risk score, fraud category, and explanation for flagged claims.
  - **Integration**: Provides the `/predict_fraud` endpoint for the Web Portal to fetch fraud detection results.

- **Document Validation/**:
  - **Purpose**: Validates ID and non-ID documents by extracting information (e.g., using OCR) and checking for discrepancies to detect potential fraud.
  - **Contents**: Includes scripts for document processing, sample documents for testing, and dependencies for OCR and FastAPI integration.
  - **Usage**: Processes documents to extract key information (e.g., name, date of birth from IDs; medical details from reports) and validates authenticity by comparing ID and non-ID documents. Outputs are provided as JSON files for integration.
  - **Integration**: Supplies extracted data and validation results to the Web Portal and cross-validates with `Behaviour Analysis` to flag discrepancies.

- **Web Portal/**:
  - **Purpose**: Provides a user-friendly interface for claimants, hospitals, and admins to interact with the fraud detection pipeline.
  - **Contents**:
    - `src/`: Next.js source code, including pages (`admin-check/`, `client-submit/`, `hospital-process/`), components (`IDUploader.jsx`, `ClaimCard.jsx`), and Firebase integration.
    - `screenshots/`: Screenshots of the portal (e.g., home page, dashboards).
    - `package.json`: Lists dependencies (e.g., Next.js, Firebase, Tailwind CSS).
  - **Usage**: Run the portal with `npm run dev` to access role-based dashboards. Claimants submit claims, hospitals upload medical reports, and admins review fraud detection results.
  - **Integration**: Communicates with `Behaviour Analysis` and `Document Validation` via FastAPI endpoints to display real-time results.

## Setup Instructions
### Prerequisites
- **Python 3.8+**: For `Behaviour Analysis` and `Document Validation`.
- **Node.js 16+**: For `Web Portal`.
- **Firebase Account**: For authentication and data storage in the Web Portal.
- **FastAPI Backend**: Set up in `Behaviour Analysis` for fraud detection and in `Document Validation` for document processing.

### Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/logasanjeev/BinaryBotz-Hack-AI-Thon.git
   cd BinaryBotz-Hack-AI-Thon
   ```
2. **Set Up Each Folder**:
   - Navigate to each folder (`Behaviour Analysis`, `Document Validation`, `Web Portal`) and follow the setup instructions in their respective `README.md` files.
   - For `Behaviour Analysis` and `Document Validation`, install Python dependencies and run the FastAPI servers.
   - For `Web Portal`, install Node.js dependencies and set up Firebase credentials in `.env.local`.

## Usage
1. **Run the FastAPI Backends**:
   - Start the FastAPI servers in `Behaviour Analysis` and `Document Validation` to enable fraud detection and document validation endpoints.
2. **Launch the Web Portal**:
   - Run the Next.js application in `Web Portal` to access the user interface.
   - Sign up or log in as a claimant, hospital, or admin.
3. **Submit and Process Claims**:
   - Claimants: Submit claims and upload ID proofs via `/client-submit`.
   - Hospitals: Upload medical reports via `/hospital-process`.
   - Admins: Review fraud detection results and approve/reject claims via `/admin-check`.
4. **View Results**:
   - The portal displays real-time results, including ID validation status, fraud risk scores, and explanations for flagged claims.

## Integration Flow
The components work together as follows:
1. **Claim Submission**: A claimant submits a claim with ID proofs via the Web Portal.
2. **Document Validation**: The `Document Validation` pipeline extracts information from ID and non-ID documents and checks for discrepancies.
3. **Fraud Detection**: The `Behaviour Analysis` pipeline analyzes claim data to predict fraud, providing a risk score and explanation.
4. **Result Display**: The Web Portal displays validation and fraud detection results to the relevant users (claimants, hospitals, admins).
5. **Decision Making**: Admins review results and approve or reject claims, with all actions logged in Firebase Firestore.

## Future Improvements
- **Enhanced Models**: Incorporate more advanced models (e.g., transformer-based OCR) for better document extraction.
- **Scalability**: Deploy the FastAPI backends and Web Portal on cloud infrastructure (e.g., AWS) for production use.
- **Additional Features**: Add notifications for claimants and hospitals, and integrate with SBI Life’s existing systems via APIs.

## Contact
For issues or questions, please contact the BinaryBotz-Hack-AI-Thon team:
- Email: support@binarybotz.com
- GitHub: [BinaryBotz-Hack-AI-Thon](https://github.com/binarybotz/hack-ai-thon)