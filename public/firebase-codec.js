/**
 * firebase-codec
 * A tiny utility to sanitize strings for use in Firebase paths.  
 * @namespace firebaseCodec
 */
var firebaseCodec = {
	/**
	 * @method encode
	 * [Percent-encode](http://en.wikipedia.org/wiki/Percent-encoding) only
	 * the characters required to make a valid Firebase path:
	 * 
	 * `.#[]` are forbidden  
	 * `/` is used as path separator  
	 * `%` must be encoded since it's the escape character
	 * @param {string} 
	 * @return {string} 
	 */
	encode: (function() {
		var pattern = /[/%\.#\$\[\]]/g;
		var replacer = function(c) {
			return '%' + c.charCodeAt(0).toString(16).toUpperCase();
		};
		return function(s) {
			return s.replace(pattern, replacer);
		};
	})(),

	/**
	 * @method encodeFully
	 * Fully [percent-encode](http://en.wikipedia.org/wiki/Percent-encoding) all input, including unreserved characters
	 * not valid for Firebase (i.e., `.`).
	 * @param {string} 
	 * @return {string} 
	 */
	encodeFully: function(s) {
		return encodeURIComponent(s).replace('.', '%2E');
	},

	/**
	 * Decode back to the original input. Included for completeness.
	 * @name decode
	 * @param {string} 
	 * @return {string} 
	 */
	decode: function(s) {
		return decodeURIComponent(s);
	}

	/**
	 * <small>&copy; 2013 [Erik Beeson](https://github.com/ebeeson/) | MIT License</small>
	 */
};
