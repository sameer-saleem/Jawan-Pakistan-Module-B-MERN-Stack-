const { model } = require("mongoose");
const opens = require("../../modules/opens");
const axios = require("axios");

exports.addOpen = async (req, res) => {
  try {
    const { text } = req.body;
  } catch (err) {
    console.log(err);
  }

  const prompt = `Provide helpful suggestion for this feedback:`;
  const aiRes = await axios.post(`https://openai.com/v1/completions`, {
    model: "text-davinci-003",
    prompt,
    max_token: 100,
    header: {
      Authorization: `Bearer`,
    },
  });

  const aiSuggestion = aiRes.data.choices[0].text.trim();

  const opinion = new opens({
    text,
    aiSuggestion,
  });

  await opinion.save();
};

exports.getOpen = async (req, res) => {
  const opinions = await opinions.find().sort({
    createdAt: -1,
  });
  res.json();
};
