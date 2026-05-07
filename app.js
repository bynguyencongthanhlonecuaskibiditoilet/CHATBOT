const chat = document.getElementById("chat");

/*
========================
THAY API KEY Ở ĐÂY
========================
*/

const API_KEY = "AIzaSyD7XHyP6v-sF80ojLoG0BxWbMDwlNcgnGk";

/*
========================
KHÔNG ĐỤNG PHÍA DƯỚI
========================
*/

function addMessage(text,type){

  const div = document.createElement("div");

  div.className = "msg " + type;

  div.innerText = text;

  chat.appendChild(div);

  chat.scrollTop = chat.scrollHeight;
}

async function askAI(message){

  try{

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + API_KEY,
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          contents:[
            {
              parts:[
                {
                  text:message
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    console.log(data);

    return data.candidates[0].content.parts[0].text;

  }catch(error){

    console.log(error);

    return "AI đang lỗi liên hệ https://www.facebook.com/nguyencongthanh06 để được hỗ trợ 😅";
  }
}

async function sendMessage(){

  const input = document.getElementById("message");

  const text = input.value.trim();

  if(!text) return;

  addMessage(text,"user");

  input.value = "";

  addMessage("Đang trả lời...","ai");

  const loading = document.querySelectorAll(".ai");

  const last = loading[loading.length - 1];

  const reply = await askAI(text);

  last.innerText = reply;
}
