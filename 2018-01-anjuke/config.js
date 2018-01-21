module.exports = {
	port:8080,//浏览器端口
	//数据库
	mysql_host:'localhost',
	mysql_port:3306,
	mysql_user:'root',
	mysql_password:'',
	mysql_dbname:'bluefirstpro',
	//超级管理员
	root_username:'lianlian',
	root_password:'e10adc3949ba59abbe56e057f20f883e',//123456

	//每个表格所需要的类目名
	//1.房源 2.友情链接 3.广告管理
	show_admin_colname_house:'ID:ID,title:标题,ave_price:均价,tel:电话',
	show_admin_colname_link:'ID:ID,title:标题,type:类型,link:链接',
	show_admin_colname_ad:'ID:ID,title:标题,type:类型,link:链接,expires:日期',

	//添加数据，表格字段名
	insert_fieldname_house:'ID,admin_ID, title, sub_title, position_main, position_second,ave_price, area_min, area_max, tel, sale_time, submit_time, building_type,main_img_path,main_img_real_path, img_paths, img_real_paths, property_types, property_img_paths, property_img_real_paths',

	insert_fieldname_link:'ID, admin_ID, type, title, link, n_order, expires',

	insert_fieldname_ad:'ID, admin_ID, type, title, link, img_path, img_real_path, expires, n_order, n_show, n_click'
/*
	insert_fields_house:'ID,admin_ID,title,sub_title,position_main,position_second,ave_price,area_min,area_max,tel,sale_time,submit_time,building_type,main_img_path,main_img_real_path,img_paths,img_real_paths,property_types,property_img_paths,property_img_real_paths,location',
  insert_fields_broker:'ID,title,img_path,img_real_path',
  insert_fields_link: 'ID,admin_ID,type,title,link,n_order,expires',
  insert_fields_ad:'ID,admin_ID,type,title,link,img_path,img_real_path,expires,n_order,n_show,n_click'*/,
}