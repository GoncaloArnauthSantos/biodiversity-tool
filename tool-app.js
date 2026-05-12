/**
 * Entry point: loads JSON dataset, wires DOM events, triggers re-renders after user actions.
 */

import { createState, resetFiltersAndAnswers } from "./tool-state.js";
import { clearAnswersForHiddenQuestions } from "./tool-logic.js";
import {
  renderAll,
  renderFilterOptions,
  renderQuestions,
  renderRecommendations,
  renderFatal
} from "./tool-render.js";

var state = createState();

function init() {
  fetch("./tool-data.mock.json")
    .then(function (res) {
      if (!res.ok) throw new Error("Failed to load tool-data.mock.json");
      return res.json();
    })
    .then(function (data) {
      state.data = data;
      state.module = data.modules[0].id;
      renderAll(state);
      bindEvents();
    })
    .catch(function (err) {
      renderFatal(err.message + ". Start a local server (e.g. npx serve .) and reopen this page.");
    });
}

function bindEvents() {
  document.getElementById("module-tabs").addEventListener("click", function (e) {
    if (!e.target.classList.contains("module-tab")) return;
    var moduleId = e.target.getAttribute("data-module-id");
    if (!moduleId || moduleId === state.module) return;

    state.module = moduleId;
    resetFiltersAndAnswers(state);
    renderAll(state);
  });

  document.getElementById("asset-type").addEventListener("change", function (e) {
    state.filters.assetType = e.target.value;
    state.filters.assetSubtype = "";
    clearAnswersForHiddenQuestions(state);
    renderFilterOptions(state);
    renderQuestions(state);
    renderRecommendations(state);
  });

  document.getElementById("asset-subtype").addEventListener("change", function (e) {
    state.filters.assetSubtype = e.target.value;
    clearAnswersForHiddenQuestions(state);
    renderQuestions(state);
    renderRecommendations(state);
  });

  document.getElementById("project-phase").addEventListener("change", function (e) {
    state.filters.projectPhase = e.target.value;
    clearAnswersForHiddenQuestions(state);
    renderQuestions(state);
    renderRecommendations(state);
  });

  document.getElementById("country-code").addEventListener("change", function (e) {
    state.filters.countryCode = e.target.value;
    clearAnswersForHiddenQuestions(state);
    renderQuestions(state);
    renderRecommendations(state);
  });

  document.getElementById("questions-root").addEventListener("change", function (e) {
    if (e.target.type !== "radio") return;
    var questionId = e.target.getAttribute("data-question-id");
    var value = e.target.value;
    if (!questionId) return;

    state.answers[questionId] = value;
    clearAnswersForHiddenQuestions(state);
    renderQuestions(state);
    renderRecommendations(state);
  });

  document.getElementById("questions-root").addEventListener("click", function (e) {
    if (!e.target.classList.contains("meta-btn")) return;
    var target = e.target.getAttribute("data-target");
    if (!target) return;
    var panel = document.getElementById(target);
    if (!panel) return;
    panel.classList.toggle("visible");
  });
}

document.addEventListener("DOMContentLoaded", init);
