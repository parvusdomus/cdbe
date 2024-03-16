export default class CDBE_ITEM_SHEET extends ItemSheet{
    static get defaultOptions() {
      return mergeObject(super.defaultOptions, {
          classes: ["cdbe", "sheet", "item"],
          template: "systems/cdbe/templates/actors/character.html",
          width: 400,
          height: 350,
          tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "general" }]
        });
  
    }
    get template(){
        return `systems/cdbe/templates/items/${this.item.type}.html`;
    }


  
  }