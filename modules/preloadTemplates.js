export const preloadHandlebarsTemplates = async function () {
    const templatePaths = [
      "/systems/cdbe/templates/actors/parts/habilidades.html",
      "/systems/cdbe/templates/actors/parts/talentos.html",
      "/systems/cdbe/templates/actors/parts/inventario.html",
      "/systems/cdbe/templates/actors/parts/dones.html",
      "/systems/cdbe/templates/actors/parts/maniobras.html",
      "/systems/cdbe/templates/actors/parts/efectos.html"
    ];
        return loadTemplates(templatePaths);
};