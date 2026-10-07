const query = `\n    query submissionDetails($submissionId: ID!) {\n  submissionDetails(submissionIdV2: $submissionId) {\n code\n    timestamp\n    statusCode\n isCompiledLang\n  user {\n      username\n      profile {\n        realName\n  }\n    }\n    lang {\n      name\n      verboseName\n    }\n    question {\n      questionId\n      titleSlug\n }\n    notes\n    flagType\n    topicTags {\n      tagId\n      slug\n      name\n    }\n    runtimeError\n    compileError\n    lastTestcase\n    codeOutput\n  totalCorrect\n    totalTestcases\n  }\n}\n`

let prevUrl = location.href;
if(prevUrl.includes("/submissions/")){
    console.log("success")
}
else{
    console.log("fail");
}
setInterval(() =>{
    let currnetUrl = location.href;
    if(currnetUrl !== prevUrl){
        if(currnetUrl.includes("/submissions")){
            console.log("success")
            const id =currnetUrl.split("/")[6]
            const variables = {
                submissionId:id
            }

            fetch("https://leetcode.com/graphql/",{
                method:'post',
                body:JSON.stringify({
                    query:query,
                    variables:variables
                }),
                headers: {
                    "Content-Type": "application/json"},
            }).then(response => response.json())
            .then(data => {
                if(data.data.submissionDetails.statusCode === 10 || data.data.submissionDetails.statusCode === 16){
                console.log("accepted")
                const submission = {
                    id : id,
                    code : data.data.submissionDetails.code,
                    lang :data.data.submissionDetails.lang.name,
                    questionId : data.data.submissionDetails.question.questionId,
                    titleSlug : data.data.submissionDetails.question.titleSlug,

                }
                console.log(submission)
                chrome.runtime.sendMessage(submission)
            }
            else console.log("not accepted");
            });

            console.log(id)
        }
        else{
            console.log("error")
        }
    }
    prevUrl = currnetUrl;
},500)