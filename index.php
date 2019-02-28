<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Bare Bones Boilerplate by Luke Moody - lukemoody.co.uk</title>

    <link href="dist/main.min.css" rel="stylesheet" />

    <link rel="icon" href="inc/assets/logo/favicon.png" type="image/x-icon" />
    <link rel="shortcut icon" href="inc/assets/logo/favicon.png" type="image/x-icon" />

    <script>
    // https://browser-update.org/
    var $buoop = {vs:{i:10,f:-4,o:-4,s:8,c:-4},api:4};
    function $buo_f(){
     var e = document.createElement("script");
     e.src = "//browser-update.org/update.min.js";
     document.body.appendChild(e);
    };
    try {document.addEventListener("DOMContentLoaded", $buo_f,false)}
    catch(e){window.attachEvent("onload", $buo_f)}
    </script>

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

  </head>
  <body class="<?=basename($_SERVER['PHP_SELF'],'.php')?>">

    <main role="main"><!-- main content : BEGIN -->

      <section class="container spacing">
        <div class="row">
          <div class="grid-xs-12 grid-sm-8 grid-md-8">
            <h1>Hello World</h1>
            <p>Welcome to Bare Bones a boilerplate for bespoke front-end developments.</p>
            <p>This is a default page.</p>
          </div>
        </div>
      </section>

    </main><!-- main content : END -->

    <script src="dist/main.min.js"></script>
  </body>
</html>
