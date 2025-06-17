# Documents Validation

This folder contains the document validation components for the BinaryBotz-Hack-AI-Thon project, developed for SBI Life to detect fraud in life insurance claims with 95% precision. It integrates the [Indian ID Validator](https://huggingface.co/logasanjeev/indian-id-validator) for validating Indian IDs (Aadhaar, Voter ID, PAN, Driving License, Passport) and n8n workflows for processing non-ID documents (e.g., death certificates, post-mortem reports) to identify inconsistencies indicative of fraudulent claims.

## Project Context
The pipeline addresses SBI Life’s need to verify the authenticity of documents submitted during life insurance claims. By combining AI-driven ID extraction with automated validation of non-ID documents, the system ensures:
- Accurate extraction of critical fields (e.g., name, date of birth, gender).
- Cross-document validation to detect discrepancies (e.g., mismatched names or dates).
- Compliance with India’s Digital Personal Data Protection (DPDP) Act through local processing.

## Folder Structure
- **ID Extraction**: Contains a Jupyter notebook demonstrating ID validation using the Indian ID Validator.
- **Validation Pipelines**: Houses n8n workflows for extracting data from non-ID documents and validating data across all documents.

### ID Extraction
The `ID Extraction` folder includes a Jupyter notebook that leverages the Indian ID Validator, a YOLO11-based model with PaddleOCR, to extract fields from Indian IDs:
- **Supported IDs**: Aadhaar, Voter ID, PAN, Driving License, Passport.
- **Extracted Fields**: ID number, full name, date of birth, gender, address, etc.
- **Performance**: Achieves high precision (e.g., 0.987 mAP50 for Passport, 0.924 for PAN).
- **Role in Fraud Detection**: Extracts reliable ID data for comparison with non-ID documents to flag inconsistencies (e.g., differing names on Aadhaar and death certificates).

The notebook (`Indian_ID_Validator_Tutorial_and_Playground.ipynb`) serves as a playground for testing ID extraction and includes regex validation for fields (e.g., Aadhaar: `^\d{4}\s\d{4}\s\d{4}$`).

### Validation Pipelines
The `Validation Pipelines` folder contains two n8n workflows powered by AI agents (Gemma 3, Llama 3.1, DeepSeek R1) via Ollama for local processing, ensuring data privacy:
1. **Document Extraction**:
   - **Workflow**: `Document_Information_Extraction.json`.
   - **Function**: Extracts structured data from non-ID documents (death certificates, post-mortem reports).
   - **AI Agents**: Uses Gemma 3 (`gemma3:12b`) for death certificates and Llama 3.1 (`llama3.1:latest`) for both document types.
   - **Output**: JSON with fields like `full_name`, `death_date`, `gender`, `cause_of_death`.
   - **Role in Fraud Detection**: Provides non-ID document data for cross-validation, critical for verifying claim authenticity (e.g., ensuring death certificate details match ID records).

2. **Data Validation**:
   - **Workflow**: `Information_Validation.json`.
   - **Function**: Compares fields across IDs and non-ID documents to detect inconsistencies.
   - **AI Agent**: Employs DeepSeek R1 (`deepseek-r1:14b-qwen-distill-q4_K_M`) for anomaly detection.
   - **Database**: Integrates with Neon PostgreSQL to store and query claim data.
   - **Output**: JSON report detailing inconsistencies (e.g., mismatched `full_name` between Aadhaar and Voter ID, or conflicting `gender` in post-mortem reports).
   - **Role in Fraud Detection**: Identifies potential fraud by flagging discrepancies, such as a claim form’s `relation_with_la: Self` conflicting with a death certificate’s `marital_status: Married`.

## Setup Instructions
1. **Clone the Repository**:
   - Access the project: [GitHub Repository](https://github.com/logasanjeev/BinaryBotz-Hack-AI-Thon).
   - Navigate to the folder: `BinaryBotz-HackAiThon/Documents Validation`.

2. **Run the ID Extraction Notebook**:
   - Install dependencies listed in `ID Extraction/README.md`.
   - Open the notebook in Jupyter to test ID extraction on sample images (e.g., Aadhaar, Voter ID).

3. **Set Up Validation Pipelines**:
   - Install n8n: Refer to the [n8n installation guide](https://docs.n8n.io/getting-started/installation/).
   - Import workflows as described in `Validation Pipelines/Document Extraction/README.md` and `Validation Pipelines/Data Validation/README.md`.
   - Configure Ollama credentials for Gemma 3, Llama 3.1, and DeepSeek R1.
   - Set up Neon PostgreSQL credentials for the Data Validation workflow.

4. **Test the Pipeline**:
   - **ID Extraction**: Run the notebook to extract ID data and save as JSON.
   - **Document Extraction**: Send a POST request with a death certificate image (see `Document Extraction/README.md` for sample curl command).
   - **Data Validation**: Query the Neon database with a claim ID to generate an inconsistency report (see `Data Validation/README.md` for details).

## Privacy and Compliance
- **Local Processing**: All AI agents (Gemma 3, Llama 3.1, DeepSeek R1) run locally via Ollama, minimizing data exposure.
- **DPDP Act Compliance**: Sensitive data is processed locally and deleted after use.
- **Data Security**: Neon PostgreSQL ensures secure storage of claim data.

## Model Card
For details on the Indian ID Validator, including model architecture and performance metrics, visit the [Hugging Face model card](https://huggingface.co/logasanjeev/indian-id-validator).

## Next Steps
- Enhance the notebook to support additional ID types (e.g., Aadhaar back, Voter ID back).
- Integrate the pipeline with a web app (e.g., Flask, Gradio) for SBI Life’s claim processing portal.
- Expand non-ID document support (e.g., medical reports) in the Document Extraction workflow.
- Automate end-to-end testing with sample claims data.

For detailed setup and usage, refer to the README files in the `ID Extraction` and `Validation Pipelines` subfolders.