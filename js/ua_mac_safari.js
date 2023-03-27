(function () {
	const headers = $response.headers;
	for (let key in headers) {
		if (key.toUpperCase() === 'CONTENT-TYPE' && ! headers[key].includes('text/html')) {
			$done({});
			return;
		}
		if (key.toUpperCase() === 'CONTENT-SECURITY-POLICY') {
			delete headers[key];
		}
	}
	const body = $response.body.replace('<head>',
	  '<head>' +
	  '<script>delete navigator; window.navigator = { userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.3 Safari/605.1.15" }</script>' +
	  '<style>.ContentItem-actions>*:nth-child(3),.ContentItem-actions>*:nth-child(4){display:none}</style>');
	$done({ headers, body })
})()