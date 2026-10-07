const extensionMap = {
    cpp: ".cpp",
    java: ".java",
    python3: ".py",
    python: ".py",
    javascript: ".js",
    typescript: ".ts",
    csharp: ".cs",
    c: ".c",

    go: ".go",
    kotlin: ".kt",
    swift: ".swift",
    rust: ".rs",
    ruby: ".rb",
    php: ".php",
    dart: ".dart",
    scala: ".scala",

    elixir: ".ex",
    erlang: ".erl",
    racket: ".rkt"
};


chrome.runtime.onMessage.addListener((message) => {
    console.log(message);
    console.log(message.questionId.padStart(4,"0"));
    console.log(extensionMap[message.lang])
    const filePath = message.questionId.padStart(4,"0")+"-" + message.titleSlug + "/" + "Solution" + extensionMap[message.lang]
    console.log(filePath)
});

console.log(chrome.identity.getRedirectURL());

