
	//倒计时插件
	var watchFunc = function(options){
			// 变量定义和初始化
			var that = this;							//定义内部变量，产生作用域，防止溢出
			that.intDiff = options.intDiff || '60';		//倒计时时长，用秒做单位
			that.allBox = document.querySelector(options.allBox) || '';			//单容器
			that.dBox = document.querySelector(options.dBox) || '';				//多容器 日
			that.hBox = document.querySelector(options.hBox) || '';				//多容器 时
			that.mBox = document.querySelector(options.mBox) || '';				//多容器 分
			that.sBox = document.querySelector(options.sBox) || '';				//多容器 秒
			that.readyCall = options.readyCall || '';	//开始前回调
	        that.startCall = options.startCall || '';	//进行中回调
	        that.callback = options.callback || '';		//为0后回调
	        that.noAgain = options.noAgain || false;	//是否开始倒计
			//初始化日时分秒
			that.day = "";
	        that.hour = "";
	        that.minute = ""
	        that.second = "";   

	        // 开始前回调
	        if(that.readyCall && typeof(that.readyCall) === "function"){
	 			that.readyCall();
	 		}  
	 		
	        // 倒计前开始第一时间
	        that._timeRechon();  
	        that._innerWrite();
	        if(that.noAgain == false){
			    that.intDiff--;
			}
	 		// 倒计开始
		    that.wsettime = window.setInterval(function(){      	
			    if(that.intDiff > 0){
			    	 //开始前回调;
			        if(that.startCall && typeof(that.startCall) === "function"){
			 			that.startCall();
			 		}
			        that._timeRechon();
			    }else{
			    	that._timeRechon();
			    	clearInterval( that.wsettime );
			    	// 结束时回调
			    	if(that.callback && typeof(that.callback) === "function"){
			 			that.callback();
			 		}
			    }
			    that._innerWrite();
				if(that.noAgain == false){
				    that.intDiff--;
				}
		    }, 1000);
	} 

	watchFunc.prototype = {
		// 时间计算
		_timeRechon : function(){
			var that = this;
			that.day = Math.floor(that.intDiff / (60 * 60 * 24));
	        that.hour = Math.floor(that.intDiff / (60 * 60)) - (that.day * 24);
	        that.minute = Math.floor(that.intDiff / 60) - (that.day * 24 * 60) - (that.hour * 60);
	        that.second = Math.floor(that.intDiff) - (that.day * 24 * 60 * 60) - (that.hour * 60 * 60) - (that.minute * 60);
		},

		// 页面输出
		_innerWrite : function(){
			var that = this;
			if (that.hour <= 9) that.hour = '0' + that.hour;
		    if (that.minute <= 9) that.minute = '0' + that.minute;
		    if (that.second <= 9) that.second = '0' + that.second;
		    // 整个输出
		    if(that.day > 0){
		    	that.allBox.innerHTML =  that.day + "天" + that.hour + ":" +  that.minute + ":" +  that.second ;
		    }else{
		    	that.allBox.innerHTML =  that.hour + ":" +  that.minute + ":" +  that.second ;
		    }
		    // 单个输出
		    // if(that.day > 0){
		    	that.dBox.innerHTML = that.day;
		    // }
		    that.hBox.innerHTML = that.hour;
		    that.mBox.innerHTML = that.minute;
		    that.sBox.innerHTML = that.second;
		}
	}