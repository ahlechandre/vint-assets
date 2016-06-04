/**
 * The chart definition for publicacao estados. 
 * 
 * @author Alexandre Thebaldi <ahlechandre@gmail.com>
 */

(function () {
  'use strict';

  /**
   * Stories the data config used by chartHandler to register it.
   * 
   * @type {object}
   */
  var chartConfig = {};

  /**
   * Stories the data table used by getChartConfig to insert data in chart.
   * 
   * @type {array}
   */
  var dataTable = [];

  /**
   * Stories the css classes for future use.
   * 
   */
  var cssClasses = {
    CHART_MESSAGE: 'vint-chart__message',
  };

  /**
   * Stories the constants for future use.
   * 
   */
  var constants = {
    OCTOBER_REQUEST_HANDLER: 'X-OCTOBER-REQUEST-HANDLER',
    REQUEST_HANDLER: 'dashboard::onRequestChartPublicacao',
    CHART_TYPE: 'pie',
    CHART_OPTIONS_COLORS: ['#F06292', '#D81B60', '#880E4F', '#64B5F6', '#1E88E5', '#0D47A1'],
    CHART_CONTAINER_SELECTOR: '#chart-publicacao-tipos',
    CHART_HEIGHT: 400,
    CHART_IS_3D: true,
    CHART_ICON: 'insert_chart',
    CHART_NOT_FOUND_MESSAGE: 'Nenhum dado para ser exibido.',
  };

  /**
   * 
   * @return {HTMLElement} 
   */
  var getNotFoundData = function () {
    var messageContainer = document.createElement('div');
    var iconElement = document.createElement('i');
    var messageElement = document.createElement('span');
    messageContainer.classList.add(cssClasses.CHART_MESSAGE);
    iconElement.classList.add('material-icons');
    iconElement.textContent = constants.CHART_ICON;
    messageElement.textContent = constants.CHART_NOT_FOUND_MESSAGE;
    messageContainer.appendChild(iconElement);
    messageContainer.appendChild(messageElement);
    return messageContainer;
  };

  /**
   * Returns the data config of chart.
   * 
   * @return {object}
   */
  var getChartConfig = function () {
    var chartConfig = {
      type: constants.CHART_TYPE,
      containerSelector: constants.CHART_CONTAINER_SELECTOR,
      options: {
        is3D: constants.CHART_IS_3D,
        sliceVisibilityThreshold: 0, // Displays 0 values.
        colors: constants.CHART_OPTIONS_COLORS,
        height: constants.CHART_HEIGHT // Default: 400.
      },
      dataTable: dataTable
    };

    return chartConfig;
  };

  /**
   * Registers the chart in chartHandler.
   * 
   * @return {boolean} 
   */
  var registerChart = function () {
    chartConfig = getChartConfig();

    if (typeof (chartHandler) === 'undefined') {
      console.warn('Please, load chartHandler.js before execute this.');
      return false;
    }
    // Registering.
    chartHandler.register(chartConfig);

    return true;
  }

  /**
   * Displays the not found data message. 
   * 
   */
  var showNotFound = function () {
    var messageElement = getNotFoundData();
    var chartContainer = document.querySelector(constants.CHART_CONTAINER_SELECTOR);
    chartContainer.parentNode.style.height = constants.CHART_HEIGHT + 'px';
    chartContainer.innerHTML = '';
    chartContainer.appendChild(messageElement);
  };

  /**
   * Process the response with success.
   *
   * @param {object} The response of server. 
   */
  var processResponseSuccess = function (response) {
    var registered /** @type {boolean} */;

    if (!response.hasOwnProperty('dataTable') || !response['dataTable']) {
      showNotFound();
      return;
    }
    dataTable = response['dataTable'];
    registered = registerChart();
    
    if (!registered) {
      showNotFound();
      return;
    }          
    // All right, renders the chart.
    chartHandler.render(chartConfig['containerSelector']); 
  };

  /**
   * Defines the options of ajax request.
   * 
   * @return {object}
   */
  var getAjaxOptions = function () {
    var onSuccess = function (response) {
      processResponseSuccess(response);
    };
    var onError = function (obj, status, err) {
      showNotFound();
    };
    var onComplete = function () { };

    var headers = [];
    headers[constants.OCTOBER_REQUEST_HANDLER] = constants.REQUEST_HANDLER;

    return {
      success: onSuccess.bind(this),
      type: 'post',
      error: onError.bind(this),
      complete: onComplete.bind(this),
      headers: headers,
    };
  };

  /**
   * Sends an ajax request to server. 
   * 
   * @param {object} Ajax options
   */
  var sendAjaxRequest = function (options) {

    // Dependency.
    if (!$ || !$.ajax) {
      console.warn('Please, load jQuery ajax to execute this.');
      return;
    }

    $.ajax(options);
  };


  /**
   * Gets the data and renders the chart.
   * 
   */
  var renderChart = function () {
    var ajaxOptions = getAjaxOptions();
    sendAjaxRequest(ajaxOptions);
  };

  /**
   * Initializes the chart.
   * 
   */
  var init = function () {
    renderChart();
  };

  window.addEventListener('load', function () {
    init();
  })
})();