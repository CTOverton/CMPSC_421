import React, {Component} from 'react'
import Example from './example'
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'


class chess extends Component {
    render() {
        return (
            <div className="center">
                <DragDropContextProvider backend={HTML5Backend}>
                    <Example />
                </DragDropContextProvider>
            </div>
        )
    }
}

export default chess;