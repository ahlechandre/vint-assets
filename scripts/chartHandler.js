/**
 * Chart Handler - A module that handles the registration of multiple google charts 
 * to render automatically on document load and also handle upgrades to be rendered 
 * after initial page load. 
 * 
 * @author Alexandre Thebaldi <ahlechandre@gmail.com>
 * @link <http://github.com/ahlechandre/chart-handler>
 */
var chartHandler = {
  /**
   * Registers the charts for future use. Can be called for register multiple
   * charts or only one. This method append items in a registereds array.
   * 
   * @param {chartHandler.ChartConfig|Array<chartHandler.chartConfig>} The config data of charts
   * to be registereds.
   */
  register: function (ChartConfig) { },

  /**
   * Renders the chart of a given container selector. The chart must be registered.
   * 
   * @param {chartHandler.ChartConfig.containerSelector} 
   */
  render: function (containerSelector) { },

  /**
   * Renders all registered charts.
   * 
   */
  renderAll: function () { },

  /**
   * Renders all registered charts that is not rendered yet.
   * 
   */
  renderAllDiff: function () { },

  /**
   * Draw again all rendered charts with their data and options updates.
   * 
   */
  upgradeAll: function () { },

  /**
   * Returns the array with all registereds charts.
   * 
   * @return {array}
   */
  getRegistereds: function () { },


  /**
   * Returns the array with all rendereds charts.
   * 
   * @return {array}
   */
  getRendereds: function () { },

  /**
   * Initializes the basics of module.
   * 
   */
  init: function () { },
};

chartHandler = (function () {
  'use strict';

  /**
   * Stories the packages that must be loaded.
   * 
   */
  var _defaultPackages = ['line', 'bar', 'corechart'];

  /**
   * Stories the strings used by the module.
   * 
   */
  var _constants = {
    GOOGLE_CHARTS_JS_FILE: '//www.gstatic.com/charts/loader.js',
    DATASET_CHART_UPGRADED_CAMEL: 'chartUpgraded',
    DATASET_CHART_UPGRADED: 'chart-upgraded',
    CHART_CONTAINER_COMPONENT: 'Chart',
    OPTIONS_HEIGHT: 400,
  };

  /** @type {Array<chartHandler.ChartConfig>} */
  var _registeredCharts = [];


  /** @type {Array<chartHandler.Chart>} */
  var _renderedCharts = [];

  /**
   * Queries for a registered chart by your container selector and return it.
   * 
   * @param {chartHandler.ChartConfig.containerSelector}
   * @return {chartHandler.ChartConfig.containerSelector|null} 
   */
  var _findRegisteredChart = function (containerSelector) {
    var registered /** @type {string} */;

    if (!containerSelector) throw new Error('Container selector was not defined.');

    for (registered in _registeredCharts) {

      if (_registeredCharts[registered]['containerSelector'] === containerSelector) return _registeredCharts[registered];
    }
    return null;
  };

  /**
   * Searches for a already registered chart by your container.
   * 
   * @param {chartHandler.ChartConfig}
   * @return {boolean}
   */
  var _existsRegisteredChart = function (ChartConfig) {
    var registered /** @type {string} */;

    if (!ChartConfig['containerSelector']) throw new Error('Container selector was not indentified for a chart of type: ' + ChartConfig['type']);

    for (registered in _registeredCharts) {

      if (_registeredCharts[registered]['containerSelector'] === ChartConfig['containerSelector']) return true;
    }
    return false;
  };

  /**
   * Append the passed chart data to registered array.
   * 
   * @param {chartHandler.ChartConfig} Data to push in _registeredCharts.
   * @return {boolean} True if sucessfully registered.
   */
  var _registerInternal = function (ChartConfig) {
    // The item to append at registereds.
    var config = {};

    if (!ChartConfig) return false;

    if (_existsRegisteredChart(ChartConfig)) throw new Error('Container selector already exists for: ' + ChartConfig['containerSelector']);

    config['type'] = ChartConfig['type'];
    config['containerSelector'] = ChartConfig['containerSelector'];
    config['options'] = ChartConfig['options'];
    config['dataTable'] = ChartConfig['dataTable'];

    // Append the config.
    _registeredCharts.push(config);
    return true;
  }

  /**
   * Registers the charts for future use. Can be called for register multiple
   * charts or only one. This method append items in a registereds array.
   * 
   * @param {chartHandler.ChartConfig|Array<chartHandler.chartConfig>} The config data of charts
   * to be registereds.
   */
  var _register = function (ChartConfig) {
    var config;

    if (ChartConfig instanceof Array) {
      // Register multiple charts.

      for (config in ChartConfig) {
        _registerInternal(ChartConfig[config]);
      }
    } else if (ChartConfig instanceof Object) {
      // Register only one chart.
      _registerInternal(ChartConfig);
    } else {
      throw new Error('The data chart is not valid.');
    }
  };

  /**
   * Returns the google visualization object for type.
   * 
   * @param {object|array} The data of chart.
   * @param {boolean} Defines the type of data table.
   * @return {object|null}
   */
  var _getDataTable = function (dataTable, isArrayToDataTable) {
    var data = {};
    var column /** @type {string} */;

    if (isArrayToDataTable) {
      data = google.visualization.arrayToDataTable(dataTable);
      return data;
    }
    // Must to specifies the data type and label of each column.
    data = new google.visualization.DataTable();

    for (column in dataTable.columns) {
      // Passing the column type and title.
      data.addColumn(dataTable.columns[column], column)
    }
    data.addRows(dataTable.rows);
    return data;
  }

  /**
   * Returns the essentials of a chart item.
   * 
   * @param {chartHandler.ChartConfig}
   * @return {chartHandler.Chart}
   */
  var _getChart = function (ChartConfig) {
    var chart = {};
    var isArrayToDataTable /** @type {boolean} */;
    chart = ChartConfig;
    chart['container'] = document.querySelector(ChartConfig['containerSelector']) || null;

    // chartHandler must not works without container element.
    if (!chart['container']) throw new Error('The container element was not found for selector: ' + ChartConfig['containerSelector']);

    // chartHandler must not works without data table.
    if (!chart['dataTable']) throw new Error('The data table for chart "' + chart['containerSelector'] + '" was not defined.');

    isArrayToDataTable = (chart['dataTable'] instanceof Array);
    chart['data'] = _getDataTable(chart['dataTable'], isArrayToDataTable);

    return chart;
  };

  /**
   * Returns the essentials of a chart item.
   * 
   * @param {chartHandler.Chart}
   * @return {chartHandler.Chart.googleChart}
   */
  var _getGoogleChart = function (Chart) {
    var googleChart = {};

    switch (Chart.type.toLowerCase()) {
      case 'bar':
        googleChart = new google.charts.Bar(Chart.container);
        break;
      case 'line':
        googleChart = new google.charts.Line(Chart.container);
        break;
      case 'pie':
        googleChart = new google.visualization.PieChart(Chart.container);
        break;
    }
    return googleChart;
  };

  /**
   * Append the chart in rendereds array and indicates the chart 
   * container as upgraded.
   * 
   * @param {chartHandler.Chart}
   */
  var _upgradeChart = function (Chart) {
    var rendered /** @type {string} */;
    var isRendered = false;

    for (rendered in _renderedCharts) {
      // Chart already is upgraded.
      if (_renderedCharts[rendered]['containerSelector'] === Chart['containerSelector']) return;
    }
    // Append the chart in rendereds array. 
    _renderedCharts.push(Chart);
    // Put the chart in container element. 
    Chart.container[_constants.CHART_CONTAINER_COMPONENT] = Chart;
    // Dataset flag to identifies if is already upgraded. 
    Chart.container.dataset[_constants.DATASET_CHART_UPGRADED_CAMEL] = Chart['type'];
  };

  /**
   * Returns the default width used to render the charts.
   * 
   * @param {chartHandler.Chart.container} The element used to get offset width.
   * @return {number}
   */
  var _getOptionsWidth = function (container) {

    if (!container) throw new Error('Container of chart was not found.');

    return container.offsetWidth;
  };


  /**
   * Returns the default height used to render the charts.
   * 
   * @return {number}
   */
  var _getOptionsHeight = function () {
    return _constants.OPTIONS_HEIGHT;
  };

  /**
   * Defines the default options for chart. 
   * 
   * @param {chartHandler.Chart}
   * @return {chartHandler.Chart.options}
   */
  var _setDefaultOptions = function (chart) {

    // Options must be a object. 
    if (!(chart['options'] instanceof Object))
      chart['options'] = {};

    // Gets the width of chart if it is not defined. 
    if (typeof (chart['options']['width']) === 'undefined')
      chart['options']['width'] = _getOptionsWidth(chart['container']);

    if (typeof (chart['options']['height']) === 'undefined')
      chart['options']['height'] = _getOptionsHeight();
  };

  /**
   * Draw the defined chart in your container element.
   * 
   * @param {chartHandler.Chart}
   */
  var _draw = function (Chart) {
    _setDefaultOptions(Chart);
    Chart['googleChart'].draw(Chart['data'], Chart['options']);
    // Indicates the chart container as upgraded. 
    _upgradeChart(Chart);
  }


  /**
   * Renders the a chart item. 
   * 
   * @param {chartHandler.ChartConfig.containerSelector} 
   */
  var _renderInternal = function (containerSelector) {
    var registeredChart = /** @type {chartHandler.ChartConfig|null} */ _findRegisteredChart(containerSelector);
    var chart /** @type {chartHandler.Chart} */;

    if (!registeredChart) throw new Error('Chart to render was not found.');

    chart = _getChart(registeredChart);
    chart['googleChart'] = _getGoogleChart(chart);

    if (!chart['googleChart']) throw new Error('The type "' + chart['type'] + '" is not valid in chartHandler');

    // Now draw the chart.
    _draw(chart);
  };

  /**
   * Verifies if the Google visualization is available. Renders the chart of 
   * a given container selector. The chart must be registered.
   * 
   * @param {chartHandler.ChartConfig.containerSelector} 
   */
  var _render = function (containerSelector) {
  
    if (typeof google === 'undefined') return;
        
    if (typeof (google.visualization) === 'undefined') {
      // Google charts library was not loaded yet.
      google.charts.setOnLoadCallback((function () {
        return function () {
          _renderInternal(containerSelector);
        };
      })());
      return;
    }
    _renderInternal(containerSelector);
  };

  /**
   * Renders all registered charts. Only internal calls.
   * 
   */
  var _renderAllInternal = function () {
    var registered /** @type {string} */;

    for (registered in _registeredCharts) {
      // Renders the given item.
      _renderInternal(_registeredCharts[registered]['containerSelector']);
    }
  }

  /** 
   * Renders all registered charts that is not rendered. Only internal calls.
   * 
   */
  var _renderAllDiffInternal = function () {
    var registered /** @type {string} */;
    var rendered /** @type {string} */;
    var isRendered /** @type {boolean} */;
    // Defines if the container element is present in DOM.
    var containerExists /** @type {boolean} */;

    for (registered in _registeredCharts) {
      // Initializes the flag as false.
      isRendered = false;

      // Searches for registered in rendereds.
      for (rendered in _renderedCharts) {

        if (_registeredCharts[registered]['containerSelector'] === _renderedCharts[rendered]['containerSelector']) isRendered = true;
      }

      // Only renders the chart if it is not rendered.
      if (!isRendered) {
        containerExists = (document.querySelector(_registeredCharts[registered]['containerSelector']) ? true : false);

        // Only renders the chart if the container is present in the DOM.
        if (containerExists) {
          // Renders the given item.
          _renderInternal(_registeredCharts[registered]['containerSelector']);
        }
      }
    }
  }

  /**
   * Upgrade all rendereds charts.
   * 
   */
  var _upgradeAll = function () {
    var renderedElements = document.querySelectorAll('[data-' + _constants.DATASET_CHART_UPGRADED + ']');

    for (var i = 0; i < renderedElements.length; i++) {
      _draw(renderedElements[i][_constants.CHART_CONTAINER_COMPONENT]);
    }
  };

  /**
   * Verifies if the Google visualization is available. Renders all registered charts.
   * 
   */
  var _renderAll = function () {

    if (typeof google === 'undefined') return;

    if (typeof (google.visualization) === 'undefined') {
      // Google charts library was not loaded yet.
      google.charts.setOnLoadCallback((function () {
        return function () {
          _renderAllInternal();
        };
      })());
      return;
    }
    _renderAllInternal();
  };

  /**
   * Verifies if the Google visualization is available. Renders all registered charts that
   * is not rendered yet.
   * 
   */
  var _renderAllDiff = function () {

    if (typeof (google.visualization) === 'undefined') {
      // Google charts library was not loaded yet.
      google.charts.setOnLoadCallback((function () {
        return function () {
          _renderAllDiffInternal();
        };
      })());
      return;
    }
    _renderAllDiffInternal();
  };

  /**
   * Load the google charts packages supported by the module.
   * 
   */
  var _loadPackages = function () {

    // Check if google charts library is available.
    if (typeof (google) === 'undefined' || typeof (google.charts) === 'undefined') throw new Error('Please, load the Google Chart library.');

    google.charts.load('43', {
      packages: _defaultPackages
    });
  };

  /**
   * Creates the script element and loads dinamically the google charts library. 
   * After append the script element in document head, tries to load the packages.
   * 
   */
  var _forceLoadPackages = function () {
    var scriptElement = document.createElement('script');
    scriptElement.setAttribute('type', 'text/javascript');
    scriptElement.setAttribute('src', _constants.GOOGLE_CHARTS_JS_FILE);
    document.head.appendChild(scriptElement);

    // Waits 1 second and try to load packages.
    setTimeout(function () {
      _loadPackages();
      console.warn('chartHandler was forced to load Google charts library. We recommend that you must define manually this. Please, visit the Google charts website and see how include their script in your page.');
    }, 1000)
  };

  /**
   * Returns the array with all registereds charts.
   * 
   * @return {array}
   */
  var _getRegistereds = function () {
    return _registeredCharts;
  };


  /**
   * Returns the array with all rendereds charts.
   * 
   * @return {array}
   */
  var _getRendereds = function () {
    return _renderedCharts;
  };

  /**
   * Initializes the basics of module.
   * 
   */
  var _init = function () {

    if (typeof (google) === 'undefined' || typeof (google.charts) === 'undefined') return;

    _loadPackages();
  };

  // Now return the functions that should be made public.
  return {
    register: _register,
    render: _render,
    renderAll: _renderAll,
    renderAllDiff: _renderAllDiff,
    upgradeAll: _upgradeAll,
    getRegistereds: _getRegistereds,
    getRendereds: _getRendereds,
    init: _init,
    forceLoadPackages: _forceLoadPackages,
  };
})();

/**
 * The config data of a chart to be registered.
 * 
 * @typedef {{
 *   type: string,
 *   containerSelector: string,
 *   options: object,
 *   dataTable: object|array,
 * }}
 */
chartHandler.ChartConfig;

/**
 * The internal config data of a registered chart.
 * 
 * @typedef {{
 *   type: string,
 *   containerSelector: string,
 *   container: HTMLElement,
 *   options: object,
 *   visualization: object,
 *   googleChart: object,
 *   dataTable: object|array,
 * }}
 */
chartHandler.Chart;

window['chartHandler'] = chartHandler;

window.addEventListener('load', function () {
  chartHandler.init();
});