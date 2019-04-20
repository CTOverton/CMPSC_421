import React, { Component } from 'react'
import { DragSource } from "react-dnd";

const itemSource = {
    beginDrag(props) {
        return props.item;
    },
    endDrag(props, monitor, component) {
        /*if(!monitor.didDrop()) {
            return;
        }
        return props.handleDrop(props.item.item);*/
    }
}

class Tower extends Component {
        render() {
        const {isDragging, connectDragSource, item } = this.props;
        const opacity = isDragging ? 0 : 1;

        let ring1_style = 'ring ring' + item.item.rings[0];
        let ring2_style = 'ring ring' + item.item.rings[1];
        let ring3_style = 'ring ring' + item.item.rings[2];

        return connectDragSource(
            <div className="tower" style={{opacity}}>
                <div className={ring1_style}></div>
                <div className={ring2_style}></div>
                <div className={ring3_style}></div>
                {/*{item.item.rings}*/}
            </div>
        )
    }
}

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging()
    }
}

// export default Tower;
export default DragSource('item', itemSource, collect)(Tower)