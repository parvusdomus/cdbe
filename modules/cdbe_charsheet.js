export default class CDBE_CHAR_SHEET extends ActorSheet{
    static get defaultOptions() {
      return mergeObject(super.defaultOptions, {
          classes: ["cdbe", "sheet", "actor"],
          template: "systems/cdbe/templates/actors/character.html",
          width: 700,
          height: 670,
          tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "general" }],
          scrollY: ['section.sheet-body']
        });
  
    }
    getData() {
      const data = super.getData();
      if (this.actor.type == 'Jugador') {
        this._prepareCharacterItems(data);
        this._calculaValores(data);
        //this._updateInitiative(data);
      }
      return data;
    }

    _prepareCharacterItems(sheetData){
      const actorData = sheetData;
      const Habilidades = [];
      const Talentos = [];
      const Limitaciones = [];
      const Aspectos = [];
      const Dones = [];
      const Armas = [];
      const Armaduras = [];
      const Objetos = [];
      for (let i of sheetData.items){
        switch (i.type){
				  case 'habilidad':
				  {
					  Habilidades.push(i);
					  break;
				  }
          case 'talento':
				  {
					  Talentos.push(i);
					  break;
				  }
          case 'limitacion':
				  {
					  Limitaciones.push(i);
					  break;
				  }
          case 'aspecto':
				  {
					  Aspectos.push(i);
					  break;
				  }
          case 'don':
				  {
					  Dones.push(i);
					  break;
				  }
          case 'arma':
				  {
					  Armas.push(i);
					  break;
				  }
          case 'objeto':
				  {
					  Objetos.push(i);
					  break;
				  }
          case 'armadura':
				  {
					  Armaduras.push(i);
					  break;
				  }
        }
      }
      actorData.Habilidades = Habilidades;
      actorData.Talentos = Talentos;
      actorData.Limitaciones = Limitaciones;
      actorData.Aspectos = Aspectos;
      actorData.Dones = Dones;
      actorData.Armas = Armas;
      actorData.Armaduras = Armaduras;
      actorData.Objetos = Objetos;
      //this.actor.update ({ 'system.resources.afflictions.value': nAfflictions });
      actorData.settings = {
        //enableKnacks: game.settings.get("cdbe", "enableKnacks")
      }
      actorData.isGM = game.user.isGM;

    }

    _calculaValores(actorData) {
      const data = actorData;
      const habilidades = data.Habilidades;
      // OBTENGO LOS VALORES PARA LAS DERIVADAS
      let Agilidad = habilidades.find((k) => k.name === "Agilidad");
      let nAgilidad = 0;
      if (Agilidad) {nAgilidad += Number(Agilidad.system.nivel)}

      let Atencion = habilidades.find((k) => k.name === "Atención");
      let nAtencion = 0;
      if (Atencion) {nAtencion += Number(Atencion.system.nivel)}

      let Vigor = habilidades.find((k) => k.name === "Vigor");
      let nVigor = 0;
      if (Vigor) {nVigor += Number(Vigor.system.nivel)}

      let Voluntad = habilidades.find((k) => k.name === "Voluntad");
      let nVoluntad = 0;
      if (Voluntad) {nVoluntad += Number(Voluntad.system.nivel)}

      let Esquiva = habilidades.find((k) => k.name === "Esquiva");
      let nEsquiva = 0;
      if (Esquiva) {nEsquiva += Number(Esquiva.system.nivel)}

      let nBDTalentos=0;
      let nBDDones=0;
      let nArmadura=0;
      let nRDTalentos=0;
      let nRDDones=0;

      //CALCULO VALORES
      let nAC = nAgilidad+nAtencion+2
      let nBD = Math.floor(nVigor/2)+nBDTalentos+nBDDones
      let nINI = nAgilidad+nAtencion-2
      let nMOV = Math.round((nAgilidad+nVigor+3)/3)
      let nMOVT = nMOV+nAC
      let nMOVM = nMOVT*6
      let nMOVH = nMOVM*60
      let nRD = nArmadura+nRDTalentos+nRDDones
      let nRDF = Math.floor(nVigor/2)+nArmadura+nRDTalentos+nRDDones
      let nHeridas1=nVigor+4
      let nHeridas2=nVigor+1
      let nHeridas3=Math.round((nVigor+2)/2)
      let nHeridas4=Math.round((nVigor+4)/4)
      let nHeridas5=Math.round((nVigor+8)/8)
      let nHeridas=nHeridas1+nHeridas2+nHeridas3+nHeridas4+nHeridas5
      let nFatiga1=nVoluntad+4
      let nFatiga2=nVoluntad+1
      let nFatiga3=Math.round((nVoluntad+2)/2)
      let nFatiga4=Math.round((nVoluntad+4)/4)
      let nFatiga5=Math.round((nVoluntad+8)/8)
      let nFatiga=nFatiga1+nFatiga2+nFatiga3+nFatiga4+nFatiga5



      //ACTUALIZO AL PJ
      this.actor.update ({ 'system.ac': nAC });
      this.actor.update ({ 'system.bon_dano': nBD });
      this.actor.update ({ 'system.ini': nINI });
      this.actor.update ({ 'system.mov.mov': nMOV });
      this.actor.update ({ 'system.mov.turno': nMOVT });
      this.actor.update ({ 'system.mov.minuto': nMOVM });
      this.actor.update ({ 'system.mov.hora': nMOVH });
      this.actor.update ({ 'system.rd': nRD });
      this.actor.update ({ 'system.rdf': nRDF });
      this.actor.update ({ 'system.vigor': nVigor });
      this.actor.update ({ 'system.voluntad': nVoluntad });
      this.actor.update ({ 'system.esquiva': nEsquiva });
      this.actor.update ({ 'system.resources.heridastotal.max': nHeridas });
      this.actor.update ({ 'system.resources.heridas1.max': nHeridas1 });
      this.actor.update ({ 'system.resources.heridas2.max': nHeridas2 });
      this.actor.update ({ 'system.resources.heridas3.max': nHeridas3 });
      this.actor.update ({ 'system.resources.heridas4.max': nHeridas4 });
      this.actor.update ({ 'system.resources.heridas5.max': nHeridas5 });
      this.actor.update ({ 'system.resources.fatigatotal.max': nFatiga });
      this.actor.update ({ 'system.resources.fatiga1.max': nFatiga1 });
      this.actor.update ({ 'system.resources.fatiga2.max': nFatiga2 });
      this.actor.update ({ 'system.resources.fatiga3.max': nFatiga3 });
      this.actor.update ({ 'system.resources.fatiga4.max': nFatiga4 });
      this.actor.update ({ 'system.resources.fatiga5.max': nFatiga5 });
      
    }

    _updateInitiative(sheetData){
      let initiative=""
      if (sheetData.actor.system.trait=="Agile" || sheetData.actor.system.subtrait.reflexes){
        initiative="3d6cs>=5"
      }
      else{
        initiative="2d6cs>=5"
      }
      this.actor.update ({ 'system.initiative': initiative });
    }


    activateListeners(html)
	  {
		  super.activateListeners(html);
      html.find('a.item-create').click(this._onItemCreate.bind(this));
      html.find('a.item-edit').click(this._onEditClick.bind(this));
      html.find('a.item-show').click(this._onShowClick.bind(this));
		  html.find('a.item-delete').click(this._onDeleteClick.bind(this));
      html.find('a.entrenado-toggle').click(this._onEntrenadoToggle.bind(this));
      html.find('a.fatiga-toggle').click(this._onFatigaToggle.bind(this));
      html.find('a.dice-roll').click(this._onDiceRoll.bind(this));
      html.find('a.resource-change').click(this._onResourceChange.bind(this));
    }

    _onItemCreate(event) {
      event.preventDefault();
      const header = event.currentTarget;
      const type = header.dataset.type;
      const data = duplicate(header.dataset);
      const name = `${type.capitalize()}`;
      const itemData = {
        name: name,
        type: type,
        data: data
      };
      // Remove the type from the dataset since it's in the itemData.type prop.
      delete itemData.data["type"];
    
      // Finally, create the item!
      //     return this.actor.createOwnedItem(itemData);
      return Item.create(itemData, {parent: this.actor});
    }

    async _onEditClick(event, data)
	  {
      event.preventDefault();
		  const dataset = event.currentTarget.dataset;
		  const item = this.actor.items.get(dataset.id);
		  item.sheet.render(true);
		  return;
    }

    async _onShowClick(event, data)
	  {
      event.preventDefault();
		  const dataset = event.currentTarget.dataset;
		  const item = this.actor.items.get(dataset.id);
      let chatData = {}
      let msg_content = "<p><span>"+item.name+" </span>"
      if (item.system.tag != ""){msg_content+="<span style=\"background-color:"+item.system.bg_color+"; color:"+item.system.text_color+"\">&nbsp;"+item.system.tag+"&nbsp;</span>"}
      msg_content+="</p>"
      if (item.system.desc != ""){msg_content+="<hr>"+item.system.desc}
      chatData = {
        content: msg_content,
      };
      ChatMessage.create(chatData);
		  return;
    }

    async _onEntrenadoToggle(event, data)
	  {
      event.preventDefault();
		  const dataset = event.currentTarget.dataset;
		  const item = this.actor.items.get(dataset.id);
      if (item.system.entrenado==true){
        item.update ({ 'system.entrenado': false });
      }
      else{
        item.update ({ 'system.entrenado': true });
      }
		  return;
    }

    async _onFatigaToggle(event, data)
	  {
      event.preventDefault();
		  const dataset = event.currentTarget.dataset;
		  const item = this.actor.items.get(dataset.id);
      if (item.system.fatiga==true){
        item.update ({ 'system.fatiga': false });
      }
      else{
        item.update ({ 'system.fatiga': true });
      }
		  return;
    }
    
    async _onDeleteClick(event, data)
    {
      event.preventDefault();
      const dataset = event.currentTarget.dataset;
      console.log ("dataset")
      Dialog.confirm({
        title: game.i18n.localize("CDBE.ui.deleteTitle"),
			  content: game.i18n.localize("CDBE.ui.deleteText"),
        yes: () => this.actor.deleteEmbeddedDocuments("Item", [dataset.id]),
        no: () => {},
        defaultYes: false
         });
      return;
    }

    async _onResourceChange(event, data)
    {
      event.preventDefault();
      const dataset = event.currentTarget.dataset;
      let value=0;
      if (Number(dataset.number)==0){
        if (Number(this.actor.system.resources[dataset.resource].value)==0){
          value=1;
        }
        else{
          value=0;
        }    
      }
      else{
        value=Number(dataset.number)+1
      }
      switch (dataset.resource){
        case 'heridas1':
        {
          this.actor.update ({'system.resources.heridas1.value': value});
          this.actor.update ({'system.resources.heridas2.value': 0});
          this.actor.update ({'system.resources.heridas3.value': 0});
          this.actor.update ({'system.resources.heridas4.value': 0});
          this.actor.update ({'system.resources.heridas5.value': 0});
          break;
        }
        case 'heridas2':
        {
          this.actor.update ({'system.resources.heridas1.value': this.actor.system.resources.heridas1.max});
          this.actor.update ({'system.resources.heridas2.value': value});
          this.actor.update ({'system.resources.heridas3.value': 0});
          this.actor.update ({'system.resources.heridas4.value': 0});
          this.actor.update ({'system.resources.heridas5.value': 0});
          break;
        }
        case 'heridas3':
        {
          this.actor.update ({'system.resources.heridas1.value': this.actor.system.resources.heridas1.max});
          this.actor.update ({'system.resources.heridas2.value': this.actor.system.resources.heridas2.max});
          this.actor.update ({'system.resources.heridas3.value': value});
          this.actor.update ({'system.resources.heridas3.value': 0});
          this.actor.update ({'system.resources.heridas3.value': 0});
          break;
        }
        case 'heridas4':
        {
          this.actor.update ({'system.resources.heridas1.value': this.actor.system.resources.heridas1.max});
          this.actor.update ({'system.resources.heridas2.value': this.actor.system.resources.heridas2.max});
          this.actor.update ({'system.resources.heridas3.value': this.actor.system.resources.heridas3.max});
          this.actor.update ({'system.resources.heridas4.value': value});
          this.actor.update ({'system.resources.heridas5.value': 0});
          break;
        }
        case 'heridas5':
        {
          this.actor.update ({'system.resources.heridas1.value': this.actor.system.resources.heridas1.max});
          this.actor.update ({'system.resources.heridas2.value': this.actor.system.resources.heridas2.max});
          this.actor.update ({'system.resources.heridas3.value': this.actor.system.resources.heridas3.max});
          this.actor.update ({'system.resources.heridas4.value': this.actor.system.resources.heridas4.max});
          this.actor.update ({'system.resources.heridas5.value': value});
          break;
        }
        case 'fatiga1':
        {
          this.actor.update ({'system.resources.fatiga1.value': value});
          this.actor.update ({'system.resources.fatiga2.value': 0});
          this.actor.update ({'system.resources.fatiga3.value': 0});
          this.actor.update ({'system.resources.fatiga4.value': 0});
          this.actor.update ({'system.resources.fatiga5.value': 0});
          break;
        }
        case 'fatiga2':
        {
          this.actor.update ({'system.resources.fatiga1.value': this.actor.system.resources.fatiga1.max});
          this.actor.update ({'system.resources.fatiga2.value': value});
          this.actor.update ({'system.resources.fatiga3.value': 0});
          this.actor.update ({'system.resources.fatiga4.value': 0});
          this.actor.update ({'system.resources.fatiga5.value': 0});
          break;
        }
        case 'fatiga3':
        {
          this.actor.update ({'system.resources.fatiga1.value': this.actor.system.resources.fatiga1.max});
          this.actor.update ({'system.resources.fatiga2.value': this.actor.system.resources.fatiga2.max});
          this.actor.update ({'system.resources.fatiga3.value': value});
          this.actor.update ({'system.resources.fatiga4.value': 0});
          this.actor.update ({'system.resources.fatiga5.value': 0});
          break;
        }
        case 'fatiga4':
        {
          this.actor.update ({'system.resources.fatiga1.value': this.actor.system.resources.fatiga1.max});
          this.actor.update ({'system.resources.fatiga2.value': this.actor.system.resources.fatiga2.max});
          this.actor.update ({'system.resources.fatiga3.value': this.actor.system.resources.fatiga3.max});
          this.actor.update ({'system.resources.fatiga4.value': value});
          this.actor.update ({'system.resources.fatiga5.value': 0});
          break;
        }
        case 'fatiga5':
        {
          this.actor.update ({'system.resources.fatiga1.value': this.actor.system.resources.fatiga1.max});
          this.actor.update ({'system.resources.fatiga2.value': this.actor.system.resources.fatiga2.max});
          this.actor.update ({'system.resources.fatiga3.value': this.actor.system.resources.fatiga3.max});
          this.actor.update ({'system.resources.fatiga4.value': this.actor.system.resources.fatiga4.max});
          this.actor.update ({'system.resources.fatiga5.value': value});
          break;
        }
      }
      let heridastotal=Number(this.actor.system.resources.heridas1)+Number(this.actor.system.resources.heridas2)+Number(this.actor.system.resources.heridas3)+Number(this.actor.system.resources.heridas4)+Number(this.actor.system.resources.heridas5)
      let fatigatotal=Number(this.actor.system.resources.fatiga1)+Number(this.actor.system.resources.fatiga2)+Number(this.actor.system.resources.fatiga3)+Number(this.actor.system.resources.fatiga4)+Number(this.actor.system.resources.fatiga5)
      this.actor.update ({'system.resources.heridastotal.value': heridastotal});
      this.actor.update ({'system.resources.fatigatotal.value': fatigatotal});
      return;
    }

    async _onDiceRoll(event)
    {
      event.preventDefault();
      DiceRollV2(event);
      return;
    }
  
  }