let captchaTrial = {
    type: jsPsychHtmlButtonResponse,
    choices: ["Check"],

    button_html: '<button class="check-btn" style="display:none">%choice%</button>', // hide the button
    
    stimulus: function() {
      return `
      <div style="display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0;">
      <div class="wrapper">
        <div class="wrapper-head">Captcha</div>
        <div class="captcha-area">
        <div class="captcha-img">
            <img src="captcha-bg.png" alt="Captch Background">
            <span class="captcha"></span>
        </div>
        <button class="reload-btn"><i class="fas fa-redo-alt">🗘</i></button>
        </div>
        <form action="#" class="input-area">
        <input type="text" placeholder="Enter captcha" maxlength="6" spellcheck="false" required>
        <button class="check-btn">Check</button>
        </form>
        <div class="status-text"></div>
        </div>
      </div>
      `;
    },

    on_load: function() {
    // Define your CSS rules
    const cssRules = `
    /* Import Google font - Poppins & Noto */

    @import url('https://fonts.googleapis.com/css2?family=Noto+Serif:ital@1&family=Poppins:wght@400;500;600&display=swap');
    *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
    }
    ::selection{
    color: #fff;
    background: #003e65;
    }

    .wrapper{
    max-width: 485px;
    width: 100%;
    background: #fff;
    border: 2px solid #003e65;
    padding: 22px 30px 40px;
    border-radius: 10px;
    box-shadow: 8px 8px 8px rgba(0, 0, 0, 0.05);
    }
    .wrapper-head{
    color: #003e65;
    font-size: 33px;
    font-weight: 500;
    text-align: center;
    }
    .wrapper .captcha-area{
    display: flex;
    height: 65px;
    margin: 30px 0 20px;
    align-items: center;
    justify-content: space-between;
    }
    .captcha-area .captcha-img{
    height: 100%;
    width: 345px;
    user-select: none;
    background: #000;
    border-radius: 5px;
    position: relative;
    }
    .captcha-img img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
    opacity: 0.95;
    }
    .captcha-img .captcha{
    position: absolute;
    left: 50%;
    top: 50%;
    width: 100%;
    color: #fff;
    font-size: 35px;
    text-align: center;
    letter-spacing: 10px;
    transform: translate(-50%, -50%);
    text-shadow: 0px 0px 2px #b1b1b1;
    font-family: 'Noto Serif', serif;
    }

    .captcha-img .captcha{
        position: absolute;
        left: 50%;
        top: 50%;
        width: 100%;
        color: white; /* Change the text color here */
        font-size: 35px;
        text-align: center;
        letter-spacing: 10px;
        transform: translate(-50%, -50%);
        text-shadow: 0px 0px 5px #b1b1b1; /* Increase the text-shadow here */
        font-family: 'Noto Serif', serif;
    }
    
    .wrapper button{
    outline: none;
    border: none;
    color: #fff;
    cursor: pointer;
    background: #003e65;
    border-radius: 5px;
    transition: all 0.3s ease;
    }
    .wrapper button:hover{
    background: #2fa5e9;
    }
    .captcha-area .reload-btn{
    width: 75px;
    height: 100%;
    font-size: 25px;
    }
    .captcha-area .reload-btn i{
    transition: transform 0.3s ease;
    }
    .captcha-area .reload-btn:hover i{
    transform: rotate(15deg);
    }
    .wrapper .input-area{
    height: 60px;
    width: 100%;
    position: relative;
    }
    .input-area input{
    width: 100%;
    height: 100%;
    outline: none;
    padding-left: 20px;
    font-size: 20px;
    border-radius: 5px;
    border: 1px solid #bfbfbf;
    }
    .input-area input:is(:focus, :valid){
    padding-left: 19px;
    border: 2px solid #003e65;
    }
    .input-area input::placeholder{
    color: #bfbfbf;
    }
    .input-area .check-btn{
    position: absolute;
    right: 7px;
    top: 50%;
    font-size: 17px;
    height: 45px;
    padding: 0 20px;
    opacity: 0;
    pointer-events: none;
    transform: translateY(-50%);
    }
    .input-area input:valid + .check-btn{
    opacity: 1;
    pointer-events: auto;
    }
    .wrapper .status-text{
    display: none;
    font-size: 18px;
    text-align: center;
    margin: 20px 0 -5px;
    }
    @media (max-width: 506px){
    body{
        padding: 0 10px;
    }
    .wrapper{
        padding: 22px 25px 35px;
    }
    .wrapper header{
        font-size: 25px;
    }
    .wrapper .captcha-area{
        height: 60px;
    }
    .captcha-area .captcha{
        font-size: 28px;
        letter-spacing: 5px;
    }
    .captcha-area .reload-btn{
        width: 60px;
        margin-left: 5px;
        font-size: 20px;
    }
    .wrapper .input-area{
        height: 55px;
    }
    .input-area .check-btn{
        height: 40px;
    }
    .wrapper .status-text{
        font-size: 15px;
    }
    .captcha-area .captcha-img{
        width: 250px;
    }
    }
    `;

    // Create a style tag
    const style = document.createElement('style');

    // Make sure we have styles defined
    if (style.styleSheet) {
        style.styleSheet.cssText = cssRules; // for IE
    } else {
        style.appendChild(document.createTextNode(cssRules)); // for other browsers
    }

    // Append the style tag to head
    document.head.appendChild(style);

    // Store a reference to the style element in the trial data
    //jsPsych.getCurrentTrial().data.styleElement = style;
    const currentTrial = jsPsych.getCurrentTrial();
    if (currentTrial) {
        currentTrial.data = currentTrial.data || {};
        currentTrial.data.styleElement = style;
    } else {
        console.error("Unable to find current trial");
    }

        

        const checkBtn = document.querySelector('.check-btn');
        const inputField = document.querySelector('.input-area input');
        let captcha = document.querySelector('.captcha');
    
        let reloadBtn = document.querySelector(".reload-btn");
        let statusTxt = document.querySelector(".status-text");
    
        let allCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O',
                            'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd',
                            'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's',
                            't', 'u', 'v', 'w', 'x', 'y', 'z', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    
        function getCaptcha(){
            captcha.innerText = ""; 
            for (let i = 0; i < 6; i++) { 
                let randomCharacter = allCharacters[Math.floor(Math.random() * allCharacters.length)];
                captcha.innerText += ` ${randomCharacter}`; 
            }
        }
    
        function removeContent(){
            inputField.value = "";
            captcha.innerText = "";
            statusTxt.style.display = "none";
        }
    
        getCaptcha();
    
        reloadBtn.addEventListener("click", ()=>{
            removeContent();
            getCaptcha();
        });
    
        checkBtn.addEventListener('click', function(e) {
            e.preventDefault();
        
            let inputVal = inputField.value.split('').join(' ');
            if(inputVal == captcha.innerText) {
                jsPsych.finishTrial({ 
                    success: true,
                    input: inputVal
                });
            } 
            else {
                statusTxt.style.color = "#ff0000";
                statusTxt.style.display = "block";
                statusTxt.innerText = "Captcha was not recognized. Please try again!";
                setTimeout(function(){ // introduce delay
                    statusTxt.style.display = "none";
                    removeContent();
                    getCaptcha();
                }, 2500);
            }
        });
        
    },
    

    on_finish: function(data) {
    document.head.removeChild(data.styleElement);
    // Handle data logging or any cleanup here if required.
    // This code will execute after the trial ends.
    }
};

