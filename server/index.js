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
    additionalProperties: false,
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
                additionalProperties: false,
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

// export default async ({req, res, log}) => {
//     try{
//         const { goal } = JSON.parse(req.body || "{}");
//         log("goal received:",goal);

//         if (!goal) return res.status(400).json({error: "Missing \'goal\' in body"});

//         const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

//         const r = await openai.responses.create({
//             model: "gpt-4o-mini",
//             temperature: 0.3,
//             input: [
//                 { role: "system", content: [{ type: "text", text: SYSTEM }]},
//                 { role: "user", content: [{ type: "text", text: `Goal: ${goal}`}]}
//             ],
//             response_format: { 
//                 type: "json_schema", 
//                 json_schema: {
//                     name:"ProficiencyLevels", 
//                     schema, 
//                     strict: true}}
//         });

//         const out = JSON.parse(r.output_text);
//         return res.json(out);
//     }
//     catch(e){
//         log(e?.message || e);
//         return res.status(500).json({error: "Proficiency mapping failed"});
//     }
// };

// assume SYSTEM and schema are defined above

export default async ({ req, res, log }) => {
  const t0 = Date.now();
  const L = (m, x) => log(`+${Date.now()-t0}ms ${m}${x ? " " + JSON.stringify(x) : ""}`);

  try {
    let goal;
    try {
      ({ goal } = JSON.parse(req.body || "{}"));
    } catch {
      L("bad JSON body");
      return res.json({ error: "Invalid JSON body" }, 400);
    }

    L("goal parsed", { preview: String(goal || "").slice(0, 120) });
    if (!goal) return res.json({ error: "Missing 'goal' in body" }, 400);

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    L("calling openai");

    const r = await openai.responses.create({
    model: "gpt-4o-mini",
    temperature: 0.3,
    input: [
        { role: "system", content: [{ type: "input_text", text: SYSTEM }] },
        { role: "user",   content: [{ type: "input_text", text: `Goal: ${goal}` }] }
    ],
    // ⬇️ Responses API uses text.format instead of response_format
    text: {
        format: {
        type: "json_schema",
        name: "ProficiencyLevels",
        schema,
        struct: true
        }
    }
    });

    L("openai returned", { len: r?.output_text?.length ?? 0 });

    let out;
    try {
      out = JSON.parse(r?.output_text ?? "");
    } catch (e) {
      L("openai bad json", { err: String(e), snip: (r?.output_text || "").slice(0, 200) });
      return res.json({ error: "Upstream returned non-JSON" }, 502);
    }

    L("success");
    return res.json(out, 200);
  } catch (e) {
    L("unhandled", { err: e?.message || String(e) });
    return res.json({ error: "Proficiency mapping failed" }, 500);
  }
};
