var path = require('path'),
	fs = require('fs');

// some credits has to be given to https://www.npmjs.com/package/umd
// 
function malta_umd(o, options) {
	var self = this,
		name = o.name,
		start = new Date(),
		msg,
		root,
		pluginName = path.basename(path.dirname(__filename)),
		wrap = 'wrap' in options && options.wrap ? 
			`function (){
				${o.content}
			}`
			:
			`${o.content}`;

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
		root.${options.name} = fn.call(root);
	}
})(${wrap});`;
////// TPL end

	return function (solve, reject){
		fs.writeFile(o.name, tpl, function(err) {
			err && self.doErr(err, o, pluginName);
			msg += 'plugin ' + pluginName.white() + ' wrote ' + o.name +' (' + self.getSize(o.name) + ')';
			solve(o);
			self.notifyAndUnlock(start, msg);
		});
	};
}
malta_umd.ext = ['js', 'coffee', 'ts', 'jsx'];
module.exports = malta_umd;