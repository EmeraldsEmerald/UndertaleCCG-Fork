Vue.component('card', {
    data: function () {
        return {
            tempDisplayCard: null,
        }
    },
    methods: {
        onMouseOverCollection: function (name) {
            let x = 100 + (this.pos % 4 + 1) * 150
            let y = this.pos <= 3 ? 200 : 450
            x += 140
            y -= 20
            x += 'px'
            y += 'px'
            this.tempDisplayCard = { card: this.getCardData()[name], x, y, name }
        },
        calcKeywordX: function (i) {
            let x = 100
            if (this.card.dreamVariant || this.card.awakenedDreamVariant) {
                x -= 20
            }
            x -= i * 20
            return x + 'px'
        },
        calcClass: function () {
            if (!this.active) {
                return ''
            }
            CSSclass = ''
            if (this.getSelectable(this.card)) {
                CSSclass+="selectable"
            }
            return CSSclass
        },
        handleClick: function (event) {
            if (!this.active) return;
            this.$emit("card-chosen", this.card.chooseValue)
        },
        setOverlayText: function (text) {
            this.$emit('set-overlay-text', text)
        },
        getAmountRemaining: function (baseAmount) {
            if (!this.active) {
                return this.activeDeck.cards[this.card[0]].amount
            } else {
                if (!this.activeDeck.cards[this.card[0]]) {
                    return baseAmount
                }
                return baseAmount - this.activeDeck.cards[this.card[0]].amount
            }
        }
    },
    props: ['card', 'getCardData', 'getKeywordData', 'active','activeDeck','getSelectable','getRarityData','addedStyle','pos'],
    template:
        `<span>
 <div :class="'card '+ calcClass()" v-if="getCardData()[card[0]].type=='character'" :style = 'addedStyle'>
                <img src="images/CardFrameCollection.png" />
                <div class="cardName">{{card[0]}}</div>
                <div class="cardCost">{{getCardData()[card[0]].geoCost}}</div>
                <div class="cardHP" style="color:green">{{getCardData()[card[0]].origHP}}</div>
                <div class="cardAttack" style="color:red">{{getCardData()[card[0]].origAttack}}</div>
                <div class="cardAbility">
                    <span v-for="part in getCardData()[card[0]].baseText">
                        <span v-if="part.type=='plainText'">{{part.value}}</span>
                        <span v-if="part.type=='cardName'" style="color:blue" v-on:mouseover="onMouseOverCollection(part.name)" v-on:mouseleave="tempDisplayCard=null">{{part.value}}</span>
                        <span v-if="part.type=='keyword'" class="keyword" v-on:contextmenu.prevent="$emit('set-overlay-text',part.keyword+': '+getKeywordData(part.keyword).description)">{{part.keyword}}</span>
                    </span>
                </div>
                <div v-if="getCardData()[card[0]].baseKeywords.length>0">
                    <div v-for="(keyword,i) in getCardData()[card[0]].baseKeywords" v-on:click.right.prevent="$emit('set-overlay-text',keyword+': '+getKeywordData(keyword).description)" class="cardKeyword" :style="{left:calcKeywordX(i)}">
                        <img style="height: 16px; width: 16px" src="images/Faction0.png" />
                    </div>
                </div>
                <div class="cardAmount" v-if="active">x{{getAmountRemaining(card[1].amount)}}</div>
            </div>
            <div :class="'card '+calcClass()" v-if="getCardData()[card[0]].type=='spell'" :style='addedStyle'>
                <img src="images/SpellCardFrameCollection.png" />
                <div class="cardName">{{card[0]}}</div>
                <div class="cardCost">{{getCardData()[card[0]].geoCost}}</div>
                <div class="cardAbility">
                    <span v-for="part in getCardData()[card[0]].baseText">
                        <span v-if="part.type=='plainText'">{{part.value}}</span>
                        <span v-if="part.type=='cardName'" style="color:blue" v-on:mouseover="onMouseOverCollection(part.name)" v-on:mouseleave="tempDisplayCard=null">{{part.value}}</span>
                        <span v-if="part.type=='keyword'" class="keyword" v-on:contextmenu.prevent="$emit('set-overlay-text',part.keyword+': '+getKeywordData(part.keyword).description)">{{part.keyword}}</span>
                    </span>
                </div>
                <div class="cardAmount" v-if="active">x{{getAmountRemaining(card[1].amount)}}</div>
                <div class="cardSoulCost">{{getCardData()[card[0]].soulCost}}</div>
            </div><card v-if="tempDisplayCard!=null"
:get-keyword-data="getKeywordData"
                  :get-card-data="getCardData"
                  :get-rarity-data="getRarityData"
                  :card="[tempDisplayCard.name,0]"
                  :active="false"
                  :active-deck="activeDeck"
                  :style="{'top':tempDisplayCard.y,'left':tempDisplayCard.x,position:'absolute','z-index':1234,'opacity':'100%'}"/>
</span>`
})
