import OpenAI from "openai";

const SYSTEM = `You are a skill-mapping assistant.

Task:
- Read the user's long goal description.
- Produce a concise goal_title (3–7 words, plain noun phrase, no emojis).
- Keep the original text as goal_input.
- Create exactly 5 proficiency levels (Level 1 → Level 5) that are clear, non-overlapping, and practical.

Output rules:
- Return valid JSON only (no prose), matching the provided JSON schema.
- goal_title must be ≤ 60 characters.
- Be concrete and observable for criteria and tasks; avoid vague wording.
`;

const schema = {
    type: "object",
    required: ["goal_input","goal_title","levels"],
    properties: {
        goal_input: {type: "string"},
        goal_title: {type: "string", maxLength: 60},
        levels: {
            type: "array",
            minItems: 5,
            maxItems: 5,
            items: {
                type: "object",
                required: ["label","name","description","example_tasks"],
                properties: {
                    label: {type: "string"},
                    name: {type: "string"},
                    description: {type: "string"},
                    example_tasks: {
                        type: "array",
                        items: {type: "string"},
                        minItems: 3,
                        maxItems: 5
                    }
                }
            }
        }
    }
};

export default async ({req, res, log}) => {
    try{
        const { goal } = JSON.parse(req.body || "{}");
        if (!goal) return res.status(400).json({error: "Missing \'goal\' in body"});

        const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

        const r = await openai.responses.create({
            model: "gpt-4o-mini",
            temperature: 0.3,
            input: [
                { role: "system", content: [{ type: "text", text: SYSTEM }]},
                { role: "user", content: [{ type: "text", text: `Goal: ${goal}`}]}
            ],
            response_format: { 
                type: "json_schema", 
                json_schema: {
                    name:"ProficiencyLevels", 
                    schema, 
                    strict: true}}
        });

        const out = JSON.parse(r.output_text);
        return res.json(out);
    }
    catch(e){
        log(e?.message || e);
        return res.status(500).json({error: "Proficiency mapping failed"});
    }
};

