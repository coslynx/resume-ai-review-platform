<div class="hero-icon" align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
</div>

<h1 align="center">
  resume-ai-review-platform
</h1>
<h4 align="center">AI-powered platform to review resumes and get feedback.</h4>
<h4 align="center">Developed with the software and tools below.</h4>
<div class="badges" align="center">
  <img src="https://img.shields.io/badge/Framework-React-blue" alt="React">
  <img src="https://img.shields.io/badge/Frontend-TypeScript,_HTML,_CSS-red" alt="Frontend">
  <img src="https://img.shields.io/badge/Backend-Node.js-blue" alt="Node.js">
  <img src="https://img.shields.io/badge/LLMs-OpenAI-black" alt="OpenAI">
</div>
<div class="badges" align="center">
  <img src="https://img.shields.io/github/last-commit/coslynx/resume-ai-review-platform?style=flat-square&color=5D6D7E" alt="git-last-commit" />
  <img src="https://img.shields.io/github/commit-activity/m/coslynx/resume-ai-review-platform?style=flat-square&color=5D6D7E" alt="GitHub commit activity" />
  <img src="https://img.shields.io/github/languages/top/coslynx/resume-ai-review-platform?style=flat-square&color=5D6D7E" alt="GitHub top language" />
</div>

## 📑 Table of Contents
- 📍 Overview
- 📦 Features
- 📂 Structure
- 💻 Installation
- 🏗️ Usage
- 🌐 Hosting
- 📄 License
- 👏 Authors

## 📍 Overview
The repository contains a Minimum Viable Product (MVP) called "resume-ai-review-platform" that provides a platform for users to upload resumes, process payments, and receive AI-powered feedback. This MVP uses React for the frontend, Node.js for the backend, and integrates with the OpenAI API for AI feedback. The core technologies used are TypeScript, React, HTML, CSS, Node.js, and the OpenAI API.

## 📦 Features
|    | Feature            | Description                                                                                                        |
|----|--------------------|--------------------------------------------------------------------------------------------------------------------|
| ⚙️ | **Architecture**   | The codebase follows a modular architecture with components, hooks, services, types and constants, promoting maintainability and scalability.             |
| 📄 | **Documentation**  | The repository includes a README file that provides a detailed overview of the MVP, its dependencies, and usage instructions. |
| 🔗 | **Dependencies**   | The codebase relies on external libraries and packages such as React, axios, @stripe/stripe-js, react-dropzone, and tailwindcss, which are used for building UI components, handling API calls and styling the application.|
| 🧩 | **Modularity**     | The modular structure allows for easier maintenance and reusability of the code, with separate directories and files for components, hooks, services, utils, and pages.|
| 🧪 | **Testing**        | Implemented unit tests using Jest to ensure the reliability of the button and input components.      |
| ⚡️  | **Performance**    | The application is designed for performance using lazy loading of components and optimizing images and using memoization. |
| 🔐 | **Security**       | Security is enhanced by using environment variables, and input sanitization techniques in the input component. |
| 🔀 | **Version Control**| Utilizes Git for version control with GitHub Actions workflow files for automated build and release processes. |
| 🔌 | **Integrations**   | Integrates with the Stripe API for payment processing and the OpenAI API for AI feedback generation.|
| 📶 | **Scalability**    |  The system is built on a cloud-native architecture with a scalable backend and a NoSQL database for handling future growth.       |

## 📂 Structure
```text
src
├── components
│   ├── common
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Spinner.tsx
│   ├── ResumeUpload.tsx
│   ├── PaymentForm.tsx
│   └── FeedbackDisplay.tsx
├── pages
│   ├── Home.tsx
│   └── ReviewPage.tsx
├── hooks
│   ├── useResume.ts
│   ├── usePayment.ts
│   └── useFeedback.ts
├── services
│   ├── api.ts
│   ├── openai.ts
│   └── stripe.ts
├── utils
│   └── helpers.ts
├── styles
│   └── global.css
├── types
│   └── index.ts
└── constants
    └── index.ts
public
    └── assets
        ├── logo.png
        └── loading.gif
tests
    └── components
        ├── Button.test.tsx
        └── Input.test.tsx
.env
startup.sh
commands.json
package.json
README.md
tailwind.config.js
vite.config.ts
```

## 💻 Installation
> [!WARNING]
> ### 🔧 Prerequisites
> - Node.js v18.0.0 or higher
> - npm 6 or higher
> - A valid OpenAI API key
> - A valid Stripe Publishable and Secret key
> - A MongoDB Atlas account and connection string

### 🚀 Setup Instructions
1.  Clone the repository:
    ```bash
    git clone https://github.com/coslynx/resume-ai-review-platform.git
    cd resume-ai-review-platform
    ```
2.  Install dependencies:
    ```bash
    npm install --force
    ```
3.  Create a `.env` file and fill in the required environment variables:
    ```bash
    cp .env.example .env
    # Open the .env file and fill in the following variables:
    # VITE_OPENAI_API_KEY=YOUR_OPENAI_API_KEY_HERE
    # VITE_STRIPE_PUBLISHABLE_KEY=YOUR_STRIPE_PUBLISHABLE_KEY_HERE
    # VITE_STRIPE_SECRET_KEY=YOUR_STRIPE_SECRET_KEY_HERE
    # VITE_BACKEND_URL=http://localhost:3000
    ```

## 🏗️ Usage
### 🏃‍♂️ Running the MVP
1.  Start the development server:
    ```bash
    npm run dev
    ```
2.  Access the application:
    - Web interface: [http://localhost:5173](http://localhost:5173)

> [!TIP]
> ### ⚙️ Configuration
> - The application is configured via the `.env` file, make sure to add your OpenAI and Stripe api keys, and also the URL for the backend.
> - All configurations can be done via the `.env`, `tailwind.config.js` and `vite.config.ts` files.
> - The `vite.config.ts` file has configurations for the alias path for the imports.

### 📚 Examples
Provide specific examples relevant to the MVP's core features. For instance:

- 📝 **Uploading a Resume**: Drag and drop your resume to the upload area.

- 📝 **Payment**: Enter your card details to process the payment.

- 📝 **AI Feedback**: Once payment is complete, the AI will provide feedback on the resume.

## 🌐 Hosting
### 🚀 Deployment Instructions

#### Deploying to Netlify
1. Sign up or log in to Netlify.

2. Connect your GitHub repository to Netlify.

3. Configure your build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`

4. Add environment variables in Netlify settings:
  - `VITE_OPENAI_API_KEY`
  - `VITE_STRIPE_PUBLISHABLE_KEY`
  - `VITE_STRIPE_SECRET_KEY`
  - `VITE_BACKEND_URL`

5. Deploy your application.

### 🔑 Environment Variables
Provide a comprehensive list of all required environment variables, their purposes, and example values:

- `VITE_OPENAI_API_KEY`: API key for OpenAI
  Example: `sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
- `VITE_STRIPE_PUBLISHABLE_KEY`: Publishable key for Stripe
  Example: `pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
- `VITE_STRIPE_SECRET_KEY`: Secret key for Stripe
  Example: `sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
- `VITE_BACKEND_URL`: URL for the backend API
  Example: `http://localhost:3000`

## 📜 API Documentation
### 🔍 Endpoints

- **POST /upload**: Uploads a resume file
  - Description: Endpoint for uploading a resume file as multipart/form-data
  - Headers: `'Content-Type': 'multipart/form-data'`
  - Response: `{ "status": "success", "message": "File uploaded successfully." }`

- **POST /payment_intents**: Creates a payment intent using Stripe API
    - Description: Endpoint for creating a payment intent.
    - Body: `{"amount": number }` in cents
    - Header: `Authorization: Bearer ${VITE_STRIPE_SECRET_KEY}`
    - Response: `{ "id": string, "client_secret": string, "amount": number }`

- **POST https://api.openai.com/v1/chat/completions**: Gets the AI feedback based on the resume.
    - Description: Endpoint for generating feedback using OpenAI.
    - Body: `{"model": "gpt-3.5-turbo", "messages": [ { "role": "user", "content": string} ] }`
    - Header: `Authorization: Bearer ${VITE_OPENAI_API_KEY}`
    - Response: AI generated feedback with a score and details.

### 🔒 Authentication
This MVP does not require Authentication for the API, as the OpenAI and Stripe api keys are being used.

### 📝 Examples

```bash
# Upload a resume file
curl -X POST http://localhost:3000/upload \
    -H "Content-Type: multipart/form-data" \
    -F "resume=@/path/to/your/resume.pdf"

# Create a Stripe Payment Intent
curl -X POST  https://api.stripe.com/v1/payment_intents  \
   -H "Authorization: Bearer sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" \
  -H "Content-Type: application/json" \
  -d '{"amount": 1000}'

# Response
{
    "id": "pi_3N9H532eZvKYlo2C1p6z5rP2",
    "client_secret": "pi_3N9H532eZvKYlo2C1p6z5rP2_secret_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "amount": 1000
}

# Get AI feedback from OpenAI
curl -X POST https://api.openai.com/v1/chat/completions \
-H "Authorization: Bearer sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" \
-H "Content-Type: application/json" \
-d '{
  "model": "gpt-3.5-turbo",
  "messages": [
    {
      "role": "user",
      "content": "Analyze the following resume and provide detailed feedback with a score from 0 to 100, focusing on areas like formatting, clarity, impact and overall effectiveness. Provide details for each area including clear and actionable advice, also provide a summary of the strengths and weakness of the resume.\n\nResume:\n{resumeText}\n\nFeedback:"
    }
  ]
}'

# Response:
{
  "id": "chatcmpl-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  "object": "chat.completion",
  "created": 1717910040,
  "model": "gpt-3.5-turbo-0613",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Summary: The resume presents a comprehensive overview of the candidate's skills and experience, but has some formatting issues that could be improved.\n\nDetails:\n- The formatting of the skills section could be cleaner and better organized for readability.\n- Some sections of the resume could benefit from stronger action verbs to highlight achievements.\n- Consider adding measurable results or metrics in the work experience section to showcase the impact of your work.\n\nScore: 80"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 228,
    "completion_tokens": 115,
    "total_tokens": 343
  }
}

```

> [!NOTE]
> ## 📜 License & Attribution
> 
> ### 📄 License
> This Minimum Viable Product (MVP) is licensed under the [GNU AGPLv3](https://choosealicense.com/licenses/agpl-3.0/) license.
> 
> ### 🤖 AI-Generated MVP
> This MVP was entirely generated using artificial intelligence through [CosLynx.com](https://coslynx.com).
> 
> No human was directly involved in the coding process of the repository: resume-ai-review-platform
> 
> ### 📞 Contact
> For any questions or concerns regarding this AI-generated MVP, please contact CosLynx at:
> - Website: [CosLynx.com](https://coslynx.com)
> - Twitter: [@CosLynxAI](https://x.com/CosLynxAI)

<p align="center">
  <h1 align="center">🌐 CosLynx.com</h1>
</p>
<p align="center">
  <em>Create Your Custom MVP in Minutes With CosLynxAI!</em>
</p>
<div class="badges" align="center">
<img src="https://img.shields.io/badge/Developers-Drix10,_Kais_Radwan-red" alt="">
<img src="https://img.shields.io/badge/Website-CosLynx.com-blue" alt="">
<img src="https://img.shields.io/badge/Backed_by-Google,_Microsoft_&_Amazon_for_Startups-red" alt="">
<img src="https://img.shields.io/badge/Finalist-Backdrop_Build_v4,_v6-black" alt="">
</div>