(function () {
	const headers = $response.headers;
  
	for (let key in headers) {
	  if (key.toUpperCase() === 'CONTENT-TYPE' && !headers[key].includes('text/html')) {
		$done({});
		return;
	  }
	  if (key.toUpperCase() === 'CONTENT-SECURITY-POLICY') {
		delete headers[key];
	  }
	}
	
	const body = $response.body.replace('<head>',
	  '<head>' +
	  '<script>Object.defineProperty(navigator, "userAgent", { value: "Mozilla/5.0 (iPad; CPU OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/11.0 Mobile/15E148 Safari/604.1" })</script>' +
	  '<style>.ContentItem-actions > *:nth-child(3), .ContentItem-actions > *:nth-child(4) { display:none }</style>');
	$done({ headers, body })
  })()