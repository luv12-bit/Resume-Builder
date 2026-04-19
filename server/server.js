import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./configs/db.js"
import userRouter from "./routes/userRoutes.js"
import resumeRouter from "./routes/resumeRoutes.js"
import aiRouter from "./routes/aiRoutes.js"

const app = express()
const PORT = process.env.PORT || 3000

// Database connection 
await connectDB()

// middleware
app.use(express.json())
// app.use(cors({
//   origin: [
//     "http://localhost:5173",
//     "https://resume-builder-atopxl9n0-luvmaken107-3088s-projects.vercel.app"
//   ],
//   credentials: true
// }));
// app.use(cors({
//   origin: [
//     "http://localhost:5173",
//     "https://resume-builder-tau-three-96.vercel.app"
//   ],
//   credentials: true
// }));
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (
      origin.includes("localhost") ||
      origin.includes("127.0.0.1") ||
      origin.includes("vercel.app")
    ) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));

// routes
app.get('/', (req,res) => res.send("Server is live..."))
app.use('/api/users', userRouter)
app.use('/api/resumes', resumeRouter)
app.use('/api/ai',aiRouter)

app.listen(PORT , ()=> {
    console.log(`Server is running on port ${PORT}`)
})