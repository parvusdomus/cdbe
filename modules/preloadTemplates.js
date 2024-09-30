export const preloadHandlebarsTemplates = async function () {
    const templatePaths = [
      "/systems/cdbe/templates/actors/pj/parts/habilidades.html",
      "/systems/cdbe/templates/actors/pj/parts/talentos.html",
      "/systems/cdbe/templates/actors/pj/parts/inventario.html",
      "/systems/cdbe/templates/actors/pj/parts/dones.html",
      "/systems/cdbe/templates/actors/pj/parts/maniobras.html",
      "/systems/cdbe/templates/actors/pj/parts/efectos.html",
      "/systems/cdbe/templates/actors/pnj/parts/habilidades.html",
      "/systems/cdbe/templates/actors/pnj/parts/talentos.html",
      "/systems/cdbe/templates/actors/pnj/parts/inventario.html",
      "/systems/cdbe/templates/actors/pnj/parts/dones.html",
      "/systems/cdbe/templates/actors/pnj/parts/maniobras.html",
      "/systems/cdbe/templates/actors/pnj/parts/efectos.html"
    ];
        return loadTemplates(templatePaths);
};