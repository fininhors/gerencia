<!doctype html>
<html>
<head>
	<base href="./">
	<meta charset="utf-8">
	<meta http-equiv="cache-control" content="no-cache" />
	<meta name="theme-color" content="#067e1a">
	<link rel="manifest" href="/manifest.json">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
	<meta name="description" content="Sistema de gerenciamento de restaurantes">
	<meta name="author" content="Leiviton Carlos">
	<meta name="keyword" content="Restaurantes,Pedidos,Food,Comida">
	<link rel="shortcut icon" href="{{ URL::asset('assets/img/favicon.png') }}">
	<title>Gerencia | Pedidos</title><!-- Icons -->
	<link href="{{ URL::asset('assets/css/font-awesome.min.css') }}" rel="stylesheet">
	<link href="{{ URL::asset('assets/css/simple-line-icons.css') }}" rel="stylesheet">
	<link href="{{ URL::asset('assets/css/login.css') }}" rel="stylesheet">
	<link href="{{ URL::asset('styles.1ad436c5c42882d01e92.bundle.css') }}" rel="stylesheet"/>
</head><!-- BODY options, add following classes to body to change options

// Header options
1. '.header-fixed'					- Fixed Header

// Sidebar options
1. '.sidebar-fixed'					- Fixed Sidebar
2. '.sidebar-hidden'				- Hidden Sidebar
3. '.sidebar-off-canvas'		- Off Canvas Sidebar
4. '.sidebar-minimized'			- Minimized Sidebar (Only icons)
5. '.sidebar-compact'			  - Compact Sidebar

// Aside options
1. '.aside-menu-fixed'			- Fixed Aside Menu
2. '.aside-menu-hidden'			- Hidden Aside Menu
3. '.aside-menu-off-canvas'	- Off Canvas Aside Menu

// Breadcrumb options
1. '.breadcrumb-fixed'			- Fixed Breadcrumb

// Footer options
1. 'footer-fixed'						- Fixed footer

-->
<body class="app header-fixed sidebar-fixed aside-menu-fixed aside-menu-hidden"><!-- Enable bootstrap 4 theme -->
<script>window.__theme = 'bs4';</script><!-- App Loading... -->
<script type="text/javascript" src="{{ URL::asset('inline.5e4ecd3813602e3005cb.bundle.js') }}"></script>
<script type="text/javascript" src="{{ URL::asset('polyfills.9f114c6c94829f3a43c6.bundle.js') }}"></script>
<script type="text/javascript" src="{{ URL::asset('scripts.e00efc90c26ede3d6fd3.bundle.js') }}"></script>
<script type="text/javascript" src="{{ URL::asset('vendor.14fc268be3f3ba3599f0.bundle.js') }}"></script>
<script type="text/javascript" src="{{ URL::asset('main.a346bc42ad269079a2a0.bundle.js') }}"></script>
</body><!-- WhatsHelp.io widget -->
<script type="text/javascript">(function () {
        var options = {
            whatsapp: "+5535988755376", // WhatsApp number
            email: "leivitonpj@gmail.com", // Email
            company_logo_url: "//static.whatshelp.io/img/flag.png", // URL of company logo (png, jpg, gif)
            greeting_message: "Entre em contato com o suporte e deixe uma mensagem.", // Text of greeting message
            call_to_action: "Suporte online", // Call to action
            button_color: "#129BF4", // Color of button
            position: "right", // Position may be 'right' or 'left'
            order: "whatsapp,email" // Order of buttons
        };
        var proto = document.location.protocol, host = "whatshelp.io", url = proto + "//static." + host;
        var s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = url + '/widget-send-button/js/init.js';
        s.onload = function () {
            WhWidgetSendButton.init(host, proto, options);
        };
        var x = document.getElementsByTagName('script')[0];
        x.parentNode.insertBefore(s, x);
    })();</script><!-- /WhatsHelp.io widget -->
</html>