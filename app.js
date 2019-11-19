new Vue({
    el: '#game',
    data: {
        monster: {
            life: 100,
            name:"Ugly Monster"
        },
        user: {
            life: 100,
            name:"User"
        },
        isInGame: false,
        logs: []
    },
    watch: {
        "monster.life": function (el) {
            if(el <= 0){
                this.endGame(this.user.name)
            }
        },
        "user.life": function (el) {
            if(el <= 0){
                this.endGame(this.monster.name)
            }
        }
    },
    methods: {
        generateWidth: function (el) {
            return {
                width: el.life + "%"
            }
        },
        startGame: function () {
            this.isInGame = true
            this.monster.life = 100
            this.user.life = 100
        },
        endGame: function (el=null) {
            this.isInGame = false
            if(el)
                alert(el + " has won the game !")
        },
        attack: function (from, to) {
            let damage = Math.floor(Math.random() * 20)
            to.life -= damage
            let isUser = (to === this.monster)

            this.log(from.name + " attacks " + to.name + " for " + damage,isUser)

            if (isUser || ((from === this.user) && to === this.user)){ this.monsterAction() }
        },
        heal: function (from, isWildCard = false) {
            let heal = Math.floor(Math.random() * 20)
            from.life = (from.life + heal > 100) ? 100 : from.life + heal
            let isUser = (from !== this.monster)
            this.log(from.name + " heals for " + heal,isUser)
            if (isUser || isWildCard) {
                this.monsterAction();
            }
        },
        monsterAction: function () {
            if (Math.random() > 0.5 && this.monster.life < this.user.life) {
                this.heal(this.monster)
            } else {
                this.attack(this.monster, this.user)
            }
        },
        wildCard:function(){
            let from = (Math.random() > 0.5) ? this.user : this.monster
            if(Math.random() > 0.5){
                let to = (Math.random() > 0.5) ? this.user : this.monster
                this.attack(from,to)
            }else{
                this.heal(from,true)
            }
        },
        log:function(message,isPositive){
            this.logs.unshift({
                message, isPositive
            })
        }
    },
});