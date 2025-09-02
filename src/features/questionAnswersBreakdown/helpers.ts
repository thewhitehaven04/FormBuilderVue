import type { fetchAnswers } from '@/services/submissions'

function getChart(answers: Awaited<ReturnType<typeof fetchAnswers>> | null) {
    if (!answers || answers.length === 0) {
        return []
    }

    const uniqueOptions = answers[0].questions.options.map((o) => ({
        id: o.id,
        text: o.text,
        count: 0,
    }))

    const labels = uniqueOptions.map((o) => o.text)

    for (const option of uniqueOptions) {
        answers.forEach((answer) => {
            if (answer.option_id === option.id) {
                option.count++
            }
        })
    }

    const data = uniqueOptions.map((o) => o.count)

    return {
        labels,
        datasets: [
            {
                data,
            },
        ],
    }
}

function hashCode(str) { 
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
       hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
} 

function intToRGB(i){
    const c = (i & 0x00FFFFFF)
        .toString(16)
        .toUpperCase();

    return "00000".substring(0, 6 - c.length) + c;
}

function getBar(answers: Awaited<ReturnType<typeof fetchAnswers>> | null) {
    if (!answers || answers.length === 0) {
        return []
    }

    const uniqueOptions = answers[0].questions.options.map((o) => ({
        id: o.id,
        text: o.text,
        count: 0,
    }))

    for (const option of uniqueOptions) {
        answers.forEach((answer) => {
            if (answer.option_id === option.id) {
                option.count++
            }
        })
    }

    return {
        labels: ['Answer frequency'],
        datasets: uniqueOptions.map((o) => ({
            label: o.text,
            data: [o.count]
        })),
    }
}

export { getChart, getBar }
