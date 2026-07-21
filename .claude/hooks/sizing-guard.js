#!/usr/bin/env node
/*
 * PreToolUse guard for the High Card Capital responsive-sizing rule.
 *
 * Fires before Edit/Write. If the edit targets main.css AND the incoming text
 * looks like a sizing change (font-size, padding, width/height, margin, gap, or
 * fluid units clamp/calc/vw/vh), it DENIES with a reminder to confirm which of
 * the 4 modes the change applies to and to implement per-pixel across each.
 *
 * Escape hatch: if the new text contains the token  MODES-OK  (in a comment or
 * anywhere), the guard allows it through — Claude adds this only after the modes
 * have been confirmed with the owner, so a confirmed edit is never blocked twice.
 *
 * Modes (anchored to the .prod-grid 1x4 -> 2x2 break at 700px):
 *   Main site   >=921px
 *   Big burger  701-920px   (cards 1x4, hamburger; mimics main site)
 *   Small burger 481-700px  (cards 2x2; mimics mobile)
 *   Mobile      <=480px
 */

let raw = "";
process.stdin.on("data", (c) => (raw += c));
process.stdin.on("end", () => {
  let data = {};
  try { data = JSON.parse(raw || "{}"); } catch (_) {}

  const input = data.tool_input || {};
  const path = String(input.file_path || "");

  // Only care about edits to the main stylesheet.
  const isMainCss = /main\.css$/i.test(path);
  if (!isMainCss) { allow(); return; }

  // Gather the text being introduced (Edit -> new_string, Write -> content).
  const text = String(input.new_string || input.content || "");

  // Confirmation escape hatch.
  if (/MODES-OK/.test(text)) { allow(); return; }

  // Heuristic: does this look like a sizing/spacing change?
  const sizingRe = /(font-size|line-height|padding|margin|gap|width|height|min-height|max-width|min-width|max-height|letter-spacing|border-radius|\bclamp\(|\bcalc\(|\d\s*vw\b|\d\s*vh\b|\d\s*svh\b|\d\s*px\b|\d\s*rem\b)/i;
  if (!sizingRe.test(text)) { allow(); return; }

  // Looks like a sizing edit to main.css — block until modes are confirmed.
  deny(
    "SIZING GUARD (HCC responsive-sizing rule): this edit to main.css looks like a " +
    "sizing/spacing change. Before applying it you MUST:\n" +
    "  1. Ask the owner which of the 4 modes it applies to:\n" +
    "     - Main site  (>=921px)\n" +
    "     - Big burger (701-920px, cards 1x4, mimics main site)\n" +
    "     - Small burger (481-700px, cards 2x2, mimics mobile)\n" +
    "     - Mobile (<=480px)\n" +
    "  2. Implement it PER-PIXEL across the full range of each chosen mode " +
    "(scale BOTH terms of any calc(px + vw) token; never a fixed px that only fits one width).\n" +
    "Once the modes are confirmed with the owner, re-issue the edit and include the token " +
    "MODES-OK in a CSS comment on the changed lines to acknowledge and pass this guard."
  );
});

function allow() {
  process.stdout.write(JSON.stringify({
    hookSpecificOutput: { hookEventName: "PreToolUse", permissionDecision: "allow" }
  }));
  process.exit(0);
}

function deny(reason) {
  process.stdout.write(JSON.stringify({
    hookSpecificOutput: {
      hookEventName: "PreToolUse",
      permissionDecision: "deny",
      permissionDecisionReason: reason
    }
  }));
  process.exit(0);
}
