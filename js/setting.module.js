/// <reference types="../@types/jquery" />
import { Quiz } from "./quiz.module.js";
export class Setting{
    constructor(){
        document.getElementById("start").addEventListener('click',this.startQuestion.bind(this))
    }
    async startQuestion(){
        let category=document.getElementById('category').value
        let difficulty=document.querySelector('[name="difficulty"]:checked').value
        let numberofQuestion=document.getElementById('amount').value
        if(numberofQuestion >0){
            let result=await this.getQuestion(category,difficulty,numberofQuestion)
            $("#setting").removeClass("show");
            $("#quiz").addClass("show");
            let quiz=new Quiz(result);
        }else{
            $("#alertNumber").fadeIn(1000);
        }    
    }
    async getQuestion(cat,difficult,amount){
        let api=await fetch(`https://opentdb.com/api.php?amount=${amount}&category=${cat}&difficulty=${difficult}`)
        let response=await api.json()
        return response.results
    }

}