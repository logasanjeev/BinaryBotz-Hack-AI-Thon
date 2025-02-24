**SBI ID Validation Web App**

This is a Next.js web application designed to validate Indian ID proofs using a YOLO V11 model built with PyTorch. The application integrates Firebase for authentication and FastAPI for backend communication.



**Features**

**ID Proof Validation:** Uses a YOLO-based id_classifier model to verify the authenticity of uploaded ID proofs.

**AI Result Reasoning:** Uses NLP model to justify the AI result to the cross validator

**Multi-Role Authentication:** Users are categorized into three roles: Agent (Top), Middle Guys, and Clients.

**Secure Authentication:** Utilizes Firebase Authentication with email and password.

**FastAPI Integration:** Connects to a FastAPI server to process ID validation.

**File Upload:** Uses multer for handling file uploads in Next.js.

**Frontend Styling:** Built with Tailwind CSS for a responsive and modern UI.



**Tech Stack:**

**Frontend:** Next.js, Tailwind CSS

**Backend:** FastAPI (Python)

**Database & Auth:** Firebase

**Machine Learning:** PyTorch 

**Dependencies**

@pytorch/torch

multer, @types/multer

tf-node

sharp

**Installation**

Prerequisites

Ensure you have Node.js, Python 3.8+, and Firebase CLI installed.

Clone the Repository

git clone https://github.com/your-repo/sbi-id-validation.git
cd sbi-id-validation

Install Dependencies

Frontend (Next.js)

npm install

Backend (FastAPI)

pip install -r backend/requirements.txt

Environment Variables

Create a .env.local file in the Next.js project root:

NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FASTAPI_URL=http://127.0.0.1:8000

**Running the Application**

Start the FastAPI Server:

cd backend
uvicorn main:app --reload

Start the Next.js App:

npm run dev

The app will be available at http://localhost:3000.

**Usage**

Sign in or Register using Firebase authentication.

Upload an ID Proof (Aadhaar, PAN, Passport, etc.).

The system will validate the ID using YOLO V11 via FastAPI.

If valid, the ID proof is processed further; otherwise, rejection feedback is provided.

Folder Structure

├── backend/           # FastAPI server
│   ├── main.py        # API entry point
│   ├── model/         # YOLO V11 ID classifier
├── src/               # Next.js frontend
│   ├── components/    # UI components
│   ├── pages/         # Next.js pages
│   ├── styles/        # Tailwind styles
│   ├── utils/         # Utility functions
│   ├── lib/           # Firebase config
├── public/            # Static assets
├── .env.local         # Environment variables
├── package.json       # Frontend dependencies
├── README.md          # Project documentation

**Deployment**

Frontend: Can be deployed on Vercel or Firebase Hosting.
Backend: Can be hosted on Google Cloud Run, Heroku, or AWS EC2.

**Future Improvements**

Add real-time status updates for validation.

Improve UI with enhanced animations.

Implement additional security checks for file uploads.

License

This project is open-source and available under the MIT License.

