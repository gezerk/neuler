import React, { Component } from 'react'
import { Button, Tab, Header, Icon, Segment } from 'semantic-ui-react'
import { connect } from "react-redux"
import GraphVisualiser from '../GraphVisualiser'
import CentralityResult from './CentralityResult'

const tabContentStyle = {
  height: '80vh', overflowY: 'auto', overflowX: 'hidden', width: '70vw'
}

const getAlgoPanes = task => [{
  menuItem: `Table`,
  render: () => <div style={tabContentStyle}>
    <CentralityResult task={task}/>
  </div>
}, {
  menuItem: `Code`,
  render: () => (
    <div style={tabContentStyle}>
      {
        task.parameters
          ? <Segment.Group>
            {
              Object.keys(task.parameters).map(key =>
                <Segment>:param {key} =>
                  {task.parameters[key]
                    ? (typeof task.parameters[key] === 'string'
                        ? ` '${task.parameters[key]}'`
                        : ` ${task.parameters[key]}`)
                    : ' null'};
                </Segment>
              )}
          </Segment.Group>
          : null
      }

      <Segment>{task.query}</Segment>
    </div>
    )
}, {
  menuItem: `Vis`,
  render: () => <GraphVisualiser taskId={task.taskId} results={task.result} label={task.parameters.label} relationshipType={task.parameters.relationshipType} writeProperty={task.parameters.writeProperty} />
}]

const getResultPanes = tasks => tasks.map(task =>
  ({
    menuItem: `${task.algorithm}. Started at: ${task.startTime.toLocaleString()}`,
    render: () => <HorizontalAlgoTab task={task} key={task.id}/>
  })
)

const TabExampleVerticalTabular = ({ tasks }) => (
  <div style={{ width: '95%' }}>
    <Header as='h2'>Run Results</Header>
    <Tab menu={{ fluid: true, vertical: true, tabular: true }} panes={getResultPanes(tasks)}/>
  </div>
)

const HorizontalAlgoTab = ({ task }) => (
  <div style={{ width: '95%' }}>
    <Tab menu={{ fluid: true, vertical: false, tabular: true }} panes={getAlgoPanes(task)}/>
  </div>
)


const mapStateProps = state => ({
  tasks: state.tasks
})

export default connect(mapStateProps, null)(TabExampleVerticalTabular)
