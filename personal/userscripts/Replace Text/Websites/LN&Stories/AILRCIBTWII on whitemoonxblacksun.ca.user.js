// ==UserScript==
// @name         Replace Text - whitemoonxblacksun.ca - AILRCIBTWII
// @namespace    https://github.com/Eugenekoh12/Personal
// @version      1.0.4
// @description  Modified from https://github.com/erickRecai/Replace-Text v1.05.03 by guyRicky. Replaces text with other text for AILRCIBTWII on whitemoonxblacksun.ca.
// @author       Eugenekoh12


// @match        *://whitemoonxblacksun.ca/*/*/*/after-i-livestreamed-raising-cubs-i-became-the-wealthiest-in-interstellar-*
// @match        *://whitemoonxblacksun.ca/category/after-i-livestreamed-raising-cubs-i-became-the-wealthiest-in-interstellar/
// @noframes

// @updateURL    https://eugenekoh12.github.io/personal/userscripts/Replace%20Text/Websites/LN%26Stories/AILRCIBTWII%20on%20whitemoonxblacksun.ca.meta.js
// @downloadURL  https://eugenekoh12.github.io/personal/userscripts/Replace%20Text/Websites/LN%26Stories/AILRCIBTWII%20on%20whitemoonxblacksun.ca.user.js

// @exclude      *://docs.google.com/*
// @exclude      *://drive.google.com/*
// @exclude      *://mail.google.com/*

// @require      https://code.jquery.com/jquery-3.4.1.min.js
// @require      https://gist.githubusercontent.com/BrockA/2625891/raw/9c97aa67ff9c5d56be34a55ad6c18a314e5eb548/waitForKeyElements.js

// @licence      CC-BY-NC-SA-4.0; https://creativecommons.org/licenses/by-nc-sa/4.0/
// @licence      GPL-3.0-or-later; http://www.gnu.org/licenses/gpl-3.0.txt
// ==/UserScript==
/* jshint esversion: 6 */

(function () {
    'use strict';

    if(0){/*
Replace Text Script last update: 20/09/2021
Customized Replace Rules last update: 08/03/2023

== code markers ==
AA. initial setup
AB. replace rules
AC. special rules
BA. script options
BB. notif code block
CA. processPage()
CB. execution control
DA. script button
DB. support functions
    */}

    // ==== AA. initial setup =====================================================================|

    const scriptPrefix = "rplt-";
    const scriptTag = "RPLT";

    let runScript = 1;
    runScript = getOptionState("enable-"+ scriptPrefix +"script", runScript);

    if (runScript) {

        let enableConsoleMessages = 1; // default 0; set to 1 to show console messages.
        enableConsoleMessages = getOptionState("log-"+ scriptPrefix +"msg", enableConsoleMessages);

        let enabledMessages =
            //"MA|"+ // any rule matches
            "TT-MA|"+ // page title match.
            "TXT-MA|"+ // all text matches.
            "DLT1|"+ // delete1 matches.
            "DLT2|"+ // delete2 matches
            "FR1|"+ // full replace matches.
            //"CH-TT|"+ // changed text.

            "RUNT|"+ // runtime messages (amount of time to execute)
            "EXEC|"+ // execution messages (when code is executed)
            "\\bST\\b|"+ //script option change update
            "GEN$|"+ // general messages
            "^1"; // high priority messages
        let logAll = 0; // if 1, logs all titles from blocks.
        logAll = getOptionState("log-"+ scriptPrefix +"all", logAll);
        if (logAll) {
            enabledMessages = enabledMessages.concat("|title");
        }
        const enabledMessagesRegex = new RegExp(enabledMessages); // used in consolelog().

        consolelog("#### ("+ scriptTag +") text replace script began. ####", "EXEC");

        // ==== AB. replace rules =================================================================|

        let replaceRules = [
            //Basic Sentencing Fixes, and text changes relating to everyone else.
            [/to make things more consistent\. I would greatly appreciate everyone\’s input on which it should be\./i, "to make things more consistent. I would greatly appreciate everyone’s input on which it should be. USERSCRIPT NOTE: Ignore this as I've already changed all instance via this script to make sure it's consistent."],
            [/ USERSCRIPT NOTE\: Ignore this as I\'ve already changed all instance via this script to make sure it\'s consistent\. USERSCRIPT NOTE\: Ignore this as I\'ve already changed all instance via this script to make sure it\'s consistent\./i, " USERSCRIPT NOTE: Ignore this as I've already changed all instance via this script to make sure it's consistent."],
            [/Dad shouldn\’t have Alzheimer\’s anymore/i, "Dad shouldn’t have Alzheimer’s, right"],
            [/The black cat and the polar bear always felt a little embarrassed with a lollipop in their hands/i, "The black cat and the polar bear felt a little embarrassed holding a lollipop in their hands"],
            [/little wolf and red fox didn’t want to have a tree-climbing/i, "little wolf and red fox wanted to have a tree-climbing"],
            [/and found that her roommate Cui Li/i, "and found that his roommate Cui Li"],
            [/said the original. The young master is fake/i, "said the original young master is fake"],
            //Text Changes relating to the MC, Mingyou.
            [/I listen to you\!/i, "I'll listen to you!"],
            [/Taking one after training is beautiful/i, "Taking one after training makes your body feel better"],
            [/It is very suitable to eat after excessive use of abilities or mental impact/i, "It is best to eat it after excessive use of abilities or mental powers"],
            [/In addition to learning about spirit beasts and music\, his brain was not as big as a walnut in other aspects/i, "With the exception of learning about spirit beasts and music, in other aspects his brain was no bigger than a walnut"],
            [/How could he calculate Dahei\!/i, "How could he be so calculative like Dahei!"],
            [/“Did Dahui offend and Dabai\?”/i, "“Did Dahui offend Dabai?”"],
            [/the two big plushies at home did allow Mingyou to overdraw his body so much\, but the youth had a system of cheating devices/i, "the two big plushies at home did not allow Mingyou to overwork his body so much, but the youth had a way of cheating their senses."],
            [/he actually deceived their elite fighters/i, "he actually deceived these elite fighters"],
            [/It was also reluctant to bear that/i, "He was also reluctant to accept that"],
            [/This time he couldn\’t get there anymore\, because Arthur pressed his head and said that once again/i, "This time he couldn’t refute anymore, because Arthur pressed his head and said if he did this again"],
            [/Coaly won\’t die without repentance\!/i, "Coaly won’t die even without repentance!"],
            [/Mingyou was trained again\, and was also punished to kneel and sit in the corner\, facing the wall thinking about it/i, "Mingyou was taught again, and also punished to kneel and sit in a corner, facing the wall to think about his actions"],
            [/so Mingyou was trained again/i, "so Mingyou was taught once again"],
            [/All boys had a desire for driving cool machines/i, "All boys have a desire to drive cool machines"],
            [/Mingyou picked up the suona and raised her cheeks/i, "Mingyou picked up the suona and raised his cheeks"],
            [/Mingyou asked\, “What is this called\?” The/i, "Mingyou asked, “What is this called?”"],
            [/\.     Mingyou/i, ". Mingyou"],
            //Text Changes relating to Arthur, the black cat.
            [/Are you going to say, confess your mistakes well and never repent/i, "Are you just going to confess your mistakes well and not repent"],
            [/He wanted to bite Dabai a few bites/i, "He went to bite Dabai a few times"],
            [/I am a poor tiger who was betrayed by my partner/i, "I am a poor liger who was betrayed by my partner"],
            [/Kitty Ball has taken/i, "The Round Kittens have taken"],
            [/Some of them will be delicious and delicious in the future/i, "Some of them will become delicious food in the future"], //what does this even mean... GUESTIMATION ON WHAT IT MEANS.
            [/Before you soaked sauerkraut and joked about pickled cabbage/i, "Didn't you say something about soaked sauerkraut and pickled cabbage"],
            [/Tsundere His Highness?/i, "His Highness, the Tsundere?"],
            [/Da\, Dahei/i, "Co, Coaly"],
            [/Arthurhu/i, "Arthur"],
            [/lack tiger/, "lack liger"],
            [/lack Tiger/, "lack Liger"],
            [/(Dahei|Da Hei|Blacky)/i, "Coaly"],
            [/Black Ball/i, "Round Coal"],
            [/(Kittens Ball|Kitten Balls)/i, "Round Kittens"],
            [/Kitten Ball/i, "Round Kitten"],
            //Text Changes relating to Herman, the polar bear.
            [/how could they keep Mingyou busy for so long alone/i, "why would they keep Mingyou busy working alone for so long"],
            [/(ittle Baixiong|ittle white bear|ittle bear|ittle Xiong)/i, "ittle polar bear"],
            [/(Baixiong|white bear)/i, "polar bear"],
            [/Heman/i, "Herman"],
            [/(Dabai|Da Bai)/i, "Snowy"],
            //Text Changes relating to Yan Yi, the gray wolf.
            [/The gray wolf twitched his ears and said/i, "The gray wolf's ears twitched from being patted, while Mingyou said"],
            [/(grey wolf|grey wold)/i, "gray wolf"],
            [/(Dahui|Da Hui|Grey)/i, "Slatey"],
            //Text Changes relating to Xiaotian, the AI.
            [/(Xiaotian|Xiao Tian)/i, "Floaty"],
            [/Floaty means little city in the sky\./i, "Xiaotian (Floaty) means little city in the sky."],
            [/Floaty \(Floaty\)/i, "Xiaotian (Floaty)"],
            //Text Changes relating to Xianluo, the red fox.
            [/(Dahong|Da Hong|Xiaohong|Xiao Hong)/i, "Ruby"],
            //Text Changes relating to Louis, the blue seal.
            [/(Dalan|Da Lan)/i, "Skye"],
            //Text Changes relating to Leo, the yellow monkey.
            [/(Dahuang|Da Huang)/i, "Goldy"],
            //Text Changes relating to Kerry, the male green deer.
            [/(Dalu|Da Lu)/i, "Sagey"],
            //Text Changes relating to Ellie, the female green deer.
            [/” Why named Cuihua\? “/i, "“Why Cuihua?”"],
            [/Cuihua/i, "Jade"],
            [/(Xiaolu|Xiao Lu)/i, "Leafy"],
            [/Let\’s name the other one Jade\./i, "Let’s name the other one Jade (Cuihua)."],
            [/Why Jade\?/i, "Why Jade (Cuihua)?"],
            [/Let\’s name the other one Jade \(Jade\)\./i, "Let’s name the other one Jade (Cuihua)."],
            [/Why Jade \(Jade\)\?/i, "Why Jade (Cuihua)?"],
            //Text Changes relating to Adeline, the indigo kangaroo.
            [/(Daqing|Da Qing)/i, "Ceruley"],
            //Text Changes relating to Ritian, the orange coloured red panda.
            [/workaholic little panda/i, "workaholic red panda"],
            [/the little panda asked his bad friend/i, "the red panda asked his bad friend"],
            [/The little panda mumbled/i, "The red panda mumbled"],
            [/The little panda was holding a heart/i, "The red panda was holding a heart"],
            [/The purple horse glanced at the little panda/i, "The purple horse glanced at the red panda"],
            [/The little panda was not being mean this time/i, "The red panda was not being mean this time"],
            [/The little panda was full of question marks/i, "The red panda was full of question marks"],
            [/pushing the little panda who was/i, "pushing the red panda who was"],
            [/The little panda who was in the way kicked it away/i, "The red panda who was in the way was kicked away"],
            [/The little panda that was kicked aside/i, "The red panda that was kicked aside"],
            [/The little panda was angry/i, "The red panda was angry"],
            [/Little panda\: “…Go.”/i, "Red panda: “…Go.”"],
            [/and glanced at the aggrieved little panda/i, "and glanced at the aggrieved red panda"],
            [/the ghost is a little panda/i, "the ghost is a red panda"],
            [/The little panda said with his little paw/i, "The red panda said with his little paw"],
            [/All the fluffy subordinates applauded the brave little panda one after another/i, "All the fluffy subordinates applauded the brave red panda one after another"],
            [/The little panda proudly raised his belly/i, "The red panda proudly raised his belly"],
            [/Little Panda\: “…/i, "Red Panda: “…"],
            [/Little Panda Huo/i, "Red Panda Huo"],
            [/the little panda with a mouth/i, "the red panda with a mouth"],
            [/the little panda\’s tail slapped the floor/i, "the red panda’s tail slapped the floor"],
            [/his little panda came first/i, "his red panda came first"],
            [/a little panda because of the size of/i, "a red panda because of the size of"],
            [/a good little panda\, why did he grow a mouth/i, "a good red panda, why did he grow a mouth"],
            [/beating up the little panda/i, "beating up the red panda"],
            [/“Little panda doll.”/i, "“Little red panda doll.”"],
            [/The little panda shivered/i, "The red panda shivered"],
            [/The little panda said proudly/i, "The red panda said proudly"],
            [/The Dacheng who was biting his tail/i, "Said Peachy who was biting his tail"],
            [/Little panda, he was dead/i, "Red panda, he was dead"],
            [/Who had this little panda with a ruthless mouth offended/i, "Who had this red panda with a ruthless mouth offended"],
            [/bully the little panda who was kneeling on the ground/i, "bully the red panda who was kneeling on the ground"],
            [/This little panda was not stupid/i, "This red panda was not stupid"],
            [/The little panda was depressed/i, "The red panda was depressed"],
            [/patted the little panda\’s head and said/i, "patted the red panda’s head and said"],
            [/The little panda bit his tail in anger/i, "The red panda bit his tail in anger"],
            [/Little Panda tried to cheat/i, "Red Panda tried to cheat"],
            [/The little panda looked eagerly at his Highness Arthur/i, "The red panda looked eagerly at his Highness Arthur"],
            [/The little panda opened his round eyes and looked at Arthur who was coaxing/i, "The red panda opened his round eyes and looked at Arthur who was coaxing"],
            [/The little panda slumped/i, "The red panda slumped"],
            [/The little panda was so angry that his cheeks were bulging/i, "The red panda was so angry that his cheeks were bulging"],
            [/The little panda stood up/i, "The red panda stood up"],
            [/The little panda saw that His Highness Arthur gave Mingyou a bunch of halos/i, "The red panda saw that His Highness Arthur gave Mingyou a bunch of halos"],
            [/Little Panda frowned/i, "Red Panda frowned"],
            [/The little panda looked around at his comrades/i, "The red panda looked around at his comrades"],
            [/The little panda drooped his ears/i, "The red panda drooped his ears"],
            [/The little panda with drooping ears stood up again/i, "The red panda with drooping ears stood up again"],
            [/The little panda looked blank and was hugged by the tail/i, "The red panda looked blank and was hugged by the tail"],
            [/and the little panda “popped”/i, "and the red panda “popped”"],
            [/and the little panda went “papapapa”/i, "and the red panda went “papapapa”"],
            [/Mingyou hugged the little panda\’s big fluffy tail and swung it up and down/i, "Mingyou hugged the red panda’s big fluffy tail and swung it up and down"],
            [/Little Panda said nothing. He was muted./i, "Red Panda said nothing. He was muted."],
            [/the little panda hurriedly said/i, "the red panda hurriedly said"],
            [/Mingyou let go of the little panda\’s tail, squatted down and checked the little panda\’s body/i, "Mingyou let go of the red panda’s tail, squatted down and checked the red panda’s body"],
            [/the little panda finally felt at ease/i, "the red panda finally felt at ease"],
            [/Little Panda hummed\. He looked at Mingyou seriously and said/i, "Red Panda hummed. He looked at Mingyou seriously and said"],
            [/With such a lovely teacher as Little Panda/i, "With such a lovely teacher as Red Panda"],
            [/the little panda said proudly/i, "the red panda said proudly"],
            [/Arthur saw that his man was holding the little panda\’s claws/i, "Arthur saw that his man was holding the red panda’s claws"],
            [/and glared at the little panda/i, "and glared at the red panda"],
            [/The little panda pouted\. Why was he so hostile to me\?/i, "The red panda pouted. Why was he so hostile to me?"],
            [/A good little panda\, how come he has a long mouth/i, "A good red panda, how come he has a long mouth"],
            [/turned and walked towards the shivering little panda/i, "turned and walked towards the shivering red panda"],
            [/The little panda bowed his head in frustration/i, "The red panda bowed his head in frustration"],
            [/A cute little panda\, why couldn\’t he control his mouth/i, "A cute red panda, why couldn’t he control his mouth"],
            [/Ever since he met this little panda with a mouth/i, "Ever since he met this red panda with a mouth"],
            [/Mingyou looked at the greedy little panda/i, "Mingyou looked at the greedy red panda"],
            [/Alas\, what\’s he doing with a little panda/i, "Alas, what’s he doing with a red panda"],
            [/The little panda stretched out two paws to hold the bowl/i, "The red panda stretched out two paws to hold the bowl"],
            [/Little panda\: “\?\?\?/i, "Red panda: “???"],
            [/The little panda thought about it carefully and thought it made sense/i, "The red panda thought about it carefully and thought it made sense"],
            [/a little panda\, only needs one paw to push the young man to the ground/i, "a red panda, only needs one paw to push the young man to the ground"],
            [/The little panda stretched out his claws at Mingyou/i, "The red panda stretched out his claws at Mingyou"],
            [/A cute little panda\, why did he open his mouth/i, "A cute redpanda, why did he open his mouth"],
            [/Today it is Huo Ritian\’s orange\! Let me see the little panda/i, "Today it is Huo Ritian’s orange! Let me see the red panda"],
            [/Ah\, little panda\! As long as Huo Ritian doesn\’t speak, he is the cutest/i, "Ah, red panda! As long as Huo Ritian doesn’t speak, he is the cutest"],
            [/A cute little panda\, why was the tail scorched/i, "A cute red panda, why was the tail scorched"],
            [/little panda who was gossipy and not afraid of death/i, "red panda who was gossipy and not afraid of death"],
            [/Why did this little panda have such a mouth/i, "Why did this red panda have such a mouth"],
            [/this little panda was nicknamed Huo Ritian/i, "this red panda was named Huo Ritian"],
            [/thinking that maybe the little panda might be cute too/i, "thinking that maybe the red panda might be cute too"],
            [/The little panda said unhappily/i, "The red panda said unhappily"],
            [/and the red fox looked blankly at the little panda holding his tail/i, "and the red fox looked blankly at the red panda holding his tail"],
            [/The little panda yawned\, revealing his little pink tongue/i, "The red panda yawned, revealing his little pink tongue"],
            [/The little panda walked to the table/i, "The red panda walked to the table"],
            [/Little Panda and Purple Horse/i, "Red Panda and Purple Horse"],
            [/The little panda opened his round eyes\, and the scholar’s expression turned into a gossiping expression/i, "The red panda opened his round eyes, and the scholar’s expression turned into a gossiping expression"],
            [/it was impossible for him to really eat this little panda/i, "it was impossible for him to really eat this red panda"],
            [/the little panda and the purple horse couldn/i, "the red panda and the purple horse couldn"],
            [/(Dacheng|Da Cheng)/i, "Peachy"],
            //Text Changes relating to Leon (Someone please confirm with me what DaZi's name is), the purple horse.
            [/(Dazi|Da Zi)/i, "Mauvey"],
            //Text Changes relating to Hans, the snow leopard.
            [/(Diandian|Dian Dian)/i, "Dotty"],
            //Hans' original nickname is changed to Dot. Please advise a better short form since I don't know which "Dian" is used.
            [/ Dian /i, " Dot "],
            [/ Dian/i, " Dot"],
            //Text Changes relating to Gungun, the giant baby panda. Please assist to check if Gungun is actually his name or nickname and if it's listed anywhere his real name if so.
            [/(Gungun|Gun Gun)/i, "Rolly"],
            //Miscellaneous (including punctuations) cause apparently I need to fix punctuation now.
            [/ anf /i, " and "],
            [/ \. /i, ". "],
            [/ \, /i, ", "],
            [/\? \!/i, "?!"],
        ];

        // ==== AC. special rules =================================================================|

        const enableSpecialRules = 1;
        if (enableSpecialRules) {
            // example of including a rule list defined in a spearate script.
            if (unsafeWindow.globalListName) {
                replaceRules = replaceRules.concat(unsafeWindow.globalListName);
            }
        }
        //consolelog(replaceRules,"all rules"); //test: double check rule contents

        // ==== BA. script options ================================================================|

        const classWhitelist = /notif-hidden|notif-text|tag-inst|-counter/i;
        // text nodes with parent elements with these classes are excluded.

        const generateRecheckButton = 1;

        let dynamicChecking = 1; // default 1; set to 1 to run the script automatically when new image elements are detected.
        dynamicChecking = getOptionState("enable-"+ scriptPrefix +"dynamic-checking", dynamicChecking);
        // setting to 0 would make this run a few more times when dynamically checking.

        // ==== checked in processPage() ====
        // managable with optional Script Options userscript.
        let logRuntimes = 1; // default 0; set to 1 to log function runtimes to the console.
        let markCheckedElements = 0; // default 1; set to 0 if certain sites start appearing weirdly.

        let enableSpecialReplace = 1;
        let fullDelete = 0; // default 1; if 1, text is completely replaced.
        let addTag = 1; // if fullDelete is active, adds a tag without replacing.

        // ==== BB. notif code ====================================================================|

        // 'script options' options
        let enableExecCounter = 0;
        enableExecCounter = getOptionState("enable-"+ scriptPrefix +"counter", enableExecCounter);
        let enableNotifications = 0;
        enableNotifications = getOptionState("enable-"+ scriptPrefix +"notifs", enableNotifications);
        let autohideNotifs = 0; // default 0; notifs disappear after a set period of time. used in createNotif()
        let startCollapsed = 1; //default 1;

        // notif css variables.
        const notifsHex = "#ddd";
        const notifsOpacity = .4; // default .4; set to a value between 0 and 1, 1 is no transparency, .5 is 50% transparency.
        const notifsWidth = 120; // default 120; width in pixels of each notification.

        let notifContainerId = "notif-main-container";

        // generate notif container if needed.
        if ((enableExecCounter || enableNotifications) && !jQuery("#"+ notifContainerId).length) {

            // ==== setting/checking initial visual state of notifs ====

            // constrolled exclusively by local storage or the default value.
            const localStorageName = "notif start collapsed";
            if (window.localStorage.getItem(localStorageName)) {
                startCollapsed = window.localStorage.getItem(localStorageName);
                startCollapsed = (startCollapsed == "true");
            }

            const visibleClass = "notif-visible";
            const hiddenClass = "notif-hidden1";
            let startingStateClass = visibleClass;
            let otherStartingStateClass = hiddenClass;
            if (startCollapsed) {
                startingStateClass = hiddenClass;
                otherStartingStateClass = visibleClass;
            }

            // ==== create container ==============================================================|
            /*
            [ notif main container
                [notif1] - counters
                [hide] - button
                [open] - button
                [close] - button
                [clear] - button
                [notif2
                    [dlt-container]
                    [ll-container]
                    [ot-container]
                ]

            ]
            - hide: makes visible open | hides close, clear, notif2
            - open: makes visible hide, close, clear, notif2 | hides open
            - close: deletes notif main container.
            - clear: empties notif-container2
            */

            const openButtonId = "notif-open";
            const hideButtonId = "notif-hide";

            let notificationsElement =
                "<div id='"+ notifContainerId +"'>"+
                "<div id='notif-container1'></div>"+
                "<div id='"+ hideButtonId +"' class='notif-red notif-rounded-block "+ startingStateClass +"'>notif hide</div>"+
                "<div id='"+ openButtonId +"' class='notif-green notif-rounded-block "+ otherStartingStateClass +"'>notif open</div>"+
                "<div id='notif-close' class='notif-gray notif-rounded-block "+ startingStateClass +"'>close notif[]</div>"+
                "<div id='notif-clear' class='notif-orange notif-rounded-block "+ startingStateClass +"'>clear notif</div>"+
                "<div id='notif-container2' class=' "+ startingStateClass +"'>"+
                    "<div id='dlt-container'></div>"+
                    "<div id='ll-container' class='notif-hidden1'></div>"+
                    "<div id='ot-container' class='notif-hidden1'</div>"+
                "</div>"+
                "</div>";
            jQuery("body").prepend(notificationsElement);

            let textReaderElement =
                "<div id='notif-text-overlay' class='notif-text-hidden'></div>";
            jQuery("body").prepend(textReaderElement);

            jQuery('#notif-container2').on( {
                mouseenter: function () {
                    let notifText = jQuery(this).find(".notif-text").text();
                    let notifClassList = this.className;
                    if (/red/.test(notifClassList)) {
                        jQuery("#notif-text-overlay").addClass("notif-red");
                    }else if (/orange/.test(notifClassList)) {
                        jQuery("#notif-text-overlay").addClass("notif-orange");
                    }else if (/yellow/.test(notifClassList)) {
                        jQuery("#notif-text-overlay").addClass("notif-yellow");
                    }else {
                        jQuery("#notif-text-overlay").addClass("notif-gray");
                    }
                    jQuery("#notif-text-overlay").text(notifText);
                    jQuery("#notif-text-overlay").addClass("notif-text-visible");
                },
                mouseleave: function () {
                    jQuery("#notif-text-overlay").removeClass("notif-text-visible");
                    jQuery("#notif-text-overlay").removeClass("notif-red");
                    jQuery("#notif-text-overlay").removeClass("notif-orange");
                }
            }, '.notif-instance');

            // ==== close ====
            jQuery("#notif-close").click(function(){
                jQuery("#"+notifContainerId).remove();
                //console.log("RPL notif close clicked. ("+notifContainerId+")");
            });

            // ==== clears container2 which contains notif instances. ====
            function clearNotif(){
                jQuery("#notif-container2").empty();
            }
            jQuery("#notif-clear").click(clearNotif);

            // ==== open/hide events ==============================================================|

            const mainSelector = "#notif-container2, #"+ hideButtonId +", #notif-close, #notif-clear";

            jQuery("#"+ hideButtonId).click(function () {
                //console.log(hideButtonId);
                window.localStorage.setItem(localStorageName, true);

                switchClasses(
                    mainSelector,
                    "#"+ openButtonId,
                    visibleClass,
                    hiddenClass
                );
            });

            jQuery("#"+ openButtonId).click(function () {
                //console.log(openButtonId);
                window.localStorage.setItem(localStorageName, false);

                switchClasses(
                    mainSelector,
                    "#"+ openButtonId,
                    hiddenClass,
                    visibleClass
                );
            });

            function switchClasses(mainSelector, subSelector, removedClass, newClass) {
                jQuery(mainSelector).removeClass(removedClass);
                jQuery(mainSelector).addClass(newClass);
                jQuery(subSelector).removeClass(newClass);
                jQuery(subSelector).addClass(removedClass);
            }

            // ==== CSS ===========================================================================|
            if(1){var notifsCss =
    `<style type="text/css">
        #`+ notifContainerId +` {
            width: `+ notifsWidth +`px;
            max-height: 50%;
            margin: 0 2px 2px;
            display: block;

            line-height: initial;
            color: #000;
            opacity: `+ notifsOpacity +`;
            position: fixed;
            top: 0px;
            right: 0px;
            z-index: 9999;
            overflow-y: auto;
        }
        #`+ notifContainerId +`:hover {
            opacity: 1;
        }

        .notif-rounded-block {
            display: block;
            padding: 2px;
            border-radius: 3px;
            margin-top: 2px;

            font-size: 11px !important;
            font-weight: bold;
            text-align: center;
            cursor: pointer;
        }

        .s-counter {
            display: block;
            padding: 2px;
            border-radius: 4px;
            margin-top: 2px;

            background: #ddd;
            font-size: 11px !important;
            font-weight: bold;
            text-align: center;
        }

        .notif-text-hidden {
            display:none;
        }
        .notif-text-visible {
            display: block;
            max-width: 50%;
            padding: 5px;
            border: #999 solid 2px;
            border-radius: 10px;

            position: fixed;
            top: 5px;
            left: 5px;
            z-index: 999999;


            font-size: 15px !important;
            font-weight: bold !important;
            text-align: center !important;
            color: black !important;
        }

        .notif-instance {
            display: block;
            padding: 2px;
            border-radius: 4px;
            margin-top: 2px;

            background: `+ notifsHex +`;
            font-size: 11px !important;
            font-weight: bold;
            text-align: center;
            cursor: pointer;
        }

        .notif-instance div{/* div holding the rule.*/
            max-height: 12px;
            padding: 0px;
            margin: 0px;
            border: 0px;

            overflow: hidden;
            word-break: break-all;
        }
        .notif-hidden{ /* meant to hide the rule */
            opacity: .1;
        }
        .notif-hidden:hover {
            opacity: 1;
        }

        .notif-red {
            background: #f67066;
        }
        .notif-orange {
            background: #ffc107; //yellowish
        }
        .notif-yellow {
            background: #ffc107; //yellowish
        }
        .notif-green {
            background: #62bb66;
        }
        .notif-gray {
            background: #777;
        }

        /* collapsible classes */
        .notif-hidden1 {
            display: none !important;
        }
        .notif-visible {
            display: block !important;
        }

        div#ll-container, div#ot-container {
            border-top: solid black 3px;
        }
    </style>`;
            }
            jQuery(document.body).append(notifsCss);
        }

        if(enableExecCounter) {
            jQuery("#notif-container1").prepend("<div id='"+ scriptTag +"-counter' class='s-counter .notif-rounded-block'>T No text nodes found.</div>");
        }

        // resets lastIndex on tests with global modifiers.
        RegExp.prototype.regexTest = function(testString){
            //consolelog("## regexTest() ##", 1);
            if (this.test(testString)) {
                if (/.\/i?g/.test(this) && this.lastIndex) {//regex global modifier needs to be reset.
                    //consolelog("## last index: "+ this.lastIndex +" ##", 1);
                    this.lastIndex = 0;
                }
                return true;
            }
            return false;
        };

        NodeList.prototype.forEach = Array.prototype.forEach;

        // ==== CA. processPage() =================================================================|

        // ==== processPage() globals ====
        let titleChecked = 0; // if the page title was checked or not.
        let fullCheck = 0;

        // ==== counters ====
        let nodeCounter = 0; // counts text nodes.
        let deleteMatches = 0;
        let fullReplaceMatches = 0;
        let executionCounter = 0; // the number of times processPage() was executed.

        function processPage() {
            executionCounter++;

            logRuntimes = getOptionState("log-"+ scriptPrefix +"runtimes", logRuntimes);
            if (logRuntimes) {
                var startTime = performance.now();
            }

            let rulesNum = replaceRules.length;

            // per element variables
            let ruleMatched = 0;

            // ==== checks the title of the page ==================================================|
            if(1){
                let titleText = jQuery("title").text();
                if (titleText && !titleChecked) {
                    for (let index = 0; index < rulesNum; index++) {
                        if (replaceRules[index][0].regexTest(titleText)) {
                            consolelog(scriptTag +" (title match): "+ titleText +" | "+ replaceRules[index][0], "TT-MA");
                            titleText = titleText.replace(replaceRules[index][0], replaceRules[index][1]);
                            jQuery("title").text(titleText);
                        }
                    }
                    titleChecked = 1;
                }
            }

            // ==== selects specified text elements ===============================================|
            if(1){
                const excludedElements = /CODE|SCRIPT|STYLE|TEXTAREA/i;
                const checkClassRegex = new RegExp(scriptPrefix +"node","i");
                var textWalker = document.createTreeWalker(
                    document.body,
                    NodeFilter.SHOW_TEXT,
                    {
                        acceptNode: function (node) {
                            if (node.nodeValue.trim() &&
                                !excludedElements.test(node.parentNode.nodeName) && // exclude scripts and style elements
                                (fullCheck || !checkClassRegex.test(node.parentNode.classList)) && // exclude checked elements
                                !classWhitelist.test(node.parentNode.classList)) {
                                return NodeFilter.FILTER_ACCEPT;
                            }
                            return NodeFilter.FILTER_SKIP;
                        }
                    },
                    false
                );
            }
            let textNode = textWalker.nextNode();
            let previousParent;

            // ==== for each textNode =============================================================|
            while (textNode) {

                let nodeText = textNode.nodeValue; // is changed based on matches.
                if (!fullCheck) {
                    let immediateParentNode = textNode.parentNode; // element containing the text node.
                    nodeCounter++;

                    // common case: new parent is different than previous.
                    if (previousParent && !(previousParent == immediateParentNode) ) {
                        markCheckedElements = getOptionState(scriptPrefix +"mark-checked", markCheckedElements);
                        if (markCheckedElements) {
                            // only sets checked class if previous parent is different.
                            previousParent.classList.add(scriptPrefix +"node-"+ nodeCounter);
                        }
                        previousParent = immediateParentNode;
                    }else if (!previousParent) {
                        previousParent = immediateParentNode;
                    }
                }

                // ==== for each rule =============================================================|
                for (let index = 0; index < rulesNum; index++) {

                    let currentRuleRegex = replaceRules[index][0];
                    let replacementValue = replaceRules[index][1];

                    if (currentRuleRegex.regexTest(nodeText.trim())) {
                        ruleMatched = 1;
                        let matchPrefix = "GEN0";
                        consolelog("("+ scriptTag +") (n)"+ nodeCounter +" (match): "+ nodeText.trim() +" | "+ currentRuleRegex, "TXT-MA");

                        const disableReplace = 0; // test: check what is checked through each run.
                        if (!disableReplace) {

                            enableSpecialReplace = getOptionState("enable-special-replace", enableSpecialReplace);
                            // ==== delete1 match =================================================|
                            if (enableSpecialReplace && (/DELETE1/.test(replacementValue) || /DELETE2/.test(replacementValue)) ) {
                                deleteMatches++;

                                matchPrefix = "DLT99";
                                if (/DELETE1/.test(replacementValue) && !/DELETE1/.test(nodeText)) {
                                    matchPrefix = "DLT1";
                                }else if (/DELETE2/.test(replacementValue) && !/DELETE2/.test(nodeText)) {
                                    matchPrefix = "DLT2";
                                }

                                consolelog("("+ scriptTag +") ("+ matchPrefix +") n"+ nodeCounter +" (match): "+ nodeText.trim() +" | "+ currentRuleRegex, matchPrefix);
                                createNotif(nodeCounter +" "+ matchPrefix, currentRuleRegex, nodeText);

                                fullDelete = getOptionState("enable-full-delete", fullDelete);
                                addTag = getOptionState("add-tag", addTag);
                                const tagRegex = new RegExp("^\\["+matchPrefix);

                                if (fullDelete) {
                                    nodeText = "## "+ matchPrefix +" ##"; // replaces the text completely.
                                    break;
                                }else if (addTag && !tagRegex.text(nodeText)) {
                                    nodeText = "["+ matchPrefix +"]: " + nodeText; // prepends DLT1 or DLT2
                                }
                            }
                            // ==== full replace match ============================================|
                            if (enableSpecialReplace && /^FR1/.test(replacementValue)) {
                                fullReplaceMatches++;
                                matchPrefix = "FR1";
                                consolelog("("+ scriptTag +") ("+ matchPrefix +") n"+ nodeCounter +" (match): "+ nodeText.trim() +" | "+ currentRuleRegex, matchPrefix);
                                createNotif(nodeCounter +" "+ matchPrefix, currentRuleRegex, nodeText);

                                nodeText = replacementValue;
                                break;
                            }
                            // ==== base case =====================================================|
                            nodeText = nodeText.replace(currentRuleRegex, replacementValue);
                        } // end if (!disableReplace)
                    }
                } // end for (each rule) ==========================================================|

                if (ruleMatched) { // modify text block.
                    ruleMatched = 0;
                    textNode.nodeValue = nodeText;
                    consolelog("("+ scriptTag +") (n)"+ nodeCounter +" (text): "+ nodeText.trim(), "CH-TT");
                }
                textNode = textWalker.nextNode();
            } // end while (textNode) =============================================================|

            if (!fullCheck) {
                // ==== update counter ====
                let counterText = "T DLT:"+ deleteMatches +" | FR:"+ fullReplaceMatches +" | N:"+ nodeCounter + " | EX:"+ executionCounter;
                jQuery("#"+ scriptTag +"-counter").text(counterText);
                if (nodeCounter) {
                    jQuery("#"+ scriptTag +"-counter").addClass("notif-green");
                }
            }else { //end fullCheck.
                fullCheck = 0;
            }

            //consolelog("## ("+ scriptTag +") execution #"+ executionCounter +" ##", "EXEC");
            // script option handles if this is displayed or not.
            if (logRuntimes) {
                const endTime = performance.now();
                const runTime = ((endTime - startTime) / 1000).toFixed(2);
                if (runTime > 1) {
                    consolelog('('+ scriptTag +') finished after ' + runTime + ' seconds.', "RUNT");
                }else {
                    consolelog('('+ scriptTag +') finished in less than 1 second.', "RUNT");
                }
            }
        } //end function function replaceText()

        // ==== CB. execution control =============================================================|

        //console.log("("+ scriptTag +") EXEC: Initial run.");
        //processPage();
        let runWhenReady = 0;
        runWhenReady = getOptionState("run-when-ready", runWhenReady);
        if (runWhenReady) {
            jQuery(document).ready(function() { //after DOM has loaded.
                consolelog("("+ scriptTag +") EXEC: document.ready()", "EXEC");
                //fullCheck = 1;
                processPage();
            });
        }

        let runWhenLoaded = 1;
        runWhenLoaded = getOptionState("run-when-loaded", runWhenLoaded);
        if (runWhenLoaded) {
            jQuery(window).on("load", function() { //after all initial images are loaded.
                consolelog("("+ scriptTag +") EXEC: window.load()", "EXEC");
                //fullCheck = 1;
                processPage();
            });
        }
        if (dynamicChecking) {
            jQuery(document).ready(waitForKeyElements("img", processPage));
        }

        // ==== DA. script button =================================================================|

        let buttonsContainerId = "ctb-container1";
        if (generateRecheckButton && jQuery("#"+ buttonsContainerId).length) {
            jQuery("#"+ buttonsContainerId).prepend("<div id='"+ scriptTag +"-reset' class='ctb-blue ctb-rounded-block'>run "+ scriptTag +"</div>"); //added to beginning
            //jQuery("#"+ scriptTag +"-reset").click(processPage);
            jQuery("#"+ scriptTag +"-reset").click(function() {
                fullCheck = 1;
                processPage();
            });
        }

        // ==== DB. support functions =============================================================|

        function createNotif(notifLabel, notifRule, notifText) { //msg1 needs to match notifTypes
            enableNotifications = getOptionState("enable-"+ scriptPrefix +"notifs", enableNotifications);
            if (enableNotifications) {
                let additionalClass = "notif-gray";
                let notifContainer = "ot-container";
                if (/dlt/i.test(notifLabel)) {
                    additionalClass = "notif-red";
                    notifContainer = "dlt-container";
                }

                let newNotif =
                    "<div class='notif-instance "+ additionalClass +"'><div>t n"+ notifLabel +"</div>"+
                        "<div class='notif-hidden'>"+ notifRule +"</div>"+
                        "<div class='notif-text' hidden>"+ notifText+"</div>"+ // to be displayed at the bottom left.
                    "</div>";

                let enabledNotifTypesRegex = /./;
                if (enabledNotifTypesRegex.test(notifLabel)) {
                    jQuery("#"+ notifContainer).append(newNotif);
                    jQuery(".notif-instance").click(function(){
                        jQuery("#notif-container2").empty();
                    });

                    if (!/dlt/i.test(notifLabel)) {
                        jQuery("#ot-container").removeClass("notif-hidden1");
                    }

                    autohideNotifs = getOptionState("autohide-notifications", autohideNotifs);
                    if (autohideNotifs) {
                        const notifDuration = 10; // default 10; amount of seconds notifications are displayed before disappearing.
                        setTimeout(function() {
                            jQuery(".notif-instance").remove();
                        }, notifDuration*1000);
                    }
                }
            }
        } // end function creatNotif()

        function consolelog(text, messageType) {
            if (enableConsoleMessages && enabledMessagesRegex.test(messageType)) {
                console.log(text);
            }
        }

        // ==== script end ========================================================================|
        consolelog("#### ("+ scriptTag +") text replace script is active. ####", "EXEC");

    } // end if (runScript)

    // ============================================================================================|

    // = getOptionState(, );
    // used to update option if 'script option' is set.
    function getOptionState(idName, currentState) {
        if (document.getElementById(idName)) {
            return document.getElementById(idName).checked;
        }
        return currentState;
    }
})();
