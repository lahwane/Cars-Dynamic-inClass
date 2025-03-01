
export const surveyService = {
    getById
}

function getById() {
    return Promise.resolve(survey)
}

const survey = {
    title: 'Cars Shopping',
    cmps: [
        {
            type: 'TextBox',
            id: 'c101',
            info: {
                label: 'Your fullname:'
            }
        },
        {
            type: 'SelectBox',
            id: 'c102',
            info: {
                label: 'How was it:',
                opts: ['Great', 'Fine', 'Crap', 'Worst Ever']
            }
        }
    ]
}