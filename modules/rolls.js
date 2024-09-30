export async function DiceRoll(actor_id,titulo,tirada, modificador, dificultad)
{
    let testResult=""
    let nUnos=0
    let textoTirada=""
    let resultText=""
    if (Number(modificador)>0){
        textoTirada=tirada+"+"+modificador
    }
    else
    {
        if (Number(modificador)==0){
            textoTirada=tirada
        }
        else{
            textoTirada=tirada+modificador
        }
    }
    let dados=[];
    let nDice=2
    let difficulty=Number(dificultad);
    //let actor_id = ChatMessage.getSpeaker().actor;
    let rollText=""
    let roll = new Roll(textoTirada);
	let d6Roll = await roll.evaluate();
    for (let i = 0; i < nDice; i++) {
        if (d6Roll.terms[0].results[i].result == 1){nUnos++}
        dados.push(d6Roll.terms[0].results[i].result);
    }
    let result=d6Roll._total

    if (result >= difficulty){
        testResult="<h3 class=\"regular-success\">"+game.i18n.localize("CDBE.ui.regularSuccess")+"</h3>"
        rollText="<h4 class=\"regular-success\">"+titulo+": "+textoTirada+" VS "+difficulty+"</h4>"
        resultText="<h1 class=\"regular-success\">"+result+"</h1>"
    }
    else{
        testResult="<h3 class=\"regular-failure\">"+game.i18n.localize("CDBE.ui.regularFailure")+"</h3>"
        rollText="<h4 class=\"regular-failure\">"+titulo+": "+textoTirada+" VS "+difficulty+"</h4>"
        resultText="<h1 class=\"regular-failure\">"+result+"</h1>"
    }
    if (nUnos >= nDice){
        testResult="<h3 class=\"critical-failure\">"+game.i18n.localize("CDBE.ui.criticalFailure")+"</h3>"
        rollText="<h4 class=\"critical-failure\">"+titulo+": "+textoTirada+" VS "+difficulty+"</h4>"
        resultText="<h1 class=\"critical-failure\">"+result+"</h1>"
    }
    let renderedRoll = await renderTemplate("systems/cdbe/templates/chat/test-result.html", { 
        rollResult: d6Roll, 
        actor_id: actor_id,
        result: resultText,
        dados:dados,
        nDice: nDice,
        rollText: rollText,
        nDiff: difficulty,
        testResult: testResult
    });

    const chatData = {
        speaker: ChatMessage.getSpeaker(),
        content: renderedRoll
    };

    d6Roll.toMessage(chatData);
    return;
}

export function diceToFaces(value, content)
{
    switch (Number(value))
    {
        case 1:
            return "fa-dice-one";
        case 2:
            return "fa-dice-two";
        case 3:
            return "fa-dice-three";
        case 4:
            return "fa-dice-four";
        case 5:
            return "fa-dice-five";
        case 6:
            return "fa-dice-six";
    }

    return "fa-dice-d6";
}