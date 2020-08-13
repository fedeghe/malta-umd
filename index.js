const path = require('path'),
	fs = require('fs');

// credits https://www.npmjs.com/package/umd
// 
function malta_umd(o, options) {
	const self = this,
		start = new Date(),
		pluginName = path.basename(path.dirname(__filename)),
        maywrap = 'wrap' in options && options.wrap
            ? `function (){${o.content}}`
			: `${o.content}`,
    /////// TPL begin
        tpl = `(function(fn) {
	if (typeof exports === "object" && typeof module !== "undefined") {
		module.exports = fn();
	} else if (typeof define === "function" && define.amd) {
		define([], fn);
	} else {
		if (typeof window !== "undefined") {
			root = window;
		} else if (typeof global !== "undefined") {
			root = global;
		} else if (typeof self !== "undefined") {
			root = self;
		} else {
			root = this;
        }
        ${options.name && `root.${options.name} = fn.call(root);`}
        ${options.names && options.names.reduce(function (acc, n) {
            acc += `root.${n} = fn.call(root);`
            return acc
        }, '')}
	}
})(${maywrap});`;
////// TPL end
    let msg, root;

	return (solve, reject) => {
		o.content = tpl;
		fs.writeFile(o.name, o.content, err => {
			err && self.doErr(err, o, pluginName);
			msg += 'plugin ' + pluginName.white() + ' wrote ' + o.name +' (' + self.getSize(o.name) + ')';
			err
                ? reject(`Plugin ${pluginName} write error:\n${err}`)
                : solve(o);
			self.notifyAndUnlock(start, msg);
		});
	};
}
malta_umd.ext = ['js', 'coffee', 'ts', 'jsx'];
module.exports = malta_umd;