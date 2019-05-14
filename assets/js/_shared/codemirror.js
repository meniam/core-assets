import CodeMirror from 'codemirror';
window['CodeMirror'] = CodeMirror;

import jsonlint from './jsonlint';
window.jsonlint = jsonlint;

import jsyaml from 'js-yaml/dist/js-yaml.min';
window.jsyaml = jsyaml;

require('codemirror/mode/javascript/javascript');
require('codemirror/mode/htmlmixed/htmlmixed');
require('codemirror/mode/yaml-frontmatter/yaml-frontmatter');
require('codemirror/mode/yaml/yaml');
require('codemirror/mode/css/css');
require('codemirror/addon/dialog/dialog');
require('codemirror/addon/fold/comment-fold');
require('codemirror/addon/fold/foldgutter');
require('codemirror/addon/fold/foldcode');
require('codemirror/addon/display/autorefresh');
require('codemirror/addon/hint/html-hint');
require('codemirror/addon/hint/css-hint');
require('codemirror/addon/hint/show-hint');
require('codemirror/addon/fold/xml-fold');
require('codemirror/addon/edit/closebrackets');
require('codemirror/addon/edit/closetag');
require('codemirror/addon/edit/matchbrackets');
require('codemirror/addon/edit/matchtags');
require('codemirror/addon/edit/trailingspace');
require('codemirror/addon/selection/active-line');
require('codemirror/addon/search/jump-to-line');
require('codemirror/addon/search/match-highlighter');
require('codemirror/addon/search/matchesonscrollbar');
require('codemirror/addon/search/search');
require('codemirror/addon/search/searchcursor');
require('codemirror/addon/lint/lint');
require('codemirror/addon/lint/javascript-lint');
require('codemirror/addon/lint/json-lint');
require('codemirror/addon/lint/css-lint');
require('codemirror/addon/lint/yaml-lint');

window.CodeMirror = CodeMirror;
global.CodeMirror = CodeMirror;

