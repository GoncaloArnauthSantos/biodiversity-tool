/**
 * Entry point: loads JSON dataset, wires DOM events, triggers re-renders after user actions.
 */

import { createState } from "./tool-state.js";
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
  fetch("./tool-data.sample.json")
    .then(function (res) {
      if (!res.ok) throw new Error("Failed to load tool-data.sample.json");
      return res.json();
    })
    .then(function (data) {
      state.data = data;
      renderAll(state);
      bindEvents();
    })
    .catch(function (err) {
      renderFatal(err.message + ". Start a local server (e.g. npx serve .) and reopen this page.");
    });
}

function bindEvents() {
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

  document.getElementById("recommendations-root").addEventListener("click", function (e) {
    if (!e.target.classList.contains("rec-toggle")) return;
    var recId = e.target.getAttribute("data-rec-id");
    if (!recId) return;

    if (state.expandedRecommendations[recId]) {
      delete state.expandedRecommendations[recId];
    } else {
      state.expandedRecommendations[recId] = true;
    }
    renderRecommendations(state);
  });
}

document.addEventListener("DOMContentLoaded", init);
