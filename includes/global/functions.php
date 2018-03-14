<?php
	// set cookie if one doesn't exist
	$saveOption = $_GET["select"];
	if (isset($saveOption) && ($saveOption == 'true')) {
		$number_of_days = 364;
		$date_of_expiry = time() + 60 * 60 * 24 * $number_of_days ;
		setcookie('skies', 'clear', $date_of_expiry, '/');
	}

	function auto_copyright($year = 'auto'){ 
		if(intval($year) == 'auto'){ $year = date('Y'); }
		if(intval($year) == date('Y')){ echo intval($year); }
		if(intval($year) < date('Y')){ echo intval($year) . ' - ' . date('Y'); }
		if(intval($year) > date('Y')){ echo date('Y'); }
	} 


	$page = basename($_SERVER[ "PHP_SELF"]);
	$page_id = basename($page, '.php');

	switch ($page_id) {
	case "404":
	  $page_id = "server-404";
	  break;
	case "403":
	  $page_id = "server-403";
	  break;
	case "index":
	  $page_id = 'home';
	  break;
	}
?>