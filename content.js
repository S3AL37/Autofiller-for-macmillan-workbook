document.addEventListener('click' , function() {
    setTimeout(function() {
    if (window.location.href.includes("activitySetId")) {
        if (typeof complete === "undefined") {

            document.getElementsByClassName('M2UGVMD-b-Jb M2UGVMD-b-jc M2UGVMD-b-Td')[0].className = 'M2UGVMD-b-Jb M2UGVMD-b-jc M2UGVMD-b-ik M2UGVMD-b-Td';
            
            const complete = document.createElement('button');
            complete.innerText = "Complete activity";
            complete.type = "button"
            complete.id = "complete";
            complete.className = "M2UGVMD-b-Jb M2UGVMD-b-jc M2UGVMD-b-Td";
    
            document.getElementsByClassName('M2UGVMD-b-Hg M2UGVMD-b-Oq')[0].insertBefore(complete, document.getElementsByClassName('M2UGVMD-b-Hg M2UGVMD-b-Oq')[0].childNodes[5]);
            complete.addEventListener('click', magic)
        } 
    } else if(typeof complete != "undefined") {
        document.getElementsByClassName('M2UGVMD-b-Hg M2UGVMD-b-Oq')[0].removeChild(document.getElementsByClassName('M2UGVMD-b-Hg M2UGVMD-b-Oq')[0].childNodes[5])
    }}, 50)
})
 
 


function magic () {
        var source =  (window.location.href)
        baseUrl = "https://prod.lms.macmillaneducation.com/lms/v1/activityset/" + source.substr(source.search("activitySetId")+14, 5) + "/activities/" + source.substr(source.search("activityId")+11, 32) + "/"
        
        
        fetch(baseUrl + "answer")
            .then(response => response.json())
            .then(data => {
                var temp;
                for(i=0; i < data.answers.length; i++) {
                    if (data.answers[i].type === "choice") {
                        temp = data.answers[i].value[0];
                        delete data.answers[i].value;
                        data.answers[i].value = temp;
                    }
                }
                individualCheck = new Boolean(true);
                for(i=0; i < data.answers.length; i++) {
                    if (data.answers[i].elm.toLowerCase().includes("textinput")) {
                        individualCheck = false;
                    }
                }
                console.log(JSON.stringify(data));
                if (individualCheck) {
                    fetch(baseUrl + "results", {
                        "headers": {
                        "accept": "application/json",
                        "accept-language": "pl-PL,pl;q=0.9,en-GB;q=0.8,en-US;q=0.7,en;q=0.6",
                        "content-type": "application/json",
                        "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"91\", \"Chromium\";v=\"91\"",
                        "sec-ch-ua-mobile": "?0",
                        "sec-fetch-dest": "empty",
                        "sec-fetch-mode": "cors",
                        "sec-fetch-site": "same-origin",
                        "x-http-method-override": "POST",
                        "x-requested-with": "XMLHttpRequest",
                        },
                        "referrerPolicy": "strict-origin-when-cross-origin",
                        "body": JSON.stringify({'answers' : data.answers}),
                        "method": "POST",
                        "mode": "cors"
                    });
                } else {
                    console.log("You cannot autocomplete individual exercises.")
                }
                
            });
}
