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

  game.settings.register('cdbe', 'mainColor', {
      name: game.i18n.localize("CDBE.config.mainColorName"),
      hint: game.i18n.localize("CDBE.config.mainColorHint"),
      scope: 'world',
      requiresReload: true,
      config: true,
      type: String,
      default: '#395F64',
  });

  game.settings.register('cdbe', 'secondaryColor', {
    name: game.i18n.localize("CDBE.config.secondaryColorName"),
    hint: game.i18n.localize("CDBE.config.secondaryColorHint"),
    scope: 'world',
    requiresReload: true,
    config: true,
    type: String,
    default: '#AEB7BA',
  }); 

  const root = document.querySelector(':root');
  let bgImagePath="url(../../../"+game.settings.get ("cdbe", "bgImage")+")"
  root.style.setProperty('--bg-image',bgImagePath)
  let chatbgImagePath="url(../../../"+game.settings.get ("cdbe", "chatBgImage")+")"
  root.style.setProperty('--chat-bg-image',chatbgImagePath)
  let mainColor=game.settings.get ("cdbe", "mainColor")
  root.style.setProperty('--main-color',mainColor)
  let secondaryColor=game.settings.get ("cdbe", "secondaryColor")
  root.style.setProperty('--secondary-color',secondaryColor)

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
  el.find('[name="cdbe.mainColor"]').parent()
    .append(`<input type="color" value="${game.settings.get('cdbe','mainColor')}" data-edit="cdbe.mainColor">`)
  el.find('[name="cdbe.secondaryColor"]').parent()
    .append(`<input type="color" value="${game.settings.get('cdbe','secondaryColor')}" data-edit="cdbe.secondaryColor">`) 
});

Hooks.on('renderChatLog', (app, html, data) => cdbeChat.chatListeners(html))

Hooks.on('refreshToken', () => {

})