export class Quiz{
    constructor(results){
        this.results=results
        this.currentIndex=0
        document.getElementById('to').innerText=this.results.length
        this.from=document.getElementById('from')
        this.question=document.getElementById('questionTitle')
        this.showQuestion()
        this.correctAnswer;
        this.score = 0;
        // =================Events=============================
        document.getElementById("nextQuestion").addEventListener("click", () => {
            this.nextQuestion();
         });
         document.getElementById("end").addEventListener("click", () => {
            location.reload();
         });
    }
    showQuestion(){
        this.from.innerText=this.currentIndex +1
        let currentQuestion=this.results[this.currentIndex]
        this.question.innerText=currentQuestion.question
        let answer=[...currentQuestion.incorrect_answers]
        this.correctAnswer=currentQuestion.correct_answer
        let randomNumber=Math.ceil(Math.random()* answer.length)
        answer.splice(randomNumber,0,this.correctAnswer)
        let answerBox=``
        for(let i=0;i<answer.length;i++){
            answerBox +=`
            <li class="my-3 animate__animated">
         <div class="pretty p-default p-round p-smooth p-plain">
            <input type="radio" name="answer" value="${answer[i]}" />
            <div class="state p-success-o">
               <label> ${answer[i]} </label>
            </div>
         </div>
      </li> 
            `
        }
        document.getElementById('questionContent').innerHTML=answerBox;
    }
    nextQuestion(){
        let currentAnswer=document.querySelector('[name="answer"]:checked')?.value;
        if(currentAnswer != undefined){
            $("#alertAns").fadeOut(300);
            this.currentIndex++;
            if(this.currentIndex > this.results.length - 1){
            $("#quiz").removeClass("show");
            $("#finsish").addClass("show");
            document.getElementById("score").innerText = this.score;
            }else{
                if(currentAnswer ===this.correctAnswer){
                    $("#correct").fadeIn(0);
               setTimeout(() => {
                  $("#correct").fadeOut(0);
               }, 500);

               this.score++;
                }else{
                    $("#inCorrect").fadeIn(0);
               setTimeout(() => {
                  $("#inCorrect").fadeOut(0);
               }, 500);
                }
                this.showQuestion()
            }
        }else{
            $("#alertAns").fadeIn(300);
        }
    }

}
