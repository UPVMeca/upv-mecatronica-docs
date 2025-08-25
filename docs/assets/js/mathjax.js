window.MathJax = {
  tex: {
    inlineMath: [["\\(", "\\)"], ["$", "$"]],
    displayMath: [["\\[", "\\]"], ["$$", "$$"]],
    processEscapes: true,
    tags: "ams",
    packages: {'[+]': ['ams']},   // carga ams
    macros: {
      bm: ["{\\boldsymbol{#1}}", 1],   // define \bm{} como alias
      boldsymbol: ["{\\mathbf{#1}}", 1] // redefine \boldsymbol{} como \mathbf{}
    }
  },
  options: {
    processHtmlClass: "arithmatex",
    ignoreHtmlClass: ".*",
    skipHtmlTags: ["script","noscript","style","textarea","pre","code"],
    renderActions: { addMenu: [] }
  }
};

function typesetMath(){
  return window.MathJax?.typesetPromise?.();
}
if (document.readyState === "complete" || document.readyState === "interactive") {
  typesetMath();
} else {
  document.addEventListener("DOMContentLoaded", typesetMath);
}
if (window.document$?.subscribe) {
  window.document$.subscribe(() => typesetMath());
}
window.addEventListener("hashchange", typesetMath);
