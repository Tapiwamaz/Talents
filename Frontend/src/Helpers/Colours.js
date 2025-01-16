const chooseColour = (index) => {
  const colors = [
    "rgb(10, 216, 230)",
    "rgb(128, 128, 0)", // Olive
    "rgb(0, 128, 128)", // Teal
    "rgb(0, 128, 0)", // Dark Green
    "rgb(0, 0, 128)", // Navy
    "rgb(60, 179, 113)", // Medium Sea Green
    "rgb(192, 192, 192)", // Silver
    "rgb(230, 165, 0)", // Orange
    "rgb(255, 192, 203)", // Pink
    "rgb(255, 215, 0)", // Gold
    "rgb(75, 0, 130)", // Indigo
    "rgb(128, 0, 128)", // Purple
    "rgb(220, 20, 60)", // Crimson
    "rgb(244, 164, 96)", // Sandy Brown
    "rgb(123, 104, 238)", // Medium Slate Blue
    "rgb(250, 128, 114)", // Salmon
    "rgb(72, 61, 139)", // Dark Slate Blue
  ];

  return colors[index];
};
export { chooseColour };
