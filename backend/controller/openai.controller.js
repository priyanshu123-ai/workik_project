import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const generateResponse = async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo", // or try "mistralai/mixtral-8x7b"
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "HTTP-Referer": "http://localhost:3000", // must match your local or deployed frontend
          "X-Title": "My Free AI App",
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ success: true, reply });
  } catch (error) {
    console.error("OpenRouter Error:", error?.response?.data || error.message);
    res
      .status(500)
      .json({ success: false, message: "Free AI generation failed." });
  }
};
