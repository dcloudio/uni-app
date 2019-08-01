<?php 
    header("Content-type:text/json");
	
	$version = $_GET["version"];
	$appid = $_GET["appid"];
	
	$ua = $_SERVER['HTTP_USER_AGENT'];//区分Android平台还是iOS平台
	
	$os = null;
	if(preg_match("(iPhone|iPad)", $ua) > 0){
		$os = "iOS";
	}else if(stripos($ua, "Android")){
		$os = "Android";
	}
	
    echo json_encode(check($appid,$version,$os));
	
	exit;
	
	function check($appid,$version,$os){//返回需要的数据
		$array = array(
			"code" => 200,
			"isUpdate" => false
		);
		
		if(empty($os) || empty($appid) || empty($version)){
			$array["desc"] = "参数不全！";
			return $array;
		}
		
		$config = json_decode(file_get_contents("update.json"));//得到本地版本管理文件
		
		$newVersion = $config->{"$os"}->version;//先找对应平台的最新版本
		
		if(versionCompare($newVersion, $version) === 1 && $appid === $config->appid){
			$array["isUpdate"] = true;//需要更新
		}else{
			$array["desc"] = "当前版本已经是最新的，不需要更新！";
			return $array;
		}
		
		$array["note"] = $config->{"$os"}->note; //读取更新日志
		
		$array[$os] = $config->{"$os"}->url; //读取更新地址
		
		return $array;
	}
	
	
	function versionCompare($str1, $str2){//比较版本大小
		$arr1 = explode('.', $str1);
		$arr2 = explode('.', $str2);
		for($i=0; $i < count($arr1); $i++){
			if($arr1[$i] > $arr2[$i]){
				return 1;
			}elseif($arr1[$i] < $arr2[$i]){
				return -1;
			}
		}
		return 0;
	}
	
?>