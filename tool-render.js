/**
 * Pure DOM rendering from state. No fetch here — only reads state + calls logic helpers.
 */

import { renderSelect, escapeHtml } from "./tool-utils.js";
import {
  allFiltersSelected,
  getAssetTypeOptions,
  getAssetSubtypeOptionsForSelection,
  getProjectPhaseOptions,
  getVisibleQuestions
} from "./tool-logic.js";

export function renderAll(state) {
  renderFilterOptions(state);
  renderQuestions(state);
  renderRecommendations(state);
}

export function renderFilterOptions(state) {
  renderSelect("asset-type", getAssetTypeOptions(state), state.filters.assetType, "-- Select asset type --");
  renderSelect("asset-subtype", getAssetSubtypeOptionsForSelection(state), state.filters.assetSubtype, "-- Select sub-type --");
  renderSelect("project-phase", getProjectPhaseOptions(state), state.filters.projectPhase, "-- Select project phase --");
}

export function renderQuestions(state) {
  var root = document.getElementById("questions-root");
  var questions = getVisibleQuestions(state);

  if (!allFiltersSelected(state)) {
    root.innerHTML = '<div class="empty-state">Select all 3 filters to load your questionnaire.</div>';
    return;
  }

  if (!questions.length) {
    root.innerHTML = '<div class="empty-state">No questions match the current selection.</div>';
    return;
  }

  root.innerHTML = questions.map(function (q) {
    return renderQuestionHtml(state, q);
  }).join("");
}

/** Characters shown before “See more” on long recommendation text. */
var REC_PREVIEW_CHARS = 280;

/**
 * One recommendation per answered question when text exists for that answer key.
 * Long copy is collapsed by default; expansion is stored on state.expandedRecommendations.
 */
export function renderRecommendations(state) {
  var root = document.getElementById("recommendations-root");
  var questions = getVisibleQuestions(state);
  var recs = [];
  var visibleIds = {};

  questions.forEach(function (q) {
    var answer = state.answers[q.id];
    if (!answer || !q.recommendations) return;
    var recText = q.recommendations[answer] || "";
    if (!recText) return;
    visibleIds[q.id] = true;
    recs.push({ source: q.id, text: recText });
  });

  Object.keys(state.expandedRecommendations || {}).forEach(function (id) {
    if (!visibleIds[id]) delete state.expandedRecommendations[id];
  });

  if (!recs.length) {
    root.innerHTML = '<div class="empty-state">Recommendations appear here as answers are provided.</div>';
    return;
  }

  root.innerHTML = recs.map(function (rec) {
    return renderRecommendationHtml(state, rec);
  }).join("");
}

function renderRecommendationHtml(state, rec) {
  var text = rec.text;
  var needsToggle = text.length > REC_PREVIEW_CHARS;
  var expanded = !!(state.expandedRecommendations && state.expandedRecommendations[rec.source]);
  var shown = needsToggle && !expanded
    ? text.slice(0, REC_PREVIEW_CHARS).replace(/\s+\S*$/, "") + "…"
    : text;

  var parts = [
    '<article class="recommendation-item">',
    '<p class="recommendation-source">' + escapeHtml(rec.source) + "</p>",
    '<div class="recommendation-body">' + formatRecommendationText(shown) + "</div>"
  ];

  if (needsToggle) {
    parts.push(
      '<button type="button" class="rec-toggle" data-rec-id="' + escapeHtml(rec.source) + '">' +
        (expanded ? "See less" : "See more") +
      "</button>"
    );
  }

  parts.push("</article>");
  return parts.join("");
}

function formatRecommendationText(text) {
  return escapeHtml(text).replace(/\n/g, "<br>");
}

export function renderFatal(message) {
  var root = document.querySelector(".ffb-biodiversity-tool");
  root.innerHTML = '<div class="empty-state">' + escapeHtml(message) + "</div>";
}

function renderQuestionHtml(state, question) {
  var answerOptions = state.data.answerOptions;
  var selected = state.answers[question.id] || "";
  var optionsHtml = answerOptions.map(function (opt) {
    var checked = selected === opt.value ? " checked" : "";
    return '<label><input type="radio" name="q-' + escapeHtml(question.id) + '" data-question-id="' + escapeHtml(question.id) + '" value="' + escapeHtml(opt.value) + '"' + checked + "> " + escapeHtml(opt.label) + "</label>";
  }).join("");

  var clarificationId = "clar-" + question.id;
  var toolsId = "tools-" + question.id;
  var standardsId = "std-" + question.id;

  return [
    '<article class="question-item">',
    '<p class="question-text">' + escapeHtml(question.text) + "</p>",
    '<div class="question-meta">',
    '<button class="meta-btn" data-target="' + clarificationId + '">Clarification</button>',
    '<button class="meta-btn" data-target="' + toolsId + '">Tools</button>',
    '<button class="meta-btn" data-target="' + standardsId + '">Standards</button>',
    "</div>",
    '<div id="' + clarificationId + '" class="meta-content">' + renderClarification(question) + "</div>",
    '<div id="' + toolsId + '" class="meta-content">' + renderLinks(question.resources && question.resources.tools, "No tools linked.") + "</div>",
    '<div id="' + standardsId + '" class="meta-content">' + renderLinks(question.resources && question.resources.standards, "No standards linked.") + "</div>",
    '<div class="question-options">' + optionsHtml + "</div>",
    "</article>"
  ].join("");
}

function renderClarification(question) {
  if (!question.resources || !question.resources.clarification) {
    return "No clarification available.";
  }
  return escapeHtml(question.resources.clarification);
}

function renderLinks(list, fallback) {
  if (!Array.isArray(list) || !list.length) {
    return escapeHtml(fallback);
  }

  return list.map(function (item) {
    var label = escapeHtml(item.label || "Link");
    var url = escapeHtml(item.url || "#");
    return '<div><a href="' + url + '" target="_blank" rel="noopener noreferrer">' + label + "</a></div>";
  }).join("");
}
