/**
 * Small shared helpers for escaping and building <select> options.
 */

export function escapeHtml(text) {
  var div = document.createElement("div");
  div.textContent = text == null ? "" : String(text);
  return div.innerHTML;
}

export function renderSelect(selectId, options, selectedValue, placeholder) {
  var select = document.getElementById(selectId);
  var opts = ['<option value="">' + escapeHtml(placeholder) + "</option>"];
  (options || []).forEach(function (opt) {
    var selected = opt.value === selectedValue ? " selected" : "";
    opts.push('<option value="' + escapeHtml(opt.value) + '"' + selected + ">" + escapeHtml(opt.label) + "</option>");
  });
  select.innerHTML = opts.join("");
}
