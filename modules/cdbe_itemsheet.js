export default class CDBE_ITEM_SHEET extends ItemSheet{
    static get defaultOptions() {
      return mergeObject(super.defaultOptions, {
          classes: ["cdbe", "sheet", "item"],
          template: "systems/cdbe/templates/actors/character.html",
          width: 400,
          height: 530
        });
  
    }
    get template(){
        return `systems/cdbe/templates/items/${this.item.type}.html`;
    }


  
  }