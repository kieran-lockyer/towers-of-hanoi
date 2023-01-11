import { Droppable } from "react-beautiful-dnd";
import Block from "./Block";
import { BlockType } from "./types/Block";

interface ITowerProps {
    height: number;
    blocks: Array<BlockType>;
    towerIndex: number;
}

export default function Tower(props: ITowerProps) {
    const { height, blocks, towerIndex } = props

    return
}
