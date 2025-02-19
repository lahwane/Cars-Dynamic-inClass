import { surveyService } from "../services/survey.service.js"

const { useState, useEffect } = React

export function SurveyIndex() {
    const [survey, setSurvey] = useState(null)
    const [answersMap, setAnswersMap] = useState({})

    useEffect(() => {
        surveyService.getById()
            .then(survey => {
                console.log('survey:', survey)
                setSurvey(survey)
            })
    }, [])

    function onChangeVal(id, val) {
        setAnswersMap(prevAnswers => ({ ...prevAnswers, [id]: val }))
    }

    if (!survey) return '<div></div>'

    const style = {
        backgroundColor: 'lightcoral',
        padding: '5px', margin: '5px'
    }
    return (
        <section className="survey-index">
            <h2>Survey - {survey.title}</h2>
            {
                survey.cmps.map(cmp => <div key={cmp.id} style={style}>
                    <DynamicCmp
                        type={cmp.type}
                        info={cmp.info}
                        val={answersMap[cmp.id] || ''}
                        onChangeVal={(val) => {
                            onChangeVal(cmp.id, val)
                        }}
                    />
                </div>)
            }
            <hr />
            <pre>
                {JSON.stringify(answersMap, null, 2)}
            </pre>
        </section >
    )
}

function TextBox({ info, val = '', onChangeVal }) {
    const { label } = info
    return (
        <label>
            {label}
            <input type="text" value={val} onChange={(ev) => {
                onChangeVal(ev.target.value)
            }} />
        </label>
    )
}

function SelectBox({ info, val = '', onChangeVal }) {
    const { label, opts } = info
    return (
        <label>
            {label}
            <select value={val} onChange={(ev) => {
                onChangeVal(ev.target.value)
            }}>
                <option value="">Select an option</option>
                {
                    opts.map(opt => <option key={opt}>{opt}</option>)
                }
            </select>
        </label>
    )
}

function DynamicCmp(props) {
    switch (props.type) {
        case 'TextBox':
            return <TextBox {...props} />
        case 'SelectBox':
            return <SelectBox {...props} />
    }
}
