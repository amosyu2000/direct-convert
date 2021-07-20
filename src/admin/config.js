export const CONFIG = {
	xlsx: {
		qti: {
			engine: null,
			questions: [
				{
					name: "Multiple Choice",
					engine: null,
					templates: [
						{
							name: "Key Word",
							question: "{question} {word}\n\n{phrase} - {reference}",
							example: "How are these accusatives functioning? ὑμᾶς & λόγον\n\nἐρωτήσω ὑμᾶς κἀγὼ λόγον ἕνα - Matthew 21:24"
						}	
					]
				},
				{
					name: "Multiple Answers",
					engine: null,
					templates: []
				},
				{
					name: "Fill in the Blanks",
					engine: null,
					templates: []
				}
			]
		}
	}
}