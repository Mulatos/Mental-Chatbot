// Alle mogelijke vragen die de gebruiker kan ingeven

const utterances = [ 
    ["goodbye", "i'm going now", "i'm going offline"],        //0
    ["hi", "hey", "hello", "hey there", "howdy"],      //1
    ["what are you doing", "what is going on", "what is up"],      //2
    ["how old are you", "are you old"],					//3
    ["who are you", "are you a bot", "are you human", "Are you a human or bot?"],   //4
    ["talk about yourself"],     //5
    ["can you help me", "i need help", "i am in need of help", "is it possible that you can help me", "can you please help me"],    //6
    ["what is depression"], //7
    ["what are the symptoms of depression"],    //8
    ["how do i treat depression"],  //9
    ["what is bipolar disorder"],   //10
    ["what are the symptoms of bipolar disorder"],  //11
];
   
  // Alle mogelijke antwoorden die de bot kan terug geven
   
  const answers = [
    ["Goobye and thanks for talking","Okay, have a nice day!","Thanks for chatting, have a nice day!"],     //0                                                                             	//0
    ["Hello!", "Hi!", "Hey!", "Hi there!", "Howdy"],						//1
    ["Nothing much","About to go to sleep","Can you guess?","I don't know actually"],						//2
    ["I'm a couple of days old.", "I'm still very young at the moment."],					//3
    ["I am a bot who is recently created.", "I am a bot, here to help you :)", "No. I am a bot.", "I am a bot, here to help humans."],	//4
    ["I am a bot who is created to help and inform people who struggle and/or know someone who stuggles with mental health problems."],   //5
    ["Ofcourse! What is your issue?", "I am here to help.", "I'm here for you if you need help."],  //6
    ["Depression (major depressive disorder) is a common and serious medical illness that negatively affects how you feel, the way you think and how you act. Fortunately, it is also treatable" +
    ". Depression causes feelings of sadness and/or a loss of interest in activities you once enjoyed." +
    " It can lead to a variety of emotional and physical problems and can decrease your ability to function at work and at home."], //7
    ["Feeling sad or having a depressed mood, loss in interest or pleasures in activities once enjoyed, " +
    "changes in appetite and trouble sleeping are couple of known symptoms."],   //8
    ["Make a appointment to a health professional you know. Ask for a physical and diagnostic examnination if you don't have a official diagnosis."],   //9
    ["Bipolar disorder is characterised by extreme mood swings. These can range from extreme highs (mania) to extreme lows (depression)." +
     "Episodes of mania and depression often last for several weeks or months."],   //10
    ["Feeling sad, hopeless or irritable most of the time, difficulty concentrating and remembering things," +
    " loss of interest in everyday activities, feelings of emptiness or worthlessness,"+
    " being delusional, having hallucinations and disturbed or illogical thinking are some of the symptoms known for Bipolar Disorder."],   //11
  ];
   
  // Als de bot iets niet herkent, geeft hij deze antwoorden terug
   
  const alternatives = [
    "I don't understand, ask something else.",
    "The question you asked is unknown to me, please try again.",
    "Failed to understand. Try asking something else."
  ];

  // Leest de waarde als in de input als de gebruiker op enter drukt

const inputField = document.getElementById("input");
inputField.addEventListener("keydown", (e) => {
  if (e.code === "Enter") {
    let input = inputField.value;
    inputField.value = "";
    output(input);
  }
});

function output(input) {
  let product;
  let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");
  text = text
    .replace(/ a /g, " ")
    .replace(/whats/g, "what is")
    .replace(/please /g, "")
    .replace(/ please/g, "")
    .replace(/r u/g, "are you");

    input = input.charAt(0).toUpperCase() + input.slice(1)

  if (compare(utterances, answers, text)) {
    // Search for exact match in triggers
    product = compare(utterances, answers, text);
  } 
  else {
    product = alternatives[Math.floor(Math.random() * alternatives.length)];
  }
  addChatEntry(input, product);
  speak(product);
}

function compare(utterancesArray, answersArray, string) {
  let reply;
  let replyFound = false;
  for (let x = 0; x < utterancesArray.length; x++) {
    for (let y = 0; y < utterancesArray[x].length; y++) {
      if (utterancesArray[x][y] === string) {
        let replies = answersArray[x];
        reply = replies[Math.floor(Math.random() * replies.length)];
        replyFound = true;
        break;
      }
    }
    if (replyFound) {
      break;
    }
  }
  return reply;
}

function addChatEntry(input, product) {
  const messagesContainer = document.getElementById("messages");
  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.className = "user response";
  userDiv.innerHTML = `<span>${input}</span>`;
  messagesContainer.appendChild(userDiv);

  let botDiv = document.createElement("div");
  let botText = document.createElement("span");
  botDiv.id = "bot";
  botDiv.className = "bot response";
  botText.innerText = "Responding...";
  botDiv.appendChild(botText);
  messagesContainer.appendChild(botDiv);

  messagesContainer.scrollTop =
    messagesContainer.scrollHeight - messagesContainer.clientHeight;

  setTimeout(() => {
    botText.innerText = `${product}`;
  }, 1500);
}

function speak(string){
  const utterance = new SpeechSynthesisUtterance();
  utterance.voice = speechSynthesis.getVoices().filter(function(voice){return voice.name == "Alex"})[0];
  utterance.text = string;
  utterance.lang = "en-US";
  utterance.volume = 1; //0-1 interval
  utterance.rate = 1;
  utterance.pitch = 1; //0-2 interval
  setTimeout(() =>{
    speechSynthesis.speak(utterance);
  }, 1500)
}