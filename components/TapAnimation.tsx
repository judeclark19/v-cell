import { useEffect, useState } from "react";
import styled from "styled-components";

const Tap = styled.i<{
  $active: boolean;
  $left: number;
  $top: number;
}>`
  pointer-events: none;
  position: absolute;
  left: ${(props) => `${props.$left}px`};
  top: ${(props) => `${props.$top}px`};
  height: 60px;
  width: 60px;
  background-color: var(--gold);
  margin: -30px;
  border-radius: 100%;
  opacity: 1;
  transform: scale(0);
  z-index: 9999;

  ${(props) =>
    props.$active &&
    `
        transition: transform 400ms ease, opacity 400ms ease;
        opacity: 0;
        transform: scale(1);
    `}
`;

function TapAnimation() {
  const [active, setActive] = useState(false);
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      setActive(true);
      setLeft(e.pageX);
      setTop(e.pageY);
    };

    window.addEventListener("click", handleClick);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <Tap
      $active={active}
      $left={left}
      $top={top}
      onTransitionEnd={() => {
        setActive(false);
      }}
    />
  );
}

export default TapAnimation;
