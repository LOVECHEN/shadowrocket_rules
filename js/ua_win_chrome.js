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
	  '<script>delete navigator; window.navigator = { userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36" }</script>' +
	  '<style>.ContentItem-actions>*:nth-child(3),.ContentItem-actions>*:nth-child(4){display:none}</style>');
	$done({ headers, body })
})()