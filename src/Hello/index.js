const styleEl = document.createElement("style");
document.head.appendChild(styleEl);
const sheet = styleEl.sheet;

const interleave = (strings, interpolations) => {
  return strings.reduce(
    (final, str, i) =>
      final +
      str +
      (interpolations[i] === undefined
        ? ""
        : interpolations[i]),
    ""
  );
}

function css(strings, ...interpolations) {
  const styleString = interleave(
    strings,
    interpolations
  );
  const index = sheet.cssRules.length;
  const id = index.toString(36);
  const className = `css-${id}`;
  const rule = `.${className} { ${styleString} }`;

  sheet.insertRule(rule, index);
  return className;
}

export const cls1 = css`
  font-size: 16px;
  background: rgba(0, 0, 0, 0.11);
`;

const fragment = "color: green;";

export const cls2 = css`
  font-size: 16px;
  background: rgba(45, 213, 47, 0.11);
  ${fragment};
  color: aquamarine;
`;

const rootEl = document.getElementById("root");

export function printRules(styleSheet) {
  const preEl = rootEl.appendChild(
    document.createElement("pre")
  );
  preEl.innerHTML = JSON.stringify(
    [...styleSheet.cssRules].map(
      rule => rule.cssText
    ),
    null,
    2
  );
}

printRules(sheet);


