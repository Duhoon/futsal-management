// import { useCoordinate } from "@/hooks";
// import styles from "@/styles/field/player.module.scss";
// import { useEffect } from "react";

// interface PlayerProps {
//     isActivated?: boolean;
// }

// export default function Player({ isActivated }: PlayerProps) {
//     const [coordinate, setCoordinate] = useCoordinate();

//     const clickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
//         console.log({ x: e.clientX, y: e.clientY });
//     };

//     const dragHandler = (e: React.DragEvent<HTMLDivElement>) => {
//         console.log({ x: e.clientX, y: e.clientY });
//     };

//     const dragEndHandler = (e: React.DragEvent<HTMLDivElement>) => {
//         console.log({ x: e.clientX, y: e.clientY });
//         setCoordinate({ x: e.clientX, y: e.clientY - 70 });
//     };

//     const touchHandler = (e: React.TouchEvent<HTMLDivElement>) => {
//         console.log({
//             x: e.changedTouches[0].clientX,
//             y: e.changedTouches[0].clientY,
//         });
//     };

//     const touchEndHandler = (e: React.TouchEvent<HTMLDivElement>) => {
//         console.log({
//             x: e.changedTouches[0].clientX,
//             y: e.changedTouches[0].clientY,
//         });
//         setCoordinate({
//             x: e.changedTouches[0].clientX,
//             y: e.changedTouches[0].clientY - 70,
//         });
//     };

//     return (
//         <div
//             className={`${styles["player"]} ${isActivated ? styles["player-activated"] : ""}`}
//             draggable={true}
//             onClick={clickHandler}
//             onDrag={dragHandler}
//             onDragEnd={dragEndHandler}
//             // onTouchMove={touchHandler}
//             // onTouchEnd={touchEndHandler}
//             style={{
//                 top: `${coordinate.y}px`,
//                 left: `${coordinate.x}px`,
//             }}
//         ></div>
//     );
// }
