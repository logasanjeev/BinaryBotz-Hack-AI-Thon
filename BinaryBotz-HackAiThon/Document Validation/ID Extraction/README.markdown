# ID Extraction

This folder contains resources for extracting structured data from Indian identification documents as part of the BinaryBotz-Hack-AI-Thon project for SBI Life, aimed at detecting fraud in life insurance claims. The extraction process leverages the [Indian ID Validator](https://huggingface.co/logasanjeev/indian-id-validator), a robust computer vision pipeline powered by YOLO11 models and PaddleOCR.

## Indian ID Validator Model Card
The [Indian ID Validator](https://huggingface.co/logasanjeev/indian-id-validator) is a deep learning pipeline designed to classify, detect, and extract text from Indian ID documents, supporting both front and back images where applicable. Key features include:
- **Supported IDs**:
  - Aadhaar (front and back)
  - Voter ID (front and back)
  - PAN Card (front)
  - Driving License (front and back)
  - Passport (front)
- **Pipeline**:
  - **Classification**: Uses the `Id_Classifier` (YOLO11l-cls) to identify ID types (e.g., `aadhar_front`, `passport`) with 99.5% Top-1 accuracy.
  - **Field Detection**: Employs type-specific YOLO11l models to detect fields (e.g., Aadhaar Number, DOB, Name).
  - **Text Extraction**: Utilizes PaddleOCR with preprocessing (upscaling, denoising, contrast enhancement) to extract text from detected fields.
- **Model Performance**:
  - Aadhaar: mAP50 0.795, Precision 0.777, Recall 0.774
  - Voter ID: mAP50 0.917, Precision 0.922, Recall 0.873
  - PAN Card: mAP50 0.924, Precision 0.902, Recall 0.901
  - Driving License: mAP50 0.690, Precision 0.752, Recall 0.669
  - Passport: mAP50 0.987, Precision 0.972, Recall 0.967
- **Models Available**: Downloadable in PyTorch, ONNX, TensorRT formats via Ultralytics Hub links provided in the [model card](https://huggingface.co/logasanjeev/indian-id-validator).

For full details on model architecture, classes detected, and deployment options, refer to the [Hugging Face model card](https://huggingface.co/logasanjeev/indian-id-validator).

## Purpose
The `ID Extraction` component is the initial step in SBI Life’s fraud detection pipeline. It processes Indian IDs to extract key fields (e.g., name, date of birth, ID number) that are later validated against non-ID documents (e.g., death certificates) in the `Validation Pipelines` workflows. The extracted data is integrated with a FastAPI backend for further processing and validation, helping identify discrepancies that may indicate fraudulent claims.

## Contents
- **Indian_ID_Validator_Tutorial_and_Playground.ipynb**: A Jupyter notebook that serves as a tutorial and playground for extracting data from Indian IDs using the Indian ID Validator.

### Extracted Fields (Examples)
- **Aadhaar**: `{"Aadhaar": "923369264947", "Gender": "MALE", "Name": "Harvendra Singh", "DOB": "20/08/2001"}`
- **Voter ID**: `{"Voter ID": "JDK6152466", "Address": "A/24, Road-1, Sanjay Gandhi Nagar, Hanuman Nagar, Kankarbagh, Patna-800020", "Date of Issue": "12/02/2005"}`

## Setup Instructions
1. **Install Dependencies**:
   - Ensure Python 3.8+ is installed.
   - Install required packages as specified in the model card:
     ```bash
     pip install ultralytics paddleocr paddlepaddle numpy==1.24.4 pandas==2.2.2
     ```
   - Alternatively, use the `requirements.txt` from the [Indian ID Validator repository](https://huggingface.co/logasanjeev/indian-id-validator):
     ```bash
     pip install -r requirements.txt
     ```

2. **Download Models**:
   - Models are automatically downloaded when running the notebook via `inference.py`. Ensure an internet connection to fetch models from the Hugging Face repository, as detailed in the [model card](https://huggingface.co/logasanjeev/indian-id-validator).

3. **Run the Notebook**:
   - Open the notebook in Jupyter:
     ```bash
     jupyter notebook Indian_ID_Validator_Tutorial_and_Playground.ipynb
     ```
   - Follow the steps to load the model, process sample ID images, and verify outputs.

## Usage
The notebook provides an interactive environment to:
- Load the Indian ID Validator models (`Id_Classifier.pt` and type-specific YOLO11 models).
- Process ID images to classify the document type, detect fields, and extract text.
- Save extracted data as JSON files (e.g., `detected_aadhaar.json`) for integration with the FastAPI backend.
- Troubleshoot issues like dependency errors or incorrect classification.

## Integration with FastAPI Backend
The extracted ID data can be sent to a FastAPI backend for further processing in the fraud detection pipeline:
- **Save Output**: The notebook saves extracted data as JSON (e.g., `detected_aadhaar.json`).
- **API Endpoint**: Create a FastAPI endpoint to receive the JSON data and pass it to the `Validation Pipelines` workflows.
- **Example**:
  ```python
  from fastapi import FastAPI, UploadFile
  import json

  app = FastAPI()

  @app.post("/upload-id-data")
  async def upload_id_data(file: UploadFile):
      data = json.loads(await file.read())
      # Process data (e.g., send to Validation Pipelines)
      return {"status": "Data received", "data": data}
  ```
  Run the FastAPI app and send the JSON data:
  ```bash
  curl -X POST -F "file=@detected_aadhaar.json" http://localhost:8000/upload-id-data
  ```

## Role in Fraud Detection
For SBI Life’s fraud detection pipeline:
- Extracted ID data (e.g., name, DOB, gender) is saved as JSON and sent to the FastAPI backend.
- The backend forwards the data to the `Validation Pipelines/Data Validation` workflow, which compares it with non-ID document data to detect inconsistencies, such as mismatched names or dates, indicating potential fraud.