/**
 * ================================================
 * October CMS - The JavaScript framework.
 * ================================================
 */
import './framework';


/**
 * ================================================
 * VINT Modules.
 * ================================================
 */

// Add to the search page "one page application" features (AJAX + History API).
import './modules/search';
// A module to create searchable lists in the DOM.
import './modules/searchable';


/**
 * ================================================
 * Forms - Handlers of all forms in the application.
 * ================================================
 */

// A handler to multiple forms.
import './formHandler';
import './forms/profilePersonal';
import './forms/profileAcademic';
import './forms/profileGroup';
import './forms/settingsEmail';
import './forms/settingsAccount';
import './forms/settingsSecurity';
import './forms/settingsDelete';
// Membro form module.
import './forms/membro';
// Programa form module.
import './forms/programa';
// Projeto form module.
import './forms/projeto';
// Publicacao form module.
import './forms/publicacao';
// Contact form module.
import './forms/contact';
// Login form module.
import './forms/login';
// Login recover form module.
import './forms/loginRecover';
// Login reset form module.
import './forms/loginReset';
// Account disagree form module.
import './forms/accountDisagree';
// Account register form module.
import './forms/accountRegister';

/**
 * ================================================
 * Settings - Handlers of all settings forms in the 
 * application.
 * ================================================
 */

// A handler to multiple forms.
import './settingsHandler';
import './settings/publicacao';
import './settings/projeto';
import './settings/programa';
import './settings/membro';


/**
 * ================================================
 * Components - All components classes. 
 * ================================================
 */

// Material design chip component.
import './components/chip';
// Material design stepper component.
import '../libs/mdl-stepper/src/js/stepper';


/**
 * ================================================
 * Polyfills - All polyfills used in application. 
 * ================================================
 */

// Dialog polyfill.
import '../libs/dialog-polyfill/dialog-polyfill';
// Material input file polyfill. 
import '../libs/mdl-components-ext/src/file/file';


/**
 * ================================================
 * Charts - The classes of charts. 
 * ================================================
 */

// The handler of charts.
import '../libs/chart-handler/src/chartHandler';
// "Projeto estados" chart class.
import './charts/projetoEstados';
// "Publicacao tipos" chart class.
import './charts/publicacaoTipos';
// "Membro status" chart class.
import './charts/membroStatus';
// "Programa estados" chart class.
import './charts/programaEstados';