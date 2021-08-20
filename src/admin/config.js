import * as convertEngines from 'engines/convert'
import * as questionEngines from 'engines/question'
import * as worksheetEngines from 'engines/worksheet'

export const CONFIG = {
	xlsx: {
		qti: {
			convertEngine: convertEngines.xlsxQtiConvertEngine,
			questions: [
				// {
				// 	name: "Multiple Answers",
				// 	questionEngine: questionEngines.maqQuestionEngine,
				// 	worksheetEngine: worksheetEngines.maqWorksheetEngine,
				// 	templates: [
				// 		// {
				// 		// 	name: "Parse (Shuffles answers)",
				// 		// 	question: "Parse the following word: {Word}",
				// 		// 	example: "Parse the following word: ἤγαγεν"
				// 		// },
				// 	]
				// },
				{
					name: "Multiple Choice",
					questionEngine: questionEngines.mcqQuestionEngine,
					worksheetEngine: worksheetEngines.mcqWorksheetEngine,
					templates: [
						{
							name: "Key Word",
							question: "{Question} {Word}\n\n{Phrase (with English glosses)} - {Reference}",
							example: "How are these accusatives functioning? ὑμᾶς & λόγον\n\nἐρωτήσω ὑμᾶς κἀγὼ λόγον ἕνα - Matthew 21:24"
						},
					]
				},
				{
					name: "Multiple Dropdowns",
					questionEngine: questionEngines.mdqQuestionEngine,
					worksheetEngine: worksheetEngines.mdqWorksheetEngine,
					templates: [
						{
							name: "Parse",
							question: "Parse the following word: {Word}. Tense: [Tense]. Voice: [Voice]. Mood: [Mood]. Case: [Case]. Person/Gender: [Person/Gender]. Number: [Number]. "
						},
						{
							name: "Parse with Context",
							question: "Parse the word \"{Word}\" as it appears in \"{Context}\". Tense: [Tense]. Voice: [Voice]. Mood: [Mood]. Case: [Case]. Person/Gender: [Person/Gender]. Number: [Number]. "
						}
					]
				},
				{
					name: "Short Answer",
					questionEngine: questionEngines.saqQuestionEngine,
					worksheetEngine: worksheetEngines.saqWorksheetEngine,
					templates: [
						{
							name: "Parse Lexical",
							question: "Give the lexical form for the following word: {Word}"
						}
					]
				},
			]
		}
	},
}