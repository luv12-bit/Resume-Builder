# Resume Builder Application

A full-stack **MERN (MongoDB, Express, React, Node.js)** application designed to help users build, optimize, and evaluate their resumes using Artificial Intelligence.

## 📝 Project Overview & Architecture

* **Frontend:** Built with React, Vite, Tailwind CSS, Redux Toolkit, and React Router.
* **Backend:** Built with Node.js, Express, MongoDB (Mongoose), JWT, and the OpenAI SDK (configured to use Gemini models).

## 🚀 Step-by-Step Project Flow

1. **User Authentication (Signup/Login):**
   * The user arrives at the web app and creates an account or logs in.
   * The frontend uses `axios` to send the credentials to the backend.
   * The Node.js server hashes the password using `bcrypt`, stores the user in MongoDB, and returns a **JWT (JSON Web Token)**.
   * Redux Toolkit (`authSlice.js`) stores the user data and token globally so the user stays logged in across different pages.

2. **Dashboard Navigation:**
   * After logging in, the user is routed to the Dashboard (`/app`).
   * The backend fetches the user's previously saved resumes from the database using their unique `userId` attached to the JWT token.

3. **Building the Resume:**
   * Users navigate to the Resume Builder to enter their details (Experience, Education, Projects).
   * Local state or Redux manages the form data as the user types.

4. **AI Enhancements:**
   * **Professional Summary:** If the user struggles to write a summary, they can click a button. The backend sends their rough draft to the AI model, prompting it to act as a "professional resume writer," and returns a polished summary.
   * **Job Description:** Users can also enhance job descriptions to better match standard ATS (Applicant Tracking System) keywords.

5. **ATS Score Analysis (The Core Feature):**
   * The user goes to the ATS Score page to evaluate their resume against a specific job description.
   * The server takes the raw resume text and uses a highly structured AI prompt. It instructs the AI to evaluate based on a strict rubric: **Keywords (40%)**, **Sections (30%)**, **Achievements (20%)**, and **Formatting (10%)**.
   * The AI is forced to return a structured JSON response containing the final score, matching/missing hard and soft skills, and template recommendations. The React frontend then visualizes this JSON data.

6. **Preview & Export:**
   * The user can view the final rendered resume on the Preview page, generated dynamically using the data stored in the database.

---

## 💼 Interview Questions & Answers

**Q1: How does the authentication flow work in your application?**
**Answer:** "We use JWT (JSON Web Tokens) for stateless authentication. When a user logs in, the backend verifies their credentials using `bcrypt` to compare the hashed password in MongoDB. Upon success, the server generates a JWT and sends it back. The React client stores this token in local storage and includes it in the `Authorization` header of subsequent API requests using Axios. We also use Redux Toolkit to maintain the user's logged-in state across the app so components can reactively update when the user logs in or out."

**Q2: I see you built an ATS analysis feature. How did you implement it to ensure the AI returns structured, usable data instead of just a block of text?**
**Answer:** "I used the OpenAI SDK on the Node.js backend. When the user requests an ATS analysis, I pass the resume text to the AI model with a very rigid system prompt. The prompt acts as an ATS Simulator and enforces a strict JSON response structure detailing matching skills, missing skills, and a calculated score based on a specific rubric (e.g., 40% keywords, 20% achievements). Crucially, I pass `response_format: { type: "json_object" }` to the API call, which guarantees the AI returns a perfectly formatted, parseable JSON object that my frontend can immediately map over and display as charts or lists."

**Q3: Why did you choose Vite over Create React App (CRA) for your frontend?**
**Answer:** "Vite provides a significantly faster development experience. Unlike CRA, which bundles the entire application using Webpack before the dev server can start, Vite uses native ES modules to serve source files directly and only processes files as they are requested by the browser. It also uses `esbuild` for blazingly fast Hot Module Replacement (HMR), meaning my browser updates almost instantly when I save a file, drastically speeding up UI development."

**Q4: How are you managing state in the frontend, and when do you choose Redux over React's built-in `useState`?**
**Answer:** "I use Redux Toolkit primarily for global application state—specifically for handling authentication (like the JWT token, user details, and global loading statuses). This prevents 'prop drilling' and allows any component in the tree (like the Navbar or the Dashboard) to easily know if a user is logged in. However, for local, transient state—like the input fields inside the Resume Builder form before they are saved—I stick to standard React hooks like `useState` and `useEffect`, as putting every single keystroke into Redux would be overkill."

**Q5: How do you handle Cross-Origin Resource Sharing (CORS) in your Node.js backend?**
**Answer:** "I use the `cors` middleware in my Express server. I configured it dynamically to check the incoming `origin`. It explicitly allows requests coming from my local development environment (`localhost`) as well as production domains like `vercel.app` or `onrender.com`, while rejecting unknown origins. I also set `credentials: true` in the CORS config to allow authorization headers to be passed securely between the frontend and backend."

**Q6: What happens if the AI API goes down or takes too long to respond during an ATS analysis?**
**Answer:** "I wrapped the AI API call in a try-catch block. If the API fails or times out, the catch block triggers a failover mechanism. It automatically generates a 'stable' mock JSON response containing a baseline score and generic feedback so that the frontend doesn't completely break, and the user still receives an experience while the primary AI service recovers."
