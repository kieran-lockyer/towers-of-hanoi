import { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import './App.css'

function App() {
  const colors = [
    '#00FF00',
    '#FFFF00',
    '#FFA500',
    '#FFC0CB',
    '#800080',
    '#0000FF',
    '#FF0000'
  ]

  const [towers, setTowers] = useState([
    [
      { position: 1 },
      { position: 2 },
      { position: 5 }
    ],
    [
      { position: 3 }
    ],
    [
      { position: 4 }
    ]
  ])

  const [column, setColumn] = useState<number | null>(null)

  const getTowerStyle = () => {
    return {
      height: `${towers.reduce((acc, t) => acc += t.length, 0) + 4}rem`
    }
  }

  const getBlockStyle = (position: number) => {
    return {
      backgroundColor: colors[position - 1],
      width: `${position * 2 + 1}rem`
    }
  }

  const handlePlaceBlock = (result: any) => {
    console.log('result', result)
    if (!result.destination) return

    const newTowers = [...towers.map(t => [...t])]
    const block = newTowers[column! - 1]?.shift()

    if (!block) return

    if (block.position > newTowers[result.destination.droppableId.split('-')[1] - 1][0]?.position) return
    newTowers[result.destination.droppableId.split('-')[1] - 1].unshift(block!)
    setTowers(newTowers)
    setColumn(null)
  }

  const undo = () => {
    setColumn(null)
  }

  return (
    <div className="App">
      <DragDropContext onDragEnd={handlePlaceBlock}>
        <div className='towers'>
          <div className='tower-container'>
            <Droppable droppableId="droppable-1">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className='tower' style={getTowerStyle()}
                >
                  {towers[0].map((block, bInd) => (
                    <Draggable key={block.position} draggableId={block.position.toString()} index={bInd} isDragDisabled={bInd !== 0}>
                      {(innerProvided, snapshot) => (
                        <div
                          key={block.position}
                          ref={innerProvided.innerRef}
                          {...innerProvided.draggableProps}
                          {...innerProvided.dragHandleProps}
                          className='block' style={getBlockStyle(block.position)}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            {column ? (
              column !== 1 ? (<button onClick={() => handlePlaceBlock(1)}>Place</button>) : (<button onClick={undo}>Undo</button>)
            ) : (
              <button onClick={() => setColumn(1)}>Take</button>
            )}
          </div>
          <div className='tower-container'>
            <Droppable droppableId="droppable-2">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className='tower' style={getTowerStyle()}
                >
                  {towers[1].map((block, bInd) => (
                    <Draggable key={block.position} draggableId={block.position.toString()} index={bInd} isDragDisabled={bInd !== 0}>
                      {(innerProvided, snapshot) => (
                        <div
                          key={block.position}
                          ref={innerProvided.innerRef}
                          {...innerProvided.draggableProps}
                          {...innerProvided.dragHandleProps}
                          className='block' style={getBlockStyle(block.position)}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            {column ? (
              column !== 2 ? (<button onClick={() => handlePlaceBlock(2)}>Place</button>) : (<button onClick={undo}>Undo</button>)
            ) : (
              <button onClick={() => setColumn(2)}>Take</button>
            )}
          </div>
          <div className='tower-container'>
            <Droppable droppableId="droppable-3">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className='tower' style={getTowerStyle()}
                >
                  {towers[2].map((block, bInd) => (
                    <Draggable key={block.position} draggableId={block.position.toString()} index={bInd} isDragDisabled={bInd !== 0}>
                      {(innerProvided, snapshot) => (
                        <div
                          key={block.position}
                          ref={innerProvided.innerRef}
                          {...innerProvided.draggableProps}
                          {...innerProvided.dragHandleProps}
                          className='block' style={getBlockStyle(block.position)} />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            {column ? (
              column !== 3 ? (<button onClick={() => handlePlaceBlock(3)}>Place</button>) : (<button onClick={undo}>Undo</button>)
            ) : (
              <button onClick={() => setColumn(3)}>Take</button>
            )}
          </div>
        </div>
      </DragDropContext>
    </div>
  )
}

export default App
