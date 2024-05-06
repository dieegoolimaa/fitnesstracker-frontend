import { useRef } from "react";
import { useSprings, animated } from "@react-spring/web";
import { useDrag } from "react-use-gesture";
import clamp from "lodash.clamp";
import swap from "lodash-move";

function DraggableList({ items }) {
  const order = useRef(items.map((_, index) => index));
  const height = 50; // Height of each item
  const spacing = 10; // Spacing between items
  const containerHeight = items.length * (height + spacing); // Height of the container
  const fn =
    (order, active = false, originalIndex = 0, curIndex = 0, y = 0) =>
    (index) => ({
      y:
        active && index === originalIndex
          ? curIndex * (height + spacing) + y
          : order.indexOf(index) * (height + spacing),
      scale: active && index === originalIndex ? 1.1 : 1,
      zIndex: active && index === originalIndex ? 1 : 0,
      shadow: active && index === originalIndex ? 15 : 1,
      immediate: (key) => key === "y" || key === "zIndex",
    });
  const [springs, api] = useSprings(items.length, fn(order.current));
  const bind = useDrag(({ args: [originalIndex], active, movement: [, y] }) => {
    const curIndex = order.current.indexOf(originalIndex);
    const curRow = clamp(
      Math.round((curIndex * (height + spacing) + y) / (height + spacing)),
      0,
      items.length - 1
    );
    const newOrder = swap(order.current, curIndex, curRow);
    api.start(fn(newOrder, active, originalIndex, curIndex, y));
    if (!active) order.current = newOrder;
  });
  return (
    <div // Apply styles to the container element
      style={{
        height: containerHeight,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {springs.map(({ zIndex, shadow, y, scale }, i) => (
        <animated.div
          {...bind(i)}
          key={i}
          className="draggable-item"
          style={{
            // Adjust width and other styles here
            zIndex,
            boxShadow: shadow.to(
              (s) => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`
            ),
            y,
            scale,
            position: "absolute",
            width: "300px", // Set your desired width here
            height: `${height}px`,
            overflow: "hidden",
          }}
        >
          {items[i]}
        </animated.div>
      ))}
    </div>
  );
}

export default DraggableList;
