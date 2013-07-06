/**
 * bemhtml
 * =======
 *
 * Склеивает *bemhtml*-файлы по deps'ам, обрабатывает BEMXJST-транслятором, сохраняет (по умолчанию) в виде
 * `?.bemhtml.js`. Использует компилятор, входящий в состав библиотеки `bem-core` (https://github.com/bem/bem-core).
 * **Внимание:** поддерживает только новый js-совместимый синтаксис.
 *
 * **Опции**
 *
 * * *String* **target** — Результирующий таргет. По умолчанию — `?.bemhtml.js`.
 * * *String* **filesTarget** — files-таргет, на основе которого получается список исходных файлов
 *   (его предоставляет технология `files`). По умолчанию — `?.files`.
 * * *String* **exportName** — Имя переменной-обработчика BEMHTML. По умолчанию — `'BEMHTML'`.
 * * *Boolean* **devMode** — Development-режим. По умолчанию — `true`.
 * * *Boolean* **cache** — Кеширование. По умолчанию — `true`.
 *
 * **Пример**
 *
 * ```javascript
 * nodeConfig.addTech(require('enb-bemxjst/techs/bemhtml'));
 * ```
 */
module.exports = require('./bem-xjst').buildFlow()
    .name('bemhtml')
    .target('target', '?.bemhtml.js')
    .defineOption('exportName', 'BEMHTML')
    .defineOption('devMode', true)
    .defineOption('cache', true)
    .useFileList(['bemhtml', 'bemhtml.xjst'])
    .builder(function(sourceFiles) {
        return this._sourceFilesProcess(sourceFiles, this._devMode, this._cache, this._exportName);
    })
    .createTech();