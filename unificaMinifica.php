<?php
require_once "vendor/autoload.php";
use MatthiasMullie\Minify;

class unificaMinifica
{
	public function js()
	{
		$basePathJs     = getcwd()."/js/";
		$minifiedPathJs = $basePathJs.'scripts.min.js';

		$minifier = new Minify\JS($basePathJs.'util.js');
		$minifier->add($basePathJs.'login.js');
		$minifier->add($basePathJs.'categoria.js');
		$minifier->add($basePathJs.'divisao.js');
		$minifier->add($basePathJs.'tecnico.js');
		$minifier->add($basePathJs.'time.js');
		$minifier->add($basePathJs.'torcedor.js');
		$result = $minifier->minify($minifiedPathJs);
		//chmod($minifiedPathJs, 0777);

		if (empty($result)) {
			echo "0 ";
		} else {
			echo "1 ";
		}
	}

	public function cssLayoutAdm()
	{
		$basePathJs     = getcwd()."/css/";
		$minifiedPathCss = $basePathJs.'layoutadm.min.css';

		$minifier = new Minify\CSS($basePathJs.'layoutadm.css');
		$result = $minifier->minify($minifiedPathCss);
		//chmod($minifiedPathCss, 0777);

		if (empty($result)) {
			echo "0 ";
		} else {
			echo "1 ";
		}
	}

	public function cssLayoutGeral()
	{
		$basePathJs     = getcwd()."/css/";
		$minifiedPathCss = $basePathJs.'layoutgeral.min.css';

		$minifier = new Minify\CSS($basePathJs.'layoutgeral.css');
		$result = $minifier->minify($minifiedPathCss);
		//chmod($minifiedPathCss, 0777);

		if (empty($result)) {
			echo "0 ";
		} else {
			echo "1 ";
		}
	}

}

$objUnificaMinifica = new unificaMinifica();
$objUnificaMinifica->cssLayoutAdm();
$objUnificaMinifica->cssLayoutGeral();
$objUnificaMinifica->js();
