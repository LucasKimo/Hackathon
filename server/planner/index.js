import OpenAI from "openai";

const SYSTEM = `You are a skill-mapping assistant.
Input: a goal description (e.g., "become a full-stack developer").
Output: exactly 5 proficiency levels for this goal (Level 1 to Level 5).
For each level provide:
- label: "Level 1" .. "Level 5"
- name: short title (e.g., "Foundations", "Intermediate", "Advanced")
- description: what this level means in practice
- example_tasks: 3–5 tasks someone at this level can perform
Be concise, concrete, and avoid overlap between levels.`

const schema = {
    type: "object",
    required: ["goal","levels"],
    properties: {
        goal: {type: "string"},
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
                    descripton: {type: "string"},
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

        out.goal = goal;
        return res.json(out);
    }
    catch(e){
        log(e?.message || e);
        return res.status(500).json({error: "Profiency mapping failed"});
    }

}

