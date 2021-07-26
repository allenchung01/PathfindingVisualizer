// Returns an array of lines, given a path of nodes.
export function pathToLines(pathReversed) {
  const lines = [];
  const directions = [];
  directions.push("none");
  for (let i = 1; i < pathReversed.length; i++) {
    // Get the direction of the path given current and previous nodes.
    let prevNode = pathReversed[i - 1];
    let currNode = pathReversed[i];
    let dRow = prevNode.row - currNode.row;
    let dCol = currNode.col - prevNode.col;
    const direction =
      dCol === 1
        ? "right"
        : dCol === -1
        ? "left"
        : dRow === 1
        ? "up"
        : dRow === -1
        ? "down"
        : "";
    directions.push(direction);
    // Given directions of current node and previous node, get the corresponding line.
    const line =
      direction === "right" && directions[i - 1] === "none"
        ? "horizontal"
        : direction === "right" && directions[i - 1] === "right"
        ? "horizontal"
        : direction === "right" && directions[i - 1] === "up"
        ? "ul"
        : direction === "right" && directions[i - 1] === "down"
        ? "bl"
        : direction === "left" && directions[i - 1] === "none"
        ? "horizontal"
        : direction === "left" && directions[i - 1] === "left"
        ? "horizontal"
        : direction === "left" && directions[i - 1] === "up"
        ? "ur"
        : direction === "left" && directions[i - 1] === "down"
        ? "br"
        : direction === "up" && directions[i - 1] === "none"
        ? "vertical"
        : direction === "up" && directions[i - 1] === "up"
        ? "vertical"
        : direction === "up" && directions[i - 1] === "left"
        ? "bl"
        : direction === "up" && directions[i - 1] === "right"
        ? "br"
        : direction === "down" && directions[i - 1] === "none"
        ? "vertical"
        : direction === "down" && directions[i - 1] === "down"
        ? "vertical"
        : direction === "down" && directions[i - 1] === "left"
        ? "ul"
        : direction === "down" && directions[i - 1] === "right"
        ? "ur"
        : "";
    lines.push(line);
  }
  lines.push("landing-pad");
  return lines;
}
