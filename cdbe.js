import CDBE_CHAR_SHEET from "./modules/cdbe_charsheet.js";
import CDBE_NPC_SHEET from "./modules/cdbe_npcsheet.js";
import CDBE_ITEM_SHEET from "./modules/cdbe_itemsheet.js";
import { preloadHandlebarsTemplates } from "./modules/preloadTemplates.js";
import {_getInitiativeFormula} from './modules/combat.js';
import {diceToFaces} from "./modules/rolls.js";
import cdbeChat from "./modules/chat.js";



Hooks.once("init", function(){
  document.getElementById("logo").src = "/systems/cdbe/style/images/CDBE_Logo_Small.webp";
  console.log("test | INITIALIZING CDBE CHARACTER SHEETS...");
  Actors.unregisterSheet("core", ActorSheet);
  Actors.registerSheet("cdbe", CDBE_CHAR_SHEET, {
    makeDefault: true,
    types: ['Jugador']
  });
  Actors.registerSheet("cdbe", CDBE_NPC_SHEET, {
    makeDefault: true,
    types: ['NPC']
  });
  console.log("test | INITIALIZING CDBE ITEM SHEETS...");
  Items.unregisterSheet("core", ItemSheet);
  Items.registerSheet("cdbe", CDBE_ITEM_SHEET,{
    makeDefault: true,
    types: ['habilidad','aspecto','don','talento', 'limitacion', 'arma', 'objeto']
  });
  preloadHandlebarsTemplates();

    // Slowing down pings
    CONFIG.Canvas.pings.styles.pulse.duration = 2000
    CONFIG.Canvas.pings.styles.alert.duration = 2000
    CONFIG.Canvas.pings.styles.arrow.duration = 2000

  console.log("test | INITIALIZING CDBE SETTINGS...");


  game.settings.register("cdbe", "enableRank", {
    name: game.i18n.localize("CDBE.config.enableRankName"),
    hint: game.i18n.localize("CDBE.config.enableRankHint"),
    scope: "world",
    type: Boolean,
    default: false,
    requiresReload: true,
    config: true
  });

  game.settings.register("cdbe", "enableStyles", {
    name: game.i18n.localize("CDBE.config.enableStylesName"),
    hint: game.i18n.localize("CDBE.config.enableStylesHint"),
    scope: "world",
    type: Boolean,
    default: false,
    requiresReload: true,
    config: true
  });

  game.settings.register("cdbe", "enableKnacks", {
    name: game.i18n.localize("CDBE.config.enableKnacksName"),
    hint: game.i18n.localize("CDBE.config.enableKnacksHint"),
    scope: "world",
    type: Boolean,
    default: false,
    requiresReload: true,
    config: true
  });

  game.settings.register("cdbe", "enableSubTraits", {
    name: game.i18n.localize("CDBE.config.enableSubTraitsName"),
    hint: game.i18n.localize("CDBE.config.enableSubTraitsHint"),
    scope: "world",
    type: Boolean,
    default: false,
    requiresReload: true,
    config: true
  });

  game.settings.register("cdbe", "enableSubStyles", {
    name: game.i18n.localize("CDBE.config.enableSubStylesName"),
    hint: game.i18n.localize("CDBE.config.enableSubStylesHint"),
    scope: "world",
    type: Boolean,
    default: false,
    requiresReload: true,
    config: true
  });

  game.settings.register('cdbe', 'bgImage', {
    name: game.i18n.localize("CDBE.config.bgImageName"),
    hint: game.i18n.localize("CDBE.config.bgImageHint"),
    type: String,
    default: 'systems/cdbe/style/images/white.webp',
    scope: 'world',
    requiresReload: true,
    config: true,
    filePicker: 'image',
  });

  game.settings.register('cdbe', 'chatBgImage', {
    name: game.i18n.localize("CDBE.config.chatBgImageName"),
    hint: game.i18n.localize("CDBE.config.chatBgImageHint"),
    type: String,
    default: 'systems/cdbe/style/images/white.webp',
    scope: 'world',
    requiresReload: true,
    config: true,
    filePicker: 'image',
  });

  game.settings.register('cdbe', 'titleFont', {
    name: game.i18n.localize("CDBE.config.titleFontName"),
    hint: game.i18n.localize("CDBE.config.titleFontHint"),
    config: true,
    type: String,
    scope: 'world',
    choices: {
      "ZektonBold": "Default CDBE Font",
      "Dominican": "Default Tricube Tales Font",
      "Werewolf_Moon": "A Welsh Werewolf",
      "East_Anglia": "Accursed: Dark Tales of Morden",
      "WHITC": "Christmas Capers",
      "RexliaRg": "Chrome Shells and Neon Streets",
      "Nautilus": "Down in the Depths",
      "Yagathan": "Eldritch Detectives",
      "Amble": "Firefighters",
      "MountainsofChristmas": "Goblin Gangsters",
      "BLACC": "Heroes of Sherwood Forest",
      "Creepster": "Horrible Henchmen",
      "Duvall": "Hunters of Victorian London",
      "mandalore": "Interstellar Bounty Hunters",
      "Starjedi": "Interstellar Laser Knights",
      "xirod": "Interstellar Mech Wars",
      "Mandalore_Halftone": "Interstellar Rebels",
      "pirulen": "Interstellar Smugglers",
      "Arkhip": "Interstellar Troopers",
      "MysteryQuest": "Maidenstead Mysteries",
      "Bangers": "Metahuman Uprising",
      "OhioKraft": "Minerunners",
      "WIZARDRY": "Paths Between the Stars",
      "TradeWinds": "Pirates of the Bone Blade",
      "Foul": "Rotten Odds",
      "BLOODY": "Samhain Slaughter",
      "Cinzel": "Sharp Knives and Dark Streets",
      "IMPOS5": "Spellrunners",
      "Almendrasc": "Stranger Tales",
      "StoneAge": "Stone Age Hunters",
      "IMMORTAL": "Summer Camp Slayers",
      "MetalMacabre": "Sundered Chains",
      "Bagnard": "Tales of the City Guard",
      "MountainsofChristmas": "Tales of the Goblin Horde",
      "RifficFree": "Tales of the Little Adventurers",
      "Orbitron": "Titan Effect: Covert Tales",
      "MetalMacabre": "Twisted Wishes",
      "Headhunter": "Voyage to the Isle of Skulls",
      "Saddlebag": "Wardens of the Weird West",
      "Berry": "Welcome to Drakonheim",
      "Skia": "Winter Eternal: Darkness & Ice",
      "Corleone": "Wiseguys: Gangster Tales"
    },
    requiresReload: true,
    default: 'ZektonBold',
  });

  game.settings.register('cdbe', 'listHeaderBgColor', {
      name: game.i18n.localize("CDBE.config.listHeaderBgColorName"),
      hint: game.i18n.localize("CDBE.config.listHeaderBgColorHint"),
      scope: 'world',
      requiresReload: true,
      config: true,
      type: String,
      default: '#395F64',
  });

  game.settings.register('cdbe', 'listHeaderFontColor', {
    name: game.i18n.localize("CDBE.config.listHeaderFontColorName"),
    hint: game.i18n.localize("CDBE.config.listHeaderFontColorHint"),
    scope: 'world',
    requiresReload: true,
    config: true,
    type: String,
    default: '#AEB7BA',
  }); 

  game.settings.register('cdbe', 'headerFontColor', {
    name: game.i18n.localize("CDBE.config.headerFontColorName"),
    hint: game.i18n.localize("CDBE.config.headerFontColorHint"),
    scope: 'world',
    requiresReload: true,
    config: true,
    type: String,
    default: '#395F64',
  });

  game.settings.register('cdbe', 'regularFontColor', {
    name: game.i18n.localize("CDBE.config.itemFontColorName"),
    hint: game.i18n.localize("CDBE.config.itemFontColorHint"),
    scope: 'world',
    requiresReload: true,
    config: true,
    type: String,
    default: '#395F64',
  });

  game.settings.register('cdbe', 'inputBgColor', {
    name: game.i18n.localize("CDBE.config.inputBgColorName"),
    hint: game.i18n.localize("CDBE.config.inputBgColorHint"),
    scope: 'world',
    requiresReload: true,
    config: true,
    type: String,
    default: '#AEB7BA',
  });

  game.settings.register('cdbe', 'inputFontColor', {
    name: game.i18n.localize("CDBE.config.inputFontColorName"),
    hint: game.i18n.localize("CDBE.config.inputFontColorHint"),
    scope: 'world',
    requiresReload: true,
    config: true,
    type: String,
    default: '#395F64',
  });

  game.settings.register('cdbe', 'windowHeaderBgColor', {
    name: game.i18n.localize("CDBE.config.windowHeaderBgColorName"),
    hint: game.i18n.localize("CDBE.config.windowHeaderBgColorHint"),
    scope: 'world',
    requiresReload: true,
    config: true,
    type: String,
    default: '#395F64',
  });

  game.settings.register('cdbe', 'windowHeaderFontColor', {
    name: game.i18n.localize("CDBE.config.windowHeaderFontColorName"),
    hint: game.i18n.localize("CDBE.config.windowHeaderFontColorHint"),
    scope: 'world',
    requiresReload: true,
    config: true,
    type: String,
    default: '#AEB7BA',
  });

  game.settings.register('cdbe', 'tabActiveBgColor', {
    name: game.i18n.localize("CDBE.config.tabActiveBgColorName"),
    hint: game.i18n.localize("CDBE.config.tabActiveBgColorHint"),
    scope: 'world',
    requiresReload: true,
    config: true,
    type: String,
    default: '#395F64',
  });

  game.settings.register('cdbe', 'tabActiveFontColor', {
    name: game.i18n.localize("CDBE.config.tabActiveFontColorName"),
    hint: game.i18n.localize("CDBE.config.tabActiveFontColorHint"),
    scope: 'world',
    requiresReload: true,
    config: true,
    type: String,
    default: '#AEB7BA',
  });

  game.settings.register('cdbe', 'tabHoverBgColor', {
    name: game.i18n.localize("CDBE.config.tabHoverBgColorName"),
    hint: game.i18n.localize("CDBE.config.tabHoverBgColorHint"),
    scope: 'world',
    requiresReload: true,
    config: true,
    type: String,
    default: '#AEB7BA',
  });

  game.settings.register('cdbe', 'tabHoverFontColor', {
    name: game.i18n.localize("CDBE.config.tabHoverFontColorName"),
    hint: game.i18n.localize("CDBE.config.tabHoverFontColorHint"),
    scope: 'world',
    requiresReload: true,
    config: true,
    type: String,
    default: '#395F64',
  });
  

  const root = document.querySelector(':root');
  let bgImagePath="url(../../../"+game.settings.get ("cdbe", "bgImage")+")"
  root.style.setProperty('--bg-image',bgImagePath)
  let chatbgImagePath="url(../../../"+game.settings.get ("cdbe", "chatBgImage")+")"
  root.style.setProperty('--chat-bg-image',chatbgImagePath)
  let listHeaderBgColor=game.settings.get ("cdbe", "listHeaderBgColor")
  root.style.setProperty('--list-header-color',listHeaderBgColor)
  let listHeaderFontColor=game.settings.get ("cdbe", "listHeaderFontColor")
  root.style.setProperty('--list-header-font-color',listHeaderFontColor)
  let headerFontColor=game.settings.get ("cdbe", "headerFontColor")
  root.style.setProperty('--header-font-color',headerFontColor)
  let regularFontColor=game.settings.get ("cdbe", "regularFontColor")
  root.style.setProperty('--list-text-color',regularFontColor)
  let inputBgColor=game.settings.get ("cdbe", "inputBgColor")
  root.style.setProperty('--input-bg-color',inputBgColor)
  let inputFontColor=game.settings.get ("cdbe", "inputFontColor")
  root.style.setProperty('--input-text-color',inputFontColor)
  let titleFont=game.settings.get ("cdbe", "titleFont")
  root.style.setProperty('--font-name',titleFont) 
  let windowHeaderBgColor=game.settings.get ("cdbe", "windowHeaderBgColor")
  root.style.setProperty('--window-header-bg-color',windowHeaderBgColor) 
  let windowHeaderFontColor=game.settings.get ("cdbe", "windowHeaderFontColor")
  root.style.setProperty('--window-header-font-color',windowHeaderFontColor) 
  let tabActiveBgColor=game.settings.get ("cdbe", "tabActiveBgColor")
  root.style.setProperty('--tab-bg-color-active',tabActiveBgColor)
  let tabActiveFontColor=game.settings.get ("cdbe", "tabActiveFontColor")
  root.style.setProperty('--tab-text-color-active',tabActiveFontColor)
  let tabHoverBgColor=game.settings.get ("cdbe", "tabHoverBgColor")
  root.style.setProperty('--tab-bg-color-hover',tabHoverBgColor)
  let tabHoverFontColor=game.settings.get ("cdbe", "tabHoverFontColor")
  root.style.setProperty('--tab-text-color-hover',tabHoverFontColor)

  //ACTIVATE FLOATING DICE ROLLER


  


  //DICE FACE HELPER
  Handlebars.registerHelper("times", function(n, content)
    {
      let result = "";
      for (let i = 0; i < n; ++i)
      {
          result += content.fn(i);
      }
    
      return result;
    });
    
  Handlebars.registerHelper("face", diceToFaces);

});


Hooks.on("renderPause", () => {
  $("#pause img").attr("class", "fa-spin pause-image");
  $("#pause figcaption").attr("class", "pause-cdbe");
});

Hooks.on('renderSettingsConfig', (app, el, data) => {
  // Insert color picker input
  el.find('[name="cdbe.listHeaderBgColor"]').parent()
    .append(`<input type="color" value="${game.settings.get('cdbe','listHeaderBgColor')}" data-edit="cdbe.listHeaderBgColor">`)
  el.find('[name="cdbe.listHeaderFontColor"]').parent()
    .append(`<input type="color" value="${game.settings.get('cdbe','listHeaderFontColor')}" data-edit="cdbe.listHeaderFontColor">`) 
  el.find('[name="cdbe.headerFontColor"]').parent()
    .append(`<input type="color" value="${game.settings.get('cdbe','headerFontColor')}" data-edit="cdbe.headerFontColor">`)
  el.find('[name="cdbe.regularFontColor"]').parent()
    .append(`<input type="color" value="${game.settings.get('cdbe','regularFontColor')}" data-edit="cdbe.regularFontColor">`)
  el.find('[name="cdbe.inputBgColor"]').parent()
    .append(`<input type="color" value="${game.settings.get('cdbe','inputBgColor')}" data-edit="cdbe.inputBgColor">`)
  el.find('[name="cdbe.inputFontColor"]').parent()
    .append(`<input type="color" value="${game.settings.get('cdbe','inputFontColor')}" data-edit="cdbe.inputFontColor">`)
  el.find('[name="cdbe.windowHeaderBgColor"]').parent()
    .append(`<input type="color" value="${game.settings.get('cdbe','windowHeaderBgColor')}" data-edit="cdbe.windowHeaderBgColor">`)
  el.find('[name="cdbe.windowHeaderFontColor"]').parent()
    .append(`<input type="color" value="${game.settings.get('cdbe','windowHeaderFontColor')}" data-edit="cdbe.windowHeaderFontColor">`)
  el.find('[name="cdbe.tabActiveBgColor"]').parent()
    .append(`<input type="color" value="${game.settings.get('cdbe','tabActiveBgColor')}" data-edit="cdbe.tabActiveBgColor">`)
  el.find('[name="cdbe.tabActiveFontColor"]').parent()
    .append(`<input type="color" value="${game.settings.get('cdbe','tabActiveFontColor')}" data-edit="cdbe.tabActiveFontColor">`)
  el.find('[name="cdbe.tabHoverBgColor"]').parent()
    .append(`<input type="color" value="${game.settings.get('cdbe','tabHoverBgColor')}" data-edit="cdbe.tabHoverBgColor">`)
  el.find('[name="cdbe.tabHoverFontColor"]').parent()
    .append(`<input type="color" value="${game.settings.get('cdbe','tabHoverFontColor')}" data-edit="cdbe.tabHoverFontColor">`)
});

Hooks.on('renderChatLog', (app, html, data) => cdbeChat.chatListeners(html))

Hooks.on('refreshToken', () => {

})