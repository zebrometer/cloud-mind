
import React  from 'react'
import MAPJS  from 'mindmup-mapjs'
// import jQuery from 'jquery'
import jQuery from 'mindmup-mapjs/node_modules/jquery'

import themeProvider from './Theme'
import testMap       from '../data/sample-map.json'
import Layout        from 'mindmup-mapjs-layout'
import Model         from 'mindmup-mapjs-model'

const ThemeProcessor = Layout.ThemeProcessor
const content        = Model.content

export default class MapView extends React.Component {
  componentDidMount() {
    const container = jQuery('#container')
    //const imageInsertController = new MAPJS.ImageInsertController('http://localhost:4999?u=')
    const idea      = content(testMap)
    const mapModel  = new MAPJS.MapModel(MAPJS.DOMRender.layoutCalculator, [])

    jQuery.fn.attachmentEditorWidget = function (mapModel) {
      return this.each(function () {
        mapModel.addEventListener('attachmentOpened', function (nodeId, attachment) {
          mapModel.setAttachment('attachmentEditorWidget', nodeId, {
              contentType: 'text/html',
              content:      window.prompt('attachment', attachment && attachment.content)
            }
          )
        })
      })
    }
    window.onerror = window.alert

    jQuery('#themecss').themeCssWidget(themeProvider, new ThemeProcessor(), mapModel)
    container.domMapWidget(console, mapModel, false/*, imageInsertController*/)
    jQuery('body').mapToolbarWidget(mapModel)
    jQuery('body').attachmentEditorWidget(mapModel)
    mapModel.setIdea(idea)

  }

  render() {
    return (
      <div>
        <h2>Me is map view</h2>

        <div id="container"></div>
        <style id="themecss">
        </style>

      </div>
    )
  }
}
