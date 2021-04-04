export default class Render {

    static showOrRemoveField(field) {
        if (field.classList.contains("paintUp")) {
            field.classList.remove("paintUp");
        } else {
            field.classList.add("paintUp");
        }

    }
    static renderScope(scope){
        let display_score = document.querySelector(".display_score");
        display_score.innerText = scope;
    }
    static renderDieMessage(){
        let wrapper_die_message = document.querySelector(".wrapper_die_message");
        wrapper_die_message.classList.remove("hidden");
        setTimeout(function () {
            document.location.reload();
        },3000);
    }
}