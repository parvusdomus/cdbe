export const preloadHandlebarsTemplates = async function () {
    const templatePaths = [
      "/systems/cdbe/templates/actors/parts/habilidades.html"
    ];
        return loadTemplates(templatePaths);
};