
import React  from 'react'
import MAPJS  from 'mindmup-mapjs'
// import jQuery from 'jquery'
import jQuery from 'mindmup-mapjs/node_modules/jquery'

import themeProviderx from './Theme'
import testMap       from '../data/sample-map.json'
import Layout        from 'mindmup-mapjs-layout'
import Model         from 'mindmup-mapjs-model'

const ThemeProcessor = Layout.ThemeProcessor
const content        = Model.content

const themeProvider = {
  'default': themeProviderx
}

export default class MapView extends React.Component {
  componentDidMount() {
    this.init()
  }

  init() {
    const container = jQuery('#container')
    const idea      = content(testMap)
    const imageInsertController = new MAPJS.ImageInsertController('http://localhost:4999?u=')
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

    themeProvider.default.connector.default.type = 'straight'

    jQuery('#themecss').themeCssWidget(themeProvider, new ThemeProcessor(), mapModel)
    container.domMapWidget(console, mapModel, false, imageInsertController)
    jQuery('body').mapToolbarWidget(mapModel)
    jQuery('body').attachmentEditorWidget(mapModel)
    mapModel.setIdea(idea)

    jQuery('#linkEditWidget').linkEditWidget(mapModel)
    window.mapModel = mapModel
    jQuery('.arrow').click(function () {
      jQuery(this).toggleClass('active')
    })
    imageInsertController.addEventListener('imageInsertError', function (reason) {
      console.log('image insert error', reason)
    })

    container.on('drop', function (e) {
      const dataTransfer = e.originalEvent.dataTransfer
      e.stopPropagation()
      e.preventDefault()

      if (dataTransfer && dataTransfer.files && dataTransfer.files.length > 0) {
        const fileInfo = dataTransfer.files[0]
        if (/\.mup$/.test(fileInfo.name)) {
          const oFReader = new window.FileReader()
          oFReader.onload = function (oFREvent) {
            mapModel.setIdea(content(JSON.parse(oFREvent.target.result)))
          }
          oFReader.readAsText(fileInfo, 'UTF-8')
        }
      }
    })
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
